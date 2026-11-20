/**
 * Drie talen, één site. Nederlands is de standaard: de eigenaar, de administratie
 * en de juridische documenten zijn Nederlands. Engels en Arabisch krijgen een
 * eigen URL-prefix (`/en/...`, `/ar/...`), zodat elke taal indexeerbaar is en er
 * geen taal in een cookie verstopt zit.
 */

export const locales = ["nl", "en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "nl";

export const localeMeta: Record<
  Locale,
  {
    /** Naam in de taal zelf, voor de taalkeuze */
    label: string;
    /** Tweeletterige aanduiding in de header */
    short: string;
    dir: "ltr" | "rtl";
    /** Voor og:locale */
    ogLocale: string;
  }
> = {
  nl: { label: "Nederlands", short: "NL", dir: "ltr", ogLocale: "nl_NL" },
  en: { label: "English", short: "EN", dir: "ltr", ogLocale: "en_GB" },
  ar: { label: "العربية", short: "AR", dir: "rtl", ogLocale: "ar_SA" },
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => localeMeta[locale].dir;

/** Pad met taalsprefix. `localePath("en", "/diensten")` → `/en/diensten`. */
export const localePath = (locale: Locale, path = "/") => {
  if (!path || path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
};

/** Haalt het taalsprefix van een pad af: `/en/diensten` → `/diensten`. */
export const stripLocale = (pathname: string) => {
  const match = pathname.match(/^\/(nl|en|ar)(?=\/|$)/);
  if (!match) return pathname || "/";
  return pathname.slice(match[0].length) || "/";
};

/** De taal uit een pad, of null als er geen prefix is. */
export const localeFromPath = (pathname: string): Locale | null => {
  const match = pathname.match(/^\/(nl|en|ar)(?=\/|$)/);
  return match && isLocale(match[1]) ? match[1] : null;
};

/** `hreflang`-alternatieven voor metadata en de sitemap. */
export const alternateLanguages = (path = "/") =>
  Object.fromEntries(locales.map((locale) => [locale, localePath(locale, path)])) as Record<
    Locale,
    string
  >;

/** Pad naar dezelfde pagina in een andere taal (voor de taalkeuze). */
export const switchLocalePath = (pathname: string, locale: Locale) =>
  localePath(locale, stripLocale(pathname));
