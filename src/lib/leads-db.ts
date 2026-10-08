/**
 * Lead + event storage on Cloudflare D1 (SQLite), called over Cloudflare's
 * HTTP API so it works from Vercel. Enabled when all three env vars are set:
 *
 *   CLOUDFLARE_ACCOUNT_ID
 *   CLOUDFLARE_D1_DATABASE_ID   (the "launch24" database)
 *   CLOUDFLARE_API_TOKEN        (token with "D1 Edit" permission)
 *
 * Schema: docs/leads.sql (already applied to the launch24 database).
 *  - leads:  one row per form submission
 *  - events: one row per tracked event (page_view, clicks, ...)
 *  - design_report: per design_version x utm_content comparison
 *  - leads_by_variant: leads per utm_source / campaign / content
 */
export type LeadRow = {
  design_version: string;
  name: string;
  phone: string;
  business: string;
  heard_from: string;
  email: string;
  message: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  page_url: string;
  has_voice_note: boolean;
};

export type EventRow = {
  name: string;
  visitor_id: string;
  design_version: string;
  path: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
};

export type ReportRow = {
  design_version: string;
  utm_content: string;
  visitors: number;
  call_clicks: number;
  text_clicks: number;
  whatsapp_clicks: number;
  form_submissions: number;
};

export const dbConfigured = () =>
  Boolean(
    process.env.CLOUDFLARE_ACCOUNT_ID &&
      process.env.CLOUDFLARE_D1_DATABASE_ID &&
      process.env.CLOUDFLARE_API_TOKEN,
  );

type D1Response<T> = {
  success: boolean;
  errors?: { message: string }[];
  result?: { results: T[]; success: boolean }[];
};

async function query<T = unknown>(sql: string, params: (string | number)[] = []) {
  const base = process.env.CLOUDFLARE_API_BASE ?? "https://api.cloudflare.com/client/v4"; // override only for tests
  const url = `${base}/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params }),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  const body = (await res.json().catch(() => null)) as D1Response<T> | null;
  if (!res.ok || !body?.success) {
    throw new Error(
      `D1 query failed (${res.status}): ${body?.errors?.map((e) => e.message).join("; ") ?? "no body"}`,
    );
  }
  return body.result?.[0]?.results ?? [];
}

export async function saveLead(lead: LeadRow) {
  await query(
    `INSERT INTO leads (design_version, name, phone, business, heard_from, email, message,
       utm_source, utm_medium, utm_campaign, utm_content, page_url, has_voice_note)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      lead.design_version,
      lead.name,
      lead.phone,
      lead.business,
      lead.heard_from,
      lead.email,
      lead.message,
      lead.utm_source,
      lead.utm_medium,
      lead.utm_campaign,
      lead.utm_content,
      lead.page_url,
      lead.has_voice_note ? 1 : 0,
    ],
  );
}

export async function saveEvent(e: EventRow) {
  await query(
    `INSERT INTO events (name, visitor_id, design_version, path,
       utm_source, utm_medium, utm_campaign, utm_content)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      e.name,
      e.visitor_id,
      e.design_version,
      e.path,
      e.utm_source,
      e.utm_medium,
      e.utm_campaign,
      e.utm_content,
    ],
  );
}

export async function getDesignReport() {
  return query<ReportRow>("SELECT * FROM design_report");
}
