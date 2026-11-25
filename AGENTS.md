# Perfecthous — projectnotes

Fullstack-website voor **Perfecthous**, allround bouw- en klusbedrijf, Schuitvaartgracht 85,
4382 GJ Vlissingen. Doel: bezoekers omzetten in offerteaanvragen, belletjes en WhatsApp.
De oude statische site staat in `legacy-static/` (alleen referentie voor tekst en foto's).

## Draaien

```bash
./scripts/serve.sh                      # preview: wacht op installatie, start DB, serveert de build
npm run dev -- -p $PORT -H 0.0.0.0      # alleen voor ontwikkelen; Next 16 kent geen --host
npx prisma db push && npm run db:seed   # alleen bij een verse database
```

**Gebruik in de preview altijd `scripts/serve.sh`, niet `next dev`.** De werkruimte
installeert bij elke sessie de dependencies opnieuw; een draaiende dev-server ziet
`node_modules` veranderen en blijft dan minutenlang wachten ("Turbopack has seen
frequent file updates") of valt om met "Could not find the Next.js package". Het script
wacht tot de bestanden stil staan, start Postgres, gebruikt de bestaande build (of maakt
er een) en serveert die met `next start`. Antwoordt de productieserver niet, dan valt het
terug op de dev-server.

De database draait in de container `perfecthous-db` (image `postgres:16-alpine`,
volume `perfecthous-pgdata`, poort 5432). Op deze VM is PostgreSQL niet als
systeempakket geïnstalleerd; Docker is de betrouwbare route. Bij een verse database:

```bash
docker run -d --name perfecthous-db -p 5432:5432 \
  -e POSTGRES_USER=perfecthous -e POSTGRES_PASSWORD=perfecthous \
  -e POSTGRES_DB=perfecthous \
  -v perfecthous-pgdata:/var/lib/postgresql/data postgres:16-alpine
```

Postgres: user/wachtwoord `perfecthous`, database `perfecthous` op localhost:5432.
De database moet **UTF8** zijn (`SHOW server_encoding`), anders faalt de seed met
`22P05 … encoding "WIN1252"` zodra er Arabische tekst in de vertaalvelden staat.
Op deze host draait een native Postgres (geen `docker` CLI beschikbaar); opnieuw
aanmaken kan met een Prisma-client op `datasourceUrl` naar `/postgres` en dan
`DROP DATABASE IF EXISTS perfecthous WITH (FORCE)` + `CREATE DATABASE perfecthous
WITH OWNER perfecthous ENCODING 'UTF8' TEMPLATE template0`.
`.env` wordt niet bewaard tussen turns; `.env.example` moet genoeg zijn voor een verse kopie.
Beheerderslogin na seed: `beheer@perfecthous.nl` / `WijzigDitWachtwoord123!` (wijzigen!).
Prisma houdt op Windows `query_engine-windows.dll.node` vast: stop de server vóór
`npm run db:seed` of `npm run build`.

## Drie talen: Nederlands, Engels en Arabisch

De publieke site is drietalig. Nederland is de standaardtaal en de bron van alle copy.

- **URL's**: `/nl/...`, `/en/...`, `/ar/...`. `/` kiest een taal uit `Accept-Language`
  en stuurt 307 door; oude onbegrensde paden gaan met 308 naar `/nl/...`. De slugs
  (dienst-, project- en blognamen) zijn in alle talen gelijk.
- **Routering**: `proxy.ts` doet de taalredirect en zet `X-Frame-Options`. De locales
  staan in `lib/i18n/config.ts` (`localePath`, `stripLocale`, `alternateLanguages`,
  `switchLocalePath`). Er zijn twee root-layouts: `app/[locale]/layout.tsx` (zet
  `lang` en `dir`, Arabisch is RTL) en `app/admin/layout.tsx`. Onbekende paden vallen
  op `app/global-not-found.tsx` (`experimental.globalNotFound`).
- **UI-copy** staat in `lib/i18n/dict/`: `common`, `home`, `services`, `projects`,
  `work-area`, `company`, `pages` (contact, offerte, bedankt, blog, juridisch,
  validatiemeldingen) en `forms` (offerte- en contactformulier). Elk bestand heeft
  `nl` als bron en `en`/`ar` als `typeof nl`, dus een vergeten sleutel is een
  typefout. `fill()` vult `{naam}`-plaatshouders, `formatDate()` maakt datums per taal.
- **Taalkeuze**: één uitklapmenu (`<details>`) in de header, met twee
  instanties: naast het hoofdmenu vanaf `lg`, bij de knoppen onder `lg` (dus ook
  op mobiel). Er is geen aparte talenrij in het mobiele menu meer. Het menu sluit
  bij Escape en bij een klik erbuiten, en linkt via `switchLocalePath()` naar
  dezelfde pagina in de andere taal. De taalkeuze en de menuknop hebben geen
  rand: hover gaat via tekstkleur en een lichte waas.
- **Mobiel menu**: de menuknop opent een paneel in de header. Het sluit bij Escape,
  bij een klik of tik buiten het paneel (de knop zelf uitgezonderd, anders sluit en
  heropent één tik hem) en bij een routewissel. De header past op elke breedte:
  vanaf `lg` staan menu, taalkeuze en knoppen dichter op elkaar (`lg:gap-3.5`,
  `lg:gap-2` tussen de menulinks) zodat er bij 1024 px niets buiten de marge valt.
- **Meta en alt-teksten**: `lib/i18n/site-meta.ts` levert titelregel, beschrijving en
  `og:image`-alt per taal (ook voor `localBusinessSchema(locale)`).
  `lib/image-alts.ts` heeft de alt-teksten per taal, dus geef `locale` mee aan
  `serviceImageAlt()` en `projectImageAlt()`. Placeholders als `[KvK-nummer]` volgen
  de taal via `siteValue()` — anders staat er Nederlands tussen de Engelse tekst.
- **Database-content**: `Service`, `Project`, `Review` en `Post` hebben een
  `translations Json?`-veld met `{ "en": { … }, "ar": { … } }`. Nederlands blijft in
  de gewone kolommen; `lib/i18n/content.ts` (`localizeService/Project/Review/Post`)
  valt per veld terug op het Nederlands als een vertaling ontbreekt.
- **Blogartikelen** zijn volledig vertaald (kop, excerpt, categorie en tekst) in
  `prisma/seed-translations-content.ts`. Ontbreekt een vertaling, dan valt de
  detailpagina terug op Nederlands met een notice erboven
  (`hasTranslation()` in `lib/i18n/content.ts`). **Juridische teksten** blijven
  Nederlandstalig (Nederlandse regels en aansprakelijkheid) met een notice in EN/AR.
  De beheeromgeving blijft Nederlands.
- Nieuwe publieke pagina? Zet hem onder `app/[locale]/`, geef `PageHero` een
  `locale`-prop, gebruik `localePath(locale, …)` voor elke link en neem de route op in
  `app/sitemap.ts` (die maakt zelf de drie taalversies met hreflang).
- Formulieren geven `locale` mee als hidden veld; de server actions lezen dat en
  kiezen met `quoteSchemaFor(locale)` / `contactSchemaFor(locale)` de juiste
  foutmeldingen. Klantmails volgen de taal van de pagina, mails aan de eigenaar
  blijven Nederlands (met de gebruikte taal erbij).

## Structuur

- `app/[locale]/` — publieke pagina's; `app/[locale]/layout.tsx` bevat header, footer,
  mobiele belbalk en cookiebanner. `app/admin/` valt buiten die map en heeft dus geen
  marketing-chrome. `app/layout.tsx` is alleen de doorgang naar de taal-layout.
- `app/admin/(dashboard)/` — beveiligde pagina's; `app/admin/login/` staat erbuiten.
- `components/` — `ui/` (knoppen, secties, formvelden), `layout/`, `forms/`, `admin/`, `seo/`.
- `lib/` — `site.ts` (bedrijfsgegevens, werkgebied, tel/WhatsApp-links), `db.ts`,
  `validation.ts` (Zod per taal), `rate-limit.ts`, `uploads.ts`, `mail.ts`,
  `markdown.ts`, `i18n/` (config, content, dict).
- Server actions staan in `app/actions/`; elke beheeractie begint met `requireAdmin()`.
  Actions zijn los aanroepbaar, dus nooit alleen op de UI vertrouwen.

## Beeld: eigen opnames, en gegenereerd sfeerbeeld waar die ontbreken

**Er staat geen stockbeeld meer op de site.** De foto's in `public/images/` zijn eigen
opnames van Perfecthous, gedownload van het Google Maps-profiel van het bedrijf,
aangevuld met drie gegenereerde beelden voor de plekken waar geen eigen opname bestaat:
de homehero (`hero-verbouwing.jpg`), de dienst Aanbouw & uitbouw (`sfeerbeeld-aanbouw.jpg`) en
de dienst Loodgieterswerk (`sfeerbeeld-sanitair.jpg`). De klant wilde daar liever een
gegenereerd sfeerbeeld dan een leeg vlak of andermans werk, en heeft daar expliciet om
gevraagd. Een gegenereerd beeld komt **nooit** op een projectpagina: op `/projecten`
staat dat alle foto's eigen opnames zijn, en dat moet kloppen. Zet bij gegenereerd beeld
een onderschrift of alt-tekst die het als sfeerbeeld benoemt ("Sfeerbeeld · …"), nooit
"eigen werk". Voeg nooit zomaar een stockfoto toe.

Op het profiel staan circa 118 foto's, waarvan de meeste van bezoekers en de 360-tour
zijn. De eigen werkfoto's zijn op te halen via de fotogalerij: open de place-pagina in
de previewbrowser, klik de fotogalerij open en lees de `gps-cs-s`-URL's uit
(`performance.getEntriesByType('resource')` na het scrollen). Achter de URL hoort
`=s0` voor het origineel of `=w1600` voor een bruikbare uitsnede. Let op: de
360-opnames leveren bij `=s0` een enorm bestand (7536 x 16320) — gebruik de
`=w1600`-variant en snijd die bij met sharp (`node -e`, sharp zit in node_modules).

## Projectfoto's van het Google Maps-profiel

Het Google Maps-profiel van Perfecthous heeft twee eigen foto's, beide te vinden via de
fotolinks in de Maps-URL (`lh3.googleusercontent.com/gps-cs-s/...=s0` levert het
origineel):

1. "Foto - mei 2026": geen panorama maar een collage van drie opnames onder elkaar,
   7536 x 16320 px, naden op y=4635 en y=11116. Daaruit zijn drie 4:3-foto's gesneden:
   `perfecthous-plafond.jpg` (led-lichtlijnen in het plafond), `perfecthous-tvwand.jpg`
   (wand met tv en schouw) en `perfecthous-vloer.jpg` (eiken vloer).
2. Een portretfoto van 1080 x 1920 van een bedrijfsruimte (groenwand, zwarte
   3D-wandpanelen, led-verlichting, wasunits). Daaruit zijn `perfecthous-salon.jpg`
   (1080 x 810, y=555) en `perfecthous-salon-detail.jpg` (960 x 720, x=40 y=880)
   gesneden met sharp. Ze horen bij het seed-project `interieur-afbouw-vlissingen`. De alt-teksten
staan in `lib/image-alts.ts` (`projectImageAlt`, `serviceImageAlt`), want
"detailfoto 2" zegt niets over deze beelden. Bij het project staat een bronvermelding;
de overige projecten blijven voorbeelden met gelicentieerd beeld.

Waar ze nu staan: `perfecthous-vloer.jpg` is de dienst Vloeren (en zit in de galerij van
het vloerproject), de homehero is het gegenereerde `hero-verbouwing.jpg`,
`perfecthous-tvwand.jpg` de omslag van het eerste project, en
`perfecthous-plafond.jpg` de dienst Elektrisch werk. De salonfoto's horen bij het
project `bedrijfsruimte-afbouw-vlissingen` (uitgelicht op de home).

De losse werkfoto's (`maps-keuken`, `maps-tegelwand`, `maps-kamer`, `maps-gang`,
`maps-deur`, `maps-terras`, `maps-tegel`, `maps-trap`) zijn uitsnedes van die
profielgalerij, gebruikt bij de diensten, de projecten en de paginakoppen.
`maps-tegelwand` is de close-up van de tegelachterwand in metselverband uit de
keukenfoto; die staat bij de dienst Tegelwerk en in het keukenproject. De twee
terrasfoto's horen alleen bij het terrasproject: de klant wil de terrasfoto niet bij
Tegelwerk of Aanbouw, omdat hij daar niet bij past. Er staat een foto van een verfdoos tussen de profielfoto's
( eerder `maps-kasten`) — die is verwijderd, want hij zei niets over het werk.

**Van een aanbouw of uitbouw en van loodgieterswerk staat geen eigen opname op het
profiel.** Die twee diensten hebben nu een gegenereerd sfeerbeeld in de seed
(`sfeerbeeld-aanbouw.jpg`, `sfeerbeeld-sanitair.jpg`), op verzoek van de klant; de dienstenpagina
en de detailpagina kunnen nog steeds een dienst zonder `image` aan (het icoon op een
rustig vlak, `service.image ? … : …`). Nooit een foto van ander werk invullen om het
vlak te vullen: dat was precies de klacht over de terrasfoto bij Aanbouw & uitbouw.
De galerij op Google Maps vraagt inmiddels om een Google-login; de eigen foto's zijn
zonder login te vinden via het kennispanneel in Google Zoeken (zoek op de bedrijfsnaam
en lees de `grass-cs`-URL's uit; achter de URL `=s0` voor het origineel). Let op: een
`fetch` van de zoekpagina levert ook foto's van andere bedrijven (Hozzasas, Perfect
Totaalbouw, Alaïna Bouw); alleen afbeeldingen met alt `Afbeelding van Perfecthous`
zijn van de klant. Het complete eigen bestand is acht foto's: collage (plafond, tvwand,
vloer), salonportret, keuken, woonkamer met tv, twee 360-composities en de buitendeur
met kruipluik. Daar zit **geen** aanbouw, badkamer of sanitair werk bij. Ook de
bezoekersfoto's zijn nagelopen: de ene reviewer heeft een selfie en een regenboogfoto
geplaatst, de andere geen eigen foto's. Levert de klant alsnog een eigen opname aan
voor Aanbouw & uitbouw of Loodgieterswerk, vervang dan het gegenereerde beeld en
verwijder het bestand.
Locatie en jaar van alle projecten zijn aannames (Vlissingen, 2026) — bevestigen bij
de klant.
Ook de projectteksten beschrijven alleen wat op de foto's te zien is. De tvwand alleen als
projectfoto gebruiken, niet als paginakop: op groot formaat is de televisie met
streamingmenu het eerste wat je ziet. De dienstenpagina toont per dienst een foto
(16:10) met het icoon als papieren chip. De vijftien gelicentieerde stockfoto's zijn
verwijderd: ze waren deels donker, gedateerd, een CGI-render of overduidelijk
gestaged, en de klant wil uitsluitend eigen beeld op de site.

## Preview en inkaderen

De preview toont de site in een iframe van een ander domein. `X-Frame-Options:
SAMEORIGIN` blokkeert dat: het paneel blijft dan leeg, terwijl `curl` gewoon 200
geeft. Die header staat daarom in `proxy.ts` (Next 16; heette middleware), niet in
`next.config.ts` — `headers()` daar wordt bij de build uitgevoerd en kent de
omgeving dan nog niet. In de preview en op localhost wordt de header weggelaten,
op een echt domein gezet.

Verder zet geen enkel component `opacity: 0` als beginstand in de HTML: `Reveal`
gebruikt een IntersectionObserver met een zichtbare standaardtoestand en een
vangnet-timer. Zo blijft de pagina leesbaar als JS niet laadt.

## Vastgelegde keuzes

- **Versies**: Next 16.4.6, React 19.3.1, Prisma **6.19.3** (Prisma 8 RC is onstabiel),
  `next-auth@beta` 5, Tailwind 4 (CSS-first `@theme` in `app/globals.css`).
- **Tokens**: inkt `#1a1d21`, papier `#f6f4f0`, messing `#b8924a`, `brass-ink #8a6b2f`
  (nodig voor AA-contrast op papier), muted `#5c6167`. Gebruik de tokens/klassen
  (`container-page`, `eyebrow`, `link-underline`), geen losse hexwaarden.
- **Stijlsysteem** (naar de taste-skill, zie `## Testen`): één knopvorm uit
  `components/ui/button.tsx` — hover 1 px omhoog, `active:scale-[0.96]`; kaarten uit
  `components/ui/card.tsx` tillen 2 px en hun foto zoomt naar 1.03; typeschaal
  h1 ≤ 72 px, h2 ≤ 48 px, kaarttekst 15 px, labels ≥ 12 px; sectiepadding op de
  4-punts schaal (`sm/md/lg` in `components/ui/section.tsx`). Kleine tekst niet
  lichter dan `text-paper/65` op donker en `text-muted` op papier.
- **Logo**: huis met schoorsteen en een PH-monogram, overgetekend van het
  aangeleverde logo (`components/brand/logo.tsx`, viewBox 231 × 220 = de gemeten
  pixels van het origineel, dus de maten in het bestand zijn de maten uit de
  foto). Details die moeten blijven: het dak is een band van 18 dik waarvan de
  bovenrand tot de punt doorloopt en de onderrand 20 eenheden eerder stopt (de
  puntige einden: eerst een recht facet van 3,5, dan een zwakke helling naar de
  onderrand), het zweeft boven de letters en steekt links en rechts 34 eenheden
  uit, de schoorsteen staat recht boven de rechterstijl van de H en verdwijnt in
  het dak, de P-rechterstijl is meteen de linkerstijl van de H en loopt bovenin
  over in de schouder van de kom — er steekt geen blokje boven die schouder uit
  — de H-rechterstijl loopt wel tot de kapitaalhoogte, de onderkant van de P-kom
  en de dwarsbalk van de H zijn één doorlopende lijn net onder het midden, en
  die balk begint bij de binnenkant van de P-stijl, niet bij de buitenkant. De
  letters zijn gevulde vlakken, geen streken: de stijlen zijn 21,5 breed en de
  horizontale balken 18, met de kapitaalhoogte op 91 en de basis op 218,5. De
  kom van de P is een ruime bocht — buitenradius 35,5 die al op x = 91 begint en
  tot de rechterkant op 126,5 loopt, binnenhoek 16,5; een krappere bocht maakt
  de P te vierkant. Het origineel is een 3D-mockup: de dwarsbalk ligt daar ~4°
  scheef en alle randen hebben bevelglans — hier is alles vlak en waterpas. Woordmerk staat in kapitalen
  (`PERFECTE HUIS`, DM Sans 600, 12 px in de header); daaronder per taal de
  tagline uit `lib/i18n/dict/common.ts` (`logoTagline`). Beeldmerk is messing
  (`#b8924a` op donker, `#8a6b2f` op papier); het woordmerk volgt `tone`, dus
  inkt op papier en papier op donker.
- **Fonts** self-hosted via `next/font/local` in `app/fonts/`;   `fontClassName(locale)`
  kiest voor Arabisch een Arabische stack. In `app/globals.css` staan RTL-overrides
  (`letter-spacing: normal` voor Arabisch, spiegelende randen en iconen via `rtl:`).
  Het logo-woordmerk is Latijns en houdt via `.font-brand` zijn eigen font én
  tracking, ook op `/ar`; die selector is daarom uitgezonderd van de
  `letter-spacing: normal`-regel.
- **Foto's**: eigen opnames van het Google Maps-profiel, plus gegenereerd sfeerbeeld op
  de homehero en de twee diensten zonder eigen opname (zie hierboven). Geen stockbeeld,
  ook niet als plaatshouder, en geen gegenereerd beeld op een projectpagina.
- **Projecten en reviews in de seed zijn voorbeelden**, geen echte klanten. Dat staat ook
  op de site en in de README. Nooit verzonnen sterren of Google-cijfers tonen.
- **Privacy**: cookiekeuze in `localStorage` (`ph-consent-v1`), niets geplaatst vóór
  toestemming. Google Maps laadt pas na een klik (`components/map-embed.tsx`).
- **Spam**: honeypot + rate limiting op gehasht IP in de database; Turnstile is optioneel
  en inert zonder `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
- **Uploads** gaan naar `public/uploads` (UUID-bestandsnamen, type- en groottecheck).
  Op Vercel is dat vluchtig: vóór productie vervangen door object storage. Overal wordt
  met paden/URL's gewerkt, dus alleen `lib/uploads.ts` + `app/actions/upload.ts` wijzigen.
- **Blog** gebruikt een eigen Markdown-subset-renderer die alle HTML escapet
  (`lib/markdown.ts`); nooit `dangerouslySetInnerHTML` met ruwe gebruikersinvoer.

## Testen

Playwright staat niet in het project (diskspace). Installeer het los, bijv.
`mkdir -p /tmp/pwtools && cd /tmp/pwtools && npm i playwright` en werk daarna de
require-paden in `scripts/*.cjs` bij: de scripts lezen `PW_PATH` (modulepad) en
`CHROME_PATH` (binary), handig als de geïnstalleerde versie niet bij de Chromium
in de cache hoort. Draai tegen een gestarte server:

```bash
node scripts/overflow.cjs     # 320–1920 px: geen overflow en header past overal
node scripts/admin-test.cjs   # login, statusflow, project-CRUD, mobiel beheer
node scripts/test-e2e.cjs     # offerte- en contactformulier end-to-end
```

`npm run build` moet schoon blijven (TypeScript strict). Bij nieuwe pagina's: metadata,
canonical + `alternateLanguages` en een `PageHero` met `locale` toevoegen, en de route
in `app/sitemap.ts` zetten (die genereert de drie taalversies). Controleer na een
wijziging `/nl`, `/en` en `/ar` en of `/ar` echt `dir="rtl"` heeft.

## Beveiliging

- **Headers** staan in `proxy.ts` (niet in `next.config`: `headers()` draait bij de
  build, dus dan ligt de omgeving nog niet vast): `Content-Security-Policy`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, en buiten de
  preview `X-Frame-Options` + `frame-ancestors`. `Strict-Transport-Security` volgt
  zodra het verzoek over https komt (`x-forwarded-proto`), dus achter de Plesk-proxy
  komt hij automatisch mee. `/admin` en `/api` krijgen `X-Robots-Tag: noindex`.
- **Geen nonce in de CSP.** Een nonce-CSP kan alleen met pagina's die per verzoek
  renderen; dat kost de statische build op alle routes (gemeten: alles werd `ƒ`
  in plaats van statisch). Daarom staat `script-src 'self' 'unsafe-inline'` aan en
  zijn de andere richtingen dicht: alleen `challenges.cloudflare.com` (Turnstile)
  en `maps.google.com`/`www.google.com` (kaart na toestemming) zijn extern
  toegestaan. Voeg nooit een scriptbron toe zonder die hier te noemen.
- **Inloggen**: bcrypt (kosten 12), generieke foutmelding, dummy-hash bij een
  onbekend e-mailadres (gelijke responstijd) en rate limiting per gehasht IP
  (10 pogingen per kwartaal van een kwartier). Elke beheeractie begint met
  `requireAdmin()`.
- **Secrets**: alleen via env, nooit in de repo. `.env` staat in `.gitignore`.
  De repo is openbaar, dus het standaard-beheerderswachtwoord staat op straat:
  `prisma/seed.ts` weigert in productie een account daarmee aan te maken.
- **Uploads**: type- en groottecheck, UUID-bestandsnaam, geen SVG. `public/uploads`
  is de enige schrijfbare map; zet die in de back-up.
- **Dependencies**: Prisma blijft op 6.19.3 (7 vraagt een migratie, 8 RC is
  onstabiel) — de vier resterende audit-meldingen zitten in de Prisma-CLI en
  raken de runtime niet. `nodemailer` is verwijderd: mail gaat via Resend, en
  `@auth/core` sleept die alleen mee voor de e-mailprovider die wij niet
  gebruiken.

## Live op Plesk

De app draait als Node.js-applicatie onder Phusion Passenger. Startbestand is
`server.js` (geeft `PORT` ongewijzigd door: Plesk levert daar soms een socket-pad).
Application root `perfecthous`, document root `perfecthous/public`, mode
`production`. `NEXT_PUBLIC_*` wordt bij de build ingebakken, dus env eerst goed
zetten, dan `npm ci && npx prisma db push && npm run db:seed && npm run build`.
De volledige handleiding met checklist staat in `DEPLOY.md`.

## Nog vóór livegang

Placeholders (`[telefoonnummer]`, `[KvK-nummer]`, …) invullen via env, echte projecten en
reviews plaatsen, juridische teksten laten controleren, openingstijden/spoedservice
bevestigen, Resend-domein verifiëren en het standaardwachtwoord wijzigen. Zie
`DEPLOY.md` voor de Plesk-stappen en de beveiligingschecklist.
