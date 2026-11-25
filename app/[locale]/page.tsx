import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma, lines } from "@/lib/db";
import { site, telUrl, whatsappUrl } from "@/lib/site";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ImageCard } from "@/components/ui/card";
import { ServiceIcon, IconArrow, IconCheck, IconPhone, IconWhatsapp } from "@/components/icons";
import { Stars } from "@/components/stars";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, localBusinessSchema } from "@/components/seo/json-ld";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n/config";
import { fill, getCommon, siteValue } from "@/lib/i18n";
import { homeCopy } from "@/lib/i18n/dict/home";
import { localizeProject, localizeReview, localizeService } from "@/lib/i18n/content";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = homeCopy[locale];
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: localePath(locale), languages: alternateLanguages("/") },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: localePath(locale),
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = homeCopy[locale];
  const c = getCommon(locale);

  const [services, featured, reviews] = await Promise.all([
    prisma.service.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: { order: "asc" },
      take: 3,
    }),
    prisma.review.findMany({ where: { published: true }, orderBy: { order: "asc" }, take: 3 }),
  ]);

  const warrantyValue = locale === "ar" ? "10 سنوات" : locale === "en" ? "10 years" : "10 jaar";
  const trust = [
    { value: siteValue(site.years, locale, "years"), label: t.trust.years },
    { value: "150+", label: t.trust.projects },
    { value: warrantyValue, label: t.trust.warrantyYears },
    { value: t.trust.fixedValue, label: t.trust.fixed },
  ];

  return (
    <>
      <JsonLd data={localBusinessSchema(locale)} />

      {/* ---------------- Hero ---------------- */}
      <section className="grain relative isolate flex min-h-[calc(100svh-72px)] items-end overflow-hidden bg-ink md:min-h-[calc(100svh-80px)]">
        <Image
          src="/images/hero-verbouwing.jpg"
          alt={t.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        {/* Eén verloop van donker onderin naar lichter bovenin. De sluier moet
            tot boven de kop doorlopen: staat de gouden tweede regel op het
            lichte glas van de foto, dan haalt die nog geen 2,5:1. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(18_20_23/0.96)_0%,rgb(18_20_23/0.9)_38%,rgb(18_20_23/0.8)_70%,rgb(18_20_23/0.55)_100%)]"
        />

        <Container className="hero-enter relative pt-24 pb-12 md:pb-16">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="eyebrow text-brass-soft">{t.hero.eyebrow}</p>
            {/* Noemt het beeld én dat het sfeerbeeld is: zonder bijschrift leest de
                vloer als achtergrondtextuur, en als eigen werk mag dit niet staan. */}
            <p className="hidden font-sans text-[0.72rem] tracking-[0.12em] text-paper/65 sm:block">
              {t.hero.imageNote}
            </p>
          </div>
          <h1 className="mt-6 max-w-[19ch] text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] text-paper">
            {t.hero.title}
            <span className="block italic text-brass-soft">{t.hero.titleItalic}</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-paper/75 md:text-lg">
            {t.hero.lead}
          </p>

          {/* Drie acties, één rij: messing voor de offerte, een lichte outline
              voor bellen, een ghost voor WhatsApp. Ze delen hoogte (58px),
              padding en icoonmaat, zodat de rij als één set leest. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href={localePath(locale, "/offerte")}
              variant="brass"
              size="lg"
              className="justify-between sm:min-w-[236px]"
            >
              {c.actions.quote}
              <IconArrow size={18} className="rtl:-scale-x-100" />
            </ButtonLink>
            <ButtonAnchor
              href={telUrl}
              variant="outline"
              size="lg"
              className="border-paper/35 text-paper hover:border-paper hover:bg-paper hover:text-ink"
            >
              <IconPhone size={18} />
              {c.actions.callDirect}
            </ButtonAnchor>
            <ButtonAnchor
              href={whatsappUrl(fill(c.cta.whatsappMessage, { name: site.name }))}
              variant="ghost"
              size="lg"
              className="text-paper/75 hover:bg-paper/10 hover:text-paper"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsapp size={18} />
              {c.actions.whatsapp}
            </ButtonAnchor>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2.5 border-t border-paper/15 pt-5 font-sans text-[0.8rem] text-paper/65">
            {t.hero.checks.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <IconCheck size={14} className="text-brass-soft" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------------- Vertrouwensbalk ---------------- */}
      <section className="border-b border-paper-line bg-paper" aria-label={t.trust.label}>
        <Container>
          <dl className="grid grid-cols-2 divide-paper-line md:grid-cols-4 md:divide-x">
            {trust.map((item, i) => (
              <div
                key={item.label}
                className={`py-7 md:px-7 md:py-9 first:md:pl-0 ${i > 1 ? "border-t border-paper-line md:border-t-0" : ""} ${i % 2 === 1 ? "text-right md:text-left" : ""}`}
              >
                <dt className="order-2 mt-1.5 font-sans text-[0.78rem] leading-snug tracking-wide text-muted">
                  {item.label}
                </dt>
                <dd className="order-1 font-display text-[1.85rem] leading-none text-ink md:text-[2.1rem]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---------------- Diensten ---------------- */}
      <Section size="lg">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={t.services.eyebrow}
              title={t.services.title}
              lead={t.services.lead}
            />
            <ButtonLink
              href={localePath(locale, "/diensten")}
              variant="outline"
              size="md"
              className="shrink-0"
            >
              {t.services.cta}
              <IconArrow size={17} className="rtl:-scale-x-100" />
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-px border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const s = localizeService(service, locale);
              return (
                <Reveal key={service.id} delay={Math.min(i * 0.05, 0.25)} className="bg-paper">
                  <Link
                    href={localePath(locale, `/diensten/${service.slug}`)}
                    className="group flex h-full flex-col p-7 transition-colors duration-400 hover:bg-paper-dim md:p-8"
                  >
                    <span className="text-brass-ink">
                      <ServiceIcon name={service.icon} size={30} />
                    </span>
                    <h3 className="mt-6 text-[1.25rem] leading-snug">{s.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{s.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 font-sans text-[0.8rem] font-medium text-ink">
                      {c.actions.moreAboutService}
                      <IconArrow
                        size={15}
                        className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---------------- Uitgelicht werk ---------------- */}
      <Section tone="dim" size="lg" rule>
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={t.work.eyebrow} title={t.work.title} lead={t.work.lead} />
            <ButtonLink
              href={localePath(locale, "/projecten")}
              variant="outline"
              size="md"
              className="shrink-0"
            >
              {t.work.cta}
              <IconArrow size={17} className="rtl:-scale-x-100" />
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((project, i) => {
              const p = localizeProject(project, locale);
              return (
                <Reveal key={project.id} delay={i * 0.08}>
                  <ImageCard
                    href={localePath(locale, `/projecten/${project.slug}`)}
                    image={project.coverImage}
                    imageAlt={`${p.title}, ${project.location}`}
                    label={p.category}
                    title={p.title}
                    text={p.summary}
                    footer={
                      <span className="font-sans text-[0.78rem] tracking-wide text-muted">
                        {project.location} · {project.year}
                      </span>
                    }
                  />
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---------------- Werkwijze ---------------- */}
      <Section size="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow={t.process.eyebrow}
                title={t.process.title}
                lead={t.process.lead}
              />
              <div className="mt-8 border-l-2 border-brass pl-5 rtl:border-l-0 rtl:border-r-2 rtl:pr-5 rtl:pl-0">
                <p className="text-[0.9375rem] leading-relaxed text-muted">{t.process.quote}</p>
                <p className="mt-3 font-sans text-[0.8rem] text-ink">{t.process.quoteAuthor}</p>
              </div>
            </div>

            <ol className="space-y-0 divide-y divide-paper-line border-y border-paper-line">
              {t.process.steps.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={i * 0.06}
                  className="grid gap-3 py-7 sm:grid-cols-[auto_1fr] sm:gap-6"
                >
                  <span className="font-display text-[2rem] leading-none text-brass-ink/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.25rem] leading-snug">{step.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ---------------- Reviews ---------------- */}
      <Section tone="ink" size="lg" className="grain">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              tone="dark"
              eyebrow={t.reviews.eyebrow}
              title={t.reviews.title}
              lead={t.reviews.lead}
            />
            <div className="flex shrink-0 items-center gap-3 text-paper/70">
              <Stars rating={5} size={17} label={fill(c.stars, { rating: 5 })} />
              <span className="font-sans text-[0.85rem]">{t.reviews.average}</span>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((review, i) => {
              const r = localizeReview(review, locale);
              return (
                <Reveal key={review.id} delay={i * 0.08}>
                  <figure className="flex h-full flex-col border border-line-dark bg-ink-soft p-7">
                    <Stars
                      rating={review.rating}
                      size={14}
                      label={fill(c.stars, { rating: review.rating })}
                    />
                    <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-paper/80">
                      “{r.body}”
                    </blockquote>
                    <figcaption className="mt-6 border-t border-line-dark pt-4">
                      <span className="block font-sans text-[0.9rem] font-medium text-paper">
                        {review.author}
                      </span>
                      <span className="mt-0.5 block font-sans text-[0.8125rem] text-paper/65">
                        {review.city}
                        {r.service ? ` · ${r.service}` : ""}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href={localePath(locale, "/reviews")} variant="light" size="md">
              {c.actions.allReviews}
              <IconArrow size={17} className="rtl:-scale-x-100" />
            </ButtonLink>
            <p className="font-sans text-[0.8125rem] text-paper/70">{t.reviews.note}</p>
          </div>
        </Container>
      </Section>

      {/* ---------------- Over ons kort ---------------- */}
      <Section size="lg">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-paper-dim">
                <Image
                  src="/images/maps-trap.jpg"
                  alt={t.about.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              {/* Binnen het kader van de foto: een kaart die over de rand heen
                  steekt breekt de rechter marge en veroorzaakt op tablet een
                  paar pixel horizontale scroll. */}
              <div className="absolute right-4 bottom-4 hidden max-w-[220px] bg-ink p-5 text-paper sm:block md:right-6 md:bottom-6 rtl:left-4 rtl:right-auto rtl:md:left-6">
                <p className="font-display text-[1.6rem] leading-none">{t.about.cardTitle}</p>
                <p className="mt-2 font-sans text-[0.8125rem] leading-snug text-paper/70">
                  {t.about.cardText}
                </p>
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow={t.about.eyebrow}
                title={t.about.title}
                lead={t.about.lead}
              />
              <ul className="mt-7 space-y-3.5">
                {t.about.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-ink/85">
                    <IconCheck size={17} className="mt-0.5 shrink-0 text-brass-ink" />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={localePath(locale, "/over-ons")}
                variant="outline"
                size="md"
                className="mt-8"
              >
                {t.about.cta}
                <IconArrow size={17} className="rtl:-scale-x-100" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Werkgebied strook ---------------- */}
      <Section tone="dim" size="sm" rule>
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow">{t.area.eyebrow}</p>
              <p className="mt-3 max-w-[56ch] font-display text-[1.45rem] leading-snug">
                {t.area.text}
              </p>
            </div>
            <ButtonLink
              href={localePath(locale, "/werkgebied")}
              variant="outline"
              size="md"
              className="shrink-0"
            >
              {t.area.cta}
              <IconArrow size={17} className="rtl:-scale-x-100" />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <CtaSection locale={locale} title={t.cta.title} text={t.cta.text} eyebrow={t.cta.eyebrow} />
    </>
  );
}
