import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";

/**
 * Drie taken:
 *
 * 1. Taalroutering. De site woont onder /nl, /en en /ar. Een bezoek aan `/`
 *    gaat naar de taal uit de Accept-Language-header (Nederlands als er niets
 *    bruikbaars tussen zit); oude, niet-voorvoegde paden gaan naar het
 *    Nederlands, zodat bestaande links en Google-resultaten blijven werken.
 * 2. Framing. In de preview wordt de site in een iframe van een ander domein
 *    getoond: `X-Frame-Options: SAMEORIGIN` blokkeert dat, waardoor het paneel
 *    leeg blijft. Daarom zetten we die header alleen buiten de preview. De CSP
 *    doet hetzelfde met `frame-ancestors`.
 * 3. Beveiligingsheaders: CSP, HSTS, Permissions-Policy en geen indexering van
 *    het beheerpaneel of de API.
 *
 * Dit moet in middleware/proxy en niet in next.config: `headers()` daar wordt
 * bij de build uitgevoerd, dus dan ligt de waarde vast vóór de omgeving bekend is.
 */

/** Paden die nooit een taalsprefix krijgen. */
const bypass = /^\/(_next|images|uploads|admin|api|fonts)(\/|$)/;
const localized = /^\/(nl|en|ar)(\/|$)/;

/** Eerste taal uit Accept-Language die we aanbieden. */
function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

/**
 * Content-Security-Policy.
 *
 * Waarom geen nonce: een nonce-CSP kan alleen met pagina's die per verzoek
 * worden gerenderd — Next zet de nonce dan op zijn eigen inline scripts. Dat
 * kost de statische build met ISR op alle vijftien routes (gemeten: alles werd
 * `ƒ` in plaats van statisch), en deze site draait op één VPS. Daarom staat
 * `'unsafe-inline'` aan voor scripts: de inline bootstrap van Next en de
 * JSON-LD moeten mee. Wat de CSP wél dichtzet: scripts van andere domeinen,
 * frames, objecten, de base-tag en formulieren naar elders. Alleen Turnstile
 * (spamcontrole) en de Google-kaart staan als externe bron expliciet toe.
 */
function contentSecurityPolicy(options: { framed: boolean; https: boolean }) {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
    // Tailwind en framer-motion zetten inline stijlen.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://challenges.cloudflare.com",
    "frame-src 'self' https://maps.google.com https://www.google.com https://challenges.cloudflare.com",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    options.framed ? "frame-ancestors 'self'" : "",
    options.https ? "upgrade-insecure-requests" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  const skip = isFile || bypass.test(pathname);

  if (!skip && !localized.test(pathname)) {
    const url = request.nextUrl.clone();
    if (pathname === "/") {
      // Tijdelijke redirect: de taalvoorkeur van de bezoeker mag veranderen.
      url.pathname = `/${detectLocale(request)}`;
      return NextResponse.redirect(url, 307);
    }
    // Oude URL zonder prefix: definitief naar het Nederlands (canonieke URL).
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url, 308);
  }

  const host = request.headers.get("host") ?? "";
  const previewHost = process.env.FREECODE_PREVIEW_HOST ?? "";
  const inLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1") || host.startsWith("[::1]");
  const inPreview = previewHost.length > 0 && host.includes(previewHost);
  // Alleen buiten de preview en localhost mag de pagina niet ingekaderd worden.
  const framed = !inPreview && !inLocal;
  const https =
    request.headers.get("x-forwarded-proto") === "https" || request.nextUrl.protocol === "https:";

  const csp = contentSecurityPolicy({ framed, https });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("content-security-policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=()",
  );
  if (framed) {
    // Voor browsers die frame-ancestors niet kennen.
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
  }
  if (https) {
    // Plesk/nginx termineert TLS; zonder deze regel kan een eerste verzoek
    // over http worden afgeluisterd.
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }
  if (/^\/(admin|api)(\/|$)/.test(pathname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  // Statische bestanden overslaan: daar is de header niet relevant en het
  // scheelt werk per verzoek.
  matcher: ["/((?!_next/static|_next/image|images|uploads|favicon.ico).*)"],
};

export { locales };
