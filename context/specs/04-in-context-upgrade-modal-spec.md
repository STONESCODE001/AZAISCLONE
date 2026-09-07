# Feature Spec: AzaisAI In-Context Upgrade Modal

## Goal
Implement an in-context Upgrade Modal for AzaisAI that opens when users click the "Upgrade" button in the navigation header or exhaust their compute credits, allowing them to choose between monthly subscription tiers (Pro Creator) and pay-as-you-go compute refills (Compute Pack) with an ultra-sleek, glassmorphic UI.

## Design
- **Backdrop & Backdrop Blur**: Full-screen backdrop overlay (`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in`) with click-outside-to-dismiss behavior.
- **Container Structure**: Card container with `max-w-[700px] w-full rounded-3xl border border-white/10 bg-[#0e0e10] p-6 sm:p-8 shadow-2xl subtle-border animate-scale-in`.
- **Header Section**:
  - **Status Badge**: Cyan overline pill (`inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-400 uppercase`) with a glowing dot indicator (`h-1 w-1 rounded-full bg-cyan-400`).
  - **Title**: `"Refuel Your Studio"` (`text-2xl sm:text-3xl font-bold tracking-tight text-white`).
  - **Subtitle**: `"Unlock high-throughput rendering queues and higher resolutions. No long-term lock-in."` (`text-xs sm:text-sm text-zinc-400 leading-relaxed`).
  - **Close Button**: Absolute positioned top-right pill icon button (`h-9 w-9 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10`).
- **Upgrade Tiers Grid (2 Columns)**:
  - **Pro Creator Membership (Featured Option)**:
    - **Container**: `relative flex flex-col justify-between rounded-2xl border border-white/20 bg-[#161619] p-5 glow-accent transition-all hover:border-white/30`.
    - **Badge**: Top-right floating "Most Popular" pill (`absolute -top-2.5 right-4 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black`).
    - **Pricing**: `$29` (`text-3xl font-extrabold text-white`) `/ month` (`text-xs text-zinc-400`).
    - **Feature List**:
      - `1,200 monthly 4K credits` (bold count)
      - `Veo 3.1 & Sora 2 priority line`
      - `Full commercial rights & 4K exports`
      - Cyan checkmark icons (`text-cyan-400`).
    - **Primary CTA**: `w-full rounded-full bg-white py-2.5 px-4 text-xs font-bold text-black hover:bg-zinc-200 active:scale-[0.98] flex items-center justify-center gap-1.5` ("Upgrade to Pro →").
  - **Compute Pack (One-Time Refill)**:
    - **Container**: `relative flex flex-col justify-between rounded-2xl border border-white/5 bg-[#121214] p-5 transition-all hover:border-white/15`.
    - **Pricing**: `$12` (`text-3xl font-extrabold text-white`) `one-time` (`text-xs text-zinc-400`).
    - **Feature List**:
      - `300 immediate credits` (bold count)
      - `Credits never expire`
      - `Zero recurring billing`
      - Muted checkmark icons (`text-zinc-400`).
    - **Secondary CTA**: `w-full rounded-full border border-white/15 bg-white/5 py-2.5 px-4 text-xs font-semibold text-white hover:bg-white/10 hover:border-white/25 active:scale-[0.98]` ("Buy 300 Credits").
- **Footer Microcopy & Payment Badges**:
  - Reassurance text: Security lock icon (`Lock` from `lucide-react`) + `"Encrypted via Stripe • Instant studio activation • Cancel anytime"`.
  - Express payment chips: Monochrome pills for `"Apple Pay"`, `"G Pay"`, and `"Visa / MC"` (`rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300`).

## Implementation

### 1. Modal Component Enhancement
- **File**: `src/components/modals/UpgradeModal.tsx`
- **Details**:
  - Refactor component props to accept `isOpen: boolean`, `onClose: () => void`, and optional `onSelectPlan?: (planId: string) => void`.
  - Add keyboard `Escape` key event listener to trigger `onClose()`.
  - Implement click handlers for backdrop overlay (closes modal when clicking outer backdrop, ignored when clicking inside container).
  - Update layout, classes, typography, checkmark icons, pricing options, and express payment badges to match Stitch HTML design exact spec.

### 2. Integration with Top Navigation Shell
- **File**: `src/components/shell/TopNav.tsx`
- **Details**:
  - Connect the existing `TopNav` upgrade button state (`isUpgradeModalOpen`) to render `<UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />`.
  - Ensure clicking the top bar "Upgrade" button or remaining credits pill seamlessly opens the modal.

### 3. Integration across Studio and Library Components
- **File**: `src/components/studio/IntentPromptBar.tsx`
- **Details**: Trigger `UpgradeModal` when user clicks credit indicator or attempts creation with 0 remaining credits.
- **File**: `src/components/library/LibraryStatsHeader.tsx`
- **Details**: Trigger `UpgradeModal` when clicking refuel actions from the library statistics bar.

### 4. Animation Utility Styles
- **File**: `src/app/globals.css` / Tailwind Config
- **Details**: Ensure `.subtle-border` (`box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08)`) and `.glow-accent` (`box-shadow: 0 0 30px -10px rgba(255, 255, 255, 0.12)`) utilities are defined and reusable across modal containers.

## Dependencies
- `lucide-react` (for `X`, `Check`, `Lock`, `Zap`, `ArrowRight` icons).
- `clsx` / `tailwind-merge` (`cn` helper from existing UI setup).

## Verification Checklist
- [ ] Modal overlay renders over dashboard pages with backdrop blur (`backdrop-blur-md bg-black/80`).
- [ ] Clicking top nav "Upgrade" button opens the modal.
- [ ] Pressing `Escape` key closes the modal.
- [ ] Clicking the background overlay closes the modal, while clicking inside the modal container does not close it.
- [ ] Pro Creator card correctly displays "$29 / month", "Most Popular" pill badge, glowing cyan checkmarks, and primary CTA ("Upgrade to Pro →").
- [ ] Compute Pack card displays "$12 one-time", muted checkmarks, and secondary CTA ("Buy 300 Credits").
- [ ] Trust microcopy ("Encrypted via Stripe") and payment pills (Apple Pay, G Pay, Visa / MC) render cleanly at the modal footer.
- [ ] Responsive design verified on both mobile (single column) and desktop (two column) viewports.
