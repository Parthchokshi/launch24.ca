import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Launch24 — Website in 24 hours. Or it's free.",
  description:
    "Local businesses get a professional one-page website in 24 hours — or it's free. WhatsApp, call, text, or leave a voice note.",
  metadataBase: new URL("https://launch24.ca"),
  openGraph: {
    title: "Launch24 — Website in 24 hours. Or it's free.",
    description:
      "Professional starter websites for local businesses. Delivered in 24 hours after deposit and intake.",
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
    <html lang="en-CA" className={`${syne.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
