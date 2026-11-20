import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma, lines } from "@/lib/db";
import { PageHero } from "@/components/page-hero";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ImageCard } from "@/components/ui/card";
import { ServiceIcon, IconArrow, IconCheck } from "@/components/icons";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import { serviceImageAlt } from "@/lib/image-alts";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { fill, getCommon } from "@/lib/i18n";
import { servicesCopy } from "@/lib/i18n/dict/services";
import { localizeProject, localizeService } from "@/lib/i18n/content";

export const revalidate = 300;

/** Route-params zijn slugs; we genereren statisch alle gepubliceerde diensten. */
export async function generateStaticParams() {
  const services = await prisma.service.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

async function getService(slug: string) {
  return prisma.service.findFirst({
    where: { slug, published: true },
    include: {
      faqs: { orderBy: { order: "asc" } },
      projects: { where: { published: true }, orderBy: { order: "asc" }, take: 3 },
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const service = await getService(slug);
  if (!service) return {};
  const t = servicesCopy[locale];
  const s = localizeService(service, locale);
  const title = s.seoTitle ?? `${s.title} ${t.detail.titleSuffix}`;
  const description = s.seoDesc ?? s.excerpt;
  return {
    title,
    description,
    alternates: {
      canonical: localePath(locale, `/diensten/${s.slug}`),
      languages: alternateLanguages(`/diensten/${s.slug}`),
    },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: localePath(locale, `/diensten/${s.slug}`),
      images: s.image ? [{ url: s.image, alt: s.title }] : undefined,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = servicesCopy[locale];
  const c = getCommon(locale);

  const [service, otherServices] = await Promise.all([
    getService(slug),
    prisma.service.findMany({
      where: { published: true, slug: { not: slug } },
      orderBy: { order: "asc" },
      take: 3,
    }),
  ]);

  if (!service) notFound();

  const s = localizeService(service, locale);
  const bullets = lines(s.bullets);
  const faqs = s.faqs.map((f) => ({ question: f.question, answer: f.answer }));
  const serviceUrl = `${site.url}${localePath(locale, `/diensten/${s.slug}`)}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.nav.diensten, url: localePath(locale, "/diensten") },
          { name: s.title, url: localePath(locale, `/diensten/${s.slug}`) },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: s.title,
          description: s.excerpt,
          url: serviceUrl,
        })}
      />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}

      <PageHero
        locale={locale}
        eyebrow={t.detail.eyebrow}
        title={s.title}
        lead={s.excerpt}
        image={s.image || undefined}
        imageAlt={s.image ? serviceImageAlt(s.image, s.title, locale) : undefined}
        crumbs={[
          { href: "/diensten", label: c.nav.diensten },
          { href: `/diensten/${s.slug}`, label: s.title },
        ]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={localePath(locale, `/offerte?dienst=${s.slug}`)}
            variant="brass"
            size="lg"
          >
            {fill(c.actions.quoteService, { service: s.title })}
            <IconArrow size={18} className="rtl:-scale-x-100" />
          </ButtonLink>
          <ButtonLink
            href={localePath(locale, "/projecten")}
            size="lg"
            className="border-paper/25 bg-transparent text-paper hover:bg-paper hover:text-ink"
          >
            {c.actions.viewProjects}
          </ButtonLink>
        </div>
      </PageHero>

      {/* Intro + wat we doen */}
      <Section size="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <span className="text-brass-ink">
                <ServiceIcon name={service.icon} size={34} />
              </span>
              <p className="mt-6 font-display text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.35] text-ink">
                {s.intro}
              </p>
            </div>

            <div className="border-t border-paper-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12 rtl:lg:border-r rtl:lg:border-l-0 rtl:lg:pr-12 rtl:lg:pl-0">
              <h2 className="font-sans text-[0.7rem] font-semibold tracking-[0.18em] text-brass-ink uppercase">
                {t.detail.whatWeDo}
              </h2>
              <ul className="mt-5 space-y-3">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-ink/85"
                  >
                    <IconCheck size={16} className="mt-1 shrink-0 text-brass-ink" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Werkwijze */}
      <Section tone="dim" size="md" rule>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow={t.detail.process.eyebrow}
              title={t.detail.process.title}
              lead={t.detail.process.lead}
            />
            <ol className="divide-y divide-paper-line border-y border-paper-line">
              {t.detail.process.steps.map((step, i) => (
                <li key={step} className="flex gap-5 py-5">
                  <span className="font-display text-[1.5rem] leading-none text-brass-ink/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-ink/85">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Uitgelichte afbeelding + CTA strook */}
      <Section size="md">
        <Container>
          <div className={`grid items-stretch gap-6 ${s.image ? "md:grid-cols-2" : ""}`}>
            {s.image && (
              <div className="relative min-h-[280px] overflow-hidden bg-paper-dim md:min-h-[380px]">
                <Image
                  src={s.image}
                  alt={serviceImageAlt(s.image, s.title, locale)}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col justify-center border border-paper-line p-8 md:p-12">
              <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight">
                {t.detail.consult.title}
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                {t.detail.consult.text}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={localePath(locale, `/offerte?dienst=${s.slug}`)} size="md">
                  {t.detail.consult.quote}
                  <IconArrow size={17} className="rtl:-scale-x-100" />
                </ButtonLink>
                <ButtonLink
                  href={localePath(locale, "/contact")}
                  variant="outline"
                  size="md"
                >
                  {t.detail.consult.question}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Gerelateerde projecten */}
      {service.projects.length > 0 && (
        <Section tone="dim" size="lg" rule>
          <Container>
            <SectionHeading
              eyebrow={t.detail.related.eyebrow}
              title={t.detail.related.title}
              className="mb-10"
            />
            <div className="grid gap-6 md:grid-cols-3">
              {service.projects.map((project) => {
                const p = localizeProject(project, locale);
                return (
                  <ImageCard
                    key={p.id}
                    href={localePath(locale, `/projecten/${p.slug}`)}
                    image={p.coverImage}
                    imageAlt={`${p.title}, ${p.location}`}
                    label={p.category}
                    title={p.title}
                    text={p.summary}
                    cta={c.actions.view}
                  />
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <Section size="lg">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              <SectionHeading
                eyebrow={t.detail.faq.eyebrow}
                title={t.detail.faq.title}
                lead={t.detail.faq.lead}
              />
              <FaqAccordion items={faqs} />
            </div>
          </Container>
        </Section>
      )}

      {/* Andere diensten */}
      <Section tone="dim" size="md" rule>
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-[1.5rem] leading-snug">{t.detail.other.title}</h2>
            <Link
              href={localePath(locale, "/diensten")}
              className="link-underline font-sans text-[0.85rem] text-ink"
            >
              {t.detail.other.all}
            </Link>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {otherServices.map((other) => {
              const o = localizeService(other, locale);
              return (
                <li key={o.id}>
                  <Link
                    href={localePath(locale, `/diensten/${o.slug}`)}
                    className="group flex min-h-[72px] items-center gap-4 border border-paper-line bg-paper p-4 transition-colors hover:border-ink/30"
                  >
                    <ServiceIcon name={o.icon} size={22} className="shrink-0 text-brass-ink" />
                    <span className="flex-1 font-sans text-[0.9rem] font-medium">{o.title}</span>
                    <IconArrow
                      size={15}
                      className="text-muted transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <CtaSection
        locale={locale}
        title={fill(t.detail.ctaTitle, { service: s.title })}
      />
    </>
  );
}
