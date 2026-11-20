import type { Locale } from "./config";

/**
 * Sitebrede metadata per taal: de titelregel, de beschrijving voor zoekmachines
 * en de alt-tekst van het deelbeeld. Gedeeld door het root-layout en de
 * LocalBusiness-JSON-LD, zodat er geen Nederlandse tekst op EN/AR belandt.
 */
export const siteMeta: Record<Locale, { tagline: string; description: string; imageAlt: string }> = {
  nl: {
    tagline: "aannemer & klusbedrijf in Vlissingen",
    description:
      "Perfecthous verzorgt verbouwing, renovatie, aanbouw, tegelwerk, stucwerk, badkamers, loodgieterswerk en elektrisch werk in Vlissingen en op Walcheren. Eén aanspreekpunt, vaste prijsafspraken en netjes opgeleverd werk.",
    imageAlt: "Eiken vloer gelegd door Perfecthous in Vlissingen",
  },
  en: {
    tagline: "builder & handyman in Vlissingen",
    description:
      "Perfecthous handles renovation, remodelling, extensions, tiling, plastering, bathrooms, plumbing and electrical work in Vlissingen and on Walcheren. One point of contact, fixed prices and tidy workmanship.",
    imageAlt: "Oak floor laid by Perfecthous in Vlissingen",
  },
  ar: {
    tagline: "مقاول وشركة خدمات في فلِسِنغن",
    description:
      "تتولى Perfecthous التجديد والترميم والتوسعة وأعمال البلاط والجبس والحمامات والسباكة والأعمال الكهربائية في فلِسِنغن وجزيرة فالخِرِن. جهة تواصل واحدة وأسعار متفق عليها وتسليم نظيف.",
    imageAlt: "أرضية بلوط نفّذتها Perfecthous في فلِسِنغن",
  },
};
