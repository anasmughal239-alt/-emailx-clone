"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { WorkflowPreview } from "./WorkflowPreview";
import { Marquee } from "./ui/Marquee";
import { Magnetic } from "./ui/Magnetic";
import { N8nMark, APOLLO_SRC, SMARTLEAD_SRC, INSTANTLY_SRC, Mono, type ToolLogo } from "./ui/ToolLogos";

const STACK_TICKER = [
  "Clay", "Apollo", "Instantly", "Smartlead", "n8n", "HubSpot",
  "Calendly", "Prospeo", "ZoomInfo", "Claude", "Make", "Namecheap",
];

const TOOLS: { name: string; logo: ToolLogo }[] = [
  { name: "Instantly", logo: { kind: "img", src: INSTANTLY_SRC } },
  { name: "Smartlead", logo: { kind: "img", src: SMARTLEAD_SRC } },
  { name: "Apollo", logo: { kind: "img", src: APOLLO_SRC } },
  { name: "Clay", logo: { kind: "mono", label: "Cl", tint: "rgba(90,200,232,0.18)", fg: "text-[#5ac8e8]" } },
  { name: "Apify", logo: { kind: "mono", label: "Ap", tint: "rgba(0,54,104,0.18)", fg: "text-[#5ea0ff]" } },
  { name: "n8n", logo: { kind: "svg", Comp: N8nMark, tint: "rgba(234,75,113,0.18)", fg: "text-[#ea4b71]" } },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-40 sm:pt-48">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative isolate mb-7 inline-flex items-center gap-2 rounded-full bg-[#141518] px-4 py-2 text-xs text-[color:var(--color-text-secondary)]"
        >
          <span className="animate-shimmer pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-amber-300/60 via-fuchsia-300/60 to-sky-300/60 p-px [mask-composite:exclude] [mask-image:linear-gradient(#000_0_0),linear-gradient(#000_0_0)] [-webkit-mask-composite:xor]" />
          <Sparkles size={13} />
          GTM Engineer &amp; Builder — Karachi
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="font-[family-name:var(--font-display)] text-[2.75rem] font-normal leading-[1.08] tracking-tight sm:text-6xl"
        >
          Pipeline that runs while you sleep.
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
        className="relative z-10 mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4"
      >
        {TOOLS.map((t) => (
          <span
            key={t.name}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[color:var(--color-text-secondary)] sm:text-base"
          >
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
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 mx-auto mt-8 max-w-4xl rounded-2xl border border-white/10 bg-[#0B0C0E]/70 px-4 py-3 backdrop-blur-md"
      >
        <Marquee items={STACK_TICKER} className="opacity-80" />
      </motion.div>

      {/* pixel-beach texture: sits behind the CTA-to-mockup gap, fading to black top and bottom, matching the reference hero */}
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
        <WorkflowPreview />
      </motion.div>
    </section>
  );
}
