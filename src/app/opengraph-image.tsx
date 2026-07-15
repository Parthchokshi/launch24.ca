import { ImageResponse } from "next/og";

export const alt = "Launch24 — Website in 24 hours. Or it’s free.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#eceafd",
          padding: "64px 72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              background: "#191817",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            24
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#191817",
              letterSpacing: "-0.02em",
            }}
          >
            Launch24
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#191817",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 920,
            }}
          >
            A website in 24 hours — or it’s free.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#5b5952",
              maxWidth: 760,
              lineHeight: 1.35,
            }}
          >
            Polished websites for local Canadian businesses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#2f7d54",
            fontWeight: 600,
          }}
        >
          <span>launch24.ca</span>
          <span>437 · 365 · 247 · 5</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
