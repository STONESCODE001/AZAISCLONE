# Feature Spec: AzaisAI Welcome & Auth Modal

## Goal
Implement a high-converting, glassmorphic Welcome & Auth Modal (`AuthModal.tsx`) that opens when users click the "Get Started" or "Start Creating Free" / "Sign In" buttons on the landing page, supporting Google/Apple OAuth, interactive Email magic-link / 6-digit OTP verification flows, and direct post-auth routing to the `/dashboard`.

## Design

- **Modal Overlay & Backdrop**:
  - Full-screen fixed backdrop (`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in`).
  - Subtle background ambient glow (`w-[800px] h-[800px] rounded-full bg-secondary-container/5 blur-[120px] pointer-events-none`) with telemetry grid pattern background SVG.
  - Backdrop click-outside to dismiss and `Escape` key handler.

- **Modal Container Structure**:
  - Max width `1020px`, minimum height `620px` grid container (`grid grid-cols-1 md:grid-cols-2 rounded-2xl border border-surface-container-high bg-[#0e0e10] shadow-[0_24px_50px_rgba(0,0,0,0.6)] overflow-hidden animate-scale-in`).

- **Left Panel (Cinematic Preview Column - Desktop Only)**:
  - Background image: Ultra HD cinematic render (`https://lh3.googleusercontent.com/aida-public/AB6AXuAJKyIsmrMvnbwoarJAoq-n_HjAZx-VRsJAPXlOIhyZT9S3N61cvu6OIsk-ae6en9Q7KJhbvq2Drie1Tmp0nsXyRQX1vMyRYsdybY625z2N9vHeCCmFIPvp_ZPAEDrRT-tY88qEY6n8vG_HkTLmf2bJ1Sg2Nmee221Q7OqcZCW4LHoadi2H9g0h1pPUB7iUSs4ACaZ4Mb3NiFDZFd2njX361C5LRArH-4yIy3LRzorlsPNDQITQd9t7Pw`) with dark gradient overlay (`bg-gradient-to-t from-[#0e0e10]/90 via-[#0e0e10]/20 to-transparent`).
  - Bottom badge & microcopy:
    - Glowing pulse indicator (`w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse`).
    - Tagline: `"Generative Prompt • Veo 3.1 & Sora"`.
    - Creator attribution: `"AzaisAI Creator @Studio Akdag • 4K Master Render"`.

- **Right Panel (Authentication Gateway Column)**:
  - Absolute top-right close button (`w-8 h-8 rounded-full bg-surface-container/60 hover:bg-surface-container text-on-surface-variant hover:text-white flex items-center justify-center transition-colors`).
  - Header: Italic bold title `"Welcome to AzaisAI"` (`font-headline-md text-3xl font-bold tracking-tight text-white italic text-center`).
  - Social OAuth CTAs:
    - Google Button: Full-width button (`w-full h-12 rounded-xl bg-white hover:bg-zinc-200 text-[#0e0e10] font-semibold flex items-center justify-center gap-3 transition-transform active:scale-[0.98]`).
    - Apple Button: Full-width button (`w-full h-12 rounded-xl bg-white hover:bg-zinc-200 text-[#0e0e10] font-semibold flex items-center justify-center gap-3 transition-transform active:scale-[0.98]`).
  - Divider: Horizontal line with `"or"` label centered (`relative flex items-center justify-center text-xs text-on-surface-variant/60`).
  - Interactive Email / OTP Auth Steps:
    - **Step 1: Email Input State**:
      - Mail icon prefix inside input field (`pl-12 pr-4 bg-surface-container-high rounded-xl text-sm text-white placeholder:text-outline-variant outline-none focus:ring-1 focus:ring-secondary`).
      - Forward arrow submit button (`h-12 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container text-primary flex items-center justify-center`).
    - **Step 2: 6-Digit Verification OTP State**:
      - Email target confirmation display (`"Verification code sent to email"`).
      - 6 individual numeric OTP input boxes with auto-focus step forward, backspace navigation, and clipboard paste handling.
      - 42-second countdown timer for code resend (`"Resend code in 42s"`).
      - Primary submit button with dynamic loading state (`"Authenticating..."` spinner to `"Authenticated"` checkmark badge).
  - Legal Disclaimer Footer:
    - Reassurance text: `"By continuing with Google, Apple, or Email, you agree to our Terms of Service and acknowledge that you have read and understand our Privacy Policy."` with hoverable link states.
  - Identity Security Badge:
    - `"IDENTITY GATEWAY • TLS 1.3 CERTIFIED"` (`uppercase tracking-widest text-[11px] font-mono text-white/40 flex items-center justify-center gap-2`).

## Implementation

### 1. AuthModal Component Creation
- **File**: [AuthModal.tsx](file:///c:/Users/THE%20LAPTOP%20STORE/Desktop/AZAISCLONE/src/components/modals/AuthModal.tsx)
- **Sub-sections**:
  - **Props Interface**: Define `isOpen: boolean`, `onClose: () => void`, `onSuccess?: () => void`.
  - **State Management**:
    - `authStep: 'email' | 'otp'`: Toggle between initial email input and OTP verification.
    - `email: string`: User's entered email.
    - `otp: string[]`: Array of 6 single-digit strings.
    - `countdown: number`: Resend timer starting at 42 seconds.
    - `isLoading: boolean`: Async submission state during authentication.
  - **Keyboard & Click Handlers**:
    - `Escape` key hook to trigger `onClose()`.
    - Outside click handler on outer backdrop.
    - Input paste event handler for 6-digit OTP string.

### 2. Integration with Landing Page Header
- **File**: [header.tsx](file:///c:/Users/THE%20LAPTOP%20STORE/Desktop/AZAISCLONE/src/components/landing/header.tsx)
- **Sub-sections**:
  - Accept `onOpenAuth: () => void` prop or manage modal trigger state.
  - Attach `onClick={onOpenAuth}` to "Sign In" and "Start Creating Free" buttons.

### 3. Integration with Hero & Bottom CTA Sections
- **File**: [hero.tsx](file:///c:/Users/THE%20LAPTOP%20STORE/Desktop/AZAISCLONE/src/components/landing/hero.tsx)
- **File**: [bottom-cta.tsx](file:///c:/Users/THE%20LAPTOP%20STORE/Desktop/AZAISCLONE/src/components/landing/bottom-cta.tsx)
- **Sub-sections**:
  - Connect CTA buttons ("Start Creating Free", "Get Started") to trigger `onOpenAuth`.

### 4. Integration in Main Landing Page Shell
- **File**: [page.tsx](file:///c:/Users/THE%20LAPTOP%20STORE/Desktop/AZAISCLONE/src/app/page.tsx)
- **Sub-sections**:
  - Maintain `isAuthModalOpen: boolean` state.
  - Render `<AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={() => router.push('/dashboard')} />`.

## Dependencies
- `lucide-react` (for `Mail`, `ArrowRight`, `X`, `CheckCircle2`, `Lock`, `Loader2` icons).
- `next/navigation` (`useRouter` for post-auth navigation to `/dashboard`).
- Existing UI tokens from `@/components/ui/button`.

## Verification Checklist
- [ ] Modal overlay opens when clicking "Sign In" or "Start Creating Free" on the landing page header, hero, or bottom CTA.
- [ ] Left column displays high-res cinematic render, pulse badge ("Generative Prompt • Veo 3.1 & Sora"), and creator credit line on desktop viewports.
- [ ] Modal behaves responsively (left preview column hides cleanly on mobile, showing single auth column).
- [ ] Google & Apple OAuth buttons render with high-fidelity brand icons and hover states.
- [ ] Entering an email and pressing submit smoothly transitions the UI to the 6-digit OTP verification view.
- [ ] OTP input boxes support auto-advancing focus, backspace deletion, and pasting 6-digit codes.
- [ ] Resend countdown timer counts down from 42s and enables resend button upon reaching 0s.
- [ ] Clicking "Authenticating" simulates authentication and redirects user to `/dashboard`.
- [ ] Pressing `Escape` or clicking the backdrop overlay closes the modal.
