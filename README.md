# Perfecthous — website

Compleet fullstack-website voor **Perfecthous**, een allround bouw- en klusbedrijf in
Vlissingen (Schuitvaartgracht 85, 4382 GJ). Met een publieke site die bezoekers omzet in
offerteaanvragen en een beheerpaneel om aanvragen, projecten, reviews en blogartikelen
te beheren.

## Wat zit erin

**Publieke site** — Next.js App Router, Server Components waar mogelijk.

| Route | Inhoud |
| --- | --- |
| `/` | Hero, vertrouwensbalk, diensten, uitgelicht werk, werkwijze, reviews, CTA |
| `/diensten` + `/diensten/[slug]` | 9 diensten met intro, wat we doen, werkwijze, FAQ en gerelateerde projecten |
| `/projecten` + `/projecten/[slug]` | Filterbaar raster, detailpagina met galerij en voor/na-slider |
| `/over-ons`, `/werkgebied`, `/reviews`, `/faq` | Verhaal, waarden, team, werkgebied, reviews, accordeon-FAQ |
| `/offerte` | Meerstaps formulier met validatie en foto-upload → `/bedankt` |
| `/contact` | Formulier, adres, openingstijden, kaart die pas na klik laadt |
| `/blog` + `/blog/[slug]` | Kennisbank, beheerbaar via het paneel |
| `/privacyverklaring`, `/algemene-voorwaarden`, `/cookieverklaring` | Juridisch, met cookiebanner |
| `/admin` | Beveiligd beheerpaneel |

**Beheerpaneel** (`/admin`, login via NextAuth credentials)

- Overzicht met tellingen en de laatste aanvragen.
- Offerteaanvragen: zoeken, filteren op status (nieuw / in behandeling / afgerond / spam),
  detailpagina met foto's, interne notities, statuswijziging, verwijderen.
- Contactberichten met dezelfde statusflow.
- Projecten, reviews en blogartikelen: aanmaken, bewerken, verwijderen, met fotoupload.
- CSV-export van aanvragen en berichten (`/api/admin/export?type=quotes|contacts`).

**Techniek**

- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict
- Tailwind CSS 4 (CSS-first tokens in `app/globals.css`)
- Prisma 6 + PostgreSQL
- NextAuth 5 beta (JWT-sessie, bcrypt-hashes)
- Resend voor e-mail (valt terug op console-logging zonder API-sleutel)
- Framer Motion voor subtiele animaties, met respect voor `prefers-reduced-motion`
- Zod voor validatie aan de serverkant
- Eigen Markdown-renderer voor blogberichten (escapet alle HTML)

## Lokaal draaien

Vereist Node.js 20+ en PostgreSQL 16.

```bash
# 1. Afhankelijkheden
npm install

# 2. Omgevingsvariabelen
cp .env.example .env
#    Zet minimaal DATABASE_URL en AUTH_SECRET (openssl rand -base64 32)

# 3. Database (Postgres 16; lokaal het snelst via Docker)
docker run -d --name perfecthous-db -p 5432:5432 \
  -e POSTGRES_USER=perfecthous -e POSTGRES_PASSWORD=perfecthous \
  -e POSTGRES_DB=perfecthous \
  -v perfecthous-pgdata:/var/lib/postgresql/data postgres:16-alpine
npx prisma db push              # schema aanmaken
npm run db:seed                 # voorbeeldcontent + beheerdersaccount
#    Na een herstart van de machine: docker start perfecthous-db

# 4. Starten
npm run dev                     # http://localhost:3000

# Voor de preview in deze omgeving: ./scripts/serve.sh
# (wacht op de dependency-installatie, start de database en serveert de build)
```

Inloggen op `/admin` met `ADMIN_EMAIL` en `ADMIN_PASSWORD` uit `.env`
(standaard `beheer@perfecthous.nl` / `WijzigDitWachtwoord123!` — **wijzig dit**).

### Beschikbare scripts

```bash
npm run dev        # ontwikkelserver
npm run build      # prisma generate + next build
npm run start      # productieserver (na build)
npm run db:push    # schema naar de database
npm run db:seed    # seed-data (idempotent)
npm run db:studio  # Prisma Studio
```

## Omgevingsvariabelen

| Variabele | Verplicht | Toelichting |
| --- | --- | --- |
| `DATABASE_URL` | ja | Postgres-connectiestring |
| `AUTH_SECRET` | ja | Random string voor sessie-encryptie |
| `AUTH_URL` / `NEXT_PUBLIC_SITE_URL` | ja | Publieke URL, gebruikt in mails en JSON-LD |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | ja | Alleen door de seed gebruikt |
| `RESEND_API_KEY` | nee | Leeg = mails worden naar de console gelogd |
| `MAIL_FROM` / `MAIL_TO` | nee | Afzender en ontvanger van meldingen |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | nee | Cloudflare Turnstile; leeg = honeypot + rate limiting |
| `NEXT_PUBLIC_COMPANY_*` | nee | Telefoon, e-mail, adres, KvK, btw, jaren ervaring |

## Deployen naar Vercel

1. Zet de repository op GitHub en importeer het project in Vercel.
2. Voeg de omgevingsvariabelen uit `.env.example` toe (Productie én Preview).
3. Gebruik een gehoste Postgres, bijvoorbeeld Neon of Supabase, als `DATABASE_URL`.
   Voeg `?sslmode=require` toe als de provider dat vraagt.
4. Deploy. Daarna eenmalig vanaf je eigen machine:
   ```bash
   DATABASE_URL="<productie-url>" npx prisma db push
   DATABASE_URL="<productie-url>" npm run db:seed
   ```
5. Zet `NEXT_PUBLIC_SITE_URL` en `AUTH_URL` op het definitieve domein.

### Belangrijk: foto-opslag in productie

Uploads gaan nu naar `public/uploads` op het lokale bestandssysteem. **Op Vercel is
dat vluchtig**: bestanden verdwijnen bij een nieuwe deployment. Vervang voor productie
`lib/uploads.ts` en `app/actions/upload.ts` door een object store (S3, Cloudinary of
Supabase Storage) en bewaar alleen de publieke URL in de database. De rest van de code
werkt ongewijzigd, omdat overal met paden/URL's wordt gewerkt.

## SEO en toegankelijkheid

- Unieke `title` en `description` per pagina via de Next.js metadata-API.
- Open Graph- en Twitter-tags op elke pagina.
- `sitemap.xml` en `robots.txt` worden gegenereerd uit de database.
- JSON-LD: `HomeAndConstructionBusiness`, `Service`, `FAQPage`, `BreadcrumbList` en `Article`.
- Semantische HTML, één `h1` per pagina, alt-teksten, zichtbare focusstijlen,
  skip-link, `aria-expanded` op het menu en de accordeon, 44px raakvlakken.
- Kleurcontrasten zijn gecontroleerd op AA; `--color-brass-ink` bestaat specifiek
  omdat het lichtere messing op papier niet haalt.

## Privacy en spam

- Cookiebanner plaatst niets vóór toestemming; de keuze staat in `localStorage`.
- De kaart op `/contact` laadt pas na een klik (geen Google-cookies vooraf).
- Honeypotveld op beide formulieren, rate limiting per IP-hash in de database
  (5 inzendingen per uur), optioneel Turnstile.
- IP-adressen worden alleen gehasht opgeslagen.
- Foto's van klanten worden alleen gebruikt voor hun eigen aanvraag.

## Wat vóór livegang moet gebeuren

Deze oplevering is technisch compleet, maar een aantal zaken vraagt de eigenaar:

1. **Plaatshouders invullen**: telefoonnummer, e-mail, KvK, btw en aantal jaren ervaring
   staan als env-variabelen met `[...]`-placeholders. Zonder invulling staan die
   letterlijk op de site.
2. **Projecten en reviews zijn voorbeelden.** Ze zijn realistisch geschreven, maar het
   zijn geen echte opdrachten of echte klanten. Vervang ze door eigen werk en vraag
   klanten om toestemming voor hun review. Verzonnen reviews zijn misleidend.
3. **Foto's**: het project "Plafond, wand en vloer in één traject" gebruikt de eigen
   foto's van het bedrijf, afkomstig van het Google Maps-profiel
   (`public/images/perfecthous-*.jpg`). Dat profiel bevat één collagefoto van drie
   opnames onder elkaar; die is hier in de drie oorspronkelijke foto's gesplitst
   (plafond met spots, wand met tv en schouw, eiken vloer). De overige projectfoto's
   zijn gelicentieerd beeldmateriaal (Wikimedia/Unsplash), geen eigen werk. Vervang
   die door eigen opdrachtfoto's.
4. **Juridische teksten zijn concepten.** Laat de privacyverklaring, algemene
   voorwaarden en cookieverklaring controleren en vul de datums en bedrijfsgegevens in.
5. **Openingstijden, spoedservice en werkgebied** zijn indicatief. Bevestig ze.
6. **Google-bedrijfsprofiel** koppelen en de reviewlink in `lib/site.ts` bijwerken.
7. **E-mail**: Resend-domein verifiëren, `MAIL_TO` op de juiste inbox zetten en testen.
8. **Wachtwoord wijzigen** van het standaard beheerdersaccount.

## Projectstructuur

```
app/
  (site)/            publieke pagina's (gedeelde header/footer)
  admin/             beheerpaneel + login
  actions/           server actions (offerte, contact, admin, upload, auth)
  api/               NextAuth-handlers en CSV-export
  sitemap.ts robots.ts not-found.tsx layout.tsx globals.css
components/
  ui/                Button, Section, Container, Card, formvelden
  layout/            header, footer, mobiele belbalk, cookiebanner
  forms/             offerteformulier, contactformulier, Turnstile
  admin/             nav, panelen, acties, uploadveld
  seo/               JSON-LD-componenten
lib/                 site-config, db, validatie, mail, uploads, markdown, rate limit
prisma/              schema + seed (content gesplitst in seed-services/seed-content)
public/images/       18 foto's: 15 gelicentieerd + 3 eigen (Google Maps-profiel)
public/uploads/      geüploade foto's (niet in git)
legacy-static/       de oude statische site, alleen als referentie
scripts/             Playwright-tests voor responsive en e2e
```

## Tests

De scripts in `scripts/` draaien tegen een gestarte dev-server en vereisen Playwright.
Installeer het buiten het project (het staat bewust niet in `package.json`):

```bash
mkdir -p /tmp/pwtools && cd /tmp/pwtools && npm i playwright
npx playwright install chromium
node scripts/overflow.cjs        # horizontale overflow op 9 breedtes
node scripts/smoke.cjs           # formulieren, beheer, CSV en responsive in één keer
node scripts/admin-test.cjs      # login, statusflow, project-CRUD
node scripts/test-e2e.cjs        # formulieren end-to-end
```

Getest en werkend: offerteformulier met foto-upload tot op de bedankpagina,
contactformulier, mobiel menu, alle beheerpagina's, CSV-export, projectfilter, en
geen horizontale overflow op 320–1920 px.
