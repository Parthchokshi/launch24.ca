/**
 * A pre-built website preview for a prospect. One JSON file per business in
 * src/previews/data/, registered in src/previews/index.ts. Everything here comes
 * from the business's own public info (Google listing, Instagram); never invent
 * reviews, prices, awards or years in business.
 */
export type Niche = "home" | "beauty" | "food" | "pro";

export type Preview = {
  /** Unguessable URL part, e.g. "k7d2qm-patel-plumbing". Shown at /p/<slug>. */
  slug: string;
  /** ISO dates. The page 404s after expiresAt (default: created + 14 days). */
  createdAt: string;
  expiresAt: string;
  /** Marks a made-up demo so it is never mistaken for a real client. */
  sample?: boolean;
  niche: Niche;
  business: {
    name: string;
    tagline: string;
    about: string;
    city: string;
    areas?: string[];
    phone?: string;
    whatsapp?: string;
    instagram?: string;
    email?: string;
    hours?: { days: string; time: string }[];
  };
  services: { name: string; desc?: string; price?: string }[];
  /** Files in public/previews/<slug>/ (copied from their own Instagram/Google, private preview only). */
  photos?: { src: string; alt: string }[];
  /** Quoted from their public Google reviews, first name + initial only. */
  reviews?: { text: string; author: string; rating?: number }[];
  /** Brand colours for this business's site. */
  theme: { accent: string; accentInk: string };
};
