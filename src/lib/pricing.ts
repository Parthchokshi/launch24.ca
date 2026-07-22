export const pricing = {
  currency: "CAD",
  starterFrom: 699,
  // Internal reference only — not shown on the site
  starterRegular: 999,
  // Kept for later — not shown on the site yet
  careYearly: 99,
  careMonthly: 9.99,
} as const;

export function formatCad(amount: number) {
  const fractionDigits = Number.isInteger(amount) ? 0 : 2;
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: pricing.currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

export const launchPackagePriceLabel = formatCad(pricing.starterFrom);

/** Shared founding-rate / 90–10 explanation */
export const launchPackagePitch = {
  heroNinety:
    "About 90% of projects land here — and that’s enough. Need something bigger? We’re all ears — reach out for a custom quote.",
  pricingNinety:
    "About 90% of projects land here — and that’s enough. Need something bigger? We’re all ears for a custom quote.",
} as const;

/** Plain-text lines for SEO, FAQs, and legal copy */
export const starterPromoCopy = {
  short: `Launch Package ${formatCad(pricing.starterFrom)} ${pricing.currency} (founding rate). About 90% of projects land here; bigger work is custom-quoted. Free proposal first.`,
  faq: `The Launch Package is ${formatCad(pricing.starterFrom)} CAD (founding rate). About 90% of projects land here — and that’s enough. If you need something bigger, reach out and we’ll give you a custom quote. You’ll always see the exact price on a free proposal before you pay anything.`,
  terms: `The Launch Package is currently offered at a founding rate of ${formatCad(pricing.starterFrom)} ${pricing.currency}. About 90% of projects land at this price. Bigger or custom work is quoted separately. You’ll see the exact price on a free proposal before you pay anything.`,
  seoDescription: `Get a polished website for your local business in 24 hours — or it’s free. Launch Package ${formatCad(pricing.starterFrom)} CAD (founding rate). Call, WhatsApp, text, or leave a voice note to start.`,
  seoOg: `Polished websites for local Canadian businesses in 24 hours — Launch Package ${formatCad(pricing.starterFrom)} CAD (founding rate), or your deposit is refunded.`,
} as const;
