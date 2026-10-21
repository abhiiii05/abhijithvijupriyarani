import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const QA = path.join(ROOT, "qa");
const NEXT_BIN = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");

const apps = {
  "01-index": {
    pkg: "@portfolio/01-index",
    port: 3001,
    interaction: async (page) => {
      await page.locator('[data-testid="row-wipro"]').click();
      await page.locator('[data-testid="case-study"]').waitFor({ state: "visible", timeout: 5000 });
      await page.waitForTimeout(700);
    },
    extra: async (browser, outDir, assertClean) => {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      });
      const page = await context.newPage();
      const errors = [];
      bindErrors(page, "01-index-case-mobile", errors);
      await page.goto("http://localhost:3001", { waitUntil: "networkidle" });
      await page.locator('[data-testid="row-wipro"]').click();
      await page.locator('[data-testid="case-study"]').waitFor({ state: "visible", timeout: 5000 });
      await page.waitForTimeout(600);
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      if (overflow.scrollWidth > overflow.clientWidth + 2) {
        errors.push(
          `[01-index-case-mobile] horizontal overflow: ${overflow.scrollWidth} > ${overflow.clientWidth}`,
        );
      }
      await page.screenshot({
        path: path.join(outDir, "case-mobile.png"),
        fullPage: false,
        animations: "disabled",
      });
      await context.close();
      assertClean(errors, "01-index (mobile case study)");
    },
  },
  "02-console": {
    pkg: "@portfolio/02-console",
    port: 3002,
    interaction: async (page) => {
      const input = page.locator('[data-testid="console-input"]');
      await input.click();
      await input.fill("ls");
      await input.press("Enter");
      await page.waitForTimeout(250);
      await input.fill("cat projects/file-processing.md");
      await input.press("Enter");
      await page.waitForTimeout(450);
      await page.locator('[data-testid="plain-view-toggle"]').click();
      await page.locator('[data-testid="plain-view"]').waitFor({ state: "visible", timeout: 5000 });
    },
  },
  "03-blueprint": {
    pkg: "@portfolio/03-blueprint",
    port: 3003,
    interaction: async (page) => {
      await page.locator('[data-testid="add-jobs"]').click();
      await page.waitForFunction(
        () => Number(document.querySelector('[data-testid="counter-active"]')?.textContent) > 0,
        null,
        { timeout: 6000 },
      );
      await page.locator('[data-testid="kill-worker"]').click();
      await page.waitForFunction(
        () => Number(document.querySelector('[data-testid="counter-retried"]')?.textContent) > 0,
        null,
        { timeout: 6000 },
      );
      const dropped = await page.locator('[data-testid="counter-dropped"]').textContent();
      if (dropped?.trim() !== "0") {
        throw new Error(`Blueprint dropped counter is ${dropped}, expected 0`);
      }
      await page.waitForTimeout(900);
    },
  },
  "04-desktop": {
    pkg: "@portfolio/04-desktop",
    port: 3004,
    interaction: async (page) => {
      const win = page.locator('[data-testid="window-work"]');
      await win.waitFor({ state: "visible", timeout: 8000 });
      const handle = page.locator('[data-testid="window-work-handle"]');
      const before = await win.boundingBox();
      const box = await handle.boundingBox();
      if (!before || !box) throw new Error("Could not measure the Work window");
      await page.mouse.move(box.x + box.width / 2, box.y + 14);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 + 130, box.y + 14 + 90, { steps: 12 });
      await page.mouse.up();
      await page.waitForTimeout(700);
      const after = await win.boundingBox();
      if (!after || Math.abs(after.x - before.x) < 40) {
        throw new Error("Work window did not move after drag");
      }
    },
  },
  "05-swiss": {
    pkg: "@portfolio/05-swiss",
    port: 3005,
    interaction: async (page) => {
      await page.locator('[data-testid="shader-canvas"] canvas').waitFor({
        state: "visible",
        timeout: 12000,
      });
    },
    extra: async (browser, outDir, assertClean) => {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        reducedMotion: "no-preference",
      });
      await context.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (type, ...args) {
          if (
            typeof type === "string" &&
            (type === "webgl" || type === "webgl2" || type === "experimental-webgl")
          ) {
            return null;
          }
          return original.call(this, type, ...args);
        };
      });
      const page = await context.newPage();
      const errors = [];
      bindErrors(page, "05-swiss-no-webgl", errors);
      await page.goto("http://localhost:3005", { waitUntil: "networkidle" });
      await page.locator('[data-testid="name-fallback"]').waitFor({
        state: "visible",
        timeout: 8000,
      });
      await page.screenshot({
        path: path.join(outDir, "webgl-disabled.png"),
        fullPage: true,
        animations: "disabled",
      });
      await context.close();
      assertClean(errors, "05-swiss (WebGL disabled)");
    },
  },
  "06-swissdesk": {
    pkg: "@portfolio/06-swissdesk",
    port: 3006,
    interaction: async (page) => {
      const win = page.locator('[data-testid="window-work"]');
      await win.waitFor({ state: "visible", timeout: 8000 });
      const handle = page.locator('[data-testid="window-work-handle"]');
      const before = await win.boundingBox();
      const box = await handle.boundingBox();
      if (!before || !box) throw new Error("Could not measure the Work window");
      await page.mouse.move(box.x + box.width / 2, box.y + 14);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 + 110, box.y + 14 + 80, { steps: 12 });
      await page.mouse.up();
      await page.waitForTimeout(600);
      const after = await win.boundingBox();
      if (!after || Math.abs(after.x - before.x) < 40) {
        throw new Error("Work window did not move after drag");
      }
      await page.locator('[data-testid="app-projects"]').click();
      await page.locator('[data-testid="window-projects"]').waitFor({
        state: "visible",
        timeout: 5000,
      });
      await page.waitForTimeout(500);
    },
  },
};

function bindErrors(page, label, errors) {
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`[${label}] console error: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    errors.push(`[${label}] page error: ${error.message}`);
  });
  page.on("requestfailed", (request) => {
    const text = request.failure()?.errorText ?? "unknown";
    if (text.includes("ERR_ABORTED")) return;
    errors.push(`[${label}] request failed: ${request.url()} (${text})`);
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      errors.push(
        `[${label}] HTTP ${response.status()}: ${response.url()}`,
      );
    }
  });
}

async function waitForServer(url, timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url, { redirect: "follow" });
      if (response.ok) return;
    } catch {
      // not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Server did not become ready at ${url}`);
}

function startApp(key, app) {
  const child = spawn(process.execPath, [NEXT_BIN, "start", "-p", String(app.port)], {
    cwd: path.join(ROOT, "apps", key),
    env: { ...process.env, NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });
  return { child, getOutput: () => output };
}

function stopApp(child) {
  if (!child || child.killed) return;
  child.kill("SIGTERM");
}

function assertClean(errors, label) {
  if (errors.length > 0) {
    throw new Error(`${label} reported ${errors.length} issue(s):\n${errors.join("\n")}`);
  }
}

async function runApp(browser, key, app) {
  const base = `http://localhost:${app.port}`;
  const outDir = path.join(QA, key);
  await mkdir(outDir, { recursive: true });
  const server = startApp(key, app);
  const errors = [];
  const label = key;

  try {
    await waitForServer(base);
    console.log(`\n→ ${key} (${base})`);

    const desktop = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
    });
    const page = await desktop.newPage();
    bindErrors(page, label, errors);
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForTimeout(1600);
    await page.screenshot({
      path: path.join(outDir, "desktop-1440.png"),
      fullPage: true,
      animations: "disabled",
    });

    await app.interaction(page);
    await page.screenshot({
      path: path.join(outDir, "interaction.png"),
      fullPage: true,
      animations: "disabled",
    });
    await page.screenshot({
      path: path.join(outDir, "interaction-viewport.png"),
      fullPage: false,
      animations: "disabled",
    });

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    if (overflow.scrollWidth > overflow.clientWidth + 2) {
      errors.push(
        `[${label}] horizontal overflow at 1440: ${overflow.scrollWidth} > ${overflow.clientWidth}`,
      );
    }
    await desktop.close();

    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      reducedMotion: "no-preference",
    });
    const mobilePage = await mobile.newPage();
    bindErrors(mobilePage, `${label}-mobile`, errors);
    await mobilePage.goto(base, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1200);
    await mobilePage.screenshot({
      path: path.join(outDir, "mobile-390.png"),
      fullPage: true,
      animations: "disabled",
    });
    const mobileMetrics = await mobilePage.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasMain: Boolean(document.querySelector("main")),
      bodyText: document.body.innerText.length,
    }));
    if (mobileMetrics.scrollWidth > mobileMetrics.clientWidth + 2) {
      errors.push(
        `[${label}] horizontal overflow at 390: ${mobileMetrics.scrollWidth} > ${mobileMetrics.clientWidth}`,
      );
    }
    if (!mobileMetrics.hasMain || mobileMetrics.bodyText < 500) {
      errors.push(`[${label}] mobile page appears empty or incomplete`);
    }
    await mobile.close();

    const reduced = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const reducedPage = await reduced.newPage();
    bindErrors(reducedPage, `${label}-reduced`, errors);
    await reducedPage.goto(base, { waitUntil: "networkidle" });
    await reducedPage.waitForTimeout(900);
    await reducedPage.screenshot({
      path: path.join(outDir, "reduced-motion.png"),
      fullPage: true,
      animations: "disabled",
    });
    const reducedText = await reducedPage.evaluate(() => document.body.innerText.length);
    if (reducedText < 500) {
      errors.push(`[${label}] reduced-motion page appears empty`);
    }
    await reduced.close();

    if (app.extra) {
      await app.extra(browser, outDir, assertClean);
    }

    assertClean(errors, key);
    console.log(`✓ ${key} — screenshots in qa/${key}`);
  } catch (error) {
    const output = server.getOutput().slice(-4000);
    console.error(`✗ ${key}\n${error.message}`);
    if (output.trim()) console.error(`--- server output ---\n${output}`);
    if (errors.length) console.error(`--- browser issues ---\n${errors.join("\n")}`);
    throw error;
  } finally {
    stopApp(server.child);
  }
}

const requested = process.argv.slice(2);
const selected = Object.entries(apps).filter(([key]) => {
  if (requested.length === 0) return true;
  return requested.some((value) => key.startsWith(value) || value === "all");
});

if (selected.length === 0) {
  console.error(`No matching app. Choose from: ${Object.keys(apps).join(", ")}`);
  process.exit(1);
}

await mkdir(QA, { recursive: true });
const browser = await chromium.launch({ headless: true });
let failed = false;

for (const [key, app] of selected) {
  try {
    await runApp(browser, key, app);
  } catch {
    failed = true;
    break;
  }
}

await browser.close();
await writeFile(
  path.join(QA, "last-run.txt"),
  `${new Date().toISOString()}\nselected: ${selected.map(([key]) => key).join(", ")}\nresult: ${failed ? "failed" : "passed"}\n`,
);

if (failed) process.exit(1);
console.log("\nAll requested QA checks passed.");
