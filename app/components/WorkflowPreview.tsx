"use client";

import { motion } from "framer-motion";
import { Sparkles, Mail, Linkedin } from "lucide-react";
import { MacWindow, LivePreviewLabel } from "./ui/MacWindow";

const rowContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const rowItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

const PEOPLE = [
  { name: "Luca Bianchi", tag: "Italy Leads · Merged", role: "Founder, Studio North" },
  { name: "Maya Chen", tag: "Warm signal · VP Sales", role: "VP Sales, Relate" },
  { name: "Priya Nair", tag: "ICP match · SaaS", role: "Head of Growth, Northstar" },
  { name: "Tom Reyes", tag: "Replied · LinkedIn", role: "Founder, Formata" },
];

export function WorkflowPreview() {
  return (
    <MacWindow label={<LivePreviewLabel text="Live product preview" />}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <motion.div
          variants={rowContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex-1 rounded-xl border border-white/[0.08] bg-[#1A1C20] p-3"
        >
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wide text-[color:var(--color-text-micro)]">
            <span>Pages / People</span>
          </div>
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {PEOPLE.map((p, i) => (
              <motion.div
                key={p.name}
                variants={rowItem}
                className={`flex items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0 ${i === 0 ? "opacity-100" : "opacity-80"}`}
              >
                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold">{p.name}</div>
                  <div className="truncate text-[10px] text-[color:var(--color-text-micro)]">
                    {p.role}
                  </div>
                </div>
                <span className="flex-shrink-0 rounded-full bg-[color:var(--color-accent-green)]/10 px-2 py-0.5 text-[9px] font-semibold text-[color:var(--color-accent-green)]">
                  {p.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex-1 rounded-xl border border-white/[0.08] bg-[#1A1C20] p-3.5"
        >
          <div className="mb-3 flex items-center gap-2.5">
            <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-white/10 text-xs font-semibold">
              LB
            </span>
            <div className="min-w-0">
              <div className="truncate text-xs font-semibold">Luca Bianchi</div>
              <div className="truncate text-[10px] text-[color:var(--color-text-micro)]">
                Founder, Studio North
              </div>
            </div>
          </div>
          <div className="mb-3 flex gap-1.5">
            <span className="flex items-center gap-1 rounded-lg border border-white/[0.08] px-2 py-1 text-[10px] text-[color:var(--color-text-secondary)]">
              <Sparkles size={10} /> Enrich
            </span>
            <span className="flex items-center gap-1 rounded-lg border border-white/[0.08] px-2 py-1 text-[10px] text-[color:var(--color-text-secondary)]">
              <Mail size={10} /> Email
            </span>
            <span className="flex items-center gap-1 rounded-lg border border-white/[0.08] px-2 py-1 text-[10px] text-[color:var(--color-text-secondary)]">
              <Linkedin size={10} /> LinkedIn
            </span>
          </div>
          <div className="flex flex-col gap-1.5 border-t border-white/[0.06] pt-3 text-[11px]">
            {[
              ["Company", "Studio North"],
              ["Role", "Founder"],
              ["LinkedIn", "in/luca-bianchi"],
              ["Website", "studionorth.co"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3">
                <span className="text-[color:var(--color-text-micro)]">{k}</span>
                <span className="truncate text-[color:var(--color-text-secondary)]">{v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </MacWindow>
  );
}
