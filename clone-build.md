# AzaisAI Rebuild: Final Blueprint

## 1. Product

**What does this application do in one sentence?**
It is a premium, fast web application that allows users to seamlessly generate AI videos and images from text prompts.

**Who is the primary user and what is their core need?**
Content creators and AI enthusiasts who need a frictionless, beautiful interface to generate high-quality media.

**What is the step-by-step flow from sign-up to core value?**
See the "Pages & User Flow" section below.

**What are the three most important features for the first version?**
1. **Frictionless UI/UX:** Preserving user state across the auth boundary so they never lose their work.
2. **AI Prompt Enhancement:** Using the real Google Gemini API to instantly rewrite basic prompts into highly detailed, optimized prompts.
3. **The "Illusion" of Generation:** A flawless mocked async polling system that fakes the video generation time and returns a high-quality stock asset from Supabase storage.

**What is explicitly out of scope?**
- Real AI Video generation APIs (Sora, Veo, etc.).
- Phone verification (Email OTP only).
- Real Payment processing (Stripe).
- Complex in-browser media editing.

---

## 2. Technical

**What is the full technology stack and why each choice?**
- **Framework:** Next.js (App Router) for fast server-side rendering.
- **Styling:** Tailwind CSS + shadcn/ui.
- **State Management:** Zustand (with persist middleware).
- **Backend/DB/Auth/Storage:** Supabase.
- **LLM API:** Google Gemini API (free tier).

**Where does data live?**
- **Database:** Supabase PostgreSQL (`users`, `generations`, `credit_ledgers`).
- **File Storage:** Supabase Storage buckets.
- **Cache/Local:** `localStorage` (via Zustand).

**How does authentication work?**
Supabase Auth using **Email OTP only**. 

**What are the rules the codebase must never violate?**
1. Never leak API keys (Gemini, Supabase). `.env` must remain in `.gitignore`.
2. The user must never lose their typed prompt if they are forced to log in.

---

## 3. Design

**What is the visual language?**
Cinematic AI Dark Mode. A premium blend of minimalism and glassmorphic tactility featuring deep obsidian backgrounds (`#0A0A0C`), high-contrast `Plus Jakarta Sans` typography, and technical metadata in `Space Grotesk`. Elevation is achieved via flat dark tonal layering and hairline translucent borders rather than diffuse drop shadows.

**What UI component library are you using?**
Tailwind CSS + shadcn/ui + Custom React components.

---

## 4. Pages & User Flow

### The Pages (Routes)
1. **`/` (Landing Page):** Showcases the hero section, example generations, and a visual pricing table.
2. **`/studio/video` (Video Studio):** The main interface for text-to-video and image-to-video. Contains prompt inputs, model selectors, aspect ratio/duration toggles.
3. **`/studio/image` (Image Studio):** Similar to the video studio but configured for image models and aspect ratios.
4. **`/history`:** A gallery grid displaying all past generations associated with the authenticated user.
5. **Login Modal:** A global modal/dialog that can be triggered from anywhere to handle the Email OTP flow without losing context.

### The Exact User Flow
1. **Discovery:** User visits `/` and clicks "Get Started".
2. **Experimentation (Unauthenticated):** User is redirected to `/studio/video`. They type a prompt, use the Gemini "Enhance" button to make it better, and select `16:9` and `Veo` model.
3. **The Block:** User clicks "Generate Video". The app detects they are not logged in and pops up the Login Modal.
4. **Auth Flow:** User enters their email -> receives OTP code -> enters OTP code -> is successfully logged in. Modal closes.
5. **The Value Delivery:** The user is still on `/studio/video` and their prompt/settings are still perfectly intact. They click "Generate Video" again.
6. **The Illusion:** The UI enters a beautiful 15-second loading/polling state.
7. **Success:** A mocked video is returned from Supabase storage, displayed to the user, and saved to their `/history`.
