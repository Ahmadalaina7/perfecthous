import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui/section";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n/config";
import { getCommon } from "@/lib/i18n";
import { pagesCopy } from "@/lib/i18n/dict/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = pagesCopy[locale].legal;
  return {
    title: t.titles.privacy,
    description: t.meta.privacy,
    alternates: {
      canonical: localePath(locale, "/privacyverklaring"),
      languages: alternateLanguages("/privacyverklaring"),
    },
    robots: { index: true, follow: true },
  };
}

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-10 text-[1.3rem] leading-snug first:mt-0">{children}</h2>
);

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = pagesCopy[locale].legal;
  const c = getCommon(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t.titles.privacy, url: localePath(locale, "/privacyverklaring") },
        ])}
      />
      <PageHero
        locale={locale}
        eyebrow={t.eyebrow}
        title={t.titles.privacy}
        lead={t.lead.privacy}
        crumbs={[{ href: "/privacyverklaring", label: t.titles.privacy }]}
      />
      <Section size="md">
        <Container>
          {locale !== "nl" && (
            <p className="mb-7 max-w-[70ch] border-l-2 border-brass bg-paper-dim px-4 py-3 text-[0.875rem] leading-relaxed text-muted rtl:border-l-0 rtl:border-r-2">
              {t.notice}
            </p>
          )}
          <div dir="ltr" lang="nl" className="max-w-[70ch] text-[0.9875rem] leading-[1.75] text-muted">
            <p className="text-[0.82rem]">Laatst bijgewerkt: [datum]. Deze verklaring is een concept dat de eigenaar vóór livegang juridisch moet laten controleren.</p>

            <H2>1. Wie is verantwoordelijk?</H2>
            <p>
              {site.legalName}, gevestigd aan {site.address.street}, {site.address.zip} {site.address.city},
              KvK {site.kvk}, is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven
              in deze verklaring. Vragen of verzoeken: {site.email}.
            </p>

            <H2>2. Welke gegevens verwerken we?</H2>
            <p>
              Via het offerteformulier: naam, e-mailadres, telefoonnummer, eventueel woonplaats,
              de omschrijving van uw klus, gewenste startdatum en budgetindicatie, uw contactvoorkeur
              en de foto's die u zelf uploadt. Via het contactformulier: naam, e-mailadres, eventueel
              telefoonnummer, onderwerp en uw bericht. Daarnaast bewaren we het IP-adres in
              gehashte vorm en beperkte technische gegevens (browser), uitsluitend om spam te
              bestrijden.
            </p>

            <H2>3. Waarom en op welke grondslag?</H2>
            <p>
              We verwerken uw gegevens om uw aanvraag te beantwoorden en een offerte op te stellen.
              De grondslag is de uitvoering van een overeenkomst of het nemen van stappen daartoe
              (artikel 6 lid 1 sub b AVG), en uw toestemming voor het versturen van het formulier
              (artikel 6 lid 1 sub a AVG). Voor het tegengaan van misbruik van onze formulieren
              hebben we een gerechtvaardigd belang (artikel 6 lid 1 sub f AVG).
            </p>

            <H2>4. Hoe lang bewaren we het?</H2>
            <p>
              Offerteaanvragen en contactberichten bewaren we maximaal twee jaar na het laatste
              contact, tenzij er een opdracht uit voortkomt. Dan geldt de wettelijke bewaartermijn
              van zeven jaar voor administratie. Foto's worden verwijderd zodra ze niet meer nodig
              zijn voor de beoordeling van uw aanvraag. Gehashte IP-adressen voor rate limiting
              verlopen automatisch binnen een uur.
            </p>

            <H2>5. Wie ontvangen uw gegevens?</H2>
            <p>
              Uw gegevens komen alleen bij ons terecht en bij partijen die we inschakelen om de
              site en communicatie te laten werken: onze hostingpartij, de e-maildienst voor
              meldingen (Resend) en, als u daarvoor kiest, Google Maps voor de kaart op de
              contactpagina. Met deze partijen zijn verwerkersovereenkomsten gesloten of worden
              standaardvoorwaarden toegepast. We verkopen nooit gegevens.
            </p>

            <H2>6. Cookies</H2>
            <p>
              Zie de{" "}
              <a className="link-underline text-ink" href={localePath(locale, "/cookieverklaring")}>
                cookieverklaring
              </a>
              .
              Kort: deze site plaatst geen trackingcookies voordat u toestemming geeft. Uw keuze
              bewaren we in localStorage, niet in een cookie.
            </p>

            <H2>7. Uw rechten</H2>
            <p>
              U heeft recht op inzage, correctie, verwijdering, beperking van de verwerking,
              overdraagbaarheid van uw gegevens en het intrekken van uw toestemming. U kunt
              daarvoor mailen naar {site.email}; we reageren binnen vier weken. Bent u niet
              tevreden met de afhandeling, dan kunt u een klacht indienen bij de Autoriteit
              Persoonsgegevens.
            </p>

            <H2>8. Beveiliging</H2>
            <p>
              De site werkt volledig over HTTPS. Wachtwoorden van het beheerpaneel worden gehasht
              opgeslagen, formulieren zijn beveiligd tegen misbruik en toegang tot het
              beheerpaneel is beperkt tot geautoriseerde medewerkers.
            </p>

            <H2>9. Wijzigingen</H2>
            <p>
              Bij wijzigingen in onze werkwijze passen we deze verklaring aan en vermelden we de
              datum bovenaan. We sturen geen aparte melding, tenzij de wijziging ingrijpend is.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
