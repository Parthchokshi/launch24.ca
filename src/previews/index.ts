import type { Preview } from "@/previews/types";
import sampleHome from "@/previews/data/sample-home.json";

/** Every preview, by slug. Add a JSON file to ./data and list it here. */
const all = [sampleHome] as Preview[];

export const previews = new Map(all.map((p) => [p.slug, p]));

export function getPreview(slug: string, now = new Date()) {
  const p = previews.get(slug);
  if (!p) return null;
  return new Date(p.expiresAt) < now ? null : p;
}
