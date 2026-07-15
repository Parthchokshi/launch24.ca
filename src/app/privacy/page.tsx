import Link from "next/link";
import type { Metadata } from "next";
import { contact } from "@/lib/contact";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Launch24 collects and uses phone numbers, emails, messages, and voice memos from proposal requests.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy | Launch24",
    description:
      "How Launch24 collects and uses phone numbers, emails, messages, and voice memos from proposal requests.",
    url: `${siteConfig.url}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <Link
        href="/"
        className="text-xs font-bold uppercase tracking-wider text-[color:var(--accent)]"
      >
        ← Launch24
      </Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-[color:var(--ink)]">
        Privacy
      </h1>
      <p className="mt-2 text-sm text-[color:var(--muted)]">
        Last updated: July 2026. Short and plain.
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-[color:var(--muted)]">
        <section>
          <h2 className="text-lg font-bold text-[color:var(--ink)]">
            What we collect
          </h2>
          <p className="mt-2">
            When you contact us through the site, we may receive your phone
            number, and optional name, email, message, and voice memo.
            Direct WhatsApp, call, SMS, or email uses those platforms’ own
            systems.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[color:var(--ink)]">
            How we use it
          </h2>
          <p className="mt-2">
            Only to respond to your proposal request and deliver the website
            service. We don’t sell your information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[color:var(--ink)]">
            Cookies &amp; advertising
          </h2>
          <p className="mt-2">
            We use Google Ads to measure how our ads perform. When you arrive
            from one of our ads, Google may set a cookie on your browser to
            count conversions — for example, when you submit the proposal
            form. We don’t use your personal data to personalize ads. You can
            manage Google ad cookies at{" "}
            <a
              href="https://adssettings.google.com/adspersonalization"
              className="text-[color:var(--accent)] underline underline-offset-2"
            >
              adssettings.google.com
            </a>
            , or block cookies in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[color:var(--ink)]">
            Voice memos
          </h2>
          <p className="mt-2">
            If you record a voice memo, it is sent to us as an email attachment
            so we can understand your request. Don’t include sensitive personal
            data you wouldn’t want in an email.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[color:var(--ink)]">
            Contact
          </h2>
          <p className="mt-2">
            Privacy questions:{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-[color:var(--accent)] underline underline-offset-2"
            >
              {contact.email}
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
