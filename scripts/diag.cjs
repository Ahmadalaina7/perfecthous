const { chromium } = require("/tmp/pwtools/node_modules/playwright");

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

  const offenders = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) {
        out.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || "").toString().slice(0, 90),
          left: Math.round(r.left),
          right: Math.round(r.right),
          w: Math.round(r.width),
          text: (el.textContent || "").trim().slice(0, 40),
        });
      }
    });
    return out.slice(0, 25);
  });
  console.log(JSON.stringify(offenders, null, 1));

  // Admin detail: check link target
  await page.goto("http://localhost:3000/admin/login", { waitUntil: "networkidle" });
  await page.fill("#email", "beheer@perfecthous.nl");
  await page.fill("#password", "WijzigDitWachtwoord123!");
  await page.click("button[type=submit]");
  await page.waitForURL((u) => u.pathname === "/admin", { timeout: 15000 });
  await page.goto("http://localhost:3000/admin/aanvragen", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const links = await page.locator("tbody a").evaluateAll((els) => els.slice(0, 4).map((e) => e.getAttribute("href")));
  console.log("tabel links:", links);
  await browser.close();
})();
