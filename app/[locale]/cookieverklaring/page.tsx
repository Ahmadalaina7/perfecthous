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
    title: t.titles.cookies,
    description: t.meta.cookies,
    alternates: {
      canonical: localePath(locale, "/cookieverklaring"),
      languages: alternateLanguages("/cookieverklaring"),
    },
  };
}

const rows = [
  {
    name: "ph-consent-v1",
    type: "localStorage (geen cookie)",
    purpose: "Onthoudt uw cookiekeuze, zodat de banner niet bij elk bezoek terugkomt.",
    term: "Tot u uw browsergegevens wist",
    party: "Perfecthous",
  },
  {
    name: "Next.js sessiecookie (auth)",
    type: "Cookie, functioneel",
    purpose: "Alleen in het beheerpaneel: houdt de beheerder ingelogd tijdens de sessie.",
    term: "Sessie",
    party: "Perfecthous",
  },
  {
    name: "Turnstile (indien geconfigureerd)",
    type: "Cookie, functioneel",
    purpose: "Botbescherming bij formulieren. Wordt alleen geladen als deze beveiliging is ingeschakeld.",
    term: "Maximaal 1 jaar",
    party: "Cloudflare",
  },
  {
    name: "Google Maps",
    type: "Cookies van derden",
    purpose: "Toont de kaart op de contactpagina. Wordt pas geladen nadat u op ‘Kaart laden’ klikt.",
    term: "Tot 2 jaar",
    party: "Google",
  },
];

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-10 text-[1.3rem] leading-snug first:mt-0">{children}</h2>
);

export default async function CookiePage({
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
          { name: t.titles.cookies, url: localePath(locale, "/cookieverklaring") },
        ])}
      />
      <PageHero
        locale={locale}
        eyebrow={t.eyebrow}
        title={t.titles.cookies}
        lead={t.lead.cookies}
        crumbs={[{ href: "/cookieverklaring", label: t.titles.cookies }]}
      />
      <Section size="md">
        <Container>
          {locale !== "nl" && (
            <p className="mb-7 max-w-[78ch] border-l-2 border-brass bg-paper-dim px-4 py-3 text-[0.875rem] leading-relaxed text-muted rtl:border-l-0 rtl:border-r-2">
              {t.notice}
            </p>
          )}
          <div dir="ltr" lang="nl" className="max-w-[78ch] text-[0.9875rem] leading-[1.75] text-muted">
            <H2>Wat zijn cookies?</H2>
            <p>
              Cookies zijn kleine tekstbestanden die een website in uw browser opslaat. Wij
              gebruiken daarnaast localStorage voor het bewaren van uw cookiekeuze — dat is
              technisch geen cookie en wordt niet naar onze server verstuurd.
            </p>

            <H2>Welke we gebruiken</H2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-[0.85rem]">
                <thead>
                  <tr className="border-y border-paper-line">
                    <th className="py-2.5 pr-4 font-sans text-[0.7rem] font-semibold tracking-[0.1em] uppercase">Naam</th>
                    <th className="py-2.5 pr-4 font-sans text-[0.7rem] font-semibold tracking-[0.1em] uppercase">Type</th>
                    <th className="py-2.5 pr-4 font-sans text-[0.7rem] font-semibold tracking-[0.1em] uppercase">Doel</th>
                    <th className="py-2.5 pr-4 font-sans text-[0.7rem] font-semibold tracking-[0.1em] uppercase">Bewaartermijn</th>
                    <th className="py-2.5 font-sans text-[0.7rem] font-semibold tracking-[0.1em] uppercase">Partij</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.name} className="border-b border-paper-line align-top">
                      <td className="py-3 pr-4 font-medium text-ink">{r.name}</td>
                      <td className="py-3 pr-4">{r.type}</td>
                      <td className="py-3 pr-4">{r.purpose}</td>
                      <td className="py-3 pr-4">{r.term}</td>
                      <td className="py-3">{r.party}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <H2>Uw keuze wijzigen</H2>
            <p>
              Uw keuze wordt bewaard in localStorage onder de naam <code>ph-consent-v1</code>.
              Wilt u die wijzigen, dan verwijdert u de sitegegevens in uw browser; bij het
              volgende bezoek verschijnt de banner opnieuw. Via de instellingen van uw browser
              kunt u cookies in het algemeen blokkeren of verwijderen.
            </p>

            <H2>Geen tracking door ons</H2>
            <p>
              Wij plaatsen zelf geen Google Analytics, Facebook Pixel of vergelijkbare
              tracking. Wordt dat in de toekomst toegevoegd, dan gebeurt dat alleen na uw
              expliciete toestemming en wordt deze verklaring aangepast.
            </p>

            <H2>Vragen</H2>
            <p>
              Mail {site.email} of zie de{" "}
              <a href={localePath(locale, "/privacyverklaring")} className="link-underline text-ink">
                privacyverklaring
              </a>{" "}
              voor hoe we met uw gegevens omgaan.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
