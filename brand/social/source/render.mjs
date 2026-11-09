// Renders each *.html here to ../<name>.png. Size comes from the page's --w/--h; --s is the pixel scale (default 1).
// Run from the repo root: CHROMIUM_PATH=/opt/pw-browsers/chromium node brand/social/source/render.mjs [name]
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
const { chromium } = createRequire(execSync("npm root -g").toString().trim() + "/")("playwright");
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const only = process.argv[2];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
for (const f of readdirSync(here).filter((f) => f.endsWith(".html") && (!only || f.startsWith(only)))) {
  const probe = await browser.newPage();
  await probe.goto("file://" + join(here, f));
  const { w, h, s } = await probe.evaluate(() => {
    const v = (n) => getComputedStyle(document.documentElement).getPropertyValue(n);
    return { w: parseInt(v("--w")), h: parseInt(v("--h")), s: parseFloat(v("--s")) || 1 };
  });
  await probe.close();
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: s });
  await page.goto("file://" + join(here, f));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(here, "..", f.replace(".html", ".png")) });
  console.log(f, w * s, "x", h * s);
  await page.close();
}
await browser.close();
