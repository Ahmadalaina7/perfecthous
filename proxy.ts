import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";

/**
 * Twee taken:
 *
 * 1. Taalroutering. De site woont onder /nl, /en en /ar. Een bezoek aan `/`
 *    gaat naar de taal uit de Accept-Language-header (Nederlands als er niets
 *    bruikbaars tussen zit); oude, niet-voorvoegde paden gaan naar het
 *    Nederlands, zodat bestaande links en Google-resultaten blijven werken.
 * 2. Framing. In de preview wordt de site in een iframe van een ander domein
 *    getoond: `X-Frame-Options: SAMEORIGIN` blokkeert dat, waardoor het paneel
 *    leeg blijft. Daarom zetten we die header alleen buiten de preview.
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

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

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

  const response = NextResponse.next();
  const previewHost = process.env.FREECODE_PREVIEW_HOST ?? "";
  const host = request.headers.get("host") ?? "";

  const inPreview = previewHost.length > 0 && host.includes(previewHost);

  if (!inPreview && !host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
  }
  return response;
}

export const config = {
  // Statische bestanden overslaan: daar is de header niet relevant en het
  // scheelt werk per verzoek.
  matcher: ["/((?!_next/static|_next/image|images|uploads|favicon.ico).*)"],
};

export { locales };
