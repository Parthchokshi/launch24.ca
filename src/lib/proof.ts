/**
 * Social proof slot. Leave empty until we have REAL testimonials or sample
 * sites (never invent any). While empty, the page shows three clearly
 * labelled placeholders. Add entries to replace them:
 *
 *   { kind: "testimonial", quote: "…", name: "Jane D.", business: "Jane's Bakery, Oshawa" }
 *   { kind: "site", title: "Jane's Bakery", url: "https://…", note: "Built in 22 hours" }
 */
export type ProofItem =
  | { kind: "testimonial"; quote: string; name: string; business: string }
  | { kind: "site"; title: string; url: string; note?: string };

export const proof: ProofItem[] = [];
