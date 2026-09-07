'use client';

import { CheckCircle2, Download, FolderPlus, Trash2, X } from 'lucide-react';

interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onDownloadZip?: () => void;
  onAddToProject?: () => void;
  onArchive?: () => void;
}

export function BulkActionBar({
  selectedCount,
  onClearSelection,
  onDownloadZip,
  onAddToProject,
  onArchive,
}: BulkActionBarProps) {
  return (
    <div className="sticky top-20 z-30 mb-6 bg-surface-container-high border border-border/40 px-6 py-3 rounded-xl flex items-center justify-between shadow-2xl animate-in slide-in-from-top-4 duration-300">
      {/* Left: Selected Counter */}
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 text-secondary" />
        <span className="font-mono text-sm font-medium text-primary">
          {selectedCount} asset{selectedCount === 1 ? '' : 's'} selected
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onDownloadZip}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface text-xs font-semibold transition-all border border-white/10"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Download Zip</span>
        </button>

        <button
          onClick={onAddToProject}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface text-xs font-semibold transition-all border border-white/10"
        >
          <FolderPlus className="h-3.5 w-3.5" />
          <span>Add to Project</span>
        </button>

        <button
          onClick={onArchive}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-error/20 hover:bg-error/30 text-error text-xs font-semibold transition-all border border-error/20"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Archive</span>
        </button>

        <button
          onClick={onClearSelection}
          className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary transition-colors ml-2"
          title="Exit Selection"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
