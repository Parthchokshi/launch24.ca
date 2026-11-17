import { ActionButtons, VoiceNoteLink } from "@/components/new/ActionButtons";
import { Dial } from "@/components/new/Dial";
import { guaranteeSentence } from "@/lib/guarantee";
import { HERO_H1, HERO_KICKER } from "@/lib/hero";

const HIGHLIGHT = "24 hours";

/** Puts "24 hours." in gold wherever it appears in the headline. */
function Headline({ text }: { text: string }) {
  const at = text.indexOf(HIGHLIGHT);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <em>{HIGHLIGHT}</em>
      {text.slice(at + HIGHLIGHT.length)}
    </>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="hero wrap">
      <div className="hgrid">
        <div>
          <p className="tag in">
            <b aria-hidden>●</b> {HERO_KICKER}
          </p>
          <h1 id="hero-heading" className="in d1">
            <Headline text={HERO_H1} />
          </h1>
          <p className="sub in d2">Custom-designed. Mobile-ready. You own it.</p>
          <p className="guar in d2">{guaranteeSentence}</p>
          <div className="in d3">
            <ActionButtons location="hero" />
          </div>
          <VoiceNoteLink />
        </div>
        <Dial />
      </div>
    </section>
  );
}
