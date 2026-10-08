/**
 * UTM-aware hero copy. Runs on the server so the right words are in the
 * first HTML, with no flash of the default headline.
 */
export const DEFAULT_KICKER = "LOCAL BUSINESS?";
export const SIGN_KICKER = "SAW OUR SIGN?";
export const DEFAULT_H1 = "WEBSITE IN 24 HOURS. OR IT'S FREE.";
export const V2B_H1 = "NO WEBSITE? WE'LL BUILD IT IN 24 HOURS. OR IT'S FREE.";

type Query = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  const v = Array.isArray(value) ? value[0] : value;
  return (v ?? "").trim().toLowerCase();
}

export function heroCopy(query: Query) {
  return {
    kicker: first(query.utm_source) === "lawn_sign" ? SIGN_KICKER : DEFAULT_KICKER,
    // Only v2b has its own headline; v2a, v2c, and anything else use the default.
    h1: first(query.utm_content) === "v2b" ? V2B_H1 : DEFAULT_H1,
  };
}
