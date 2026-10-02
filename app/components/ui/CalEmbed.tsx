"use client";

import { useEffect, useRef } from "react";

const CAL_LINK = "anas-ashfaq-mughal/30min";
const NS = "30min";

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  q?: unknown[];
  ns?: Record<string, ((...args: unknown[]) => void) | undefined>;
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

/** Loads Cal.com's embed script and mounts the inline booking calendar once it nears the viewport. */
export function CalEmbed() {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = holder.current;
    if (!node) return;

    const mount = () => {
      // Cal's official loader snippet.
      (function (C: Window, A: string, L: string) {
        const p = (a: { q?: unknown[] }, ar: unknown) => {
          (a.q = a.q || []).push(ar);
        };
        const d = C.document;
        C.Cal =
          C.Cal ||
          (function (this: unknown, ...ar: unknown[]) {
            const cal = C.Cal as CalFn;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = ((...a: unknown[]) => p(api as { q?: unknown[] }, a)) as CalFn;
              const namespace = ar[1];
              api.q = api.q || [];
              if (typeof namespace === "string") {
                cal.ns![namespace] = cal.ns![namespace] || api;
                p(cal.ns![namespace] as { q?: unknown[] }, ar);
                p(cal, ["initNamespace", namespace]);
              } else p(cal, ar);
              return;
            }
            p(cal, ar);
          } as CalFn);
      })(window, "https://app.cal.com/embed/embed.js", "init");

      const Cal = window.Cal as CalFn;
      Cal("init", NS, { origin: "https://app.cal.com" });
      const ns = Cal.ns![NS]!;
      ns("inline", {
        elementOrSelector: node,
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light" },
        calLink: CAL_LINK,
      });
      ns("ui", { hideEventTypeDetails: false, layout: "month_view", theme: "light" });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          mount();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return <div ref={holder} className="min-h-[560px] w-full" />;
}
