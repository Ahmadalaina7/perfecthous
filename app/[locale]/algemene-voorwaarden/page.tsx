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
    title: t.titles.terms,
    description: t.meta.terms,
    alternates: {
      canonical: localePath(locale, "/algemene-voorwaarden"),
      languages: alternateLanguages("/algemene-voorwaarden"),
    },
  };
}

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-10 text-[1.3rem] leading-snug first:mt-0">{children}</h2>
);

export default async function VoorwaardenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = pagesCopy[locale].legal;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t.titles.terms, url: localePath(locale, "/algemene-voorwaarden") },
        ])}
      />
      <PageHero
        locale={locale}
        eyebrow={t.eyebrow}
        title={t.titles.terms}
        lead={t.lead.terms}
        crumbs={[{ href: "/algemene-voorwaarden", label: t.titles.terms }]}
      />
      <Section size="md">
        <Container>
          {locale !== "nl" && (
            <p className="mb-7 max-w-[70ch] border-l-2 border-brass bg-paper-dim px-4 py-3 text-[0.875rem] leading-relaxed text-muted rtl:border-l-0 rtl:border-r-2">
              {t.notice}
            </p>
          )}
          <div dir="ltr" lang="nl" className="max-w-[70ch] text-[0.9875rem] leading-[1.75] text-muted">
            <p className="text-[0.82rem]">Versie [datum]. Concepttekst — vóór livegang juridisch te controleren en aan te vullen.</p>

            <H2>1. Definities en toepasselijkheid</H2>
            <p>
              Deze voorwaarden gelden voor alle aanbiedingen, offertes en overeenkomsten tussen
              {" "}{site.legalName} (hierna: opdrachtnemer) en de opdrachtgever. Afwijkingen gelden
              alleen als ze schriftelijk zijn overeengekomen.
            </p>

            <H2>2. Offertes en totstandkoming</H2>
            <p>
              Offertes zijn geldig gedurende 30 dagen, tenzij anders vermeld. Een overeenkomst komt
              tot stand wanneer de opdrachtgever de offerte schriftelijk of per e-mail aanvaardt.
              Kennelijke vergissingen en schrijffouten in de offerte binden opdrachtnemer niet.
            </p>

            <H2>3. Uitvoering en planning</H2>
            <p>
              Opdrachtnemer voert het werk uit naar beste inzicht en vermogen, conform de eisen van
              goed vakmanschap. Genoemde termijnen zijn indicatief. Vertraging door weersomstandigheden,
              leveranciers, vergunningverlening of door de opdrachtgever aangeleverde materialen
              geeft geen recht op schadevergoeding.
            </p>

            <H2>4. Meer- en minderwerk</H2>
            <p>
              Werk dat redelijkerwijs niet in de offerte kon worden voorzien, wordt als meerwerk
              beschouwd. Opdrachtnemer meldt dit vooraf, met een indicatie van kosten en gevolgen
              voor de planning, en gaat pas verder na goedkeuring van de opdrachtgever.
            </p>

            <H2>5. Verplichtingen van de opdrachtgever</H2>
            <p>
              De opdrachtgever zorgt voor vrije toegang tot het werk, beschikbaarheid van water en
              elektriciteit (in overleg) en verstrekt alle informatie die voor de uitvoering nodig
              is. Vergunningen worden aangevraagd door de opdrachtgever, tenzij anders afgesproken.
            </p>

            <H2>6. Betaling</H2>
            <p>
              Facturen worden betaald binnen 14 dagen na factuurdatum, tenzij anders
              overeengekomen. Bij grotere opdrachten kan een aanbetaling of termijnfacturering
              worden afgesproken. Bij te late betaling is de wettelijke rente verschuldigd en
              kunnen redelijke incassokosten in rekening worden gebracht.
            </p>

            <H2>7. Oplevering en garantie</H2>
            <p>
              Het werk wordt in overleg opgeleverd, waarbij beide partijen het resultaat doornemen.
              Op constructief werk geldt een garantietermijn van tien jaar, op installatiewerk
              vijf jaar en op overige werkzaamheden twee jaar, tenzij in de offerte anders staat.
              Op materialen geldt de garantie van de fabrikant.
            </p>

            <H2>8. Aansprakelijkheid</H2>
            <p>
              Aansprakelijkheid is beperkt tot het bedrag dat in het betreffende geval door de
              bedrijfsaansprakelijkheidsverzekering wordt uitgekeerd. Indirecte schade, gevolgschade
              en gederfde inkomsten zijn uitgesloten, behoudens opzet of grove schuld.
            </p>

            <H2>9. Opzegging en ontbinding</H2>
            <p>
              Bij annulering na opdrachtverstrekking zijn de tot dan toe gemaakte kosten en
              gereserveerde uren verschuldigd. Bij een lopende opdracht wordt het werk in redelijke
              staat opgeleverd en afgerekend.
            </p>

            <H2>10. Klachten en geschillen</H2>
            <p>
              Klachten over het werk dienen binnen 14 dagen na oplevering schriftelijk te worden
              gemeld, zodat we de gelegenheid hebben het op te lossen. Komen we er samen niet uit,
              dan geldt het Nederlands recht en is de rechtbank Zeeland-West-Brabant bevoegd.
            </p>

            <H2>11. Bedrijfsgegevens</H2>
            <p>
              {site.legalName}, {site.address.street}, {site.address.zip} {site.address.city}.
              KvK {site.kvk}, btw {site.vat}, {site.email}, {site.phoneDisplay}.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
