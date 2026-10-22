"use client";

import { PhoneIcon, WhatsAppIcon } from "@/components/new/Icons";
import { contact, links } from "@/lib/contact";
import { track, whatsappHref } from "@/lib/tracking";

/** Mobile-only bottom bar: WhatsApp + Call, always visible. */
export function StickyBar() {
  return (
    <div
      className="on-ink fixed inset-x-0 bottom-0 z-40 border-t-4 border-yellow bg-ink px-3 pt-2.5 sm:hidden"
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ink min-h-14! text-base!"
          onClick={(e) => {
            e.currentTarget.href = whatsappHref();
            track("cta_whatsapp_click", { location: "sticky" });
          }}
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
        <a
          href={links.tel}
          aria-label={`Call ${contact.phoneDisplay}`}
          className="btn btn-white min-h-14! text-base!"
          onClick={() => track("cta_call_click", { location: "sticky" })}
        >
          <PhoneIcon />
          Call
        </a>
      </div>
    </div>
  );
}
