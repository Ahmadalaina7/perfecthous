# Live zetten op Plesk

Deze site is een Next.js-app met een PostgreSQL-database. Op Plesk draait hij als
Node.js-applicatie (Phusion Passenger), met `server.js` als startbestand. Alles
wat hieronder staat is eenmalig; daarna is een update drie commando's.

## 1. Voorbereiden in Plesk

1. **Node.js-extensie** installeren (Plesk → Extensions → Node.js).
2. **Node-versie** op 20 of 22 zetten (Plesk → Node.js → *Node.js version*).
   Lager dan 20.9 werkt niet.
3. **Database** aanmaken: Plesk → Databases → *Add Database*, type PostgreSQL.
   Gebruik een eigen wachtwoord, niet `perfecthous`. Controleer daarna de encoding:
   ```sql
   SHOW server_encoding;   -- moet UTF8 zijn, anders faalt de Arabische tekst
   ```
4. **Document root** van het domein op `perfecthous/public` zetten
   (Plesk → Hosting Settings). De rest van de app staat bewust buiten de webroot.
5. **SSL** aanzetten met Let's Encrypt en *Secure all redirects* aan.

## 2. Code plaatsen

```bash
cd /var/www/vhosts/<domein>/
git clone https://github.com/Ahmadalaina7/perfecthous.git
cd perfecthous
```

Zonder git-toegang op de server: upload de ZIP van de repo en pak hem daar uit.

## 3. Node.js-app instellen

Plesk → Websites & Domains → **Node.js**:

| Veld | Waarde |
|---|---|
| Application root | `perfecthous` |
| Application startup file | `server.js` |
| Application mode | `production` |
| Document root | `perfecthous/public` |

Daarna onder **Custom environment variables** (niet in een `.env`-bestand in de
webroot):

```
NODE_ENV=production
AUTH_URL=https://www.perfecthous.nl
NEXT_PUBLIC_SITE_URL=https://www.perfecthous.nl
DATABASE_URL=postgresql://perfecthous:EIGEN-WACHTWOORD@localhost:5432/perfecthous
AUTH_SECRET=<openssl rand -base64 32>
ADMIN_EMAIL=beheer@perfecthous.nl
ADMIN_PASSWORD=<eigen lang wachtwoord>
RESEND_API_KEY=<sleutel>            # optioneel; zonder dit gaan mails naar de console
MAIL_FROM=Perfecthous <offerte@perfecthous.nl>
MAIL_TO=info@perfecthous.nl
NEXT_PUBLIC_COMPANY_PHONE=+31616298837
NEXT_PUBLIC_COMPANY_PHONE_DISPLAY=06 1629 8837
NEXT_PUBLIC_COMPANY_EMAIL=info@perfecthous.nl
NEXT_PUBLIC_WHATSAPP=31616298837
NEXT_PUBLIC_ADDRESS_STREET=Schuitvaartgracht 85
NEXT_PUBLIC_ADDRESS_CITY=Vlissingen
NEXT_PUBLIC_ADDRESS_ZIP=4382 GJ
NEXT_PUBLIC_KVK=<echt KvK-nummer>
NEXT_PUBLIC_VAT=<echt btw-nummer>
NEXT_PUBLIC_YEARS=<aantal jaar ervaring>
```

`NEXT_PUBLIC_*` wordt bij de **build** in de JS gebakken: zet ze goed vóór je
bouwt, anders staat er een oud telefoonnummer of `[KvK-nummer]` in de HTML.

## 4. Bouwen en de database vullen

Via Plesk → Node.js → **Run script**, of met SSH in de application root:

```bash
npm ci                 # installeert en draait prisma generate (postinstall)
npx prisma db push     # maakt de tabellen aan
npm run db:seed        # diensten, projecten, reviews, blog en de beheerder
npm run build          # prisma generate + next build
```

De seed weigert in productie een beheerder met het standaardwachtwoord aan te
maken; zet dus eerst `ADMIN_PASSWORD`.

Daarna **Restart App** in Plesk. De app luistert op de `PORT` die Plesk meegeeft.

## 5. Schrijfrechten voor uploads

Foto's uit het beheerpaneel komen in `public/uploads`. Die map moet de
applicatiegebruiker kunnen schrijven en de bestanden moeten na een deploy
blijven staan:

```bash
mkdir -p public/uploads
chown -R <plesk-user>:psacln public/uploads
chmod 775 public/uploads
```

Neem `public/uploads` mee in de back-up (Plesk → Backup Manager → *Files and
databases*). Bij een herinstallatie vanaf git verdwijnen geüploade foto's,
want ze staan niet in de repo.

## 6. Controleren na livegang

```bash
curl -sI https://www.perfecthous.nl/nl | grep -iE "content-security|strict-transport|x-frame|x-content|referrer|permissions"
```

Verwacht: `Content-Security-Policy`, `Strict-Transport-Security`,
`X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
Geen `X-Powered-By`.

Loop daarna met de hand na:

- [ ] `/nl`, `/en`, `/ar` geven 200 en `/ar` heeft `dir="rtl"`.
- [ ] `/` stuurt door naar de juiste taal en `http://` naar `https://`.
- [ ] Inloggen op `/admin` met het nieuwe wachtwoord werkt; een fout wachtwoord
      geeft dezelfde melding en na tien pogingen een blok van een kwartier.
- [ ] Offerteformulier verstuurt en de mail komt aan (of staat in het log).
- [ ] Een foto uploaden in het beheer en hem terugzien op de site.
- [ ] `/robots.txt` en `/sitemap.xml` verwijzen naar het echte domein.
- [ ] In de browserconsole geen CSP-fouten.

## 7. Updaten

```bash
cd /var/www/vhosts/<domein>/perfecthous
git pull
npm ci                 # alleen als package.json of package-lock.json wijzigde
npx prisma db push     # alleen als prisma/schema.prisma wijzigde
npm run build
```

Daarna **Restart App**. De omgevingvariabelen blijven staan.

## 8. Beveiligingschecklist

- [ ] `AUTH_SECRET` is een nieuwe random waarde, niet die uit de voorbeeldbestanden.
- [ ] `ADMIN_PASSWORD` is vervangen en het standaardwachtwoord uit de repo werkt niet.
- [ ] Databasewachtwoord is niet `perfecthous`.
- [ ] SSL aan, *Secure all redirects* aan; HSTS komt automatisch mee zodra de
      site over https draait.
- [ ] `.env` staat niet in de webroot en niet in git (`.gitignore` regelt dat).
- [ ] `public/uploads` is niet uitvoerbaar gemaakt (Plesk serveert alleen statisch).
- [ ] Back-up van database én `public/uploads` staat aan.
