import { localeFromPath, type Locale } from "./config";
import { common, type CommonCopy } from "./dict/common";

/** Copy voor de vaste chrome (menu, voettekst, cookiebanner, 404). */
export function getCommon(locale: Locale) {
  return common[locale];
}

/** Taal uit een pad, met Nederlands als terugval. */
export function localeOfPath(pathname: string): Locale {
  return localeFromPath(pathname) ?? "nl";
}

/** Datum in de taal van de pagina (lange maandnaam, geen tijd). */
export function formatDate(date: Date, locale: Locale) {
  const tag = locale === "nl" ? "nl-NL" : locale === "ar" ? "ar-NL" : "en-GB";
  return new Intl.DateTimeFormat(tag, { day: "numeric", month: "long", year: "numeric" }).format(
    date,
  );
}

/**
 * Bedrijfsgegeven met een placeholder (`[KvK-nummer]`) zolang de eigenaar het
 * nog niet in .env heeft gezet: die placeholder volgt de taal van de pagina.
 */
export function siteValue(
  value: string,
  locale: Locale,
  key: keyof CommonCopy["placeholders"],
) {
  return value.startsWith("[") ? getCommon(locale).placeholders[key] : value;
}

/** Vult `{naam}`-plaatshouders in een vertaalde string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
