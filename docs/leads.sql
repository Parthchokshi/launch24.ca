-- Leads table + per-variant counts. Created automatically on the first form
-- submission when DATABASE_URL is set; kept here so you can run it by hand.
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

-- Leads per sign variant:
--   SELECT * FROM leads_by_variant;
