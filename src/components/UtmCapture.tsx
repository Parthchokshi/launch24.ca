"use client";

import { useEffect } from "react";
import { captureUtms } from "@/lib/tracking";

/** Saves utm_* from the landing URL on first load. Renders nothing. */
export function UtmCapture() {
  useEffect(() => {
    captureUtms();
  }, []);
  return null;
}
