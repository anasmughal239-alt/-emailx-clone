"use client";

import { motion } from "framer-motion";
import {
  Radio,
  DollarSign,
  Target,
  Mail,
  Linkedin,
  Zap,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Cloud,
  Search,
  Database,
  Users,
} from "lucide-react";
import { HubspotMark } from "./ui/ToolLogos";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

/** Real Google Sheets mark (simple-icons, official hex #34A853/#0F9D58 family). */
function SheetsMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M11.318 12.545H7.91v-1.909h3.41v1.91zm0-3.273H7.91V7.364h3.41v1.909zm4.772 3.273h-3.41v-1.909h3.41v1.91zm0-3.273h-3.41V7.364h3.41v1.909zM14.727 0H4.91C3.856 0 3 .857 3 1.909v20.182C3 23.143 3.856 24 4.909 24h14.182c1.052 0 1.909-.857 1.909-1.909V7.09L14.727 0z" />
    </svg>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      {...fadeUp}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      className={`spotlight rounded-3xl border border-white/[0.08] bg-[#141518] p-6 transition-colors hover:border-white/15 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function CardHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-6">
      <div className="mb-1.5 font-semibold">{title}</div>
      <p className="text-sm text-[color:var(--color-text-secondary)]">{desc}</p>
    </div>
  );
}

function SignalChip({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#1A1C20] px-3 py-2">
      <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg bg-white/5 text-[color:var(--color-text-secondary)]">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="truncate text-xs font-semibold">{title}</div>
        <div className="truncate text-[10px] text-[color:var(--color-text-micro)]">{sub}</div>
      </div>
    </div>
  );
}

function Pill({
  icon,
  active = false,
  children,
}: {
  icon: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.span
      animate={active ? { scale: [1, 1.05, 1] } : undefined}
      transition={active ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : undefined}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
        active
          ? "border-[color:var(--color-accent-green)]/40 bg-[color:var(--color-accent-green)]/10 text-[color:var(--color-accent-green)]"
          : "border-white/[0.08] bg-[#1A1C20] text-[color:var(--color-text-secondary)]"
      }`}
    >
      {icon}
      {children}
    </motion.span>
  );
}

function ToolBadge({
  icon,
  label,
  tint,
  fg,
}: {
  icon: React.ReactNode;
  label: string;
  tint: string;
  fg: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#1A1C20] py-1 pl-1 pr-3 text-xs font-medium text-[color:var(--color-text-secondary)]">
      <span className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-full ${fg}`} style={{ background: tint }}>
        {icon}
      </span>
      {label}
    </div>
  );
}

const HUB_NODES = [
  { label: "Clay", tint: "rgba(90,200,232,0.18)", fg: "text-[#5ac8e8]", short: "Cl" },
  { label: "Apollo", tint: "rgba(255,236,0,0.18)", fg: "text-[#ffec00]", short: "Ap" },
  { label: "LinkedIn", tint: "rgba(10,102,194,0.18)", fg: "text-[#0a66c2]", short: "Li" },
  { label: "CSV", tint: "rgba(16,185,129,0.18)", fg: "text-emerald-300", short: "Cs" },
  { label: "CRM", tint: "rgba(124,58,237,0.18)", fg: "text-violet-300", short: "Cr" },
];

function ConnectHub() {
  const radius = 62;
  return (
    <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
      <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-white/[0.1]" />
      <span className="absolute inline-flex h-11 w-11 animate-ping-slow rounded-xl bg-amber-400/20" />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="z-10 grid h-11 w-11 place-items-center rounded-xl border border-amber-400/40 bg-[#0E0F12] text-amber-300"
      >
        <Zap size={18} />
      </motion.div>
      {HUB_NODES.map((n, i) => {
        const angle = (i / HUB_NODES.length) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <span
            key={n.label}
            className={`absolute grid h-9 w-9 animate-float place-items-center rounded-full text-[11px] font-bold ${n.fg}`}
            style={{
              background: n.tint,
              left: `calc(50% + ${x}px - 18px)`,
              top: `calc(50% + ${y}px - 18px)`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {n.short}
          </span>
        );
      })}
    </div>
  );
}

function FlowLink({ vertical = false }: { vertical?: boolean }) {
  return (
    <div className={`relative flex-shrink-0 ${vertical ? "h-6 w-px" : "h-px w-6"}`}>
      <motion.div
        initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
        whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: vertical ? "top" : "left" }}
        className={`absolute inset-0 overflow-hidden bg-white/[0.08]`}
      >
        <motion.span
          className={`absolute rounded-full bg-amber-300 ${vertical ? "left-1/2 h-1.5 w-1.5 -translate-x-1/2" : "top-1/2 h-1.5 w-1.5 -translate-y-1/2"}`}
          animate={vertical ? { top: ["-10%", "110%"] } : { left: ["-10%", "110%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: 0.6 }}
        />
      </motion.div>
    </div>
  );
}

const REPLIES = [
  { name: "Cody Fisher", time: "5h ago", snippet: "Sounds good, when can we talk?" },
  { name: "Marcus L.", time: "1d ago", snippet: "Worth a quick call this week." },
];

export function Automation() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <motion.div
        {...fadeUp}
        className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <h2 className="max-w-md font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight sm:text-4xl">
          Every angle of your outreach, in one place.
        </h2>
        <p className="max-w-sm text-sm text-[color:var(--color-text-secondary)] sm:text-right">
          Build a living go-to-market system: signal discovery, research,
          personalized copy, multichannel sequences and learning from every
          reply.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Outbound Autopilot */}
        <Card>
          <CardHeader
            title="Outbound Autopilot"
            desc="Build a flow once: it discovers, researches, and engages the right people on its own."
          />

          <div className="flex items-center gap-1">
            <div className="flex flex-1 flex-col gap-2">
              <SignalChip icon={<Radio size={13} />} title="New signal" sub="Website visit detected" />
              <SignalChip icon={<DollarSign size={13} />} title="Funding raised" sub="$4.2M seed round" />
              <SignalChip icon={<Target size={13} />} title="ICP match" sub="92% fit score" />
            </div>
            <FlowLink />
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-amber-400/40 bg-[#0E0F12] text-amber-300"
            >
              <Zap size={17} />
            </motion.div>
            <FlowLink />
            <div className="flex flex-1 flex-col gap-2">
              <SignalChip icon={<Mail size={13} />} title="Email" sub="Personalized draft" />
              <SignalChip icon={<Linkedin size={13} />} title="LinkedIn" sub="Connection sent" />
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/[0.08] bg-[#101012] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-[color:var(--color-text-micro)]">
                Dashboard
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-[color:var(--color-text-secondary)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--color-accent-green)]" />
                48 prospects moving now
              </span>
            </div>
            <div className="flex flex-col divide-y divide-white/[0.06] text-xs">
              {[
                ["Prospect found", "12"],
                ["Message sent", "36"],
                ["Reply received", "7"],
              ].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between py-2 text-[color:var(--color-text-secondary)]">
                  <span>{label}</span>
                  <span className="font-semibold text-white">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Guardrail Engine */}
        <Card>
          <CardHeader
            title="Guardrail Engine"
            desc="Every message checked against your brand, your data, and your voice before it sends."
          />

          <div className="mb-4 flex flex-wrap gap-2">
            <Pill icon={<Sparkles size={12} />}>Brand & Voice</Pill>
            <Pill icon={<CheckCircle2 size={12} />}>Message Ratings</Pill>
            <Pill icon={<ShieldCheck size={12} />} active>
              Source Verification
            </Pill>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#101012] p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[color:var(--color-accent-green)]">
              <ShieldCheck size={13} /> Source Verification
            </div>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-[color:var(--color-text-micro)]">
              Fact Checking
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-[#141518] px-3.5 py-2.5 text-xs text-[color:var(--color-text-secondary)]">
              Automatically check every claim against real research.
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <ToolBadge icon={<Cloud size={11} />} label="Salesforce" tint="rgba(0,161,224,0.18)" fg="text-[#3fc0f0]" />
            <ToolBadge icon={<HubspotMark className="h-3 w-3" />} label="HubSpot" tint="rgba(255,122,89,0.18)" fg="text-[#ff7a59]" />
            <ToolBadge icon={<SheetsMark className="h-3 w-3" />} label="Sheets" tint="rgba(52,168,83,0.18)" fg="text-[#34a853]" />
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {/* Connect anywhere */}
        <Card>
          <CardHeader title="Connect anywhere" desc="Bring Clay, Apollo, LinkedIn, CSVs, and your CRM into one flow." />
          <ConnectHub />
        </Card>

        {/* Analytics & Insights */}
        <Card>
          <CardHeader
            title="Analytics & Insights"
            desc="See which audiences, messages, and channels earn replies, and spot underperformance before it costs pipeline."
          />
          <div className="relative rounded-xl border border-white/[0.08] bg-[#101012] p-4">
            <div className="flex flex-col gap-2">
              {[
                { label: "Recently funded", stat: "8.4%" },
                { label: "Founder-led", stat: "5.1%" },
                { label: "New segment suggested", stat: "+" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#141518] px-3 py-2 text-[11px] text-[color:var(--color-text-secondary)]"
                >
                  <span className="flex items-center gap-1.5">
                    <Database size={11} /> {row.label}
                  </span>
                  <span className="font-semibold text-white">{row.stat}</span>
                </div>
              ))}
            </div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -bottom-3 -right-3 grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] bg-[#1A1C20] text-[color:var(--color-text-secondary)] shadow-lg"
            >
              <Search size={16} />
            </motion.div>
          </div>
        </Card>

        {/* One inbox */}
        <Card>
          <CardHeader title="One inbox" desc="Every email and LinkedIn reply lands in one place, ready for you to take over." />
          <div className="flex flex-col gap-2.5">
            {REPLIES.map((r) => (
              <div
                key={r.name}
                className="flex items-start gap-2.5 rounded-xl border border-white/[0.08] bg-[#1A1C20] p-3"
              >
                <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-white/10 text-xs font-semibold">
                  {r.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-semibold">{r.name}</span>
                    <span className="flex-shrink-0 text-[10px] text-[color:var(--color-text-micro)]">{r.time}</span>
                  </div>
                  <p className="truncate text-[11px] text-[color:var(--color-text-secondary)]">{r.snippet}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-xl border border-dashed border-white/[0.1] p-3 text-[11px] text-[color:var(--color-text-micro)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-accent-green)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent-green)]" />
              </span>
              <Users size={13} /> More replies waiting
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
