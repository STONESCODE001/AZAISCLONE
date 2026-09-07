# Specification: Dashboard Creation State & Cinematic Media Inspection Stage

## Goal
Establish a high-impact, cinematic "Creation State" for the AzaisAI `/dashboard` intent prompter immediately following prompt execution and video/image generation, presenting users with an immersive media inspection stage, video controls (defaulting to paused state), prompt copying capabilities, and detailed media metadata.

---

## Design

### Visual & Structural Decisions
1. **Ambient Layer & Depth Scrim**:
   - High-blur ambient depth glows (`bg-secondary/5 blur-[128px]` and `bg-surface-container-high/40 blur-[140px]`) behind the inspector container using AzaisAI design tokens.
   - Backdrop veil (`bg-surface-container-lowest/80 backdrop-blur-md`) providing contextual focus over the dashboard background.
   - Subtle ghost backdrop elements visualizing underlying studio/library context.

2. **Top Utility Header**:
   - **Index & Archive Label**: `INDEX 04 / 28` tag alongside `STUDIO ARCHIVE` badge.
   - **Shortcut Indicator**: `<kbd>` style keyboard hint pill displaying `ESC`.
   - **Dismiss Action**: Circular close button with 90-degree hover icon rotation.

3. **Cinematic Inspection Stage (Media Canvas)**:
   - 16:9 responsive media frame featuring subtle top/bottom dark vignette gradients.
   - Videos default to a **paused state** on creation state entry.
   - Interactive Scrubber Bar with smooth playhead fill indicator and hover handle.
   - Transport metadata bar featuring:
     - Play/Pause toggle with animated state changes.
     - Dynamic timecode (`00:04.2 / 00:09.6`).
     - Technical resolution badge (`4K 60FPS`).
     - Audio mute/unmute and Fullscreen frame toggles.
   - Floating lateral gallery chevrons (`chevron_left` / `chevron_right`) for cycling through recent studio reel items.

4. **Primary Meta & Action Controls**:
   - **Engine & Title Header**: Pulsing status dot with engine identifier (e.g. `Veo Cinematic Engine`) and asset title (e.g., `Liquid Mercury Ripple Study`).
   - **Primary Action Cluster**:
     - **Remix in Studio**: Solid primary button (`auto_fix_high` / `Sparkles`) rendered per design mockup (interaction behavior will be wired in future iterations).
     - **Download MP4**: Elevated secondary button with animated preparing spinner feedback.
     - **More Options**: Icon button (`more_horiz`) for secondary actions (share, upscale, delete).

5. **Prompt Pill Box**:
   - Clean dark container (`bg-surface-container`) displaying prompt text with `line-clamp-2`.
   - Dedicated "Copy Prompt" button with clipboard integration and active `Copied` / `check` icon feedback.

6. **Whisper Technical Metadata Grid**:
   - Minimalist footer layout displaying aspect ratio (`16:9 Landscape`), resolution (`3840 × 2160`), seed number (`849021743`), creation timestamp (`Today, 14:28`), and engine build tag (`AzaisAI Compute v2.4`).

---

## Implementation

### 1. Component Overhaul & File Structures
- **[MODIFY] [InlineResultStage.tsx](file:///c:/Users/THE/LAPTOP/STORE/Desktop/AZAISCLONE/src/components/studio/InlineResultStage.tsx)**:
  - Redesign to incorporate the full Stitch Cinematic Inspection Stage specifications.
  - Implement internal scrubber timeline state, play/pause controls (defaulting to paused), and copy feedback timers.
  - Add gallery browsing state to cycle between items from history/reel.

- **[MODIFY] [page.tsx](file:///c:/Users/THE/LAPTOP/STORE/Desktop/AZAISCLONE/src/app/dashboard/page.tsx)**:
  - Wire `InlineResultStage` into the dashboard generation completion workflow.

- **[MODIFY] [MediaDetailModal.tsx](file:///c:/Users/THE/LAPTOP/STORE/Desktop/AZAISCLONE/src/components/library/MediaDetailModal.tsx)**:
  - Align library modal aesthetics with `InlineResultStage` for a unified AzaisAI design system experience across Dashboard and Library.

### 2. Micro-Interactions & Keyboard Events
- **Keyboard Shortcuts**:
  - `ESC`: Close/dismiss the creation state and return to idle `IntentPromptBar`.
  - `ArrowLeft` / `ArrowRight`: Navigate to previous or next item in studio history.
  - `Space`: Toggle media playback.
- **Copy Prompt Action**:
  - Triggers `navigator.clipboard.writeText(prompt)`.
  - Swaps icon from `Copy` to `Check` and button label to `Copied` for 2 seconds.
- **Download Action**:
  - Simulates preparation state: `Preparing...` (with spinner) -> `Ready` (with checkmark) -> reset after 1.5s.

---

## Dependencies
- `lucide-react`: For standard icons (`Sparkles`, `Download`, `Copy`, `Check`, `ChevronLeft`, `ChevronRight`, `Play`, `Pause`, `Maximize2`, `Volume2`, `VolumeX`, `MoreHorizontal`, `X`, `RefreshCw`).
- Existing AzaisAI color tokens configured in `globals.css`.

---

## Verification Checklist

- [ ] **Visual Parity**: Layout, background ambient glow, top utility bar, and metadata grid match Stitch project design (`13760738940484093698` / screen `fcf6422b63db45558d5e540300fed699`).
- [ ] **Playback Default**: Videos default to paused upon entering creation state.
- [ ] **Interactive Scrubber**: Timeline bar updates position during playback and allows manual scrubbing.
- [ ] **Copy Prompt**: Clicking copy successfully writes to clipboard with user feedback.
- [ ] **Download Feedback**: Download button displays active state transition while preparing file.
- [ ] **Keyboard Navigation**: Pressing `ESC` closes the modal state; pressing `Arrow` keys cycles through media history.
- [ ] **Responsive Design**: Flawlessly adapts across desktop (1200px+), tablet (768px), and mobile viewports.
