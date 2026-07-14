import { Reveal } from "@/components/Reveal";

const faqs = [
  {
    q: "How does it actually work?",
    a: "Three steps. You reach out (call, WhatsApp, text, voice note — whatever's easiest). We do a quick scope call and lock the package. Then you send the deposit and your content, and we deliver your first live version within 24 hours.",
  },
  {
    q: "When does the 24-hour clock start?",
    a: "When four things are in: deposit received, intake complete (business name, services, goals), your content received (or you choose “we write the copy”), and the starter package scope locked. Not when you first message us.",
  },
  {
    q: "What exactly does “or it's free” mean?",
    a: "If we miss delivering the first version of the agreed starter package within 24 hours of clock start, you don't pay — your deposit is fully refunded.",
  },
  {
    q: "What doesn't count toward the 24 hours?",
    a: "Delays outside the build: waiting on your content or replies, revision rounds after first delivery, domain/DNS/hosting connection waits, third-party platform delays, and scope changes after lock.",
  },
  {
    q: "What's included in the starter package?",
    a: "A one-page responsive website, mobile-first layout, contact/lead form, basic SEO (title and meta), and launch-ready homepage copy. Multi-page sites, e-commerce, advanced booking, custom photography, ads, and ongoing maintenance are quoted separately.",
  },
  {
    q: "What do I need to provide?",
    a: "Business name, what you do, contact details, logo if you have one, and photos you want used. No copy? We can write a clean starter draft as part of the package.",
  },
  {
    q: "Can I request changes after delivery?",
    a: "Yes — one light revision round is included after first delivery. Bigger changes (extra pages, booking, a store) are quoted separately and sit outside the 24-hour guarantee.",
  },
  {
    q: "How do I pay the deposit?",
    a: "We confirm on the proposal call — typically e-Transfer or card. The clock doesn't start until payment and intake are complete.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-[color:var(--line-soft)] bg-[color:var(--surface)]/60 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--gold)]">
            Details
          </p>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Everything else,{" "}
            <span className="gold-text italic">answered.</span>
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-[color:var(--line-soft)]">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i * 60, 240)}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-medium tracking-tight marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">{item.q}</span>
                  <span className="shrink-0 text-[color:var(--gold)] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[color:var(--muted)]">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
