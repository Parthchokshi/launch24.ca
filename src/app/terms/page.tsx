import Link from "next/link";
import type { Metadata } from "next";
import { starterPromoCopy } from "@/lib/pricing";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Launch24 24-hour guarantee terms: when the clock starts, what’s included, and what doesn’t count toward delivery.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms | Launch24",
    description:
      "Launch24 24-hour guarantee terms: when the clock starts, what’s included, and what doesn’t count toward delivery.",
    url: `${siteConfig.url}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <Link
        href="/"
        className="text-xs font-bold uppercase tracking-wider text-[color:var(--accent)]"
      >
        ← Launch24
      </Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-[color:var(--ink)]">
        Terms
      </h1>
      <p className="mt-2 text-sm text-[color:var(--muted)]">
        Last updated: July 2026. Plain-language marketing terms — not a substitute
        for a formal contract.
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-[color:var(--muted)]">
        <section>
          <h2 className="text-lg font-bold text-[color:var(--ink)]">
            The offer
          </h2>
          <p className="mt-2">
            Launch24 delivers the first version of an agreed starter website
            within 24 hours of clock start. If we miss that window, the
            project is free — your deposit is refunded.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[color:var(--ink)]">
            When the 24-hour clock starts
          </h2>
          <p className="mt-2">All of the following must be true:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Deposit (or full payment) received</li>
            <li>
              Completed intake (business name, contact, services, goals)
            </li>
            <li>
              Required content received — or you opt into “we write the copy”
              as part of the package
            </li>
            <li>Project scope locked (not a custom multi-page rebuild)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[color:var(--ink)]">
            What is not counted toward the 24 hours
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Client delays responding or sending content</li>
            <li>Revision rounds after first delivery</li>
            <li>Domain purchase, DNS, or hosting connection delays</li>
            <li>Third-party platform delays</li>
            <li>
              Scope changes after lock (extra pages, e-commerce, booking systems,
              custom features)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[color:var(--ink)]">
            Pricing
          </h2>
          <p className="mt-2">
            {starterPromoCopy.terms} Ongoing maintenance and larger changes after launch are quoted
            separately.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[color:var(--ink)]">
            Included vs not included
          </h2>
          <p className="mt-2">
            Included: a responsive website, mobile-first layout, contact/lead
            form, basic SEO (title/meta), and launch-ready homepage copy. Domain
            and hosting stay on your accounts. Not included by default:
            multi-page sites, e-commerce, advanced booking, custom photography,
            ads, and ongoing maintenance (quoted separately).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[color:var(--ink)]">
            Revisions
          </h2>
          <p className="mt-2">
            One light revision round is included after first delivery. Larger
            changes are quoted separately and sit outside the 24-hour guarantee.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[color:var(--ink)]">
            Contact
          </h2>
          <p className="mt-2">
            Questions:{" "}
            <a
              href="mailto:hi@launch24.ca"
              className="text-[color:var(--accent)] underline underline-offset-2"
            >
              hi@launch24.ca
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
