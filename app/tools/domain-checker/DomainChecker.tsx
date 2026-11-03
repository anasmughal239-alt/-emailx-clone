"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import type { DomainReport } from "@/lib/coldwatch";
import type { Severity } from "@/lib/coldwatch/checks/types";

const BOOK_LINK = "/#book";

const SEVERITY_STYLE: Record<Severity, { label: string; cls: string }> = {
  ok: { label: "OK", cls: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  info: { label: "Note", cls: "bg-sky-50 text-sky-800 border-sky-200" },
  warn: { label: "Warning", cls: "bg-amber-50 text-amber-900 border-amber-200" },
  crit: { label: "Broken", cls: "bg-red-50 text-red-800 border-red-200" },
  unknown: { label: "Unclear", cls: "bg-gray-100 text-gray-700 border-gray-200" },
};

const READINESS: Record<DomainReport["readiness"], { label: string; cls: string; line: string }> = {
  ready: {
    label: "Ready to send",
    cls: "text-emerald-700",
    line: "The basics are in place. Warm-up, volume and copy decide the rest.",
  },
  "at-risk": {
    label: "Needs attention",
    cls: "text-amber-700",
    line: "Mail will authenticate, but there are gaps that cost you inbox placement.",
  },
  "not-ready": {
    label: "Not ready",
    cls: "text-red-700",
    line: "Something here will send your mail to spam or get it rejected. Fix it before you send.",
  },
  unverified: {
    label: "Couldn't fully check",
    cls: "text-gray-700",
    line: "Some DNS lookups failed, so there's no score. Try again in a minute.",
  },
};

const CHECK_NAME: Record<string, string> = {
  spf: "SPF",
  dkim: "DKIM",
  dmarc: "DMARC",
  mx: "MX",
  blacklist: "Blacklists",
};

export function DomainChecker() {
  const [domain, setDomain] = useState("");
  const [selector, setSelector] = useState("");
  const [showSelector, setShowSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<DomainReport | null>(null);

  async function run(d: string, s: string) {
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const qs = new URLSearchParams({ domain: d });
      if (s) qs.set("selector", s);
      const res = await fetch(`/api/check?${qs}`);
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Something went wrong.");
      setReport(body as DomainReport);
      const url = new URL(window.location.href);
      url.searchParams.set("domain", body.domain);
      window.history.replaceState(null, "", url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // Shareable links: /tools/domain-checker?domain=acme.com runs immediately.
  useEffect(() => {
    const d = new URLSearchParams(window.location.search).get("domain");
    if (d) {
      setDomain(d);
      run(d, "");
    }
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!domain.trim() || loading) return;
    run(domain, selector.trim());
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-line/10 bg-surface p-3 shadow-sm"
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="domain" className="sr-only">
            Sending domain
          </label>
          <input
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="yourdomain.com"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            inputMode="url"
            className="min-w-0 flex-1 rounded-xl bg-inset px-4 py-3 text-base outline-none ring-fg/20 focus:ring-2"
          />
          <button
            type="submit"
            disabled={loading || !domain.trim()}
            className="flex items-center justify-center gap-2 rounded-xl bg-fg px-6 py-3 font-medium text-bg transition-colors hover:bg-fg/85 disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? "Checking…" : "Check domain"}
          </button>
        </div>
        {showSelector ? (
          <div className="mt-2">
            <label htmlFor="selector" className="sr-only">
              DKIM selector
            </label>
            <input
              id="selector"
              value={selector}
              onChange={(e) => setSelector(e.target.value)}
              placeholder="DKIM selector, e.g. google or s1"
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-xl bg-inset px-4 py-2.5 text-sm outline-none ring-fg/20 focus:ring-2"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowSelector(true)}
            className="mt-2 px-1 text-xs text-[color:var(--color-text-micro)] underline underline-offset-2 hover:text-fg"
          >
            Know your DKIM selector? Add it
          </button>
        )}
      </form>

      <div aria-live="polite">
        {error && (
          <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        )}
        {report && <Report report={report} />}
      </div>
    </div>
  );
}

/** Render `backtick` spans from finding text as inline code. */
function Text({ children }: { children: string }) {
  const parts = children.split(/`([^`]+)`/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="rounded bg-inset px-1 py-0.5 font-mono text-[0.85em]">
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Report({ report }: { report: DomainReport }) {
  const r = READINESS[report.readiness];
  const unverified = report.readiness === "unverified";
  const needsHelp = report.readiness !== "ready";
  const flagged = report.checks
    .filter((c) => c.status === "warn" || c.status === "unknown" || c.status === "crit")
    .map((c) => CHECK_NAME[c.check] ?? c.check);

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col gap-4 rounded-2xl border border-line/10 bg-surface p-6 sm:flex-row sm:items-center">
        <div className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-2xl bg-inset font-[family-name:var(--font-display)] text-5xl">
          {unverified ? "?" : report.grade}
        </div>
        <div className="min-w-0">
          <p className="break-words text-sm text-[color:var(--color-text-micro)]">{report.domain}</p>
          <p className={`text-xl font-semibold ${r.cls}`}>
            {r.label}
            {!unverified && (
              <span className="ml-2 text-base font-normal text-[color:var(--color-text-micro)]">
                {report.score}/100
              </span>
            )}
          </p>
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
            {report.readiness === "at-risk" && flagged.length > 0
              ? `Mail will authenticate. ${flagged.length === 1 ? "One thing" : `${flagged.length} things`} to look at: ${flagged.join(", ")}.`
              : r.line}
          </p>
        </div>
      </div>

      {report.checks.map((check) => {
        const s = SEVERITY_STYLE[check.status];
        return (
          <div key={check.check} className="rounded-2xl border border-line/10 bg-surface p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold">{CHECK_NAME[check.check] ?? check.check}</h3>
              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.cls}`}>
                {s.label}
              </span>
            </div>
            <ul className="mt-3 space-y-3">
              {check.findings.map((f, i) => (
                <li key={`${f.code}-${i}`} className="text-sm">
                  <p className="font-medium"><Text>{f.title}</Text></p>
                  {f.detail && (
                    <p className="mt-0.5 break-words text-[color:var(--color-text-secondary)]">
                      <Text>{f.detail}</Text>
                    </p>
                  )}
                  {f.fix && f.severity !== "ok" && (
                    <p className="mt-1 break-words text-[color:var(--color-text-micro)]">
                      <span className="font-medium text-fg">Fix: </span>
                      <Text>{f.fix}</Text>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {!unverified && <EmailReport report={report} />}

      <div className="rounded-2xl bg-fg p-6 text-bg sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div>
          <p className="text-lg font-semibold">
            {needsHelp ? "Want this fixed before your next campaign?" : "Records look good. Now for the rest."}
          </p>
          <p className="mt-1 text-sm text-bg/75">
            {needsHelp
              ? "I set up and monitor sending infrastructure for B2B outbound. A 30-minute call is enough to sort it out."
              : "Authentication is the floor. I build the whole outbound system on top: domains, warm-up, lists, copy."}
          </p>
        </div>
        <a
          href={BOOK_LINK}
          className="mt-4 inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-bg px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-bg/90 sm:mt-0"
        >
          Book a call <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}

/** Strip the raw DNS data (SPF IP lists etc.) so the stored report stays small. */
function summarize(report: DomainReport) {
  return {
    domain: report.domain,
    checkedAt: report.checkedAt,
    grade: report.grade,
    score: report.score,
    readiness: report.readiness,
    checks: report.checks.map((c) => ({ check: c.check, status: c.status, findings: c.findings })),
  };
}

function EmailReport({ report }: { report: DomainReport }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, domain: report.domain, company, report: summarize(report) }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? "Something went wrong.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
        <p className="font-semibold">Got it.</p>
        <p className="mt-1">
          I&apos;ll send the report for {report.domain} and a short fix plan to {email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line/10 bg-surface p-5">
      <p className="font-semibold">Get this report and a fix plan by email</p>
      <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
        I&apos;ll review {report.domain} myself and send what to change, in order. No newsletter.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="lead-email" className="sr-only">
          Work email
        </label>
        <input
          id="lead-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          className="min-w-0 flex-1 rounded-xl bg-inset px-4 py-3 text-base outline-none ring-fg/20 focus:ring-2"
        />
        {/* Honeypot for bots; hidden from people and screen readers. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          name="company"
          className="hidden"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="flex items-center justify-center gap-2 rounded-xl bg-fg px-5 py-3 font-medium text-bg transition-colors hover:bg-fg/85 disabled:opacity-50"
        >
          {state === "sending" ? <Loader2 size={18} className="animate-spin" /> : null}
          Email me the report
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </form>
  );
}
