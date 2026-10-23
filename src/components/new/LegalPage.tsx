import type { ReactNode } from "react";
import { SiteFooter } from "@/components/new/SiteFooter";
import { TopBar } from "@/components/new/TopBar";

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
    <div className="design-new">
      <TopBar />
      <div className="legal-head">
        <div className="wrap">
          <h1>{title}</h1>
          <p className="tag" style={{ marginTop: 12 }}>
            {updated}
          </p>
        </div>
      </div>
      <main className="wrap">
        <div className="legal">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      <div className="legal-body">{children}</div>
    </section>
  );
}
