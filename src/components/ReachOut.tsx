import { LeadForm } from "@/components/LeadForm";
import { links, contact } from "@/lib/contact";

export function ReachOut() {
  return (
    <section id="reach" className="border-t border-[color:var(--line)] px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--signal)]">
            Reach out
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Least friction. Fastest reply.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[color:var(--muted)]">
            Prefer talking? Use WhatsApp or call. Prefer typing or a voice note?
            Send it here — phone number is all we need to start.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[color:var(--signal)] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[color:var(--ink)]"
            >
              WhatsApp
            </a>
            <a
              href={links.tel}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-wide"
            >
              Call {contact.phoneDisplay}
            </a>
            <a
              href={links.sms}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-wide"
            >
              Text
            </a>
            <a
              href={links.mailto}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-wide"
            >
              Email
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--ink-soft)] p-6 sm:p-8">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
