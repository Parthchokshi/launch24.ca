import { contact } from "@/lib/contact";
import { formatCad, pricing } from "@/lib/pricing";

export const siteConfig = {
  name: contact.brand,
  domain: contact.domain,
  url: `https://${contact.domain}`,
  locale: "en_CA",
  language: "en-CA",
  title: "Launch24: Website in 24 hours. Or it’s free.",
  description: `A custom-designed, mobile-ready website for your local business in 24 hours, or it’s free. ${formatCad(pricing.launchPackage)} CAD one-time. You own it. Call, text, or send a voice note.`,
  ogDescription:
    "Custom-designed, mobile-ready websites for local Ontario businesses. Live in 24 hours, or it’s free.",
  keywords: [
    "website in 24 hours",
    "24 hour website",
    "local business website",
    "website Ontario",
    "GTA web design",
    "Launch24",
  ],
} as const;
