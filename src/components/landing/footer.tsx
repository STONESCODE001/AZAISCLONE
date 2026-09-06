export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest py-space-3xl">
      <div className="max-w-container-max mx-auto px-gutter-desktop py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center">
              <svg className="w-3 h-3 text-secondary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <span className="font-headline-sm text-sm font-bold text-white">AzaisAI</span>
            <span className="text-xs text-on-surface-variant ml-3">© 2025 AzaisAI Studio Inc.</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-numeric text-xs text-on-surface-variant">Models Operational</span>
            </div>
            <a className="text-xs text-on-surface-variant hover:text-white transition-colors" href="#">Privacy</a>
            <a className="text-xs text-on-surface-variant hover:text-white transition-colors" href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
