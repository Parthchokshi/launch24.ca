import Link from "next/link";
import type { Metadata } from "next";
import { contact } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacy — Launch24",
  description: "How Launch24 handles contact details and voice memos you send.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <Link
        href="/"
        className="text-xs font-bold uppercase tracking-wider text-[color:var(--signal)]"
      >
        ← Launch24
      </Link>
      <h1 className="font-display mt-6 text-4xl font-bold tracking-tight">
        Privacy
      </h1>
      <p className="mt-2 text-sm text-[color:var(--muted)]">
        Last updated: July 2026. Short and plain.
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-[color:var(--muted)]">
        <section>
          <h2 className="font-display text-lg font-bold text-[color:var(--foam)]">
            What we collect
          </h2>
          <p className="mt-2">
            When you contact us through the site, we may receive your phone
            number, optional name, optional message, and optional voice memo.
            Direct WhatsApp, call, SMS, or email uses those platforms’ own
            systems.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[color:var(--foam)]">
            How we use it
          </h2>
          <p className="mt-2">
            Only to respond to your proposal request and deliver the website
            service. We don’t sell your information.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[color:var(--foam)]">
            Voice memos
          </h2>
          <p className="mt-2">
            If you record a voice memo, it is sent to us as an email attachment
            so we can understand your request. Don’t include sensitive personal
            data you wouldn’t want in an email.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-[color:var(--foam)]">
            Contact
          </h2>
          <p className="mt-2">
            Privacy questions:{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-[color:var(--signal)] underline underline-offset-2"
            >
              {contact.email}
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
