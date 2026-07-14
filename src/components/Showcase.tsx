import { Reveal } from "@/components/Reveal";

const work = [
  {
    type: "Restaurant",
    name: "Harbour Bite",
    note: "Menu, hours, one-tap directions",
    tone: "from-[#3a2a18] via-[#241a10] to-transparent",
  },
  {
    type: "Salon",
    name: "Bloom & Blade",
    note: "Services, prices, booking button",
    tone: "from-[#2e2438] via-[#1d1626] to-transparent",
  },
  {
    type: "Trades",
    name: "North Ridge HVAC",
    note: "Quote form, service areas, reviews",
    tone: "from-[#16302e] via-[#101f1e] to-transparent",
  },
];

export function Showcase() {
  return (
    <section id="work" className="border-t border-[color:var(--line-soft)] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--gold)]">
            What we build
          </p>
          <h2 className="font-display mt-4 max-w-xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Sites that make small businesses{" "}
            <span className="gold-text italic">look established.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {work.map((item, i) => (
            <Reveal key={item.name} delay={i * 100}>
              <article className="card-lift group overflow-hidden rounded-3xl border border-[color:var(--line-soft)] bg-[color:var(--surface)]">
                <div
                  className={`relative aspect-[4/3] bg-gradient-to-br ${item.tone}`}
                >
                  <div className="absolute inset-x-6 bottom-0 top-8 rounded-t-xl border border-b-0 border-white/10 bg-black/30 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1.5">
                    <div className="flex gap-1.5 p-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                    </div>
                    <div className="space-y-2 px-4 pt-1">
                      <div className="h-2.5 w-2/3 rounded bg-white/15" />
                      <div className="h-2 w-1/2 rounded bg-white/10" />
                      <div className="mt-3 h-6 w-24 rounded-full bg-[color:var(--gold)]/70" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[color:var(--gold)]">
                    {item.type}
                  </p>
                  <h3 className="font-display mt-1.5 text-xl font-semibold tracking-tight">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-[color:var(--muted)]">
                    {item.note}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-8 text-xs text-[color:var(--muted)]/60">
            Sample concepts — your business, your brand, built to fit.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
