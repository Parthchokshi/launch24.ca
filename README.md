# Launch24

Marketing site for **launch24.ca** — websites in 24 hours, or it's free.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Resend for lead emails (voice note attached)
- Cloudflare D1 (`launch24` database) for leads and events, to count leads per sign variant
- Google Analytics 4 + Google Ads tags

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Change your phone number

Edit `src/lib/contact.ts`, or set env vars (preferred for production):

```bash
NEXT_PUBLIC_PHONE=14373652475
NEXT_PUBLIC_PHONE_DISPLAY="437-365-2475"
NEXT_PUBLIC_EMAIL=hi@launch24.ca
```

`NEXT_PUBLIC_PHONE` should be digits only (country code + number) for `tel:`, `sms:`, and WhatsApp links.

## Lead form + email (Resend)

1. Create a [Resend](https://resend.com) account and API key.
2. Verify the `launch24.ca` domain in Resend (DNS records).
3. Copy `.env.example` → `.env.local` and fill in:

```bash
RESEND_API_KEY=re_xxx
RESEND_FROM="Launch24 <hi@launch24.ca>"
```

Without `RESEND_API_KEY`, the API logs leads to the server console so you can still demo the UI.

## Leads table + per-variant counts

Leads and events are stored in the Cloudflare D1 database `launch24`
(schema in `docs/leads.sql`, already applied). The site reaches it over
Cloudflare's HTTP API, so set these in Vercel:
`CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_D1_DATABASE_ID`, `CLOUDFLARE_API_TOKEN`
(create a token with the **D1 Edit** permission, scoped to this account).
Run `SELECT * FROM leads_by_variant;` in the Cloudflare dashboard to see leads
per `utm_source` / `utm_campaign` / `utm_content`. A lead is accepted if either
email or the database succeeds.

## Analytics (GA4)

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Events, each carrying the stored UTMs:
`cta_call_click`, `cta_text_click`, `cta_whatsapp_click`, `form_submit`,
`voice_note_start`. Marking events as conversions is done in GA4, not in code:
Admin → Events → toggle "Mark as key event" once they appear.

UTMs are saved to localStorage (`l24_utm`) on load. Text and WhatsApp links get
a `(ref: source/content)` tag in the pre-filled message so those leads can be
attributed too.

## Two home-page designs (one URL)

`src/lib/flags.ts` is the one place to change:

- `NEW_DESIGN_MODE`: `"lawn_sign_only"` (default) | `"everyone"` | `"off"`.
  In `lawn_sign_only`, `?utm_source=lawn_sign` shows the NEW design; everyone
  else sees the CURRENT one. The choice is remembered in the `l24_design`
  cookie for 30 days.
- `SHOW_PORTFOLIO`: `false` hides the "Our work" section (testimonials / sample
  sites from `src/lib/proof.ts`) on the new design.

Preview with `?design=new` or `?design=old` (not remembered). Both designs use
the same URL and the canonical `https://launch24.ca/`. Code: current design in
`src/components/old/`, new in `src/components/new/`, switch in `src/app/page.tsx`
and `src/lib/design.ts`.

New-design hero variants: `utm_source=lawn_sign` → kicker "SAW OUR SIGN?";
`utm_content=v2b` → the "NO WEBSITE?" headline (`src/lib/hero.ts`).

## Comparing the designs

Every event and form submission carries `design_version` (`new`/`old`) plus the
four UTMs, in GA4, in the lead email, and in D1 (`events` + `leads`).
With the three `CLOUDFLARE_*` variables and `REPORT_KEY` set, open `/report?key=<REPORT_KEY>` for
visitors, call/text/WhatsApp clicks and form submissions per design and
`utm_content` (or `SELECT * FROM design_report;`). In GA4, register
`design_version` and `utm_content` as custom dimensions to split there too.

## Deploy (Vercel)

```bash
npx vercel
```

Set the same env vars in the Vercel project settings. Point `launch24.ca` DNS to Vercel when ready.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Local development        |
| `npm run build`| Production build         |
| `npm run start`| Serve production build   |
| `npm run lint` | ESLint                   |

## Guarantee copy

Clock starts after deposit + intake + content (or “we write copy”) + scope lock. Full wording: `/terms`.
# launch24.ca
