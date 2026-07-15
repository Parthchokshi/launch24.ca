export const pricing = {
  currency: "CAD",
  starterFrom: 699,
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

export const starterFromLabel = `from ${formatCad(pricing.starterFrom)}`;
export const starterRegularLabel = `from ${formatCad(pricing.starterRegular)}`;

/** Plain-text promo lines for SEO, FAQs, and legal copy */
export const starterPromoCopy = {
  short: `Limited-time from ${formatCad(pricing.starterFrom)} ${pricing.currency} (usually ${formatCad(pricing.starterRegular)})`,
  faq: `Starter websites are a limited-time promotional rate from ${formatCad(pricing.starterFrom)} CAD (usually ${formatCad(pricing.starterRegular)}). Final price depends on scope — extra pages, booking, e-commerce, and custom features are quoted separately.`,
  terms: `Starter websites are currently a limited-time promotional rate from ${formatCad(pricing.starterFrom)} ${pricing.currency} (usually ${formatCad(pricing.starterRegular)}). The final project price depends on agreed scope.`,
  seoDescription: `Get a polished website for your local business in 24 hours — or it’s free. Limited-time from ${formatCad(pricing.starterFrom)} CAD (usually ${formatCad(pricing.starterRegular)}). Call, WhatsApp, text, or leave a voice note to start.`,
  seoOg: `Polished websites for local Canadian businesses in 24 hours — limited-time from ${formatCad(pricing.starterFrom)} CAD (usually ${formatCad(pricing.starterRegular)}), or your deposit is refunded.`,
} as const;
