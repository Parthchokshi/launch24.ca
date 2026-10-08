-- Cloudflare D1 (SQLite) schema. Already applied to the "launch24" database.
-- To recreate: npx wrangler d1 execute launch24 --remote --file docs/leads.sql

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  design_version TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  business TEXT NOT NULL DEFAULT '',
  heard_from TEXT NOT NULL DEFAULT '',   -- lawn_sign | google | friend | social | whatsapp | other | ''
  email TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  utm_source TEXT NOT NULL DEFAULT '',
  utm_medium TEXT NOT NULL DEFAULT '',
  utm_campaign TEXT NOT NULL DEFAULT '',
  utm_content TEXT NOT NULL DEFAULT '',
  page_url TEXT NOT NULL DEFAULT '',
  has_voice_note INTEGER NOT NULL DEFAULT 0
);

-- Existing databases: ALTER TABLE leads ADD COLUMN heard_from TEXT NOT NULL DEFAULT '';  (applied to "launch24" on 2026-10-08)

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  name TEXT NOT NULL,
  visitor_id TEXT NOT NULL DEFAULT '',
  design_version TEXT NOT NULL DEFAULT '',
  path TEXT NOT NULL DEFAULT '',
  utm_source TEXT NOT NULL DEFAULT '',
  utm_medium TEXT NOT NULL DEFAULT '',
  utm_campaign TEXT NOT NULL DEFAULT '',
  utm_content TEXT NOT NULL DEFAULT ''
);

CREATE VIEW IF NOT EXISTS leads_by_variant AS
SELECT
  coalesce(nullif(utm_source,''),'(direct)') AS utm_source,
  coalesce(nullif(utm_campaign,''),'(none)') AS utm_campaign,
  coalesce(nullif(utm_content,''),'(none)') AS utm_content,
  count(*) AS leads,
  min(created_at) AS first_lead,
  max(created_at) AS last_lead
FROM leads
GROUP BY 1,2,3
ORDER BY leads DESC;

CREATE VIEW IF NOT EXISTS design_report AS
WITH ev AS (
  SELECT
    coalesce(nullif(design_version,''),'(unknown)') AS design_version,
    coalesce(nullif(utm_content,''),'(none)') AS utm_content,
    count(DISTINCT visitor_id) FILTER (WHERE name='page_view' AND path='/' AND visitor_id<>'') AS visitors,
    count(*) FILTER (WHERE name='cta_call_click') AS call_clicks,
    count(*) FILTER (WHERE name='cta_text_click') AS text_clicks,
    count(*) FILTER (WHERE name='cta_whatsapp_click') AS whatsapp_clicks
  FROM events
  GROUP BY 1,2
),
ld AS (
  SELECT
    coalesce(nullif(design_version,''),'(unknown)') AS design_version,
    coalesce(nullif(utm_content,''),'(none)') AS utm_content,
    count(*) AS form_submissions
  FROM leads
  GROUP BY 1,2
)
SELECT
  coalesce(ev.design_version, ld.design_version) AS design_version,
  coalesce(ev.utm_content, ld.utm_content) AS utm_content,
  coalesce(ev.visitors,0) AS visitors,
  coalesce(ev.call_clicks,0) AS call_clicks,
  coalesce(ev.text_clicks,0) AS text_clicks,
  coalesce(ev.whatsapp_clicks,0) AS whatsapp_clicks,
  coalesce(ld.form_submissions,0) AS form_submissions
FROM ev
FULL JOIN ld ON ev.design_version = ld.design_version AND ev.utm_content = ld.utm_content
ORDER BY 1,2;

-- Compare designs per utm_content:  SELECT * FROM design_report;
-- Self-reported source:             SELECT heard_from, count(*) FROM leads GROUP BY 1;
-- Leads per sign variant:           SELECT * FROM leads_by_variant;
