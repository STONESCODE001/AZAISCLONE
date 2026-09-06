'use client';

interface Shortcut {
  label: string;
  intent: string;
}

interface ShortcutChipsProps {
  shortcuts: Shortcut[];
  onSelect: (intent: string) => void;
}

export function ShortcutChips({ shortcuts, onSelect }: ShortcutChipsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
      {shortcuts.map((shortcut, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(shortcut.intent)}
          className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary text-sm font-medium transition-colors shadow-sm"
          type="button"
        >
          {shortcut.label}
        </button>
      ))}
    </div>
  );
}
