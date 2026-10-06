import { formatCad, pricing } from "@/lib/pricing";

export const faqs = [
  {
    q: "When does the 24-hour clock start?",
    a: "When three things are in: your deposit, your intake (business name, what you do, contact details), and your content (or you tell us to write it). Until then the clock hasn't started.",
  },
  {
    q: "What's included?",
    a: `The Launch Package is ${formatCad(pricing.launchPackage)} ${pricing.currency}, one time. It includes responsive design, a contact form, basic SEO, homepage copy, and one revision round. Extra pages, online booking, e-commerce, and ongoing maintenance are quoted separately.`,
  },
  {
    q: "Can I change things after you deliver?",
    a: "Yes. One revision round is included. Tell us what to change and we'll update it. Bigger changes, like new pages or booking, get a separate quote.",
  },
  {
    q: "How do I pay?",
    a: "You get a free proposal first, so you see the exact price before paying anything. When you're ready, you pay a deposit (we'll confirm e-Transfer or card on the call) and we start. Nothing is charged before that.",
  },
  {
    q: "What if you miss the 24 hours?",
    a: "Then it's free. We refund your deposit and you pay nothing. The full rules are in the guarantee box above and in our Terms.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. The site is yours. Your domain and hosting stay on your own accounts, and we'll help you connect them.",
  },
] as const;
