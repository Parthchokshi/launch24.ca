import type { Metadata } from "next";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Launch24 — Website in 24 hours. Or it’s free.",
  description:
    "Local businesses get a polished website in 24 hours — or it’s free. WhatsApp, call, text, or leave a voice note.",
  metadataBase: new URL("https://launch24.ca"),
  openGraph: {
    title: "Launch24 — Website in 24 hours. Or it’s free.",
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
      className={`${instrumentSerif.variable} ${hankenGrotesk.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
