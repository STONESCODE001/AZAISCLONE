import Link from "next/link";

interface HeaderProps {
  onOpenAuth?: () => void;
}

export function Header({ onOpenAuth }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-container-max mx-auto px-gutter-desktop flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link className="flex items-center gap-2 group" href="#">
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
              <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <span className="font-headline-sm text-lg font-bold tracking-tight text-white">
              Azais<span className="text-secondary">AI</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-sm text-white font-medium hover:text-white transition-colors" href="#">Home</Link>
            <Link className="text-sm text-on-surface-variant hover:text-white transition-colors" href="/dashboard">Dashboard</Link>
            <Link className="text-sm text-on-surface-variant hover:text-white transition-colors" href="#">FAQ</Link>
            <Link className="text-sm text-on-surface-variant hover:text-white transition-colors" href="#">Pricing</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenAuth}
            className="text-sm text-on-surface-variant hover:text-white transition-colors font-medium cursor-pointer"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={onOpenAuth}
            className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-white text-black text-sm font-semibold hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            Start Creating Free
          </button>
        </div>
      </div>
    </header>
  );
}

