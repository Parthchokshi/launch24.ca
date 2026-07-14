import { Reveal } from "@/components/Reveal";

const items = [
  {
    title: "Designed, not templated",
    body: "A polished one-pager shaped around your business — colours, tone, and layout that fit you.",
  },
  {
    title: "Built for phones first",
    body: "Most of your customers arrive on mobile. Your site will look sharp in their hand.",
  },
  {
    title: "Leads, not just looks",
    body: "Contact form, click-to-call, and clear next steps — so visits turn into customers.",
  },
  {
    title: "Found on Google",
    body: "Clean titles, descriptions, and structure so search engines take you seriously.",
  },
];

export function Included() {
  return (
    <section id="included" className="border-t border-[color:var(--line-soft)] bg-[color:var(--surface)]/60 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--gold)]">
            Every site ships with
          </p>
          <h2 className="font-display mt-4 max-w-xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Everything you need to{" "}
            <span className="gold-text italic">look expensive.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-[color:var(--line-soft)] bg-[color:var(--line-soft)] sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80} className="h-full">
              <div className="h-full bg-[color:var(--bg)] p-7 transition-colors duration-300 hover:bg-[color:var(--surface-2)] sm:p-9">
                <span className="font-display text-sm italic text-[color:var(--gold)]">
                  0{i + 1}
                </span>
                <h3 className="font-display mt-3 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--muted)]">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
