'use client';

import { X, Sparkles, Check, Lock } from 'lucide-react';
import { useState } from 'react';

export function UpgradeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200 px-4">
      <div className="relative w-full max-w-3xl bg-[#131315] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 rounded-full p-2 bg-black/50 text-zinc-400 hover:text-white hover:bg-black/70 backdrop-blur-md transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-10 pb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Compute & Tiers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Refuel Your Studio</h2>
        </div>

        <div className="px-6 md:px-10 pb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Pro Creator */}
          <div className="relative rounded-3xl bg-[#1c1b1d] border border-accent-cyan/30 p-8 flex flex-col shadow-[0_0_30px_rgba(56,189,248,0.1)] transition-transform hover:scale-[1.02]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-cyan text-[#00363e] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Most Popular
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Pro Creator</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$29</span>
              <span className="text-zinc-500 font-medium">/month</span>
            </div>
            
            <ul className="space-y-4 flex-1 mb-8">
              {['1,200 monthly 4K credits', 'Priority rendering queue', 'Commercial rights included', 'Early access to new models'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent-cyan shrink-0" />
                  <span className="text-sm text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className="w-full rounded-full bg-white text-black font-bold py-3.5 hover:bg-zinc-200 transition-colors">
              Subscribe to Pro
            </button>
          </div>

          {/* Card 2: Compute Pack */}
          <div className="rounded-3xl bg-[#18181b] border border-white/5 p-8 flex flex-col transition-transform hover:scale-[1.02]">
            <h3 className="text-xl font-bold text-white mb-2">Compute Pack</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$12</span>
              <span className="text-zinc-500 font-medium">one-time</span>
            </div>
            
            <ul className="space-y-4 flex-1 mb-8">
              {['300 immediate credits', 'Credits never expire', 'Standard generation speed', 'Basic commercial rights'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-zinc-500 shrink-0" />
                  <span className="text-sm text-zinc-400">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className="w-full rounded-full bg-white/10 text-white font-bold py-3.5 hover:bg-white/20 border border-white/5 transition-colors">
              Buy Credits
            </button>
          </div>
        </div>

        <div className="bg-[#0e0e10] p-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 border-t border-white/5">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <Lock className="h-3 w-3" />
            <span>Encrypted via Stripe • Cancel anytime</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-zinc-400">Apple Pay</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
            <span className="font-semibold text-zinc-400">Google Pay</span>
          </div>
        </div>

      </div>
    </div>
  );
}
