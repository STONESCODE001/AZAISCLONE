# Code Standards

## General

- Keep modules small and single-purpose; do not mix unrelated concerns in one component or route.
- Fix root causes instead of layering workarounds (e.g., if Zustand state is out of sync, fix the hydration logic, don't just add a `useEffect` timeout).
- Fail fast and gracefully; if an API call fails or auth is missing, show a clear error state or redirect rather than throwing unhandled exceptions.

## TypeScript

- Strict mode is required throughout the project (`"strict": true` in `tsconfig.json`).
- Avoid `any` completely — use explicit interfaces, narrowly scoped types, or `unknown` with type narrowing.
- Validate unknown external input at system boundaries (e.g., API route payloads from the client) using a validation library like Zod before trusting it.

## Next.js

- Default to React Server Components (RSC) to maximize performance and SEO.
- Add `"use client"` only when browser interactivity, React hooks (useState, useEffect), or Zustand stores are strictly required.
- Keep route handlers (`/api/`) focused on a single responsibility and keep them thin by extracting complex business logic into separate files in `src/lib/`.

## Styling

- *(Pending finalized `design.md`)* Use CSS custom property tokens or strict Tailwind utility classes—no arbitrary hardcoded hex values in the JSX (e.g., avoid `bg-[#123456]`).
- *(Pending finalized `design.md`)* Follow the border radius, spacing, and elevation scale defined in your upcoming design system.
- Extract highly repeated class string combinations into reusable components (e.g., using `cva`) rather than copying long Tailwind strings across files.

## API Routes

- Validate and parse all incoming request input (body, query params) before executing any core logic.
- Enforce Supabase authentication and verify user ownership (via secure session tokens) before performing any database mutation or mock credit deduction.
- Return consistent, predictable JSON response shapes (e.g., always returning `{ data: null, error: "message" }` on failure).

## Data and Storage

- Relational data and metadata (user profiles, credit ledgers, generation logs) belong strictly in the Supabase PostgreSQL database.
- Bulky generated media (MP4 videos, PNG images) belongs strictly in Supabase Storage buckets.
- Do not store large binary content or long base64 strings directly in the database; always upload to storage and store the reference URL in the database.

## File Organization

- `src/app/` — Owns Next.js routing, Server Components, page layouts, and API Route Handlers.
- `src/components/ui/` — Owns "dumb", purely presentational, reusable UI components (e.g., shadcn/ui components). No business logic, fetching, or Zustand state.
- `src/components/features/` — Owns "smart" client components that connect to Zustand stores, handle complex UI interactions, or orchestrate API calls.
- `src/store/` — Owns Zustand global state definitions, slices, and persistence logic.
- `src/lib/` — Owns shared utility functions, database types, Supabase client initializers, and data validation schemas.
