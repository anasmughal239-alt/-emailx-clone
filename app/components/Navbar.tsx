"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";

const NAV_LINKS = [
  { label: "Work", href: "#work-list" },
  { label: "What I do", href: "#services" },
  { label: "Approach", href: "#results" },
  { label: "Contact", href: "#contact" },
];

const CALL_LINK = "#book";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="flex w-full max-w-5xl items-center justify-between gap-4 rounded-2xl border border-line/10 bg-surface px-5 py-2.5 shadow-sm">
        <a href="#top" className="flex items-center gap-2.5 font-semibold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" width={30} height={30} className="h-[30px] w-[30px]" />
          <span>Anas Ashfaq Mughal</span>
        </a>

        <div className="hidden items-center gap-7 text-sm font-medium text-[color:var(--color-text-secondary)] md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-fg">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Magnetic strength={10}>
            <motion.a
              href={CALL_LINK}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-fg/85"
            >
              Book a call
            </motion.a>
          </Magnetic>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full bg-line/5 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="absolute inset-x-4 top-[72px] rounded-2xl border border-line/10 bg-surface/95 p-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[color:var(--color-text-secondary)] hover:bg-line/5 hover:text-fg"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-3 border-t border-line/10 pt-3">
            <a
              href={CALL_LINK}
              className="block rounded-full bg-fg px-4 py-2.5 text-center text-sm font-semibold text-bg"
            >
              Book a call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
