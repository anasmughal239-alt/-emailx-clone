import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const DOMAIN_RE = /^[a-z0-9.-]{3,253}$/;

const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.company === "string" && body.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const domain = String(body.domain ?? "").trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }
  if (!DOMAIN_RE.test(domain)) {
    return NextResponse.json({ error: "Run a check first." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  const report = body.report && typeof body.report === "object" ? body.report : null;
  const r = report as { grade?: unknown; score?: unknown; readiness?: unknown } | null;

  try {
    await saveLead({
      email,
      domain,
      grade: typeof r?.grade === "string" ? r.grade : null,
      score: typeof r?.score === "number" ? r.score : null,
      readiness: typeof r?.readiness === "string" ? r.readiness : null,
      report,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Couldn't save that. Try again, or book a call below." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
