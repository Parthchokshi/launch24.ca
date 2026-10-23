"use client";

import { PhoneIcon, WhatsAppIcon } from "@/components/new/Icons";
import { contact, links } from "@/lib/contact";
import { track } from "@/lib/tracking";

/** Mobile-only bottom bar: WhatsApp + Call, always visible. */
export function StickyBar() {
  return (
    <div className="sticky">
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-wa"
        onClick={() => track("cta_whatsapp_click", { location: "sticky" })}
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
      <a
        href={links.tel}
        aria-label={`Call ${contact.phoneDisplay}`}
        className="btn"
        onClick={() => track("cta_call_click", { location: "sticky" })}
      >
        <PhoneIcon />
        Call
      </a>
    </div>
  );
}
