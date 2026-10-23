import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/new/Hero";
import {
  FAQ,
  FinalCta,
  HowItWorks,
  PricingAndGuarantee,
  Proof,
  QuoteForm,
  Strip,
} from "@/components/new/Sections";
import { SiteFooter } from "@/components/new/SiteFooter";
import { StickyBar } from "@/components/new/StickyBar";
import { Story } from "@/components/new/Story";
import { TopBar } from "@/components/new/TopBar";
import { faqs } from "@/lib/faqs";
import { SHOW_PORTFOLIO } from "@/lib/flags";
import { homePageJsonLd } from "@/lib/structured-data";

type Query = Record<string, string | string[] | undefined>;

/** The NEW ("Night Shift") home page. */
export function NewHome({ query }: { query: Query }) {
  return (
    <div className="design-new" data-design="new">
      <JsonLd data={homePageJsonLd(faqs)} />
      <a href="#main" className="skip">
        Skip to content
      </a>
      <TopBar />
      <Hero query={query} />
      <main id="main">
        <Strip />
        <Story />
        <HowItWorks />
        <PricingAndGuarantee />
        <QuoteForm />
        <FAQ />
        {SHOW_PORTFOLIO && <Proof />}
        <FinalCta />
      </main>
      <SiteFooter />
      <StickyBar />
    </div>
  );
}
