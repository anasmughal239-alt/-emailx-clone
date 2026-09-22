"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Layers, Headset, MailCheck, GraduationCap, ShoppingBag, Receipt } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const PROJECTS = [
  {
    name: "SupportSyndicate",
    role: "Founder",
    desc: "AI support-agent platform — ticketing, reporting dashboards, and QA workflows. Agents triage and resolve tickets before a human sees them.",
    stat: "80% reduction in ticket volume",
    tech: "Next.js · Supabase",
    href: "https://supportsyndicate.com",
    icon: Headset,
    tint: "rgba(124,58,237,0.18)",
    fg: "text-violet-300",
  },
  {
    name: "Bounso",
    role: "Co-founder",
    desc: "Email verification platform for reducing bounce rates and protecting sender reputation at scale.",
    stat: null,
    tech: "TypeScript · React · Vercel",
    href: null,
    icon: MailCheck,
    tint: "rgba(16,185,129,0.18)",
    fg: "text-emerald-300",
  },
  {
    name: "TutorDash",
    role: "Built end to end",
    desc: "Multi-role tutoring platform connecting tutors and students, with grade tracking and automated invite flows.",
    stat: null,
    tech: "Next.js · Supabase · RLS",
    href: "https://tutorsdash.vercel.app",
    icon: GraduationCap,
    tint: "rgba(59,130,246,0.18)",
    fg: "text-blue-300",
  },
  {
    name: "Dastak",
    role: "Built end to end",
    desc: "Pakistani fashion ecommerce storefront with Meta Pixel integration and custom checkout for made-to-order pieces.",
    stat: null,
    tech: "React · Vercel · Meta Pixel",
    href: "https://dastak-tau.vercel.app",
    icon: ShoppingBag,
    tint: "rgba(236,72,153,0.18)",
    fg: "text-pink-300",
  },
  {
    name: "AccuratePayStubs",
    role: "Built end to end",
    desc: "Paystub generation platform serving US-based independent contractors and small businesses.",
    stat: null,
    tech: "TypeScript · React · Vercel",
    href: "https://accurate-pay-stubs.vercel.app",
    icon: Receipt,
    tint: "rgba(6,182,212,0.18)",
    fg: "text-cyan-300",
  },
];

const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "Row-level security",
  "Vercel",
  "Meta Pixel",
];

const tagContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const tagItem = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
};

function ProjectRow({ p }: { p: (typeof PROJECTS)[number] }) {
  const ref = useRef<HTMLDivElement | HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  const Wrapper = p.href ? motion.a : motion.div;
  const Icon = p.icon;

  return (
    <motion.div key={p.name} {...fadeUp} style={{ perspective: 800 }}>
      <Wrapper
        ref={ref as React.Ref<never>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        {...(p.href ? { href: p.href, target: "_blank", rel: "noreferrer" } : {})}
        className="spotlight group flex flex-col gap-3 p-6 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex gap-3.5">
          <span
            className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl ${p.fg}`}
            style={{ background: p.tint }}
          >
            <Icon size={20} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{p.name}</span>
              <span className="text-xs text-[color:var(--color-text-micro)]">
                · {p.role}
              </span>
              {p.href && (
                <ArrowUpRight
                  size={14}
                  className="text-[color:var(--color-text-micro)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              )}
            </div>
            <p className="mt-1 max-w-xl text-sm text-[color:var(--color-text-secondary)]">
              {p.desc}
            </p>
          </div>
        </div>
        <div className="flex flex-shrink-0 flex-col items-start gap-1 pl-[3.4rem] sm:items-end sm:pl-0">
          {p.stat && (
            <span className="text-sm font-semibold text-[color:var(--color-accent-green)]">
              {p.stat}
            </span>
          )}
          <span className="text-xs text-[color:var(--color-text-micro)]">{p.tech}</span>
        </div>
      </Wrapper>
    </motion.div>
  );
}

export function Work() {
  return (
    <section id="work-list" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-24">
      <motion.div {...fadeUp} className="mb-4 flex justify-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#141518] px-3.5 py-1.5 text-xs text-[color:var(--color-text-secondary)]">
          <Layers size={12} /> Work
        </div>
      </motion.div>
      <motion.div {...fadeUp} className="mb-14 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight sm:text-4xl">
          Shipped, live, end to end
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[color:var(--color-text-secondary)]">
          I don&apos;t just run outbound — I build the product it sells for.
          Five platforms, all in production.
        </p>
      </motion.div>

      <div className="flex flex-col divide-y divide-white/[0.06] rounded-3xl border border-white/[0.08] bg-[#141518]">
        {PROJECTS.map((p) => (
          <ProjectRow key={p.name} p={p} />
        ))}
      </div>

      <motion.div
        variants={tagContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-2"
      >
        {TECH_STACK.map((tech) => (
          <motion.span
            key={tech}
            variants={tagItem}
            className="rounded-full border border-white/[0.08] bg-[#141518] px-3.5 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)]"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
