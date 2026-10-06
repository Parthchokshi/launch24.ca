import { ActionButtons, VoiceNoteLink } from "@/components/ActionButtons";
import { Logo } from "@/components/Logo";
import { heroCopy } from "@/lib/hero";

type Query = Record<string, string | string[] | undefined>;

export function Hero({ query }: { query: Query }) {
  const { kicker, h1 } = heroCopy(query);

  return (
    <section aria-labelledby="hero-heading" className="bg-yellow">
      <div className="mx-auto max-w-3xl px-4 pb-8 pt-1 sm:px-6 sm:pb-14">
        <header className="flex min-h-14 items-center">
          <Logo />
        </header>

        <p className="mt-3 inline-block bg-ink px-2.5 py-1 text-sm font-extrabold uppercase tracking-[0.14em] text-yellow">
          {kicker}
        </p>

        <h1
          id="hero-heading"
          className="display mt-3 text-balance text-[clamp(2.3rem,10.4vw,5.5rem)] text-ink"
        >
          {h1}
        </h1>

        <p className="mt-3 text-base font-semibold leading-snug text-ink sm:text-xl">
          Custom-designed. Mobile-ready. You own it.
        </p>

        <div className="mt-4">
          <ActionButtons location="hero" />
        </div>

        <div className="mt-1">
          <VoiceNoteLink />
        </div>
      </div>
    </section>
  );
}
