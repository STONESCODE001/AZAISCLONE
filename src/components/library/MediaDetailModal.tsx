'use client';

import { X, Download, Copy, Share2 } from 'lucide-react';

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
  } | null;
}

export function MediaDetailModal({ isOpen, onClose, media }: MediaDetailModalProps) {
  if (!isOpen || !media) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-[#131315] border border-border-medium rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
        
        {/* Media Preview (Left side on desktop) */}
        <div className="flex-1 bg-black flex items-center justify-center p-4 md:p-8 border-r border-border-subtle relative min-h-[300px]">
          {media.type === 'video' ? (
            <video 
              src={media.url} 
              className="max-w-full max-h-full rounded-lg shadow-2xl" 
              controls 
              autoPlay 
              loop
            />
          ) : (
            <img 
              src={media.url} 
              alt={media.title} 
              className="max-w-full max-h-full rounded-lg shadow-2xl object-contain" 
            />
          )}
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:hidden rounded-full p-2 bg-black/50 text-white hover:bg-black/70 backdrop-blur-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Details Sidebar (Right side on desktop) */}
        <div className="w-full md:w-96 flex flex-col bg-[#1c1b1d] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-border-subtle">
            <h2 className="text-lg font-semibold text-white truncate pr-4">{media.title}</h2>
            <button 
              onClick={onClose}
              className="hidden md:flex rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6 flex-1 flex flex-col gap-6">
            <div>
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Prompt</h3>
              <div className="bg-[#131315] border border-border-subtle rounded-xl p-4 relative group">
                <p className="text-sm text-zinc-300 leading-relaxed">{media.prompt}</p>
                <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-white/10 text-white hover:bg-white/20">
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Engine</h3>
                <p className="text-sm text-white font-medium">{media.engine}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Created</h3>
                <p className="text-sm text-white font-medium">{media.createdAt}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-border-subtle flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white text-black py-2.5 text-sm font-semibold hover:bg-zinc-200 transition-colors">
              <Download className="h-4 w-4" />
              Download
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-white/10 text-white px-4 py-2.5 hover:bg-white/20 transition-colors border border-border-subtle">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
