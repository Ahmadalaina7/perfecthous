#!/usr/bin/env bash
#
# Startcommando voor de preview. Waarom niet gewoon `next dev`?
#
# De werkruimte installeert bij elke sessie de dependencies opnieuw. Een dev-
# server die al draait ziet node_modules intussen veranderen en kan dan uren
# blijven wachten ("Turbopack has seen frequent file updates") of omvallen met
# "Could not find the Next.js package". Daarom:
#
#   1. wachten tot de installatie klaar is (bestandstijden staan stil),
#   2. .env aanmaken als die ontbreekt, database starten, schema/seed controleren,
#   3. bestaande productiebuild gebruiken, of er een maken,
#   4. server starten; lukt dat niet, dan alsnog de dev-server.
#
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

log() { printf '[serve] %s\n' "$*"; }

# ---------- 1. Wachten tot node_modules niet meer verandert ----------
stable=0
for _ in $(seq 1 120); do
  newest=$(find node_modules -maxdepth 3 -newermt '-3 seconds' -print -quit 2>/dev/null)
  if [ -z "$newest" ] && [ -f node_modules/next/package.json ]; then
    stable=$((stable + 1))
    [ "$stable" -ge 2 ] && break
  else
    stable=0
  fi
  sleep 2
done
log "dependencies staan stil; next=$(node -p "require('./node_modules/next/package.json').version" 2>/dev/null || echo '?')"

# ---------- 2a. .env ----------
# De werkruimte bewaart .env niet tussen sessies. Zonder dit bestand kent Prisma
# geen DATABASE_URL en geeft iedere pagina een 500.
if [ ! -f .env ]; then
  log ".env ontbreekt; aanmaken uit .env.example"
  secret=$(openssl rand -base64 32)
  sed "s|AUTH_SECRET=\"vervang-dit-door-een-lange-random-string\"|AUTH_SECRET=\"$secret\"|" .env.example > .env
fi

# ---------- 2b. Database ----------
if command -v docker >/dev/null 2>&1; then
  if ! docker inspect perfecthous-db >/dev/null 2>&1; then
    log "database-container bestaat niet; aanmaken"
    docker run -d --name perfecthous-db \
      -e POSTGRES_USER=perfecthous -e POSTGRES_PASSWORD=perfecthous \
      -e POSTGRES_DB=perfecthous -p 5432:5432 \
      -v perfecthous-pgdata:/var/lib/postgresql/data postgres:16-alpine >/dev/null 2>&1 || true
  fi
  docker start perfecthous-db >/dev/null 2>&1 || true
  for _ in $(seq 1 40); do
    if docker exec perfecthous-db pg_isready -U perfecthous >/dev/null 2>&1; then
      log "database bereikbaar (in container)"
      break
    fi
    sleep 1
  done

  # De container kan "Up" staan terwijl de poortdoorgifte naar de host stuk is
  # (gebeurt als de VM tussendoor slaapt: docker-proxy sterft, container blijft).
  # Dan krijgt de app "Can't reach database server at localhost:5432". Een
  # herstart van de container zet de doorgifte opnieuw op.
  tcp_ok() { (exec 3<>/dev/tcp/127.0.0.1/5432) >/dev/null 2>&1 && exec 3<&- 3>&-; }
  if ! tcp_ok; then
    log "poort 5432 niet bereikbaar vanaf host; database-container herstarten"
    docker restart perfecthous-db >/dev/null 2>&1 || true
    for _ in $(seq 1 40); do
      tcp_ok && break
      sleep 1
    done
    tcp_ok && log "poort 5432 weer bereikbaar" || log "LET OP: poort 5432 blijft dicht"
  fi

  # Schema en voorbeeldcontent: alleen als de tabellen leeg of afwezig zijn.
  count=$(docker exec perfecthous-db psql -U perfecthous -d perfecthous -tAc \
    "select count(*) from \"Service\"" 2>/dev/null | tr -d '[:space:]')
  if [ "${count:-0}" = "0" ] || [ -z "${count:-}" ]; then
    log "database leeg; schema en seed aanmaken"
    npx prisma db push --skip-generate >/tmp/dbpush.log 2>&1 || log "db push mislukt, zie /tmp/dbpush.log"
    npm run db:seed >/tmp/seed.log 2>&1 || log "seed mislukt, zie /tmp/seed.log"
  fi
fi

# ---------- 3. Productiebuild ----------
if [ ! -f .next/BUILD_ID ]; then
  log "geen build gevonden; npm run build (kan een minuut duren)"
  npm run build >/tmp/build.log 2>&1 || {
    log "build mislukt, zie /tmp/build.log; val terug op dev-server"
    exec npm run dev -- -p "${PORT:-3000}" -H 0.0.0.0
  }
fi

# ---------- 4. Starten ----------
log "start productieserver op poort ${PORT:-3000}"
npm run start -- -p "${PORT:-3000}" -H 0.0.0.0 &
pid=$!
sleep 12
if ! curl -sf -o /dev/null "http://127.0.0.1:${PORT:-3000}/"; then
  log "productieserver antwoordt niet; dev-server starten"
  kill "$pid" 2>/dev/null
  exec npm run dev -- -p "${PORT:-3000}" -H 0.0.0.0
fi

# Controleer dat de pagina ook echt data kan laden (niet alleen een 500-status).
# Lukt dat niet, dan is bijna altijd de databaseverbinding weg: container
# herstarten en nog eens proberen.
if ! curl -sf "http://127.0.0.1:${PORT:-3000}/" | grep -q "<h1"; then
  log "homepage zonder inhoud; database herstarten en opnieuw proberen"
  docker restart perfecthous-db >/dev/null 2>&1 || true
  for _ in $(seq 1 30); do
    sleep 1
    curl -sf "http://127.0.0.1:${PORT:-3000}/" | grep -q "<h1" && break
  done
fi

wait "$pid"
