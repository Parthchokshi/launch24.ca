"use client";

import { ChatIcon, MicIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { contact, links } from "@/lib/contact";
import { smsHref, track, whatsappHref } from "@/lib/tracking";

export type CtaLocation = "hero" | "final" | "sticky";

/**
 * Three same-size tap targets. sms/WhatsApp hrefs get the sign ref added at
 * click time (after UtmCapture has run), so every text and WhatsApp arrives
 * tagged with the variant the person scanned.
 */
export function ActionButtons({
  location,
  variant = "light",
}: {
  location: CtaLocation;
  variant?: "light" | "dark";
}) {
  return (
    <div
      className={`grid gap-3 sm:grid-cols-3 ${variant === "dark" ? "on-ink" : ""}`}
    >
      <a
        href={links.tel}
        className="btn btn-ink"
        onClick={() => track("cta_call_click", { location })}
      >
        <PhoneIcon />
        Call {contact.phoneDisplay}
      </a>
      <a
        href={links.sms}
        className="btn btn-white"
        onClick={(e) => {
          e.currentTarget.href = smsHref();
          track("cta_text_click", { location });
        }}
      >
        <ChatIcon />
        Text us
      </a>
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline"
        onClick={(e) => {
          e.currentTarget.href = whatsappHref();
          track("cta_whatsapp_click", { location });
        }}
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
    </div>
  );
}

/** Scrolls to the form and parks focus on the record button (no surprise mic prompt). */
export function VoiceNoteLink({ onInk = false }: { onInk?: boolean }) {
  return (
    <a
      href="#voice-note"
      className={`inline-flex min-h-12 items-center gap-2 text-base font-bold underline decoration-2 underline-offset-4 ${
        onInk ? "text-white" : "text-ink"
      }`}
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
