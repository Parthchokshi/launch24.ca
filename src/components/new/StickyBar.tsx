"use client";

import { ChatIcon, PhoneIcon } from "@/components/new/Icons";
import { contact, links } from "@/lib/contact";
import { smsHref, track } from "@/lib/tracking";

/** Mobile-only bottom bar: Call + Text, always visible. */
export function StickyBar() {
  return (
    <div
      className="on-ink fixed inset-x-0 bottom-0 z-40 border-t-4 border-yellow bg-ink px-3 pt-2.5 sm:hidden"
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href={links.tel}
          aria-label={`Call ${contact.phoneDisplay}`}
          className="btn btn-ink min-h-14! text-base!"
          onClick={() => track("cta_call_click", { location: "sticky" })}
        >
          <PhoneIcon />
          Call
        </a>
        <a
          href={links.sms}
          className="btn btn-white min-h-14! text-base!"
          onClick={(e) => {
            e.currentTarget.href = smsHref();
            track("cta_text_click", { location: "sticky" });
          }}
        >
          <ChatIcon />
          Text
        </a>
      </div>
    </div>
  );
}
