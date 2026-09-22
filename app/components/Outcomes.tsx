"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2, Wrench } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const STACK_STEPS = [
  { label: "Apify", role: "Scraped Shopify App Store reviews for lead signal" },
  { label: "Clay", role: "Enriched and deduplicated the list" },
  { label: "Smartlead", role: "Ran the email sequence" },
  { label: "WhatsApp Business API", role: "Delivered the solar-installer campaign" },
];

export function Outcomes() {
  return (
    <section id="results" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-24">
      <motion.h2
        {...fadeUp}
        className="mb-3 text-center font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight sm:text-4xl"
      >
        Proof it works
      </motion.h2>
      <motion.p
        {...fadeUp}
        className="mb-12 text-center text-sm text-[color:var(--color-text-micro)]"
      >
        Real campaign results — not a hypothetical.
      </motion.p>

      <motion.div
        {...fadeUp}
        whileHover={{ y: -3 }}
        className="mt-6 rounded-3xl border border-white/[0.08] bg-[#141518] p-6 transition-colors hover:border-white/15"
      >
        <div className="mb-5 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-micro)]">
          The difference shows up in the reply
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-micro)]">
              Generic cold template
            </div>
            <div className="flex flex-col gap-3">
              <div className="max-w-[90%] rounded-2xl rounded-bl-sm bg-[#1A1C20] px-4 py-2.5 text-sm text-[color:var(--color-text-secondary)]">
                Hi there, I wanted to reach out because our platform helps
                companies like yours scale outbound...
              </div>
              <div className="ml-auto flex max-w-[75%] items-center gap-2 rounded-2xl rounded-br-sm bg-rose-500/10 px-4 py-2.5 text-sm text-rose-300">
                <XCircle size={14} /> Not interested
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-accent-green)]">
              Personalized, signal-based
            </div>
            <div className="flex flex-col gap-3">
              <div className="max-w-[90%] rounded-2xl rounded-bl-sm bg-[#1A1C20] px-4 py-2.5 text-sm text-[color:var(--color-text-secondary)]">
                Saw Relate closed a seed round this week — congrats. Curious
                how you&apos;re planning to scale outbound with the new
                team...
              </div>
              <div className="ml-auto flex max-w-[75%] items-center gap-2 rounded-2xl rounded-br-sm bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300">
                <CheckCircle2 size={14} /> Sounds good, book a call?
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        {...fadeUp}
        whileHover={{ y: -3 }}
        className="mt-6 rounded-3xl border border-white/[0.08] bg-[#141518] p-6 transition-colors hover:border-white/15"
      >
        <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-micro)]">
          <Wrench size={13} /> The stack behind the outreach
        </div>
        <div className="grid gap-3 sm:grid-cols-4">
          {STACK_STEPS.map((s, i) => (
            <div key={s.label} className="relative rounded-xl border border-white/[0.06] bg-[#1A1C20] p-3.5">
              <div className="mb-1 text-[10px] font-semibold text-[color:var(--color-text-micro)]">
                Step {i + 1}
              </div>
              <div className="text-sm font-semibold">{s.label}</div>
              <div className="mt-1 text-xs text-[color:var(--color-text-secondary)]">{s.role}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
