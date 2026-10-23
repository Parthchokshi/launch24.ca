import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque, JetBrains_Mono, Onest } from "next/font/google";
import { UtmCapture } from "@/components/UtmCapture";
import { contact } from "@/lib/contact";
import { ga4MeasurementId, googleAdsTagId } from "@/lib/ads";
import { siteConfig } from "@/lib/seo";
import "./globals.css";

// NEW design fonts. (The old design's font, Hanken Grotesk, loads only with the old design: src/components/old/font.ts)
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "800"],
  display: "swap",
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08090c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [...siteConfig.keywords],
  category: "business",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.ogDescription,
  },
  other: {
    "contact:email": contact.email,
    "contact:phone_number": `+${contact.phoneE164}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gtagConfig = [
    `gtag('config', '${googleAdsTagId}');`,
    // page_view is sent by UtmCapture so it carries UTMs + design_version.
    ga4MeasurementId
      ? `gtag('config', '${ga4MeasurementId}', { send_page_view: false });`
      : "",
  ].join("\n");

  return (
    <html lang={siteConfig.language} className={`${bricolage.variable} ${onest.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <UtmCapture />
        {children}
        <Analytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId || googleAdsTagId}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
${gtagConfig}`}
        </Script>
      </body>
    </html>
  );
}
