// Renders each *.html here to ../<name>.png at its CSS size. Run: node render.mjs
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
const { chromium } = createRequire(execSync("npm root -g").toString().trim() + "/")("playwright");
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
for (const f of readdirSync(here).filter((f) => f.endsWith(".html"))) {
  const page = await browser.newPage({ viewport: { width: 2048, height: 1152 } });
  await page.goto("file://" + join(here, f));
  await page.evaluate(() => document.fonts.ready);
  const { w, h } = await page.evaluate(() => ({
    w: parseInt(getComputedStyle(document.documentElement).getPropertyValue("--w")),
    h: parseInt(getComputedStyle(document.documentElement).getPropertyValue("--h")),
  }));
  await page.setViewportSize({ width: w, height: h });
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(here, "..", f.replace(".html", ".png")) });
  console.log(f, w, h);
  await page.close();
}
await browser.close();
