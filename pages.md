# Page Structures & Component Trees

Based on the user journey mapped in `flow.md`, here are the detailed Markdown Component Trees for each route in the application. These trees define the exact UI hierarchy before we build the components.

## 1. Landing Page (`/`)
Serves as the public entry point, showcasing features and driving users to the Studio.

```text
app/page.tsx
└── MarketingLayout
    ├── Navbar (Logo, "Pricing", "Get Started")
    ├── HeroSection
    │   ├── HeroHeadline
    │   ├── HeroSubtext
    │   └── CallToActionButton ("Get Started" -> redirects to /studio/video)
    ├── FeatureShowcase
    │   ├── VideoExampleGrid
    │   └── ImageExampleGrid
    ├── PricingSection (Static visual only)
    └── Footer
```

## 2. Video Studio (`/studio/video`)
The core interface for Text-to-Video and Image-to-Video generation.

```text
app/studio/video/page.tsx
└── StudioLayout
    ├── SidebarNavigation (Links to Video, Image, History, FAQ)
    ├── Topbar (User Profile, Credit Balance)
    └── MainCanvas
        ├── VideoPreviewArea (Shows loading state or generated video)
        └── ConfigurationPanel
            ├── ModelSelector (Sora, Veo 2, Veo 3, etc.)
            ├── AspectRatioGroup (16:9, 9:16)
            ├── DurationPills (5s, 6s, 8s)
            ├── ImageUploadZone (Drag-and-drop for Image-to-Video)
            ├── PromptInputArea
            │   ├── TextArea
            │   └── EnhancePromptButton (Calls Gemini API)
            └── GenerateActionArea
                ├── CreditCostIndicator
                └── GenerateButton (Triggers Auth Check or Polling)
```

## 3. Image Studio (`/studio/image`)
The interface for Text-to-Image generation. Shares much of the layout with the Video Studio.

```text
app/studio/image/page.tsx
└── StudioLayout
    ├── SidebarNavigation
    ├── Topbar
    └── MainCanvas
        ├── ImagePreviewArea (Shows loading state or generated image)
        └── ConfigurationPanel
            ├── ModelSelector
            ├── AspectRatioGroup (16:9, 1:1, 9:16, 4:3, 3:4)
            ├── PromptInputArea
            │   ├── TextArea
            │   └── EnhancePromptButton
            └── GenerateActionArea
                ├── CreditCostIndicator
                └── GenerateButton
```

## 4. History Page (`/history`)
A private route displaying a user's past generations.

```text
app/history/page.tsx
└── StudioLayout
    ├── SidebarNavigation
    ├── Topbar
    └── MainContent
        ├── HistoryHeader ("Your Generations")
        └── GenerationGrid
            ├── GenerationCard (Video thumbnail)
            │   ├── PlayButtonOverlay
            │   └── PromptTooltip
            └── GenerationCard (Image)
                ├── DownloadButton
                └── PromptTooltip
```

## 5. Global Modals (Rendered via Context/Layout)
These components exist globally and overlay the current route without forcing a page reload, preserving state.

```text
app/layout.tsx
└── GlobalUIProvider
    └── AuthModal (Triggered when unauthenticated user clicks 'Generate')
        ├── ModalHeader ("Sign in to generate")
        ├── EmailInputForm
        ├── OTPVerificationForm (Appears after email submission)
        └── CloseButton
```
