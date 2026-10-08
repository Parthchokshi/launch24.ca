/**
 * Hero copy for the NEW design. UTM-aware variants are PARKED (commented out);
 * everyone gets the default words.
 */
export const DEFAULT_KICKER = "LOCAL BUSINESS?";
export const DEFAULT_H1 = "WEBSITE IN 24 HOURS. OR IT'S FREE.";

export function heroCopy() {
  return { kicker: DEFAULT_KICKER, h1: DEFAULT_H1 };
}

/* PARKED: lawn-sign UTM variants. To restore, pass the page's searchParams to
 * heroCopy(query) from Hero.tsx and use this instead:
 *
 * export const SIGN_KICKER = "SAW OUR SIGN?";
 * export const V2B_H1 = "NO WEBSITE? WE'LL BUILD IT IN 24 HOURS. OR IT'S FREE.";
 *
 * type Query = Record<string, string | string[] | undefined>;
 * function first(value: string | string[] | undefined) {
 *   const v = Array.isArray(value) ? value[0] : value;
 *   return (v ?? "").trim().toLowerCase();
 * }
 * export function heroCopy(query: Query) {
 *   return {
 *     kicker: first(query.utm_source) === "lawn_sign" ? SIGN_KICKER : DEFAULT_KICKER,
 *     // Only v2b has its own headline; v2a, v2c, and anything else use the default.
 *     h1: first(query.utm_content) === "v2b" ? V2B_H1 : DEFAULT_H1,
 *   };
 * }
 */
