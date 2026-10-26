import { readFile } from "node:fs/promises";
import path from "node:path";
import { getPreviewSite } from "@/previews";

/** Private previews: read per request so expiry applies, never indexed or cached. */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PRIVATE = {
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Cache-Control": "private, no-store",
  "Referrer-Policy": "no-referrer",
};

export async function GET(_request: Request, ctx: RouteContext<"/p/[slug]">) {
  const { slug } = await ctx.params;
  const site = getPreviewSite(slug);
  if (!site) {
    return new Response("This preview is no longer available.", {
      status: 404,
      headers: { ...PRIVATE, "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  const html = await readFile(path.join(process.cwd(), "src/previews/sites", `${site.slug}.html`), "utf8");
  return new Response(html, { headers: { ...PRIVATE, "Content-Type": "text/html; charset=utf-8" } });
}
