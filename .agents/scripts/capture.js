const fs = require('fs');
const path = require('path');

let inputData = '';
process.stdin.on('data', chunk => { inputData += chunk; });
process.stdin.on('end', () => {
    try {
        const data = JSON.parse(inputData);
        // We receive transcriptPath from stdin payload
        const transcriptPath = data.transcriptPath.replace('transcript.jsonl', 'transcript_full.jsonl');
        
        if (!fs.existsSync(transcriptPath)) {
            process.stdout.write(JSON.stringify({ decision: "stop" }));
            process.exit(0);
        }

        const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);
        
        let turnPrompts = [];
        for (const line of lines) {
            const step = JSON.parse(line);
            if (step.type === 'USER_INPUT' && step.source === 'USER_EXPLICIT') {
                turnPrompts.push(step);
            }
        }
        
        if (turnPrompts.length === 0) {
            process.stdout.write(JSON.stringify({ decision: "stop" }));
            process.exit(0);
        }

        const lastPromptStep = turnPrompts[turnPrompts.length - 1];
        const lastPromptIndex = lastPromptStep.step_index;
        
        let responses = [];
        for (const line of lines) {
            const step = JSON.parse(line);
            if (step.step_index > lastPromptIndex && step.type === 'PLANNER_RESPONSE' && step.source === 'MODEL' && step.content) {
                responses.push(step.content);
            }
        }
        
        const finalResponse = responses.join('\n\n') || "[No textual response, tools executed only]";
        const timestamp = new Date().toISOString();
        const modelName = data.modelName || 'gemini-3.1-pro';
        const sessionId = data.conversationId;
        
        const firstPromptTime = turnPrompts[0].created_at;
        // Parse date for filename
        // 2026-09-06T01:42:59Z
        const sessionDateStr = firstPromptTime.split('T')[0];
        const sessionTimeStr = firstPromptTime.split('T')[1].replace(/:/g, '-').split('.')[0].replace('Z', '');
        
        // Workspace root is assumed to be up 2 dirs from this script (.agents/scripts)
        const rootDir = path.join(__dirname, '..', '..');
        const logDir = path.join(rootDir, '.agent-logs');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        
        const shortSessionId = sessionId.substring(0, 8);
        const logFilePath = path.join(logDir, `${sessionDateStr}_${sessionTimeStr}_${sessionId}.md`);
        
        const exchangeNum = turnPrompts.length;
        
        let content = '';
        if (!fs.existsSync(logFilePath)) {
             content += `---
session_id: ${sessionId}
date: ${sessionDateStr}
author: antigravity-user
model: ${modelName}
tool: antigravity-ide
project: AZAISCLONE
total_exchanges: ${exchangeNum}
first_prompt_time: ${firstPromptTime}
last_prompt_time: ${lastPromptStep.created_at}
---

# Session Log - ${sessionDateStr}

Session: \`${shortSessionId}\` | Project: \`AZAISCLONE\` | Author: \`antigravity-user\`

---

`;
        }
        
        content += `[LOG_ENTRY type=PROMPT num=${exchangeNum} session=${shortSessionId}]
timestamp: ${lastPromptStep.created_at}
model: ${modelName}

${lastPromptStep.content}


[LOG_ENTRY type=RESPONSE num=${exchangeNum} session=${shortSessionId}]
timestamp: ${timestamp}
model: ${modelName}

${finalResponse}


`;
        
        fs.appendFileSync(logFilePath, content);
        
        process.stdout.write(JSON.stringify({ decision: "stop" })); 
    } catch (e) {
        // If anything fails, still tell the agent to stop so we don't break the IDE loop
        process.stdout.write(JSON.stringify({ decision: "stop", error: e.toString() }));
        process.exit(0);
    }
});
