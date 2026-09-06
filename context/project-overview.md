# Project Overview: AzaisAI Clone

## Overview
AzaisAI Clone is a premium web application that allows content creators and AI enthusiasts to seamlessly generate AI videos and images from text prompts or uploaded images. It provides a frictionless interface where users can experiment with prompts, upload base images, and configure models immediately upon visiting, before being guided through an email authentication flow. To prioritize development speed and UX quality, the application simulates the heavy asynchronous AI generation process, returning high-quality pre-rendered assets while demonstrating a robust polling architecture and state management.

## Goals
1. Implement a persistent global state that preserves 100% of unauthenticated user input (prompts, uploaded images, aspect ratios, model selections) across the Supabase authentication flow.
2. Build a functional prompt enhancement pipeline using the Google Gemini API that returns an optimized prompt in under 3 seconds.
3. Simulate a realistic asynchronous media generation flow that polls a mock endpoint for exactly 15 seconds before displaying a finalized video/image asset from Supabase Storage.
4. Achieve a visually polished, dark-mode UI with zero layout shifts during loading states and modal transitions.

## Core User Flow
1. User navigates to `/` (Landing Page) and clicks "Get Started".
2. User is redirected to `/studio/video` (unauthenticated state).
3. User types a prompt, optionally uploads an image for Image-to-Video generation, selects the "Veo" model, and clicks "Enhance".
4. The Gemini API rewrites the prompt, and the input field updates with the enhanced text.
5. User clicks "Generate Video".
6. The application detects the unauthenticated state and opens a global Login Modal over the current view.
7. User enters their email address and requests an OTP.
8. User retrieves the OTP from their email and enters it into the modal.
9. Supabase Auth verifies the OTP, logs the user in, and the modal closes automatically.
10. The user clicks "Generate Video" again (their enhanced prompt, uploaded image, and settings are still perfectly intact).
11. The UI enters a 15-second polling state, displaying a "Generating..." animation.
12. A mock generation function completes, fetching a pre-existing asset URL from Supabase Storage.
13. The generated video is displayed in the main canvas and a record is added to the user's History.

## Features

### Generation Studio
- **Text-to-Video/Image Input:** Multiline text area for prompt entry.
- **Image-to-Video Upload:** Drag-and-drop file upload zone allowing users to upload custom images (or select from their generation history) to use as base frames for video generation.
- **Prompt Enhancement:** One-click integration with Google Gemini to optimize user prompts.
- **Configuration Controls:** Selectors for AI Models (Sora, Veo), Aspect Ratios (16:9, 9:16), and Durations (5s, 6s, 8s).
- **Async Loading State:** Visual progress indicators during the mock generation polling cycle.

### Authentication & User Management
- **Email OTP Login:** Passwordless authentication via Supabase.
- **State Preservation:** Zustand-powered `localStorage` persistence for unauthenticated studio sessions.
- **Credit System:** Simulated credit deduction per generation attempt.

### History & Asset Management
- **User Gallery:** A dedicated `/history` route displaying a grid of past generated videos and images.
- **Asset Playback:** In-browser video player for generated mp4 files.

## In Scope
- Landing page with hero section and static pricing table.
- Complete Video and Image Studio UI layouts.
- Image upload functionality for Image-to-Video generation (including drag-and-drop UI and storing the uploaded image in Supabase).
- Google Gemini API integration for the prompt enhancer.
- Supabase Email OTP authentication.
- Client-side state persistence across the auth boundary.
- Mocked asynchronous generation pipeline (frontend polling).
- Displaying pre-stored assets from Supabase Storage.
- Basic credit deduction logic in the UI/mock database.

## Out of Scope
- Integration with real AI video/image generation APIs (e.g., Sora, Runway, Veo).
- SMS/Phone verification flow (Email OTP is the sole auth method).
- Payment gateway integration (Stripe, PayPal, etc.).
- In-browser video editing, trimming, or image inpainting tools.
- Community feeds or public sharing of generated assets.

## Success Criteria
- An unauthenticated user can enter a prompt or upload an image on `/studio/video`, log in via Email OTP, and generate a video without losing their input.
- A user can successfully upload a custom image file via drag-and-drop to use for Image-to-Video generation.
- Clicking the "Enhance" button successfully calls the Gemini API and updates the text input with a new prompt.
- Initiating a generation triggers a 15-second visual loading state that resolves to a playable video file fetched from Supabase Storage.
- A signed-in user can navigate to `/history` and view a grid of their previously generated assets.
