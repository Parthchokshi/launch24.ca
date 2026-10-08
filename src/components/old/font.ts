import { Hanken_Grotesk } from "next/font/google";

/** The old design's font. Imported only by OldHome so the default site doesn't load it. */
export const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
