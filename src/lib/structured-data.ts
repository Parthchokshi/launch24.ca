import { contact } from "@/lib/contact";
import { faqs } from "@/lib/faqs";
import { pricing, starterPromoCopy } from "@/lib/pricing";
import { siteConfig } from "@/lib/seo";

const orgId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;
const serviceId = `${siteConfig.url}/#service`;

export function homePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: contact.brand,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon.svg`,
        email: contact.email,
        telephone: `+${contact.phoneE164}`,
        areaServed: {
          "@type": "Country",
          name: "Canada",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: `+${contact.phoneE164}`,
            contactType: "sales",
            email: contact.email,
            areaServed: "CA",
            availableLanguage: ["English"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: contact.brand,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        isPartOf: { "@id": websiteId },
        about: { "@id": serviceId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/opengraph-image`,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: "Launch24 24-hour website service",
        description: siteConfig.description,
        url: siteConfig.url,
        provider: { "@id": orgId },
        areaServed: {
          "@type": "Country",
          name: "Canada",
        },
        serviceType: "Website design and development",
        offers: {
          "@type": "Offer",
          name: "Launch Package in 24 hours",
          description: `First version of an agreed Launch Package delivered within 24 hours of clock start, or your deposit is refunded. ${starterPromoCopy.short}`,
          url: `${siteConfig.url}/#pricing`,
          availability: "https://schema.org/InStock",
          price: String(pricing.starterFrom),
          priceCurrency: pricing.currency,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };
}
