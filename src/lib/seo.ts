import { contact } from "@/lib/contact";
import { guaranteeSentence } from "@/lib/guarantee";

export const siteConfig = {
  name: contact.brand,
  domain: contact.domain,
  url: `https://${contact.domain}`,
  locale: "en_CA",
  language: "en-CA",
  title: "Launch24: Website in 24 hours. Or it’s free.",
  description: `Custom-designed, mobile-ready websites for local businesses in 24 hours. ${guaranteeSentence}`,
  ogDescription:
    `Custom-designed, mobile-ready websites for local Ontario businesses. ${guaranteeSentence}`,
  keywords: [
    "website in 24 hours",
    "24 hour website",
    "local business website",
    "website Ontario",
    "GTA web design",
    "Launch24",
  ],
} as const;
