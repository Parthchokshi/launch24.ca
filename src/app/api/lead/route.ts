import { Resend } from "resend";
import { contact } from "@/lib/contact";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_AUDIO_BYTES = 8 * 1024 * 1024; // 8MB

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const honeypot = String(form.get("company") ?? "");
    if (honeypot.trim()) {
      return NextResponse.json({ ok: true });
    }

    const phone = String(form.get("phone") ?? "").trim();
    const name = String(form.get("name") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const audio = form.get("audio");

    if (!phone) {
      return NextResponse.json({ error: "Phone is required." }, { status: 400 });
    }

    const hasAudio = audio instanceof File && audio.size > 0;
    if (!message && !hasAudio) {
      return NextResponse.json(
        { error: "Add a note or voice memo." },
        { status: 400 },
      );
    }

    if (hasAudio && audio.size > MAX_AUDIO_BYTES) {
      return NextResponse.json(
        { error: "Voice memo is too large (max 8MB)." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const subject = `Launch24 lead — ${phone}${name ? ` (${name})` : ""}`;
    const text = [
      `New Launch24 proposal request`,
      ``,
      `Phone: ${phone}`,
      `Name: ${name || "(not provided)"}`,
      `Message: ${message || "(voice memo only)"}`,
      `Audio: ${hasAudio ? audio.name : "none"}`,
    ].join("\n");

    if (!apiKey) {
      console.log("[lead] RESEND_API_KEY missing — logging lead only");
      console.log(text);
      if (hasAudio) {
        console.log(`[lead] audio: ${audio.name} (${audio.size} bytes, ${audio.type})`);
      }
      return NextResponse.json({ ok: true, mode: "dev-log" });
    }

    const resend = new Resend(apiKey);
    const from =
      process.env.RESEND_FROM ?? "Launch24 <onboarding@resend.dev>";

    const attachments =
      hasAudio
        ? [
            {
              filename: audio.name || "voice-memo.webm",
              content: Buffer.from(await audio.arrayBuffer()),
            },
          ]
        : undefined;

    const { error } = await resend.emails.send({
      from,
      to: [contact.email],
      subject,
      text,
      attachments,
    });

    if (error) {
      console.error("[lead] Resend error", error);
      return NextResponse.json(
        { error: "Could not send. Try WhatsApp or call instead." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] unexpected", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
