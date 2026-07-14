import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { contact, links } from "@/lib/contact";

export function GetStarted({
  id,
  idPrefix,
  title,
  subtitle,
}: {
  id: string;
  idPrefix: string;
  title: React.ReactNode;
  subtitle: string;
}) {
  return (
    <section id={id} className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
        <Reveal>
          <h2 className="font-display text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[color:var(--muted)]">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost rounded-full border border-[color:var(--line)] px-5 py-2.5 text-xs font-bold uppercase tracking-widest"
            >
              WhatsApp
            </a>
            <a
              href={links.tel}
              className="btn-ghost rounded-full border border-[color:var(--line)] px-5 py-2.5 text-xs font-bold uppercase tracking-widest"
            >
              Call {contact.phoneDisplay}
            </a>
            <a
              href={links.sms}
              className="btn-ghost rounded-full border border-[color:var(--line)] px-5 py-2.5 text-xs font-bold uppercase tracking-widest"
            >
              Text
            </a>
            <a
              href={links.mailto}
              className="btn-ghost rounded-full border border-[color:var(--line)] px-5 py-2.5 text-xs font-bold uppercase tracking-widest"
            >
              Email
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[0_32px_80px_rgba(0,0,0,0.5)] sm:p-8">
            <LeadForm idPrefix={idPrefix} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
