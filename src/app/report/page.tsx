import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { timingSafeEqual } from "node:crypto";
import { dbConfigured, getDesignReport, type ReportRow } from "@/lib/leads-db";

export const metadata: Metadata = {
  title: "Design report",
  robots: { index: false, follow: false },
};

function keyOk(given: string, expected: string) {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const COLS: { key: keyof ReportRow; label: string }[] = [
  { key: "design_version", label: "Design" },
  { key: "utm_content", label: "utm_content" },
  { key: "visitors", label: "Visitors" },
  { key: "call_clicks", label: "Call clicks" },
  { key: "text_clicks", label: "Text clicks" },
  { key: "whatsapp_clicks", label: "WhatsApp clicks" },
  { key: "form_submissions", label: "Form submissions" },
];

/**
 * /report?key=REPORT_KEY  (set REPORT_KEY in the environment; without it the
 * page does not exist). Compares design versions per utm_content.
 */
export default async function ReportPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const expected = process.env.REPORT_KEY;
  const q = await searchParams;
  const given = Array.isArray(q.key) ? q.key[0] : q.key;
  if (!expected || !given || !keyOk(given, expected)) notFound();

  let rows: ReportRow[] = [];
  let error = "";
  if (!dbConfigured()) {
    error = "DATABASE_URL is not set, so nothing is being stored yet.";
  } else {
    try {
      rows = await getDesignReport();
    } catch (err) {
      console.error("[report] failed", err);
      error = "Could not read the report. Check the database connection.";
    }
  }

  return (
    <main className="mx-auto max-w-5xl bg-white p-4 text-black sm:p-8" style={{ fontFamily: "system-ui, sans-serif" }}>
      <h1 className="text-3xl font-black">Design report</h1>
      <p className="mt-2 text-base text-[#4a4a4a]">
        Visitors = unique browsers that loaded the home page. Clicks are total taps.
        Form submissions come from the leads table. All time.
      </p>
      {error ? (
        <p role="alert" className="mt-6 font-bold">{error}</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base">
            <thead>
              <tr>
                {COLS.map((c) => (
                  <th key={c.key} scope="col" className="border-b-4 border-black px-3 py-2 font-black">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={COLS.length} className="px-3 py-4">No data yet.</td>
                </tr>
              )}
              {rows.map((r) => (
                <tr key={`${r.design_version}/${r.utm_content}`} className="border-b border-[#ccc]">
                  {COLS.map((c) => (
                    <td key={c.key} className="px-3 py-2">{r[c.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
