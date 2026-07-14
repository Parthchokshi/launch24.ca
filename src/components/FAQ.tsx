import { Reveal } from "@/components/Reveal";

const faqs = [
  {
    q: "How does it actually work?",
    a: "Four steps. You brief us — call, WhatsApp, text, or voice note. We design and write your site. You review a live preview link. Then you’re live on your domain within 24 hours — or it’s free.",
  },
  {
    q: "When does the 24-hour clock start?",
    a: "When four things are in: deposit received, intake complete (business name, services, goals), your content received (or you choose “we write the copy”), and the starter package scope locked. Not when you first message us.",
  },
  {
    q: "What exactly does “or it’s free” mean?",
    a: "If we miss delivering the first version of the agreed starter package within 24 hours of clock start, you don’t pay — your deposit is fully refunded.",
  },
  {
    q: "What doesn’t count toward the 24 hours?",
    a: "Delays outside the build: waiting on your content or replies, revision rounds after first delivery, domain/DNS/hosting connection waits, third-party platform delays, and scope changes after lock.",
  },
  {
    q: "What’s included in the starter package?",
    a: "A responsive website, mobile-first layout, contact/lead form, basic SEO (title and meta), and launch-ready homepage copy. Multi-page sites, e-commerce, advanced booking, custom photography, ads, and ongoing maintenance are quoted separately.",
  },
  {
    q: "What do I need to provide?",
    a: "Business name, what you do, contact details, logo if you have one, and photos you want used. No copy? We can write a clean starter draft as part of the package.",
  },
  {
    q: "Can I request changes after delivery?",
    a: "Yes — one light revision round is included after first delivery. Bigger changes (extra pages, booking, e-commerce) are quoted separately and sit outside the 24-hour guarantee.",
  },
  {
    q: "How do I pay the deposit?",
    a: "We confirm on the proposal call — typically e-Transfer or card. The clock doesn’t start until payment and intake are complete.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-center text-[38px] font-bold tracking-[-0.02em] text-[color:var(--ink)]">
            Questions, <span className="accent-serif">answered</span>
          </h2>
        </Reveal>

        <div className="mt-8 flex flex-col gap-[11px]">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i * 60, 240)}>
              <details className="group rounded-2xl bg-[color:var(--surface)] px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15.5px] font-semibold text-[color:var(--ink)] marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">{item.q}</span>
                  <span className="shrink-0 text-lg text-[color:var(--muted-2)] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-xl pb-5 text-sm leading-relaxed text-[color:var(--muted)]">
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
