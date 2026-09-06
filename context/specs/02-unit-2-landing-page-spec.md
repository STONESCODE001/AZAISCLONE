# Unit 2: Landing Page Spec

## Goal
Build a cinematic, dark mode landing page for AzaisAI that showcases AI media generation capabilities, highlights the production pipeline, displays an archive of creator outputs, and drives user conversion to the studio.

## Design
- **Theme & Aesthetics:** True dark mode aesthetic using deep background colors (`bg-surface` which is `#131315`), contrasting light text, and vibrant cyan accents (`#5de6ff`) for active elements. Uses a glassmorphic blurred header.
- **Typography:** Utilizes `Plus Jakarta Sans` for display and body text, and `Space Grotesk` for numeric labels and metadata tags.
- **Structural Layout:** 
  - **Header:** Sticky top navigation with logo, nav links (Home, Dashboard, FAQ, Pricing), and authentication CTAs.
  - **Hero:** Centered typography ("Turn Ideas Into Cinematic Reality") paired with a large, visually striking "video player" mock card showing an active prompt and rendering metadata.
  - **Pipeline Section:** A 3-column feature grid explaining the generation process (Select Model, Describe Scene, Export 4K).
  - **Creator Archive:** A responsive 4-column grid (bento style) of generated video/image thumbnails from different models (Veo 3.1, Sora 2.0, Runway Gen-3, Midjourney v6.1) featuring smooth scale-up hover effects.
  - **Bottom CTA:** A dynamic layout with floating, rotated image cards and a final call to action to start creating.
  - **Footer:** Minimal footer with a "Models Operational" status indicator, copyright, and legal links.

## Implementation

### 1. Navigation Components
- **File:** `src/components/landing/header.tsx`
- **Details:** Implement a `fixed top-0 w-full z-50` header with `backdrop-blur-xl`. Include the logo, desktop navigation links, and "Sign In" / "Start Creating Free" buttons.
- **File:** `src/components/landing/footer.tsx`
- **Details:** Build a simple footer containing the logo, copyright text, "Models Operational" status pill, and legal links.

### 2. Main Page Sections
- **File:** `src/components/landing/hero.tsx`
- **Details:** Construct the main headline and the central video player mockup. The mockup should include gradient overlays, metadata chips (e.g., "Veo 3.1", "4K UHD 60FPS"), and a mock "Active Prompt" area.
- **File:** `src/components/landing/pipeline-section.tsx`
- **Details:** Build a 3-column grid. Each column represents a step (01, 02, 03) with a title, description, and sub-metrics styled with Space Grotesk.
- **File:** `src/components/landing/archive-section.tsx`
- **Details:** Create a 4-column grid of media cards. Cards must use `aspect-[...]` ratios or fixed heights (`h-[480px]`), with absolute positioned background images and a `group-hover:scale-105` transition. Overlay metadata chips and prompt text on top of a dark gradient.
- **File:** `src/components/landing/bottom-cta.tsx`
- **Details:** Assemble the bottom CTA with floating, slightly rotated decorative images and a central action button. Add a subtle blurred background glow element.

### 3. Page Assembly
- **File:** `src/app/page.tsx`
- **Details:** Replace the existing Unit 1 placeholder content with the newly created components in the correct order: `Header`, `Hero`, `PipelineSection`, `ArchiveSection`, `BottomCTA`, and `Footer`.

## Dependencies
- `lucide-react` (for icons like Play, Check, Chevron).
- Next.js `next/image` or standard `div` with background images for the placeholder assets. 
*(No major external packages required beyond the standard Tailwind/Shadcn setup).*

## Verification Checklist
- [ ] Sticky header applies a blur effect when scrolling down the page.
- [ ] Hero video player mockup renders correctly with overlaid chips and mock prompt text.
- [ ] Pipeline section collapses from 3 columns to 1 column on mobile viewports.
- [ ] Creator archive cards display image hover scale animations without overflowing their containers.
- [ ] The layout adheres strictly to the Cinematic Dark Mode theme, avoiding light mode or generic white surfaces.
- [ ] Fonts (Plus Jakarta Sans and Space Grotesk) render correctly for headings and numeric labels.
