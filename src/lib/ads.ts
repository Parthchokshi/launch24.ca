/**
 * Google tag setup.
 *
 * - Google Ads (existing): tag AW-… + the "Submit lead form" conversion.
 * - GA4: set NEXT_PUBLIC_GA_MEASUREMENT_ID (G-XXXXXXXXXX). Events are sent in
 *   src/lib/tracking.ts; mark them as key events in GA4 (see README).
 */
export const googleAdsTagId = "AW-18341001020";
export const googleAdsConversionId = "18341001020";
export const googleAdsConversionLabel = "gNk7CODywtQcELzu1alE";
export const ga4MeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fires the Google Ads conversion for the lead form. Client-only. */
export function trackGoogleAdsConversion() {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "conversion", {
    send_to: `${googleAdsTagId}/${googleAdsConversionLabel}`,
    value: 0,
    currency: "CAD",
  });
}

/** 1×1 backup pixel for when gtag.js is blocked. Render on form success. */
export function googleAdsConversionImageUrl() {
  return `https://www.googleadservices.com/pagead/conversion/${googleAdsConversionId}/?value=0&label=${googleAdsConversionLabel}&guid=ON&script=0`;
}
