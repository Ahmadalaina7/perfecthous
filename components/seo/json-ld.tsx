import { addressLine, serviceAreas, site } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";
import { getCommon } from "@/lib/i18n";
import { siteMeta } from "@/lib/i18n/site-meta";

/** Rendert JSON-LD; Next.js zet dit als script in de <head> van de pagina. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is veilig: waarden komen uit onze eigen configuratie.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * LocalBusiness: de basis voor lokale vindbaarheid. De beschrijving en de
 * dienstenlijst volgen de taal van de pagina, anders staat er Nederlands in de
 * structured data van /en en /ar.
 */
export function localBusinessSchema(locale: Locale): Record<string, unknown> {
  const t = getCommon(locale);
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: siteMeta[locale].description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/images/perfecthous-tvwand.jpg`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: serviceAreas.map((a) => ({ "@type": "City", name: a.name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "17:30",
      },
    ],
    founder: { "@type": "Person", name: "Perfecthous" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.schema.catalog,
      itemListElement: t.schema.services.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

/** FAQPage-schema op basis van vraag/antwoordparen. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Service-schema voor een dienstenpagina. */
export function serviceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType: name,
    provider: { "@type": "HomeAndConstructionBusiness", name: site.name, address: addressLine },
    areaServed: serviceAreas.map((a) => ({ "@type": "City", name: a.name })),
  };
}

/** Kruimelpad, zodat Google de structuur snapt. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
}
