#!/usr/bin/env python3
"""Bouwt de statische site: src/*.html fragmenten + layout -> *.html in de projectroot."""
import pathlib, re, html

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"

NAV = [
    ("index.html", "Home"),
    ("diensten.html", "Bouwdiensten"),
    ("loodgieter.html", "Loodgieter"),
    ("projecten.html", "Projecten"),
    ("over-ons.html", "Over ons"),
    ("contact.html", "Contact"),
]

PAGES = {
    "index": dict(file="index.html", title="Perfecthous — Bouw, verbouw en loodgieterswerk in Vlissingen",
                  desc="Perfecthous uit Vlissingen verzorgt bouw, verbouw, stuc- en schilderwerk en loodgietersdiensten. Eén partij voor het hele project, met vaste prijs en heldere planning."),
    "diensten": dict(file="diensten.html", title="Bouwdiensten — verbouw, stucwerk en afbouw | Perfecthous",
                     desc="Complete bouwdiensten in Vlissingen: verbouw, aanbouw, stucwerk, schilderwerk, tegelwerk en afbouw. Bekijk wat Perfecthous voor uw woning of pand doet."),
    "loodgieter": dict(file="loodgieter.html", title="Loodgietersdiensten Vlissingen — lekkage, sanitair, cv | Perfecthous",
                       desc="Loodgieter in Vlissingen en omgeving: lekkages, sanitair, kranen, riolering en cv-installaties. Snel ter plaatse, vaste prijs, netjes opgeleverd."),
    "projecten": dict(file="projecten.html", title="Projecten — uitgevoerd bouw- en renovatiewerk | Perfecthous",
                      desc="Een selectie van bouw-, renovatie- en loodgietersprojecten van Perfecthous in Vlissingen en Zeeland."),
    "over-ons": dict(file="over-ons.html", title="Over Perfecthous — bouwbedrijf in Vlissingen",
                     desc="Perfecthous is een lokaal bouw- en installatiebedrijf in Vlissingen. Vakmanschap, één aanspreekpunt en werk dat jaren meegaat."),
    "contact": dict(file="contact.html", title="Contact & prijsopgave | Perfecthous Vlissingen",
                    desc="Neem contact op met Perfecthous, Schuitvaartgracht 85 in Vlissingen. Bel 06 1629 8837 of vraag een prijsopgave aan."),
    "colofon": dict(file="colofon.html", title="Colofon & beeldverantwoording | Perfecthous",
                    desc="Bedrijfsgegevens, privacy en beeldverantwoording van de website van Perfecthous."),
}

HEAD = """<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#2b1338">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:locale" content="nl_NL">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/dmsans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/main.css">
<link rel="stylesheet" href="assets/css/pages.css">
</head>
<body>
<a class="skip" href="#main">Naar de inhoud</a>
<div class="utility">
  <div class="shell utility__inner">
    <p class="utility__note"><span class="dot"></span> Ma–vr 07:30–17:30 · spoedlijn loodgieter 7 dagen per week</p>
    <p class="utility__links">
      <a href="tel:+31616298837">06 1629 8837</a>
      <a href="contact.html">Prijsopgave aanvragen</a>
    </p>
  </div>
</div>
<header class="sitehead" data-header>
  <div class="shell sitehead__inner">
    <a class="brand" href="index.html" aria-label="Perfecthous, naar de homepage">
      <svg class="brand__mark" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="15" fill="#2b1338"/>
        <path d="M22 16v32" fill="none" stroke="#f6f3ec" stroke-width="4.6" stroke-linecap="round"/>
        <path d="M22 16h9.6L40 26l-8.4 10H22" fill="none" stroke="#f6f3ec" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 54h36" stroke="#d8f26b" stroke-width="2.8" stroke-linecap="round"/>
      </svg>
      <span class="brand__text">
        <span class="brand__name">Perfecthous</span>
        <span class="brand__sub">Bouw &amp; installatie · Vlissingen</span>
      </span>
    </a>
    <nav class="nav" aria-label="Hoofdmenu">
      <ul class="nav__list">
{nav}
      </ul>
    </nav>
    <div class="sitehead__actions">
      <a class="btn btn--ghost btn--sm" href="tel:+31616298837">
        <svg viewBox="0 0 24 24" aria-hidden="true" class="ico"><path d="M21 16.9v2.6a1.6 1.6 0 0 1-1.8 1.6 17 17 0 0 1-7.4-2.6 16.6 16.6 0 0 1-5.1-5.1A17 17 0 0 1 4.1 6a1.6 1.6 0 0 1 1.6-1.8h2.6A1.6 1.6 0 0 1 10 5.5c.1 1 .4 2 .8 2.9a1.6 1.6 0 0 1-.4 1.7L9.3 11a13.6 13.6 0 0 0 5.1 5.1l1.1-1.1a1.6 1.6 0 0 1 1.7-.4c.9.4 1.9.7 2.9.8A1.6 1.6 0 0 1 21 16.9Z"/></svg>
        06 1629 8837
      </a>
      <a class="btn btn--primary btn--sm" href="contact.html">Prijsopgave</a>
      <button class="navtoggle" type="button" aria-expanded="false" aria-controls="mobilemenu" aria-label="Menu openen">
        <span></span><span></span>
      </button>
    </div>
  </div>
  <div class="mobilemenu" id="mobilemenu" hidden>
    <ul>
{navmob}
    </ul>
    <a class="btn btn--primary" href="contact.html">Prijsopgave aanvragen</a>
  </div>
</header>
<main id="main">
"""

FOOT = """
</main>
<footer class="sitefoot">
  <div class="shell">
    <div class="sitefoot__grid">
      <div class="sitefoot__brand">
        <a class="brand brand--light" href="index.html" aria-label="Perfecthous">
          <svg class="brand__mark" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="15" fill="#f6f3ec"/>
            <path d="M22 16v32" fill="none" stroke="#2b1338" stroke-width="4.6" stroke-linecap="round"/>
            <path d="M22 16h9.6L40 26l-8.4 10H22" fill="none" stroke="#2b1338" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 54h36" stroke="#a8461f" stroke-width="2.8" stroke-linecap="round"/>
          </svg>
          <span class="brand__text"><span class="brand__name">Perfecthous</span><span class="brand__sub">Bouw &amp; installatie</span></span>
        </a>
        <p>Bouwbedrijf en loodgietersdienst uit Vlissingen. Verbouw, afbouw en installatiewerk voor woning en bedrijfspand in heel Zeeland.</p>
      </div>
      <div>
        <h2 class="sitefoot__head">Diensten</h2>
        <ul class="sitefoot__links">
          <li><a href="diensten.html#verbouw">Verbouw &amp; aanbouw</a></li>
          <li><a href="diensten.html#afbouw">Stuc- en schilderwerk</a></li>
          <li><a href="diensten.html#tegelwerk">Tegelwerk</a></li>
          <li><a href="loodgieter.html">Loodgieterswerk</a></li>
          <li><a href="loodgieter.html#spoed">Spoedservice</a></li>
        </ul>
      </div>
      <div>
        <h2 class="sitefoot__head">Bedrijf</h2>
        <ul class="sitefoot__links">
          <li><a href="over-ons.html">Over ons</a></li>
          <li><a href="projecten.html">Projecten</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="colofon.html">Colofon &amp; privacy</a></li>
        </ul>
      </div>
      <div>
        <h2 class="sitefoot__head">Contact</h2>
        <address class="sitefoot__address">
          Schuitvaartgracht 85<br>
          4382 GJ Vlissingen<br>
          <a href="tel:+31616298837">06 1629 8837</a>
        </address>
        <p class="sitefoot__hours">Ma–vr 07:30–17:30<br>Za op afspraak</p>
      </div>
    </div>
    <div class="sitefoot__bottom">
      <p>© <span data-year>2026</span> Perfecthous · Vlissingen</p>
      <p>KvK- en btw-gegevens op aanvraag</p>
    </div>
  </div>
</footer>
<div class="callbar">
  <a class="callbar__call" href="tel:+31616298837">Bel direct</a>
  <a class="callbar__quote" href="contact.html">Prijsopgave aanvragen</a>
</div>
<script src="assets/js/main.js" defer></script>
</body>
</html>
"""


def nav_html(current: str) -> str:
    rows = []
    for href, label in NAV:
        cur = ' aria-current="page"' if href == current else ""
        rows.append(f'        <li><a href="{href}"{cur}>{label}</a></li>')
    return "\n".join(rows)


def nav_mobile(current: str) -> str:
    rows = []
    for href, label in NAV:
        cur = ' aria-current="page"' if href == current else ""
        rows.append(f'      <li><a href="{href}"{cur}>{label}</a></li>')
    return "\n".join(rows)


def build():
    for key, meta in PAGES.items():
        frag = SRC / f"{key}.html"
        body = frag.read_text(encoding="utf-8")
        page = HEAD.format(title=html.escape(meta["title"]) if False else meta["title"],
                           desc=meta["desc"],
                           nav=nav_html(meta["file"]), navmob=nav_mobile(meta["file"]))
        (ROOT / meta["file"]).write_text(page + body + FOOT, encoding="utf-8")
        print("built", meta["file"])


if __name__ == "__main__":
    build()
