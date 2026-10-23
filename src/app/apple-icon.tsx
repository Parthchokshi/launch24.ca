import { ImageResponse } from "next/og";
import { nightShiftFonts } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the gold "24" square from the site logo (iOS rounds the corners). */
export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFD60A",
          color: "#08090C",
          fontSize: 100,
          fontFamily: "Bricolage",
          letterSpacing: -3,
        }}
      >
        24
      </div>
    ),
    { ...size, fonts: await nightShiftFonts() },
  );
}
