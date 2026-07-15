import { Reveal } from "@/components/Reveal";
import { starterFromLabel, starterRegularLabel } from "@/lib/pricing";

const starterFeatures = [
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
            Starter package or something bigger — your call.
          </p>
        </Reveal>

        <Reveal delay={40}>
          <p className="mt-5 text-[14px] leading-snug text-[color:var(--ink-soft)]">
            Limited-time promotional rate.
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
                  STARTER
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-[color:var(--ink)]">
                  Website
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--muted)]">
                  A polished starter site in 24 hours. Extra pages, booking, or
                  e-commerce are quoted on top.
                </p>

                <ul className="mt-5 flex flex-col gap-2">
                  {starterFeatures.map((feature) => (
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
                  CAD · one-time · limited time
                </p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[clamp(1.15rem,2.4vw,1.4rem)] font-semibold tracking-[-0.02em] text-[color:var(--muted-2)] line-through decoration-[color:var(--muted-2)]">
                    {starterRegularLabel}
                  </span>
                  <span className="text-[clamp(2rem,4vw,2.6rem)] font-bold tracking-[-0.03em] text-[color:var(--ink)]">
                    {starterFromLabel}
                  </span>
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
                  Need a larger site, custom portal, dashboards, or something
                  beyond the starter? We can help — tell us what you’re building
                  and we’ll quote it.
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
