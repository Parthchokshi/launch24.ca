# Prospect previews

Bespoke website previews for businesses that don't have a website yet. Claude
finds the lead, builds the preview, and drafts the outreach. The owner (Parth)
approves every message before anything is sent.

## How a preview is made
1. **Lead** comes from the lead sheet ("Launch24 lead pipeline" Google Sheet), fed by the
   Google Places API search (needs `GOOGLE_PLACES_API_KEY`) and lists Parth sends.
2. **Facts file**: Place Details (hours, rating, reviews, address, phone, links) saved as
   `kit/<slug>.json` in a working folder. Only these facts may appear on the site.
3. **Design**: one hand-built HTML page per business, following `docs/previews-kit/BRIEF.md`
   (truth rules, craft bar, checks). Every page has its own look and one interactive idea
   drawn from what its reviews praise. Stock photos are labelled "Sample photos. We'll use yours."
4. **Shared Launch24 layer**: paste `docs/previews-kit/l24-layer.html` verbatim, between its
   `Launch24 preview layer` markers, with a `window.L24CFG` for the business. It holds the
   preview bar, the **Make it yours** drawer (colours, edits, $699, guarantee, Stripe Pay link,
   WhatsApp Parth). Fix the layer once and re-paste it into every page.
5. **Host it** (this repo):
   - Slug = 6 random characters + name, e.g. `bxzoza-keyfades`, so links can't be guessed.
   - Image paths become absolute: `img/x.jpg` → `/p/<slug>/img/x.jpg`; photos go to `public/p/<slug>/img/`.
   - Add `<!doctype html>`, viewport, `<meta name="robots" content="noindex, nofollow, noarchive">`
     and `docs/previews-kit/track.html` (open / pay / WhatsApp events) at the end.
   - Save as `src/previews/sites/<slug>.html` and add an entry to `src/previews/index.ts`
     (`expiresAt` = 14 days after `createdAt`; the page 404s after that day).
   - Open a PR, merge, and the link is live once Vercel deploys: `https://launch24.ca/p/<slug>`.
6. **Outreach**: Claude drafts the message with the link (Parth is Markham-based; use the
   exact guarantee sentence; include "Reply STOP and I won't message again."). Parth approves.
   Parth sends Instagram, WhatsApp and text messages; approved emails can be sent from hi@launch24.ca.

## Privacy rules
- Not indexed (meta + `X-Robots-Tag`, `/p/` disallowed in robots.txt), `no-store`, not in the
  sitemap, not linked from the site.
- Take a preview down the same day if the business asks: delete its entry in
  `src/previews/index.ts`, its HTML file and `public/p/<slug>/`, then merge.
- Delete expired previews and their photos in the weekly clean-up.
- Never register their domain or publish anything in their name before they've paid and agreed.

## Tracking
`preview_view`, `preview_changes_click` (WhatsApp Parth), `preview_claim_click` (Pay $699) go to
the D1 `events` table with `path = /p/<slug>` (our own test visits count too):
`SELECT path, name, count(*) FROM events WHERE path LIKE '/p/%' GROUP BY 1, 2;`
