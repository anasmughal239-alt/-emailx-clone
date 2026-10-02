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
  CALENDLY_SRC,
  NAMECHEAP_SRC,
  SMARTLEAD_SRC,
  INSTANTLY_SRC,
  PROSPEO_SRC,
  CLAY_SRC,
  ZOOMINFO_SRC,
  APOLLO_SRC,
  MAKE_SRC,
  PLUSVIBES_SRC,
  BOUNCEBAN_SRC,
  NEVERBOUNCE_SRC,
  GMAIL_SRC,
  OUTLOOK_SRC,
  SLACK_SRC,
  HEYREACH_SRC,
  GROK_SRC,
  OCEAN_SRC,
  AIARK_SRC,
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
  { name: "Calendly", logo: { kind: "img", src: CALENDLY_SRC } },
  { name: "Prospeo", logo: { kind: "img", src: PROSPEO_SRC } },
  { name: "ZoomInfo", logo: { kind: "img", src: ZOOMINFO_SRC } },
  { name: "Claude", logo: { kind: "svg", Comp: ClaudeMark, tint: "rgba(217,119,87,0.18)", fg: "text-[#d97757]" } },
  { name: "Make", logo: { kind: "img", src: MAKE_SRC } },
  { name: "Namecheap", logo: { kind: "img", src: NAMECHEAP_SRC } },
  { name: "PlusVibes", logo: { kind: "img", src: PLUSVIBES_SRC } },
  { name: "BounceBan", logo: { kind: "img", src: BOUNCEBAN_SRC } },
  { name: "NeverBounce", logo: { kind: "img", src: NEVERBOUNCE_SRC } },
  { name: "Google Workspace", logo: { kind: "img", src: GMAIL_SRC } },
  { name: "Outlook", logo: { kind: "img", src: OUTLOOK_SRC } },
  { name: "HeyReach", logo: { kind: "img", src: HEYREACH_SRC } },
  { name: "Slack", logo: { kind: "img", src: SLACK_SRC } },
  { name: "Grok Bot", logo: { kind: "img", src: GROK_SRC } },
  { name: "Ocean.io", logo: { kind: "img", src: OCEAN_SRC } },
  { name: "AI Ark", logo: { kind: "img", src: AIARK_SRC } },
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
  const sleepColor = useTransform(scrollYProgress, [0, 0.3], ["#6a6f7c", "#15171c"]);
  const wakeDimOpacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 0]);

  return (
    <section id="top" ref={heroRef} className="relative overflow-hidden pb-20 pt-40 sm:pt-48">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative isolate mb-7 inline-flex items-center gap-2 rounded-full bg-surface-2 px-4 py-2 text-xs text-[color:var(--color-text-secondary)]"
        >
          <span className="animate-shimmer pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-amber-300/60 via-fuchsia-300/60 to-sky-300/60 p-px [mask-composite:exclude] [mask-image:linear-gradient(#000_0_0),linear-gradient(#000_0_0)] [-webkit-mask-composite:xor]" />
          <span className="relative inline-grid h-[13px] w-[13px] flex-shrink-0 place-items-center">
            <motion.span style={{ opacity: moonOpacity }} className="absolute inset-0 grid place-items-center">
              <Moon size={13} />
            </motion.span>
            <motion.span style={{ opacity: zapOpacity }} className="absolute inset-0 grid place-items-center text-amber-700">
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
              href="#book"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full bg-fg px-6 py-3 font-medium text-bg transition-colors hover:bg-fg/85"
            >
              Book a call <ArrowRight size={16} />
            </motion.a>
          </Magnetic>
          <motion.a
            href="#results"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-full border border-line/15 px-6 py-3 font-medium text-fg transition-colors hover:border-line/30"
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
        className="relative z-10 mx-auto mt-16 max-w-4xl rounded-2xl border border-line/10 bg-bg/70 px-4 py-3 backdrop-blur-md"
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
              "radial-gradient(ellipse 46% 52% at 50% 46%, rgba(255,196,120,0.95) 0%, rgba(247,163,92,0.55) 38%, transparent 72%)",
              "linear-gradient(to bottom, #ffffff 0%, #fde9d2 38%, #f9d3b0 66%, #ffffff 100%)",
            ].join(", "),
            filter: "saturate(1.1)",
          }}
        />
        <motion.div className="absolute -inset-x-[6%] inset-y-[-6%]" style={{ opacity: nightOpacity }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #ffffff 0%, #cfd4ec 32%, #b9bfe0 58%, #d9d6ea 80%, #ffffff 100%)",
            }}
          />
          {STARS.map((s, i) => (
            <span
              key={i}
              className="animate-twinkle absolute rounded-full bg-fg"
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
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(120,80,40,0.08) 0 7px, transparent 7px 14px), repeating-linear-gradient(0deg, rgba(120,80,40,0.08) 0 7px, transparent 7px 14px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #ffffff 0%, transparent 22%, transparent 58%, #ffffff 100%)",
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
            className="pointer-events-none absolute inset-0 z-20 bg-bg"
          />
        </div>
      </motion.div>
    </section>
  );
}
