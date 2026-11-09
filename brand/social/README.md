# Social pages: assets and everything to fill in

LinkedIn company page, X, Instagram, Facebook page and Reddit for Launch24. Same "Night Shift" look as the site and the
Google Business Profile (`brand/google-business-profile/`). Paste the text as is: character counts are checked,
the guarantee sentence is verbatim, and there are no stats, reviews or claims we can't back up (PRD rules).

**Use the same handle everywhere: `launch24ca`** (`launch24` is likely taken; check each site and, if `launch24ca`
is gone somewhere, use `launch24.ca` on Instagram or `launch24canada` and update the links below).

## Files

| File | Use on | Size |
|---|---|---|
| `logo.png` | **Profile picture on all five** (gold square, black "24"; same as the favicon and Google profile) | 1080×1080. Circle-safe |
| `logo-dark.png` | Spare profile picture (dark, glowing gold "24") | 1080×1080 |
| `linkedin-cover.png` | LinkedIn **cover image** | 2256×382 (2× of LinkedIn's 1128×191). Left side kept empty because the logo sits there |
| `x-header.png` | X **header** | 1500×500. Text on the right: the profile photo covers the bottom-left |
| `facebook-cover.png` | Facebook **cover photo** | 1640×924. Phones show all of it; desktop crops top and bottom, so the text sits in the middle band |
| `reddit-banner.png` | Reddit profile **banner** | 1920×384 (5:1). Text centred so phone crops keep it |
| `post-1-guarantee.png` | First post everywhere | 1080×1350 (4:5) |
| `post-2-how-it-works.png` | Second post | 1080×1350 |
| `post-3-offer.png` | Third post ($699) | 1080×1350 |
| `highlight-offer.png`, `highlight-how.png`, `highlight-guarantee.png`, `highlight-contact.png` | Instagram **story highlight covers** | 1080×1920 (icon in the centre circle) |

The 4:5 posts also work on LinkedIn, Facebook and X, so the same three images launch every page.
To change and re-render: edit `source/*.html`, then from the repo root:
`CHROMIUM_PATH=/opt/pw-browsers/chromium node brand/social/source/render.mjs` (add a name prefix, e.g. `post`, to render only some).

## Links (all tracked)
Every link uses `utm_medium=social`, so visits, clicks and leads show up per platform in `/report` and on lead emails.
No code change needed.

| Where | Link |
|---|---|
| LinkedIn website / button | `https://launch24.ca/?utm_source=linkedin&utm_medium=social&utm_campaign=profile&utm_content=li_profile` |
| X website | `https://launch24.ca/?utm_source=x&utm_medium=social&utm_campaign=profile&utm_content=x_profile` |
| Instagram bio link | `https://launch24.ca/?utm_source=instagram&utm_medium=social&utm_campaign=profile&utm_content=ig_bio` |
| Facebook website / button | `https://launch24.ca/?utm_source=facebook&utm_medium=social&utm_campaign=profile&utm_content=fb_page` |
| Post links | Same as the platform's link, with `utm_campaign=post` and `utm_content=<li\|x\|ig\|fb>_post_<topic>` (e.g. `fb_post_offer`) |
| Reddit profile link | `https://launch24.ca/?utm_source=reddit&utm_medium=social&utm_campaign=profile&utm_content=rd_profile` |
| WhatsApp (direct) | `https://wa.me/14373652475` (not tracked: it skips the site) |

The form's "How did you hear about us?" already has **Facebook or Instagram**; LinkedIn, X and Reddit answers land in **Other**.

---

## 1. LinkedIn company page
Create: LinkedIn → For Business → Create a Company Page → **Company**.

| Field | Fill in |
|---|---|
| Name | `Launch24` |
| Public URL | `linkedin.com/company/launch24ca` |
| Website | LinkedIn link from the table above |
| Industry | `Design Services` |
| Organization size | `0-1 employees` (or `2-10` if someone works with you) |
| Organization type | `Self-employed` (sole proprietor) or `Privately held` (incorporated) |
| Logo | `logo.png` |
| Tagline (120 max) | `Custom websites for local businesses in the GTA and Ontario. Website in 24 hours. Or it's free.` (95) |
| Cover | `linkedin-cover.png` |
| Phone | `437-365-2475` |
| Location | Markham, ON (city only; tick "This is our primary location", don't add a street address) |
| Founded | The year you started taking clients |
| Custom button | **Visit website** → LinkedIn link |
| Specialties (max 20) | Website design, Small business websites, Web design, Mobile-friendly websites, Website copywriting, Basic SEO, Landing pages, Local business marketing, Website redesign, Toronto web design, GTA web design |

**About / Overview** (2,000 max; 741 used):
```
Launch24 builds custom websites for local businesses across the Greater Toronto Area and Ontario.

Website in 24 hours. Or it's free. If we miss the 24 hours, you pay nothing. Your deposit is refunded in full.

The Launch Package is $699 CAD, one time:
- Responsive design that works on any phone
- Contact form that emails you
- Basic SEO so Google can find you
- Homepage copy, written for your business
- One revision round

How it works: you brief us in 15 minutes by call, chat, or voice note. We design and write. You review a live preview on your phone within 24 hours. Happy with it? We launch it.

Free proposal first. Deposit only when work starts. You own the site.

WhatsApp, call, or text 437-365-2475, or email hi@launch24.ca.
```

Then: add yourself as the page's employee on your personal profile (Experience → Launch24) so the page shows a real person, and invite your connections to follow.

## 2. X (Twitter)
Sign up with hi@launch24.ca, then Edit profile.

| Field | Fill in |
|---|---|
| Handle | `@launch24ca` |
| Name (50 max) | `Launch24` |
| Profile photo | `logo.png` |
| Header | `x-header.png` |
| Bio (160 max) | `Custom websites for local businesses in the GTA. Website in 24 hours. Or it's free. $699 CAD. WhatsApp or text 437-365-2475.` (124) |
| Location (30 max) | `Greater Toronto Area, ON` |
| Website | X link from the table above |
| Professional account | Switch to **Professional → Business**, category `Web Designer`. Optional: add the phone/email contact button |

Don't buy a verification badge just to look bigger; it does nothing for local leads.

## 3. Instagram
Create the account, then Settings → **Account type and tools → Switch to professional account → Business**.

| Field | Fill in |
|---|---|
| Username | `launch24ca` |
| Name (searchable, 64 max) | `Launch24 · Websites in 24 hours` (31) |
| Category | `Web Designer` (show it on the profile) |
| Profile photo | `logo.png` |
| Bio (150 max) | see below |
| Links | 1) Instagram bio link, title `Get your website`; 2) `https://wa.me/14373652475`, title `WhatsApp us` |
| Contact options | Phone `437-365-2475` (Call + Text), email `hi@launch24.ca`. Connect WhatsApp under Edit profile → WhatsApp so a WhatsApp button shows. No address |
| Action button | none needed; the contact buttons do the job |

**Bio** (115 of 150):
```
Custom websites for local GTA businesses.
Website in 24 hours. Or it's free.
$699 CAD · you own it
👇 Free proposal
```

**Story highlights** (post one story each, add to a highlight, then Edit highlight → Edit cover → pick the image):
- **Offer** (`highlight-offer.png`): story = `post-3-offer.png`
- **How** (`highlight-how.png`): story = `post-2-how-it-works.png`
- **Guarantee** (`highlight-guarantee.png`): story = `post-1-guarantee.png`
- **Contact** (`highlight-contact.png`): story with a WhatsApp/link sticker to the Instagram bio link

Post the three images in this order (newest shows first, so post 3, then 2, then 1, and the guarantee leads the grid). Captions below, under "Launch posts".

## 4. Facebook page
facebook.com/pages/create (from your personal account; the page stays separate).

| Field | Fill in |
|---|---|
| Page name | `Launch24` |
| Category | `Website Designer` (add `Web Designer` / `Marketing Agency` only if they really fit; one is fine) |
| Bio / Intro (101 max) | `Custom websites for local GTA businesses. Website in 24 hours. Or it's free. $699 CAD, you own it.` (98) |
| Username | `@launch24ca` (facebook.com/launch24ca) |
| Profile picture | `logo.png` |
| Cover photo | `facebook-cover.png` |
| Website | Facebook link from the table above |
| Email / Phone | `hi@launch24.ca` / `437-365-2475` |
| WhatsApp | Settings → Linked accounts → WhatsApp → `+1 437-365-2475` |
| Action button | **Send WhatsApp message** (or **Call now** if you'd rather) |
| Location | Service area only, no address: Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, Burlington, Hamilton, Pickering, Ajax, Oshawa |
| Hours | The hours you actually answer (same as the Google profile) |
| Price range | `$$` |
| Services | Launch Package ($699), Small business website design, Website copywriting, Basic SEO setup (descriptions: copy from `brand/google-business-profile/README.md` §7) |

**Details / About** (longer description field):
```
Launch24 builds custom websites for local businesses across the GTA and Ontario. Website in 24 hours. Or it's free. If we miss the 24 hours, you pay nothing. Your deposit is refunded in full.

The Launch Package is $699 CAD, one time: responsive design that works on any phone, a contact form that emails you, basic SEO, homepage copy written for your business, and one revision round. Free proposal first, deposit only when work starts, and you own the site.

WhatsApp, call, or text 437-365-2475.
```

Turn on Meta Business Suite (business.facebook.com) to manage Facebook and Instagram together and schedule posts once for both.

## 5. Reddit
Reddit has no company pages: a brand uses a normal user profile. Sign up with hi@launch24.ca, then User settings → Profile.

| Field | Fill in |
|---|---|
| Username (permanent, can't be changed) | `launch24ca` (u/launch24ca) |
| Display name (30 max) | `Launch24` |
| About (200 max) | `Custom websites for local businesses in the GTA and Ontario. Website in 24 hours. Or it's free. Run by Parth in Markham. Ask me anything about getting a small business online.` (175) |
| Avatar | `logo.png` |
| Banner | `reddit-banner.png` |
| Social links (max 5) | Website (Reddit profile link above), WhatsApp `https://wa.me/14373652475`, Instagram, LinkedIn, Facebook |
| Content visibility | "Show up in search results" **on**; NSFW **off** |

**How to use it without getting banned.** Reddit punishes ads disguised as posts, and most city subs (r/toronto, r/mississauga, r/brampton, r/markham, r/ontario) ban self-promotion outright.
- Read each sub's rules first. Promote only where it's allowed: weekly "promote your business" threads, r/smallbusiness promo threads, r/PersonalFinanceCanada-style megathreads when they allow it.
- Mostly just help: answer questions in r/smallbusiness, r/Entrepreneur, r/web_design, r/askTO, r/CanadianSmallBusiness about getting a website, Google profile, domains. Say you run Launch24 when it's relevant; never pretend to be a customer.
- Never post previews (`/p/…`), never vote-ring, never use extra accounts.
- To reach locals directly, use **Reddit Ads** (ads.reddit.com, targeted to Toronto/GTA) instead of posting in city subs. Use `utm_source=reddit&utm_medium=cpc` links.
- Optional first post on your own profile (allowed anywhere: it's your profile): post 1 image + the Post 1 text, link `utm_content=rd_post_guarantee`.

---

## Launch posts
Same three images on every platform. Swap `<p>` in the link for `li`, `x`, `ig`, `fb` or `rd`. Instagram doesn't make caption links clickable, so the Instagram captions say "link in bio".

**Post 1: guarantee** (`post-1-guarantee.png`, link `utm_content=<p>_post_guarantee`)
```
Website in 24 hours. Or it's free.

If we miss the 24 hours, you pay nothing. Your deposit is refunded in full.

The clock starts once your deposit, intake, and content (or "you write it") are in. WhatsApp, call, or text 437-365-2475.
```

**Post 2: how it works** (`post-2-how-it-works.png`, link `utm_content=<p>_post_how`)
```
Brief tonight. Preview tomorrow.

1. You brief us: 15 minutes by call, chat, or voice note.
2. We design and write.
3. You review a live preview on your phone within 24 hours.
4. Happy with it? We launch it.

You only do step one.
```

**Post 3: offer** (`post-3-offer.png`, link `utm_content=<p>_post_offer`)
```
The Launch Package: $699 CAD, one time.

- Responsive design that works on any phone
- Contact form that emails you
- Basic SEO so Google can find you
- Homepage copy, written for your business
- One revision round

Free proposal first. Deposit only when work starts. You own the site.
```

Hashtags (Instagram: add at the end, 3 to 5; LinkedIn/Facebook: 2 or 3; X: none or one):
`#torontobusiness #gtasmallbusiness #smallbusinesscanada #webdesign #mississaugabusiness`

On X, shorten post 1 to: `Website in 24 hours. Or it's free. If we miss the 24 hours, you pay nothing. Your deposit is refunded in full. Custom sites for GTA businesses, $699 CAD. <link>` and **pin it**.

## Rules to keep (from the PRD)
- Guarantee sentence word for word; "Or it's free." only as a headline.
- No fake stats, follower-bait numbers, made-up testimonials or stock photos. Real photos (you, a lawn sign, a real client site with permission) beat any graphic.
- Never promise a reply time ("as soon as we can", not "within the hour").
- Prospect previews (`/p/…`) are private: never post them.

## Checklist
- [ ] Handles reserved (`launch24ca`) on all five
- [ ] Logo + cover/header/banner uploaded on all five
- [ ] Bios, links (with UTMs), contact details filled in
- [ ] Instagram is a Business account; WhatsApp linked on Instagram and Facebook
- [ ] Three launch posts on each; X post 1 pinned
- [ ] Four Instagram highlights with covers
- [ ] Reddit: subreddit rules read before any promo post
- [ ] Social links added to the Google Business Profile (Edit profile → Social profiles)
