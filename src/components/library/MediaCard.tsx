'use client';

import { Play, ImageIcon } from 'lucide-react';

interface MediaCardProps {
  id: string;
  title: string;
  engine: string;
  type: 'video' | 'image';
  thumbnailUrl: string;
  aspectRatio: string;
  onClick: () => void;
}

export function MediaCard({
  title,
  engine,
  type,
  thumbnailUrl,
  aspectRatio,
  onClick,
}: MediaCardProps) {
  // Determine aspect ratio class
  const aspectClass = aspectRatio === '9:16' ? 'aspect-[9/16]' : aspectRatio === '1:1' ? 'aspect-square' : 'aspect-video';

  return (
    <div 
      onClick={onClick}
      className="group relative cursor-pointer flex flex-col gap-2 transition-all duration-300 hover:scale-[1.02]"
    >
      <div className={`relative w-full rounded-2xl overflow-hidden bg-[#1c1b1d] border border-border-subtle group-hover:border-accent-cyan/50 transition-colors shadow-lg ${aspectClass}`}>
        <img 
          src={thumbnailUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Play Icon for video */}
        {type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg scale-90 group-hover:scale-100 duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
              <Play className="h-6 w-6 text-white ml-1" />
            </div>
          </div>
        )}
        
        {/* Engine Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300 delay-75">
          {type === 'image' ? (
            <ImageIcon className="h-3 w-3 text-accent-cyan" />
          ) : (
            <Play className="h-3 w-3 text-accent-cyan" />
          )}
          <span className="text-[10px] font-semibold tracking-wide text-white uppercase">{engine}</span>
        </div>
      </div>
      
      {/* Title */}
      <div className="px-1">
        <h4 className="text-sm font-semibold text-white truncate">{title}</h4>
      </div>
    </div>
  );
}
