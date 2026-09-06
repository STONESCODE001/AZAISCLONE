'use client';

import { Zap, ArrowUp, User } from 'lucide-react';
import { useState } from 'react';
import { UpgradeModal } from '../modals/UpgradeModal';

export function TopNav() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-[260px] right-0 z-40 bg-surface-dim/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 w-full px-8 flex items-center justify-end gap-6">
        
        {/* Credit Counter Pill */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high">
          <Zap className="h-4 w-4 text-secondary" />
          <span className="font-medium text-sm text-primary">8 Credits Remaining</span>
        </div>

        {/* Upgrade Button */}
        <button
          onClick={() => setIsUpgradeModalOpen(true)}
          className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <ArrowUp className="h-4 w-4" />
          Upgrade
        </button>

        {/* User Avatar */}
        <button className="h-8 w-8 rounded-full bg-primary flex items-center justify-center transition-colors">
          <User className="h-4 w-4 text-on-primary" />
        </button>
      </div>

      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
      />
    </header>
  );
}
