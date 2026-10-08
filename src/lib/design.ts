import { NEW_DESIGN_MODE } from "@/lib/flags";

export type Design = "new" | "old";

export const DESIGN_COOKIE = "l24_design";
export const DESIGN_COOKIE_DAYS = 30;

type Query = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  const v = Array.isArray(value) ? value[0] : value;
  return (v ?? "").trim().toLowerCase();
}

/**
 * Decide which home-page design to render.
 * `persist` is the value to remember in a cookie, or null for nothing.
 * Cookies are DISABLED for now, so `persist` is always null.
 */
export function resolveDesign(query: Query): {
  design: Design;
  persist: Design | null;
} {
  // Manual preview: ?design=new / ?design=old (never remembered).
  const override = first(query.design);
  if (override === "new" || override === "old") {
    return { design: override, persist: null };
  }
  return { design: NEW_DESIGN_MODE === "off" ? "old" : "new", persist: null };

  /* PARKED (lawn_sign_only mode): UTM-based choice + 30-day cookie.
   * To restore: add "lawn_sign_only" to NewDesignMode in flags.ts, bring back the
   * `cookieValue` argument (page.tsx reads cookies() and renders <DesignPersist/>),
   * and use this logic instead of the return above.
   *
   * if (first(query.utm_source) === "lawn_sign") {
   *   return { design: "new", persist: "new" };
   * }
   * const design: Design = cookieValue === "new" ? "new" : "old";
   * return { design, persist: design };
   */
}
