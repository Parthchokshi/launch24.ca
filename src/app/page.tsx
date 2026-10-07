import type { Metadata } from "next";
import { cookies } from "next/headers";
import { DesignPersist } from "@/components/DesignPersist";
import { NewHome } from "@/components/new/NewHome";
import { OldHome } from "@/components/old/OldHome";
import { DESIGN_COOKIE, resolveDesign } from "@/lib/design";
import { siteConfig } from "@/lib/seo";

// One URL, one canonical (https://launch24.ca/), two designs.
export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
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

// searchParams + cookies make this page render per request, which is what
// lets us choose the design (and the hero words) before the first byte.
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [query, cookieStore] = await Promise.all([searchParams, cookies()]);
  const { design, persist } = resolveDesign(
    query,
    cookieStore.get(DESIGN_COOKIE)?.value,
  );

  return (
    <>
      {/* Next trims the trailing slash from metadata canonicals; we want exactly https://launch24.ca/ */}
      <link rel="canonical" href={`${siteConfig.url}/`} />
      <DesignPersist design={persist} />
      {design === "new" ? <NewHome query={query} /> : <OldHome />}
    </>
  );
}
