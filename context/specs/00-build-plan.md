# Build Plan: AzaisAI Clone

This document breaks the entire build into sequential, testable units. Each unit is designed to produce a standalone, visible result before moving to the next, strictly following the established architecture and user flow.

## Unit 1: Foundation & Design System
- **What it builds:** Initializes the Next.js (App Router) project. Installs Tailwind CSS and `shadcn/ui`. Configures `tailwind.config.ts` with the exact colors, typography (Plus Jakarta Sans, Space Grotesk), and border-radius tokens defined in `design.md`. Creates the global `layout.tsx` shell.
- **Dependencies:** None.
- **Visible Result:** A blank page that successfully renders test text in the correct brand fonts and dark mode colors.

## Unit 2: Landing Page
- **What it builds:** The static `/` route. Includes the Hero section, the Feature Showcase grid, and the static Pricing table. Adds the main CTA button routing to the studio.
- **Dependencies:** Unit 1.
- **Visible Result:** The complete public-facing homepage matching the Cinematic AI Dark Mode aesthetic.

## Unit 3: Studio UI Shell & Local State (Zustand)
- **What it builds:** The `/studio/video` and `/studio/image` routes. Builds the configuration panel (Model, Aspect Ratio, Duration selectors) and the Prompt text area. Implements Zustand with `persist` middleware to save these inputs locally.
- **Dependencies:** Unit 1.
- **Visible Result:** A functional studio form where a user can enter a prompt and select settings, refresh the browser, and see their inputs perfectly preserved.

## Unit 4: Supabase Auth & Login Gate
- **What it builds:** Initializes the Supabase client. Builds the global Login Modal. Implements Email OTP authentication. Wires the "Generate" button to check auth state: if unauthenticated, open the modal; if authenticated, proceed.
- **Dependencies:** Unit 3 (needs the Generate button to hook into).
- **Visible Result:** An unauthenticated user clicking "Generate" triggers the modal, logs in via email, and returns to the studio with their prompt state still intact.

## Unit 5: Prompt Enhancement (Gemini API)
- **What it builds:** A server-side `/api/enhance` route integrating the Google Gemini free tier. Adds the "Enhance Prompt" button to the Studio UI with a localized loading spinner.
- **Dependencies:** Unit 3 (needs the Prompt text area).
- **Visible Result:** Clicking the "Enhance" button replaces the user's short prompt with a highly detailed, optimized prompt after a brief loading state.

## Unit 6: Mock Database & Async Generation Pipeline
- **What it builds:** Sets up the Supabase PostgreSQL tables (`users`, `generations`, `credit_ledgers`) and Storage buckets. Builds the client-side 15-second polling UI (progress bar/spinner). Builds the server logic to deduct a credit and return a pre-existing mock media URL.
- **Dependencies:** Unit 4 (Auth is required to deduct credits and save to DB).
- **Visible Result:** An authenticated user clicks "Generate", sees a 15-second "Generating..." animation, and is then presented with a playable mock video in the canvas.

## Unit 7: Image-to-Video Upload
- **What it builds:** A drag-and-drop zone in the Video Studio. Handles uploading a local image file directly to Supabase Storage and storing the returned URL in the Zustand state as a base frame.
- **Dependencies:** Unit 6 (Requires Supabase Storage to be configured).
- **Visible Result:** The user can drag an image into the studio UI, see a thumbnail preview, and initiate a generation with that image attached.

## Unit 8: History & User Gallery
- **What it builds:** The `/history` private route. Fetches the authenticated user's past generations from the `generations` table and displays them in a responsive bento grid.
- **Dependencies:** Unit 6 (Requires populated database tables).
- **Visible Result:** The user can navigate to `/history` and view all their generated videos and images.
