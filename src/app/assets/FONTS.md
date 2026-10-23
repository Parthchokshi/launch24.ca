# Bundled fonts

Used only by the generated share images and Apple icon (`src/lib/og.tsx`, `src/app/apple-icon.tsx`).
The site itself loads its fonts through `next/font/google`.

| File | Font | Licence |
|---|---|---|
| `BricolageGrotesque-ExtraBold.woff` | Bricolage Grotesque, 96pt ExtraBold (800), Latin subset | SIL Open Font License 1.1 |
| `Onest-Medium.woff` | Onest Medium (500), Latin subset | SIL Open Font License 1.1 |
| `JetBrainsMono-Medium.woff` | JetBrains Mono Medium (500), Latin subset | SIL Open Font License 1.1 |

Downloaded from Google Fonts. WOFF, not WOFF2, because the image renderer (Satori) can't read WOFF2.
