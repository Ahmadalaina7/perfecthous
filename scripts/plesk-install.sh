#!/usr/bin/env bash
# Zet de app klaar op een Plesk-server. Draai dit in de map met server.js:
#
#   bash scripts/plesk-install.sh          # eerste keer: incl. database vullen
#   bash scripts/plesk-install.sh --code   # volgende keer: zonder seed
#
# Daarna hoef je in Plesk alleen nog de application root, het startbestand en
# het document root te controleren en op Restart App te drukken.

set -u

MODE="${1:-}"
FAIL=0

step() { printf "\n\033[1m→ %s\033[0m\n" "$1"; }
ok()   { printf "  \033[32m✓\033[0m %s\n" "$1"; }
bad()  { printf "  \033[31m✗\033[0m %s\n" "$1"; FAIL=$((FAIL + 1)); }

APP_ROOT="$(pwd)"
echo "Perfecthous installeren in: $APP_ROOT"

step "1. Controle"
if [ ! -f server.js ] || [ ! -f package.json ]; then
  bad "draai dit in de map met server.js en package.json"
  exit 1
fi
ok "startbestand en package.json gevonden"

if ! command -v node >/dev/null 2>&1; then
  bad "node niet gevonden; gebruik Plesk → Node.js → Run script of SSH met Node in de PATH"
  exit 1
fi
NODE_V=$(node -v)
NODE_MAJOR=$(echo "$NODE_V" | sed 's/^v//' | cut -d. -f1)
NODE_MINOR=$(echo "$NODE_V" | sed 's/^v//' | cut -d. -f2)
if [ "$NODE_MAJOR" -gt 20 ] || { [ "$NODE_MAJOR" -eq 20 ] && [ "$NODE_MINOR" -ge 9 ]; }; then
  ok "node $NODE_V"
else
  bad "node $NODE_V is te oud; zet in Plesk een versie van 20.9 of hoger en probeer opnieuw"
  exit 1
fi

for name in DATABASE_URL AUTH_SECRET AUTH_URL NEXT_PUBLIC_SITE_URL; do
  if [ -n "$(printenv "$name" 2>/dev/null || true)" ]; then ok "$name is gezet"; else
    bad "$name ontbreekt in de omgeving; zet hem in Plesk → Node.js → Custom environment variables"
  fi
done
if [ -f .env ]; then
  ok ".env gevonden (wordt gebruikt als een variabele niet in de omgeving staat)"
fi

if [ "$FAIL" -gt 0 ]; then
  echo
  echo "Stop: zet eerst de rode punten hierboven goed. Een build zonder AUTH_SECRET"
  echo "of DATABASE_URL levert een app die start en meteen omvalt."
  exit 1
fi

step "2. Dependencies (inclusief dev, die zijn nodig om te bouwen)"
npm ci --include=dev || { bad "npm ci mislukt"; exit 1; }
ok "dependencies geïnstalleerd"

step "3. Bouwen"
if [ "$MODE" = "--code" ]; then
  npm run build:plesk:code || { bad "build mislukt"; exit 1; }
  ok "build klaar (zonder seed)"
else
  npm run build:plesk || { bad "build mislukt"; exit 1; }
  ok "build klaar (inclusief database en seed)"
fi

step "4. Schrijfrechten voor uploads"
mkdir -p public/uploads
if [ -w public/uploads ]; then ok "public/uploads is schrijfbaar"; else
  printf "  \033[33m!\033[0m public/uploads is niet schrijfbaar; laat de eigenaar dit doen:\n"
  echo "     chown -R \$(id -un):psacln public/uploads && chmod 775 public/uploads"
fi

step "5. Zet dit in Plesk (Websites & Domains → Node.js)"
cat <<TXT
  Application root        $APP_ROOT
  Application startup file  server.js
  Document root           $APP_ROOT/public
  Application mode        production
  Node.js version         20 of 22

  Verwijder daarna een eventuele index.html in de oude document root
  (meestal .../httpdocs/index.html) — die wint altijd van de app.

  Druk op Restart App en open https://<jouw-domein>/nl
TXT

step "6. Controle na het herstarten"
echo "  bash scripts/plesk-diag.sh"
