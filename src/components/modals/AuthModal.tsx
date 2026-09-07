'use client';

import { X, Mail, ArrowRight, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Auth flow state
  const [authStep, setAuthStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(42);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDismiss = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setIsRendered(false);
      // Reset internal step state after modal closes
      setAuthStep('email');
      setEmail('');
      setOtp(['', '', '', '', '', '']);
      setAuthStatus('idle');
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

  // Keyboard Escape listener & body overflow toggle
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

  // Countdown timer effect for OTP resend
  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (authStep === 'otp' && countdown > 0) {
      setIsResendDisabled(true);
      timerInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timerInterval);
  }, [authStep, countdown]);

  const handleEmailSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !email.includes('@')) return;
    setAuthStep('otp');
    setCountdown(42);
    setOtp(['', '', '', '', '', '']);
    setTimeout(() => {
      otpInputRefs.current[0]?.focus();
    }, 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split('');
      setOtp(digits);
      otpInputRefs.current[5]?.focus();
    }
  };

  const handleResendCode = () => {
    if (isResendDisabled) return;
    setCountdown(42);
    setIsResendDisabled(true);
    setOtp(['', '', '', '', '', '']);
    otpInputRefs.current[0]?.focus();
  };

  const handleAuthenticate = () => {
    setAuthStatus('loading');
    setTimeout(() => {
      setAuthStatus('success');
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/dashboard');
        }
        handleDismiss();
      }, 600);
    }, 1000);
  };

  const handleSocialAuth = () => {
    setAuthStatus('loading');
    setTimeout(() => {
      setAuthStatus('success');
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/dashboard');
        }
        handleDismiss();
      }, 600);
    }, 800);
  };

  if (!isRendered || !mounted) return null;

  return createPortal(
    <div
      id="auth-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-headline"
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl ${
        isClosing ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop'
      }`}
    >
      {/* Background Grid & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-[120px]"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[90px]"></div>
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="telemetry-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-zinc-700" />
              <circle cx="0" cy="0" r="1" fill="currentColor" className="text-cyan-400" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#telemetry-grid)" />
        </svg>
      </div>

      {/* Split Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 w-full max-w-[1020px] min-h-[580px] md:min-h-[620px] rounded-2xl border border-white/10 bg-[#0e0e10] shadow-[0_24px_50px_rgba(0,0,0,0.7)] grid grid-cols-1 md:grid-cols-2 overflow-hidden ${
          isClosing ? 'animate-modal-card-out' : 'animate-modal-card'
        }`}
      >
        {/* Left Column: Cinematic Render & Telemetry (Desktop Only) */}
        <div className="relative hidden md:flex w-full h-full bg-[#131315] overflow-hidden flex-col justify-end p-6 select-none border-r border-white/5">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJKyIsmrMvnbwoarJAoq-n_HjAZx-VRsJAPXlOIhyZT9S3N61cvu6OIsk-ae6en9Q7KJhbvq2Drie1Tmp0nsXyRQX1vMyRYsdybY625z2N9vHeCCmFIPvp_ZPAEDrRT-tY88qEY6n8vG_HkTLmf2bJ1Sg2Nmee221Q7OqcZCW4LHoadi2H9g0h1pPUB7iUSs4ACaZ4Mb3NiFDZFd2njX361C5LRArH-4yIy3LRzorlsPNDQITQd9t7Pw"
            alt="Cinematic AI Render"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/95 via-[#0e0e10]/30 to-transparent"></div>

          <div className="relative z-10 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-cyan-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Generative Prompt • Veo 3.1 & Sora</span>
            </div>
            <p className="text-xs text-zinc-300/80 tracking-wide font-medium">
              AzaisAI Creator @Studio Akdag • 4K Master Render
            </p>
          </div>
        </div>

        {/* Right Column: Identity Gateway Form */}
        <div className="relative w-full h-full bg-[#0e0e10] flex flex-col justify-between p-6 sm:p-8 md:p-10">
          {/* Dismiss Button */}
          <button
            type="button"
            aria-label="Close"
            onClick={handleDismiss}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="my-auto flex flex-col gap-6 w-full max-w-[360px] mx-auto">
            {/* Header Title */}
            <div className="text-center">
              <h2 id="auth-modal-headline" className="text-2xl sm:text-3xl font-bold tracking-tight text-white italic">
                Welcome to AzaisAI
              </h2>
            </div>

            {/* Social OAuth Actions */}
            <div className="flex flex-col gap-3 w-full">
              <button
                type="button"
                onClick={handleSocialAuth}
                disabled={authStatus !== 'idle'}
                className="w-full h-12 px-6 rounded-xl bg-white hover:bg-zinc-200 text-[#0e0e10] font-medium text-sm flex items-center justify-center gap-3 shadow transition-transform active:scale-[0.98] cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleSocialAuth}
                disabled={authStatus !== 'idle'}
                className="w-full h-12 px-6 rounded-xl bg-white hover:bg-zinc-200 text-[#0e0e10] font-medium text-sm flex items-center justify-center gap-3 shadow transition-transform active:scale-[0.98] cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.43-6-9.13-10.74-19.53-14.23-31.21-3.48-11.68-5.23-22.75-5.23-33.22 0-14.24 3.7-25.86 11.11-34.85 7.4-8.99 16.63-13.59 27.68-13.8 4.58 0 9.8 1.25 15.67 3.76 5.87 2.51 9.68 3.82 11.44 3.93 1.3 0 5.23-1.36 11.78-4.09 6.54-2.73 12.09-3.99 16.64-3.79 12.86.65 23.05 5.56 30.56 14.73-11.12 6.74-16.57 16.22-16.35 28.43.22 9.58 3.81 17.65 10.79 24.2 6.97 6.54 15.14 10.35 24.51 11.43-2.18 6.74-4.8 13.06-7.85 18.96zM119.22 31.84c0-7.72 2.76-14.94 8.28-21.65 5.51-6.72 12.28-10.82 20.3-12.31.22 1.09.33 2.18.33 3.27 0 7.62-2.88 15.02-8.62 22.21-5.75 7.19-12.59 11.27-20.53 12.23-.22-1.31-.33-2.4-.33-3.75z" />
                </svg>
                <span>Continue with Apple</span>
              </button>
            </div>

            {/* Divider Line */}
            <div className="relative flex items-center justify-center my-1">
              <div className="w-full border-t border-white/10"></div>
              <span className="absolute bg-[#0e0e10] px-3 text-xs text-zinc-400">or</span>
            </div>

            {/* Dynamic Step Flow */}
            {authStep === 'email' ? (
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Continue with email"
                      className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-400 outline-none focus:bg-white/10 focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-12 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <div className="text-center space-y-1">
                  <p className="text-xs text-zinc-400">
                    Verification code sent to <strong className="text-white">{email}</strong>
                  </p>
                  <button
                    type="button"
                    onClick={() => setAuthStep('email')}
                    className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
                  >
                    Change email
                  </button>
                </div>

                {/* 6 OTP boxes */}
                <div className="flex items-center justify-between gap-1.5">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      onPaste={handleOtpPaste}
                      className="w-10 h-12 text-center text-lg font-bold bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:bg-white/10 focus:border-cyan-400 transition-all"
                    />
                  ))}
                </div>

                {/* Resend code timer */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">
                    {countdown > 0 ? (
                      <>
                        Resend code in <strong className="text-white">{countdown}s</strong>
                      </>
                    ) : (
                      'Code expired.'
                    )}
                  </span>
                  <button
                    type="button"
                    disabled={isResendDisabled}
                    onClick={handleResendCode}
                    className={`text-xs ${
                      isResendDisabled
                        ? 'text-zinc-600 cursor-not-allowed'
                        : 'text-cyan-400 hover:underline cursor-pointer'
                    }`}
                  >
                    Resend code
                  </button>
                </div>

                {/* Authenticate Submit CTA */}
                <button
                  type="button"
                  onClick={handleAuthenticate}
                  disabled={authStatus !== 'idle' || otp.some((d) => !d)}
                  className={`w-full h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    authStatus === 'success'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white text-black hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed'
                  }`}
                >
                  {authStatus === 'loading' && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  )}
                  {authStatus === 'success' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Authenticated</span>
                    </>
                  )}
                  {authStatus === 'idle' && <span>Verify & Continue</span>}
                </button>
              </div>
            )}

            {/* Legal Microcopy */}
            <p className="text-center text-[12px] leading-relaxed text-zinc-400">
              By continuing with Google, Apple, or Email, you agree to our{' '}
              <a href="#" className="text-cyan-400 hover:underline cursor-pointer">
                Terms of Service
              </a>{' '}
              and acknowledge our{' '}
              <a href="#" className="text-cyan-400 hover:underline cursor-pointer">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Identity Security Footer */}
          <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-400 uppercase tracking-widest pt-4 border-t border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Identity Gateway</span>
            <span>•</span>
            <span>TLS 1.3 Certified</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
