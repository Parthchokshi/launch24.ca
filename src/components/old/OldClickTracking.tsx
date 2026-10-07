"use client";

import { useEffect } from "react";
import { track, type EventName } from "@/lib/tracking";

/**
 * The current design has no per-button handlers, so listen once at the
 * document level and fire the same call / text / WhatsApp events the new
 * design sends. Nothing about the old markup changes.
 */
export function OldClickTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a || !a.closest(".design-old")) return;
      const href = a.getAttribute("href") ?? "";
      let name: EventName | null = null;
      if (href.startsWith("tel:")) name = "cta_call_click";
      else if (href.startsWith("sms:")) name = "cta_text_click";
      else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) name = "cta_whatsapp_click";
      if (name) track(name, { location: "old_page" });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
