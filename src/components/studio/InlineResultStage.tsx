'use client';

import { Play, Maximize2, Download, RefreshCw, X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface InlineResultStageProps {
  mediaUrl: string;
  mediaType: 'video' | 'image';
  prompt: string;
  onDismiss: () => void;
  onRemix: () => void;
}

export function InlineResultStage({
  mediaUrl,
  mediaType,
  prompt,
  onDismiss,
  onRemix,
}: InlineResultStageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-[#131315] border border-border-medium overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
      {/* Header Actions */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/50 to-transparent">
        <h3 className="text-white font-medium truncate max-w-md">Generated Result</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition-colors backdrop-blur-md">
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
          <button 
            onClick={onRemix}
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition-colors backdrop-blur-md"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Remix</span>
          </button>
          <button 
            onClick={onDismiss}
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors backdrop-blur-md ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Media Container */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
        {mediaType === 'video' ? (
          <video
            src={mediaUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
            loop
            muted
          />
        ) : (
          <img
            src={mediaUrl}
            alt="Generated Result"
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Hover Controls (Mock) */}
        {mediaType === 'video' && (
          <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none">
             <div className="flex items-center gap-4 pointer-events-auto">
                <button className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 backdrop-blur-md transition-colors">
                  <Play className="h-5 w-5 ml-1" />
                </button>
                <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-accent-cyan rounded-full"></div>
                </div>
                <span className="text-xs text-white font-mono">00:04 / 00:10</span>
                <button className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 backdrop-blur-md transition-colors">
                  <Maximize2 className="h-5 w-5" />
                </button>
             </div>
          </div>
        )}
      </div>

      {/* Prompt Footer */}
      <div className="px-6 py-4 bg-[#131315] border-t border-border-subtle flex items-center justify-between">
        <p className="text-sm text-zinc-400 truncate max-w-[80%]">{prompt}</p>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy Prompt'}
        </button>
      </div>
    </div>
  );
}
