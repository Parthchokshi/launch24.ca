import { NextResponse } from "next/server";
import { dbConfigured, saveEvent } from "@/lib/leads-db";

export const runtime = "nodejs";

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

/** First-party copy of each analytics event, so we can report without GA. */
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
