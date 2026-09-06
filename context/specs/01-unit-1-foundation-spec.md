# Unit 1 Spec: Foundation & Design System

## Goal
Initialize the core Next.js (App Router) architecture, establish the "Cinematic AI Dark Mode" design system, and configure global typography, theming, and UI libraries (`shadcn/ui`, `Tailwind CSS`) to serve as a strict structural foundation for all subsequent units.

## Design
- **Visual Aesthetic:** "Cinematic AI Dark Mode" — deep obsidian backgrounds (`#131315`), high-contrast crisp text (`#FFFFFF`, `#A1A1AA`), and flat dark tonal layering without heavy drop shadows.
- **Typography:** 
  - *Primary (Headlines/UI):* `Plus Jakarta Sans` for maximum legibility and cinematic feel.
  - *Utility (Metadata/Mono):* `Space Grotesk` for numbers, step indicators, and prompt tags.
- **Border Radius Strategy:** Smooth, hyper-curved elements. `rounded-full` for active tags and primary action buttons. `rounded-xl` to `rounded-2xl` for large media/bento cards.
- **Structural Decisions:** Strict adherence to the `src/` directory convention. Global forced dark mode using `next-themes`.

## Implementation

### 1. Project Initialization
- Run `npx create-next-app@latest` in the root directory.
- **Configuration:** Use TypeScript (strict mode), ESLint, Tailwind CSS, App Router, and the `src/` directory. Disable Turbopack for the initial stable setup unless explicitly required.

### 2. UI & Theming Libraries Setup
- Install the `lucide-react` icon library as specified by the design standards.
- Install `next-themes` to manage global dark mode state.
- Initialize `shadcn/ui` via `npx shadcn@latest init` configured for the generic `zinc` base (which we will override) and CSS variables.

### 3. Design System & CSS Variable Mapping
- **Globals.css:** Overwrite `src/app/globals.css` with the exact HEX color tokens from `DESIGN.md` mapped to CSS custom properties inside `:root` (e.g., `--background`, `--surface`, `--primary`).
- **Tailwind Configuration:** Modify `tailwind.config.ts`:
  - Extend the color theme to map directly to the CSS variables.
  - Extend the `borderRadius` theme to match the `DESIGN.md` scale (`sm: 0.5rem`, `DEFAULT: 1rem`, `md: 1.5rem`, `lg: 2rem`, `xl: 3rem`, `full: 9999px`).
  - Extend `fontFamily` to map to `font-sans` (Plus Jakarta Sans) and `font-mono` (Space Grotesk).

### 4. Typography & Layout Shell Configuration
- Open `src/app/layout.tsx`.
- Import and configure `Plus_Jakarta_Sans` and `Space_Grotesk` from `next/font/google`. Apply them as CSS variables (`--font-sans`, `--font-mono`).
- Wrap the main `children` in a `ThemeProvider` component (from `next-themes`) set to `defaultTheme="dark"` and `forcedTheme="dark"`.
- Set the `<body>` tag classes to `bg-background text-on-background font-sans antialiased`.

### 5. Verification Page
- Overwrite `src/app/page.tsx` with a temporary, simple test grid.
- Implement a headline in `font-sans`, a metadata tag in `font-mono`, a test card using the `--surface` color, and a `rounded-full` button using the `--primary` color.

## Dependencies
- `next`, `react`, `react-dom`
- `tailwindcss`, `postcss`, `autoprefixer`
- `lucide-react` (Icons)
- `next-themes` (Dark mode management)
- `clsx`, `tailwind-merge` (shadcn/ui dependencies)

## Verification Checklist
- [ ] Running `npm run dev` starts the application without any build or runtime errors.
- [ ] Running `npm run lint` yields zero warnings and zero TypeScript compilation errors.
- [ ] Inspecting the test page in the browser confirms the background color is exactly `#131315`.
- [ ] Inspecting text confirms it is using `Plus Jakarta Sans` without browser layout shifting upon load.
- [ ] Inspecting numeric/meta text confirms it is using `Space Grotesk`.
- [ ] Inspecting a test button confirms it has a fully rounded pill shape (`border-radius: 9999px`).
- [ ] `.env.local` (if created) is verified to be in `.gitignore`.
