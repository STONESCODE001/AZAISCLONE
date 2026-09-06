'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, History, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/', icon: LayoutGrid },
    { name: 'History', href: '/history', icon: History },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-surface-dim z-50 flex flex-col justify-between p-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-9 h-9 rounded bg-primary flex items-center justify-center">
            <Video className="text-on-primary h-5 w-5" />
          </div>
          <span className="font-semibold text-xl text-primary tracking-tight">AzaisAI</span>
        </div>

        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-surface-container-high text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-3">
        <div className="flex items-center justify-between text-on-surface-variant">
          <span className="text-sm font-medium">Studio Engine</span>
          <span className="text-xs font-semibold text-secondary">v2.4</span>
        </div>
        <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
          <div className="bg-secondary h-full w-2/3 rounded-full"></div>
        </div>
      </div>
    </aside>
  );
}
