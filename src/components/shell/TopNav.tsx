'use client';

import { Zap, ArrowUp, User } from 'lucide-react';
import { useState } from 'react';
import { UpgradeModal } from '../modals/UpgradeModal';

export function TopNav() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-[260px] right-0 z-40 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5">
      <div className="h-16 w-full px-8 flex items-center justify-end gap-3">
        {/* Credit Counter Pill */}
        <button
          type="button"
          onClick={() => setIsUpgradeModalOpen(true)}
          className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3.5 py-1.5 text-xs text-zinc-300 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Zap className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400/20" />
          <span className="font-medium">8 Credits Remaining</span>
        </button>

        {/* Upgrade Button */}
        <button
          type="button"
          onClick={() => setIsUpgradeModalOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-1.5 text-xs font-semibold shadow-sm hover:bg-zinc-200 transition-colors active:scale-[0.98] cursor-pointer"
        >
          <ArrowUp className="h-3.5 w-3.5" />
          <span>Upgrade</span>
        </button>

        {/* User Avatar */}
        <button
          type="button"
          className="h-8 w-8 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center text-xs font-medium text-white hover:border-white/20 transition-colors"
        >
          <User className="h-4 w-4 text-zinc-300" />
        </button>
      </div>

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onSelectPlan={(planId) => {
          console.log('Selected plan:', planId);
          setIsUpgradeModalOpen(false);
        }}
      />
    </header>
  );
}
