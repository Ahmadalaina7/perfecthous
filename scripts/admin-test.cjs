const { chromium } = require("/tmp/pwtools/node_modules/playwright");

const BASE = "http://localhost:3000";

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message.slice(0, 150)));
  p.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 150)));

  await p.goto(BASE + "/admin/login", { waitUntil: "networkidle" });
  await p.fill("#email", "beheer@perfecthous.nl");
  await p.fill("#password", "WijzigDitWachtwoord123!");
  await p.click("button[type=submit]");
  await p.waitForURL((u) => u.pathname === "/admin", { timeout: 15000 });

  // Detailpagina via de referentielink
  await p.goto(BASE + "/admin/aanvragen", { waitUntil: "networkidle" });
  const href = await p.locator("tbody tr td a").first().getAttribute("href");
  const res = await p.goto(BASE + href, { waitUntil: "networkidle" });
  console.log("detail:", res.status(), p.url().split("/").pop(), "| h1:", (await p.locator("h1").innerText()).slice(0, 30));

  // Status wijzigen
  await p.click("button[name=status][value=in_progress]");
  await p.waitForTimeout(1500);
  const statusText = await p.locator("p:has-text('Binnengekomen')").innerText();
  console.log("na statuswijziging:", statusText.slice(0, 80));

  // Notitie opslaan
  await p.fill("textarea[name=notes]", "Automatische testnotitie");
  await p.click("button:has-text('Notitie opslaan')");
  await p.waitForTimeout(1200);

  // Project aanmaken
  await p.goto(BASE + "/admin/projecten", { waitUntil: "networkidle" });
  await p.click("button:has-text('Toevoegen')");
  await p.fill("input[name=title]", "Testproject browsercheck");
  await p.fill("textarea[name=summary]", "Aangemaakt door de geautomatiseerde test.");
  await p.fill("textarea[name=description]", "Korte beschrijving voor de test.");
  await p.fill("input[name=coverImage]", "/images/hal.jpg");
  await p.click("button:has-text('Project toevoegen')");
  await p.waitForTimeout(1500);
  const created = await p.locator("text=Testproject browsercheck").count();
  console.log("project aangemaakt:", created > 0);

  // Publieke pagina
  const pub = await p.goto(BASE + "/projecten/testproject-browsercheck", { waitUntil: "networkidle" });
  console.log("publiek project:", pub.status());

  // Opruimen
  await p.goto(BASE + "/admin/projecten", { waitUntil: "networkidle" });
  p.on("dialog", (d) => d.accept());
  const row = p.locator("li", { hasText: "Testproject browsercheck" }).first();
  await row.locator("button:has-text('Verwijderen')").click();
  await p.waitForTimeout(1500);
  console.log("opgeruimd:", (await p.locator("text=Testproject browsercheck").count()) === 0);

  // Blog + review formulieren bestaan
  for (const path of ["/admin/blog", "/admin/reviews"]) {
    const r = await p.goto(BASE + path, { waitUntil: "networkidle" });
    console.log(path, r.status(), "| panels:", await p.locator("button[aria-expanded]").count());
  }

  // Mobiel beheer
  const m = await b.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await m.newPage();
  await mp.goto(BASE + "/admin/login", { waitUntil: "networkidle" });
  await mp.fill("#email", "beheer@perfecthous.nl");
  await mp.fill("#password", "WijzigDitWachtwoord123!");
  await mp.click("button[type=submit]");
  await mp.waitForURL((u) => u.pathname === "/admin", { timeout: 15000 });
  const ov = await mp.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  console.log("admin mobiel overflow:", ov);
  await mp.screenshot({ path: "/tmp/shots/admin_mobiel.png" });

  await b.close();
  console.log("errors:", [...new Set(errors)].slice(0, 5));
})();
