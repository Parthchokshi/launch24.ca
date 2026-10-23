import { ActionButtons } from "@/components/new/ActionButtons";
import { LeadForm } from "@/components/new/LeadForm";
import { contact } from "@/lib/contact";
import { faqs } from "@/lib/faqs";
import { guaranteeSentence } from "@/lib/guarantee";
import { launchPackageIncludes, launchPackagePriceLabel, pricing } from "@/lib/pricing";
import { proof } from "@/lib/proof";
import Link from "next/link";

const businesses = ["Plumbers", "Salons", "Restaurants", "Contractors", "Clinics", "Realtors", "Cleaners", "Tutors"];

/** Scrolling strip of the kinds of businesses we build for (decorative). */
export function Strip() {
  return (
    <div className="strip" aria-hidden>
      <div className="track">
        {[...businesses, ...businesses].map((b, i) => (
          <span key={i}>{b}</span>
        ))}
      </div>
    </div>
  );
}

const steps = [
  { title: "You brief us", body: "15 minutes by call, chat, or voice note.", time: "00:15", fill: "8%" },
  { title: "We design & write", body: "Your layout, your words, built for your business.", time: "same day", fill: "60%" },
  { title: "You review a live preview", body: "A real link you can open on your phone, within 24 hours.", time: "≤ 24:00", fill: "92%" },
  { title: "You're live", body: "Happy with the preview? We launch it.", time: "launch", fill: "100%" },
];

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-heading" className="sec tight wrap">
      <div className="shead">
        <div>
          <p className="tag">How it works</p>
          <h2 id="how-heading">
            Brief tonight.
            <br />
            Preview tomorrow.
          </h2>
        </div>
        <p>Four steps, and you only do the first one.</p>
      </div>
      <ol className="bento">
        {steps.map((s, i) => (
          <li key={s.title} className="tile">
            <span className="k">{String(i + 1).padStart(2, "0")}</span>
            <span className="hr">{s.time}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <div className="bar" aria-hidden>
              <i style={{ width: s.fill }} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
    <path d="m5 12 5 5L20 7" />
  </svg>
);

/** Launch Package card and the guarantee box, side by side on desktop. */
export function PricingAndGuarantee() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="sec tight wrap">
      <div className="shead">
        <div>
          <p className="tag">Pricing</p>
          <h2 id="pricing-heading">
            One package.
            <br />
            One price.
          </h2>
        </div>
        <p>Free proposal first. Deposit only when we start. You own the site.</p>
      </div>
      <div className="pgrid">
        <div className="pcard hot">
          <p className="tag">
            <b>Launch Package</b>
          </p>
          <p className="amt">
            {launchPackagePriceLabel}
            <small>{pricing.currency} · one-time</small>
          </p>
          <ul className="checks">
            {launchPackageIncludes.map((item) => (
              <li key={item}>
                <Check />
                {item}
              </li>
            ))}
          </ul>
          <p className="note">
            Bigger project? <a href="#quote">Get a custom quote</a>.
          </p>
        </div>

        <div id="guarantee" className="pcard" role="group" aria-labelledby="guarantee-heading">
          <p className="tag">The guarantee</p>
          <h3 id="guarantee-heading">24 hours. Or it&apos;s free.</h3>
          <p className="lead">{guaranteeSentence}</p>
          <ul className="clock">
            <li>
              <b>Starts</b>
              When all three are in: your deposit, your intake (business name, what you do,
              contact details), and your content, or you tell us to write it.
            </li>
            <li>
              <b>Waits</b>
              When we&apos;re waiting on you: slow replies, missing content, or answers to our
              questions.
            </li>
            <li>
              <b>Skips</b>
              Domain or DNS changes (they&apos;re out of our hands), and revision rounds after we
              deliver.
            </li>
          </ul>
          <p className="note">
            Full rules in our <Link href="/terms">Terms</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}

export function QuoteForm() {
  return (
    <section id="quote" aria-labelledby="quote-heading" className="sec tight wrap" style={{ scrollMarginTop: 72 }}>
      <div className="split">
        <div>
          <p className="tag">Rather we call you?</p>
          <h2 id="quote-heading">
            Leave a number.
            <br />
            We&apos;ll call you back.
          </h2>
          <p className="lead">A few quick fields. No long form.</p>
        </div>
        <div className="formcard">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="sec tight wrap">
      <div className="shead">
        <div>
          <p className="tag">Questions</p>
          <h2 id="faq-heading">Asked often.</h2>
        </div>
      </div>
      <div className="faq">
        {faqs.map((f, i) => (
          <details key={f.q}>
            <summary>
              <span className="q" aria-hidden>
                Q.{String(i + 1).padStart(2, "0")}
              </span>
              {f.q}
              <span className="x" aria-hidden />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
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
    <section id="proof" aria-labelledby="proof-heading" className="sec tight wrap">
      <div className="shead">
        <div>
          <p className="tag">Our work</p>
          <h2 id="proof-heading">Our work</h2>
        </div>
      </div>
      <ul className="proof">
        {proof.length > 0
          ? proof.map((p) => (
              <li key={p.kind === "site" ? p.url : p.name} className="tile">
                {p.kind === "testimonial" ? (
                  <>
                    <blockquote style={{ margin: 0 }}>“{p.quote}”</blockquote>
                    <h3>{p.name}</h3>
                    <p>{p.business}</p>
                  </>
                ) : (
                  <>
                    <h3>{p.title}</h3>
                    {p.note && <p>{p.note}</p>}
                    <a href={p.url} className="link">
                      View the site
                    </a>
                  </>
                )}
              </li>
            ))
          : [1, 2, 3].map((n) => (
              <li key={n} data-slot="proof-placeholder" className="tile" style={{ borderStyle: "dashed" }}>
                <span className="k">Placeholder {n}</span>
                <p>Client testimonial or sample site goes here. Add real ones in src/lib/proof.ts.</p>
              </li>
            ))}
      </ul>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="contact" aria-labelledby="final-heading" className="final wrap">
      <h2 id="final-heading">
        The clock starts
        <br />
        when you say go.
      </h2>
      <p>{guaranteeSentence}</p>
      <p style={{ marginTop: 6 }}>WhatsApp, call, or text. It takes 15 minutes to brief us.</p>
      <ActionButtons location="final" />
      <p className="tag" style={{ marginTop: 22 }}>
        {contact.phoneDisplay} · {contact.email}
      </p>
    </section>
  );
}
