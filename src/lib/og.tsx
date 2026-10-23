import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { contact } from "@/lib/contact";
import { guaranteeSentence } from "@/lib/guarantee";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Launch24: Website in 24 hours. Or it’s free.";

const asset = (name: string) => readFile(join(process.cwd(), "src/app/assets", name));

/** Night Shift fonts for share images and icons (static Latin subsets; Satori reads WOFF, not WOFF2). */
export async function nightShiftFonts() {
  const [display, body, mono] = await Promise.all([
    asset("BricolageGrotesque-ExtraBold.woff"),
    asset("Onest-Medium.woff"),
    asset("JetBrainsMono-Medium.woff"),
  ]);
  return [
    { name: "Bricolage", data: display, style: "normal" as const, weight: 800 as const },
    { name: "Onest", data: body, style: "normal" as const, weight: 500 as const },
    { name: "Mono", data: mono, style: "normal" as const, weight: 500 as const },
  ];
}

const BG = "#08090C";
const FG = "#EEF0F5";
const MUTED = "#8F97A8";
const LINE = "#232733";
const GOLD = "#FFD60A";

/** Shared by opengraph-image and twitter-image: the site's dark "Night Shift" look. */
export async function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: BG,
          backgroundImage: "radial-gradient(circle at 88% 18%, rgba(255,214,10,0.22), rgba(255,214,10,0) 46%)",
          padding: "56px 72px",
          fontFamily: "Onest",
          color: FG,
          overflow: "hidden",
        }}
      >
        {/* 24-hour dial, partly off the right edge */}
        <div
          style={{
            position: "absolute",
            right: -150,
            top: 90,
            width: 520,
            height: 520,
            borderRadius: 9999,
            border: `2px solid ${LINE}`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -110,
            top: 130,
            width: 440,
            height: 440,
            borderRadius: 9999,
            border: `6px solid ${LINE}`,
            borderTopColor: GOLD,
            borderRightColor: GOLD,
            transform: "rotate(-20deg)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 14,
                background: GOLD,
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Bricolage",
                fontSize: 30,
              }}
            >
              24
            </div>
            <div style={{ fontFamily: "Bricolage", fontSize: 38, letterSpacing: 1 }}>LAUNCH24</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Bricolage",
              fontSize: 104,
              lineHeight: 0.98,
              letterSpacing: -3,
            }}
          >
            <span style={{ display: "flex" }}>Website in</span>
            <span style={{ display: "flex", color: GOLD }}>24 hours.</span>
            <span style={{ display: "flex" }}>Or it’s free.</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <span
              style={{
                display: "flex",
                fontSize: 28,
                paddingLeft: 16,
                borderLeft: `3px solid ${GOLD}`,
                maxWidth: 820,
              }}
            >
              {guaranteeSentence}
            </span>
            <span style={{ display: "flex", fontFamily: "Mono", fontSize: 26, color: MUTED, letterSpacing: 2 }}>
              {`${contact.domain.toUpperCase()}  ·  ${contact.phoneDisplay}`}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await nightShiftFonts() },
  );
}
