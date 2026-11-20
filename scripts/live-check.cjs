const { chromium } = require("/tmp/pwtools/node_modules/playwright");

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const failed = [];
  p.on("requestfailed", (r) => failed.push(r.url().replace("http://localhost:3000", "") + " " + r.failure()?.errorText));
  p.on("response", (r) => {
    if (r.status() >= 400) failed.push(`${r.status()} ${r.url().replace("http://localhost:3000", "")}`);
  });
  p.on("pageerror", (e) => failed.push("JS " + e.message.slice(0, 100)));

  const t0 = Date.now();
  const res = await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  console.log("home:", res.status(), Date.now() - t0 + "ms");
  const info = await p.evaluate(() => ({
    title: document.title,
    h1: document.querySelector("h1")?.textContent?.slice(0, 60),
    bg: getComputedStyle(document.body).backgroundColor,
    font: getComputedStyle(document.querySelector("h1")).fontFamily.slice(0, 40),
    sections: document.querySelectorAll("section").length,
    imgs: [...document.images].length,
    brokenImgs: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length,
  }));
  console.log(info);
  await p.screenshot({ path: "/tmp/shots/live_home.png" });

  for (const path of ["/offerte", "/projecten", "/admin/login", "/contact"]) {
    const r = await p.goto("http://localhost:3000" + path, { waitUntil: "networkidle" });
    console.log(path, r.status(), "| h1:", (await p.locator("h1").first().innerText()).slice(0, 40));
  }
  await p.screenshot({ path: "/tmp/shots/live_admin_login.png" });

  await b.close();
  console.log("problemen:", [...new Set(failed)].slice(0, 10));
})();
