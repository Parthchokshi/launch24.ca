import { ActionButtons } from "@/components/new/ActionButtons";
import { LeadForm } from "@/components/new/LeadForm";
import { faqs } from "@/lib/faqs";
import { guaranteeSentence } from "@/lib/guarantee";
import { launchPackageIncludes, launchPackagePriceLabel, pricing } from "@/lib/pricing";
import { proof } from "@/lib/proof";
import Link from "next/link";

const wrap = "mx-auto max-w-3xl px-4 sm:px-6";
const h2 = "display text-[clamp(2.2rem,9vw,3.75rem)]";

export function QuoteForm() {
  return (
    <section id="quote" aria-labelledby="quote-heading" className="on-ink scroll-mt-2 bg-ink text-white">
      <div className={`${wrap} py-10 sm:py-14`}>
        <h2 id="quote-heading" className={`${h2} text-yellow`}>
          Rather we call you?
        </h2>
        <p className="mb-6 mt-2 text-lg text-muted-on-ink">
          Three quick fields. No long form.
        </p>
        <LeadForm />
      </div>
    </section>
  );
}

const steps = [
  { title: "You brief us", body: "15 minutes by call, chat, or voice note." },
  { title: "We design & write", body: "Your layout, your words, built for your business." },
  { title: "You review a live preview", body: "A real link you can open on your phone, within 24 hours." },
  { title: "You're live", body: "Happy with the preview? We launch it." },
];

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-heading" className="bg-white">
      <div className={`${wrap} py-12 sm:py-16`}>
        <h2 id="how-heading" className={h2}>How it works</h2>
        <ol className="mt-6 grid gap-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 border-[3px] border-ink p-4">
              <span aria-hidden className="display flex h-12 w-12 shrink-0 items-center justify-center bg-ink text-3xl text-yellow">
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-extrabold uppercase leading-tight">{s.title}</h3>
                <p className="mt-1 text-lg text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="on-ink bg-ink text-white">
      <div className={`${wrap} py-12 sm:py-16`}>
        <h2 id="pricing-heading" className={`${h2} text-yellow`}>Pricing</h2>
        <div className="mt-6 border-[3px] border-yellow p-5 sm:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-yellow">Launch Package</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-3">
            <span className="display text-7xl text-white sm:text-8xl">{launchPackagePriceLabel}</span>
            <span className="text-lg font-bold text-muted-on-ink">{pricing.currency}, one-time</span>
          </p>
          <ul className="mt-5 space-y-2.5 text-lg">
            {launchPackageIncludes.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="font-black text-yellow">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t-[3px] border-white/20 pt-4 text-lg font-bold">
            Free proposal first. Deposit only when we start. You own the site.
          </p>
        </div>
        <p className="mt-5 text-lg">
          Bigger project?{" "}
          <a href="#quote" className="font-extrabold text-yellow underline decoration-2 underline-offset-4">
            Get a custom quote
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export function Guarantee() {
  return (
    <section id="guarantee" aria-labelledby="guarantee-heading" className="bg-yellow">
      <div className={`${wrap} py-12 sm:py-16`}>
        <div className="border-[4px] border-ink bg-white p-5 sm:p-8">
          <h2 id="guarantee-heading" className={h2}>
            24 hours. Or it&apos;s free.
          </h2>
          <p className="mt-3 text-lg font-bold">
            {guaranteeSentence}
          </p>
          <h3 className="mt-6 text-lg font-extrabold uppercase tracking-wide">How the clock works</h3>
          <ul className="mt-2 space-y-3 text-lg">
            <li>
              <strong>It starts</strong> when all three are in: your deposit, your
              intake (business name, what you do, contact details), and your
              content, or you tell us to write it.
            </li>
            <li>
              <strong>It waits</strong> when we&apos;re waiting on you: slow
              replies, missing content, or answers to our questions.
            </li>
            <li>
              <strong>It doesn&apos;t count</strong>{" "}
              domain or DNS changes (they&apos;re out of our hands), or revision rounds after we deliver.
            </li>
          </ul>
          <p className="mt-4 text-base text-muted">
            Full rules in our{" "}
            <Link href="/terms" className="font-bold text-ink underline decoration-2 underline-offset-4">
              Terms
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-white">
      <div className={`${wrap} py-12 sm:py-16`}>
        <h2 id="faq-heading" className={h2}>Questions</h2>
        <div className="mt-6 border-t-[3px] border-ink">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b-[3px] border-ink">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-xl font-extrabold leading-tight [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="display text-4xl group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 text-lg text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * PROOF SLOT. Fill src/lib/proof.ts with real testimonials / sample sites.
 * While it is empty, three clearly-labelled placeholders show instead.
 * Never add made-up testimonials.
 */
export function Proof() {
  return (
    <section id="proof" aria-labelledby="proof-heading" className="bg-white">
      <div className={`${wrap} pb-12 sm:pb-16`}>
        <h2 id="proof-heading" className={h2}>Our work</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {proof.length > 0
            ? proof.map((p) => (
                <li key={p.kind === "site" ? p.url : p.name} className="border-[3px] border-ink p-4">
                  {p.kind === "testimonial" ? (
                    <>
                      <blockquote className="text-lg font-semibold">“{p.quote}”</blockquote>
                      <p className="mt-3 font-extrabold uppercase">{p.name}</p>
                      <p className="text-muted">{p.business}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-xl font-extrabold uppercase">{p.title}</p>
                      {p.note && <p className="text-muted">{p.note}</p>}
                      <a href={p.url} className="mt-3 inline-flex min-h-12 items-center font-bold underline decoration-2 underline-offset-4">
                        View the site
                      </a>
                    </>
                  )}
                </li>
              ))
            : [1, 2, 3].map((n) => (
                <li
                  key={n}
                  data-slot="proof-placeholder"
                  className="flex min-h-36 flex-col justify-center border-[3px] border-dashed border-ink p-4 text-muted"
                >
                  <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-ink">
                    Placeholder {n}
                  </p>
                  <p className="mt-1 text-base">
                    Client testimonial or sample site goes here. Add real ones in src/lib/proof.ts.
                  </p>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="contact" aria-labelledby="final-heading" className="bg-yellow">
      <div className={`${wrap} py-12 sm:py-16`}>
        <h2 id="final-heading" className="display text-[clamp(2.6rem,11vw,4.75rem)]">
          Ready? Start now.
        </h2>
        <p className="mt-2 text-lg font-semibold">
          {guaranteeSentence}
        </p>
        <p className="mb-6 text-lg">
          Call, text, or WhatsApp. It takes 15 minutes to brief us.
        </p>
        <ActionButtons location="final" />
      </div>
    </section>
  );
}
