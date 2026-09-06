'use client';

import { ArrowRight, Video, Image as ImageIcon, Play, Download } from 'lucide-react';
import Link from 'next/link';

interface ReelItem {
  id: string;
  type: 'video' | 'image';
  title: string;
  engine: string;
  timeOrRes: string;
  thumbnail: string;
}

export function ContextualReel() {
  const dummyItems: ReelItem[] = [
    {
      id: '1',
      type: 'video',
      title: 'Liquid Mercury Ripple Study',
      engine: 'Veo 3.1',
      timeOrRes: '00:10',
      thumbnail: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: '2',
      type: 'image',
      title: 'Bioluminescent Neural Flora',
      engine: 'Flux.1 Pro',
      timeOrRes: '4K',
      thumbnail: 'https://images.unsplash.com/photo-1682687982501-1e5898147063?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: '3',
      type: 'video',
      title: 'Tokyo Rain Neon Flight',
      engine: 'Sora 2',
      timeOrRes: '00:08',
      thumbnail: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: '4',
      type: 'image',
      title: 'Desert Brutalism Monolith',
      engine: 'Midjourney v6.1',
      timeOrRes: '6144x3456',
      thumbnail: 'https://images.unsplash.com/photo-1682695796254-cf45e1fa07dd?q=80&w=600&auto=format&fit=crop',
    },
  ];

  return (
    <section className="w-full mt-16 mb-8 flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-primary tracking-tight">Recent Creations</h2>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-numeric text-on-surface-variant">
            {dummyItems.length}
          </span>
        </div>
        <Link 
          href="/history"
          className="group flex items-center gap-1 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
        >
          <span>View Archive</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Curated 1-Row Reel Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        {dummyItems.map((item) => (
          <div 
            key={item.id}
            className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-surface-container-low shadow-md transition-all duration-300 hover:shadow-xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.thumbnail})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/20 to-transparent" />

            {/* Top Floating Metadata */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="px-2 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-[10px] font-semibold text-primary">
                {item.engine} • {item.timeOrRes}
              </span>
              <span className="w-6 h-6 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-primary">
                {item.type === 'video' ? <Video className="h-3.5 w-3.5" /> : <ImageIcon className="h-3.5 w-3.5" />}
              </span>
            </div>

            {/* Bottom Meta & Instant Hover Actions */}
            <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-1">
              <p className="text-sm text-primary font-medium truncate">{item.title}</p>
              
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="px-2 py-1 rounded bg-surface-container-high/90 hover:bg-primary hover:text-on-primary text-primary text-[10px] font-semibold backdrop-blur-md transition-colors">
                    {item.type === 'video' ? 'Remix' : 'Animate'}
                  </button>
                  <button className="w-6 h-6 rounded bg-surface-container-high/90 hover:bg-primary hover:text-on-primary text-primary flex items-center justify-center backdrop-blur-md transition-colors">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
                
                {item.type === 'video' ? (
                  <div className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Play className="h-4 w-4 fill-current" />
                  </div>
                ) : (
                  <span className="text-[10px] font-medium text-on-surface-variant">{item.timeOrRes === '4K' ? '0.8s gen' : item.timeOrRes}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
