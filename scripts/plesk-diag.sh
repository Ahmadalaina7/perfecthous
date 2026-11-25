#!/usr/bin/env bash
# Diagnose voor een Plesk-deploy. Draai dit in de map waar de app staat
# (Plesk → Node.js → Run script, of via SSH):
#
#   bash scripts/plesk-diag.sh
#
# Het script verandert niets; het kijkt alleen wat er ontbreekt.

set -u

FAIL=0
WARN=0

ok()    { printf "  \033[32m✓\033[0m %s\n" "$1"; }
bad()   { printf "  \033[31m✗\033[0m %s\n" "$1"; FAIL=$((FAIL + 1)); }
warn()  { printf "  \033[33m!\033[0m %s\n" "$1"; WARN=$((WARN + 1)); }
title() { printf "\n\033[1m%s\033[0m\n" "$1"; }

echo "Perfecthous — Plesk-diagnose"
echo "Map:   $(pwd)"
echo "Tijd:  $(date '+%Y-%m-%d %H:%M')"

title "1. Node en npm"
if command -v node >/dev/null 2>&1; then
  NODE_V=$(node -v)
  NODE_MAJOR=$(echo "$NODE_V" | sed 's/^v//' | cut -d. -f1)
  NODE_MINOR=$(echo "$NODE_V" | sed 's/^v//' | cut -d. -f2)
  if [ "$NODE_MAJOR" -gt 20 ] || { [ "$NODE_MAJOR" -eq 20 ] && [ "$NODE_MINOR" -ge 9 ]; }; then
    ok "node $NODE_V"
  else
    bad "node $NODE_V is te oud; zet in Plesk → Node.js een versie van 20.9 of hoger"
  fi
else
  bad "node niet gevonden — draai dit via Plesk → Node.js → Run script"
fi

title "2. Bestanden"
[ -f server.js ] && ok "server.js aanwezig (Application startup file)" \
  || bad "server.js ontbreekt — te oude clone: doe 'git pull'"
[ -f package.json ] && ok "package.json aanwezig" || bad "package.json ontbreekt — sta je in de application root?"
[ -d node_modules ] && ok "node_modules aanwezig" || bad "node_modules ontbreekt — draai 'npm ci'"
if [ -f .next/BUILD_ID ]; then
  ok "build aanwezig (.next/BUILD_ID)"
else
  bad "geen build — draai 'npm run build', zonder build start de app niet"
fi
[ -d public ] && ok "public/ aanwezig (document root)" || bad "public/ ontbreekt"
if [ -d public/uploads ]; then
  if [ -w public/uploads ]; then ok "public/uploads is schrijfbaar"; else bad "public/uploads is niet schrijfbaar (chown naar de Plesk-gebruiker)"; fi
else
  warn "public/uploads bestaat nog niet; wordt bij de eerste upload aangemaakt"
fi
if [ -f public/index.html ]; then
  bad "public/index.html bestaat — die kan de Node-app overschaduwen; verwijder hem"
fi

title "3. Omgeving"
check_env() { # naam, verplicht(1/0), voorbeeldwaarde die fout is
  local name="$1" required="$2" forbidden="${3:-}"
  local value
  value="$(printenv "$name" 2>/dev/null || true)"
  if [ -z "$value" ]; then
    if [ "$required" = "1" ]; then bad "$name ontbreekt"; else warn "$name ontbreekt (optioneel)"; fi
    return
  fi
  if [ -n "$forbidden" ] && [ "$value" = "$forbidden" ]; then
    bad "$name staat nog op de voorbeeldwaarde"
    return
  fi
  ok "$name is gezet"
}

if [ "${NODE_ENV:-}" = "production" ]; then
  ok "NODE_ENV is production"
else
  bad "NODE_ENV is '${NODE_ENV:-leeg}'; zet hem op production in Plesk"
fi
check_env AUTH_SECRET 1 "vervang-dit-door-een-lange-random-string"
check_env AUTH_URL 1 "http://localhost:3000"
check_env NEXT_PUBLIC_SITE_URL 1 "http://localhost:3000"
check_env DATABASE_URL 0 ""
check_env ADMIN_PASSWORD 0 "WijzigDitWachtwoord123!"
check_env RESEND_API_KEY 0 ""

case "${AUTH_URL:-}" in
  https://*) ok "AUTH_URL gebruikt https" ;;
  "") ;;
  *) warn "AUTH_URL is geen https-adres; de sessiecookie kan dan onbeveiligd zijn" ;;
esac

if [ -f .env ]; then
  warn ".env gevonden in de application root; Plesk-env-variabelen gaan vóór — houd één bron aan"
fi

title "4. Database"
if [ -n "${DATABASE_URL:-}" ] && [ -d node_modules ]; then
  if echo "SELECT 1;" | npx prisma db execute --stdin --schema prisma/schema.prisma >/dev/null 2>&1; then
    ok "database bereikbaar"
    ROWS=$(echo "SELECT count(*) FROM information_schema.tables WHERE table_schema='public';" \
      | npx prisma db execute --stdin --schema prisma/schema.prisma 2>/dev/null | tr -d '[:space:]' || true)
    [ -n "$ROWS" ] && echo "     tabellen in schema public: $ROWS (0 of leeg? draai 'npx prisma db push' en 'npm run db:seed')"
  else
    bad "database niet bereikbaar met DATABASE_URL — controleer gebruiker, wachtwoord en of PostgreSQL draait"
  fi
else
  warn "databasecontrole overgeslagen (geen DATABASE_URL of node_modules)"
fi

title "5. Antwoordt de app?"
PORT_TO_TRY="${PORT:-3000}"
[ "$PORT_TO_TRY" = "0" ] && PORT_TO_TRY=3000
CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "http://127.0.0.1:${PORT_TO_TRY}/nl" 2>/dev/null)
case "$CODE" in ''|000) CODE="geen verbinding" ;; esac
if [ "$CODE" = "200" ]; then
  ok "app antwoordt op poort ${PORT_TO_TRY} (/nl → 200)"
else
  warn "geen antwoord op 127.0.0.1:${PORT_TO_TRY} (code ${CODE}); Passenger gebruikt een eigen socket, dus dit hoeft geen fout te zijn"
  echo "     Kijk in Plesk → Node.js of de app draait en bekijk het logbestand."
fi

title "Samenvatting"
echo "  problemen: $FAIL   waarschuwingen: $WARN"
if [ "$FAIL" -eq 0 ]; then
  echo "  Ziet de site er nog uit als de Plesk-standaardpagina, dan wijst het document"
  echo "  root van het (sub)domein nog naar de oude map met Plesk's index.html."
  echo "  Zet het op '$(pwd)/public' en verwijder daar de index.html."
else
  echo "  Los de rode regels hierboven op en start de app opnieuw"
  echo "  (Plesk → Node.js → Restart App)."
fi
