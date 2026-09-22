interface GlowRingProps {
  children: React.ReactNode;
  variant?: "iridescent" | "peach";
  className?: string;
}

const gradients: Record<string, string> = {
  iridescent: "from-[#FFE0D3] via-[#E3D5FF] to-[#CBE6FF]",
  peach: "from-[#FF7E5F] via-[#FEB47B] to-[#FFE0D3]",
};

export function GlowRing({
  children,
  variant = "iridescent",
  className = "",
}: GlowRingProps) {
  return (
    <div className={`relative isolate ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute -inset-[10%] -z-10 rounded-3xl bg-gradient-to-tr opacity-60 blur-2xl ${gradients[variant]}`}
      />
      <div className={`h-full rounded-3xl bg-gradient-to-tr p-[2px] ${gradients[variant]}`}>
        <div className="h-full rounded-[calc(1.5rem-2px)] bg-[#0E0F12]">{children}</div>
      </div>
    </div>
  );
}
