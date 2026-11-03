import { NextResponse } from "next/server";
import { parse } from "tldts";
import { checkDomain } from "@/lib/coldwatch";

export const runtime = "nodejs";
export const maxDuration = 30;

// Best-effort per-instance limit; stops one visitor from hammering the DoH
// resolvers. Not a security boundary.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function normalize(input: string): string | null {
  let d = input.trim().toLowerCase();
  d = d.replace(/^[a-z]+:\/\//, "").replace(/[/?#].*$/, "").replace(/\.$/, "");
  if (d.includes("@")) d = d.split("@").pop() ?? "";
  if (d.length === 0 || d.length > 253) return null;
  const p = parse(d);
  if (p.isIp || !p.domain || !p.isIcann) return null;
  if (!/^[a-z0-9.-]+$/.test(d)) return null;
  return d;
}

const SELECTOR_RE = /^[a-z0-9._-]{1,63}$/i;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const domain = normalize(url.searchParams.get("domain") ?? "");
  if (!domain) {
    return NextResponse.json(
      { error: "Enter a valid domain, like acme.com." },
      { status: 400 },
    );
  }

  const selector = url.searchParams.get("selector")?.trim();
  if (selector && !SELECTOR_RE.test(selector)) {
    return NextResponse.json({ error: "That DKIM selector doesn't look valid." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many checks in a minute. Wait a moment and try again." },
      { status: 429 },
    );
  }

  try {
    const report = await checkDomain(domain, {
      dkimSelectors: selector ? [selector] : [],
    });
    return NextResponse.json(report, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch {
    return NextResponse.json(
      { error: "The check failed to run. Try again in a moment." },
      { status: 502 },
    );
  }
}
