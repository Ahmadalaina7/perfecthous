const { chromium } = require("/tmp/pwtools/node_modules/playwright");
const fs = require("fs");

const BASE = "http://localhost:3000";
const OUT = "/tmp/shots";
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const errors = [];

  const sizes = [[360, 800], [390, 844], [768, 1024], [1024, 768], [1440, 900], [1920, 1080]];
  const pages = ["/", "/diensten", "/diensten/badkamer-keuken", "/projecten", "/offerte", "/contact", "/blog"];

  for (const [w, h] of sizes) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => errors.push(`[${w}px] JS ${page.url()} :: ${e.message.slice(0, 160)}`));
    for (const p of pages) {
      await page.goto(BASE + p, { waitUntil: "networkidle" });
      const m = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
      }));
      const overflow = m.scrollW > m.clientW + 1;
      console.log(`${w}x${h} ${p} overflow=${overflow} (${m.scrollW}/${m.clientW})`);
    }
    if (w === 390) await page.screenshot({ path: `${OUT}/home_390.png` });
    await ctx.close();
  }

  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push("offerte JS :: " + e.message.slice(0, 200)));
  await page.goto(BASE + "/offerte", { waitUntil: "networkidle" });
  await page.click("form[data-quote] button:has-text('Volgende stap')");
  await page.click("text=Volgende stap");
  console.log("stap1 validatie:", JSON.stringify((await page.locator("#description-error").innerText()).slice(0, 60)));

  await page.fill("#description", "Onze badkamer van 6 m2 moet compleet vernieuwd worden: nieuwe tegels, inloopdouche en sanitair. De leidingen zijn uit 1998 en er zit een lekkage bij de douche.");
  await page.click("form[data-quote] button:has-text('Volgende stap')");
  await page.locator("#photos").waitFor({ state: "attached" });
  await page.waitForTimeout(900);
  await page.setInputFiles("#photos", "public/images/badkamer.jpg");
  await page.waitForTimeout(2000);
  await page.click("form[data-quote] button:has-text('Volgende stap')");
  await page.locator("#name").waitFor({ state: "visible" });
  await page.waitForTimeout(600);
  await page.fill("#name", "Test Klant");
  await page.fill("#city", "Vlissingen");
  await page.fill("#phone", "0612345678");
  await page.fill("#email", "test@example.com");
  await page.click("form[data-quote] button:has-text('Volgende stap')");
  await page.locator("form[data-quote] button[type=submit]").waitFor({ state: "visible" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/offerte_stap4.png` });

  await Promise.all([
    page.waitForURL(/bedankt/, { timeout: 25000 }).catch(async () => {
      console.log("GEEN REDIRECT:", (await page.locator("body").innerText()).slice(0, 500));
    }),
    page.click("form[data-quote] button[type=submit]"),
  ]);
  console.log("na submit:", page.url());
  await page.screenshot({ path: `${OUT}/bedankt.png` });

  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await page.fill("#name", "Contact Tester");
  await page.fill("#email", "contact@example.com");
  await page.fill("#message", "Dit is een testbericht via het contactformulier om de werking te controleren.");
  await page.click("form button[type=submit]");
  await page.waitForTimeout(2500);
  console.log("contact bevestiging:", (await page.locator("[role=status]").count()) > 0 ? "OK" : "MIST");
  await page.screenshot({ path: `${OUT}/contact_ok.png` });

  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.click("button[aria-controls=mobile-menu]");
  await page.waitForTimeout(600);
  console.log("mobiel menu:", await page.locator("#mobile-menu").isVisible());
  await page.screenshot({ path: `${OUT}/menu_open.png` });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  console.log("menu na escape aanwezig:", await page.locator("#mobile-menu").count());

  const actx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const ap = await actx.newPage();
  await ap.goto(BASE + "/admin/login", { waitUntil: "networkidle" });
  await ap.fill("#email", "beheer@perfecthous.nl");
  await ap.fill("#password", "WijzigDitWachtwoord123!");
  await ap.click("button[type=submit]");
  await ap.waitForURL((u) => u.pathname === "/admin", { timeout: 15000 }).catch(() => {});
  console.log("admin na login:", ap.url());
  await ap.screenshot({ path: `${OUT}/admin.png` });

  for (const p of ["/admin/aanvragen", "/admin/berichten", "/admin/projecten", "/admin/reviews", "/admin/blog"]) {
    const res = await ap.goto(BASE + p, { waitUntil: "networkidle" });
    console.log(`admin ${p} -> ${res.status()}`);
  }
  await ap.screenshot({ path: `${OUT}/admin_aanvragen.png` });
  await ap.goto(BASE + "/admin/aanvragen", { waitUntil: "networkidle" });
  const firstLink = ap.locator("tbody a").first();
  if (await firstLink.count()) {
    await firstLink.click();
    await ap.waitForLoadState("networkidle");
    console.log("detailpagina:", ap.url(), (await ap.locator("h1").innerText()).slice(0, 40));
    await ap.screenshot({ path: `${OUT}/admin_detail.png` });
  }

  const csv = await ap.request.get(BASE + "/api/admin/export?type=quotes");
  const text = await csv.text();
  console.log("CSV:", csv.status(), "regels:", text.trim().split("\n").length, "testklant:", text.includes("Test Klant"));

  await ap.goto(BASE + "/projecten", { waitUntil: "networkidle" });
  await ap.click("button:has-text('Tegelwerk')");
  await ap.waitForTimeout(700);
  console.log("filter Tegelwerk kaarten:", await ap.locator("article").count());

  await browser.close();
  console.log("\n--- errors (" + new Set(errors).size + ") ---");
  [...new Set(errors)].slice(0, 12).forEach((e) => console.log(e));
})();
