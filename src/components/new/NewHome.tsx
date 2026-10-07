import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/new/Hero";
import {
  FAQ,
  FinalCta,
  Guarantee,
  HowItWorks,
  Pricing,
  Proof,
  QuoteForm,
} from "@/components/new/Sections";
import { SiteFooter } from "@/components/new/SiteFooter";
import { StickyBar } from "@/components/new/StickyBar";
import { faqs } from "@/lib/faqs";
import { SHOW_PORTFOLIO } from "@/lib/flags";
import { homePageJsonLd } from "@/lib/structured-data";

type Query = Record<string, string | string[] | undefined>;

/** The NEW yellow/black home page. */
export function NewHome({ query }: { query: Query }) {
  return (
    <div className="design-new" data-design="new">
      <JsonLd data={homePageJsonLd(faqs)} />
      <a
        href="#main"
        className="absolute left-2 top-2 z-50 -translate-y-[200%] bg-ink px-4 py-3 font-bold text-yellow focus:translate-y-0"
      >
        Skip to content
      </a>
      <Hero query={query} />
      <main id="main">
        <QuoteForm />
        <HowItWorks />
        <Pricing />
        <Guarantee />
        <FAQ />
        {SHOW_PORTFOLIO && <Proof />}
        <FinalCta />
      </main>
      <SiteFooter />
      <StickyBar />
    </div>
  );
}
