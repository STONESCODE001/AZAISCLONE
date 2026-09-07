'use client';

import { X, Download, Copy, Check, Share2, Sparkles, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MediaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: {
    id: string;
    title: string;
    prompt: string;
    url: string;
    type: 'video' | 'image';
    engine: string;
    createdAt: string;
    aspectRatio?: string;
    resolution?: string;
    seed?: string;
  } | null;
}

export function MediaDetailModal({ isOpen, onClose, media }: MediaDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !media) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(media.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Modal Dialog Card - Compact max-w-3xl */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0e0e10] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Top-Right Close Button */}
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="group absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none"
        >
          <X className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
        </button>

        {/* Media Frame Preview */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/5 mb-6 group">
          {media.type === 'video' ? (
            <video
              src={media.url}
              className="w-full h-full object-cover"
              controls
              autoPlay
              loop
            />
          ) : (
            <img
              src={media.url}
              alt={media.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Details & Actions Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-semibold text-secondary uppercase tracking-widest">
                  {media.engine}
                </span>
                <span className="text-xs text-zinc-500">• {media.createdAt}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {media.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-zinc-200 transition-all shadow-md"
              >
                <Download className="h-4 w-4" />
                <span>{downloading ? 'Preparing...' : 'Download MP4'}</span>
              </button>
            </div>
          </div>

          {/* Prompt Quote Box */}
          <div className="flex items-start justify-between gap-3 p-4 rounded-xl bg-[#18181b] border border-white/5">
            <div className="flex items-start gap-2.5 flex-1 min-w-0">
              <Quote className="h-4 w-4 text-zinc-500 mt-0.5 shrink-0" />
              <p className="text-sm text-zinc-200 italic leading-relaxed">
                {media.prompt}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-colors border border-white/5 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-secondary" />
                  <span className="text-secondary font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
