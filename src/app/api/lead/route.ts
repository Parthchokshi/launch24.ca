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

const bad = (error: string) => NextResponse.json({ error }, { status: 400 });

/**
 * Takes submissions from both designs.
 *  - new: name + phone + business (+ optional voice note)
 *  - old: phone + email + (message or voice memo), name optional
 * Every submission carries utm_* and design_version into the email and the DB.
 */
export async function POST(request: Request) {
  try {
    const form = await request.formData();

    // Obscure field name: "company" is a common autofill target and was
    // silently dropping real leads.
    if (String(form.get("_hp") ?? "").trim()) {
      console.warn("[lead] honeypot tripped, skipping");
      return NextResponse.json({ ok: true });
    }

    const dv = field(form, "design_version", 10);
    const design = dv === "new" ? "new" : "old";
    const name = field(form, "name", 100);
    const phone = field(form, "phone", 40);
    const business = field(form, "business", 150);
    const email = field(form, "email", 200);
    const message = String(form.get("message") ?? "").trim().slice(0, 3000);
    const audio = form.get("audio");
    const hasAudio = audio instanceof File && audio.size > 0;

    if (design === "new") {
      if (!name) return bad("Name is required.");
      if (phone.replace(/\D/g, "").length < 7) return bad("Enter a phone number we can call.");
      if (!business) return bad("Business name is required.");
    } else {
      if (!phone) return bad("Phone is required.");
      if (!email) return bad("Email is required.");
      if (!message && !hasAudio) return bad("Add a note or voice memo.");
    }
    if (hasAudio && audio.size > MAX_AUDIO_BYTES) {
      return bad("Voice note is too large (max 8MB).");
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
      `design_version: ${dv === "new" || dv === "old" ? dv : "(not sent)"}`,
      `Name: ${name || "(not provided)"}`,
      `Phone: ${phone}`,
      ...(design === "new"
        ? [`Business: ${business}`]
        : [`Email: ${email}`, `Message: ${message || "(voice memo only)"}`]),
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

    const tag = [design, utm.utm_source, utm.utm_content].filter(Boolean).join("/");
    const who = design === "new" ? `${business} (${name})` : `${phone}${name ? ` (${name})` : ""}`;
    const subject = `Launch24 lead: ${who} [${tag}]`;

    const sendEmail = async () => {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM ?? "Launch24 <hi@launch24.ca>",
        to: [contact.email],
        replyTo: design === "old" && email ? email : undefined,
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
          design_version: dv === "new" || dv === "old" ? dv : "",
          name,
          phone,
          business,
          email,
          message,
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
