import { Reveal } from "@/components/Reveal";

const steps = [
  {
    label: "STEP 1",
    title: "You brief us",
    body: "15 minutes, by call, chat or voice note. That’s it to get started.",
    panel: "var(--panel-yellow)",
    pillDark: false,
  },
  {
    label: "STEP 2",
    title: "We design & write",
    body: "Custom layout and copy that sounds like you, not a template.",
    panel: "var(--panel-lavender)",
    pillDark: false,
  },
  {
    label: "STEP 3",
    title: "You review",
    body: "Live preview link within 24 hours, tailored to your business needs and agreed scope.",
    panel: "var(--panel-blue)",
    pillDark: false,
  },
  {
    label: "STEP 4",
    title: "You’re live — or it’s free",
    body: "On your domain, mobile-ready. Miss the deadline and you pay nothing.",
    panel: "var(--panel-mint)",
    pillDark: true,
  },
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="process-heading"
            className="text-[38px] font-bold tracking-[-0.02em] text-[color:var(--ink)]"
          >
            The 24-hour <span className="accent-serif">plan</span>
          </h2>
          <p className="text-[13.5px] text-[color:var(--muted-2)]">
            Every project, same four beats.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.label} delay={i * 80}>
              <div
                className="flex h-full flex-col gap-12 rounded-[20px] p-[30px]"
                style={{ background: step.panel }}
              >
                <span
                  className="self-start rounded-full px-[13px] py-[5px] text-[11.5px] font-bold"
                  style={
                    step.pillDark
                      ? { background: "var(--ink)", color: "#fff" }
                      : { background: "#fff", color: "var(--ink)" }
                  }
                >
                  {step.label}
                </span>
                <div>
                  <h3 className="mb-[7px] text-[17px] font-bold text-[color:var(--ink)]">
                    {step.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-[color:var(--muted)]">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
