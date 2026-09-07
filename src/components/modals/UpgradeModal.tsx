'use client';

import { X, Check, Lock, ArrowRight } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: (planId: string) => void;
}

export function UpgradeModal({ isOpen, onClose, onSelectPlan }: UpgradeModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDismiss = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setIsRendered(false);
    }, 200);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setIsClosing(false);
    } else if (isRendered) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsRendered(false);
        setIsClosing(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleDismiss]);

  if (!isRendered || !mounted) return null;

  return createPortal(
    <div
      id="upgrade-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md ${
        isClosing ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop'
      }`}
    >
      {/* Modal Dialog Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0e0e10] p-6 sm:p-8 shadow-2xl subtle-border ${
          isClosing ? 'animate-modal-card-out' : 'animate-modal-card'
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close dialog"
          onClick={handleDismiss}
          className="group absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none"
        >
          <X className="h-4 w-4 transition-transform group-hover:scale-95" />
        </button>

        {/* Modal Header */}
        <div className="mb-7 text-left pr-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-cyan-400 uppercase mb-3">
            <span className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse"></span>
            Compute & Tiers
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white" id="modal-headline">
            Refuel Your Studio
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Unlock high-throughput rendering queues and higher resolutions. No long-term lock-in.
          </p>
        </div>

        {/* Upgrade Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* OPTION 1: Pro Creator Membership (Highlighted) */}
          <div className="relative flex flex-col justify-between rounded-2xl border border-white/20 bg-[#161619] p-5 glow-accent transition-all hover:border-white/30 hover:scale-[1.01]">
            {/* Best Value Badge */}
            <div className="absolute -top-2.5 right-4 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
              Most Popular
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-base font-bold text-white tracking-tight">Pro Creator</h3>
              </div>
              <div className="flex items-baseline gap-1 my-3">
                <span className="text-3xl font-extrabold text-white tracking-tight">$29</span>
                <span className="text-xs font-normal text-zinc-400">/ month</span>
              </div>

              {/* Value Summary Checklist */}
              <ul className="space-y-2.5 text-xs text-zinc-300 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold text-white">1,200</strong> monthly 4K credits
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Veo 3.1 & Sora 2 priority line</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Full commercial rights & 4K exports</span>
                </li>
              </ul>
            </div>

            {/* Primary CTA */}
            <button
              type="button"
              onClick={() => {
                onSelectPlan?.('pro_creator');
                handleDismiss();
              }}
              className="w-full rounded-full bg-white py-2.5 px-4 text-center text-xs font-bold text-black tracking-wide transition-all hover:bg-zinc-200 active:scale-[0.98] shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Upgrade to Pro</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* OPTION 2: Instant Compute Pack (One-Time) */}
          <div className="relative flex flex-col justify-between rounded-2xl border border-white/5 bg-[#121214] p-5 transition-all hover:border-white/15 hover:scale-[1.01]">
            <div>
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-base font-bold text-zinc-200 tracking-tight">Compute Pack</h3>
              </div>
              <div className="flex items-baseline gap-1 my-3">
                <span className="text-3xl font-extrabold text-white tracking-tight">$12</span>
                <span className="text-xs font-normal text-zinc-400">one-time</span>
              </div>

              {/* Value Summary Checklist */}
              <ul className="space-y-2.5 text-xs text-zinc-400 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold text-zinc-200">300</strong> immediate credits
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>Credits never expire</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>Zero recurring billing</span>
                </li>
              </ul>
            </div>

            {/* Secondary CTA */}
            <button
              type="button"
              onClick={() => {
                onSelectPlan?.('compute_pack');
                handleDismiss();
              }}
              className="w-full rounded-full border border-white/15 bg-white/5 py-2.5 px-4 text-center text-xs font-semibold text-white tracking-wide transition-all hover:bg-white/10 hover:border-white/25 active:scale-[0.98]"
            >
              Buy 300 Credits
            </button>
          </div>
        </div>

        {/* Trust and Express Checkout Footer */}
        <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 text-[11px]">
          {/* Microcopy reassurance */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="flex items-center gap-1 text-zinc-400">
              <Lock className="h-3.5 w-3.5 text-zinc-400" />
              Encrypted via Stripe
            </span>
            <span>•</span>
            <span>Instant studio activation</span>
            <span>•</span>
            <span>Cancel anytime</span>
          </div>

          {/* Clean Monochrome Express Payment Icons */}
          <div className="flex items-center gap-2 opacity-60 hover:opacity-80 transition-opacity">
            <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-medium tracking-tight bg-white/5 text-zinc-300">
              Apple Pay
            </span>
            <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-medium tracking-tight bg-white/5 text-zinc-300">
              G Pay
            </span>
            <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-medium tracking-tight bg-white/5 text-zinc-300">
              Visa / MC
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
