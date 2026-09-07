'use client';

import { useStudioStore } from '@/lib/store/useStudioStore';
import { IntentPromptBar } from '@/components/studio/IntentPromptBar';
import { InlineResultStage, GeneratedMediaItem } from '@/components/studio/InlineResultStage';
import { ContextualReel, ReelItem } from '@/components/studio/ContextualReel';
import { ShortcutChips } from '@/components/studio/ShortcutChips';
import { useState, useEffect } from 'react';

export default function StudioPage() {
  const {
    prompt,
    selectedEngine,
    aspectRatio,
    isGenerating,
    isRemixMode,
    sourceAssetUrl,
    setPrompt,
    setSelectedEngine,
    setAspectRatio,
    setIsGenerating,
    setRemixMode,
  } = useStudioStore();

  const [activeMode, setActiveMode] = useState<'video' | 'image'>('video');
  
  // Initial state is idle prompter (generatedMedia = null)
  const [generatedMedia, setGeneratedMedia] = useState<GeneratedMediaItem | null>(null);
  const [activeReelId, setActiveReelId] = useState<string | null>(null);

  const shortcutIntents = [
    { label: 'Animate image', intent: 'Animate initial keyframe with gentle orbital tilt and cinematic atmospheric dust' },
    { label: 'Extend shot', intent: 'Extend current cut forward +4 seconds maintaining natural character momentum and focal depth' },
    { label: 'Product commercial', intent: 'Photorealistic luxury product studio reveal, obsidian backdrop, caustic prism refractions, 60fps' },
    { label: '4K Upscale', intent: 'Upscale master canvas to native 4K UHD with micro-texture clarity preservation and denoising' },
  ];

  // Hydration fix for Zustand persist
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedMedia(null);

    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      const isImg = activeMode === 'image' || selectedEngine.includes('flux');
      setGeneratedMedia({
        id: '1',
        title: prompt ? prompt.slice(0, 30) + '...' : 'Liquid Mercury Ripple Study',
        prompt: prompt || 'Liquid mercury metallic ripples in extreme macro slow motion, ultra-reflective chrome fluid dynamics',
        url: isImg
          ? 'https://images.unsplash.com/photo-1682687982501-1e5898147063?q=80&w=1200&auto=format&fit=crop'
          : 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWMKt9tNwY6QmntZWowOdGuIta4aPg5rxbqLVfMOvMTzBuKxLE4aRUhvCI37QHoogU0v42JX3IgY_4FszUO1fdMb7zyA8vYSVhpdhJ8EfermYmHQpd4tcsE-P3v8wjkYHZo8V79e40CXRgTchJHhPNCuM-LxSEOuOkpfyHVKr6x56D41W4Cf33O3oJqn5l3MykdrVezAPweH2UjR9l_-Q7L4qs4swIRnELTJ0HjdH2k-dO7w5nwFvyTg',
        type: isImg ? 'image' : 'video',
        engine: selectedEngine === 'veo-3.1' ? 'Veo 3.1' : selectedEngine === 'sora-2' ? 'Sora 2' : 'Flux 1.1',
        aspectRatio: `${aspectRatio}`,
      });
      setActiveReelId('1');
    }, 2000);
  };

  const handleDismissResult = () => {
    setGeneratedMedia(null);
  };

  const handleRemixResult = () => {
    if (generatedMedia) {
      setRemixMode(true, generatedMedia.url);
      setGeneratedMedia(null);
    }
  };

  const handleReelSelect = (item: ReelItem) => {
    setActiveReelId(item.id);
    setGeneratedMedia({
      id: item.id,
      title: item.title,
      prompt: item.prompt,
      url: item.url,
      type: item.type,
      engine: item.engine,
      aspectRatio: '16:9',
    });
  };

  const handleShortcutSelect = (intent: string) => {
    setPrompt(intent);
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-6 py-6 flex flex-col min-h-[calc(100vh-4rem)] justify-between">
      {/* Ambient Depth Underglow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-80 bg-gradient-to-b from-secondary/15 via-surface-tint/5 to-transparent blur-3xl opacity-30" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-6">
        {/* Prompter State 1: Active Generation or Result Stage */}
        {generatedMedia || isGenerating ? (
          <div className="w-full flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            {isGenerating ? (
              <div className="w-full flex flex-col items-center justify-center gap-6 py-20 bg-surface-container-low/80 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md">
                <div className="relative h-24 w-24">
                  <div className="absolute inset-0 rounded-full border-4 border-surface-variant"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-primary text-sm font-medium font-mono animate-pulse">
                    78%
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-medium text-on-surface">Synthesizing Pixels</h3>
                  <p className="text-sm text-on-surface-variant max-w-sm">Generating your {selectedEngine} {activeMode}...</p>
                </div>
              </div>
            ) : (
              generatedMedia && (
                <InlineResultStage
                  mediaUrl={generatedMedia.url}
                  mediaType={generatedMedia.type}
                  prompt={generatedMedia.prompt}
                  title={generatedMedia.title}
                  engine={generatedMedia.engine}
                  aspectRatio={generatedMedia.aspectRatio}
                  onDismiss={handleDismissResult}
                  onRemix={handleRemixResult}
                />
              )
            )}
          </div>
        ) : (
          /* Prompter State 2: Idle Prompt State */
          <div className="w-full flex flex-col items-center justify-center animate-in fade-in duration-500 pt-8 md:pt-16">
            <div className="flex flex-col items-center text-center gap-2 mb-8 max-w-2xl">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high shadow-sm border border-white/5">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-xs font-semibold text-on-surface-variant tracking-wide">Studio Ready • Alex Vance</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight mt-2">
                Where do you want to begin?
              </h1>
              <p className="text-base text-on-surface-variant mt-1">
                Direct your vision in natural cinematic language. Switch engines anytime.
              </p>
            </div>

            <IntentPromptBar
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleGenerate}
              selectedEngine={selectedEngine}
              onEngineChange={setSelectedEngine}
              aspectRatio={aspectRatio}
              onAspectRatioChange={setAspectRatio}
              isGenerating={isGenerating}
              isRemixMode={isRemixMode}
              onDismissRemix={() => setRemixMode(false, null)}
              sourceAssetUrl={sourceAssetUrl}
              activeMode={activeMode}
              onModeChange={setActiveMode}
            />

            <ShortcutChips
              shortcuts={shortcutIntents}
              onSelect={handleShortcutSelect}
            />
          </div>
        )}

        {/* Contextual Reel Section */}
        <ContextualReel
          activeId={generatedMedia && activeReelId ? activeReelId : undefined}
          onSelect={handleReelSelect}
        />
      </div>
    </div>
  );
}
