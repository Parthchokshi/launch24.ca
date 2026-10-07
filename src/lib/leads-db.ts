import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Postgres (Neon / Vercel Postgres) storage. Set DATABASE_URL to enable.
 * Tables, plus the views used for reporting, are created on first use
 * (same SQL as docs/leads.sql).
 *
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

export const dbConfigured = () => Boolean(process.env.DATABASE_URL);

let ready: Promise<void> | null = null;

function client() {
  return neon(process.env.DATABASE_URL!);
}

function ensureSchema(sql: NeonQueryFunction<false, false>) {
  ready ??= (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id bigserial PRIMARY KEY,
        created_at timestamptz NOT NULL DEFAULT now(),
        name text NOT NULL,
        phone text NOT NULL,
        business text NOT NULL,
        utm_source text NOT NULL DEFAULT '',
        utm_medium text NOT NULL DEFAULT '',
        utm_campaign text NOT NULL DEFAULT '',
        utm_content text NOT NULL DEFAULT '',
        page_url text NOT NULL DEFAULT '',
        has_voice_note boolean NOT NULL DEFAULT false
      )`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS design_version text NOT NULL DEFAULT ''`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS email text NOT NULL DEFAULT ''`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS message text NOT NULL DEFAULT ''`;
    await sql`
      CREATE TABLE IF NOT EXISTS events (
        id bigserial PRIMARY KEY,
        created_at timestamptz NOT NULL DEFAULT now(),
        name text NOT NULL,
        visitor_id text NOT NULL DEFAULT '',
        design_version text NOT NULL DEFAULT '',
        path text NOT NULL DEFAULT '',
        utm_source text NOT NULL DEFAULT '',
        utm_medium text NOT NULL DEFAULT '',
        utm_campaign text NOT NULL DEFAULT '',
        utm_content text NOT NULL DEFAULT ''
      )`;
    await sql`CREATE INDEX IF NOT EXISTS events_created_at_idx ON events (created_at)`;
    await sql`
      CREATE OR REPLACE VIEW leads_by_variant AS
      SELECT
        coalesce(nullif(utm_source, ''), '(direct)') AS utm_source,
        coalesce(nullif(utm_campaign, ''), '(none)') AS utm_campaign,
        coalesce(nullif(utm_content, ''), '(none)') AS utm_content,
        count(*) AS leads,
        min(created_at) AS first_lead,
        max(created_at) AS last_lead
      FROM leads
      GROUP BY 1, 2, 3
      ORDER BY leads DESC`;
    await sql`
      CREATE OR REPLACE VIEW design_report AS
      WITH ev AS (
        SELECT
          coalesce(nullif(design_version, ''), '(unknown)') AS design_version,
          coalesce(nullif(utm_content, ''), '(none)') AS utm_content,
          count(DISTINCT visitor_id) FILTER (
            WHERE name = 'page_view' AND path = '/' AND visitor_id <> ''
          ) AS visitors,
          count(*) FILTER (WHERE name = 'cta_call_click') AS call_clicks,
          count(*) FILTER (WHERE name = 'cta_text_click') AS text_clicks,
          count(*) FILTER (WHERE name = 'cta_whatsapp_click') AS whatsapp_clicks
        FROM events
        GROUP BY 1, 2
      ),
      ld AS (
        SELECT
          coalesce(nullif(design_version, ''), '(unknown)') AS design_version,
          coalesce(nullif(utm_content, ''), '(none)') AS utm_content,
          count(*) AS form_submissions
        FROM leads
        GROUP BY 1, 2
      )
      SELECT
        coalesce(ev.design_version, ld.design_version) AS design_version,
        coalesce(ev.utm_content, ld.utm_content) AS utm_content,
        coalesce(ev.visitors, 0) AS visitors,
        coalesce(ev.call_clicks, 0) AS call_clicks,
        coalesce(ev.text_clicks, 0) AS text_clicks,
        coalesce(ev.whatsapp_clicks, 0) AS whatsapp_clicks,
        coalesce(ld.form_submissions, 0) AS form_submissions
      FROM ev
      FULL JOIN ld
        ON ev.design_version = ld.design_version AND ev.utm_content = ld.utm_content
      ORDER BY 1, 2`;
  })().catch((err) => {
    ready = null; // retry on next request
    throw err;
  });
  return ready;
}

export async function saveLead(lead: LeadRow) {
  const sql = client();
  await ensureSchema(sql);
  await sql`
    INSERT INTO leads (design_version, name, phone, business, email, message,
      utm_source, utm_medium, utm_campaign, utm_content, page_url, has_voice_note)
    VALUES (${lead.design_version}, ${lead.name}, ${lead.phone}, ${lead.business},
      ${lead.email}, ${lead.message}, ${lead.utm_source}, ${lead.utm_medium},
      ${lead.utm_campaign}, ${lead.utm_content}, ${lead.page_url}, ${lead.has_voice_note})`;
}

export async function saveEvent(e: EventRow) {
  const sql = client();
  await ensureSchema(sql);
  await sql`
    INSERT INTO events (name, visitor_id, design_version, path,
      utm_source, utm_medium, utm_campaign, utm_content)
    VALUES (${e.name}, ${e.visitor_id}, ${e.design_version}, ${e.path},
      ${e.utm_source}, ${e.utm_medium}, ${e.utm_campaign}, ${e.utm_content})`;
}

export type ReportRow = {
  design_version: string;
  utm_content: string;
  visitors: string;
  call_clicks: string;
  text_clicks: string;
  whatsapp_clicks: string;
  form_submissions: string;
};

export async function getDesignReport() {
  const sql = client();
  await ensureSchema(sql);
  return (await sql`SELECT * FROM design_report`) as ReportRow[];
}
