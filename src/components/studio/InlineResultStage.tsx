'use client';

import {
  Play,
  Pause,
  Maximize2,
  Download,
  Sliders,
  Copy,
  Check,
  Quote,
  Sparkles,
  Loader2,
  X,
} from 'lucide-react';
import { useState, useRef } from 'react';

export interface GeneratedMediaItem {
  id?: string;
  title?: string;
  prompt: string;
  url: string;
  type: 'video' | 'image';
  engine?: string;
  aspectRatio?: string;
  resolution?: string;
  seed?: string;
  createdAt?: string;
}

interface InlineResultStageProps {
  mediaUrl: string;
  mediaType: 'video' | 'image';
  prompt: string;
  title?: string;
  engine?: string;
  aspectRatio?: string;
  resolution?: string;
  seed?: string;
  createdAt?: string;
  onDismiss?: () => void;
  onRemix?: () => void;
}

export function InlineResultStage({
  mediaUrl,
  mediaType,
  prompt,
  title = 'Liquid Mercury Ripple Study',
  engine = 'Veo 3.1',
  aspectRatio = '16:9',
  resolution = '3840 × 2160',
  seed = '849021743',
  createdAt = 'Today, 14:28',
  onDismiss,
}: InlineResultStageProps) {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRemixOpen, setIsRemixOpen] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'preparing' | 'ready'>('idle');
  const [remixPrompt, setRemixPrompt] = useState(prompt);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloadStatus('preparing');
    setTimeout(() => {
      setDownloadStatus('ready');
      setTimeout(() => setDownloadStatus('idle'), 1500);
    }, 1000);
  };

  const toggleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Ambient Depth Underglow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-80 bg-gradient-to-b from-secondary/15 via-surface-tint/5 to-transparent blur-3xl opacity-30" />

      {/* Main Stage Card Container */}
      <div className="relative z-10 w-full flex flex-col bg-surface-container-low/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
        
        {/* Top Right Close Button (Styled like UpgradeModal close button) */}
        {onDismiss && (
          <button
            type="button"
            aria-label="Close active stage"
            onClick={onDismiss}
            className="group absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-zinc-300 backdrop-blur-md transition-all hover:border-white/30 hover:bg-black/80 hover:text-white focus:outline-none shadow-lg"
          >
            <X className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
          </button>
        )}

        {/* 16:9 Aspect Ratio Media Frame */}
        <div className="group/player relative aspect-video w-full bg-surface-container-lowest overflow-hidden">
          {mediaType === 'video' ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/player:scale-105 cursor-pointer"
              loop
              muted
              onClick={togglePlay}
            />
          ) : (
            <img
              src={mediaUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/player:scale-105"
            />
          )}

          {/* Vignette Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-surface-container-lowest/20 pointer-events-none" />

          {/* Center Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className="pointer-events-auto w-20 h-20 rounded-full bg-surface-dim/80 backdrop-blur-xl flex items-center justify-center text-primary shadow-2xl border border-white/20 hover:scale-110 transition-transform cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 fill-current text-primary" />
              ) : (
                <Play className="w-10 h-10 fill-current pl-1 text-primary" />
              )}
            </button>
          </div>

          {/* Bottom Scrim Status Bar */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-on-surface">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md border border-white/5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-xs text-primary">00:04 / 00:10</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-primary hover:text-secondary transition-colors border border-white/5"
                title="Fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Details & Action Controls */}
        <div className="p-4 md:p-6 flex flex-col gap-4">
          {/* Header & Primary Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-white/5">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                {title}
              </h1>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={downloadStatus !== 'idle'}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-on-primary text-xs md:text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                {downloadStatus === 'preparing' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-on-primary" />
                    <span>Preparing...</span>
                  </>
                ) : downloadStatus === 'ready' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Ready</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download MP4</span>
                  </>
                )}
              </button>

              {/* Remix Toggle Button */}
              <button
                onClick={() => setIsRemixOpen(!isRemixOpen)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs md:text-sm font-semibold transition-all shadow-sm ${
                  isRemixOpen
                    ? 'bg-surface-variant text-secondary border-secondary/50'
                    : 'bg-surface-container-high hover:bg-surface-variant text-primary border border-white/10'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Remix</span>
              </button>
            </div>
          </div>

          {/* Prompt Quote Card */}
          <div className="flex items-start justify-between gap-4 p-3.5 rounded-lg bg-surface-container-lowest/60 border border-white/5">
            <div className="flex items-start gap-2.5 flex-1 min-w-0">
              <Quote className="w-4 h-4 text-outline mt-0.5 shrink-0" />
              <p className="text-sm text-on-surface italic leading-relaxed">
                {prompt}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface-variant hover:text-primary text-xs font-mono transition-colors border border-white/5 shrink-0"
              title="Copy Prompt"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-secondary font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Expandable Remix Drawer */}
          {isRemixOpen && (
            <div className="flex flex-col gap-3 p-4 rounded-lg bg-surface-container border border-secondary/30 transition-all animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <Sliders className="w-4 h-4 text-secondary" />
                  <span>Remix Parameters</span>
                </div>
                <span className="font-mono text-xs text-on-surface-variant">
                  Cost: 1 Credit
                </span>
              </div>

              <div className="relative w-full">
                <textarea
                  value={remixPrompt}
                  onChange={(e) => setRemixPrompt(e.target.value)}
                  rows={2}
                  className="w-full bg-surface-container-lowest border border-white/10 rounded-md p-3 text-primary placeholder:text-outline resize-none outline-none text-sm leading-relaxed focus:border-secondary transition-colors"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface-variant font-mono text-xs">
                    {engine}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface-variant font-mono text-xs">
                    {aspectRatio}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface-variant font-mono text-xs">
                    Motion: 7
                  </span>
                </div>

                <button
                  onClick={() => {
                    // Simulates generating variation
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-on-secondary text-xs md:text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Variation (1 Credit)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
