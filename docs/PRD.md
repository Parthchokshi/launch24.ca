# Launch24 — Product Requirements & Source of Truth

> **Last updated:** 2026-10-08
> This is the single source of truth for what launch24.ca is, what it does today, and why.
> **Claude Code must read this before working, and update it in the same commit as any
> change that affects behavior, a decision, a setting, or a removed feature.**
> Never put secret values in this file (names of settings only).

## How to keep this file current
- Changed behavior or design → update **§3 Current state** (and **§4 Settings** if a flag/env var is involved).
- Made, reversed, or replaced a decision → add a dated entry to **§5 Decisions**. If it replaces an older one, mark the old one `SUPERSEDED by …` and keep it. Do not delete history.
- Removed or hid a feature → add it to **§6 Removed / parked** with the reason and how to bring it back.
- Something is waiting on the owner or unverified → **§7 Open items**. Remove it when resolved.
- Every change → one line at the top of **§8 Change log** (newest first).

---

## 1. Product and goal
**Launch24** sells custom websites for local Canadian businesses (GTA / Ontario): *"Website in 24 hours. Or it's free."*
Visitors mostly arrive by scanning a QR code on a lawn sign, on a phone. Everyone now sees the same site: the yellow/black design that matches the sign.

**One goal:** get the visitor to call, text, WhatsApp, or send a voice note within ~30 seconds. No long form above the fold.

**Offer:** Launch Package, **$699 CAD one-time**. Includes responsive design, contact form, basic SEO, homepage copy, one revision round. Free proposal first, deposit only when work starts, the client owns the site. Bigger projects → custom quote.

**Guarantee (exact sentence, use verbatim wherever the guarantee is stated):**
> "If we miss the 24 hours, you pay nothing. Your deposit is refunded in full."
>
> Source constant: `src/lib/guarantee.ts`. The headline "Website in 24 hours. Or it's free." may stay as a headline.

**24-hour clock:** starts when deposit, intake, and content (or "we write it") are all in. It waits on client replies; domain/DNS delays and revision rounds don't count. Full rules: `/terms`.

**Brand:** yellow `#FFD60A` + near-black `#0B0B0B` (+ white), flat colour blocks, no gradients or stock photos. Headlines Anton (all caps), body Archivo, black "24" square logo + LAUNCH24 wordmark. Tone: plain, confident, no jargon. **Never use fake stats or fake testimonials.**
Contact: phone 437-365-2475 (`tel:`, `sms:`, WhatsApp `wa.me/14373652475`), email hi@launch24.ca.

## 2. Stack and hosting
- Next.js 16.2.10 (App Router), React 19, Tailwind CSS 4, TypeScript. **Next 16 has breaking changes: read `node_modules/next/dist/docs/` before writing Next code** (see `AGENTS.md`).
- Hosting: Vercel project `launch24-ca`; production deploys from `main`. Preview deploys do **not** have the storage env vars.
- Email: Resend. Storage: Cloudflare D1 database `launch24` (HTTP API). Analytics: Google Ads tag, GA4 (not active yet), Vercel Web Analytics.
- Fonts via `next/font/google`: Anton + Archivo (default design). Hanken Grotesk belongs to the parked old design and loads only when that design is shown (`src/components/old/font.ts`).

## 3. Current state

### 3.1 One URL, one default design (old design parked)
`/` renders the **NEW** yellow/black design (`src/components/new/`) for **everyone**. Canonical `https://launch24.ca/`. The page renders per request because it reads `searchParams` (UTM-aware hero copy and the `?design=` preview).
- Switch: `NEW_DESIGN_MODE` in `src/lib/flags.ts` (`"everyone"` default, or `"off"` to show the OLD design to everyone). Logic: `resolveDesign()` in `src/lib/design.ts`; page: `src/app/page.tsx`. No cookie is involved in choosing a design.
- `?design=old` / `?design=new` force a version for previewing.
- The **OLD** (original lavender) design is **parked**: code kept in `src/components/old/`, loaded only when shown (dynamic import; its font loads only then). It does not appear on the live site.
- Each design is wrapped in `.design-new` / `.design-old` with its own CSS variables (`src/app/globals.css`) so they can't affect each other.
- `/terms` and `/privacy` use the NEW styling.

### 3.2 NEW design (`src/components/new/`)
Order: Hero → "Rather we call you?" form → How it works (4 steps) → Pricing → Guarantee box → FAQ (6) → *[Our work — hidden, see §6]* → Final CTA → Footer. Sticky bottom bar (Call + Text) on mobile.
- **Hero:** kicker, H1, "Custom-designed. Mobile-ready. You own it.", the guarantee sentence, three equal stacked buttons (Call / Text us / WhatsApp), then "Send a 30-second voice note" (scrolls to the form and focuses Record; does not auto-start the mic). Must fit above the sticky bar on a 375×667 phone, including the long v2b headline (verified).
- **Hero variants** (`src/lib/hero.ts`, decided server-side): `utm_source=lawn_sign` → kicker "SAW OUR SIGN?" (default "LOCAL BUSINESS?"). `utm_content=v2b` → H1 "NO WEBSITE? WE'LL BUILD IT IN 24 HOURS. OR IT'S FREE."; v2a/v2c/other → default H1 "WEBSITE IN 24 HOURS. OR IT'S FREE.".
- **Form** (`LeadForm.tsx`): fields NAME, PHONE (`type=tel`), BUSINESS NAME, each a real `<label>`+`<input>` with autocomplete `name` / `tel` / `organization`. Then a dropdown "How did you hear about us?" (optional in behavior, but the label deliberately does **not** say "optional"; it is never required) (`heard_from`: Lawn sign, Google, Friend or family, Facebook or Instagram, WhatsApp, Other; one shared list in `src/lib/heard-from.ts`, same dropdown on the CURRENT form; never preselected, so the answer is genuinely self-reported). Optional voice note: record in browser or upload audio (max 8 MB; recording max 2 min). Button text "Call me back", disabled while sending (also guarded against double-tap). Success: **"Got it. We'll call you back as soon as we can."** (never promise a specific time). Honeypot field `_hp`.
- **Accessibility:** tap targets ≥ 48px, 4.5:1 contrast, visible focus states, skip link.
- Text and WhatsApp buttons rewrite their links at click time to add `(ref: <utm_source>/<utm_content>)` to the prefilled message so texts can be traced to a sign.

### 3.3 OLD design (parked) (`src/components/old/`)
The original lavender site: Hero, Process, Pricing, FAQ, GetStarted (call/WhatsApp/text/email + form). **Not shown** unless `NEW_DESIGN_MODE = "off"` or `?design=old`. Its form needs phone + email + (note or voice memo) and has the "How did you hear about us?" dropdown. It has click events for call/text/WhatsApp (`OldClickTracking`). Its copy uses older wording (e.g. "You don't pay"); the one-sentence guarantee rule applies to the NEW design only.

### 3.4 Tracking and attribution
- **UTMs:** `utm_source/medium/campaign/content` saved on first load to localStorage key `l24_utm` (cookie fallback, 30 days). A URL that carries UTMs replaces stored ones; a plain visit keeps them. Code: `src/lib/tracking.ts`, mounted via `UtmCapture` in the root layout.
- **Every event and form submission carries the four UTMs and `design_version`** (`new`, or `old` while previewing the parked design). `design_version` is read from `data-design` on the page wrapper; pages without it (terms, privacy) count as `new`.
- **Events:** `page_view`, `cta_call_click`, `cta_text_click`, `cta_whatsapp_click`, `voice_note_start`, `form_submit`. Sent to GA4 via `gtag` and, as a first-party copy, to `/api/event` → D1 table `events` (with an anonymous visitor id in localStorage `l24_vid`).
- **GA4:** loads only if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set; its automatic page_view is turned off (we send our own). Marking events as conversions must be done in the GA4 admin UI (not in code).
- **Google Ads:** tag `AW-18341001020` loads on every page; the lead-form conversion fires on a successful submit (plus a backup pixel). Config in `src/lib/ads.ts`.
- **Vercel Web Analytics:** `<Analytics />` in the root layout (page views/visitors only).
- No cookie is set by us. Storage used: `l24_utm`, `l24_vid` (localStorage; UTMs also fall back to a cookie of the same name if storage is blocked).

### 3.5 Leads and storage
- `POST /api/lead` (both forms; the new form sends `design_version=new`). Validation depends on `design_version`: **new** = name + phone (≥7 digits) + business; **old** = phone + email + (message or voice note). Voice note max 8 MB.
- Each lead is **emailed to hi@launch24.ca** (Resend; voice note attached; includes UTMs, `design_version`, "Heard about us", page URL) **and** inserted into D1 `leads`. The visitor sees success if either worked. If neither is configured on a deployed site, the form returns an error instead of faking success.
- D1 `launch24` (id `4bc0863d-2e5d-46f3-8e2c-7027aa065ab9`): tables `leads` (incl. `heard_from` from both forms; blank when unanswered; unknown values are stored as blank), `events`; views `design_report`, `leads_by_variant`. Schema: `docs/leads.sql` (already applied). Code: `src/lib/leads-db.ts`.
- Voice notes are **not** stored in D1, only emailed.

### 3.6 `/report`
Private page (`/report?key=<REPORT_KEY>`, 404 without the right key; noindex; disallowed in robots). Table per `design_version` × `utm_content`: visitors (unique browsers loading `/`), call / text / WhatsApp clicks, form submissions. All time. Same data: `SELECT * FROM design_report;` in D1.

### 3.7 SEO and metadata
Title "Launch24: Website in 24 hours. Or it's free." Meta and OG descriptions contain the guarantee sentence. Canonical `https://launch24.ca/` is set as an explicit `<link>` in `src/app/page.tsx` (Next trims the slash from metadata canonicals). OG/Twitter images (Anton, yellow, include the guarantee sentence), favicon (black square, yellow 24), Apple icon, manifest, sitemap, robots, JSON-LD (Organization, WebSite, ProfessionalService with offer, FAQPage). Terms and Privacy links in every footer.

## 4. Settings and where they live
| Setting | Where | Notes |
|---|---|---|
| `NEW_DESIGN_MODE` = `"everyone"` \| `"off"` | `src/lib/flags.ts` | Default `"everyone"` (new design for all). `"off"` = old design for all. Redeploy after changing. |
| `SHOW_PORTFOLIO` = `false` | `src/lib/flags.ts` | Shows "Our work" on the NEW design. Content in `src/lib/proof.ts`. |
| Contact details | `src/lib/contact.ts` (+ `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_PHONE_DISPLAY`, `NEXT_PUBLIC_EMAIL`) | |
| Pricing, package list | `src/lib/pricing.ts` (new) / `src/lib/old/pricing.ts` (current) | |
| Guarantee sentence | `src/lib/guarantee.ts` | |
| Hero copy rules | `src/lib/hero.ts` | |
| Env (production): `RESEND_API_KEY`, `RESEND_FROM` | Vercel | Lead email |
| Env (production): `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_D1_DATABASE_ID`, `CLOUDFLARE_API_TOKEN` | Vercel | D1 storage; token needs D1 Edit |
| Env (production): `REPORT_KEY` | Vercel | Unlocks `/report` |
| Env (not set yet): `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Vercel | Turns GA4 on; redeploy after setting (build-time value) |
| Browser storage keys | `l24_utm` (UTMs, 30d cookie fallback), `l24_vid` (visitor id) | Disclosed on `/privacy`. No design cookie. |

## 5. Decisions
Newest first. Superseded entries are kept.

- **2026-10-08 — NEW (yellow/black) design is the default for everyone; old design parked.** `NEW_DESIGN_MODE = "everyone"`. Owner said UTM/cookie tracking is fine to keep wherever it serves the new design, so **UTM capture, UTM-aware hero, UTMs on events/leads, visitor id, first-party events, `/report`, and sign ref tags stay ON**. **Removed as no longer relevant:** the design cookie (`l24_design`) and the "new design only for lawn-sign visitors" mode, since there is one default design. (A same-day attempt to park all tracking was reversed on the owner's say-so.)

- **2026-10-08 — Ask "How did you hear about us?" on BOTH forms (new and current).** Never required, but the label does not say "(optional)" so it feels like a normal question. Self-reported source complements `utm_source=lawn_sign`: the UTM says which link they scanned, the answer says what they remember. Not preselected even for lawn-sign visitors, to avoid biasing it. Stored in its own `heard_from` column (not only emailed) so answers can be counted per design and compared with `utm_source`. Query: `SELECT heard_from, count(*) FROM leads GROUP BY 1;`

- **2026-10-07 — Keep this PRD as the source of truth.** `docs/PRD.md`, imported by `CLAUDE.md`, updated in the same commit as every change; a Stop hook (`.claude/hooks/prd-check.sh`) warns if `src/` changed without it.
- **2026-10-07 — Store leads/events in Cloudflare D1.** Replaces Postgres/Neon (see below). The site calls D1's HTTP API from Vercel; Claude's MCP connection can't be used at runtime.
- **2026-10-07 — Add Vercel Web Analytics** for page views/visitors only. Custom events stay in GA4 and D1 (Vercel custom events need a paid plan).
- **2026-10-07 — One guarantee sentence everywhere** (exact text in §1). Step 4 of "How it works" became "You're live" and the FAQ/final CTA use the sentence, so "or it's free" stands alone only in headlines.
- ~~**2026-10-07 — NEW design only for lawn-sign visitors (for now).**~~ **SUPERSEDED by the 2026-10-08 default-design decision (mode and cookie removed).** Flag `NEW_DESIGN_MODE`; same URL and canonical; 30-day cookie so a visitor keeps their version; `?design=` for previews.
- **2026-10-07 — Compare designs with a first-party events table + `/report`**, because GA4 can't be queried from here and Vercel Analytics lacks custom events.
- **2026-10-07 — Success message does not promise a time.** "We'll call you back as soon as we can" replaces "within the hour".
- **2026-10-06 — Single-page, conversion-first redesign** with Anton/Archivo, flat yellow/black blocks, mobile-first, big tap targets, sticky Call/Text bar.
- **2026-10-06 — Render `/` per request** (not static) so the hero kicker/H1 are correct in the first HTML for lawn-sign/v2b visitors, with no flash. Load time not yet measured against the 2 s target.
- **2026-10-06 — UTM rule:** a URL with UTMs overwrites stored ones, otherwise keep stored (so scanning a sign always wins).
- **2026-10-06 — Voice-note link scrolls to the form and focuses Record** instead of auto-starting the microphone (no surprise permission prompt).
- **2026-10-06 — Form is Name / Phone / Business** (email dropped); voice note optional.
- **2026-10-06 — Lead accepted if email OR database succeeds**, so one outage doesn't lose a lead.
- ~~**2026-10-06 — Store leads in Postgres (Neon).**~~ **SUPERSEDED by the 2026-10-07 D1 decision.** Never deployed.

## 6. Removed / parked
| What | Status | Why | How to bring back |
|---|---|---|---|
| Design cookie (`l24_design`) and the "new design only for lawn-sign visitors" mode | **Removed** 2026-10-08 | One default design now; nothing to remember | Git history (commits before 2026-10-08 "Make the new design the default"); would need `DesignPersist` + UTM-based `resolveDesign` |
| OLD (lavender) design | **Parked** (code kept, not shown) | New design is the main one | `NEW_DESIGN_MODE = "off"` for everyone, or `?design=old` to preview |
| "Our work" section with Placeholder 1/2/3 (NEW design) | **Hidden** (code kept) | No real testimonials/sample sites yet; placeholders looked unfinished | Add real entries to `src/lib/proof.ts`, set `SHOW_PORTFOLIO = true` |
| Email field on the NEW form | Removed | Spec: only Name, Phone, Business | Re-add to `LeadForm.tsx` and the API's new-design validation |
| "Founding rate / 90% of projects land here" pricing copy | Removed from NEW design (still in CURRENT design) | Replaced by the plain $699 CAD one-time offer | Restore from `src/lib/old/pricing.ts` |
| Postgres / Neon storage | Removed | Replaced by D1 | Git history (commit `d0a9d25`…`dab716e`) |
| "We'll call you within the hour" | Removed | Can't promise a time | — |
| Old-style Terms/Privacy for CURRENT-design visitors | Removed | One shared pair of legal pages | Would need per-design legal pages |
| Care plan prices (`careYearly`, `careMonthly`) | Removed with the old pricing config | Never shown on the site | Git history |

## 7. Open items
- **GA4 not active:** set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel and redeploy; then mark `cta_call_click`, `cta_text_click`, `cta_whatsapp_click`, `form_submit` as key events in GA4 (Admin → Events). Optionally register `design_version` and `utm_content` as custom dimensions.
- **Terms wording mismatch (owner said do not change it myself):** `/terms` says "If we miss that window, it's free: we refund your deposit and you pay nothing." It should say the exact guarantee sentence in §1.
- **Live write path not yet verified:** D1 has no real data yet. Visit `/?utm_source=lawn_sign&utm_content=v2b` on a phone, tap Call/Text, then check D1 `events`; and submit the form once (emails hi@launch24.ca, creates a lead row to delete).
- `/api/event` is unauthenticated (anyone could inflate counts); no rate limiting yet.
- **Vercel Web Analytics** may need enabling in the Vercel project's Analytics tab (setup screen was still showing).
- **Load time** target (< 2 s on mobile) not measured on production.
- Confirm Resend sending domain `launch24.ca` is verified so lead emails deliver.

## 8. Change log
- 2026-10-08 — Made the NEW yellow/black design the default for everyone (`NEW_DESIGN_MODE = "everyone"`); old design parked (previewable with `?design=old`, its font loads only then). Kept UTM capture, sign-aware hero, events, visitor id, `/report`, and ref tags. Removed the design cookie and the lawn-sign-only mode. (Replaces an earlier same-day change that parked all tracking.) Privacy page: "Which version" section replaced by "Counting visitors".
- 2026-10-08 — Removed the "(optional)" text from the "How did you hear about us?" label on both forms; the field is still not required.
- 2026-10-08 — Added optional "How did you hear about us?" dropdown to BOTH forms (new and current design); new `leads.heard_from` column (applied to the live D1 database), shown in the lead email. Form subtitle now "A few quick fields."
- 2026-10-07 — Created this PRD; added CLAUDE.md rule + `@docs/PRD.md` import and the PRD Stop hook.
- 2026-10-07 — Added Vercel Web Analytics; privacy page mentions it.
- 2026-10-07 — Moved lead/event storage from Postgres to Cloudflare D1; `/report` reads from D1.
- 2026-10-07 — Two designs on one URL with `NEW_DESIGN_MODE`/`SHOW_PORTFOLIO` flags, 30-day cookie, `?design=` overrides, `design_version` on all events/emails/rows, `/api/event`, `/report`, `design_report` view. New-design fixes: hid "Our work", NAME label, one guarantee sentence, new success message, double-submit guard. Canonical forced to `https://launch24.ca/`.
- 2026-10-06 — Redesigned home page as conversion-first yellow/black single page with UTM-aware hero, tracking events, short form, D1-ready lead API, SEO/OG/icons, restyled Terms/Privacy.
