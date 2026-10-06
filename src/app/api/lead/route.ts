import { Resend } from "resend";
import { NextResponse } from "next/server";
import { contact } from "@/lib/contact";
import { dbConfigured, saveLead } from "@/lib/leads-db";

export const runtime = "nodejs";

const MAX_AUDIO_BYTES = 8 * 1024 * 1024; // 8MB

function field(form: FormData, key: string, max: number) {
  return String(form.get(key) ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    // Obscure field name: "company" is a common autofill target and was
    // silently dropping real leads.
    if (String(form.get("_hp") ?? "").trim()) {
      console.warn("[lead] honeypot tripped, skipping");
      return NextResponse.json({ ok: true });
    }

    const name = field(form, "name", 100);
    const phone = field(form, "phone", 40);
    const business = field(form, "business", 150);
    const audio = form.get("audio");

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json(
        { error: "Enter a phone number we can call." },
        { status: 400 },
      );
    }
    if (!business) {
      return NextResponse.json(
        { error: "Business name is required." },
        { status: 400 },
      );
    }

    const hasAudio = audio instanceof File && audio.size > 0;
    if (hasAudio && audio.size > MAX_AUDIO_BYTES) {
      return NextResponse.json(
        { error: "Voice note is too large (max 8MB)." },
        { status: 400 },
      );
    }

    const utm = {
      utm_source: field(form, "utm_source", 100),
      utm_medium: field(form, "utm_medium", 100),
      utm_campaign: field(form, "utm_campaign", 100),
      utm_content: field(form, "utm_content", 100),
    };
    const pageUrl = field(form, "page_url", 300);

    const text = [
      "New Launch24 lead",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Business: ${business}`,
      `Voice note: ${hasAudio ? audio.name : "none"}`,
      "",
      `utm_source: ${utm.utm_source || "(none)"}`,
      `utm_medium: ${utm.utm_medium || "(none)"}`,
      `utm_campaign: ${utm.utm_campaign || "(none)"}`,
      `utm_content: ${utm.utm_content || "(none)"}`,
      `Page: ${pageUrl || "(unknown)"}`,
    ].join("\n");

    const apiKey = process.env.RESEND_API_KEY;
    const hasDb = dbConfigured();

    if (!apiKey && !hasDb) {
      console.error("[lead] neither RESEND_API_KEY nor DATABASE_URL is set");
      console.log(text);
      // Local dev: let the UI be tested. Deployed: never pretend we got it.
      if (process.env.VERCEL || process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "Lead capture is not configured. Please call or text us." },
          { status: 503 },
        );
      }
      return NextResponse.json({ ok: true, mode: "dev-log" });
    }

    const tag = [utm.utm_source, utm.utm_content].filter(Boolean).join("/");
    const subject = `Launch24 lead: ${business} (${name})${tag ? ` [${tag}]` : ""}`;

    const sendEmail = async () => {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM ?? "Launch24 <hi@launch24.ca>",
        to: [contact.email],
        subject,
        text,
        attachments: hasAudio
          ? [
              {
                filename: audio.name || "voice-note.webm",
                content: Buffer.from(await audio.arrayBuffer()),
              },
            ]
          : undefined,
      });
      if (error) throw new Error(JSON.stringify(error));
    };

    const jobs: { label: string; run: Promise<unknown> }[] = [];
    if (apiKey) jobs.push({ label: "email", run: sendEmail() });
    if (hasDb) {
      jobs.push({
        label: "db",
        run: saveLead({
          name,
          phone,
          business,
          ...utm,
          page_url: pageUrl,
          has_voice_note: hasAudio,
        }),
      });
    }

    const results = await Promise.allSettled(jobs.map((j) => j.run));
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`[lead] ${jobs[i].label} failed`, r.reason);
      }
    });

    // The visitor sees success if the lead landed anywhere we will see it.
    if (results.some((r) => r.status === "fulfilled")) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: "Could not send. Please call or text us instead." },
      { status: 502 },
    );
  } catch (err) {
    console.error("[lead] unexpected", err);
    return NextResponse.json(
      { error: "Something went wrong. Please call or text us." },
      { status: 500 },
    );
  }
}
