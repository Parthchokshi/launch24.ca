import { links } from "@/lib/contact";

export function Hero() {
  return (
    <header className="hero-glow grain relative min-h-[100svh] overflow-hidden pb-28 pt-8">
      <div className="pointer-events-none absolute -right-16 top-24 h-64 w-64 rounded-full border border-[color:var(--signal)]/20 pulse-ring" />
      <div className="pointer-events-none absolute -right-8 top-32 h-48 w-48 rounded-full border border-[color:var(--signal)]/30" />

      <div className="relative mx-auto flex min-h-[calc(100svh-7rem)] max-w-5xl flex-col justify-between px-5 sm:px-8">
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-bold uppercase tracking-[0.28em] text-[color:var(--signal)] fade-up">
            Launch24
          </p>
          <a
            href="#reach"
            className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)] transition hover:text-[color:var(--foam)] fade-up fade-up-delay-1"
          >
            Get a proposal
          </a>
        </div>

        <div className="my-auto max-w-3xl py-16">
          <p className="font-display mb-4 text-[clamp(2.75rem,12vw,6.5rem)] font-extrabold leading-[0.9] tracking-tight text-[color:var(--foam)] fade-up">
            LAUNCH
            <span className="text-[color:var(--signal)]">24</span>
            <span className="block text-[clamp(1rem,3.5vw,1.5rem)] font-semibold tracking-[0.35em] text-[color:var(--muted)]">
              .CA
            </span>
          </p>

          <h1 className="font-display mt-8 max-w-xl text-[clamp(1.75rem,5vw,3rem)] font-bold leading-[1.1] tracking-tight fade-up fade-up-delay-1">
            Website in 24 hours.
            <span className="block text-[color:var(--signal)]">
              Or it&apos;s free.
            </span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-[color:var(--muted)] sm:text-lg fade-up fade-up-delay-2">
            For local businesses that need to look sharp online — fast. One call,
            one deposit, one live site.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 fade-up fade-up-delay-3">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--signal)] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-[color:var(--ink)] transition hover:brightness-110"
            >
              WhatsApp me
            </a>
            <a
              href={links.tel}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-[color:var(--foam)] backdrop-blur transition hover:border-[color:var(--signal)]/50 hover:bg-white/10"
            >
              Call now
            </a>
          </div>

          <p className="mt-5 max-w-sm text-xs leading-relaxed text-[color:var(--muted)]/80 fade-up fade-up-delay-3">
            Clock starts after deposit and your content/intake are in.{" "}
            <a href="#guarantee" className="underline underline-offset-2 hover:text-[color:var(--foam)]">
              See guarantee
            </a>
            .
          </p>
        </div>

        <p className="pb-2 text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)]/60">
          Scroll · How it works
        </p>
      </div>
    </header>
  );
}
