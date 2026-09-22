interface MarqueeProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyFor?: (item: T, index: number) => React.Key;
  className?: string;
}

export function Marquee<T>({ items, renderItem, keyFor, className = "" }: MarqueeProps<T>) {
  return (
    <div
      className={`marquee-track overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${className}`}
    >
      <div className="animate-marquee flex w-max items-center gap-10">
        {[...items, ...items].map((item, i) => (
          <div key={keyFor ? keyFor(item, i) : i} className="flex-shrink-0">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
