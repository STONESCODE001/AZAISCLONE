export function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-16 pb-20 md:pt-20 md:pb-24">
      <div className="max-w-container-max mx-auto px-gutter-desktop relative z-10 flex flex-col items-center text-center">
        <h1 className="font-display-hero text-headline-lg md:text-display-hero text-white max-w-3xl tracking-tight leading-[1.1] mb-4">
          Turn Ideas Into Cinematic Reality
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-8">
          Direct Sora, Veo 3.1, and Runway in 4K with natural language. Zero render farms, no upfront commitment.
        </p>
        <div className="flex items-center justify-center mb-16">
          <a className="inline-flex items-center justify-center h-11 px-8 rounded-full bg-white text-black text-sm font-semibold hover:opacity-90 active:scale-95 transition-all" href="#">
            Start Creating Free
          </a>
        </div>
        <div className="w-full max-w-5xl rounded-lg bg-surface-container-lowest border border-white/[0.08] p-2 md:p-3 shadow-2xl overflow-hidden text-left">
          <div className="flex items-center justify-between px-4 py-2.5 bg-surface-container-low rounded-t-DEFAULT border-b border-white/[0.04] text-on-surface-variant">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
              </div>
              <span className="font-label-numeric text-xs text-white/50">sequence_08_take4.mp4</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-secondary font-label-numeric text-xs border border-secondary/20">Veo 3.1</span>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-white/70 font-label-numeric text-xs">4K UHD 60FPS</span>
            </div>
          </div>
          <div className="relative w-full aspect-[21/9] sm:aspect-[16/8] bg-surface-container-low rounded-b-DEFAULT overflow-hidden">
            <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5uu4useJMy4paq68L4ZC67ZWLEPB1FiFN64ozoV51G3hHviO0pGWxvJo9yVzulUKKUa9GCWhrJkMdczKzTNQGgNZODpVE3ZnYYnI_ZMblAgjYfZqP--6DJ3zlktzKDjO66_CvO3PV1ZurDB4ixES9KKQN8XwIUp0L8khUG8AV150bjbrYOpXRUyhOG9TPv-moamsHOPX9uWIcsKAW3DXl0l9P8GndVywjPmXHDm8Q4qqeQorj3YYo_g')"}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-4 rounded-DEFAULT bg-surface-container-lowest/80 backdrop-blur-md border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-label-numeric text-[10px] tracking-wider uppercase text-secondary font-bold">ACTIVE PROMPT</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span className="font-label-numeric text-xs text-on-surface-variant">Camera: 35mm Anamorphic Pan</span>
                </div>
                <p className="font-body-sm text-body-sm text-primary line-clamp-1 md:line-clamp-none font-medium">“Liquid mercury metallic ripples in extreme macro slow motion, ultra-reflective chrome fluid dynamics, 60fps 4K”</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <span className="text-secondary font-label-numeric text-xs mr-1">Render Ready</span>
                <button className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-surface-variant" type="button">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" x2="12" y1="15" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
