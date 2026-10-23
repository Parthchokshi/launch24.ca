"use client";

import { ChatIcon, MicIcon, PhoneIcon, WhatsAppIcon } from "@/components/new/Icons";
import { contact, links } from "@/lib/contact";
import { smsHref, track, whatsappHref } from "@/lib/tracking";

export type CtaLocation = "hero" | "final" | "sticky";

/**
 * Three tap targets, WhatsApp first (most people message us there).
 * sms/WhatsApp hrefs get the sign ref added at
 * click time (after UtmCapture has run), so every text and WhatsApp arrives
 * tagged with the variant the person scanned.
 */
export function ActionButtons({ location }: { location: CtaLocation }) {
  return (
    <div className="ctas">
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-wa"
        onClick={(e) => {
          e.currentTarget.href = whatsappHref();
          track("cta_whatsapp_click", { location });
        }}
      >
        <WhatsAppIcon />
        WhatsApp us
      </a>
      <a
        href={links.tel}
        aria-label={`Call ${contact.phoneDisplay}`}
        className="btn"
        onClick={() => track("cta_call_click", { location })}
      >
        <PhoneIcon />
        Call<span className="wide-only"> {contact.phoneDisplay}</span>
      </a>
      <a
        href={links.sms}
        className="btn"
        onClick={(e) => {
          e.currentTarget.href = smsHref();
          track("cta_text_click", { location });
        }}
      >
        <ChatIcon />
        Text us
      </a>
    </div>
  );
}

/** Scrolls to the form and parks focus on the record button (no surprise mic prompt). */
export function VoiceNoteLink() {
  return (
    <a
      href="#voice-note"
      className="voice"
      onClick={(e) => {
        e.preventDefault();
        const target = document.getElementById("quote");
        target?.scrollIntoView();
        window.setTimeout(
          () => document.getElementById("voice-record")?.focus({ preventScroll: true }),
          300,
        );
      }}
    >
      <MicIcon />
      Send a 30-second voice note
    </a>
  );
}
