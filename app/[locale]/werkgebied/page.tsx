import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { IconArrow, IconPin } from "@/components/icons";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { serviceAreas, site } from "@/lib/site";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n/config";
import { getCommon } from "@/lib/i18n";
import { companyCopy } from "@/lib/i18n/dict/company";
import { workArea } from "@/lib/i18n/dict/work-area";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = companyCopy[locale].area;
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localePath(locale, "/werkgebied"),
      languages: alternateLanguages("/werkgebied"),
    },
    openGraph: {
      title: `${t.meta.title} | Perfecthous`,
      description: t.meta.description,
      url: localePath(locale, "/werkgebied"),
    },
  };
}

export default async function WerkgebiedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = companyCopy[locale].area;
  const c = getCommon(locale);
  const areas = workArea[locale];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.nav.werkgebied, url: localePath(locale, "/werkgebied") },
        ])}
      />

      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        image="/images/maps-terras.jpg"
        imageAlt={t.hero.imageAlt}
        crumbs={[{ href: "/werkgebied", label: c.nav.werkgebied }]}
      />

      <Section size="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading eyebrow={t.where.eyebrow} title={t.where.title} lead={t.where.lead} />
              <div className="mt-8 border border-paper-line p-6">
                <div className="flex items-start gap-3">
                  <IconPin size={20} className="mt-0.5 shrink-0 text-brass-ink" />
                  <div>
                    <p className="font-sans text-[0.9rem] font-medium">{site.name}</p>
                    <p className="mt-1 text-[0.875rem] leading-relaxed text-muted">
                      {site.address.street}
                      <br />
                      {site.address.zip} {site.address.city}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.street}, ${site.address.zip} ${site.address.city}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 font-sans text-[0.85rem] font-medium text-ink"
                >
                  {t.where.route}
                  <IconArrow size={15} className="rtl:-scale-x-100" />
                </a>
              </div>
              <p className="mt-5 text-[0.85rem] leading-relaxed text-muted">{t.where.note}</p>
            </div>

            <div>
              <ul className="grid gap-px border border-paper-line bg-paper-line sm:grid-cols-2">
                {serviceAreas.map((area, i) => (
                  <li key={area.slug} className="bg-paper p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="text-[1.2rem] leading-snug">{areas.names[i] ?? area.name}</h2>
                      <span className="font-sans text-[0.68rem] tracking-[0.16em] text-muted/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                      {areas.blurbs[area.slug as keyof typeof areas.blurbs] ?? area.blurb}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-paper-line pt-7">
                <h2 className="text-[1.35rem] leading-snug">{t.perPlace.title}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {t.perPlace.text}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {t.perPlace.tags.map((item) => (
                    <span
                      key={item}
                      className="border border-ink/15 px-3 py-1.5 font-sans text-[0.78rem] text-ink/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href={localePath(locale, "/diensten")} size="md">
                    {t.perPlace.allServices}
                    <IconArrow size={17} className="rtl:-scale-x-100" />
                  </ButtonLink>
                  <ButtonLink
                    href={localePath(locale, "/projecten")}
                    variant="outline"
                    size="md"
                  >
                    {t.perPlace.regionWork}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="dim" size="md" rule>
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {t.reasons.map((item) => (
              <div key={item.title}>
                <h2 className="text-[1.2rem] leading-snug">{item.title}</h2>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 border-t border-paper-line pt-5 font-sans text-[0.78rem] text-muted">
            {t.morePlaces}{" "}
            <Link href={localePath(locale, "/contact")} className="link-underline text-ink">
              {t.doubt}
            </Link>
          </p>
        </Container>
      </Section>

      <CtaSection locale={locale} title={t.cta} />
    </>
  );
}
