"use client";

import { ChatIcon, MicIcon, PhoneIcon, WhatsAppIcon } from "@/components/new/Icons";
import { contact, links } from "@/lib/contact";
import { track } from "@/lib/tracking";

export type CtaLocation = "hero" | "final" | "sticky";

/**
 * Three tap targets, WhatsApp first (most people message us there).
 * Text and WhatsApp open with the fill-in message from `links` (no tracking tags).
 */
export function ActionButtons({ location }: { location: CtaLocation }) {
  return (
    <div className="ctas">
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-wa"
        onClick={() => track("cta_whatsapp_click", { location })}
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
        onClick={() => track("cta_text_click", { location })}
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
