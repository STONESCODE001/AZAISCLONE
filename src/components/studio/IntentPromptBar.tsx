'use client';

import { Sparkles, ArrowRight, Video, Image as ImageIcon, ImagePlus, ChevronDown, X } from 'lucide-react';
import { Engine, AspectRatio } from '@/lib/store/useStudioStore';

interface IntentPromptBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  selectedEngine: Engine;
  onEngineChange: (engine: Engine) => void;
  aspectRatio: AspectRatio;
  onAspectRatioChange: (ratio: AspectRatio) => void;
  isGenerating: boolean;
  isRemixMode?: boolean;
  onDismissRemix?: () => void;
  sourceAssetUrl?: string | null;
  activeMode: 'video' | 'image';
  onModeChange: (mode: 'video' | 'image') => void;
}

export function IntentPromptBar({
  value,
  onChange,
  onSubmit,
  selectedEngine,
  onEngineChange,
  aspectRatio,
  onAspectRatioChange,
  isGenerating,
  isRemixMode,
  onDismissRemix,
  sourceAssetUrl,
  activeMode,
  onModeChange,
}: IntentPromptBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isGenerating) {
        onSubmit();
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-lg bg-surface-container-low p-4 shadow-xl transition-all duration-300 hover:bg-surface-container focus-within:bg-surface-container relative">
      
      {/* Remix Context Header */}
      {isRemixMode && (
        <div className="flex items-center justify-between bg-surface-subtle px-4 py-2 rounded-lg mb-3 border border-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 overflow-hidden rounded bg-black">
              {sourceAssetUrl ? (
                <img src={sourceAssetUrl} alt="Remix Source" className="h-full w-full object-cover opacity-80" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-text-muted">
                  <ImageIcon className="h-4 w-4" />
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-text-primary">Remixing Asset</span>
          </div>
          <button
            onClick={onDismissRemix}
            className="rounded-full p-1.5 text-text-muted hover:bg-surface-variant hover:text-text-primary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Textarea Core */}
      <div className="relative w-full min-h-[96px] md:min-h-[112px] flex">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your shot, scene, camera motion, or visual style..."
          rows={3}
          className="w-full bg-transparent text-primary placeholder:text-outline resize-none outline-none font-body text-base md:text-lg leading-relaxed selection:bg-secondary selection:text-on-secondary-fixed"
        />
      </div>

      {/* Embedded Micro-Controls Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-1 border-t border-white/5">
        {/* Left Controls Group */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Mode Switcher Pill */}
          <div className="flex items-center p-0.5 rounded-full bg-surface-container-highest">
            <button
              type="button"
              onClick={() => onModeChange('video')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeMode === 'video'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Video
            </button>
            <button
              type="button"
              onClick={() => onModeChange('image')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeMode === 'image'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Image
            </button>
          </div>

          {/* Engine/Model Dropdown Pill */}
          <div className="relative">
            <select
              value={selectedEngine}
              onChange={(e) => onEngineChange(e.target.value as Engine)}
              className="appearance-none bg-surface-container-high hover:bg-surface-variant text-on-surface text-xs font-medium pl-3 pr-8 py-1.5 rounded-full cursor-pointer outline-none transition-colors"
            >
              {activeMode === 'video' ? (
                <>
                  <option value="veo-3.1">Veo 3.1 Cinema</option>
                  <option value="sora-2">Sora 2 Ultra</option>
                </>
              ) : (
                <>
                  <option value="flux-pro">Flux.1 Pro High-Res</option>
                  <option value="midjourney">Midjourney v6.1</option>
                </>
              )}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant h-3.5 w-3.5" />
          </div>

          {/* Aspect Ratio Dropdown Pill */}
          <div className="relative hidden sm:block">
            <select
              value={aspectRatio}
              onChange={(e) => onAspectRatioChange(e.target.value as AspectRatio)}
              className="appearance-none bg-surface-container-high hover:bg-surface-variant text-on-surface text-xs font-medium pl-3 pr-8 py-1.5 rounded-full cursor-pointer outline-none transition-colors"
            >
              <option value="16:9">16:9 Widescreen</option>
              <option value="9:16">9:16 Vertical</option>
              <option value="1:1">1:1 Square</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant h-3.5 w-3.5" />
          </div>

          {/* Keyframe / Attachment Button */}
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-variant text-on-surface flex items-center justify-center transition-colors"
            title="Add Reference Keyframe"
          >
            <ImagePlus className="h-4 w-4" />
          </button>
        </div>

        {/* Right Trigger Button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!value.trim() || isGenerating}
          className="group inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-on-primary border-t-transparent animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <span>Create</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
