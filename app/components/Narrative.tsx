"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
      <div className="flex flex-col gap-8 text-2xl font-medium leading-snug text-white sm:text-3xl">
        <p>Great outbound takes more than a good email.</p>
        <p>
          It&apos;s knowing who to reach, what to say, and when to follow up.
        </p>
        <motion.p ref={ref} style={{ opacity, filter }}>
          I turn that judgment into a system that runs itself across email
          and LinkedIn, in your voice.
        </motion.p>
        <p>You set the direction. I run the outbound.</p>
      </div>
    </section>
  );
}
