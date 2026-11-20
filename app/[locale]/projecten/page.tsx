import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui/section";
import { ProjectGrid } from "@/components/project-grid";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n/config";
import { getCommon } from "@/lib/i18n";
import { projectsCopy } from "@/lib/i18n/dict/projects";
import { localizeProject } from "@/lib/i18n/content";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = projectsCopy[locale];
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localePath(locale, "/projecten"),
      languages: alternateLanguages("/projecten"),
    },
    openGraph: {
      title: `${t.meta.title} | Perfecthous`,
      description: t.meta.description,
      url: localePath(locale, "/projecten"),
      images: [
        {
          url: "/images/perfecthous-salon.jpg",
          alt: t.hero.imageAlt,
        },
      ],
    },
  };
}

export default async function ProjectenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = projectsCopy[locale];
  const c = getCommon(locale);

  const rows = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: {
      slug: true,
      title: true,
      category: true,
      location: true,
      year: true,
      summary: true,
      description: true,
      coverImage: true,
      translations: true,
    },
  });

  const projects = rows.map((project) => {
    const p = localizeProject(project, locale);
    return {
      slug: p.slug,
      title: p.title,
      category: p.category,
      location: p.location,
      year: p.year,
      summary: p.summary,
      coverImage: p.coverImage,
    };
  });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.nav.projecten, url: localePath(locale, "/projecten") },
        ])}
      />

      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        image="/images/perfecthous-salon.jpg"
        imageAlt={t.hero.imageAlt}
        crumbs={[{ href: "/projecten", label: c.nav.projecten }]}
      />

      <Section size="lg">
        <Container>
          <ProjectGrid locale={locale} projects={projects} labels={t.grid} />
          <p className="mt-10 max-w-[70ch] border-t border-paper-line pt-5 font-sans text-[0.78rem] leading-relaxed text-muted">
            {t.note}
          </p>
        </Container>
      </Section>

      <CtaSection locale={locale} title={t.cta.title} text={t.cta.text} />
    </>
  );
}
