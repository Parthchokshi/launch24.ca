import { Reveal } from "@/components/Reveal";
import {
  launchPackagePitch,
  launchPackagePriceLabel,
} from "@/lib/pricing";

const launchFeatures = [
  "Responsive, mobile-first design",
  "Contact / lead form",
  "Basic SEO covered",
  "Homepage copy written for your business",
  "One revision round after delivery",
] as const;

const guarantees = [
  "Live in 24 hours — or it’s free",
  "Deposit only once we start",
  "You own the site",
] as const;

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="pricing-heading"
            className="text-[38px] font-bold tracking-[-0.02em] text-[color:var(--ink)]"
          >
            Simple <span className="accent-serif">pricing</span>
          </h2>
          <p className="text-[13.5px] text-[color:var(--muted-2)]">
            Launch Package or something bigger — your call.
          </p>
        </Reveal>

        <Reveal delay={40}>
          <p className="mt-5 text-[14px] leading-snug text-[color:var(--ink-soft)]">
            Founding rate.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Reveal>
            <div
              className="flex h-full flex-col justify-between gap-8 rounded-[20px] p-[30px] sm:p-9"
              style={{ background: "var(--panel-lavender)" }}
            >
              <div>
                <span className="rounded-full bg-white px-[13px] py-[5px] text-[11.5px] font-bold text-[color:var(--ink)]">
                  LAUNCH PACKAGE
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-[color:var(--ink)]">
                  Website
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--muted)]">
                  A polished website for your business — how you look online,
                  what you do, and how people get in touch.
                </p>

                <ul className="mt-5 flex flex-col gap-2">
                  {launchFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-baseline gap-2 text-[13.5px] text-[color:var(--ink-soft)]"
                    >
                      <span aria-hidden className="text-[14px] text-[color:var(--accent)]">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[13px] text-[color:var(--muted)]">
                  CAD · one-time · founding rate
                </p>
                <p className="mt-1 text-[clamp(2rem,4vw,2.6rem)] font-bold tracking-[-0.03em] text-[color:var(--ink)]">
                  {launchPackagePriceLabel}
                </p>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[color:var(--muted)]">
                  {launchPackagePitch.pricingNinety}
                </p>

                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[12.5px] font-medium text-[color:var(--muted)]">
                  {guarantees.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5">
                      <span aria-hidden className="text-[13px] text-[color:var(--accent)]">
                        ✓
                      </span>
                      {item}
                    </span>
                  ))}
                </p>

                <a
                  href="#contact"
                  className="btn-dark mt-5 inline-flex items-center gap-1.5 rounded-[12px] px-[22px] py-[14px] text-[14px] font-semibold"
                >
                  Get my free proposal →
                </a>
                <p className="mt-3 text-[12.5px] text-[color:var(--muted)]">
                  Free proposal first — you’ll know your exact price before you
                  pay anything.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div
              className="flex h-full flex-col justify-between gap-10 rounded-[20px] p-[30px] sm:p-9"
              style={{ background: "var(--panel-mint)" }}
            >
              <div>
                <span
                  className="rounded-full px-[13px] py-[5px] text-[11.5px] font-bold"
                  style={{ background: "var(--ink)", color: "#fff" }}
                >
                  CUSTOM
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-[color:var(--ink)]">
                  Bigger projects
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--muted)]">
                  Need more than Launch — a larger site, custom portal,
                  dashboards, or something beyond the package? We’re all ears.
                  Tell us what you’re building and we’ll quote it.
                </p>
              </div>

              <div>
                <a
                  href="#contact"
                  className="btn-dark inline-flex items-center gap-1.5 rounded-[12px] px-[22px] py-[14px] text-[14px] font-semibold"
                >
                  Contact us →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
