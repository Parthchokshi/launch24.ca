import { links } from "@/lib/contact";

export function Hero() {
  return (
    <header className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="orb left-[-15%] top-[-10%] h-[45vh] w-[45vh] bg-[#d9b878]/25" />
      <div
        className="orb bottom-[-20%] right-[-10%] h-[50vh] w-[50vh] bg-[#8a5a2b]/30"
        style={{ animationDelay: "-9s" }}
      />

      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <p className="font-display text-lg font-semibold tracking-tight enter">
          Launch<span className="gold-text">24</span>
        </p>
        <a
          href={links.tel}
          className="btn-ghost rounded-full border border-[color:var(--line)] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] enter enter-1"
        >
          Call us
        </a>
      </nav>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pb-24 pt-8 text-center sm:px-8">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)] enter enter-1">
          <span className="tick h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
          Now booking
        </p>

        <h1 className="font-display max-w-4xl text-balance text-[clamp(2.6rem,9vw,6rem)] font-semibold leading-[1.02] tracking-tight enter enter-2">
          Your website.
          <br />
          <span className="gold-text italic">Live in 24 hours.</span>
          <br />
          Or it&apos;s free.
        </h1>

        <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-[color:var(--muted)] sm:text-lg enter enter-3">
          Polished websites for local businesses — restaurants, salons, trades,
          clinics. One message is all it takes.
        </p>

        <div className="mt-10 flex w-full max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center enter enter-4">
          <a
            href="#start"
            className="btn-gold w-full rounded-full px-8 py-4 text-center text-sm font-bold uppercase tracking-widest sm:w-auto"
          >
            Start mine now
          </a>
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full rounded-full border border-[color:var(--line)] px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-[color:var(--ivory)] sm:w-auto"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="relative z-10 w-full overflow-hidden border-t border-[color:var(--line-soft)] py-4">
        <div className="marquee text-[11px] font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)]/70">
          {[0, 1].map((i) => (
            <span key={i} className="flex shrink-0 gap-12">
              {[
                "Restaurants",
                "Salons",
                "Contractors",
                "Clinics",
                "Realtors",
                "Cafés",
                "Trades",
                "Studios",
                "Coaches",
              ].map((t) => (
                <span key={t} className="flex items-center gap-12">
                  {t} <span className="text-[color:var(--gold)]">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
