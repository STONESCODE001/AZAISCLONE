'use client';

import { useStudioStore } from '@/lib/store/useStudioStore';
import { IntentPromptBar } from '@/components/studio/IntentPromptBar';
import { InlineResultStage } from '@/components/studio/InlineResultStage';
import { ContextualReel } from '@/components/studio/ContextualReel';
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
  const [generatedMedia, setGeneratedMedia] = useState<{ url: string; type: 'video' | 'image' } | null>(null);

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
      setGeneratedMedia({
        url: activeMode === 'image' || selectedEngine.includes('flux') 
          ? 'https://images.unsplash.com/photo-1682687982501-1e5898147063?q=80&w=1200&auto=format&fit=crop'
          : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        type: activeMode === 'image' || selectedEngine.includes('flux') ? 'image' : 'video'
      });
    }, 3000);
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

  const handleShortcutSelect = (intent: string) => {
    setPrompt(intent);
    // Optionally trigger generate immediately: handleGenerate();
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full max-w-[1200px] mx-auto relative px-4 md:px-6 py-8">
      
      {/* Ambient Depth Underglow */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-64 bg-gradient-to-b from-secondary/10 via-surface-tint/5 to-transparent blur-3xl opacity-50 rounded-full" />
      
      <div className="flex-1 flex flex-col items-center pt-8 md:pt-16 z-10">
        
        {/* State 1: Generating or Result ready */}
        {generatedMedia || isGenerating ? (
          <div className="w-full flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-500 mt-12">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-6 py-20">
                <div className="relative h-24 w-24">
                  <div className="absolute inset-0 rounded-full border-4 border-surface-variant"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-primary text-sm font-medium font-mono animate-pulse">
                    78%
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-medium text-text-primary">Synthesizing Pixels</h3>
                  <p className="text-sm text-text-secondary max-w-sm">Generating your {selectedEngine} {activeMode}...</p>
                </div>
              </div>
            ) : (
              generatedMedia && (
                <InlineResultStage
                  mediaUrl={generatedMedia.url}
                  mediaType={generatedMedia.type}
                  prompt={prompt}
                  onDismiss={handleDismissResult}
                  onRemix={handleRemixResult}
                />
              )
            )}
          </div>
        ) : (
          /* State 2: Idle Prompt State */
          <div className="w-full flex flex-col items-center justify-center animate-in fade-in duration-500">
            <div className="flex flex-col items-center text-center gap-2 mb-8 max-w-2xl">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high shadow-sm">
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
        
        {/* Render Contextual Reel only when not actively generating or showing full-screen result (or always show at bottom, depending on pref. Mockup has it always at bottom). */}
        {(!isGenerating && !generatedMedia) && (
          <div className="w-full mt-auto pt-16">
            <ContextualReel />
          </div>
        )}
      </div>
    </div>
  );
}
