-- Created automatically on first use when DATABASE_URL is set (src/lib/leads-db.ts).
-- Kept here so you can run it by hand or query it.

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
);

ALTER TABLE leads ADD COLUMN IF NOT EXISTS design_version text NOT NULL DEFAULT '';

ALTER TABLE leads ADD COLUMN IF NOT EXISTS email text NOT NULL DEFAULT '';

ALTER TABLE leads ADD COLUMN IF NOT EXISTS message text NOT NULL DEFAULT '';

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
);

CREATE INDEX IF NOT EXISTS events_created_at_idx ON events (created_at);

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
ORDER BY leads DESC;

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
ORDER BY 1, 2;

-- Compare designs per utm_content:
--   SELECT * FROM design_report;
-- Leads per sign variant:
--   SELECT * FROM leads_by_variant;
