/**
 * Werkgebied: plaatsnamen en de korte toelichting per plaats. De namen staan
 * ook in de voettekst; de blurb staat op /werkgebied.
 */

const nl = {
  names: [
    "Vlissingen",
    "Middelburg",
    "Oost-Souburg",
    "West-Souburg",
    "Koudekerke",
    "Veere",
    "Ritthem",
    "Walcheren",
    "Zeeland",
  ],
  blurbs: {
    vlissingen: "Onze thuisbasis: van het Scheldekwartier tot Lammerenburg.",
    middelburg: "Verbouwingen en renovaties in de binnenstad en de wijken eromheen.",
    "oost-souburg": "Veel tussenwoningen en rijtjeshuizen; badkamers en uitbouwen.",
    "west-souburg": "Kleinere projecten en onderhoud, snel ter plaatse.",
    koudekerke: "Renovatie en afbouw in een dorp waar we vaak werken.",
    veere: "Zorgvuldig werk in oudere panden en monumentale panden.",
    ritthem: "Buitenwerk, dakwerk en verbouwingen aan de rand van de stad.",
    walcheren: "Het hele eiland, inclusief Serooskerke en Grijpskerke.",
    zeeland: "Grotere opdrachten elders in de provincie, in overleg.",
  },
};

const en: typeof nl = {
  names: [
    "Vlissingen",
    "Middelburg",
    "Oost-Souburg",
    "West-Souburg",
    "Koudekerke",
    "Veere",
    "Ritthem",
    "Walcheren",
    "Zeeland",
  ],
  blurbs: {
    vlissingen: "Our home base: from the Scheldekwartier to Lammerenburg.",
    middelburg: "Renovations and remodelling in the old centre and the surrounding districts.",
    "oost-souburg": "Many terraced houses; bathrooms and extensions.",
    "west-souburg": "Smaller projects and maintenance, quickly on site.",
    koudekerke: "Renovation and finishing in a village where we work often.",
    veere: "Careful work in older and listed buildings.",
    ritthem: "Outdoor work, roofing and renovations on the edge of town.",
    walcheren: "The whole island, including Serooskerke and Grijpskerke.",
    zeeland: "Larger projects elsewhere in the province, by arrangement.",
  },
};

const ar: typeof nl = {
  names: [
    "فلِسِنغن",
    "ميدلبورخ",
    "أوست-سوبورخ",
    "فيست-سوبورخ",
    "كاودِكيركه",
    "فيره",
    "ريتيم",
    "فالخِرِن",
    "زيلاند",
  ],
  blurbs: {
    vlissingen: "قاعدتنا الأساسية: من حي سخيلدكوارتير حتى لامرنبورخ.",
    middelburg: "أعمال تجديد وترميم في المركز القديم والأحياء المحيطة به.",
    "oost-souburg": "منازل متلاصقة كثيرة؛ حمامات وتوسعات.",
    "west-souburg": "مشاريع أصغر وأعمال صيانة، بوصول سريع إلى الموقع.",
    koudekerke: "تجديد وتشطيب في قرية نعمل فيها كثيرًا.",
    veere: "عمل دقيق في المباني القديمة والمباني الأثرية.",
    ritthem: "أعمال خارجية وأسقف وتجديد على أطراف المدينة.",
    walcheren: "الجزيرة كاملة، بما فيها سيروسكِيركه وخريبسكِيركه.",
    zeeland: "مشاريع أكبر في أماكن أخرى من المقاطعة، بالاتفاق.",
  },
};

export const workArea = { nl, en, ar };
export const workAreaNames = { nl: nl.names, en: en.names, ar: ar.names } as const;
export type WorkAreaCopy = typeof nl;
