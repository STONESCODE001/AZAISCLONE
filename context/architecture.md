# Architecture: AzaisAI Clone

## Technology Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | Handles React server/client components, routing, and backend API endpoints. |
| **Styling** | Tailwind CSS + shadcn/ui | Provides utility-first styling and accessible, reusable UI components. |
| **State Management** | Zustand (with persist) | Manages global client state, specifically persisting unauthenticated user inputs. |
| **Backend & DB** | Supabase PostgreSQL | Stores relational data (users, credit ledgers, generation history). |
| **Authentication** | Supabase Auth | Handles passwordless Email OTP login and session management. |
| **File Storage** | Supabase Storage | Hosts the mocked MP4 video and PNG image assets. |
| **LLM API** | Google Gemini API | Powers the "Prompt Enhancement" feature on the server side. |

## System Boundaries

The application strictly follows the `src/` directory convention. Responsibilities are divided as follows:

- `src/app/`: Owns routing, Server Components, and page layouts.
- `src/app/api/`: Owns server-side Route Handlers. This is the only boundary allowed to communicate with external APIs using secret keys (Gemini, Supabase Service Role).
- `src/components/ui/`: Owns purely presentational, "dumb" components (buttons, inputs, dialogs from shadcn/ui). Must not contain business logic or state.
- `src/components/features/`: Owns "smart" client components (e.g., the Video Studio form). These connect to Zustand stores and trigger API calls.
- `src/store/`: Owns Zustand global state definitions and persistence logic.
- `src/lib/`: Owns shared utility functions, database types, and Supabase client initializers.

## Storage Model

Data is strictly categorized into three storage mediums based on permanence and payload size:

- **Database (Supabase PostgreSQL):** Stores structured, permanent data. Includes the `users` table (profiles, credit balances) and the `generations` table (prompt used, model used, timestamp, and a reference URL to the storage bucket).
- **File Storage (Supabase Storage):** Stores the actual bulky media assets. Pre-rendered `.mp4` and `.png` files reside here. The database only stores the public URL pointing to these files.
- **Cache/Local (localStorage via Zustand):** Stores ephemeral, pre-authentication data. Specifically holds the user's drafted prompt, uploaded image data (as base64 or temporary URLs), and model choices so they survive page reloads and the login flow.

## Auth & Access Model

- **Authentication Method:** Users authenticate exclusively via Supabase Email OTP (magic links). No passwords or social logins are implemented in this phase.
- **Access Control:** The `/studio` routes are publicly accessible to allow users to build their prompts. However, the `Generate` action and the `/history` route require an active authenticated session.
- **Ownership:** Row Level Security (RLS) policies in Supabase Postgres ensure that a user can only query `generations` and `credit_ledgers` where the `user_id` matches their authenticated session token.

## AI & Background Tasks

- **Prompt Enhancement (Synchronous):** When a user clicks "Enhance", the client calls a Next.js API route (`/api/enhance`). The API route securely calls the Google Gemini API with a system prompt to optimize the user's text, returning the result synchronously to the client.
- **Mock Generation Pipeline (Asynchronous Polling):** To simulate heavy AI generation, clicking "Generate" triggers a client-side polling mechanism. The UI displays a progress state for exactly 15 seconds. After the timer expires, the client fetches a pre-uploaded media URL from Supabase Storage and deducts a mocked credit from the user's ledger.

## Invariants

The codebase must never violate the following rules:

1. **No Leaked Secrets:** API keys (Google Gemini, Supabase Service Role Key) must never be exposed to the client. The `.env.local` file must remain strictly in `.gitignore`.
2. **Preserve User Intent:** A user's typed prompt, uploaded images, and configuration settings must never be lost if they are forced into the login flow. State must be preserved locally.
3. **Server-Side Write Verification:** All database writes (e.g., deducting a credit or saving a generation to history) must verify the user's authentication token securely on the server side (via API routes or Server Actions), never trusting client-side claims.
4. **Pure UI Components:** Components residing in `src/components/ui/` must remain purely presentational. They cannot import Zustand stores or execute direct Supabase client queries.
