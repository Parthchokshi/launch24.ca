import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import {
  FAQ,
  FinalCta,
  Guarantee,
  HowItWorks,
  Pricing,
  Proof,
  QuoteForm,
} from "@/components/Sections";
import { SiteFooter } from "@/components/SiteFooter";
import { siteConfig } from "@/lib/seo";
import { homePageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.ogDescription,
    url: siteConfig.url,
  },
  twitter: {
    title: siteConfig.title,
    description: siteConfig.ogDescription,
  },
};

// searchParams makes this page render per request, which is what lets the
// hero show the right words for ?utm_source=lawn_sign / utm_content=v2b.
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;

  return (
    <>
      <JsonLd data={homePageJsonLd()} />
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
        <Proof />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
