"use client";

// PARKED: not mounted (see src/app/layout.tsx and docs/PRD.md §6). Stores UTMs and sends page_view with them.

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { captureUtms, track } from "@/lib/tracking";

/**
 * On every page load / route change: save utm_* from the URL, then send
 * page_view (with UTMs + design_version). Renders nothing.
 */
export function UtmCapture() {
  const pathname = usePathname();
  useEffect(() => {
    captureUtms();
    track("page_view", { page_location: window.location.href.split("#")[0] });
  }, [pathname]);
  return null;
}
