// Vendored from https://github.com/anasmughal239-alt/coldwatch (MIT). Keep in sync with src/ there.
/**
 * coldwatch — deliverability infrastructure health checks for cold-email
 * sending domains.
 *
 * Public library surface. The CLI in ./cli.ts is a thin wrapper over
 * `checkDomain`.
 */

import { DohResolver, type Resolver } from "./dns/resolver";
import { evaluateSpf } from "./checks/spf";
import { evaluateDmarc } from "./checks/dmarc";
import { evaluateDkim } from "./checks/dkim";
import { evaluateMx } from "./checks/mx";
import type { CheckResult } from "./checks/types";
import { scoreReport, type Readiness } from "./score";

export type { Resolver, RecordType, DnsOutcome } from "./dns/resolver";
export { DohResolver } from "./dns/resolver";
export type {
  CheckResult,
  Finding,
  Severity,
  CheckType,
} from "./checks/types";
export { result, rollup } from "./checks/types";
export { scoreReport } from "./score";
export type { ScoredReport, Readiness } from "./score";

export interface CheckDomainOptions {
  /** Inject a resolver (tests, custom endpoints). Defaults to DoH. */
  resolver?: Resolver;
  /** Known DKIM selectors to probe first. */
  dkimSelectors?: string[];
  /** Cap on DKIM selector lookups (tighten for constrained runtimes). */
  maxDkimProbes?: number;
}

export interface DomainReport {
  domain: string;
  checkedAt: string;
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  readiness: Readiness;
  checks: CheckResult[];
}

export async function checkDomain(
  domain: string,
  opts: CheckDomainOptions = {},
): Promise<DomainReport> {
  const resolver = opts.resolver ?? new DohResolver();

  // MX first: it yields the provider fingerprint that DKIM selector guessing
  // depends on.
  const mx = await evaluateMx(domain, resolver);

  const [spf, dmarc, dkim] = await Promise.all([
    evaluateSpf(domain, resolver),
    evaluateDmarc(domain, resolver),
    evaluateDkim(domain, resolver, {
      selectors: opts.dkimSelectors ?? [],
      provider: mx.provider,
      ...(opts.maxDkimProbes !== undefined
        ? { maxProbes: opts.maxDkimProbes }
        : {}),
    }),
  ]);

  const checks: CheckResult[] = [spf, dkim, dmarc, mx];
  const { score, grade, readiness } = scoreReport(checks);

  return {
    domain: normalizeDomain(domain),
    checkedAt: new Date().toISOString(),
    score,
    grade,
    readiness,
    checks,
  };
}

function normalizeDomain(domain: string): string {
  return domain
    .trim()
    .toLowerCase()
    .replace(/\.$/, "")
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");
}
