import { JsonLd } from "@/components/JsonLd";
import { FAQ } from "@/components/old/FAQ";
import { GetStarted } from "@/components/old/GetStarted";
import { Hero } from "@/components/old/Hero";
import { OldClickTracking } from "@/components/old/OldClickTracking";
import { Pricing } from "@/components/old/Pricing";
import { Process } from "@/components/old/Process";
import { SiteFooter } from "@/components/old/SiteFooter";
import { faqs } from "@/lib/old/faqs";
import { homePageJsonLd } from "@/lib/structured-data";

/** The CURRENT home page, unchanged apart from the design wrapper. */
export function OldHome() {
  return (
    <div className="design-old" data-design="old">
      <JsonLd data={homePageJsonLd(faqs)} />
      <OldClickTracking />
      <a
        href="#main"
        className="absolute left-4 top-4 z-50 -translate-y-[200%] rounded-lg bg-[color:var(--ink)] px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Hero />
      <main id="main">
        <Process />
        <Pricing />
        <FAQ />
        <GetStarted />
      </main>
      <SiteFooter />
    </div>
  );
}
