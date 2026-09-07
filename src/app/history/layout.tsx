import { Sidebar } from '@/components/shell/Sidebar';
import { TopNav } from '@/components/shell/TopNav';

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col font-body-md text-on-surface">
      <Sidebar />
      <TopNav />
      <div className="pl-[260px] pt-16 flex flex-col flex-1">
        <main className="flex-1 w-full relative">
          {children}
        </main>
      </div>
    </div>
  );
}
