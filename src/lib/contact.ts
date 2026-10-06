/**
 * Single source of truth for contact details.
 * Swap the phone when you buy your number, or set env vars.
 */
const DEFAULT_PHONE_DISPLAY = "437-365-2475";
const DEFAULT_PHONE_E164 = "14373652475";
const DEFAULT_EMAIL = "hi@launch24.ca";

export const contact = {
  brand: "Launch24",
  domain: "launch24.ca",
  email: process.env.NEXT_PUBLIC_EMAIL ?? DEFAULT_EMAIL,
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? DEFAULT_PHONE_DISPLAY,
  phoneE164: (process.env.NEXT_PUBLIC_PHONE ?? DEFAULT_PHONE_E164).replace(
    /\D/g,
    "",
  ),
};

/** Base links (no attribution tag). Clicks add the sign ref in tracking.ts. */
export const links = {
  tel: `tel:+${contact.phoneE164}`,
  sms: `sms:+${contact.phoneE164}`,
  whatsapp: `https://wa.me/${contact.phoneE164}`,
  mailto: `mailto:${contact.email}`,
};
