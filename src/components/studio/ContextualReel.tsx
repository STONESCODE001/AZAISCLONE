'use client';

import { ArrowRight, Video, Image as ImageIcon, Play, Download } from 'lucide-react';
import Link from 'next/link';

export interface ReelItem {
  id: string;
  title: string;
  prompt: string;
  url: string;
  type: 'video' | 'image';
  engine: string;
  timeOrRes?: string;
  thumbnail?: string;
}

interface ContextualReelProps {
  activeId?: string;
  onSelect?: (item: ReelItem) => void;
}

export function ContextualReel({ activeId = '1', onSelect }: ContextualReelProps) {
  const dummyItems: ReelItem[] = [
    {
      id: '1',
      title: 'Liquid Mercury Ripple Study',
      prompt: 'Liquid mercury metallic ripples in extreme macro slow motion, ultra-reflective chrome fluid dynamics',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWMKt9tNwY6QmntZWowOdGuIta4aPg5rxbqLVfMOvMTzBuKxLE4aRUhvCI37QHoogU0v42JX3IgY_4FszUO1fdMb7zyA8vYSVhpdhJ8EfermYmHQpd4tcsE-P3v8wjkYHZo8V79e40CXRgTchJHhPNCuM-LxSEOuOkpfyHVKr6x56D41W4Cf33O3oJqn5l3MykdrVezAPweH2UjR9l_-Q7L4qs4swIRnELTJ0HjdH2k-dO7w5nwFvyTg',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWMKt9tNwY6QmntZWowOdGuIta4aPg5rxbqLVfMOvMTzBuKxLE4aRUhvCI37QHoogU0v42JX3IgY_4FszUO1fdMb7zyA8vYSVhpdhJ8EfermYmHQpd4tcsE-P3v8wjkYHZo8V79e40CXRgTchJHhPNCuM-LxSEOuOkpfyHVKr6x56D41W4Cf33O3oJqn5l3MykdrVezAPweH2UjR9l_-Q7L4qs4swIRnELTJ0HjdH2k-dO7w5nwFvyTg',
      type: 'video',
      engine: 'Veo 3.1',
      timeOrRes: '00:10',
    },
    {
      id: '2',
      title: 'Bioluminescent Neural Flora',
      prompt: 'Intricate macroscopic alien neural flora pulsating with deep ultraviolet and cyan bioluminescent tendrils against absolute black soil',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFOX0jzqDjsIdrBDIBnGJmhuXJjky5_ugiD-ea16_lW23QSC1Qacpit9bJ2R_bGmvhU9rFjmc-sB_daP3HWv1XVmr-z7N8pK6x5012E8RYDEbKkK7Er-pBoYg_8zBL7OJUPLCuqJVY1BXIccXgcJeYlB1HoeUHSsxFXFkB3mtMAC8yjTObtJM_FqNI6Usk4kQofdxrGrsAwWzXLhbHoiLM2PHBDwaZsmN7-gfx0trVJwpJGMcEeM61BA',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFOX0jzqDjsIdrBDIBnGJmhuXJjky5_ugiD-ea16_lW23QSC1Qacpit9bJ2R_bGmvhU9rFjmc-sB_daP3HWv1XVmr-z7N8pK6x5012E8RYDEbKkK7Er-pBoYg_8zBL7OJUPLCuqJVY1BXIccXgcJeYlB1HoeUHSsxFXFkB3mtMAC8yjTObtJM_FqNI6Usk4kQofdxrGrsAwWzXLhbHoiLM2PHBDwaZsmN7-gfx0trVJwpJGMcEeM61BA',
      type: 'image',
      engine: 'Flux.1 Pro',
      timeOrRes: '4K',
    },
    {
      id: '3',
      title: 'Tokyo Rain Neon Flight',
      prompt: 'FPV continuous drone plunge through dense misty rainy Tokyo skyscraper alleys at midnight with wet asphalt reflections and neon glow',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY0khNkZS9xlRvkSsqdCFj5IOvfwWLsv3lYVZAJTQrpEi6W74ZQt4w9Z0pxsCe2jJwAm1lBb1Q0wLTUIhOc2F8U8U95RBvzQ-aD91v5sSW5IGv4jN5hG0qpvp3kJEjLR7JyuA7ScnMNXdLw2tNPzfBL2JJ0qVNyLIOHKhZizERNnI-2KELEUd3xx1T-DuPyA9qSB5lwvuECBYVJPgRW4jxwS9CK_VtGUVezqlS2YpBnPF_ep7qQZ8cug',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY0khNkZS9xlRvkSsqdCFj5IOvfwWLsv3lYVZAJTQrpEi6W74ZQt4w9Z0pxsCe2jJwAm1lBb1Q0wLTUIhOc2F8U8U95RBvzQ-aD91v5sSW5IGv4jN5hG0qpvp3kJEjLR7JyuA7ScnMNXdLw2tNPzfBL2JJ0qVNyLIOHKhZizERNnI-2KELEUd3xx1T-DuPyA9qSB5lwvuECBYVJPgRW4jxwS9CK_VtGUVezqlS2YpBnPF_ep7qQZ8cug',
      type: 'video',
      engine: 'Sora 2',
      timeOrRes: '00:08',
    },
    {
      id: '4',
      title: 'Desert Brutalism Monolith',
      prompt: 'Massive raw concrete monolithic pyramid structure embedded in vast red Martian desert sand dunes at golden hour long dramatic architectural shadow',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTXga85cPmj_Cmy-vljBCqmUu8XRjUXIjRn3sfthtNszFVMxrnJQyFaeZxQ9XddfcOzEvXdeUEWJA3Er74I8UZ1vGmq6FsMbQxtL5hZYTnd4QXDPMsZHw-2QdtoNlMrl6Wz2KdzG05O8PLmi5ytNg780alToASQzZcyV0Re0RVdfzYITEJ45CGlX9Kw3ZAjCmdKeVmLxDqEtwb8OhHUsqR139IeWlFMJDkjzcgLOqOeaLBE2Fog_mXNA',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTXga85cPmj_Cmy-vljBCqmUu8XRjUXIjRn3sfthtNszFVMxrnJQyFaeZxQ9XddfcOzEvXdeUEWJA3Er74I8UZ1vGmq6FsMbQxtL5hZYTnd4QXDPMsZHw-2QdtoNlMrl6Wz2KdzG05O8PLmi5ytNg780alToASQzZcyV0Re0RVdfzYITEJ45CGlX9Kw3ZAjCmdKeVmLxDqEtwb8OhHUsqR139IeWlFMJDkjzcgLOqOeaLBE2Fog_mXNA',
      type: 'image',
      engine: 'Midjourney v6.1',
      timeOrRes: '6144x3456',
    },
  ];

  return (
    <section className="w-full mt-10 mb-8 flex flex-col gap-5">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-semibold text-primary tracking-tight">Recent Creations</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high font-mono text-xs font-semibold text-on-surface-variant border border-white/5">
            {dummyItems.length}
          </span>
        </div>
        <Link 
          href="/history"
          className="group flex items-center gap-1.5 text-xs font-medium text-on-surface-variant hover:text-primary transition-colors"
        >
          <span>View Archive</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Curated 1-Row Reel Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
        {dummyItems.map((item) => {
          const isActive = item.id === activeId;

          return (
            <div 
              key={item.id}
              onClick={() => onSelect && onSelect(item)}
              className={`group relative aspect-[16/10] rounded-2xl overflow-hidden bg-surface-container-low shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer ${
                isActive ? 'ring-2 ring-secondary border-2 border-secondary' : 'border border-white/5'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.thumbnail || item.url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/20 to-transparent pointer-events-none" />

              {/* Top Floating Metadata */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-[10px] font-semibold text-primary border border-white/5">
                  {item.engine} • {item.timeOrRes}
                </span>
                <span className="w-6 h-6 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-primary border border-white/5">
                  {item.type === 'video' ? <Video className="h-3.5 w-3.5" /> : <ImageIcon className="h-3.5 w-3.5" />}
                </span>
              </div>

              {/* Bottom Meta & Instant Hover Actions */}
              <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-1">
                <p className="text-sm text-primary font-medium truncate">{item.title}</p>
                
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="px-2 py-1 rounded bg-surface-container-high/90 hover:bg-primary hover:text-on-primary text-primary text-[10px] font-semibold backdrop-blur-md transition-colors border border-white/5">
                      {item.type === 'video' ? 'Remix' : 'Animate'}
                    </button>
                    <button className="w-6 h-6 rounded bg-surface-container-high/90 hover:bg-primary hover:text-on-primary text-primary flex items-center justify-center backdrop-blur-md transition-colors border border-white/5">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  
                  {item.type === 'video' ? (
                    <div className="w-7 h-7 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                    </div>
                  ) : (
                    <span className="text-[10px] font-medium text-on-surface-variant">
                      {item.timeOrRes === '4K' ? '0.8s gen' : item.timeOrRes}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
