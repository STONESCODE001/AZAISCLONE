export function PipelineSection() {
  return (
    <section className="w-full py-20 border-t border-white/[0.06] bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-label-numeric text-xs uppercase tracking-widest text-secondary font-semibold block mb-2">STREAMLINED PIPELINE</span>
          <h2 className="font-headline-md text-headline-md text-white font-semibold">From Script to Master Cut in 3 Steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg bg-surface-container-low border border-white/[0.08] p-6 flex flex-col justify-between">
            <div className="mb-6">
              <span className="font-label-numeric text-metric-display text-white/20 font-bold leading-none block mb-4">01</span>
              <h3 className="font-headline-sm text-lg text-white font-semibold mb-2">Select Model</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Intelligent routing between Veo 3.1, Sora, and Runway Gen-3 based on scene dynamics.</p>
            </div>
            <div className="text-xs font-label-numeric text-secondary">Match 98.4% • Auto-selected</div>
          </div>
          <div className="rounded-lg bg-surface-container-low border border-white/[0.08] p-6 flex flex-col justify-between">
            <div className="mb-6">
              <span className="font-label-numeric text-metric-display text-white/20 font-bold leading-none block mb-4">02</span>
              <h3 className="font-headline-sm text-lg text-white font-semibold mb-2">Describe Scene</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Write simple natural language. Built-in director adds focal length, lighting, and camera motion.</p>
            </div>
            <div className="text-xs font-label-numeric text-secondary">Optimized • Lens &amp; Volumetrics</div>
          </div>
          <div className="rounded-lg bg-surface-container-low border border-white/[0.08] p-6 flex flex-col justify-between">
            <div className="mb-6">
              <span className="font-label-numeric text-metric-display text-white/20 font-bold leading-none block mb-4">03</span>
              <h3 className="font-headline-sm text-lg text-white font-semibold mb-2">Export 4K</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Download ProRes 422 HQ or 60fps MP4 in 60 seconds with full commercial rights.</p>
            </div>
            <div className="text-xs font-label-numeric text-secondary">Bitrate: 220 Mbps • Zero queues</div>
          </div>
        </div>
      </div>
    </section>
  );
}
