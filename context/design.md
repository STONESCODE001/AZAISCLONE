---
name: Cinematic AI Dark Mode
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#5de6ff'
  on-secondary: '#00363e'
  secondary-container: '#00cbe6'
  on-secondary-container: '#00515d'
  tertiary: '#ffffff'
  on-tertiary: '#2f3037'
  tertiary-container: '#e2e1eb'
  on-tertiary-container: '#63646c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#a2eeff'
  secondary-fixed-dim: '#2fd9f4'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e5a'
  tertiary-fixed: '#e2e1eb'
  tertiary-fixed-dim: '#c6c6cf'
  on-tertiary-fixed: '#1a1b22'
  on-tertiary-fixed-variant: '#45464e'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.005em
  label-numeric:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-pill:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  metric-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  space-xxs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  space-4xl: 6rem
  space-5xl: 8rem
  container-max: 1200px
  gutter-desktop: 1.5rem
  gutter-mobile: 1rem
---

## Brand & Style

The design system embodies a premium, cinematic, state-of-the-art AI creative platform. Built for modern digital storytellers, directors, motion designers, and product teams, it fuses studio-grade media production workflows with streamlined, consumer-grade ergonomics.

The visual language blends **Minimalism** with **Dark Glassmorphic Tactility**:
- **Atmospheric & Immersive:** Deep obsidian backgrounds draw complete focus toward ultra-high-definition generative imagery and video assets.
- **Precision Engineered:** High-contrast crisp typography, micro-borders with hairline translucence, and strictly balanced modular bento grids create an aura of computational perfection.
- **Frictionless Interaction:** Soft pill controls, subtle ambient backdrops, and low-noise interface surfaces evoke quiet confidence and futuristic creative empowerment.

## Colors

The palette relies on deep charcoal and obsidian foundations layered under pure white active elements and luminous accents.

### Palette Architecture
- **Base Canvas (`#0A0A0C`):** Pitch dark canvas that absorbs peripheral distractions.
- **Surface Elevation 1 (`#121216`):** Primary card backdrop, modal backdrop, and workspace canvas containers.
- **Surface Elevation 2 (`#1A1A20`):** Interactive chips, pill wrappers, inner bento modules, and nested cards.
- **Surface Elevation 3 (`#24242C`):** Hover states, active segment toggles, and dropdown surfaces.
- **Primary / Foreground (`#FFFFFF`):** High-impact headlines, solid pill CTA fills, and active icons.
- **Text Secondary (`#A1A1AA`):** Body paragraphs, contextual metadata, and subtitle labels.
- **Text Muted (`#71717A`):** Inactive counters, breadcrumb dividers, and subtle prompts.
- **Accent Glow (`#22D3EE`):** Electric cyan used sparingly for critical status badges (e.g., "New", release notes, active stream progress).
- **Hairline Border Tiers:** 
  - Standard edge: `rgba(255, 255, 255, 0.08)`
  - Elevated edge: `rgba(255, 255, 255, 0.14)`
  - Hover edge: `rgba(255, 255, 255, 0.24)`

## Typography

Typography strikes a fine balance between human geometric elegance and high-tech cinematic clarity. 

- **Primary Typeface (`Plus Jakarta Sans`):** Powers all headlines, body copy, and UI controls. Clean geometric circularity maintains supreme legibility across both large-scale cinematic headlines and dense nested workspace toolbars.
- **Technical & Utility Typeface (`Space Grotesk`):** Drives metadata tags, prompt indicators ("PROMPT"), model versions ("Kling 3.0", "Veo 3.1"), step numbers ("01 Write"), and timestamps.
- **Editorial Contrast:** Hero and section titles frequently pair a bold crisp white primary statement with a lighter, slightly desaturated secondary sentence or clause to create natural visual cadence.

## Layout & Spacing

The layout is built on a 12-column responsive fluid grid capped at a maximum width of `1200px`, centered with generous vertical breathing room between narrative milestones.

### Layout Rhythm
- **Bento Card Arrangements:** Symmetrical and asymmetrical 2-column, 3-column, and full-span highlight rows. Bento cells feature generous internal padding (`2rem` on desktop, `1.25rem` on mobile).
- **Vertical Hierarchy:** Major thematic sections use `6rem` to `8rem` of vertical gap (`space-4xl` to `space-5xl`), letting visual assets breathe without competition.
- **Responsive Adaptations:**
  - **Desktop (1024px+):** 12 columns, multi-column bento grids, full split previews with sticky narrative copy.
  - **Tablet (768px – 1023px):** 8 columns, 2-column collapsed bento cells, auto-scrolling story carousels.
  - **Mobile (<768px):** 4 columns, single-column vertical stacks, horizontally swipeable media reels, full-width button groupings.

## Elevation & Depth

Visual hierarchy uses flat dark tonal layering combined with subtle inner glows and hairline borders rather than heavy diffuse drop shadows.

### Depth System
1. **Layer 0 (Canvas Base):** Solid `#0A0A0C`. Deep infinity plane.
2. **Layer 1 (Card & Section Containers):** Solid `#121216` with a uniform `1px` border of `rgba(255, 255, 255, 0.08)`.
3. **Layer 2 (Floating Controls, Pills & Glass Pods):** `rgba(26, 26, 32, 0.75)` with `backdrop-filter: blur(16px)` and `1px` border of `rgba(255, 255, 255, 0.12)`.
4. **Cinematic Hero Vignette:** Full-bleed visual displays incorporate radial masking (`radial-gradient(ellipse at center, transparent 40%, #0A0A0C 100%)`) to dissolve embedded AI video frames seamlessly into the dark page background.
5. **Inner Specular Border:** Active states and high-tier cards utilize an interior highlight: `box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)`.

## Shapes

The design uses a high-radius curve strategy, contrasting smooth, hyper-curved interactive touchpoints with structural rounded media containers:

- **Buttons & Tags (Level 3 - Full Pill):** Primary action buttons, filter tags, model indicators, and release notification banners use `border-radius: 9999px`.
- **Media & Bento Cards:** Large visual pods and interface mocks feature smooth, modern corners using `1.5rem` to `2rem` (`rounded-xl` to `rounded-2xl`).
- **Inner Nested Elements:** Small preview thumbnails, popovers, and code snippets use `0.75rem` (`rounded-md`).

## Components

### Buttons
- **Primary Pill Button:** Solid `#FFFFFF` surface with `#0A0A0C` bold text. Padding: `12px 24px`. Hover: `opacity: 0.92`, subtle scale transform (`scale(1.02)`).
- **Secondary Glass Pill Button:** `rgba(255, 255, 255, 0.08)` surface, `#FFFFFF` text, `1px` border in `rgba(255, 255, 255, 0.14)`. Hover: `background: rgba(255, 255, 255, 0.14)`.
- **Ghost Action:** Borderless, muted text `#A1A1AA` with an inline chevron. Hover transitions to `#FFFFFF`.

### Badges & Notification Pills
- **Release Badge (Top Banner):** Inline pill with dark translucent fill `rgba(255, 255, 255, 0.05)`, hairline outline, cyan `#22D3EE` accent tag ("New"), followed by white label and micro chevron.
- **Model Tag Overlay:** Floating pill positioned at top-left inside video preview frames: `rgba(10, 10, 12, 0.65)` backdrop blur, `Space Grotesk` 11px font, crisp white label.

### Bento Grid Cards
- **Structure:** Encased in `#121216` with `1px` border `rgba(255, 255, 255, 0.08)`. Overflow set to hidden.
- **Content Stacking:** Bottom-aligned contextual text with title and subtitle over a gradient shadow overlay (`linear-gradient(180deg, transparent 0%, rgba(10, 10, 12, 0.85) 100%)`).
- **Prompt Card Pattern:** Dedicated dark lower drawer containing monospace uppercase label `"PROMPT"` in `#71717A` above the user prompt string in `#FFFFFF`.

### Step & Feature Guides
- **Step Card:** Clean `#121216` container featuring a leading mono step counter (`01`, `02`, `03`) in `#71717A`, bold white sub-headline, and an embedded interactive mock preview representing the UI flow (e.g., prompt input field, generation progress ring, export multi-selector).

### Form Inputs & Workspace Controls
- **Dark Prompt Bar:** Seamless rounded rectangle container `#1A1A20` with subtle border `rgba(255, 255, 255, 0.12)`, placeholder color `#71717A`, inline model switcher pill, and an icon action button aligned to the right edge.
- **Export Multi-Select Chip:** Pill toggle group with unselected `#1A1A20` and selected solid `#FFFFFF` with black text.


