interface MacWindowProps {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function MacWindow({ label, children, className = "" }: MacWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101012] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E2685A]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E3BD5C]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#6FCB9F]" />
        </div>
        <div className="text-xs text-[color:var(--color-text-micro)]">{label}</div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function LivePreviewLabel({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-accent-green)] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent-green)]" />
      </span>
      {text}
    </span>
  );
}
