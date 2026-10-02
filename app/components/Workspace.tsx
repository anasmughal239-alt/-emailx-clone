"use client";

import { motion } from "framer-motion";
import { Workflow } from "lucide-react";
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
  PLUSVIBE_SRC,
  BOUNCEBAN_SRC,
  SLACK_SRC,
  AIARK_SRC,
  OCEAN_SRC,
  GROK_SRC,
  OUTLOOK_SRC,
  HEYREACH_SRC,
  GMAIL_SRC,
  NEVERBOUNCE_SRC,
  Mono,
  type ToolLogo,
} from "./ui/ToolLogos";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const tileContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const tileItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

interface Tool {
  name: string;
  desc: string;
  logo: ToolLogo;
}

const STACK_CATEGORIES: { title: string; tools: Tool[] }[] = [
  {
    title: "Data and enrichment",
    tools: [
      { name: "Clay", desc: "Enrichment waterfalls", logo: { kind: "img", src: CLAY_SRC } },
      { name: "Apollo", desc: "Contact data", logo: { kind: "img", src: APOLLO_SRC } },
      { name: "Ocean.io", desc: "Lookalike accounts", logo: { kind: "img", src: OCEAN_SRC } },
      { name: "ZoomInfo", desc: "Account data", logo: { kind: "img", src: ZOOMINFO_SRC } },
      { name: "Prospeo", desc: "Email finding", logo: { kind: "img", src: PROSPEO_SRC } },
      { name: "AI Ark", desc: "ICP lists and signals", logo: { kind: "img", src: AIARK_SRC } },
    ],
  },
  {
    title: "Sending and deliverability",
    tools: [
      { name: "PlusVibe", desc: "Sending at volume", logo: { kind: "img", src: PLUSVIBE_SRC } },
      { name: "Instantly", desc: "Campaign sending", logo: { kind: "img", src: INSTANTLY_SRC } },
      { name: "Smartlead", desc: "Campaign sending", logo: { kind: "img", src: SMARTLEAD_SRC } },
      { name: "BounceBan", desc: "Verification", logo: { kind: "img", src: BOUNCEBAN_SRC } },
      { name: "NeverBounce", desc: "Verification", logo: { kind: "img", src: NEVERBOUNCE_SRC } },
      { name: "Google Workspace", desc: "Inboxes and warmup", logo: { kind: "img", src: GMAIL_SRC } },
      { name: "Namecheap", desc: "Sending domains", logo: { kind: "img", src: NAMECHEAP_SRC } },
      { name: "Outlook", desc: "Microsoft 365 inboxes", logo: { kind: "img", src: OUTLOOK_SRC } },
    ],
  },
  {
    title: "Automation and routing",
    tools: [
      { name: "Claude", desc: "Copy, classification, scoring", logo: { kind: "svg", Comp: ClaudeMark, tint: "rgba(217,119,87,0.18)", fg: "text-[#d97757]" } },
      { name: "Grok Bot", desc: "Reply handling", logo: { kind: "img", src: GROK_SRC } },
      { name: "n8n", desc: "Reply routing", logo: { kind: "svg", Comp: N8nMark, tint: "rgba(234,75,113,0.18)", fg: "text-[#ea4b71]" } },
      { name: "Make", desc: "Workflow automation", logo: { kind: "img", src: MAKE_SRC } },
      { name: "Slack", desc: "Interested-reply alerts", logo: { kind: "img", src: SLACK_SRC } },
      { name: "HubSpot", desc: "CRM sync", logo: { kind: "svg", Comp: HubspotMark, tint: "rgba(255,122,89,0.18)", fg: "text-[#ff7a59]" } },
      { name: "Calendly", desc: "Demo booking", logo: { kind: "img", src: CALENDLY_SRC } },
      { name: "HeyReach", desc: "LinkedIn outreach", logo: { kind: "img", src: HEYREACH_SRC } },
    ],
  },
];

function ToolCard({ tool }: { tool: Tool }) {
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      variants={tileItem}
      whileHover={{ y: -2 }}
      onMouseMove={handleMouseMove}
      className="spotlight flex items-center gap-3 rounded-xl border border-line/[0.08] bg-surface px-3.5 py-3 transition-colors hover:border-line/15"
    >
      {tool.logo.kind === "img" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={tool.logo.src} alt="" className="h-8 w-8 flex-shrink-0 rounded-lg object-contain" />
      )}
      {tool.logo.kind === "svg" && (
        <span
          className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg ${tool.logo.fg}`}
          style={{ background: tool.logo.tint }}
        >
          <tool.logo.Comp className="h-4 w-4" />
        </span>
      )}
      {tool.logo.kind === "mono" && <Mono label={tool.logo.label} tint={tool.logo.tint} fg={tool.logo.fg} />}
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold">{tool.name}</div>
        <div className="truncate text-xs text-[color:var(--color-text-micro)]">{tool.desc}</div>
      </div>
    </motion.div>
  );
}

export function Workspace() {
  return (
    <section id="stack" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-24">
      <motion.div {...fadeUp} className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-surface px-3.5 py-1.5 text-xs text-[color:var(--color-text-secondary)]">
          <Workflow size={12} /> The stack
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight sm:text-4xl">
          What the system is built out of
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[color:var(--color-text-secondary)]">
          Not a tool list for its own sake. Each of these does one job in the
          machine, and I&apos;m not tied to any of them — swap the tool, the
          system still works.
        </p>
      </motion.div>

      <div className="flex flex-col gap-10">
        {STACK_CATEGORIES.map((cat) => (
          <div key={cat.title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-text-micro)]">
              {cat.title}
            </h3>
            <motion.div
              variants={tileContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {cat.tools.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
