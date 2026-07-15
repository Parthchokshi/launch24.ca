import Link from "next/link";
import { PhoneBrand } from "@/components/PhoneBrand";
import { links } from "@/lib/contact";
import { formatCad, pricing } from "@/lib/pricing";

export function Hero() {
  return (
    <>
      <header className="relative">
        <nav
          aria-label="Primary"
          className="sticky top-0 z-20 flex items-center justify-between border-b border-[color:var(--line-soft)] bg-white/90 px-5 py-5 backdrop-blur-md sm:px-8"
        >
          <Link href="/" className="flex items-center gap-2 enter">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[color:var(--ink)] text-[13px] font-extrabold text-white">
              24
            </span>
            <span className="text-lg font-bold tracking-tight text-[color:var(--ink)]">
              Launch24
            </span>
          </Link>
          <div className="hidden items-center gap-7 text-sm font-medium text-[color:var(--muted)] sm:flex enter enter-1">
            <a href="#process" className="hover:text-[color:var(--ink)]">
              Process
            </a>
            <a href="#pricing" className="hover:text-[color:var(--ink)]">
              Pricing
            </a>
            <a href="#faq" className="hover:text-[color:var(--ink)]">
              FAQ
            </a>
            <a href="#contact" className="hover:text-[color:var(--ink)]">
              Contact
            </a>
            <a
              href="#contact"
              className="btn-dark inline-flex items-center gap-1.5 rounded-[11px] px-[18px] py-[11px] text-[13.5px] font-semibold"
            >
              Start a project ↗
            </a>
          </div>
          <a
            href="#contact"
            className="btn-dark inline-flex items-center gap-1.5 rounded-[11px] px-4 py-2.5 text-[13.5px] font-semibold sm:hidden enter enter-1"
          >
            Start ↗
          </a>
        </nav>
      </header>

      <section
        aria-labelledby="hero-heading"
        className="px-5 pt-3 sm:px-8"
      >
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-[color:var(--panel-lavender)] px-6 py-16 sm:px-12 sm:py-[76px]">
          <span
            aria-hidden
            className="absolute right-12 top-14 text-3xl text-[color:var(--ink)]"
          >
            ✦
          </span>
          <span
            aria-hidden
            className="absolute bottom-24 right-32 text-lg text-[color:var(--panel-lavender-2)] sm:right-44"
          >
            ✦
          </span>
          <span
            aria-hidden
            className="absolute bottom-14 left-8 text-sm text-[color:var(--panel-lavender-3)] sm:left-20"
          >
            ✦
          </span>

          <div className="relative max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-[15px] py-2 text-[12.5px] font-semibold text-[color:var(--ink)] shadow-[0_1px_3px_rgba(0,0,0,.08)] enter enter-1">
              <span className="pulse-dot h-[7px] w-[7px] rounded-full bg-[color:var(--accent)]" />
              Now taking this week&apos;s projects
            </p>

            <h1
              id="hero-heading"
              className="mt-[26px] text-balance text-[clamp(2.4rem,7.5vw,4.25rem)] font-bold leading-[1.04] tracking-[-0.025em] text-[color:var(--ink)] enter enter-2"
            >
              <span className="accent-serif">A website that&apos;s actually yours</span>{" "}
              — guaranteed by tomorrow.
            </h1>

            <p className="mt-3 max-w-[520px] text-[14.5px] font-semibold text-[color:var(--ink)] enter enter-2">
              Miss the 24-hour deadline?{" "}
              <span className="mark-mint">You don&apos;t pay.</span>
            </p>

            <p
              className="mt-[18px] max-w-[520px] text-[17.5px] leading-relaxed text-[#4c4a46] enter enter-3"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              We don&apos;t hand you a template. We start by listening — your
              business, your immediate goals, your taste, what makes you
              different. Then we design and write a site that&apos;s actually
              yours, built thoughtfully and with care — in 24 hours.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3.5 enter enter-4">
              <a
                href="#contact"
                className="btn-dark inline-flex items-center gap-2 rounded-[12px] px-[26px] py-[15px] text-[14.5px] font-semibold"
              >
                Get my free proposal →
              </a>
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-light inline-flex items-center gap-2 rounded-[12px] px-[22px] py-[15px] text-[14.5px] font-semibold shadow-[0_1px_3px_rgba(0,0,0,.08)]"
              >
                <svg viewBox="0 0 18 18" width="16" height="16" fill="none" aria-hidden>
                  <path
                    d="M9 1.5a7.5 7.5 0 0 0-6.4 11.4L1.5 16.5l3.7-1.1A7.5 7.5 0 1 0 9 1.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.4 5.8c.5 2.6 2.7 4.8 5.3 5.3l.8-1.3-1.9-.9-.8.7c-.7-.4-1.5-1.2-1.9-1.9l.7-.8-.9-1.9-1.3.8Z"
                    fill="currentColor"
                  />
                </svg>
                WhatsApp us
              </a>
            </div>

            <a
              href={links.tel}
              className="group mt-8 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 enter enter-4"
            >
              <span className="text-[clamp(1.35rem,3.5vw,1.7rem)] font-bold tracking-tight text-[color:var(--ink)]">
                <PhoneBrand />
              </span>
              <span className="text-[13px] font-medium text-[color:var(--muted)]">
                That&apos;s really our number —{" "}
                <span className="font-semibold text-[color:var(--accent)]">365 days, 24/7</span>. Call or text.
              </span>
            </a>

            <div className="mt-7 flex flex-wrap items-center gap-5 text-[13px] text-[color:var(--muted)] enter enter-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="text-[15px] text-[color:var(--accent)]">✓</span>
                Starting from{" "}
                <span className="line-through decoration-[color:var(--muted-2)]">
                  {formatCad(pricing.starterRegular)}
                </span>{" "}
                <span className="font-semibold text-[color:var(--ink)]">
                  {formatCad(pricing.starterFrom)}
                </span>{" "}
                CAD
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="text-[15px] text-[color:var(--accent)]">✓</span>
                Free proposal, deposit only once we start
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="text-[15px] text-[color:var(--accent)]">✓</span>
                You own the site
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
