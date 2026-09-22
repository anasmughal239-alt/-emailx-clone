"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function ConstructionLine() {
  return (
    <div aria-hidden="true" className="relative h-px w-full bg-white/[0.08]">
      <span className="absolute -top-[3px] left-0 h-[7px] w-px bg-white/25" />
      <span className="absolute -top-[3px] right-0 h-[7px] w-px bg-white/25" />
    </div>
  );
}

function Crosshair({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute h-3 w-3 ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/20" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/20" />
    </span>
  );
}

export function Narrative() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], [4, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section className="mx-auto max-w-2xl px-4 py-28 sm:py-36">
      <div className="relative">
        <Crosshair className="-left-1.5 -top-1.5" />
        <Crosshair className="-right-1.5 -top-1.5" />
        <Crosshair className="-bottom-1.5 -left-1.5" />
        <Crosshair className="-bottom-1.5 -right-1.5" />

        <div className="flex flex-col gap-8 text-2xl font-medium leading-snug text-white sm:text-3xl">
          <p>Great outbound takes more than a good email.</p>
          <ConstructionLine />
          <p>
            It&apos;s knowing who to reach, what to say, and when to follow up.
          </p>
          <ConstructionLine />
          <motion.p ref={ref} style={{ opacity, filter }}>
            I turn that judgment into a system that runs itself across email
            and LinkedIn, in your voice.
          </motion.p>
          <ConstructionLine />
          <p>You set the direction. I run the outbound.</p>
        </div>
      </div>
    </section>
  );
}
