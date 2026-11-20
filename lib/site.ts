/**
 * Eén plek voor bedrijfsgegevens. De waarden komen uit env zodat de eigenaar
 * telefoonnummer, KvK en btw kan aanpassen zonder code te wijzigen.
 * Placeholders tussen blokhaken worden in de UI letterlijk getoond tot ze
 * zijn ingevuld — dat maakt zichtbaar wat nog ontbreekt.
 */

const env = (key: string, fallback: string) => process.env[key]?.trim() || fallback;

export const site = {
  name: "Perfecthous",
  legalName: "Perfecthous",
  url: env("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
  phone: env("NEXT_PUBLIC_COMPANY_PHONE", "+31616298837"),
  phoneDisplay: env("NEXT_PUBLIC_COMPANY_PHONE_DISPLAY", "06 1629 8837"),
  email: env("NEXT_PUBLIC_COMPANY_EMAIL", "info@perfecthous.nl"),
  whatsapp: env("NEXT_PUBLIC_WHATSAPP", "31616298837"),
  address: {
    street: env("NEXT_PUBLIC_ADDRESS_STREET", "Schuitvaartgracht 85"),
    city: env("NEXT_PUBLIC_ADDRESS_CITY", "Vlissingen"),
    zip: env("NEXT_PUBLIC_ADDRESS_ZIP", "4382 GJ"),
    country: "NL",
    region: "Zeeland",
  },
  kvk: env("NEXT_PUBLIC_KVK", "[KvK-nummer]"),
  vat: env("NEXT_PUBLIC_VAT", "[btw-nummer]"),
  years: env("NEXT_PUBLIC_YEARS", "[aantal jaar ervaring]"),
  /** Coördinaten van het bedrijfspand, voor de kaart en JSON-LD. */
  geo: { lat: 51.4506, lng: 3.5695 },
  openingHours: [
    { days: "Maandag t/m vrijdag", hours: "07:30 – 17:30" },
    { days: "Zaterdag", hours: "Op afspraak" },
    { days: "Zondag", hours: "Gesloten" },
  ],
  /** Spoedlijn: buiten kantooruren bereikbaar voor lekkage en storingen. */
  emergencyNote: "Spoed bij lekkage of storing: 7 dagen per week bereikbaar.",
  social: {
    google:
      "https://www.google.com/search?q=Perfecthous+Vlissingen",
    facebook: "",
    instagram: "",
  },
} as const;

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const telUrl = `tel:${site.phone.replace(/\s/g, "")}`;

export const mailUrl = `mailto:${site.email}`;

/** Volledig adres op één regel */
export const addressLine = `${site.address.street}, ${site.address.zip} ${site.address.city}`;

/** Werkgebied — ook gebruikt voor local business schema en de werkgebied-pagina. */
export const serviceAreas = [
  { name: "Vlissingen", slug: "vlissingen", blurb: "Onze thuisbasis: van het Scheldekwartier tot Lammerenburg." },
  { name: "Middelburg", slug: "middelburg", blurb: "Verbouwingen en renovaties in de binnenstad en de wijken eromheen." },
  { name: "Oost-Souburg", slug: "oost-souburg", blurb: "Veel tussenwoningen en rijtjeshuizen; badkamers en uitbouwen." },
  { name: "West-Souburg", slug: "west-souburg", blurb: "Kleinere projecten en onderhoud, snel ter plaatse." },
  { name: "Koudekerke", slug: "koudekerke", blurb: "Renovatie en afbouw in een dorp waar we vaak werken." },
  { name: "Veere", slug: "veere", blurb: "Zorgvuldig werk in oudere panden en monumentale panden." },
  { name: "Ritthem", slug: "ritthem", blurb: "Buitenwerk, dakwerk en verbouwingen aan de rand van de stad." },
  { name: "Walcheren", slug: "walcheren", blurb: "Het hele eiland, inclusief Serooskerke en Grijpskerke." },
  { name: "Zeeland", slug: "zeeland", blurb: "Grotere opdrachten elders in de provincie, in overleg." },
] as const;
