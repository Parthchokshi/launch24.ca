const faqs = [
  {
    q: "When does the 24-hour clock actually start?",
    a: "After we receive your deposit (or full payment), completed intake, required content (or you choose “we write the copy”), and the starter package scope is locked. Not when you first message us.",
  },
  {
    q: "What do I need to provide?",
    a: "Business name, what you do, contact details, logo if you have one, photos you want used, and any must-have copy. If you don’t have copy, we can write a clean starter draft as part of the package.",
  },
  {
    q: "What does “or it’s free” mean?",
    a: "If we miss delivering the first version of the agreed starter package within 24 hours of clock start, you don’t pay — your deposit is refunded.",
  },
  {
    q: "Can I request changes after delivery?",
    a: "Yes. One light revision round is included after first delivery. Bigger scope changes (extra pages, booking, store) are quoted separately and sit outside the 24-hour guarantee.",
  },
  {
    q: "What about domain and hosting?",
    a: "Domain purchase, DNS, and hosting connection delays don’t count toward the 24 hours. We can help you connect everything — just know the clock is about building your first version, not waiting on registrars.",
  },
  {
    q: "Is this a custom site or a template?",
    a: "It’s a focused one-page starter, designed for your business, delivered fast. Not a months-long custom rebuild — and not a generic theme dump either.",
  },
  {
    q: "How do I pay the deposit?",
    a: "We’ll confirm on the proposal call — typically e-Transfer or card. The clock doesn’t start until payment and intake are complete.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-[color:var(--line)] bg-[color:var(--ink-soft)] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--signal)]">
          FAQ
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Straight answers.
        </h2>

        <div className="mt-10 divide-y divide-[color:var(--line)]">
          {faqs.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer list-none font-display text-base font-semibold tracking-tight marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="text-[color:var(--signal)] transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--muted)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
