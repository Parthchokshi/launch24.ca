/**
 * Google Ads conversion tracking.
 *
 * The tag ID (AW-…) loads gtag.js globally — see src/app/layout.tsx.
 * The conversion label identifies the specific conversion action
 * (e.g. "Lead form submitted") configured in your Google Ads account.
 *
 * Conversion action: "Submit lead form (1)" (Click / event snippet).
 */
export const googleAdsTagId = "AW-18341001020";
export const googleAdsConversionId = "18341001020";
export const googleAdsConversionLabel = "gNk7CODywtQcELzu1alE";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fires a Google Ads conversion event for the lead form. Client-only;
 * no-ops on the server and silently skips if gtag hasn't loaded yet
 * (e.g. blocked by an ad blocker).
 */
export function trackGoogleAdsConversion() {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "conversion", {
    send_to: `${googleAdsTagId}/${googleAdsConversionLabel}`,
    value: 0,
    currency: "CAD",
  });
}

/**
 * Backup image pixel for the conversion. Renders as a 1×1 invisible image
 * so it fires even when gtag.js is blocked by an ad blocker (it loads from
 * a different domain than googletagmanager.com). Render it in the success
 * state of the lead form.
 */
export function googleAdsConversionImageUrl() {
  return `https://www.googleadservices.com/pagead/conversion/${googleAdsConversionId}/?value=0&label=${googleAdsConversionLabel}&guid=ON&script=0`;
}
