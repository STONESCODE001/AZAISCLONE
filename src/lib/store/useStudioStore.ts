import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Engine = 'veo-3.1' | 'sora-2' | 'flux-pro';
export type AspectRatio = '16:9' | '9:16' | '1:1';

interface StudioState {
  prompt: string;
  selectedEngine: Engine;
  aspectRatio: AspectRatio;
  isGenerating: boolean;
  isRemixMode: boolean;
  sourceAssetUrl: string | null;

  setPrompt: (prompt: string) => void;
  setSelectedEngine: (engine: Engine) => void;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setRemixMode: (isRemix: boolean, sourceUrl?: string | null) => void;
  clearStudio: () => void;
}

export const useStudioStore = create<StudioState>()(
  persist(
    (set) => ({
      prompt: '',
      selectedEngine: 'veo-3.1',
      aspectRatio: '16:9',
      isGenerating: false,
      isRemixMode: false,
      sourceAssetUrl: null,

      setPrompt: (prompt) => set({ prompt }),
      setSelectedEngine: (engine) => set({ selectedEngine: engine }),
      setAspectRatio: (aspectRatio) => set({ aspectRatio }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      setRemixMode: (isRemix, sourceUrl = null) =>
        set({ isRemixMode: isRemix, sourceAssetUrl: sourceUrl }),
      clearStudio: () => set({ prompt: '', isGenerating: false, isRemixMode: false, sourceAssetUrl: null }),
    }),
    {
      name: 'azais-studio-storage',
      // Only persist configuration, not transient state like isGenerating
      partialize: (state) => ({
        prompt: state.prompt,
        selectedEngine: state.selectedEngine,
        aspectRatio: state.aspectRatio,
      }),
    }
  )
);
