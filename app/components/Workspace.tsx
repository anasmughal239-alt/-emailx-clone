"use client";

import { motion } from "framer-motion";
import { Workflow } from "lucide-react";
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
  PLUSVIBES_SRC,
  EMAILBISON_SRC,
  BOUNCEBAN_SRC,
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
      { name: "Apify", desc: "Custom scraping", logo: { kind: "mono", label: "Ap", tint: "rgba(0,54,104,0.18)", fg: "text-[#5ea0ff]" } },
      { name: "Ocean.io", desc: "Lookalike accounts", logo: { kind: "mono", label: "O", tint: "rgba(37,150,190,0.18)", fg: "text-[#5fc4e6]" } },
      { name: "ZoomInfo", desc: "Account data", logo: { kind: "img", src: ZOOMINFO_SRC } },
      { name: "Prospeo", desc: "Email finding", logo: { kind: "img", src: PROSPEO_SRC } },
      { name: "PlusVibes", desc: "Inbox placement", logo: { kind: "img", src: PLUSVIBES_SRC } },
      { name: "AI Ark", desc: "ICP lists and signals", logo: { kind: "mono", label: "AI", tint: "rgba(124,58,237,0.18)", fg: "text-violet-300" } },
    ],
  },
  {
    title: "Sending and deliverability",
    tools: [
      { name: "Email Bison", desc: "Sending at volume", logo: { kind: "img", src: EMAILBISON_SRC } },
      { name: "Instantly", desc: "Campaign sending", logo: { kind: "img", src: INSTANTLY_SRC } },
      { name: "Smartlead", desc: "Campaign sending", logo: { kind: "img", src: SMARTLEAD_SRC } },
      { name: "BounceBan", desc: "Verification", logo: { kind: "img", src: BOUNCEBAN_SRC } },
      { name: "NeverBounce", desc: "Verification", logo: { kind: "mono", label: "NB", tint: "rgba(16,185,129,0.18)", fg: "text-emerald-300" } },
      { name: "Google Workspace", desc: "Inboxes and warmup", logo: { kind: "mono", label: "G", tint: "rgba(66,133,244,0.18)", fg: "text-[#8ab4f8]" } },
      { name: "Namecheap", desc: "Sending domains", logo: { kind: "svg", Comp: NamecheapMark, tint: "rgba(222,55,35,0.18)", fg: "text-[#de3723]" } },
    ],
  },
  {
    title: "Automation and routing",
    tools: [
      { name: "Claude", desc: "Copy, classification, scoring", logo: { kind: "svg", Comp: ClaudeMark, tint: "rgba(217,119,87,0.18)", fg: "text-[#d97757]" } },
      { name: "n8n", desc: "Reply routing", logo: { kind: "svg", Comp: N8nMark, tint: "rgba(234,75,113,0.18)", fg: "text-[#ea4b71]" } },
      { name: "Make", desc: "Workflow automation", logo: { kind: "img", src: MAKE_SRC } },
      { name: "Slack", desc: "Interested-reply alerts", logo: { kind: "mono", label: "S", tint: "rgba(224,30,90,0.18)", fg: "text-[#ff6fa5]" } },
      { name: "HubSpot", desc: "CRM sync", logo: { kind: "svg", Comp: HubspotMark, tint: "rgba(255,122,89,0.18)", fg: "text-[#ff7a59]" } },
      { name: "Calendly", desc: "Demo booking", logo: { kind: "svg", Comp: CalendlyMark, tint: "rgba(0,107,255,0.18)", fg: "text-[#4d9bff]" } },
      { name: "HeyReach", desc: "LinkedIn outreach", logo: { kind: "mono", label: "HR", tint: "rgba(99,102,241,0.18)", fg: "text-indigo-300" } },
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
      className="spotlight flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#141518] px-3.5 py-3 transition-colors hover:border-white/15"
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
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#141518] px-3.5 py-1.5 text-xs text-[color:var(--color-text-secondary)]">
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
              className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
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
