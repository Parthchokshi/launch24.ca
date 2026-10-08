import { NextResponse } from "next/server";
// PARKED: import { dbConfigured, saveEvent } from "@/lib/leads-db";

export const runtime = "nodejs";

/**
 * DISABLED. Nothing sends events here now (first-party event copies are parked).
 * The endpoint accepts and discards requests so it can't be used to write junk.
 * To restore, see docs/PRD.md §6 and the commented original below.
 */
export async function POST() {
  return new NextResponse(null, { status: 204 });
}

/* PARKED ORIGINAL
const EVENTS = new Set([
  "page_view",
  "cta_call_click",
  "cta_text_click",
  "cta_whatsapp_click",
  "voice_note_start",
  "form_submit",
]);

function str(v: unknown, max: number) {
  return typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!dbConfigured()) return new NextResponse(null, { status: 204 });
  try {
    const b = (await request.json()) as Record<string, unknown>;
    const name = str(b.name, 40);
    if (!EVENTS.has(name)) return new NextResponse(null, { status: 400 });
    const design = str(b.design_version, 10);
    await saveEvent({
      name,
      visitor_id: str(b.visitor_id, 64),
      design_version: design === "new" || design === "old" ? design : "",
      path: str(b.path, 200),
      utm_source: str(b.utm_source, 100),
      utm_medium: str(b.utm_medium, 100),
      utm_campaign: str(b.utm_campaign, 100),
      utm_content: str(b.utm_content, 100),
    });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("[event] failed", err);
    return new NextResponse(null, { status: 400 });
  }
}
*/
