import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { GetStarted } from "@/components/GetStarted";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { SiteFooter } from "@/components/SiteFooter";
import { siteConfig } from "@/lib/seo";
import { homePageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
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

export default function HomePage() {
  return (
    <>
      <JsonLd data={homePageJsonLd()} />
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
    </>
  );
}
