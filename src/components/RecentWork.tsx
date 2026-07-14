const launches = [
  { name: "North Ridge HVAC", type: "Trades", note: "One-pager · quote form" },
  { name: "Bloom & Blade", type: "Salon", note: "Services · booking CTA" },
  { name: "Harbour Bite", type: "Restaurant", note: "Menu · hours · map" },
];

export function RecentWork() {
  return (
    <section id="work" className="border-t border-[color:var(--line)] bg-[color:var(--ink-soft)] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--signal)]">
          Recent launches
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Built for local businesses.
        </h2>
        <p className="mt-3 max-w-md text-sm text-[color:var(--muted)]">
          Placeholder examples — swap in your real client work as you ship.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {launches.map((item) => (
            <li
              key={item.name}
              className="group relative overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--ink)] p-5"
            >
              <div className="mb-6 aspect-[4/3] rounded-xl bg-gradient-to-br from-[color:var(--signal)]/20 via-transparent to-[color:var(--amber)]/15 ring-1 ring-inset ring-white/5" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-[color:var(--signal)]">
                {item.type}
              </p>
              <h3 className="font-display mt-1 text-lg font-bold">{item.name}</h3>
              <p className="mt-1 text-sm text-[color:var(--muted)]">{item.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
