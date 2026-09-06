'use client';

import { useState } from 'react';
import { MediaCard } from '@/components/library/MediaCard';
import { MediaDetailModal } from '@/components/library/MediaDetailModal';
import { Settings2, Search } from 'lucide-react';

export default function LibraryPage() {
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);

  // Mock data for Unit 3 UI
  const mockLibrary = [
    {
      id: '1',
      title: 'Neon Cyberpunk Alleyway',
      prompt: 'A cinematic drone shot through a neon-lit cyberpunk alleyway in Tokyo. Rain reflecting off the pavement, flying cars in the distant sky. 8k, photorealistic, unteal and orange color grading.',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      type: 'video' as const,
      thumbnailUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=600&auto=format&fit=crop',
      engine: 'Veo 3.1',
      aspectRatio: '16:9',
      createdAt: '2 hours ago'
    },
    {
      id: '2',
      title: 'Abstract Liquid Metal',
      prompt: 'Macro photography of liquid metal morphing. Iridescent colors, smooth lighting, satisfying fluid simulation, high contrast.',
      url: 'https://images.unsplash.com/photo-1682687982501-1e5898147063?q=80&w=1200&auto=format&fit=crop',
      type: 'image' as const,
      thumbnailUrl: 'https://images.unsplash.com/photo-1682687982501-1e5898147063?q=80&w=600&auto=format&fit=crop',
      engine: 'Flux.1 Pro',
      aspectRatio: '9:16',
      createdAt: '5 hours ago'
    },
    {
      id: '3',
      title: 'Cinematic Mountain Sunrise',
      prompt: 'Time-lapse of a sunrise over the Swiss Alps. Dramatic clouds, warm light hitting the peaks, pristine snow, 35mm lens, atmospheric haze.',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      type: 'video' as const,
      thumbnailUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=600&auto=format&fit=crop',
      engine: 'Sora 2.0',
      aspectRatio: '16:9',
      createdAt: '1 day ago'
    },
    {
      id: '4',
      title: 'Character Portrait - Warrior',
      prompt: 'Portrait of a female sci-fi warrior with glowing armor. Cybernetic eye, rain falling on her face, neon reflections, cinematic lighting, depth of field.',
      url: 'https://images.unsplash.com/photo-1682687982185-531d09ec56fc?q=80&w=1200&auto=format&fit=crop',
      type: 'image' as const,
      thumbnailUrl: 'https://images.unsplash.com/photo-1682687982185-531d09ec56fc?q=80&w=600&auto=format&fit=crop',
      engine: 'Flux.1 Pro',
      aspectRatio: '1:1',
      createdAt: '2 days ago'
    },
    {
      id: '5',
      title: 'Underwater Bioluminescence',
      prompt: 'Tracking shot of a glowing jellyfish deep underwater. Bioluminescent particles, pitch black background, National Geographic style documentary footage.',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      type: 'video' as const,
      thumbnailUrl: 'https://images.unsplash.com/photo-1682695796254-cf45e1fa07dd?q=80&w=600&auto=format&fit=crop',
      engine: 'Veo 3.1',
      aspectRatio: '9:16',
      createdAt: '1 week ago'
    },
  ];

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 mt-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Your Library</h1>
          <p className="text-zinc-400 mt-2">All your generated videos and images in one place.</p>
        </div>
        
        {/* Filters/Search */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search prompt..." 
              className="w-full md:w-64 bg-[#1c1b1d] border border-border-subtle rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-border-active transition-colors"
            />
          </div>
          <button className="flex items-center justify-center rounded-full bg-[#1c1b1d] border border-border-subtle p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
            <Settings2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-24">
        {mockLibrary.map((item) => (
          <MediaCard 
            key={item.id}
            id={item.id}
            title={item.title}
            engine={item.engine}
            type={item.type}
            aspectRatio={item.aspectRatio}
            thumbnailUrl={item.thumbnailUrl}
            onClick={() => setSelectedMedia(item)}
          />
        ))}
      </div>

      {/* Media Detail Modal */}
      <MediaDetailModal 
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        media={selectedMedia}
      />
    </div>
  );
}
