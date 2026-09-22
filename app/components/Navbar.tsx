"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";

const NAV_LINKS = [
  { label: "Work", href: "#work-list" },
  { label: "What I do", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

const CALL_LINK = "https://wa.me/447577305736";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="flex w-full max-w-5xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#121316]/80 px-5 py-2.5 backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-2.5 font-semibold">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-sm font-bold text-black">
            A
          </span>
          <span>Anas Ashfaq Mughal</span>
        </a>

        <div className="hidden items-center gap-7 text-sm font-medium text-[color:var(--color-text-secondary)] md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-white">
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
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
            >
              Book a call
            </motion.a>
          </Magnetic>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/5 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="absolute inset-x-4 top-[72px] rounded-2xl border border-white/10 bg-[#121316]/95 p-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[color:var(--color-text-secondary)] hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-3 border-t border-white/10 pt-3">
            <a
              href={CALL_LINK}
              className="block rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-black"
            >
              Book a call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
