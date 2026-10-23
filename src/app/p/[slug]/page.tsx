import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PreviewBanner } from "@/components/preview/PreviewBanner";
import { PreviewSite } from "@/components/preview/PreviewSite";
import { getPreview } from "@/previews";

/** Private previews: never indexed, never cached past their expiry. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPreview(slug);
  return {
    title: p ? `${p.business.name} · Preview` : "Preview",
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  };
}

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const preview = getPreview(slug);
  if (!preview) notFound();
  return (
    <>
      <PreviewBanner slug={preview.slug} businessName={preview.business.name} sample={preview.sample} />
      <PreviewSite preview={preview} />
    </>
  );
}
