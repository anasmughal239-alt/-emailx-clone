import type { Metadata } from "next";
import { Navbar } from "../../components/Navbar";
import { DomainChecker } from "./DomainChecker";

const TITLE = "Free Cold Email Domain Checker — SPF, DKIM, DMARC & MX";
const DESCRIPTION =
  "Check whether your cold-email sending domain will authenticate. Free, instant grading of SPF (including the 10-lookup limit), DKIM, DMARC and MX, with the fix for each problem.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/domain-checker" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/tools/domain-checker" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const CHECKS = [
  {
    name: "SPF",
    what: "Which servers may send for your domain. Catches the 10-DNS-lookup limit that silently breaks SPF once you add one tool too many.",
  },
  {
    name: "DKIM",
    what: "The signature that proves your mail wasn't altered. Looks for a valid key at your provider's usual selector.",
  },
  {
    name: "DMARC",
    what: "What inboxes should do with mail that fails SPF/DKIM. Gmail, Yahoo and Microsoft now require it for bulk senders.",
  },
  {
    name: "MX",
    what: "Where replies go. No MX means replies and bounces are lost, which also looks bad to spam filters.",
  },
];

export default function DomainCheckerPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pb-16 pt-36 sm:pt-44">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="mb-5 inline-flex rounded-full bg-surface-2 px-4 py-2 text-xs font-medium text-[color:var(--color-text-secondary)]">
            Free tool · no signup
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[2.5rem] font-normal leading-[1.08] tracking-tight sm:text-6xl">
            Will your cold emails land in the inbox?
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[color:var(--color-text-secondary)]">
            Enter a sending domain. You get a grade for the DNS records that decide whether your mail
            authenticates, and the exact fix for anything broken.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl px-4">
          <DomainChecker />
        </div>
      </section>

      <section className="border-t border-line/10 bg-inset py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
            What it checks
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CHECKS.map((c) => (
              <div key={c.name} className="rounded-2xl border border-line/10 bg-surface p-5">
                <h3 className="font-semibold">{c.name}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{c.what}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[color:var(--color-text-micro)]">
            Lookups run over DNS-over-HTTPS. Checks aren&apos;t saved; if you ask for the report by email, I
            keep your email, domain and results so I can reply. Powered by{" "}
            <a
              href="https://github.com/anasmughal239-alt/coldwatch"
              className="underline underline-offset-2 hover:text-fg"
            >
              coldwatch
            </a>
            , my open-source checker.
          </p>
        </div>
      </section>
    </main>
  );
}
