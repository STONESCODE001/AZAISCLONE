# Unit 2b: UI Render Synchronization & Design Refresh Spec

## Goal
Update the global design system (`globals.css` and `DESIGN.md`) to establish the Cinematic Dark Mode UI render as the permanent source of truth, and comprehensively refactor the Landing Page components to match this visual standard.

## Design
- **Theme & Palette:** Establish a true Cinematic Dark Mode by default.
  - **Background:** Obsidian/Dark Charcoal (e.g., `#131315` or `oklch` equivalent).
  - **Primary Foreground:** Stark white (`#FFFFFF`) for main headings and primary buttons.
  - **Accent:** Vibrant Cyan (`#5de6ff` or `#22D3EE`) reserved for overlines, status dots, and specific text highlights.
- **Typography:** `Plus Jakarta Sans` for clean, geometric headlines and body text; `Space Grotesk` for monospace metrics (step numbers, metadata, rendering status).
- **Component Styling:**
  - **Buttons:** Primary CTAs are solid white with dark text. 
  - **Cards:** Dark surfaces with subtle hairline borders (`border-white/10`) and slight inner glows, avoiding heavy drop shadows.
  - **Section Headers:** Small, centralized cyan overlines (e.g., "STREAMLINED PIPELINE") positioned above the main section titles.

## Implementation

### 1. Global Design System Sweep
- **File:** `context/DESIGN.md` (and related global rules)
  - **Details:** Overwrite any light-mode assumptions. Document the new primary white buttons, cyan accents, and `#131315` backgrounds as the absolute source of truth.
- **File:** `src/app/globals.css`
  - **Details:** Refactor the `:root` pseudo-class. Remove the current light-mode Shadcn defaults (e.g., `--background: oklch(1 0 0)`). Map the standard Tailwind variables (`--background`, `--foreground`, `--primary`, etc.) to the Cinematic Dark Mode palette.

### 2. Hero Section Refactor
- **File:** `src/components/landing/hero.tsx`
  - **Details:** 
    - Change the main CTA button ("Start Creating Free") to solid white with dark text.
    - Update the subheadline copy to exactly match the render: *"Direct Sora, Veo 3.1, and Runway in 4K with natural language. Zero render farms, no upfront commitment."*
    - Ensure the central mock video player overlay styles match the sleek, dark glassmorphism of the UI render.

### 3. Pipeline Section Refactor
- **File:** `src/components/landing/pipeline-section.tsx`
  - **Details:** 
    - Add the cyan overline `"STREAMLINED PIPELINE"` above the main "From Script to Master Cut in 3 Steps" title.
    - Update step cards: Large numbers (`01`, `02`, `03`) should be muted/translucent.
    - Change the bottom metrics of each card to match the cyan footer format from the render (e.g., `"Match Models -> Auto-selected"`).

### 4. Creator Archive Refactor
- **File:** `src/components/landing/archive-section.tsx`
  - **Details:** 
    - Add the cyan overline `"CREATOR ARCHIVE"` above the main section title ("Production Output").
    - Ensure the right-aligned status indicator ("Live (30 FPS 4K)") is present.
    - Refactor card metadata pills to match the render exactly (e.g., specific tags like `"Veo 3.1"` and `"4K • 60fps"` side-by-side).
    - Add a dark gradient overlay at the bottom of the cards to ensure prompt text readability.
    - Add the `"See More Archive Works"` dropdown/button below the grid.

### 5. Bottom CTA Refactor
- **File:** `src/components/landing/bottom-cta.tsx`
  - **Details:** 
    - Update the headline to: *"Your Next Masterpiece Starts Here"*.
    - Update subheadline to: *"Turn natural language prompts into Hollywood-grade cinematic sequences in seconds with Veo 3.1, Sora, and Runway Gen-3."*
    - Ensure the CTA button is solid white.
    - Add the sub-footer trust text: *"No credit card required • 10 free generations included"*.

## Dependencies
- No new NPM packages are required. The current Shadcn UI (`lucide-react`, `class-variance-authority`, `cn`) and Tailwind setup is sufficient.

## Verification Checklist
- [ ] `globals.css` enforces the dark background and light foreground by default across the entire application.
- [ ] Landing page background renders correctly without overriding hardcoded utility classes.
- [ ] All primary CTA buttons on the landing page are solid white with dark text.
- [ ] Cyan overlines ("STREAMLINED PIPELINE", "CREATOR ARCHIVE") appear above their respective sections.
- [ ] Step cards display the cyan footer text as specified in the render.
- [ ] The "See More Archive Works" button is visible at the bottom of the archive grid.
