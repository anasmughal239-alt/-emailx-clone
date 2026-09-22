"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Moon, Zap } from "lucide-react";
import { WorkflowPreview } from "./WorkflowPreview";
import { Marquee } from "./ui/Marquee";
import { Magnetic } from "./ui/Magnetic";
import {
  N8nMark,
  HubspotMark,
  ClaudeMark,
  CalendlyMark,
  NamecheapMark,
  APOLLO_SRC,
  SMARTLEAD_SRC,
  MAKE_SRC,
  INSTANTLY_SRC,
  PROSPEO_SRC,
  CLAY_SRC,
  ZOOMINFO_SRC,
  Mono,
  type ToolLogo,
} from "./ui/ToolLogos";

const TOOLS: { name: string; logo: ToolLogo }[] = [
  { name: "Clay", logo: { kind: "img", src: CLAY_SRC } },
  { name: "Apollo", logo: { kind: "img", src: APOLLO_SRC } },
  { name: "Instantly", logo: { kind: "img", src: INSTANTLY_SRC } },
  { name: "Smartlead", logo: { kind: "img", src: SMARTLEAD_SRC } },
  { name: "n8n", logo: { kind: "svg", Comp: N8nMark, tint: "rgba(234,75,113,0.18)", fg: "text-[#ea4b71]" } },
  { name: "HubSpot", logo: { kind: "svg", Comp: HubspotMark, tint: "rgba(255,122,89,0.18)", fg: "text-[#ff7a59]" } },
  { name: "Calendly", logo: { kind: "svg", Comp: CalendlyMark, tint: "rgba(0,107,255,0.18)", fg: "text-[#4d9bff]" } },
  { name: "Prospeo", logo: { kind: "img", src: PROSPEO_SRC } },
  { name: "ZoomInfo", logo: { kind: "img", src: ZOOMINFO_SRC } },
  { name: "Claude", logo: { kind: "svg", Comp: ClaudeMark, tint: "rgba(217,119,87,0.18)", fg: "text-[#d97757]" } },
  { name: "Make", logo: { kind: "img", src: MAKE_SRC } },
  { name: "Namecheap", logo: { kind: "svg", Comp: NamecheapMark, tint: "rgba(222,55,35,0.18)", fg: "text-[#de3723]" } },
];

const STARS = [
  { top: "8%", left: "12%", size: 2, delay: 0 },
  { top: "18%", left: "82%", size: 1.5, delay: 0.4 },
  { top: "30%", left: "24%", size: 2, delay: 0.8 },
  { top: "12%", left: "48%", size: 1.5, delay: 1.2 },
  { top: "40%", left: "68%", size: 2, delay: 0.2 },
  { top: "22%", left: "6%", size: 1.5, delay: 1.6 },
  { top: "35%", left: "90%", size: 1.5, delay: 0.6 },
  { top: "5%", left: "65%", size: 2, delay: 1 },
  { top: "48%", left: "38%", size: 1.5, delay: 1.4 },
  { top: "15%", left: "30%", size: 1.5, delay: 0.9 },
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const nightOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const moonOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const zapOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const sleepColor = useTransform(scrollYProgress, [0, 0.3], ["#94969c", "#ffffff"]);
  const wakeDimOpacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 0]);

  return (
    <section id="top" ref={heroRef} className="relative overflow-hidden pb-20 pt-40 sm:pt-48">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative isolate mb-7 inline-flex items-center gap-2 rounded-full bg-[#141518] px-4 py-2 text-xs text-[color:var(--color-text-secondary)]"
        >
          <span className="animate-shimmer pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-amber-300/60 via-fuchsia-300/60 to-sky-300/60 p-px [mask-composite:exclude] [mask-image:linear-gradient(#000_0_0),linear-gradient(#000_0_0)] [-webkit-mask-composite:xor]" />
          <span className="relative inline-grid h-[13px] w-[13px] flex-shrink-0 place-items-center">
            <motion.span style={{ opacity: moonOpacity }} className="absolute inset-0 grid place-items-center">
              <Moon size={13} />
            </motion.span>
            <motion.span style={{ opacity: zapOpacity }} className="absolute inset-0 grid place-items-center text-amber-300">
              <Zap size={13} />
            </motion.span>
          </span>
          GTM Engineer &amp; Builder — Karachi
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="font-[family-name:var(--font-display)] text-[2.75rem] font-normal leading-[1.08] tracking-tight sm:text-6xl"
        >
          Pipeline that runs while you{" "}
          <motion.span style={{ color: sleepColor }}>sleep</motion.span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-[color:var(--color-text-secondary)]"
        >
          I design and run the outbound systems B2B teams use to book
          meetings — deliverability, list-building, copy, and follow-up,
          built as one machine instead of six disconnected tools.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Magnetic>
            <motion.a
              href="https://wa.me/447577305736"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-neutral-200"
            >
              Book a call <ArrowRight size={16} />
            </motion.a>
          </Magnetic>
          <motion.a
            href="#results"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-white transition-colors hover:border-white/30"
          >
            See results
          </motion.a>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 mx-auto mt-16 max-w-4xl rounded-2xl border border-white/10 bg-[#0B0C0E]/70 px-4 py-3 backdrop-blur-md"
      >
        <Marquee
          items={TOOLS}
          keyFor={(t, i) => `${t.name}-${i}`}
          renderItem={(t) => (
            <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[color:var(--color-text-secondary)]">
              {t.logo.kind === "img" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.logo.src} alt="" className="h-6 w-6 flex-shrink-0 rounded-md object-contain" />
              )}
              {t.logo.kind === "svg" && (
                <span
                  className={`grid h-6 w-6 flex-shrink-0 place-items-center rounded-md ${t.logo.fg}`}
                  style={{ background: t.logo.tint }}
                >
                  <t.logo.Comp className="h-3.5 w-3.5" />
                </span>
              )}
              {t.logo.kind === "mono" && <Mono label={t.logo.label} tint={t.logo.tint} fg={t.logo.fg} />}
              {t.name}
            </span>
          )}
        />
      </motion.div>

      {/* sleep-to-awake background: a warm "dawn" gradient sits underneath at all times;
          a dark starfield "night" layer fades out on top of it as the user scrolls
          through the hero, dramatizing the "runs while you sleep" tagline. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[-8%] -z-10 h-[62%] overflow-hidden">
        <div
          className="absolute -inset-x-[6%] inset-y-[-6%]"
          style={{
            backgroundImage: [
              "radial-gradient(circle at 50% 38%, #ffd9a0 0%, #f2a35c 6%, transparent 30%)",
              "linear-gradient(to bottom, #2b3f63 0%, #2b3f63 22%, #4a5a80 22%, #4a5a80 34%, #a9714f 34%, #a9714f 42%, #e0955a 42%, #e0955a 50%, #163044 50%, #163044 68%, #0f2233 68%, #0f2233 78%, #c9a15a 78%, #c9a15a 88%, #a9803f 88%, #a9803f 100%)",
            ].join(", "),
            filter: "blur(1.5px) saturate(1.15)",
          }}
        />
        <motion.div className="absolute -inset-x-[6%] inset-y-[-6%]" style={{ opacity: nightOpacity }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #05070c 0%, #0a1020 30%, #0d1526 55%, #0b0f1a 75%, #05070c 100%)",
            }}
          />
          {STARS.map((s, i) => (
            <span
              key={i}
              className="animate-twinkle absolute rounded-full bg-white"
              style={{
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </motion.div>
        <div
          className="absolute inset-0 opacity-50 mix-blend-multiply"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.16) 0 7px, transparent 7px 14px), repeating-linear-gradient(0deg, rgba(0,0,0,0.16) 0 7px, transparent 7px 14px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #0B0C0E 0%, transparent 22%, transparent 58%, #0B0C0E 100%)",
          }}
        />
      </div>

      <motion.div
        id="work"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto mt-16 max-w-2xl scroll-mt-24 px-4"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <WorkflowPreview />
          <motion.div
            aria-hidden="true"
            style={{ opacity: wakeDimOpacity }}
            className="pointer-events-none absolute inset-0 z-20 bg-[#05070c]"
          />
        </div>
      </motion.div>
    </section>
  );
}
