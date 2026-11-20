/*
 * Controleert elke breedte van 320 t/m 1920 px op twee dingen:
 *
 *   1. horizontale overflow van de pagina (scrollWidth > clientWidth), en
 *   2. of de header heel blijft: logo, menu en knoppen mogen elkaar niet
 *      overlappen, niets mag buiten de headerrand vallen en geen label of
 *      knoptekst mag over twee regels breken.
 *
 * De header is op elke pagina dezelfde, dus de fijne sweep (elke 20 px) loopt
 * over een handvol representatieve pagina's in alle drie de talen; de volledige
 * paginalijst wordt op de gebruikelijke schermbreedtes gecontroleerd.
 *
 * Start eerst de preview: PORT=3000 ./scripts/serve.sh
 */
const { chromium } = require(process.env.PW_PATH || "/tmp/pwtools/node_modules/playwright");

const BASE = process.env.BASE_URL || "http://localhost:3000";

const pages = [
  "/",
  "/diensten",
  "/diensten/badkamer-keuken",
  "/projecten",
  "/nl/projecten/interieur-afbouw-vlissingen",
  "/over-ons",
  "/werkgebied",
  "/reviews",
  "/faq",
  "/offerte",
  "/contact",
  "/blog",
  "/blog/wat-kost-een-badkamerrenovatie",
  "/privacyverklaring",
  "/cookieverklaring",
];

// Pagina's waarop de fijne sweep loopt: alle talen plus de zwaarste layouts.
const sweepPages = [
  "/nl",
  "/en",
  "/ar",
  "/nl/diensten",
  "/nl/projecten",
  "/nl/blog/wat-kost-een-badkamerrenovatie",
  "/nl/offerte",
  "/ar/diensten",
];

const sweepWidths = [];
for (let w = 320; w <= 1920; w += 20) sweepWidths.push(w);
for (const w of [360, 390, 414, 640, 768, 900, 1024, 1180, 1280, 1366, 1440, 1600, 1800]) {
  if (!sweepWidths.includes(w)) sweepWidths.push(w);
}
sweepWidths.sort((a, b) => a - b);

const coarseWidths = [320, 360, 390, 414, 768, 1024, 1280, 1440, 1920];

// Meet in de pagina: overflow plus de geometrie van de headerrij.
function inspect() {
  const doc = document.documentElement;
  const problems = [];

  if (doc.scrollWidth > doc.clientWidth + 1) {
    problems.push(`document ${doc.scrollWidth}/${doc.clientWidth}`);
  }

  const header = document.querySelector("header");
  const row = header && header.querySelector("div.justify-between");
  if (!header || !row) return { problems: ["header niet gevonden"], gap: null };

  const box = (el) => el.getBoundingClientRect();
  const visible = (el) => {
    const r = box(el);
    const style = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && style.visibility !== "hidden";
  };

  const rowBox = box(row);
  const groups = [...row.children].filter(visible).map((el) => ({ el, r: box(el) }));

  const name = (el) =>
    el.tagName === "NAV" ? "menu" : el.tagName === "DIV" ? "knoppen" : el.tagName === "A" ? "link" : el.tagName.toLowerCase();

  // Groepen (logo, menu, knoppen) mogen elkaar niet raken en moeten binnen de
  // rij passen. Rechthoeken vergelijken in plaats van DOM-volgorde, zodat dit
  // ook in RTL (Arabisch) klopt.
  let gap = null;
  for (let i = 0; i < groups.length; i++) {
    for (let j = i + 1; j < groups.length; j++) {
      const a = groups[i].r;
      const b = groups[j].r;
      const overlap = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      if (overlap > 0.5) {
        problems.push(`overlap ${name(groups[i].el)} / ${name(groups[j].el)} ${overlap.toFixed(1)}px`);
      }
    }
  }
  const byX = [...groups].sort((a, b) => a.r.left - b.r.left);
  for (let i = 1; i < byX.length; i++) {
    const space = byX[i].r.left - byX[i - 1].r.right;
    gap = gap === null ? space : Math.min(gap, space);
  }
  for (const g of groups) {
    if (g.r.left < rowBox.left - 0.5 || g.r.right > rowBox.right + 0.5) {
      problems.push(`buiten de rij: ${name(g.el)} ${g.r.left.toFixed(0)}–${g.r.right.toFixed(0)}`);
    }
    if (g.r.height > rowBox.height + 1) {
      problems.push(`hoger dan de rij: ${name(g.el)} ${g.r.height.toFixed(0)}>${rowBox.height.toFixed(0)}`);
    }
  }

  // Tekst die over twee regels valt maakt de header rommelig en duwt de rij uit
  // zijn hoogte. Alleen echte tekstknopen tellen, zodat een logo dat uit
  // meerdere elementen bestaat niet ten onrechte als afgebroken geldt.
  const textLines = (el) => {
    const tops = new Set();
    for (const node of el.childNodes) {
      if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const r of range.getClientRects()) tops.add(Math.round(r.top));
    }
    return tops.size;
  };
  const wrapped = [];
  const labeled = new Set(header.querySelectorAll("a, summary, button, a span, button span"));
  for (const el of labeled) {
    if (!visible(el) || !el.textContent.trim()) continue;
    if (textLines(el) > 1) wrapped.push(`${name(el)}: ${el.textContent.trim().slice(0, 22)}`);
  }
  if (wrapped.length) problems.push(`afgebroken: ${wrapped.join(", ")}`);

  return { problems, gap };
}

async function main() {
  // Op deze machine hoort de gedownloade Playwright-versie niet altijd bij de
  // Chromium die in de cache staat; CHROME_PATH wijst dan de juiste aan.
  const browser = await chromium.launch(
    process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
  );
  const failures = [];
  let worstGap = Infinity;

  const run = async (widths, list, label) => {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 800 } });
      const page = await context.newPage();
      const bad = [];
      let gap = null;
      for (const path of list) {
        const response = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
        await page.evaluate(() => document.fonts.ready.then(() => {}));
        const result = await page.evaluate(inspect);
        if (response && response.status() >= 400) {
          result.problems.push(`status ${response.status()}`);
        }
        if (result.gap !== null) gap = gap === null ? result.gap : Math.min(gap, result.gap);
        if (result.problems.length) bad.push(`${path} → ${result.problems.join("; ")}`);
      }
      if (gap !== null) worstGap = Math.min(worstGap, gap);
      const summary = `min. ruimte tussen headergroepen: ${gap === null ? "n.v.t." : gap.toFixed(1) + "px"}`;
      if (bad.length) {
        failures.push({ width, bad });
        console.log(`${String(width).padStart(4)}px  ${label}: FAIL`);
        for (const item of bad) console.log(`          ${item}`);
      } else {
        console.log(`${String(width).padStart(4)}px  ${label}: ok  (${summary})`);
      }
      await context.close();
    }
  };

  console.log(`\n== fijne sweep 320–1920 px over ${sweepPages.length} pagina's ==`);
  await run(sweepWidths, sweepPages, "header + overflow");
  console.log(`\n== volledige paginalijst op vaste breedtes ==`);
  await run(coarseWidths, pages, "overflow");

  await browser.close();
  console.log(
    `\n${failures.length ? `MISLUKT: ${failures.length} breedte(s) met problemen` : `Alles in orde: ${sweepWidths.length + coarseWidths.length} metingen, kleinste ruimte tussen headergroepen ${worstGap.toFixed(1)}px`}`,
  );
  process.exit(failures.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
