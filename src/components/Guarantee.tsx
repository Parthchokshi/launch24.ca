import { Reveal } from "@/components/Reveal";

export function Guarantee() {
  return (
    <section id="guarantee" className="relative overflow-hidden border-t border-[color:var(--line-soft)] px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="orb left-1/2 top-1/2 h-[40vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 bg-[#d9b878]/15" />
      <Reveal className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--gold)]">
          The promise
        </p>
        <h2 className="font-display mx-auto mt-5 max-w-3xl text-balance text-[clamp(2.2rem,7vw,4.5rem)] font-semibold leading-[1.05] tracking-tight">
          If we&apos;re late,
          <br />
          <span className="gold-text italic">you don&apos;t pay.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-balance text-base leading-relaxed text-[color:var(--muted)]">
          24 hours from kickoff to your first live version. Simple as that.
          The fine print lives in the{" "}
          <a href="#faq" className="text-[color:var(--gold)] underline underline-offset-4">
            FAQ
          </a>
          .
        </p>
      </Reveal>
    </section>
  );
}
