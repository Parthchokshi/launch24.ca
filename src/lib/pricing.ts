export const pricing = {
  currency: "CAD",
  launchPackage: 699,
} as const;

export function formatCad(amount: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: pricing.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const launchPackagePriceLabel = formatCad(pricing.launchPackage);

/** What the Launch Package includes. Shared by the page, FAQ, and JSON-LD. */
export const launchPackageIncludes = [
  "Responsive design that works on any phone",
  "Contact form that emails you",
  "Basic SEO so Google can find you",
  "Homepage copy, written for your business",
  "One revision round",
] as const;
