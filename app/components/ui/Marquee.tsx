interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className = "" }: MarqueeProps) {
  return (
    <div
      className={`marquee-track overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${className}`}
    >
      <div className="animate-marquee flex w-max gap-10">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-sm font-semibold tracking-tight text-[color:var(--color-text-micro)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
