import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { guaranteeSentence } from "@/lib/guarantee";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Launch24: Website in 24 hours. Or it’s free.";

/** Shared by opengraph-image and twitter-image: yellow sign, black type, Anton. */
export async function renderOgImage() {
  const anton = await readFile(join(process.cwd(), "src/app/assets/Anton-Regular.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFD60A",
          padding: "56px 72px",
          fontFamily: "Anton",
          color: "#0B0B0B",
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: "#0B0B0B",
              color: "#FFD60A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
            }}
          >
            24
          </div>
          <div style={{ fontSize: 56, letterSpacing: 2 }}>Launch24</div>
        </div>
        <div style={{ display: "flex", fontSize: 112, lineHeight: 1, maxWidth: 1000 }}>
          Website in 24 hours. Or it’s free.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 32 }}>
          <span style={{ display: "flex" }}>{guaranteeSentence}</span>
          <span style={{ display: "flex", justifyContent: "space-between", fontSize: 40 }}>
            <span>launch24.ca</span>
            <span>437-365-2475</span>
          </span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Anton", data: anton, style: "normal", weight: 400 }] },
  );
}
