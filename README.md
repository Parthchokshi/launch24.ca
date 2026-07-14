# Launch24

Marketing site for **launch24.ca** — websites in 24 hours, or it's free.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Resend for lead emails (voice memo attachments supported)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Change your phone number

Edit `src/lib/contact.ts`, or set env vars (preferred for production):

```bash
NEXT_PUBLIC_PHONE=14165550124
NEXT_PUBLIC_PHONE_DISPLAY="+1 (416) 555-0124"
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
