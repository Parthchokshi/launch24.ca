/**
 * Bespoke preview sites for prospects, served at /p/<slug> (see docs/previews.md).
 * Each HTML file is in ./sites, its photos in public/p/<slug>/img/.
 */
export type PreviewSite = { slug: string; business: string; createdAt: string; expiresAt: string };

export const previewSites: PreviewSite[] = [
  { slug: "hx231w-gb-hand-pulled-noodles", business: "GB Hand-Pulled Noodles", createdAt: "2026-10-26", expiresAt: "2026-11-09" },
  { slug: "g0myuz-honest-burgers-fried-chicken", business: "The Honest Burgers & Fried Chicken", createdAt: "2026-10-26", expiresAt: "2026-11-09" },
  { slug: "eq3ohr-btown-bakers", business: "B-Town Bakers", createdAt: "2026-10-26", expiresAt: "2026-11-09" },
  { slug: "bxzoza-keyfades", business: "KeyFades Fresh Fades", createdAt: "2026-10-26", expiresAt: "2026-11-09" },
  { slug: "2wzb43-unique-auto-collision", business: "Unique Auto Collision Centre", createdAt: "2026-10-26", expiresAt: "2026-11-09" },
  { slug: "x4fukw-active-auto-repairs", business: "Active Auto Repairs & Sales", createdAt: "2026-10-26", expiresAt: "2026-11-09" },
  { slug: "l9xv6w-eazy-auto-service", business: "EAZY Auto Service", createdAt: "2026-10-26", expiresAt: "2026-11-09" },
  { slug: "tjr4ig-pet-spa-toronto", business: "Pet Spa Toronto", createdAt: "2026-10-26", expiresAt: "2026-11-09" },
  { slug: "94ju9m-sobaka-grooming", business: "SOBAKA Grooming Salon", createdAt: "2026-10-26", expiresAt: "2026-11-09" },
  { slug: "a767d1-pawny-tail-grooming", business: "Pawny Tail Pet Grooming & More", createdAt: "2026-10-26", expiresAt: "2026-11-09" },
];

/** The live preview for a slug, or null if unknown or expired (expiresAt is the last day it shows). */
export function getPreviewSite(slug: string, now = new Date()) {
  const p = previewSites.find((x) => x.slug === slug);
  if (!p) return null;
  return now.getTime() > new Date(`${p.expiresAt}T23:59:59-05:00`).getTime() ? null : p;
}
