# Pricing copy redesign — Launch Package

**Date:** 2026-07-22  
**Status:** Approved for implementation planning  
**Scope:** Copy-only changes across existing pricing surfaces. No new sections or layout redesign.

## Problem

Current messaging uses “starting from”, strikethrough `$999` → `$699`, and “limited-time promotional rate.” That reads like bait-and-switch or low-quality discount pricing, even though `$699` is an honest founding rate for a real polished local-business website.

## Goals

- Present **`$699 CAD`** as the real Launch Package price (not “from `$699`”).
- Remove aggressive promo framing (no strikethrough `$999`, no “limited-time from / usually”).
- Keep a light **founding rate** note.
- Clarify: ~90% of projects land at `$699` and that’s enough; ~10% that need bigger work get a custom quote.
- Rename the offer from “Starter” to **Launch Package**.
- Keep existing feature list and guarantees.
- Preserve free-proposal reassurance: exact price before payment.

## Non-goals

- New pricing tiers, care plans UI, or layout redesign.
- Listing example businesses (restaurants, daycares, etc.) in the pricing card description.
- Changing the 24-hour guarantee, deposit flow, or feature checklist contents.

## Approach (chosen)

**Honest fixed-feel pricing** with a short founding-rate / 90–10 explanation. `$999` may remain in `pricing.ts` for internal reference but is **not shown** on the site.

## Approved copy

### Hero trust line

Replace “Starting from ~~$999~~ **$699** CAD” with:

> **Launch Package — $699 CAD**  
> About 90% of projects land here — and that’s enough. Need something bigger? We’re all ears — reach out for a custom quote.

Keep existing adjacent trust lines: free proposal / deposit once we start; you own the site.

### Pricing card — Launch Package

| Element | Copy |
| --- | --- |
| Badge | LAUNCH PACKAGE (replace STARTER) |
| Title | Website |
| Description | A polished website for your business — how you look online, what you do, and how people get in touch. |
| Price meta | CAD · one-time · founding rate |
| Price | `$699` (no “from”, no strikethrough regular) |
| Under price | About 90% of projects land here — and that’s enough. Need something bigger? We’re all ears for a custom quote. |
| Features | Unchanged: responsive, contact/lead form, basic SEO, homepage copy, one revision round |
| Guarantees | Unchanged: live in 24 hours or free; deposit only once we start; you own the site |
| CTA / note | Unchanged: Get my free proposal; exact price before you pay |

Section eyebrow “Limited-time promotional rate.” → “Founding rate.”

Section subhead “Starter package or something bigger — your call.” → “Launch Package or something bigger — your call.”

### Custom card

Keep “Bigger projects.” Body copy lightly echoes the 10% path: for projects that need more than Launch, reach out for a custom quote. No price on this card.

### FAQ (“How much does a website cost?”)

> The Launch Package is **$699 CAD** (founding rate). About 90% of projects land here — and that’s enough. If you need something bigger, reach out and we’ll give you a custom quote. You’ll always see the exact price on a free proposal before you pay anything.

Also replace other user-facing “starter package” / “starter” product references in FAQs (and similar) with “Launch Package” where they mean this offer. Keep neutral words like “starter draft” for copy-writing if they don’t name the product.

### Shared promo strings (`starterPromoCopy` / pricing helpers)

Update short, FAQ, terms, SEO description, and OG lines to match the above. Drop “limited-time from / usually `$999` / from `$699`.”

Suggested short line for SEO / structured data:

> Launch Package $699 CAD (founding rate). About 90% of projects land here; bigger work is custom-quoted. Free proposal first.

Rename labels as needed (`starterFromLabel` → show `$699` not `from $699`; stop exporting/using strikethrough regular on UI).

### Terms / structured data

Use updated `terms` / FAQ strings. Structured-data offer description should say Launch Package at `$699`, founding rate, scope/custom quote for bigger work — not promotional “from” language.

## Files to touch

- `src/lib/pricing.ts` — labels + `starterPromoCopy` (and rename identifiers only if low-risk; otherwise update string values and UI usage)
- `src/components/Hero.tsx`
- `src/components/Pricing.tsx`
- `src/lib/faqs.ts` (via shared copy or inline FAQ string)
- `src/lib/seo.ts`, `src/lib/structured-data.ts`, `src/app/terms/page.tsx` — wherever promo strings surface

## Success criteria

- No “from $699” or strikethrough `$999` on hero or pricing card.
- Package named Launch Package, not Starter.
- 90% / bigger-work custom-quote message appears on hero and pricing.
- FAQ, terms, and SEO/OG copy agree with on-page pricing.
- Feature list and guarantees unchanged.
