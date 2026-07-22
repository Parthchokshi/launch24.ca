import { starterPromoCopy } from "@/lib/pricing";

export const faqs = [
  {
    q: "How does it actually work?",
    a: "Four steps. You brief us — call, WhatsApp, text, or voice note. We design and write your site. You review a live preview link within 24 hours — or it’s free.",
  },
  {
    q: "When does the 24-hour clock start?",
    a: "When four things are in: deposit received, intake complete (business name, services, goals), your content received (or you choose “we write the copy”), and the Launch Package scope locked.",
  },
  {
    q: "What exactly does “guaranteed by tomorrow” mean?",
    a: "If we miss delivering the first version of the agreed Launch Package within 24 hours of clock start, you don’t pay — we will build it for free.",
  },
  {
    q: "What doesn’t count toward the 24 hours?",
    a: "Delays outside the project: waiting on your content or replies, revision rounds after first delivery, domain/DNS/hosting connection waits, third-party platform delays, and scope changes after lock.",
  },
  {
    q: "How much does a website cost?",
    a: starterPromoCopy.faq,
  },
  {
    q: "What’s included in the project?",
    a: "A responsive website, mobile-first layout, contact/lead form, basic SEO covered out of the box, and launch-ready homepage copy specifically tailored to your business. Multi-page sites, e-commerce, advanced booking, custom photography, ads, and ongoing maintenance are quoted separately.",
  },
  {
    q: "What do I need to provide?",
    a: "Business name, what you do, contact details, logo if you have one, and photos you want used. No copy? We can write a clean starter draft as part of the package.",
  },
  {
    q: "Can I request changes after delivery?",
    a: "Yes — one revision round is included after first delivery. Bigger changes (extra pages, booking, e-commerce) are quoted separately and sit outside the 24-hour guarantee.",
  },
  {
    q: "How do I pay the deposit?",
    a: "We confirm on the proposal call — typically e-Transfer or card. The clock doesn’t start until payment and intake are complete.",
  },
] as const;
