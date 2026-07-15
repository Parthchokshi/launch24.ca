import { Reveal } from "@/components/Reveal";
import { faqs } from "@/lib/faqs";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2
            id="faq-heading"
            className="text-center text-[38px] font-bold tracking-[-0.02em] text-[color:var(--ink)]"
          >
            Questions, <span className="accent-serif">answered</span>
          </h2>
        </Reveal>

        <div className="mt-8 flex flex-col gap-[11px]">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i * 60, 240)}>
              <details className="group rounded-2xl bg-[color:var(--surface)] px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15.5px] font-semibold text-[color:var(--ink)] marker:content-none [&::-webkit-details-marker]:hidden">
                  <h3 className="min-w-0 text-[15.5px] font-semibold">{item.q}</h3>
                  <span
                    className="shrink-0 text-lg text-[color:var(--muted-2)] transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  >
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
