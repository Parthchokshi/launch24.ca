import { LeadForm } from "@/components/LeadForm";
import { PhoneBrand } from "@/components/PhoneBrand";
import { Reveal } from "@/components/Reveal";
import { links } from "@/lib/contact";

const contactMethods = [
  {
    href: links.tel,
    label: (
      <>
        Call <PhoneBrand />
      </>
    ),
    external: false,
    icon: (
      <svg viewBox="0 0 18 18" width="15" height="15" fill="none" aria-hidden>
        <path
          d="M16.5 12.7v2.3a1.5 1.5 0 0 1-1.64 1.5 14.84 14.84 0 0 1-6.47-2.3 14.63 14.63 0 0 1-4.5-4.5A14.84 14.84 0 0 1 1.6 3.14 1.5 1.5 0 0 1 3.08 1.5h2.3a1.5 1.5 0 0 1 1.5 1.29c.1.72.27 1.43.53 2.1a1.5 1.5 0 0 1-.34 1.59l-.95.95a12 12 0 0 0 4.5 4.5l.95-.95a1.5 1.5 0 0 1 1.58-.34c.68.26 1.39.44 2.11.53a1.5 1.5 0 0 1 1.29 1.53Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: links.whatsapp,
    label: "WhatsApp",
    external: true,
    icon: (
      <svg viewBox="0 0 18 18" width="15" height="15" fill="none" aria-hidden>
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
    ),
  },
  {
    href: links.sms,
    label: "Message",
    external: false,
    icon: (
      <svg viewBox="0 0 18 18" width="15" height="15" fill="none" aria-hidden>
        <path
          d="M2 4.5A2.5 2.5 0 0 1 4.5 2h9A2.5 2.5 0 0 1 16 4.5v6a2.5 2.5 0 0 1-2.5 2.5H7l-3.5 3v-3h-.001A2.5 2.5 0 0 1 2 10.5v-6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: links.mailto,
    label: "Email",
    external: false,
    icon: (
      <svg viewBox="0 0 18 18" width="15" height="15" fill="none" aria-hidden>
        <rect x="2" y="3.5" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="m3 5.5 6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const;

export function GetStarted() {
  return (
    <section id="contact" className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-[color:var(--panel-mint)] p-8 sm:p-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_460px] lg:items-center lg:gap-12">
          <Reveal>
            <h2 className="text-[clamp(2rem,4.5vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-[color:var(--ink)]">
              Reach us the <span className="accent-serif">easy</span> way.
            </h2>
            <p className="mt-[18px] max-w-[400px] text-[15.5px] leading-relaxed text-[#3f5c4c]">
              Type it, tap it, or just talk — a 30-second voice note is a
              perfectly good brief. Reach us anytime —{" "}
              <strong className="font-semibold text-[color:var(--ink)]">
                365 days, 24/7
              </strong>{" "}
              — it&apos;s in our number.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {contactMethods.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="btn-light inline-flex items-center gap-2 rounded-[11px] px-[17px] py-3 text-[13.5px] font-semibold shadow-[0_1px_3px_rgba(0,0,0,.08)]"
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-[13px] rounded-[20px] bg-white p-[30px] shadow-[0_14px_44px_rgba(31,77,53,.18)]">
              <div className="text-base font-bold text-[color:var(--ink)]">
                Start your build
              </div>
              <LeadForm idPrefix="contact" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
