"use client";

import { useEffect, useState } from "react";

const TICKS = Array.from({ length: 96 }, (_, i) => {
  const a = (i / 96) * Math.PI * 2;
  const major = i % 4 === 0;
  const r1 = major ? 160 : 165;
  const r2 = 175;
  return {
    i,
    major,
    x1: 200 + Math.sin(a) * r1,
    y1: 200 - Math.cos(a) * r1,
    x2: 200 + Math.sin(a) * r2,
    y2: 200 - Math.cos(a) * r2,
    label: major && i % 24 === 0 ? String(i / 4).padStart(2, "0") : null,
    lx: 200 + Math.sin(a) * 188,
    ly: 204 - Math.cos(a) * 188,
  };
});

function fmt(s: number) {
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
}

/** Decorative 24-hour dial: the hand sweeps and the clock counts down from 24:00:00. */
export function Dial() {
  const [left, setLeft] = useState(86400);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 1 ? s - 1 : 86400)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="dial in d2" aria-hidden>
      <svg viewBox="0 0 400 400">
        <defs>
          <radialGradient id="dial-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ffd60a" stopOpacity=".16" />
            <stop offset="1" stopColor="#ffd60a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="190" fill="url(#dial-glow)" />
        <circle cx="200" cy="200" r="150" fill="#101218" stroke="#232733" />
        {TICKS.map((t) => (
          <g key={t.i}>
            <line
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.major ? "#8f97a8" : "#232733"}
              strokeWidth={t.major ? 2 : 1}
            />
            {t.label && (
              <text x={t.lx} y={t.ly} textAnchor="middle" fontSize="11" fill="#8f97a8" fontFamily="monospace">
                {t.label}
              </text>
            )}
          </g>
        ))}
        <g className="hand">
          <line x1="200" y1="200" x2="200" y2="40" stroke="#ffd60a" strokeWidth="3" strokeLinecap="round" />
          <circle cx="200" cy="40" r="6" fill="#ffd60a" />
        </g>
        <circle cx="200" cy="200" r="5" fill="#ffd60a" />
      </svg>
      <div className="center">
        <span className="big" suppressHydrationWarning>
          {fmt(left)}
        </span>
        <span className="lbl">to your live preview</span>
      </div>
    </div>
  );
}
