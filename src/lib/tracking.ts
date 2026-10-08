"use client";

/**
 * Analytics events.
 *
 * ACTIVE: track() sends call / text / WhatsApp / form events to Google's tag
 * (gtag). It sets no cookies and stores nothing in the browser.
 *
 * PARKED (commented out below, restore together; see docs/PRD.md §6):
 *  - UTM capture into localStorage/cookie (l24_utm) and attaching UTMs to events/leads
 *  - anonymous visitor id (l24_vid) and the first-party copy of events (/api/event -> D1)
 *  - design_version on events (only needed while two designs are shown)
 *  - the "(ref: source/content)" tag in prefilled text / WhatsApp messages
 */
import { contact } from "@/lib/contact";
import type { Design } from "@/lib/design";

export type Utms = Partial<
  Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_content", string>
>;

type GtagFn = (...args: unknown[]) => void;

export type EventName =
  | "page_view"
  | "cta_call_click"
  | "cta_text_click"
  | "cta_whatsapp_click"
  | "form_submit"
  | "voice_note_start";

/** DISABLED: always empty. (Original implementation below.) */
export function getUtms(): Utms {
  return {};
}

/** DISABLED: does nothing. (Original implementation below.) */
export function captureUtms() {}

/** Which design is on screen, read from the page wrapper's data-design. */
export function getDesignVersion(): Design {
  const el = document.querySelector<HTMLElement>("[data-design]");
  const fromDom = el?.dataset.design;
  return fromDom === "old" ? "old" : "new";
  // PARKED: cookie fallback for pages without the wrapper (e.g. /terms):
  // const m = document.cookie.match(new RegExp(`(?:^|; )${DESIGN_COOKIE}=(new|old)`));
  // return m ? (m[1] as Design) : "old";
}

/** Sends one event to Google's tag. No cookies, no UTMs, no first-party copy. */
export function track(name: EventName, params: Record<string, string> = {}) {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: GtagFn };
  if (!w.gtag) {
    // gtag.js not ready (or blocked): queue exactly like Google's snippet.
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  }
  w.gtag("event", name, { ...params, transport_type: "beacon" });
}

/** DISABLED: no sign tag in prefilled messages. */
export function refTag(): string {
  return "";
}

function prefilled(base: string) {
  const ref = refTag();
  return ref ? `${base} (ref: ${ref})` : base;
}

export const MESSAGE_BASE = "Hi Launch24, I need a website in 24 hours.";

export function smsHref() {
  return `sms:+${contact.phoneE164}?&body=${encodeURIComponent(prefilled(MESSAGE_BASE))}`;
}

export function whatsappHref() {
  return `https://wa.me/${contact.phoneE164}?text=${encodeURIComponent(prefilled(MESSAGE_BASE))}`;
}

/* ====================== PARKED ORIGINAL CODE (UTM / cookies / first-party events) ======================

import { DESIGN_COOKIE } from "@/lib/design";

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const STORAGE_KEY = "l24_utm";
const VISITOR_KEY = "l24_vid";
const MAX_LEN = 100;

function clean(value: string | null) {
  return (value ?? "").trim().slice(0, MAX_LEN);
}

function readCookie(): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${STORAGE_KEY}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function readRaw(): string | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v) return v;
  } catch {}
  try {
    return readCookie();
  } catch {
    return null;
  }
}

function writeRaw(value: string) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {}
  try {
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(value)}; max-age=${60 * 60 * 24 * 30}; path=/; SameSite=Lax`;
  } catch {}
}

export function getUtms(): Utms {
  const raw = readRaw();
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Utms = {};
    for (const key of UTM_KEYS) {
      const v = parsed[key];
      if (typeof v === "string" && v) out[key] = v.slice(0, MAX_LEN);
    }
    return out;
  } catch {
    return {};
  }
}

// A URL that carries UTMs replaces stored ones; a plain visit keeps them.
export function captureUtms() {
  const params = new URLSearchParams(window.location.search);
  const found: Utms = {};
  for (const key of UTM_KEYS) {
    const v = clean(params.get(key));
    if (v) found[key] = v;
  }
  if (Object.keys(found).length > 0) writeRaw(JSON.stringify(found));
}

// Anonymous random id so unique visitors can be counted in our own table.
export function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id =
        typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

// Inside track(): attach UTMs + design_version to the gtag event ...
//   const design_version = getDesignVersion();
//   const utms = getUtms();
//   w.gtag("event", name, { ...utms, design_version, ...params, transport_type: "beacon" });
// ... and send the first-party copy that feeds /report:
//   navigator.sendBeacon("/api/event", new Blob([JSON.stringify({
//     name, visitor_id: getVisitorId(), design_version, path: window.location.pathname, ...utms,
//   })], { type: "application/json" }));

// refTag(): short tag so texts/WhatsApps can be matched to a sign, e.g. "lawn_sign/v2b".
//   export function refTag(utms: Utms = getUtms()) {
//     return [utms.utm_source, utms.utm_content].filter(Boolean).join("/");
//   }

=================================================================================================== */
