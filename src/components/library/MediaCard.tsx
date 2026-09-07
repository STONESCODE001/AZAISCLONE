'use client';

import { Play, ImageIcon, Star, Copy, Film, Sparkles, Download, Check } from 'lucide-react';

export interface MediaCardProps {
  id: string;
  title: string;
  prompt: string;
  engine: string;
  type: 'video' | 'image';
  thumbnailUrl: string;
  aspectRatio?: string;
  duration?: string;
  createdAt?: string;
  isStarred?: boolean;
  isBulkMode?: boolean;
  isSelected?: boolean;
  onStarToggle?: (id: string, e: React.MouseEvent) => void;
  onCopyPrompt?: (prompt: string, e: React.MouseEvent) => void;
  onSelectToggle?: (id: string) => void;
  onClick: () => void;
}

export function MediaCard({
  id,
  title,
  prompt,
  engine,
  type,
  thumbnailUrl,
  aspectRatio = '16:9',
  duration,
  createdAt,
  isStarred = false,
  isBulkMode = false,
  isSelected = false,
  onStarToggle,
  onCopyPrompt,
  onSelectToggle,
  onClick,
}: MediaCardProps) {
  // Determine aspect ratio class
  const aspectClass =
    aspectRatio === '9:16'
      ? 'aspect-[9/16]'
      : aspectRatio === '1:1'
      ? 'aspect-square'
      : 'aspect-video';

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStarToggle?.(id, e);
  };

  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyPrompt?.(prompt, e);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectToggle?.(id);
  };

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer flex flex-col transition-all duration-300"
    >
      <div
        className={`relative w-full overflow-hidden rounded-lg bg-surface-container-low border border-border/40 shadow-lg ${aspectClass}`}
      >
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Bulk Selection Checkbox Overlay */}
        {isBulkMode && (
          <button
            type="button"
            onClick={handleCheckboxClick}
            className={`absolute top-2.5 left-2.5 z-30 h-6 w-6 rounded-md border flex items-center justify-center transition-all ${
              isSelected
                ? 'bg-primary border-primary text-on-primary'
                : 'bg-surface-dim/80 border-white/30 text-transparent hover:border-white'
            }`}
          >
            <Check className="h-3.5 w-3.5 stroke-[3]" />
          </button>
        )}

        {/* Duration Badge (Bottom-Right, Video only) */}
        {type === 'video' && duration && (
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-surface-dim/80 backdrop-blur-md text-on-surface font-mono text-[11px] font-medium flex items-center gap-1 pointer-events-none group-hover:opacity-0 transition-opacity">
            <Play className="h-3 w-3 fill-secondary text-secondary" />
            <span>{duration}</span>
          </div>
        )}

        {/* Star Button (Top-Right) */}
        <button
          type="button"
          onClick={handleStarClick}
          className={`absolute top-2 right-2 z-20 h-7 w-7 rounded-full bg-surface-dim/80 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 ${
            isStarred
              ? 'text-amber-400 opacity-100'
              : 'text-on-surface-variant opacity-0 group-hover:opacity-100 hover:text-amber-400'
          }`}
          title={isStarred ? 'Unstar Asset' : 'Favorite Asset'}
        >
          <Star className={`h-4 w-4 ${isStarred ? 'fill-amber-400' : ''}`} />
        </button>

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5 z-10">
          {/* Top Engine Pill Badge */}
          <div className="flex justify-start">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-black/60 text-secondary border border-white/15 backdrop-blur-sm">
              {engine}
            </span>
          </div>

          {/* Center Play / Animate Action Button */}
          <div className="flex items-center justify-center">
            {type === 'video' ? (
              <div className="h-9 w-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg transform transition-all hover:scale-105 active:scale-95">
                <Play className="h-4 w-4 fill-current ml-0.5" />
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-on-primary text-[11px] font-semibold shadow-lg transition-all hover:scale-105 active:scale-95">
                <Sparkles className="h-3 w-3" />
                <span>Animate</span>
              </div>
            )}
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between gap-1.5 w-full">
            <button
              type="button"
              onClick={onClick}
              className="flex-1 py-1 px-2 rounded-md bg-primary text-on-primary text-[11px] font-medium flex items-center justify-center gap-1 transition-all hover:opacity-90 active:scale-95 shadow-sm"
            >
              {type === 'video' ? (
                <>
                  <Film className="h-3 w-3" />
                  <span>Open</span>
                </>
              ) : (
                <>
                  <Download className="h-3 w-3" />
                  <span>Save</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCopyClick}
              className="p-1 rounded-md bg-white/10 text-on-surface hover:text-primary hover:bg-white/20 transition-colors border border-white/10"
              title="Copy Prompt"
            >
              <Copy className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Card Metadata Footer */}
      <div className="pt-2.5 pb-1 flex items-center justify-between gap-2 px-0.5">
        <h3
          className="text-sm font-medium text-primary truncate"
          title={title}
        >
          {title}
        </h3>
        {createdAt && (
          <span className="font-mono text-xs text-on-surface-variant flex-shrink-0">
            {createdAt}
          </span>
        )}
      </div>
    </div>
  );
}
