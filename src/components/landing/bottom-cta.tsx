export function BottomCTA() {
  return (
    <section className="relative w-full py-24 md:py-space-3xl bg-surface-container-lowest border-t border-white/[0.08] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-secondary/5 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="max-w-container-max mx-auto px-gutter-desktop relative z-10 flex flex-col items-center text-center">
        <div className="relative w-full max-w-3xl h-48 md:h-64 mb-10 flex items-center justify-center pointer-events-none select-none">
          <div className="absolute w-44 md:w-56 aspect-[16/10] rounded-DEFAULT bg-surface-container-low border border-white/[0.08] shadow-2xl overflow-hidden -rotate-12 -translate-x-32 md:-translate-x-44 translate-y-3 opacity-60 transition-transform duration-700">
            <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCHBIhY9ySU1zijcaNtaa4GeaPmfMx1Q2VpMx08xMfAptN503ymz9SeSJnYW8qrnr8Kiy5yD-lJMCUhOzrUVoPWujmpIg9ApIhiMhchFJclZGOO9weWsSNOK_nT9ad_Hrd19cxqK4_kDI4BWyf4vmLHOtkopLDljqQG9sgO2_TMMPhiPUBkSPTIjefEIowIU3S7xsETifsz2h3eECjh0yxaZd3KSLYDQYGhAMzhLjwrbKWEYPbr1FeBZw')"}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
          </div>
          <div className="absolute w-44 md:w-56 aspect-[16/10] rounded-DEFAULT bg-surface-container-low border border-white/[0.08] shadow-2xl overflow-hidden rotate-12 translate-x-32 md:translate-x-44 translate-y-3 opacity-60 transition-transform duration-700">
            <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAsYcBpcF9FXrnOefFHfP_Hz5hbp_LgPXmguW18U8Wb8lhDYWf0oWkhx1R98SQj4H4m8w6gZKO7zfPQXBZ-s1Yiptje-5jS8BCVoyJqKRXGqi7qXp2vuSPwDjibbVe-f7_x-eU373FJD1vB4CBEdgBAJCgNVEjFmJOESLP5jrbhV6n1dHDyUgN9F9vb_bI9nmJ14X_weMC9m7AL7vF3mvLrUV_sUcarYJ6bg3yXEuPvpNjSq5C0Kw1-cA')"}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10 w-56 md:w-72 aspect-[16/10] rounded-DEFAULT bg-surface-container border border-white/[0.1] shadow-2xl overflow-hidden -translate-y-2">
            <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5uu4useJMy4paq68L4ZC67ZWLEPB1FiFN64ozoV51G3hHviO0pGWxvJo9yVzulUKKUa9GCWhrJkMdczKzTNQGgNZODpVE3ZnYYnI_ZMblAgjYfZqP--6DJ3zlktzKDjO66_CvO3PV1ZurDB4ixES9KKQN8XwIUp0L8khUG8AV150bjbrYOpXRUyhOG9TPv-moamsHOPX9uWIcsKAW3DXl0l9P8GndVywjPmXHDm8Q4qqeQorj3YYo_g')"}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-secondary font-label-numeric text-[10px] border border-white/[0.1]">4K Master</span>
            </div>
          </div>
        </div>
        <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-white font-semibold tracking-tight max-w-2xl mb-4 leading-[1.15]">Your Next Masterpiece Starts Here</h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mb-8">Turn natural language prompts into Hollywood-grade cinematic sequences in seconds with Veo 3.1, Sora, and Runway Gen-3.</p>
        <div className="flex flex-col items-center gap-4">
          <a className="inline-flex items-center justify-center h-11 px-8 rounded-full bg-white text-black text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-lg" href="#">Start Creating Free</a>
          <span className="font-label-numeric text-xs text-white/50 tracking-wide">8 complimentary 4K credits • Instant access to Veo 3.1 &amp; Sora • Zero setup</span>
        </div>
      </div>
    </section>
  );
}
