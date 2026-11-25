#!/usr/bin/env node
/**
 * Maakt een statische momentopname van de publieke site in `plesk-site/`.
 *
 * Waarom: op een LiteSpeed-webhost zonder Node kan de Next-app niet draaien.
 * Deze map wel: zet in Plesk het document root op `plesk-site` en de site is
 * zichtbaar zonder bouwen, npm of Passenger. Wat het niet kan: formulieren
 * versturen en het beheerpaneel. Daarom zet dit script een eerlijke melding
 * boven het formulier en een noindex-robots.txt.
 *
 * Gebruik (met de site draaiend op localhost):
 *   npm run dev -- -p 3000        # of ./scripts/serve.sh
 *   npm run snapshot
 *
 * Opnieuw maken na een inhoudswijziging: zelfde commando, dan committen.
 */
const fs = require("node:fs");
const path = require("node:path");

const BASE = (process.env.SNAPSHOT_BASE || "http://localhost:3000").replace(/\/$/, "");
const OUT = path.resolve("plesk-site");

const assetDirs = ["/images", "/uploads"];

const rel = (url) => url.replace(BASE, "");
const fileFor = (urlPath) => {
  const clean = urlPath.split("?")[0].split("#")[0];
  if (clean.endsWith("/")) return path.join(OUT, clean, "index.html");
  if (/\.[a-z0-9]+$/i.test(clean)) return path.join(OUT, clean);
  return path.join(OUT, clean, "index.html");
};

const write = (file, data) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
};

/**
 * Zet next/image-URL's om naar het originele bestand: statisch is er geen
 * optimizer. Dit moet over de hele pagina, niet alleen over `src`: de
 * RSC-payload en de preload-links bevatten dezelfde URL's, en na hydratie
 * zou React het beeld alsnog via de optimizer opvragen.
 */
const unwrapImages = (html) =>
  html.replace(/\/_next\/image\?url=([^&"'\s,]+)(?:&(?:amp;)?[a-z]+=[^"'\s,]*)*/g, (match, encoded) => {
    try {
      return decodeURIComponent(encoded);
    } catch {
      return match;
    }
  });

const noticeScript = `/* Statische momentopname: de site is echt, maar er is geen server.
   - Na hydratie zet next/image de optimizer-URL terug; die bestaat statisch
     niet, dus we zetten hem meteen weer op het originele bestand.
   - Navigatie gaat met een volledige pagina-lading: de RSC-payload bestaat
     niet, dus de router van Next kan geen pagina's inladen.
   - Formulieren kunnen niets versturen; dat zeggen we eerlijk. */
(function () {
  function plain(value) {
    var prefix = "/_next/image?url=";
    var text = value || "";
    if (text.indexOf(prefix) !== 0) return null;
    var encoded = text.slice(prefix.length).split("&")[0];
    try {
      return decodeURIComponent(encoded);
    } catch (error) {
      return null;
    }
  }

  function fixImage(image) {
    if (image.getAttribute("srcset")) image.removeAttribute("srcset");
    var fixed = plain(image.getAttribute("src"));
    if (fixed) image.setAttribute("src", fixed);
  }

  function fixWithin(node) {
    if (node.nodeType !== 1) return;
    if (node.tagName === "IMG") fixImage(node);
    if (node.querySelectorAll) {
      Array.prototype.forEach.call(node.querySelectorAll("img"), fixImage);
    }
  }

  function fixAll() {
    Array.prototype.forEach.call(document.images, fixImage);
  }
  document.addEventListener(
    "error",
    function (event) {
      if (event.target && event.target.tagName === "IMG") fixImage(event.target);
    },
    true
  );
  fixAll();
  window.addEventListener("load", fixAll);
  new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i += 1) {
      var record = records[i];
      if (record.type === "attributes") fixWithin(record.target);
      else for (var j = 0; j < record.addedNodes.length; j += 1) fixWithin(record.addedNodes[j]);
    }
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "srcset"],
  });

  document.addEventListener(
    "click",
    function (event) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var link = event.target.closest ? event.target.closest("a[href]") : null;
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;
      var url;
      try {
        url = new URL(link.href, location.href);
      } catch (error) {
        return;
      }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return;
      event.preventDefault();
      event.stopPropagation();
      location.assign(url.href);
    },
    true
  );

  var message =
    "Dit is een voorbeeldversie van de site: het formulier verstuurt niets. Bel of stuur WhatsApp voor een offerte.";
  function banner() {
    var bar = document.createElement("div");
    bar.setAttribute("role", "status");
    bar.textContent = message;
    bar.style.cssText =
      "position:fixed;inset-inline:0;bottom:0;z-index:9999;background:#1a1d21;color:#f6f4f0;" +
      "font:500 13px/1.5 system-ui,sans-serif;padding:10px 16px;text-align:center;";
    var close = document.createElement("button");
    close.textContent = "×";
    close.setAttribute("aria-label", "Melding sluiten");
    close.style.cssText =
      "position:absolute;inset-inline-end:8px;top:50%;transform:translateY(-50%);background:none;" +
      "border:0;color:inherit;font-size:20px;line-height:1;cursor:pointer;padding:4px 8px;";
    close.onclick = function () { bar.remove(); };
    bar.appendChild(close);
    document.body.appendChild(bar);
  }
  document.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      event.stopPropagation();
      banner();
    },
    true
  );
})();
`;

async function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  console.log(`Momentopname van ${BASE} → ${path.relative(process.cwd(), OUT)}`);

  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => rel(m[1].trim()));
  if (urls.length === 0) throw new Error("Geen URL's in de sitemap; draait de site wel?");
  console.log(`  ${urls.length} pagina's uit de sitemap`);

  let saved = 0;
  for (const urlPath of urls) {
    const response = await fetch(BASE + urlPath);
    if (!response.ok) {
      console.warn(`  ! ${urlPath} → ${response.status}, overgeslagen`);
      continue;
    }
    let html = await response.text();
    html = unwrapImages(html);
    html = html.replace("</body>", `<script src="/snapshot-notice.js" defer></script></body>`);
    write(fileFor(urlPath), html);
    saved += 1;
  }
  console.log(`  ${saved} pagina's geschreven`);

  // De builds en afbeeldingen komen van schijf: sneller en volledig.
  const copies = [
    [".next/static", path.join(OUT, "_next", "static")],
    ...assetDirs.map((dir) => [path.join("public", dir), path.join(OUT, dir)]),
  ];
  for (const [from, to] of copies) {
    if (!fs.existsSync(from)) {
      console.warn(`  ! ${from} bestaat niet, overgeslagen`);
      continue;
    }
    fs.cpSync(from, to, { recursive: true });
  }

  write(path.join(OUT, "snapshot-notice.js"), noticeScript);
  write(
    path.join(OUT, "index.html"),
    `<!doctype html><meta charset="utf-8"><title>Perfecthous</title>
<meta name="robots" content="noindex"><script>location.replace("/nl");</script>
<noscript><a href="/nl">Naar de site</a></noscript>`,
  );
  // Een voorbeeldversie hoort niet in Google; haal deze regel weg als dit de
  // echte site wordt.
  write(path.join(OUT, "robots.txt"), "User-agent: *\nDisallow: /\n");
  // Deze regels horen bij de map: types (anders weigert de browser de JS),
  // caching en een nette 404. De repo-root heeft zijn eigen .htaccess die
  // hiernaartoe stuurt; die twee horen bij elkaar.
  // Zelfde bestand als in de repo-root: types, caching en een nette 404.
  fs.copyFileSync("deploy/plesk/plesk-site.htaccess", path.join(OUT, ".htaccess"));

  const bytes = (dir) => {
    let total = 0;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      total += entry.isDirectory() ? bytes(full) : fs.statSync(full).size;
    }
    return total;
  };
  console.log(`  klaar: ${(bytes(OUT) / 1024 / 1024).toFixed(1)} MB`);
  console.log("  Document root in Plesk hiernaar zetten: " + path.join(process.cwd(), "plesk-site"));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
