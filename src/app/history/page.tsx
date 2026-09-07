'use client';

import { useState } from 'react';
import { MediaCard } from '@/components/library/MediaCard';
import { MediaDetailModal } from '@/components/library/MediaDetailModal';
import { LibraryStatsHeader, FilterType } from '@/components/library/LibraryStatsHeader';
import { BulkActionBar } from '@/components/library/BulkActionBar';
import { CheckCircle2 } from 'lucide-react';

export interface HistoryItem {
  id: string;
  title: string;
  prompt: string;
  url: string;
  thumbnailUrl: string;
  type: 'video' | 'image';
  engine: string;
  aspectRatio: string;
  duration?: string;
  createdAt: string;
  isStarred: boolean;
}

const INITIAL_ASSETS: HistoryItem[] = [
  {
    id: '1',
    title: 'Liquid Mercury',
    prompt: 'Fluid liquid chrome mirror mercury ripple forming organic sculptural wave topology under high contrast studio lighting with deep obsidian void reflections and precision micro ripples.',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyZ7xAt7WuTsrKyVD9pZaZ7NKWYAPRDoxAt_ppP3SG3TrBDwmMWalfDyyaFql8oYFR_IL3S5skrwmLSAaxg2GkgqehfkbIXgtLLMlchMARskRrm97QS6m9sLy3yrvDQjk99YQ3YmcB-fsxBN1bCMyKOmWduJrPYZL1zlNCjzPoM6chmRvAnJHfXIatHwpo4eRjkOMauwqRiUT0iHd3169gIQy0oYAgdIa7LEPIAL2gtexyPUb2cG7n1A',
    type: 'video',
    engine: 'Veo 3.1',
    aspectRatio: '16:9',
    duration: '00:10',
    createdAt: '2h ago',
    isStarred: true,
  },
  {
    id: '2',
    title: 'Neural Flora',
    prompt: 'Intricate macroscopic alien neural flora pulsating with deep ultraviolet and cyan bioluminescent tendrils against absolute black soil laboratory isolation macro 100mm shallow depth of field.',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqLweuKOMZd8GseU14-VoXgeudJphanB--__kQYJ9OZy_Pw8-wxPI31AOxrhkAWni02wYmuYZ9MNnBpubejp8gn1LpWIciqJliHQ9lgvp6ZX4iDnS1nOqsHyerFqaF-wPyMEb4ykqKeHYzXtkbgRuJuD_TA09bJ8wYIwlYAqOVLWcsVAGfRJPkqFqBFLZDrz0cWqpTMIm1mNYXuAQChMnigVxtWUUA8WPF-CzwXBjOUYlo_JL1TT2zzQ',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqLweuKOMZd8GseU14-VoXgeudJphanB--__kQYJ9OZy_Pw8-wxPI31AOxrhkAWni02wYmuYZ9MNnBpubejp8gn1LpWIciqJliHQ9lgvp6ZX4iDnS1nOqsHyerFqaF-wPyMEb4ykqKeHYzXtkbgRuJuD_TA09bJ8wYIwlYAqOVLWcsVAGfRJPkqFqBFLZDrz0cWqpTMIm1mNYXuAQChMnigVxtWUUA8WPF-CzwXBjOUYlo_JL1TT2zzQ',
    type: 'image',
    engine: 'Flux.1 Pro',
    aspectRatio: '16:9',
    createdAt: '5h ago',
    isStarred: true,
  },
  {
    id: '3',
    title: 'Tokyo Rain',
    prompt: 'FPV continuous drone plunge through dense misty rainy Tokyo skyscraper alleys at midnight with wet asphalt reflections holographic billboards and subtle amber taillight bokeh streaks.',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEhnX76tQ1kut6C0MvUMCa3oSw1rXOyJ4PyEWim0waG84DOuRJGjW6BhmaxO8R6-Ypok-XL4Gq0cTHbg1kUCD1trp9gCpQjo9oMGbR8H53NI6gYEuYynLnAf_CQJkXdyNYMZ4B6sPHzVO0N-zjUrLj2gSsc1YjGZb4pmbssQ6TVvxgJn9kW310tfW0KFBeEWFb5Vrsd5H_LAFEk7v12blu5EeOSbd0dskUqn3Vif2Ua2cAJF_-RWxdfw',
    type: 'video',
    engine: 'Sora 2.0',
    aspectRatio: '16:9',
    duration: '00:08',
    createdAt: 'Yesterday',
    isStarred: false,
  },
  {
    id: '4',
    title: 'Desert Monolith',
    prompt: 'Massive raw concrete monolithic pyramid pavilion structure embedded in vast red Martian desert sand dunes at golden hour long dramatic architectural shadow minimalist composition.',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2XO1VkOTI3I4WnpYAQ6ieQNTQWZ76BYQFKp-mt8mCNYxmNqpDkKYwZbfnfuF-sheMd-DjKIVhn251rWGidwLvQK6ISinxzQ5TioRzpMWc-xBWpvbXgj8549iuFDbKGWH0skNZcJdWZvZzDqGO_uxgtDRoDm1FEhKMnq_isNuLX3jpnM3x466xyoHeYecEg6mET6obC4cI0PynHiF-ZEIcLn41OR-lNJUWm2jsWJyLYX3byoHenn45cw',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2XO1VkOTI3I4WnpYAQ6ieQNTQWZ76BYQFKp-mt8mCNYxmNqpDkKYwZbfnfuF-sheMd-DjKIVhn251rWGidwLvQK6ISinxzQ5TioRzpMWc-xBWpvbXgj8549iuFDbKGWH0skNZcJdWZvZzDqGO_uxgtDRoDm1FEhKMnq_isNuLX3jpnM3x466xyoHeYecEg6mET6obC4cI0PynHiF-ZEIcLn41OR-lNJUWm2jsWJyLYX3byoHenn45cw',
    type: 'image',
    engine: 'Midjourney',
    aspectRatio: '16:9',
    createdAt: '2d ago',
    isStarred: false,
  },
  {
    id: '5',
    title: 'Deep Sea Flora',
    prompt: 'Microscopic translucent oceanic siphonophore pulsating through abyssal deep ocean currents with refractive glass like organ chambers and blue light pulses 8k resolution.',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO02Tz9z-3TnL7XIloCrLc3QXE5XWRXcJjlEEk04tSQMvtIO48WnfFINTcB9dFUf7hg0ka19qWkwFSGvK3YJ3pY2qeMl2h29qA6lutyXUniHYKj1TAsngsoPLWrQhROyXYqOX4jnfFTluNoeZyR36Ck5_5WarKed667MrI-8ozytS14wIj5BFK_lyM4yzep0lyvSaiBYm2cJndCqWC4vDl2altQfHRY2AFnm9FQ-hsq_arYCJM8mVj6w',
    type: 'video',
    engine: 'Veo 3.1',
    aspectRatio: '16:9',
    duration: '00:06',
    createdAt: '3d ago',
    isStarred: true,
  },
  {
    id: '6',
    title: 'Cyberpunk Alley',
    prompt: 'Steaming back alley in neo Seoul after heavy drizzle with neon green and purple sign reflections in oil slick puddles slow low tracking cinematic camera move.',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC8OVeMctLj6E5T_H_hkHnw7hN7q1yyVl0IW-EK_cjyKyAHpi4x16rnd6-xr7neimU2kZE1jxk5Uj1XIe0pgCcmJNF6A1AYDdNBFUBM91yRl26wtsK16p3F7F0t2OzjqP4HDlA7mrIVZlLgPVO3g9Xmz3XWsJcoMEdwF4k7Kvs9Hq8igDGovMxzdGNR5_h-ummNlQZdHJzRmpnk-tSry37HIsAwnzcgb34kF_XDvpjyqzm50aSl8dGKw',
    type: 'video',
    engine: 'Runway Gen-3',
    aspectRatio: '16:9',
    duration: '00:10',
    createdAt: '4d ago',
    isStarred: false,
  },
  {
    id: '7',
    title: 'Nordic Pavilion',
    prompt: 'Architectural photography of blackened timber minimalist Scandinavian sauna on solitary granite fjord rock edge morning fog and glassy fjord water reflection.',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgttmZlJhr20RiQlwvdp7_71tsTd2Y8PK_xGuOVBEBuT4AOY_2QSJrTrqFoYQI9BUPwMXm0WEbCdIp0Gp_jurfGUBnf9lUbvd4meGrpZcsJ_oKf6pqV9akIgyJYJWih-lgcWdim7QWML3PUVZQQd5NlX02zw0j1IFUBc7sZjT8k2YOpsbOtnJk3C5NRAvjx2kqD_3ip83TnlTuOcZau768N_8CgK9UmHhhu5muy2t6yyCC-ReMHg-HGQ',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgttmZlJhr20RiQlwvdp7_71tsTd2Y8PK_xGuOVBEBuT4AOY_2QSJrTrqFoYQI9BUPwMXm0WEbCdIp0Gp_jurfGUBnf9lUbvd4meGrpZcsJ_oKf6pqV9akIgyJYJWih-lgcWdim7QWML3PUVZQQd5NlX02zw0j1IFUBc7sZjT8k2YOpsbOtnJk3C5NRAvjx2kqD_3ip83TnlTuOcZau768N_8CgK9UmHhhu5muy2t6yyCC-ReMHg-HGQ',
    type: 'image',
    engine: 'Flux.1 Pro',
    aspectRatio: '16:9',
    createdAt: '5d ago',
    isStarred: false,
  },
  {
    id: '8',
    title: 'Volcanic Obsidian',
    prompt: 'Crystalline volcanic black obsidian magma fissure cracking open revealing glowing hyper saturated molten gold core high speed 1000fps macro capture.',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQZQEbPwuUK7dRKp6DKbpl9_wqCUhvcTHvEN8PC1iERcaNU9_z6kcM0urAAEYjHhLGsh9xMz47Y5xXFpO40XUIBoGgQTRiJq3z3N2bC9Z7MgRZFooqfYKtAAeMf8clNk96stONVOa_fmpAOuwv4CBrT-_chkQPJ848ORfifQjI0Mzv1DGq7IYtV_CQYMRd6ZFB7V-U9NXoPqFg3VQAwd-XobY-5o-95dxs-5FsTl17i5hCzpOfI2JoXA',
    type: 'video',
    engine: 'Veo 3.1',
    aspectRatio: '16:9',
    duration: '00:12',
    createdAt: '1w ago',
    isStarred: true,
  },
];

export default function HistoryPage() {
  const [assets, setAssets] = useState<HistoryItem[]>(INITIAL_ASSETS);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<HistoryItem | null>(null);

  // Derived counts
  const videoCount = assets.filter((a) => a.type === 'video').length;
  const imageCount = assets.filter((a) => a.type === 'image').length;
  const starredCount = assets.filter((a) => a.isStarred).length;

  // Filtered Assets
  const filteredAssets = assets.filter((item) => {
    // Filter Tab match
    if (activeFilter === 'video' && item.type !== 'video') return false;
    if (activeFilter === 'image' && item.type !== 'image') return false;
    if (activeFilter === 'starred' && !item.isStarred) return false;

    // Search Query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = item.title.toLowerCase().includes(q);
      const matchesPrompt = item.prompt.toLowerCase().includes(q);
      const matchesEngine = item.engine.toLowerCase().includes(q);
      if (!matchesTitle && !matchesPrompt && !matchesEngine) return false;
    }

    return true;
  });

  // Handlers
  const handleStarToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAssets((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isStarred: !item.isStarred } : item
      )
    );
  };

  const handleCopyPrompt = (prompt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(prompt);
    }
    setToastMessage('Prompt copied to clipboard');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSelectToggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleBulkMode = () => {
    if (isBulkMode) {
      setIsBulkMode(false);
      setSelectedIds(new Set());
    } else {
      setIsBulkMode(true);
    }
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
    setIsBulkMode(false);
  };

  const handleArchiveSelected = () => {
    if (selectedIds.size === 0) return;
    setAssets((prev) => prev.filter((a) => !selectedIds.has(a.id)));
    setToastMessage(`${selectedIds.size} assets archived`);
    setSelectedIds(new Set());
    setIsBulkMode(false);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="flex flex-col w-full min-h-screen px-8 pb-16 animate-in fade-in duration-300">
      {/* Header with Stats & Filters */}
      <LibraryStatsHeader
        totalCount={assets.length}
        videoCount={videoCount}
        imageCount={imageCount}
        starredCount={starredCount}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isBulkMode={isBulkMode}
        onToggleBulkMode={handleToggleBulkMode}
      />

      {/* Sticky Bulk Action Bar */}
      {(isBulkMode || selectedIds.size > 0) && (
        <BulkActionBar
          selectedCount={selectedIds.size}
          onClearSelection={handleClearSelection}
          onDownloadZip={() => {
            setToastMessage('Preparing download zip...');
            setTimeout(() => setToastMessage(null), 2500);
          }}
          onAddToProject={() => {
            setToastMessage('Added selected assets to project');
            setTimeout(() => setToastMessage(null), 2500);
          }}
          onArchive={handleArchiveSelected}
        />
      )}

      {/* Primary Media Grid */}
      {filteredAssets.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAssets.map((item) => (
            <MediaCard
              key={item.id}
              id={item.id}
              title={item.title}
              prompt={item.prompt}
              engine={item.engine}
              type={item.type}
              thumbnailUrl={item.thumbnailUrl}
              aspectRatio={item.aspectRatio}
              duration={item.duration}
              createdAt={item.createdAt}
              isStarred={item.isStarred}
              isBulkMode={isBulkMode}
              isSelected={selectedIds.has(item.id)}
              onStarToggle={handleStarToggle}
              onCopyPrompt={handleCopyPrompt}
              onSelectToggle={handleSelectToggle}
              onClick={() => setSelectedMedia(item)}
            />
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4 text-on-surface-variant">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-lg font-semibold text-primary mb-1">No assets found</h3>
          <p className="text-sm text-on-surface-variant max-w-sm">
            Try adjusting your search prompt or changing the category filter tabs.
          </p>
        </div>
      )}

      {/* Prompt Copied Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="h-4 w-4 text-secondary" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Media Detail Modal */}
      <MediaDetailModal
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        media={selectedMedia}
      />
    </div>
  );
}
