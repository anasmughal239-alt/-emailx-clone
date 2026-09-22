"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, TrendingUp } from "lucide-react";
import { CountUp } from "./ui/CountUp";
import { Magnetic } from "./ui/Magnetic";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const FAQ_TABS = ["General", "Channels & Deliverability", "Security & Support"] as const;

const FAQS: Record<(typeof FAQ_TABS)[number], { q: string; a: string }[]> = {
  General: [
    {
      q: "What does an engagement actually include?",
      a: "Infrastructure setup, list building against your ICP, sequence copy, and weekly reporting — you set direction, I run the outbound.",
    },
    {
      q: "Do I need an existing sales team?",
      a: "No. I work with solo founders running their entire outbound motion, and with teams who want one channel handled end to end.",
    },
  ],
  "Channels & Deliverability": [
    {
      q: "How do you protect sender reputation?",
      a: "Sends are distributed across warmed mailboxes and monitored continuously, with volume throttled automatically if a domain's health drops.",
    },
    {
      q: "Can email and LinkedIn run in one sequence?",
      a: "Yes — steps interleave across both channels, and a reply on either one cancels every remaining step for that prospect.",
    },
  ],
  "Security & Support": [
    {
      q: "Who has access to prospect data?",
      a: "Lists and account data stay scoped to your workspace and tools — nothing is shared across client accounts.",
    },
    {
      q: "What does support look like during an engagement?",
      a: "Direct access over email or WhatsApp with same-day response, plus a weekly performance review call.",
    },
  ],
};

function FAQAccordion() {
  const [openKey, setOpenKey] = useState<string | null>("General-1");

  return (
    <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
      <div className="flex gap-2 overflow-x-auto lg:sticky lg:top-24 lg:flex-col lg:self-start lg:overflow-visible">
        {FAQ_TABS.map((t) => (
          <a
            key={t}
            href={`#faq-${t.replace(/\s+/g, "-").toLowerCase()}`}
            className="whitespace-nowrap text-sm text-[color:var(--color-text-secondary)] transition-colors hover:text-white lg:whitespace-normal lg:py-1"
          >
            {t}
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-10">
        {FAQ_TABS.map((tab) => (
          <div key={tab} id={`faq-${tab.replace(/\s+/g, "-").toLowerCase()}`} className="scroll-mt-24">
            <h3 className="mb-4 text-sm font-semibold">{tab}</h3>
            <div className="flex flex-col gap-2">
              {FAQS[tab].map((item, i) => {
                const key = `${tab}-${i}`;
                const isOpen = openKey === key;
                return (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-white/[0.08] bg-[#141518]"
                  >
                    <button
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold"
                    >
                      {item.q}
                      <ChevronDown
                        size={16}
                        className={`flex-shrink-0 text-[color:var(--color-text-micro)] transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-4 text-sm text-[color:var(--color-text-secondary)]">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FOOTER_COLUMNS = [
  {
    title: "Site",
    links: [
      { label: "Work", href: "#work-list" },
      { label: "What I do", href: "#services" },
      { label: "Results", href: "#results" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Email", href: "mailto:anasmughal239@gmail.com" },
      { label: "WhatsApp", href: "https://wa.me/447577305736" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/anas-ashfaq-4151a8201/" },
    ],
  },
];

export function Footer() {
  return (
    <footer>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <motion.div
          {...fadeUp}
          className="rounded-3xl border border-white/[0.08] bg-[#141518] p-8 sm:p-10"
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-micro)]">
            <TrendingUp size={13} /> Case study
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal">
            How a Shopify review-scraping pipeline fed 2,484 leads into one
            campaign
          </h3>
          <div className="mt-4 flex items-center gap-2">
            <CountUp
              to={2484}
              className="text-3xl font-semibold text-[color:var(--color-accent-green)]"
            />
            <span className="text-sm text-[color:var(--color-text-secondary)]">
              deduplicated leads generated
            </span>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <motion.div
          {...fadeUp}
          className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight">
            FAQs
          </h2>
          <p className="max-w-xs text-sm text-[color:var(--color-text-secondary)] sm:text-right">
            Everything you need to know. Can&apos;t find what you&apos;re
            looking for?{" "}
            <a href="#contact" className="text-white underline underline-offset-2">
              Talk to me
            </a>
            .
          </p>
        </motion.div>
        <motion.div {...fadeUp}>
          <FAQAccordion />
        </motion.div>
      </section>

      <section id="contact" className="scroll-mt-24">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden px-6 py-20 text-center sm:py-28"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: [
                "linear-gradient(to bottom, rgba(11,12,14,0.15) 0%, rgba(11,12,14,0.55) 55%, #0B0C0E 100%)",
                "linear-gradient(to bottom, #16305A 0%, #2E5C4E 30%, #3F7A4E 46%, #7DAA4A 58%, #C8A24A 72%, #8A6A38 100%)",
              ].join(", "),
              imageRendering: "pixelated",
              filter: "saturate(1.1)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0 9px, transparent 9px 18px), repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0 9px, transparent 9px 18px)",
              mixBlendMode: "multiply",
            }}
          />

          <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight text-white sm:text-4xl">
            Let&apos;s get your pipeline moving.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
              href="#work-list"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-white/20 bg-black/20 px-6 py-3 font-medium text-white backdrop-blur transition-colors hover:bg-black/30"
            >
              See the work
            </motion.a>
          </div>
        </motion.div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-sm font-bold text-black">
                A
              </span>
              Anas Ashfaq Mughal
            </div>
            <p className="mt-2 text-sm text-[color:var(--color-text-micro)]">
              GTM Engineer &amp; Builder · Karachi, remote worldwide
            </p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="mb-3 text-sm font-semibold">{col.title}</div>
              <div className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-[color:var(--color-text-secondary)] hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-white/[0.08] pt-6 text-sm text-[color:var(--color-text-micro)]">
          © 2026 Anas Ashfaq Mughal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
