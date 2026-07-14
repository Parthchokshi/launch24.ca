const included = [
  "One-page responsive website",
  "Mobile-first layout",
  "Contact / lead form",
  "Basic SEO (title & meta)",
  "Launch-ready homepage copy",
  "Fast, clean design",
];

const notIncluded = [
  "Multi-page custom sites",
  "E-commerce / online store",
  "Advanced booking systems",
  "Custom photography",
  "Ads or SEO campaigns",
  "Ongoing maintenance (quoted separately)",
];

export function Included() {
  return (
    <section id="included" className="border-t border-[color:var(--line)] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--signal)]">
          The package
        </p>
        <h2 className="font-display mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
          A fixed starter site — so the guarantee is real.
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-bold text-[color:var(--signal)]">
              Included
            </h3>
            <ul className="mt-4 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-[color:var(--foam)]">
                  <span className="mt-0.5 text-[color:var(--signal)]" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-[color:var(--muted)]">
              Not included by default
            </h3>
            <ul className="mt-4 space-y-3">
              {notIncluded.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-[color:var(--muted)]">
                  <span className="mt-0.5" aria-hidden>
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
