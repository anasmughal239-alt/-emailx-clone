// Leads from the domain checker go to the "site-leads" Supabase project.
// The publishable key is safe to ship: the table has no grants, and the only
// thing it can do is call submit_checker_lead (a validated upsert, no reads).
const SUPABASE_URL = process.env.LEADS_SUPABASE_URL ?? "https://xbcxlenzooakpwsywyon.supabase.co";
const SUPABASE_KEY =
  process.env.LEADS_SUPABASE_KEY ?? "sb_publishable_SpLLaNeD89pT3Z8LLgkDPA_Uj6TfLUx";

export interface LeadInput {
  email: string;
  domain: string;
  grade: string | null;
  score: number | null;
  readiness: string | null;
  report: unknown;
}

export async function saveLead(lead: LeadInput): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/submit_checker_lead`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      p_email: lead.email,
      p_domain: lead.domain,
      p_grade: lead.grade,
      p_score: lead.score,
      p_readiness: lead.readiness,
      p_report: lead.report ?? null,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`lead insert failed: ${res.status} ${await res.text()}`);
}
