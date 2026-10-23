import type { Niche } from "@/previews/types";

/** Words that change per business type, so one template fits all four. */
export const nicheCopy: Record<
  Niche,
  { servicesTitle: string; primaryCta: string; contactTitle: string; contactLead: string }
> = {
  home: {
    servicesTitle: "What we do",
    primaryCta: "Get a free quote",
    contactTitle: "Get a free quote",
    contactLead: "Tell us about the job and we'll get back to you with a quote.",
  },
  beauty: {
    servicesTitle: "Services & prices",
    primaryCta: "Book now",
    contactTitle: "Book an appointment",
    contactLead: "Message us with the service and a day that works for you.",
  },
  food: {
    servicesTitle: "Menu",
    primaryCta: "Place an order",
    contactTitle: "Order",
    contactLead: "Message us with what you'd like and your pickup or delivery date.",
  },
  pro: {
    servicesTitle: "Services",
    primaryCta: "Book a consultation",
    contactTitle: "Book a consultation",
    contactLead: "Send a message and we'll set up a time to talk.",
  },
};
