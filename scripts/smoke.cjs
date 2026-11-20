const { chromium } = require("/tmp/pwtools/node_modules/playwright");
const fs = require("fs");
const OUT = "/tmp/shots";
fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:3000";

(async () => {
  const b = await chromium.launch();
  const errors = [];

  // 1. Offerteformulier end-to-end
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  p.on("pageerror", (e) => errors.push("offerte: " + e.message.slice(0, 120)));
  await p.goto(BASE + "/offerte", { waitUntil: "networkidle" });

  await p.click("form[data-quote] button:has-text('Volgende stap')");
  console.log("validatie leeg:", JSON.stringify((await p.locator("#description-error").innerText()).slice(0, 50)));

  await p.fill("#description", "Onze badkamer van 6 m2 moet compleet vernieuwd worden met nieuwe tegels en een inloopdouche.");
  await p.click("form[data-quote] button:has-text('Volgende stap')");
  await p.waitForTimeout(800);
  await p.setInputFiles("#photos", "public/images/badkamer.jpg");
  await p.waitForTimeout(1500);
  await p.click("form[data-quote] button:has-text('Volgende stap')");
  await p.waitForTimeout(800);
  await p.fill("#name", "Controle Bezoeker");
  await p.fill("#city", "Vlissingen");
  await p.fill("#phone", "0612345678");
  await p.fill("#email", "controle@example.com");
  await p.click("form[data-quote] button:has-text('Volgende stap')");
  await p.waitForTimeout(900);
  console.log("op reviewstap:", (await p.locator("ol[aria-label='Voortgang'] li[aria-current=step]").innerText()).replace(/\n/g, " "));
  await p.screenshot({ path: `${OUT}/offerte_review.png` });
  await p.click("form[data-quote] button[type=submit]");
  await p.waitForURL(/bedankt/, { timeout: 30000 }).catch(() => {});
  console.log("na versturen:", p.url().replace(BASE, ""));
  await p.screenshot({ path: `${OUT}/bedankt.png` });

  // 2. Contactformulier
  await p.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await p.fill("#name", "Controle Bericht");
  await p.fill("#email", "controle@example.com");
  await p.fill("#message", "Testbericht om te controleren of het contactformulier werkt na de herstart.");
  await p.click("form button[type=submit]");
  await p.waitForTimeout(2500);
  console.log("contactbevestiging:", (await p.locator("[role=status]").count()) > 0 ? "ok" : "MIST");

  // 3. Mobiel menu
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.click("button[aria-controls=mobile-menu]");
  await p.waitForTimeout(600);
  console.log("mobiel menu open:", await p.locator("#mobile-menu").isVisible());
  await p.screenshot({ path: `${OUT}/home_390.png` });
  await p.keyboard.press("Escape");
  await p.waitForTimeout(400);
  await ctx.close();

  // 4. Beheer
  const actx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const ap = await actx.newPage();
  ap.on("pageerror", (e) => errors.push("admin: " + e.message.slice(0, 120)));
  await ap.goto(BASE + "/admin/login", { waitUntil: "networkidle" });
  await ap.fill("#email", "beheer@perfecthous.nl");
  await ap.fill("#password", "WijzigDitWachtwoord123!");
  await ap.click("button[type=submit]");
  await ap.waitForURL((u) => u.pathname === "/admin", { timeout: 20000 }).catch(() => {});
  console.log("admin login:", ap.url().replace(BASE, ""));
  await ap.screenshot({ path: `${OUT}/admin.png` });

  await ap.goto(BASE + "/admin/aanvragen", { waitUntil: "networkidle" });
  await Promise.all([
    ap.waitForURL(/\/admin\/aanvragen\/.+/, { timeout: 20000 }).catch(() => {}),
    ap.click("tbody tr td a"),
  ]);
  console.log("detail:", (await ap.locator("h1").innerText()).slice(0, 30), "| foto's:", await ap.locator("img[alt='Foto bij de aanvraag']").count());
  await ap.click("button[name=status][value=in_progress]");
  await ap.waitForTimeout(1500);
  console.log("status:", (await ap.locator("p:has-text('Binnengekomen')").innerText()).slice(0, 70));

  for (const path of ["/admin/berichten", "/admin/projecten", "/admin/reviews", "/admin/blog"]) {
    const r = await ap.goto(BASE + path, { waitUntil: "networkidle" });
    console.log(path, r.status());
  }
  const csv = await ap.request.get(BASE + "/api/admin/export?type=quotes");
  const text = await csv.text();
  console.log("CSV:", csv.status(), "| bevat Controle Bezoeker:", text.includes("Controle Bezoeker"));

  // 5. Responsive
  for (const w of [360, 390, 768, 1024, 1440, 1920]) {
    const c = await b.newContext({ viewport: { width: w, height: 800 } });
    const cp = await c.newPage();
    const bad = [];
    for (const path of ["/", "/diensten", "/projecten", "/offerte", "/contact", "/blog", "/admin"]) {
      await cp.goto(BASE + path, { waitUntil: "load" });
      const [sw, cw] = await cp.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      if (sw > cw + 1) bad.push(`${path} ${sw}/${cw}`);
    }
    console.log(`${w}px:`, bad.length ? "OVERFLOW " + bad.join(", ") : "ok");
    await c.close();
  }

  await b.close();
  console.log("JS-fouten:", [...new Set(errors)]);
})();
