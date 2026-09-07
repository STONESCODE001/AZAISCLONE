'use client';

import { Video, Image as ImageIcon, Cloud, Search, CheckSquare } from 'lucide-react';

export type FilterType = 'all' | 'video' | 'image' | 'starred';

interface LibraryStatsHeaderProps {
  totalCount: number;
  videoCount: number;
  imageCount: number;
  starredCount: number;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isBulkMode: boolean;
  onToggleBulkMode: () => void;
}

export function LibraryStatsHeader({
  totalCount,
  videoCount,
  imageCount,
  starredCount,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  isBulkMode,
  onToggleBulkMode,
}: LibraryStatsHeaderProps) {
  return (
    <section className="flex flex-col gap-6 pb-6 pt-2">
      {/* Top Row: Narrative Metatitle & Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-primary tracking-tight">Library</h1>
        </div>

        {/* Quick Metrics Summary */}
        <div className="flex items-center gap-4 text-on-surface-variant text-sm font-medium">
          <div className="flex items-center gap-1.5">
            <Video className="h-4 w-4 text-secondary" />
            <span className="font-mono text-on-surface">{videoCount} Videos</span>
          </div>
          <span className="text-surface-variant">/</span>
          <div className="flex items-center gap-1.5">
            <ImageIcon className="h-4 w-4 text-primary" />
            <span className="font-mono text-on-surface">{imageCount} Images</span>
          </div>
          <span className="text-surface-variant">/</span>
          <div className="flex items-center gap-1.5">
            <Cloud className="h-4 w-4 text-secondary" />
            <span className="font-mono text-on-surface">108.4 GB</span>
          </div>
        </div>
      </div>

      {/* Filter Strip & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-low p-2 rounded-xl border border-border/30">
        {/* Media Mode Segmented Filter */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeFilter === 'all'
                ? 'bg-primary text-on-primary shadow'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            All ({totalCount})
          </button>

          <button
            onClick={() => onFilterChange('video')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeFilter === 'video'
                ? 'bg-primary text-on-primary shadow'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            Videos ({videoCount})
          </button>

          <button
            onClick={() => onFilterChange('image')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeFilter === 'image'
                ? 'bg-primary text-on-primary shadow'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            Images ({imageCount})
          </button>

          <button
            onClick={() => onFilterChange('starred')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeFilter === 'starred'
                ? 'bg-primary text-on-primary shadow'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            Starred ({starredCount})
          </button>
        </div>

        {/* Action & Search Controls Group */}
        <div className="flex items-center gap-3">
          {/* Real-time Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search prompt or title..."
              className="w-full bg-surface-container-high border border-border/40 rounded-lg py-2 pl-9 pr-4 text-xs text-primary placeholder:text-on-surface-variant/60 focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          {/* Bulk Selection Mode Button */}
          <button
            onClick={onToggleBulkMode}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
              isBulkMode
                ? 'bg-secondary text-on-secondary border-secondary'
                : 'bg-surface-container-high text-on-surface border-border/40 hover:bg-surface-bright'
            }`}
          >
            <CheckSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Select</span>
          </button>
        </div>
      </div>
    </section>
  );
}
