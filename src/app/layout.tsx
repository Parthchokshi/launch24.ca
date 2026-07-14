import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Launch24 — Website in 24 hours. Or it's free.",
  description:
    "Local businesses get a polished one-page website in 24 hours — or it's free. WhatsApp, call, text, or leave a voice note.",
  metadataBase: new URL("https://launch24.ca"),
  openGraph: {
    title: "Launch24 — Website in 24 hours. Or it's free.",
    description:
      "Polished starter websites for local businesses, delivered in 24 hours.",
    url: "https://launch24.ca",
    siteName: "Launch24",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`${fraunces.variable} ${manrope.variable} h-full`}
    >
      <body className="grain min-h-full antialiased">{children}</body>
    </html>
  );
}
