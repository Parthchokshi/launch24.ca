# Launch24 preview site: studio brief (read all of it)

Launch24 builds websites for local GTA businesses ($699, live in 24 hours). We pre-build a private
preview of a business's own website and send it to the owner so they see their site and want it.
**Your job: one bespoke, studio-quality one-page website for ONE business. It must look and feel
like nothing else in the set.** Think of a small design studio giving this client a real identity.

Base dir: a working folder outside the repo (e.g. the session scratchpad), holding `kit/`, `img/` and `out/`.
- Facts (the ONLY source of truth): `kit/<slug>.json`
- Shared Launch24 layer (paste verbatim, do not edit): `kit/l24-layer.html`
- Photo pool (Unsplash, licensed for use): `img/*.jpg` (noodle1-3, burger1-3, cake1-3, barber1-3, body1-3, mech1-3, groom1-5). Look at them with Read before choosing.
  You may also find more with the Unsplash MCP tools if you have them (search_photos, then download_asset for the URL; append `&w=1400&fit=max&q=80` and curl it). Keep each image under ~500 KB.
- Do NOT reuse the structure, CSS or JS of any other preview.
- Write your site to `out/<slug>/index.html`; put the images it uses in `out/<slug>/img/` and reference them as `img/<file>.jpg`.

## Hard rules (truth)
- Use only facts in the JSON: name, address, phone, hours, rating, review count, review text, booking/Instagram links, and the "facts_from_reviews_you_may_use".
- **Never invent** prices, stats ("2,000 happy clients"), years in business, awards, staff names not in the reviews, guarantees, policies, certifications, or menu items/services that the facts don't support. If a section would need invented content, design around it (e.g. "Ask about pricing", or a clearly labelled placeholder like "Your menu goes here").
- Quote reviews **verbatim** (you may trim with an ellipsis "…" but not change words). Attribute as "First L. · Google review". Use only 4–5★ reviews. Don't quote reviews that mention a competitor or anything negative.
- Photos are sample stock: say so once, quietly (e.g. small caption "Sample photos. We'll use yours.").
- Hours: show the real weekly hours and a live "Open now / Closed · opens …" computed in America/Toronto time. Handle closings after midnight (close > 24 means next day).
- Phone/booking/directions are real. `tel:` links are unreliable in this viewer, so for call/book/visit actions use the shared contact sheet: put `data-l24-contact="Some title"` on any button to open it. You may also show the phone number as plain text.
- Any form you build (quote, order, booking request) must `preventDefault()` and call `L24.toast("Preview only: on the live site this goes straight to <Business>.")`. Never pretend something was sent.

## The shared Launch24 layer (required, identical on every site)
At the very end of `<body>` content, add:
```html
<script>window.L24CFG={name:"…",phone:"…",tel:"+1…",address:"…",maps:"…",book:"…or omit",bookName:"…",instagram:"…or omit",
 noteOpen:"…",noteRest:"…", checklist:["Designed for <short>","Your hours, address and reviews added","Works on every phone","…one more true item"],
 swatches:[{name:"Original",dot:"<accent>",vars:{"--accent":"<accent>"}},{name:"…",dot:"…",vars:{…}}, …3–4 total]};</script>
<!-- then paste the full contents of kit/l24-layer.html -->
```
- noteOpen/noteRest come from `owner_note` in the JSON (you may polish wording, keep the facts).
- The layer inserts a 44px sticky bar at the top of `<body>`. Your own sticky header must use `top: calc(var(--l24-h) + env(safe-area-inset-top,0px))`.
- It puts a "Make it yours" button bottom-right and a note bottom-left. Don't put your own fixed elements there. A mobile bottom CTA bar is fine if it is ≤ 72px tall (the button lifts above it below 760px).
- Define `--accent` on `:root` and use it for your main accent so the colour swatches work; swatch `vars` may set any of your colour tokens.
- Mark the hero headline (or its main text span) with `data-l24-edit="Headline"` and optionally one more line with `data-l24-edit="Tagline"`, so the owner can edit it live. Those elements must contain plain text only.

## Craft bar
- Start from the business's own world. Find one memorable idea specific to it and build the page around it: a signature interaction, a layout concept, a typographic treatment. One orchestrated "wow" moment beats scattered effects.
- Distinctive type pairing from Google Fonts (never Inter, Roboto, Arial, Space Grotesk; avoid the Launch24 fonts Bricolage/Onest for the site itself). Real hierarchy and a type scale.
- Your own palette (4–6 tokens). Avoid the generic AI looks: cream + serif + terracotta, purple gradients, everything centred, the same rounded card everywhere. Choose one theme (light or dark) deliberately for the brand and set `color-scheme` on `:root`.
- Micro-interactions that feel crafted: hover states, scroll reveals that start visible (no content stuck at opacity 0), springy feedback on taps. Respect `prefers-reduced-motion`.
- Mobile first: it must be excellent at 390px. Tap targets ≥ 44px, no horizontal scroll, side gutter `padding-left:max(16px,env(safe-area-inset-left,0px))` (same for right). Images `max-width:100%`.
- Copy: plain, warm, specific to this business. Short sentences. No jargon, no em-dash asides, no "not X but Y". Sentence case headings.
- Sections to consider (choose what fits, reorder freely): hero, the signature feature, what they do, reviews, hours and location, a closing call to action. No FAQ unless the answers are true from the facts.

## File format
The file is wrapped at publish time in `<!doctype html><html><head>…</head><body>` so write content directly: start with `<title>Short name</title>`, `<meta name="claude:viewport-fit-sides" content="cover">`, Google Fonts `<link>`, `<style>`, then markup, then scripts. No `<html>/<head>/<body>` tags. Allowed external hosts: fonts.googleapis.com / fonts.gstatic.com and scripts from cdnjs.cloudflare.com (pinned version). No other external URLs for images/CSS. Everything else inline.

## Verify before you finish (required)
Create a wrapper for local testing (don't leave it in out/): write `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>body{margin:0}[hidden]{display:none!important}</style></head><body>` + your file + `</body></html>` to a temp file next to it (e.g. `out/<slug>/_v.html`), then with Playwright (Node: `import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs"`, launch with `{executablePath:"/opt/pw-browsers/chromium"}`) load it at 390×844 and 1280×900, take full-page screenshots, Read them and actually look, check `document.documentElement.scrollWidth` equals the viewport width, and that there are no page errors. Click your signature interaction once. Fix what you see, re-check once, then delete `_v.html` and screenshots.

## Report back (short)
3–5 lines: the concept, fonts/palette, the signature interaction, which images you used, and anything you were unsure about. Don't publish anything; the lead will publish.
