import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="bg-yellow">
        <div className="mx-auto max-w-3xl px-4 pb-8 pt-1 sm:px-6">
          <Logo />
          <h1 className="display mt-4 text-[clamp(2.8rem,12vw,5rem)]">{title}</h1>
          <p className="mt-2 text-lg font-semibold">{updated}</p>
        </div>
      </div>
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-10 text-lg leading-relaxed sm:px-6">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-extrabold uppercase leading-tight">{title}</h2>
      <div className="mt-2 space-y-2 text-muted [&_a]:font-bold [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        {children}
      </div>
    </section>
  );
}
