# Google Business Profile: setup guide and assets

Everything to finish the Launch24 Google Business Profile (GBP). Paste the text as is.
Facts and copy rules come from `docs/PRD.md` (guarantee sentence verbatim, no fake stats or reviews).
The images use the site's "Night Shift" look (dark background, gold accents, Bricolage Grotesque), redone 2026-10-23. If the profile still shows the old yellow images, replace them all so the profile matches the website.

## Files to upload
| File | Where in GBP | Size |
|---|---|---|
| `logo.png` | **Logo** (gold with black "24", same as the site's favicon) | 720×720 (Google crops it to a circle; the "24" sits safely inside) |
| `logo-dark.png` | Spare logo (dark with glowing gold "24") | 720×720 |
| `cover.png` | **Cover photo** | 2048×1152 (16:9). Text is centred because Google crops the edges differently on phones and desktop |
| `post-offer.png` | Product photo + first Update | 1200×900 |
| `post-how-it-works.png` | Update | 1200×900 |
| `post-guarantee.png` | Update | 1200×900 |
| `post-call-us.png` | Update | 1200×900 |

To change and re-render: edit `source/*.html`, then `CHROMIUM_PATH=/opt/pw-browsers/chromium node source/render.mjs` (uses the pre-installed Playwright/Chromium). Fonts come from `src/app/assets/` (same files as the site's share images).

## 1. Fix first: business name (suspension risk)
The name currently reads "Launch24 - Website in 24 h…". Google only allows your **real business name**. Adding a tagline or keywords
is the most common reason profiles get suspended, and it does not help ranking enough to be worth that risk.
**Set it to: `Launch24`**. The tagline belongs in the description, cover photo, and posts.

## 2. Edit profile → About
**Description** (707 of 750 characters; the first ~250 show before "More"):

```
Launch24 builds custom websites for local businesses across the Greater Toronto Area and Ontario. Website in 24 hours. Or it's free. If we miss the 24 hours, you pay nothing. Your deposit is refunded in full.

Every site is custom-designed, works on any phone, and is yours to own. We write your homepage copy, add a contact form that emails you, and set up basic SEO so customers can find you on Google. You review a live preview on your phone before anything goes live.

Built for contractors, trades, salons, restaurants, cleaners, and any local business that needs a website without the wait. Call, text, or send a voice note. You get a free proposal first, and you pay a deposit only when work starts.
```
Google does not allow links, prices, or sales offers in the description. That's why the $699 is in Services and Products instead.

**Opening date:** the month you started taking clients.

## 3. Categories
- **Primary: `Website designer`**. This one matters most for ranking.
- Additional, only if true: `Internet marketing service` (you do basic SEO). Leave it at that. Adding categories for things you don't do (hosting, marketing agency, software company) weakens the profile.

## 4. Contact
- **Phone:** 437-365-2475 (primary). If you later use a Google Ads call-tracking number, make it primary and keep 437-365-2475 as an *additional* number so Google still matches your real number.
- **Website:** `https://launch24.ca/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=gbp_website`
- **Appointment link:** `https://launch24.ca/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=gbp_booking#quote` (opens straight to the "Rather we call you?" form)
- **Social profiles:** add any you have (Facebook, Instagram, LinkedIn). Skip empty ones.

## 5. Location and service area
- Service-area business: **no public address** (keep the street address hidden).
- **Service areas** (max 20). You currently have "Canada" and "Ontario". Those are too broad: Google ranks service-area businesses near the cities you list, and a whole country tells it nothing. Replace them with the cities you really serve, for example:
  Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, Burlington, Milton, Hamilton,
  Pickering, Ajax, Whitby, Oshawa, Newmarket, Aurora, Caledon, Etobicoke, Scarborough, North York.

## 6. Hours
Set the hours you **actually answer the phone/texts** (e.g. Mon–Sat 9 am–8 pm). Don't set 24 hours unless someone really picks up at 3 am, because Google users report it and it hurts trust. Add **holiday hours** before each stat holiday. Google shows a reminder for this.

## 7. Services (Edit services)
Add each one under "Website designer" as a custom service:

| Service | Price | Description (≤300 chars) |
|---|---|---|
| Launch Package: website in 24 hours | $699 (fixed) | Custom-designed website that works on any phone, a contact form that emails you, basic SEO, homepage copy written for your business, and one revision round. If we miss the 24 hours, you pay nothing. Your deposit is refunded in full. |
| Small business website design | Free quote | Custom website for local businesses in the GTA and Ontario. Free proposal first. You own the site, your domain, and your hosting. |
| Website copywriting | Included | We write your homepage copy for you, in plain language your customers understand. Just tell us about your business in a 15-minute call or voice note. |
| Basic SEO setup | Included | Page titles, descriptions, and site structure set up so Google can find and understand your business. |
| Mobile-friendly website | Included | Every site is built for phones first, with big buttons customers can tap to call or text you. |
| Custom website projects | Custom quote | Extra pages, online booking, or e-commerce. Tell us what you need and we'll quote it before any work starts. |

## 8. Products (Edit products → Add product)
- **Name:** Launch Package · **Category:** Websites · **Price:** $699 · **Photo:** `post-offer.png`
- **Description:** same as the Launch Package service above.
- **Button:** "Learn more" → `https://launch24.ca/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=gbp_product#pricing`

## 9. Attributes (More → Attributes)
Turn on what's true: Online appointments, Online estimates, Language: English, plus any "Identifies as" ones that apply to you.

## 10. Updates (Add update): post one a week
Posts show on the profile and signal an active business. Each one uses its own link so you can see which post brought the visit.

1. **Photo** `post-offer.png` · **Button** Learn more → `https://launch24.ca/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=gbp_post_offer#pricing`
   > Need a website for your business? The Launch Package is $699 CAD, one time: custom design that works on any phone, a contact form, basic SEO, homepage copy, and one revision round. Free proposal first. You own the site.
2. **Photo** `post-how-it-works.png` · **Button** Learn more → `https://launch24.ca/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=gbp_post_how#how`
   > How it works: 1) You brief us in 15 minutes by call, chat, or voice note. 2) We design and write. 3) You review a live preview on your phone within 24 hours. 4) Happy with it? We launch it.
3. **Photo** `post-guarantee.png` · **Button** Learn more → `https://launch24.ca/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=gbp_post_guarantee#guarantee`
   > Website in 24 hours. Or it's free. If we miss the 24 hours, you pay nothing. Your deposit is refunded in full. The clock starts once your deposit, intake, and content (or "you write it") are in.
4. **Photo** `post-call-us.png` · **Button** Call now
   > No website yet? WhatsApp, call, or text 437-365-2475, or send a 30-second voice note from launch24.ca. Free proposal first, deposit only when work starts.

**Add offer / Add event:** only use them for a real, time-limited deal or a real event. Don't invent a discount.

## 11. Photos (the biggest thing between you and a 10/10)
The branded images above are a start, but **real photos win** (Google and customers trust them more). Add 5–10, then one new photo a week:
- You (and anyone who works with you): a friendly, well-lit headshot.
- A real lawn sign in a real neighbourhood.
- A phone showing a site you built (only with that client's OK).
- Your workspace or laptop mid-build.
- A screen recording (10–30 s) scrolling a finished site on a phone, as a **video**.
No stock photos (same rule as the website).

## 12. Reviews
- Profile → **Share profile / Ask for reviews** → copy the review link. Send it by text to every client right after launch:
  > "Thanks for working with Launch24! If you're happy with your new site, a quick Google review would really help: <link>"
- **Never** pay, discount, or trade for reviews, and never write your own. Google removes them and it breaches Canada's Competition Act.
- Reply to **every** review within a day or two, good or bad, in a plain, friendly tone.

## 13. Tracking (ready for Google Ads)
**What's already wired on the site**: nothing to change in code:
- Every `gbp_*` link above is saved with the visit (UTMs), then appears on **every event and lead**: the lead email, the D1 `leads` row, `/report` (one row per `utm_content`), and the ref tag on texts/WhatsApp (`ref: google/gbp_website`).
- Count GBP leads: `SELECT utm_content, count(*) FROM leads WHERE utm_campaign = 'gbp' GROUP BY 1;`
- The form's "How did you hear about us?" has **Google** as an answer, which also catches people who searched you and typed the address in.
- Note: the last link with UTMs wins. A lawn-sign scanner who later taps your GBP website button is counted as GBP.

**What only GBP sees:** taps on the profile's own **Call** button and directions never touch the website. Read them in GBP → Performance (calls, website clicks, searches that found you).

**When you start Google Ads:**
1. Google Ads → Tools → Data manager (Linked accounts) → **Google Business Profile** → link it. Then add a **Location asset** to campaigns so ads show your profile, map pin, and reviews.
2. Google then adds the **Local actions** conversions (calls from the profile, website visits, directions). Keep **Submit lead form** (tag `AW-18341001020`, already firing on a successful form submit) as the primary conversion.
3. Add a **Call asset** with a Google forwarding number and turn on "Calls from ads" as a conversion (count calls ≥ 60 s).
4. Keep auto-tagging (gclid) on. Ads traffic is separate from these `gbp_*` UTMs, so the two don't mix.
5. Turn on GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`, open item in the PRD) so Ads can import `cta_call_click` / `cta_text_click` too.

## 14. 10/10 checklist
- [ ] Name is just "Launch24"
- [ ] Description, opening date, primary category Website designer
- [ ] Website + appointment links with UTMs
- [ ] 20 real service-area cities (no "Canada"/"Ontario")
- [ ] Hours + holiday hours
- [ ] 6 services, 1 product
- [ ] Logo + cover uploaded (Night Shift versions; old yellow images removed)
- [ ] 5–10 real photos + 1 short video
- [ ] First update posted; one a week after
- [ ] First 5 real reviews requested; all replied to
- [ ] (Later) GBP linked to Google Ads + location asset
