import { contact } from "@/lib/contact";
import { starterPromoCopy } from "@/lib/pricing";

export const siteConfig = {
  name: contact.brand,
  domain: contact.domain,
  url: `https://${contact.domain}`,
  locale: "en_CA",
  language: "en-CA",
  title: "Launch24 — Website in 24 hours. Or it’s free.",
  description: starterPromoCopy.seoDescription,
  ogDescription: starterPromoCopy.seoOg,
  keywords: [
    "website in 24 hours",
    "24 hour website",
    "fast website design",
    "local business website",
    "website Canada",
    "Ontario web design",
    "Launch24",
    "website or it's free",
    "affordable website Canada",
  ],
} as const;
