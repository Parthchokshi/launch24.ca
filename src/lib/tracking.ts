"use client";

/**
 * First-party attribution + analytics events.
 *
 * - captureUtms() stores utm_* params from the landing URL in localStorage
 *   (cookie fallback if storage is blocked). A URL that carries UTMs
 *   replaces what was stored, so scanning a sign always wins; a plain visit
 *   keeps the earlier values.
 * - track() sends a GA4 event with the stored UTMs attached.
 */
import { contact } from "@/lib/contact";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

export type Utms = Partial<Record<(typeof UTM_KEYS)[number], string>>;

const STORAGE_KEY = "l24_utm";
const MAX_LEN = 100;

type GtagFn = (...args: unknown[]) => void;

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

export function captureUtms() {
  const params = new URLSearchParams(window.location.search);
  const found: Utms = {};
  for (const key of UTM_KEYS) {
    const v = clean(params.get(key));
    if (v) found[key] = v;
  }
  if (Object.keys(found).length > 0) writeRaw(JSON.stringify(found));
}

export type EventName =
  | "cta_call_click"
  | "cta_text_click"
  | "cta_whatsapp_click"
  | "form_submit"
  | "voice_note_start";

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
  w.gtag("event", name, {
    ...getUtms(),
    ...params,
    transport_type: "beacon",
  });
}

/** Short tag so texts/WhatsApps can be matched to a sign variant, e.g. "lawn_sign/v2b". */
export function refTag(utms: Utms = getUtms()) {
  const parts = [utms.utm_source, utms.utm_content].filter(Boolean);
  return parts.join("/");
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
