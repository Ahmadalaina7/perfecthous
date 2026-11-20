import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma, lines } from "@/lib/db";
import { PageHero } from "@/components/page-hero";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ImageCard } from "@/components/ui/card";
import { BeforeAfter } from "@/components/before-after";
import { CtaSection } from "@/components/cta-section";
import { IconArrow } from "@/components/icons";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import { projectImageAlt } from "@/lib/image-alts";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { fill, getCommon } from "@/lib/i18n";
import { projectsCopy } from "@/lib/i18n/dict/projects";
import { localizeProject, localizeService } from "@/lib/i18n/content";

export const revalidate = 300;

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

async function getProject(slug: string) {
  return prisma.project.findFirst({
    where: { slug, published: true },
    include: { service: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const project = await getProject(slug);
  if (!project) return {};
  const p = localizeProject(project, locale);
  return {
    title: `${p.title} — ${p.location}`,
    description: p.summary,
    alternates: {
      canonical: localePath(locale, `/projecten/${p.slug}`),
      languages: alternateLanguages(`/projecten/${p.slug}`),
    },
    openGraph: {
      title: `${p.title} | ${site.name}`,
      description: p.summary,
      url: localePath(locale, `/projecten/${p.slug}`),
      images: [{ url: p.coverImage, alt: `${p.title}, ${p.location}` }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = projectsCopy[locale];
  const c = getCommon(locale);

  const project = await getProject(slug);
  if (!project) notFound();

  const p = localizeProject(project, locale);
  const service = project.service ? localizeService({ ...project.service, faqs: [] }, locale) : null;
  const gallery = lines(p.gallery);

  const related = await prisma.project.findMany({
    where: { published: true, slug: { not: slug }, category: project.category },
    take: 2,
    orderBy: { order: "asc" },
  });
  // Vul aan met andere categorieën als er te weinig in dezelfde categorie zit
  const more =
    related.length >= 2
      ? related
      : await prisma.project.findMany({
          where: { published: true, slug: { notIn: [slug, ...related.map((r) => r.slug)] } },
          take: 2 - related.length,
          orderBy: { order: "asc" },
        });
  const suggestions = [...related, ...more];

  const isBathroom = project.category.includes("Badkamer");
  const clientText = fill(t.detail.client.text, {
    location: p.location,
    extra: isBathroom ? t.detail.client.extraBathroom : "",
  });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.nav.projecten, url: localePath(locale, "/projecten") },
          { name: p.title, url: localePath(locale, `/projecten/${p.slug}`) },
        ])}
      />

      <PageHero
        locale={locale}
        eyebrow={p.category}
        title={p.title}
        lead={p.summary}
        image={p.coverImage}
        imageAlt={projectImageAlt(p.coverImage, p.title, locale)}
        crumbs={[
          { href: "/projecten", label: c.nav.projecten },
          { href: `/projecten/${p.slug}`, label: p.title },
        ]}
      >
        <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-paper/15 pt-5 font-sans text-[0.8rem]">
          {[
            { label: t.detail.facts.location, value: p.location },
            { label: t.detail.facts.year, value: p.year ? String(p.year) : "—" },
            { label: t.detail.facts.category, value: service?.title ?? p.category },
          ].map((item) => (
            <div key={item.label}>
              <dt className="text-paper/45">{item.label}</dt>
              <dd className="mt-1 text-paper/90">{item.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section size="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            <div>
              <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight">
                {t.detail.situation}
              </h2>
              <p className="mt-5 max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted">
                {p.description}
              </p>
            </div>
            <aside className="border-t border-paper-line pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10 rtl:lg:border-r rtl:lg:border-l-0 rtl:lg:pr-10 rtl:lg:pl-0">
              <h2 className="font-sans text-[0.7rem] font-semibold tracking-[0.18em] text-brass-ink uppercase">
                {t.detail.client.title}
              </h2>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{clientText}</p>
              {service && (
                <Link
                  href={localePath(locale, `/diensten/${project.service?.slug}`)}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 font-sans text-[0.85rem] font-medium text-ink"
                >
                  {fill(t.detail.client.moreAbout, { service: service.title })}
                  <IconArrow size={15} className="rtl:-scale-x-100" />
                </Link>
              )}
              <ButtonLink
                href={localePath(locale, "/offerte")}
                size="md"
                className="mt-6 w-full justify-between"
              >
                {t.detail.client.similar}
                <IconArrow size={17} className="rtl:-scale-x-100" />
              </ButtonLink>
            </aside>
          </div>
        </Container>
      </Section>

      {project.beforeImage && project.afterImage && (
        <Section tone="dim" size="md" rule>
          <Container>
            <SectionHeading
              eyebrow={t.detail.beforeAfter.eyebrow}
              title={t.detail.beforeAfter.title}
              lead={t.detail.beforeAfter.lead}
              className="mb-8"
            />
            <BeforeAfter
              before={project.beforeImage}
              after={project.afterImage}
              beforeAlt={fill(t.detail.beforeAfter.beforeAlt, { title: p.title })}
              afterAlt={fill(t.detail.beforeAfter.afterAlt, { title: p.title })}
              labels={{
                before: t.detail.beforeAfter.beforeLabel,
                after: t.detail.beforeAfter.afterLabel,
                slider: t.detail.beforeAfter.sliderLabel,
                hint: t.detail.beforeAfter.sliderHint,
              }}
            />
          </Container>
        </Section>
      )}

      {gallery.length > 0 && (
        <Section size="lg">
          <Container>
            <SectionHeading
              eyebrow={t.detail.gallery.eyebrow}
              title={t.detail.gallery.title}
              className="mb-8"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((src, i) => (
                <figure
                  key={src}
                  className={`relative overflow-hidden bg-paper-dim ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
                >
                  <div className={i === 0 ? "relative aspect-[16/10]" : "relative aspect-[4/3]"}>
                    <Image
                      src={src}
                      alt={projectImageAlt(src, p.title, locale, i)}
                      fill
                      sizes={
                        i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"
                      }
                      className="object-cover"
                    />
                  </div>
                </figure>
              ))}
            </div>
            {[...gallery, p.coverImage].some((src) => src.includes("perfecthous-")) && (
              <p className="mt-6 font-sans text-[0.78rem] leading-relaxed text-muted">
                {t.detail.credits}
              </p>
            )}
          </Container>
        </Section>
      )}

      {suggestions.length > 0 && (
        <Section tone="dim" size="lg" rule>
          <Container>
            <div className="flex items-end justify-between gap-6">
              <SectionHeading eyebrow={t.detail.more.eyebrow} title={t.detail.more.title} />
              <Link
                href={localePath(locale, "/projecten")}
                className="link-underline shrink-0 pb-1 font-sans text-[0.85rem] text-ink"
              >
                {t.detail.more.all}
              </Link>
            </div>
            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              {suggestions.map((item) => {
                const s = localizeProject(item, locale);
                return (
                  <ImageCard
                    key={s.id}
                    href={localePath(locale, `/projecten/${s.slug}`)}
                    image={s.coverImage}
                    imageAlt={`${s.title}, ${s.location}`}
                    label={s.category}
                    title={s.title}
                    text={s.summary}
                    cta={c.actions.view}
                  />
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      <CtaSection locale={locale} />
    </>
  );
}
