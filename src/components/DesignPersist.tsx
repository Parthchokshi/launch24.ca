"use client";

// PARKED: not rendered (see src/app/page.tsx and docs/PRD.md §6). Writes the l24_design cookie.

import { useEffect } from "react";
import { DESIGN_COOKIE, DESIGN_COOKIE_DAYS, type Design } from "@/lib/design";

/** Remembers which design this visitor was shown (first-party cookie, 30 days). */
export function DesignPersist({ design }: { design: Design | null }) {
  useEffect(() => {
    if (!design) return;
    try {
      document.cookie = `${DESIGN_COOKIE}=${design}; max-age=${60 * 60 * 24 * DESIGN_COOKIE_DAYS}; path=/; SameSite=Lax`;
    } catch {}
  }, [design]);
  return null;
}
