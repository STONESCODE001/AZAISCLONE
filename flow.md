# User Journey & Application Flow

This document outlines the core user journey for the AzaisAI Clone, mapped out step-by-step using Mermaid.js. It focuses strictly on user actions, system decisions, and state changes.

## Core Generation Flow

The following flowchart details the exact path a user takes from landing on the site to configuring their generation, passing the authentication gate, and receiving their media.

```mermaid
flowchart TD
    %% User entry
    Visit[User Visits Landing Page] --> ClickGetStarted[Clicks 'Get Started']
    
    %% Unauthenticated Studio Flow
    subgraph Configuration Phase
        ClickGetStarted --> Studio[Redirected to Studio]
        Studio --> Configure[Selects AI Model, Aspect Ratio & Duration]
        Configure --> Input[Enters Prompt or Uploads Base Image]
        
        Input -.->|Optional| Enhance[Clicks 'Enhance Prompt']
        Enhance -.->|System| Gemini[Gemini API Optimizes Text]
        Gemini -.-> Input
        
        Input --> ClickGenerate[Clicks 'Generate' Button]
    end
    
    %% Authentication Gate
    AuthGate{Is User Logged In?}
    ClickGenerate --> AuthGate
    
    %% Auth Process
    subgraph Authentication Gate
        AuthGate -- No --> ShowModal[Display Login Modal]
        ShowModal --> EnterEmail[User Submits Email]
        EnterEmail -->|System| SendOTP[Supabase Sends OTP]
        SendOTP --> EnterOTP[User Submits 6-digit Code]
        EnterOTP -->|System| Verify[Validate Session]
    end
    
    Verify -->|Success| RestoreState
    
    %% Authenticated Generation Flow
    subgraph Generation Process
        RestoreState[System Restores Previous Config/Input State]
        AuthGate -- Yes --> ExecuteGen[Initiate Mock Generation]
        RestoreState --> ExecuteGen
        
        ExecuteGen -->|System| Deduct[Deduct Credits in DB]
        Deduct -->|System| Polling[Simulate 15s Loading State]
        Polling -->|System| FetchAsset[Retrieve Pre-rendered Asset from Storage]
        FetchAsset --> Display[Render Video/Image in UI]
    end
    
    %% Post-Generation
    Display -->|System| SaveHistory[Log Generation in DB]
    SaveHistory --> ViewHistory[User Views Gallery in History Page]
```

## Key Architectural Decisions in this Flow:
1. **Unauthenticated Access:** The user is allowed deep into the product (configuring models and prompts) before being prompted to log in. This maximizes conversion.
2. **State Persistence:** The bridge between `Verify` and `RestoreState` relies heavily on Zustand `localStorage` to ensure the user's selected model and typed prompt are not lost.
3. **Mock Async Pipeline:** The 15-second polling state accurately simulates how real AI Video APIs (like Runway or Sora) operate, demonstrating frontend polling mechanics without the backend complexity.
