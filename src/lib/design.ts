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
 * `persist` is the value to remember in the visitor's cookie, or null when
 * nothing should be saved (manual ?design= previews, or the flag forces a design).
 */
export function resolveDesign(
  query: Query,
  cookieValue: string | undefined,
): { design: Design; persist: Design | null } {
  const override = first(query.design);
  if (override === "new" || override === "old") {
    return { design: override, persist: null };
  }
  if (NEW_DESIGN_MODE === "everyone") return { design: "new", persist: null };
  if (NEW_DESIGN_MODE === "off") return { design: "old", persist: null };

  // lawn_sign_only
  if (first(query.utm_source) === "lawn_sign") {
    return { design: "new", persist: "new" };
  }
  const design: Design = cookieValue === "new" ? "new" : "old";
  return { design, persist: design };
}
