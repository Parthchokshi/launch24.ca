import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Lead storage: a single Postgres table (Neon / Vercel Postgres) so we can
 * count leads per sign variant. Set DATABASE_URL to enable. The table and
 * the leads_by_variant view are created on first use (see docs/leads.sql).
 */
export type LeadRow = {
  name: string;
  phone: string;
  business: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  page_url: string;
  has_voice_note: boolean;
};

export const dbConfigured = () => Boolean(process.env.DATABASE_URL);

let ready: Promise<void> | null = null;

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
  })().catch((err) => {
    ready = null; // retry on next request
    throw err;
  });
  return ready;
}

export async function saveLead(lead: LeadRow) {
  const sql = neon(process.env.DATABASE_URL!);
  await ensureSchema(sql);
  await sql`
    INSERT INTO leads (name, phone, business, utm_source, utm_medium,
      utm_campaign, utm_content, page_url, has_voice_note)
    VALUES (${lead.name}, ${lead.phone}, ${lead.business}, ${lead.utm_source},
      ${lead.utm_medium}, ${lead.utm_campaign}, ${lead.utm_content},
      ${lead.page_url}, ${lead.has_voice_note})`;
}
