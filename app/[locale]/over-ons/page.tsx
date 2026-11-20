import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { IconArrow, IconCheck } from "@/components/icons";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n/config";
import { fill, getCommon, siteValue } from "@/lib/i18n";
import { companyCopy } from "@/lib/i18n/dict/company";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = companyCopy[locale].about;
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localePath(locale, "/over-ons"),
      languages: alternateLanguages("/over-ons"),
    },
    openGraph: {
      title: `${t.meta.title} | Perfecthous`,
      description: t.meta.description,
      url: localePath(locale, "/over-ons"),
      images: [{ url: "/images/maps-gang.jpg", alt: t.hero.imageAlt }],
    },
  };
}

export default async function OverOnsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = companyCopy[locale].about;
  const c = getCommon(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: c.nav.overOns, url: localePath(locale, "/over-ons") }])}
      />

      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        image="/images/maps-gang.jpg"
        imageAlt={t.hero.imageAlt}
        crumbs={[{ href: "/over-ons", label: c.nav.overOns }]}
      />

      {/* Verhaal */}
      <Section size="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <SectionHeading eyebrow={t.story.eyebrow} title={t.story.title} />
              <div className="mt-8 aspect-[4/3] overflow-hidden bg-paper-dim">
                <Image
                  src="/images/maps-trap.jpg"
                  alt={t.story.imageAlt}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-5 text-[1.0625rem] leading-relaxed text-muted lg:pt-20">
              {t.story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              <div className="border-l-2 border-brass pl-5 pt-2 rtl:border-l-0 rtl:border-r-2 rtl:pr-5 rtl:pl-0">
                <p className="font-display text-[1.25rem] leading-snug text-ink">{t.story.quote}</p>
                <p className="mt-3 font-sans text-[0.82rem] text-ink/70">{t.story.founder}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Kernwaarden */}
      <Section tone="ink" size="lg" className="grain">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow={t.values.eyebrow}
            title={t.values.title}
            lead={t.values.lead}
          />
          <div className="mt-12 grid gap-px border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
            {t.values.items.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06} className="bg-ink p-7">
                <span className="font-display text-[1.75rem] leading-none text-brass-soft/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[1.2rem] text-paper">{v.title}</h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-paper/60">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section size="lg">
        <Container>
          <SectionHeading eyebrow={t.team.eyebrow} title={t.team.title} lead={t.team.lead} />
          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.team.roles.map((member, i) => (
              <Reveal key={member.role} delay={i * 0.05}>
                {/* Geen portretten: die zijn er nog niet, en een interieurfoto als
                    "teamlid" zetten we niet neer. Nummer en rol dragen de kaart. */}
                <article className="border-t border-paper-line pt-6">
                  <span className="font-display text-[1.6rem] leading-none text-brass-ink/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.15rem]">{member.name}</h3>
                  <p className="mt-1 font-sans text-[0.75rem] font-semibold tracking-[0.14em] text-brass-ink uppercase">
                    {member.role}
                  </p>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-muted">{member.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-[62ch] text-[0.82rem] leading-relaxed text-muted">
            {t.team.note}
          </p>
        </Container>
      </Section>

      {/* Certificeringen */}
      <Section tone="dim" size="md" rule>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow={t.guarantees.eyebrow}
              title={t.guarantees.title}
              lead={t.guarantees.lead}
            />
            <ul className="divide-y divide-paper-line border-y border-paper-line">
              {t.guarantees.items.map((item) => (
                <li key={item.title} className="flex gap-4 py-5">
                  <IconCheck size={18} className="mt-0.5 shrink-0 text-brass-ink" />
                  <div>
                    <p className="font-sans text-[0.9375rem] font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-[0.875rem] leading-relaxed text-muted">
                      {fill(item.text, {
                        kvk: siteValue(site.kvk, locale, "kvk"),
                        vat: siteValue(site.vat, locale, "vat"),
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href={localePath(locale, "/offerte")} size="md">
              {t.guarantees.quote}
              <IconArrow size={17} className="rtl:-scale-x-100" />
            </ButtonLink>
            <ButtonLink href={localePath(locale, "/projecten")} variant="outline" size="md">
              {t.guarantees.work}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <CtaSection locale={locale} title={t.cta.title} text={t.cta.text} />
    </>
  );
}
