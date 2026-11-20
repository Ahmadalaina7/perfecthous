import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui/section";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Stars } from "@/components/stars";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import { IconArrow } from "@/components/icons";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n/config";
import { fill, getCommon } from "@/lib/i18n";
import { companyCopy } from "@/lib/i18n/dict/company";
import { localizeReview } from "@/lib/i18n/content";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = companyCopy[locale].reviews;
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localePath(locale, "/reviews"),
      languages: alternateLanguages("/reviews"),
    },
    openGraph: {
      title: `${t.meta.title} | Perfecthous`,
      description: t.meta.description,
      url: localePath(locale, "/reviews"),
    },
  };
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = companyCopy[locale].reviews;
  const c = getCommon(locale);

  const rows = await prisma.review.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  const reviews = rows.map((review) => localizeReview(review, locale));

  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
        .toFixed(1)
        .replace(".", locale === "nl" ? "," : ".")
    : "—";

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: c.nav.reviews, url: localePath(locale, "/reviews") }])}
      />

      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        image="/images/perfecthous-salon.jpg"
        imageAlt={t.hero.imageAlt}
        crumbs={[{ href: "/reviews", label: c.nav.reviews }]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-3">
            <Stars rating={5} size={20} label={fill(c.stars, { rating: 5 })} />
            <span className="font-display text-[1.5rem] leading-none text-paper">{average}</span>
            <span className="font-sans text-[0.85rem] text-paper/60">{t.average}</span>
          </div>
          <span className="font-sans text-[0.85rem] text-paper/50">
            {reviews.length} {reviews.length === 1 ? t.countOne : t.countMany}
          </span>
        </div>
      </PageHero>

      <Section size="lg">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal key={review.id} delay={Math.min(i * 0.05, 0.25)}>
                <figure className="flex h-full flex-col border border-paper-line bg-paper p-7">
                  <Stars
                    rating={review.rating}
                    size={15}
                    label={fill(c.stars, { rating: review.rating })}
                  />
                  <blockquote className="mt-4 flex-1 font-display text-[1.0625rem] leading-[1.55] text-ink/90">
                    “{review.body}”
                  </blockquote>
                  <figcaption className="mt-6 border-t border-paper-line pt-4">
                    <span className="block font-sans text-[0.9rem] font-medium">
                      {review.author}
                    </span>
                    <span className="mt-0.5 block font-sans text-[0.78rem] text-muted">
                      {review.city}
                      {review.service ? ` · ${review.service}` : ""}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 border border-paper-line p-7 md:p-9">
            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <h2 className="text-[1.4rem] leading-snug">{t.leave.title}</h2>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {t.leave.text}
                </p>
                <p className="mt-3 font-sans text-[0.78rem] text-muted">{t.leave.note}</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <ButtonAnchor
                  href={site.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  className="w-full"
                >
                  {t.leave.google}
                  <IconArrow size={16} className="rtl:-scale-x-100" />
                </ButtonAnchor>
                <ButtonLink
                  href={localePath(locale, "/contact")}
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  {t.leave.share}
                </ButtonLink>
              </div>
            </div>
          </div>

          <p className="mt-8 text-[0.85rem] text-muted">
            {t.work}{" "}
            <Link href={localePath(locale, "/projecten")} className="link-underline text-ink">
              {t.workLink}
            </Link>
            .
          </p>
        </Container>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}
