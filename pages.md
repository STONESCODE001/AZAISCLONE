# Page Structures & Component Trees

Based on the updated requirements, here are the detailed Markdown Component Trees for each route in the application.

## Routing Rules
- **Unauthenticated Users:** Can access `/` (Landing) and `/auth/login`. Attempting to access `/dashboard`, `/history`, or the Studio will redirect them to `/auth/login`. (Alternatively, if we allow unauth studio access, they can visit `/studio/*` but will be redirected to `/auth/login` when they click Generate).
- **Authenticated Users:** Cannot access `/` or `/auth/login`. Middleware will automatically redirect them to `/dashboard`.

## 1. Landing Page (`/`)
Serves as the public entry point. *Authenticated users are redirected away from this page.*

```text
app/page.tsx
└── MarketingLayout
    ├── Navbar (Logo, "Login", "Get Started")
    ├── HeroSection
    ├── FeatureShowcase
    ├── PricingSection
    └── Footer
```

## 2. Auth Page (`/auth/login`)
A dedicated authentication page for Email OTP.

```text
app/auth/login/page.tsx
└── AuthLayout
    └── AuthCard
        ├── Header ("Sign in to AzaisAI")
        ├── EmailInputForm
        └── OTPVerificationForm (Appears after email submission)
```

## 3. Main Dashboard (`/dashboard`)
The central hub for authenticated users.

```text
app/dashboard/page.tsx
└── DashboardLayout
    ├── SidebarNavigation (Dashboard, Video Studio, Image Studio, History)
    ├── Topbar (User Profile, Credit Balance)
    └── MainContent
        ├── WelcomeHeader
        ├── QuickActionsGrid (Cards to jump into Video or Image studio)
        └── RecentGenerationsPreview (Mini-gallery of latest creations)
```

## 4. Video Studio (`/studio/video`)
The core interface for Text-to-Video and Image-to-Video generation.

```text
app/studio/video/page.tsx
└── DashboardLayout
    ├── SidebarNavigation
    ├── Topbar
    └── MainCanvas
        ├── VideoPreviewArea (Shows loading state or generated video)
        └── ConfigurationPanel
            ├── ModelSelector (Sora, Veo 2, Veo 3, etc.)
            ├── AspectRatioGroup
            ├── DurationPills
            ├── ImageUploadZone (Drag-and-drop)
            ├── PromptInputArea (with Enhance Prompt Button)
            └── GenerateActionArea
```

## 5. Image Studio (`/studio/image`)
The interface for Text-to-Image generation.

```text
app/studio/image/page.tsx
└── DashboardLayout
    ├── SidebarNavigation
    ├── Topbar
    └── MainCanvas
        ├── ImagePreviewArea
        └── ConfigurationPanel
            ├── ModelSelector
            ├── AspectRatioGroup
            ├── PromptInputArea
            └── GenerateActionArea
```

## 6. History Page (`/history`)
A private route displaying all past generations.

```text
app/history/page.tsx
└── DashboardLayout
    ├── SidebarNavigation
    ├── Topbar
    └── MainContent
        ├── HistoryHeader ("Your Generations")
        └── GenerationGrid
            ├── GenerationCard (Video)
            └── GenerationCard (Image)
```
