"use client";

import { motion } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  TrendingUp,
  Workflow,
  RefreshCw,
  Radio,
  Target,
  Search,
  ShieldCheck,
  Send,
  CalendarCheck,
} from "lucide-react";
import {
  CLAY_SRC,
  ZOOMINFO_SRC,
  PROSPEO_SRC,
  BOUNCEBAN_SRC,
  SLACK_SRC,
  GROK_SRC,
  HEYREACH_SRC,
  NEVERBOUNCE_SRC,
  INSTANTLY_SRC,
  SMARTLEAD_SRC,
  PLUSVIBES_SRC,
  N8nMark,
  HubspotMark,
  ClaudeMark,
  CALENDLY_SRC,
  type ToolLogo,
} from "./ui/ToolLogos";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

type Tool = { name: string; logo: ToolLogo };

const TOOL: Record<string, Tool> = {
  clay: { name: "Clay", logo: { kind: "img", src: CLAY_SRC } },
  zoominfo: { name: "ZoomInfo", logo: { kind: "img", src: ZOOMINFO_SRC } },
  prospeo: { name: "Prospeo", logo: { kind: "img", src: PROSPEO_SRC } },
  bounceban: { name: "BounceBan", logo: { kind: "img", src: BOUNCEBAN_SRC } },
  instantly: { name: "Instantly", logo: { kind: "img", src: INSTANTLY_SRC } },
  smartlead: { name: "Smartlead", logo: { kind: "img", src: SMARTLEAD_SRC } },
  plusvibes: { name: "PlusVibes", logo: { kind: "img", src: PLUSVIBES_SRC } },
  claude: {
    name: "Claude",
    logo: { kind: "svg", Comp: ClaudeMark, tint: "rgba(217,119,87,0.18)", fg: "text-[#d97757]" },
  },
  neverbounce: {
    name: "NeverBounce",
    logo: { kind: "img", src: NEVERBOUNCE_SRC },
  },
  grok: { name: "Grok Bot", logo: { kind: "img", src: GROK_SRC } },
  heyreach: {
    name: "HeyReach",
    logo: { kind: "img", src: HEYREACH_SRC },
  },
  n8n: {
    name: "n8n",
    logo: { kind: "svg", Comp: N8nMark, tint: "rgba(234,75,113,0.18)", fg: "text-[#ea4b71]" },
  },
  slack: {
    name: "Slack",
    logo: { kind: "img", src: SLACK_SRC },
  },
  hubspot: {
    name: "HubSpot",
    logo: { kind: "svg", Comp: HubspotMark, tint: "rgba(255,122,89,0.18)", fg: "text-[#ff7a59]" },
  },
  calendly: {
    name: "Calendly",
    logo: { kind: "img", src: CALENDLY_SRC },
  },
};

const STEPS: {
  title: string;
  example: string;
  icon: React.ComponentType<{ size?: number }>;
  tint: string;
  fg: string;
  tools: Tool[];
}[] = [
  {
    title: "Signal",
    example: "Relate raised a €4.2M seed round.",
    icon: Radio,
    tint: "rgba(245,158,11,0.16)",
    fg: "text-amber-700",
    tools: [TOOL.clay, TOOL.zoominfo, TOOL.prospeo],
  },
  {
    title: "Qualify",
    example: "B2B SaaS · Europe · 46 employees → 92% fit.",
    icon: Target,
    tint: "rgba(16,185,129,0.16)",
    fg: "text-emerald-700",
    tools: [TOOL.claude],
  },
  {
    title: "Research",
    example: "Website, LinkedIn, newsletters and call transcripts become one brief.",
    icon: Search,
    tint: "rgba(59,130,246,0.14)",
    fg: "text-blue-600",
    tools: [TOOL.clay, TOOL.claude],
  },
  {
    title: "Write & verify",
    example: "A draft in your voice, email verified, guardrails passed.",
    icon: ShieldCheck,
    tint: "rgba(124,58,237,0.14)",
    fg: "text-violet-600",
    tools: [TOOL.claude, TOOL.bounceban, TOOL.neverbounce],
  },
  {
    title: "Send",
    example: "Email and LinkedIn run as one paced sequence.",
    icon: Send,
    tint: "rgba(236,72,153,0.14)",
    fg: "text-pink-600",
    tools: [TOOL.instantly, TOOL.smartlead, TOOL.plusvibes, TOOL.heyreach],
  },
  {
    title: "Reply & book",
    example: "“Sounds good, book a call?” is routed to you and booked.",
    icon: CalendarCheck,
    tint: "rgba(16,185,129,0.16)",
    fg: "text-emerald-700",
    tools: [TOOL.grok, TOOL.n8n, TOOL.slack, TOOL.hubspot, TOOL.calendly],
  },
];

function MiniLogo({ tool }: { tool: Tool }) {
  const { logo } = tool;
  if (logo.kind === "img") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo.src} alt="" className="h-5 w-5 flex-shrink-0 rounded-md object-contain" />;
  }
  if (logo.kind === "svg") {
    return (
      <span
        className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-md ${logo.fg}`}
        style={{ background: logo.tint }}
      >
        <logo.Comp className="h-3 w-3" />
      </span>
    );
  }
  return (
    <span
      className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-md text-[8px] font-extrabold ${logo.fg}`}
      style={{ background: logo.tint }}
    >
      {logo.label}
    </span>
  );
}

function handleSpotlightMove(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export function Outcomes() {
  return (
    <section id="results" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-24">
      <motion.div {...fadeUp} className="mb-4 flex justify-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-surface px-3.5 py-1.5 text-xs text-[color:var(--color-text-secondary)]">
          <TrendingUp size={12} /> The approach
        </div>
      </motion.div>
      <motion.h2
        {...fadeUp}
        className="mb-3 text-center font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight sm:text-4xl"
      >
        Why signal-based outreach works
      </motion.h2>
      <motion.p
        {...fadeUp}
        className="mb-12 text-center text-sm text-[color:var(--color-text-micro)]"
      >
        Same offer, sent two ways.
      </motion.p>

      <motion.div
        {...fadeUp}
        whileHover={{ y: -3 }}
        onMouseMove={handleSpotlightMove}
        className="spotlight mt-6 rounded-3xl border border-line/[0.08] bg-surface p-6 transition-colors hover:border-line/15"
      >
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="text-xl font-semibold text-[color:var(--color-accent-green)] sm:text-2xl">
            Same offer, two approaches
          </span>
          <span className="text-sm text-[color:var(--color-text-secondary)]">
            The difference is starting from a real signal
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-micro)]">
              Generic cold template
            </div>
            <div className="flex flex-col gap-3">
              <div className="max-w-[90%] rounded-2xl rounded-bl-sm bg-surface-2 px-4 py-2.5 text-sm text-[color:var(--color-text-secondary)]">
                Hi there, I wanted to reach out because our platform helps
                companies like yours scale outbound...
              </div>
              <div className="ml-auto flex max-w-[75%] items-center gap-2 rounded-2xl rounded-br-sm bg-rose-500/10 px-4 py-2.5 text-sm text-rose-600">
                <XCircle size={14} /> Not interested
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-accent-green)]">
              Personalized, signal-based
            </div>
            <div className="flex flex-col gap-3">
              <div className="max-w-[90%] rounded-2xl rounded-bl-sm bg-surface-2 px-4 py-2.5 text-sm text-[color:var(--color-text-secondary)]">
                Saw Relate closed a seed round this week — congrats. Curious
                how you&apos;re planning to scale outbound with the new
                team...
              </div>
              <div className="ml-auto flex max-w-[75%] items-center gap-2 rounded-2xl rounded-br-sm bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-700">
                <CheckCircle2 size={14} /> Sounds good, book a call?
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        {...fadeUp}
        onMouseMove={handleSpotlightMove}
        className="spotlight mt-6 rounded-3xl border border-line/[0.08] bg-surface p-6 transition-colors hover:border-line/15"
      >
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Workflow size={15} className="text-[color:var(--color-text-secondary)]" />
            How one prospect becomes a booked call
          </div>
          <span className="rounded-full border border-line/10 bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-[color:var(--color-text-secondary)]">
            Example prospect, traced
          </span>
        </div>
        <p className="mb-7 text-sm text-[color:var(--color-text-secondary)]">
          The same example as above, followed through the stack that runs it.
        </p>

        <ol className="grid grid-cols-1 gap-x-4 lg:grid-cols-6">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="relative flex gap-4 pb-8 last:pb-0 lg:flex-col lg:gap-3 lg:pb-0"
              >
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[17px] top-11 w-px bg-line/15 lg:bottom-auto lg:left-12 lg:right-[-1rem] lg:top-[17px] lg:h-px lg:w-auto"
                  />
                )}
                <span
                  className={`relative z-10 grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl ${s.fg}`}
                  style={{ background: s.tint }}
                >
                  <Icon size={17} />
                  {i === STEPS.length - 1 && (
                    <span className="animate-ping-slow absolute inset-0 rounded-xl bg-emerald-500/20" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold text-[color:var(--color-text-micro)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-sm font-semibold">{s.title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-[color:var(--color-text-secondary)]">
                    {s.example}
                  </p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {s.tools.map((t) => (
                      <li
                        key={t.name}
                        className="flex items-center gap-2 text-xs font-medium text-[color:var(--color-text-secondary)]"
                      >
                        <MiniLogo tool={t} />
                        {t.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </ol>

        <div className="mt-7 flex items-center gap-3">
          <span className="h-px flex-1 border-t border-dashed border-line/20" />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-surface px-3 py-1 text-[11px] text-[color:var(--color-text-secondary)]">
            <RefreshCw size={11} /> Every reply sharpens the next round of signals
          </span>
          <span className="h-px flex-1 border-t border-dashed border-line/20" />
        </div>
      </motion.div>
    </section>
  );
}
