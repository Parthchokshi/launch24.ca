# Prospect previews

Pre-built website previews for businesses that don't have a website yet. Claude
finds the lead, builds the preview, and drafts the outreach. The owner (Parth)
approves every message before anything is sent.

## How a preview is made
1. **Lead** comes from the Google Places API search (needs `GOOGLE_PLACES_API_KEY`),
   or Parth sends an Instagram handle / business name.
2. **Data file**: `src/previews/data/<slug>.json` (shape: `src/previews/types.ts`),
   registered in `src/previews/index.ts`.
   - `slug` = 6 random characters + business name, e.g. `k7d2qm-patel-plumbing`, so links can't be guessed.
   - `expiresAt` = 14 days after `createdAt`. After that the page 404s.
   - Only public facts from their own listing or Instagram. **Never invent** reviews,
     prices, years in business or awards. Reviews: first name + initial, marked "Google review".
   - Photos: copy 3–6 of their own photos into `public/previews/<slug>/`.
3. **Page**: `/p/<slug>` renders `PreviewSite` in their accent colour, with the Launch24
   banner ("Preview made for X by Launch24. Not live yet.") and two buttons:
   **Make changes** and **Make it mine**. Both open WhatsApp to Launch24 naming the business.
4. **Ship**: open a PR, merge, and the link is live once Vercel deploys.
5. **Outreach**: Claude drafts the message (DM / WhatsApp / text / email) with the link.
   Parth approves. Approved emails are sent by Claude from hi@launch24.ca; Instagram and
   WhatsApp messages are sent by Parth with one tap.

## Privacy rules
- Not indexed (`noindex`, `/p/` disallowed in robots.txt), not in the sitemap, not linked from the site.
- Take a preview down the same day if the business asks (delete its JSON + photos, merge).
- Delete expired previews and their photos in the weekly clean-up.
- Never register their domain or publish anything in their name before they've paid and agreed.

## Tracking
`preview_view`, `preview_changes_click`, `preview_claim_click` go to the D1 `events`
table with `path = /p/<slug>`:
`SELECT path, name, count(*) FROM events WHERE path LIKE '/p/%' GROUP BY 1, 2;`

## Templates
One template, four business types (`niche`: `home`, `beauty`, `food`, `pro`). Only section
labels and button words change (`src/previews/niches.ts`). `sample-home` is a made-up demo
used for testing.
