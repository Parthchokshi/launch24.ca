import type { Metadata } from "next";
import { NewHome } from "@/components/new/NewHome";
import { resolveDesign } from "@/lib/design";
import { siteConfig } from "@/lib/seo";
// PARKED (cookie that remembers the design; see src/lib/design.ts):
// import { cookies } from "next/headers";
// import { DesignPersist } from "@/components/DesignPersist";
// import { DESIGN_COOKIE } from "@/lib/design";

// One URL, one canonical (https://launch24.ca/).
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

// Reads searchParams only for the ?design=old / ?design=new preview, so the
// page renders per request.
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const { design } = resolveDesign(query);
  // PARKED: const cookieStore = await cookies(); resolveDesign(query, cookieStore.get(DESIGN_COOKIE)?.value)

  // The old design is parked: its code is only loaded when it is actually shown.
  let home = <NewHome />;
  if (design === "old") {
    const { OldHome } = await import("@/components/old/OldHome");
    home = <OldHome />;
  }

  return (
    <>
      {/* Next trims the trailing slash from metadata canonicals; we want exactly https://launch24.ca/ */}
      <link rel="canonical" href={`${siteConfig.url}/`} />
      {/* PARKED: <DesignPersist design={persist} /> */}
      {home}
    </>
  );
}
