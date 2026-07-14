const startsWhen = [
  "Deposit (or full payment) received",
  "Completed intake (business name, contact, services, goals)",
  "Required content received — or you opt into “we write the copy”",
  "Starter package scope locked",
];

const exclusions = [
  "Client delays responding or sending content",
  "Revision rounds after first delivery",
  "Domain purchase, DNS, or hosting connection delays",
  "Third-party platform delays (registrars, Google, payment apps)",
  "Scope changes after lock (extra pages, e-commerce, custom features)",
];

export function Guarantee() {
  return (
    <section id="guarantee" className="border-t border-[color:var(--line)] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--signal)]">
          The guarantee
        </p>
        <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          24 hours — or it&apos;s free.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[color:var(--muted)]">
          First version of the agreed starter package is delivered within 24 hours
          of clock start. If Launch24 misses that window, the project is free
          (your deposit is refunded).
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-bold">
              Clock starts when all are true
            </h3>
            <ul className="mt-4 space-y-3">
              {startsWhen.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-[color:var(--foam)]">
                  <span className="mt-0.5 text-[color:var(--signal)]" aria-hidden>
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold">
              Not counted in the 24 hours
            </h3>
            <ul className="mt-4 space-y-3">
              {exclusions.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-[color:var(--muted)]">
                  <span className="mt-0.5" aria-hidden>
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-sm text-[color:var(--muted)]">
          Full wording in{" "}
          <a href="/terms" className="text-[color:var(--signal)] underline underline-offset-2">
            Terms
          </a>
          .
        </p>
      </div>
    </section>
  );
}
