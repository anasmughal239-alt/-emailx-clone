"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  User,
  Sparkles,
  Send,
  CheckCircle2,
  Clock,
  Briefcase,
  DollarSign,
  Linkedin,
  Globe,
  Newspaper,
  Phone,
  Target,
  Zap,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { GlowRing } from "./ui/GlowRing";
import { MacWindow } from "./ui/MacWindow";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const rowContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const rowItem = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const checkPop = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "backOut" as const } },
};

const SIDEBAR_ITEMS = [
  { icon: Eye, title: "Capture warm signals", desc: "Job changes, funding, and social activity — reach out when there's a real reason to." },
  { icon: User, title: "Qualify for ICP fit", desc: "Every lead scored against your ICP automatically before it reaches a sequence." },
  { icon: Sparkles, title: "Research and write in your voice", desc: "Four live sources synthesized into one draft that sounds like you." },
  { icon: Send, title: "Send safely and book meetings", desc: "Email and LinkedIn run as one sequence, paced to protect deliverability." },
];

function FeatureHeader({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-white">
        {icon}
      </span>
      <h3 className="text-xl font-semibold">{children}</h3>
    </div>
  );
}

function SignalRow({
  icon,
  bg,
  title,
  sub,
  tag,
}: {
  icon: React.ReactNode;
  bg: string;
  title: string;
  sub: string;
  tag: string;
}) {
  return (
    <motion.div
      variants={rowItem}
      whileHover={{ x: 3 }}
      className="flex items-center gap-3 rounded-xl border border-white/[0.06] px-3.5 py-3 transition-colors hover:border-white/15"
    >
      <span
        className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg"
        style={{ background: bg }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-[color:var(--color-text-micro)]">{sub}</div>
      </div>
      <span className="flex-shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium text-[color:var(--color-text-secondary)]">
        {tag}
      </span>
    </motion.div>
  );
}

export function Features() {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function handleScroll() {
      const line = window.innerHeight * 0.45;
      let closestIdx = 0;
      let closestDistance = -Infinity;
      sectionRefs.current.forEach((el, idx) => {
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= line && top > closestDistance) {
          closestDistance = top;
          closestIdx = idx;
        }
      });
      setActive(closestIdx);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section id="services" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-24">
      <motion.div {...fadeUp} className="mb-14 text-center">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#141518] px-3.5 py-1.5 text-xs text-[color:var(--color-text-secondary)]">
          <Sparkles size={12} /> What I do
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight sm:text-4xl">
          Outbound, run as one system
        </h2>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        {/* Sidebar — the four stages of the system, scroll-spy synced to the section in view */}
        <motion.div {...fadeUp} className="flex flex-col gap-1 lg:sticky lg:top-24 lg:self-start">
          {SIDEBAR_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`flex gap-3 border-l-2 py-3 pl-4 transition-colors duration-300 ${i === active ? "border-[color:var(--color-accent-green)]" : "border-white/[0.08]"}`}
            >
              <item.icon
                size={16}
                className={`mt-0.5 flex-shrink-0 transition-colors duration-300 ${i === active ? "text-[color:var(--color-accent-green)]" : "text-[color:var(--color-text-micro)]"}`}
              />
              <div>
                <div className={`text-sm font-semibold transition-colors duration-300 ${i === active ? "text-white" : "text-[color:var(--color-text-secondary)]"}`}>
                  {item.title}
                </div>
                {i === active && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="mt-1 overflow-hidden text-xs text-[color:var(--color-text-micro)]"
                  >
                    {item.desc}
                  </motion.p>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Stacked mockups — one full-width card per stage */}
        <div className="flex flex-col gap-8">
          {/* 1 — Capture warm signals */}
          <motion.div ref={(el) => { sectionRefs.current[0] = el; }} {...fadeUp}>
            <GlowRing variant="iridescent">
              <MacWindow label="Watching 12 sources">
                <div className="flex flex-col gap-2.5">
                  <div className="rounded-xl border border-white/[0.06] px-3.5 py-3">
                    <div className="text-[10px] uppercase tracking-wide text-[color:var(--color-text-micro)]">
                      Signal intelligence
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm font-semibold">
                      <Sparkles size={13} className="text-white/70" />
                      Find the reason to reach out.
                    </div>
                  </div>
                  <motion.div
                    variants={rowContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    className="flex flex-col gap-2.5"
                  >
                    <SignalRow
                      icon={<Linkedin size={15} className="text-blue-300" />}
                      bg="rgba(91,147,255,0.12)"
                      title="LinkedIn post engagement"
                      sub="Commented on your founder-led sales post"
                      tag="High intent"
                    />
                    <SignalRow
                      icon={<Briefcase size={15} className="text-blue-300" />}
                      bg="rgba(91,147,255,0.12)"
                      title="New role detected"
                      sub="Maya Chen became VP Sales at Relate"
                      tag="Verified"
                    />
                    <SignalRow
                      icon={<Target size={15} className="text-emerald-300" />}
                      bg="rgba(16,185,129,0.12)"
                      title="ICP match confirmed"
                      sub="B2B SaaS · Europe · 46 employees"
                      tag="92% fit"
                    />
                    <SignalRow
                      icon={<DollarSign size={15} className="text-amber-300" />}
                      bg="rgba(222,164,76,0.12)"
                      title="Funding announced"
                      sub="Relate raised a €4.2M seed round"
                      tag="New"
                    />
                  </motion.div>
                </div>
              </MacWindow>
            </GlowRing>
          </motion.div>

          {/* 2 — Qualify for ICP fit */}
          <motion.div ref={(el) => { sectionRefs.current[1] = el; }} {...fadeUp} className="relative isolate">
            <div
              aria-hidden="true"
              className="absolute -inset-[8%] -z-10 rounded-3xl bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#FFE0D3] opacity-60 blur-2xl"
            />
            <div className="rounded-2xl bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#FFE0D3] p-[2px]">
              <div className="flex flex-col gap-3 rounded-[calc(1rem-2px)] bg-[#0E0F12] p-4">
                <div className="rounded-xl border border-white/[0.08] bg-[#141518] px-4 py-3.5">
                  <div className="text-[10px] uppercase tracking-wide text-[color:var(--color-text-micro)]">
                    Prospect profile
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-white/10 text-xs font-semibold text-white/70">
                      LB
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">Luca Bianchi</span>
                        <CheckCircle2 size={14} className="text-[color:var(--color-accent-green)]" />
                      </div>
                      <div className="text-xs text-[color:var(--color-text-micro)]">
                        Founder at Studio North · Turin, Italy
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#101012]">
                  <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#E2685A]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#E3BD5C]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#6FCB9F]" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-micro)]">
                        Lead Qualification
                      </span>
                    </div>
                    <span className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[10px] uppercase tracking-wide text-[color:var(--color-text-micro)]">
                      Analyzing fit…
                    </span>
                  </div>
                  <motion.div
                    variants={rowContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    className="flex flex-col divide-y divide-white/[0.06] px-4"
                  >
                    {[
                      { n: "01", label: "Business model", state: "ok" as const },
                      { n: "02", label: "Company size", state: "pending" as const },
                      { n: "03", label: "Target market", state: "waiting" as const },
                      { n: "04", label: "Buying signal", state: "waiting" as const },
                    ].map((row) => (
                      <motion.div
                        key={row.label}
                        variants={rowItem}
                        className={`flex items-center gap-3 py-3 ${row.state === "waiting" ? "opacity-40" : ""}`}
                      >
                        <span className="w-5 text-xs text-[color:var(--color-text-micro)]">{row.n}</span>
                        <span className="flex-1 text-sm font-medium">{row.label}</span>
                        <motion.span variants={checkPop}>
                          {row.state === "ok" && (
                            <CheckCircle2 size={16} className="text-[color:var(--color-accent-green)]" />
                          )}
                          {row.state === "pending" && (
                            <Clock size={16} className="animate-spin text-blue-300" />
                          )}
                          {row.state === "waiting" && (
                            <span className="block h-4 w-4 rounded-full border border-white/15" />
                          )}
                        </motion.span>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div className="flex items-center gap-3 border-t border-white/[0.06] bg-[#141518] px-4 py-3">
                    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg border border-[color:var(--color-accent-green)]/40 bg-[color:var(--color-accent-green)]/10">
                      <Sparkles size={13} className="text-[color:var(--color-accent-green)]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-wide text-[color:var(--color-text-micro)]">
                        AI recommendation
                      </div>
                      <div className="truncate text-sm font-medium">
                        Building recommendation from verified data
                      </div>
                    </div>
                    <span className="flex-shrink-0 text-sm font-semibold text-[color:var(--color-accent-green)]">
                      2/4
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3 — Research and write in your voice */}
          <motion.div ref={(el) => { sectionRefs.current[2] = el; }} {...fadeUp} className="relative isolate">
            <div
              aria-hidden="true"
              className="absolute -inset-[8%] -z-10 rounded-3xl bg-gradient-to-br from-[#8FD3F4] via-[#A5C4F3] to-[#CBE6FF] opacity-50 blur-2xl"
            />
            <div className="rounded-2xl bg-gradient-to-br from-[#8FD3F4] via-[#A5C4F3] to-[#CBE6FF] p-[2px]">
              <div className="flex flex-col gap-3 rounded-[calc(1rem-2px)] bg-[#0E0F12] p-4">
                <div className="relative grid grid-cols-2 gap-3 py-2">
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full text-white/10"
                  >
                    <line x1="25%" y1="18%" x2="50%" y2="50%" stroke="currentColor" strokeDasharray="3 4" />
                    <line x1="75%" y1="18%" x2="50%" y2="50%" stroke="currentColor" strokeDasharray="3 4" />
                    <line x1="25%" y1="82%" x2="50%" y2="50%" stroke="currentColor" strokeDasharray="3 4" />
                    <line x1="75%" y1="82%" x2="50%" y2="50%" stroke="currentColor" strokeDasharray="3 4" />
                  </svg>
                  <span className="absolute left-1/2 top-1/2 z-10 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-amber-400/40 bg-[#0E0F12] text-amber-300">
                    <Zap size={15} />
                  </span>
                  {[
                    { icon: Globe, label: "Company website" },
                    { icon: Linkedin, label: "LinkedIn" },
                    { icon: Newspaper, label: "Newsletters" },
                    { icon: Phone, label: "Call transcripts" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="relative z-10 flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#141518] px-2.5 py-2 text-xs text-[color:var(--color-text-secondary)]"
                    >
                      <s.icon size={13} />
                      {s.label}
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#141518] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold">Written in your voice</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
                    Hey Luca — saw <span className="text-white">Studio North closed a project with a Bay Area client</span>{" "}
                    this month. I help founders run outbound without hiring an SDR —{" "}
                    <span className="text-white">worth a 15-minute look?</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["Personalization", "Relevance", "Timing", "Tone check"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-[color:var(--color-text-micro)]"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto rounded-full bg-[color:var(--color-accent-green)]/10 px-2.5 py-1 text-[10px] font-semibold text-[color:var(--color-accent-green)]">
                      Ready to review
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4 — Send safely and book meetings */}
          <motion.div ref={(el) => { sectionRefs.current[3] = el; }} {...fadeUp} className="relative isolate">
            <div
              aria-hidden="true"
              className="absolute -inset-[8%] -z-10 rounded-3xl bg-gradient-to-br from-[#E8C15A] via-[#E0A052] to-[#C98A3A] opacity-50 blur-2xl"
            />
            <div className="rounded-2xl bg-gradient-to-br from-[#E8C15A] via-[#E0A052] to-[#C98A3A] p-[2px]">
              <MacWindow
                className="rounded-[calc(1rem-2px)]"
                label={
                  <span className="flex items-center gap-1.5 text-[color:var(--color-accent-green)]">
                    <ShieldCheck size={12} /> Sending safely
                  </span>
                }
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Personal email", status: "Sent", icon: Mail },
                      { label: "LinkedIn connection", status: "Pending", icon: Linkedin },
                      { label: "LinkedIn follow-up", status: "Pending", icon: Linkedin },
                      { label: "Second email", status: "Queued", icon: Mail },
                    ].map((step) => (
                      <div
                        key={step.label}
                        className="flex items-center justify-between rounded-lg border border-white/[0.06] px-3 py-2 text-xs"
                      >
                        <span className="flex items-center gap-2 text-[color:var(--color-text-secondary)]">
                          <step.icon size={12} /> {step.label}
                        </span>
                        <span className="text-[10px] text-[color:var(--color-text-micro)]">{step.status}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="ml-auto max-w-[90%] rounded-xl rounded-br-sm bg-[color:var(--color-accent-green)]/10 px-3 py-2 text-xs text-emerald-200">
                      Worth a short look?
                    </div>
                    <div className="max-w-[90%] rounded-xl rounded-bl-sm bg-[#1A1C20] px-3 py-2 text-xs text-[color:var(--color-text-secondary)]">
                      Thanks for connecting — happy to send the one-pager.
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs">
                  <span className="text-[color:var(--color-text-micro)]">Follow-up paced across channels</span>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold">
                    Response coming
                  </span>
                </div>
              </MacWindow>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
