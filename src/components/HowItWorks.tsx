const steps = [
  {
    n: "01",
    title: "Reach out",
    body: "WhatsApp, call, text, or leave a voice note. Tell us what your business needs — takes under a minute.",
  },
  {
    n: "02",
    title: "Deposit + content lock",
    body: "We lock the starter package, you send deposit and intake (or we write the copy). That’s when the clock starts.",
  },
  {
    n: "03",
    title: "Live in 24 hours",
    body: "You get the first version of your site within 24 hours. Miss the window — the project is free.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-[color:var(--line)] bg-[color:var(--ink-soft)] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--signal)]">
          How it works
        </p>
        <h2 className="font-display mt-3 max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">
          Three steps. No endless email chains.
        </h2>

        <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {steps.map((step) => (
            <li key={step.n} className="relative">
              <span className="font-display text-5xl font-extrabold text-[color:var(--signal)]/25">
                {step.n}
              </span>
              <h3 className="font-display mt-2 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
