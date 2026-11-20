import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui/section";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { IconArrow } from "@/components/icons";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n/config";
import { fill, formatDate, getCommon } from "@/lib/i18n";
import { pagesCopy } from "@/lib/i18n/dict/pages";
import { localizePost } from "@/lib/i18n/content";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = pagesCopy[locale].blog;
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localePath(locale, "/blog"),
      languages: alternateLanguages("/blog"),
    },
    openGraph: {
      title: `${t.meta.title} | Perfecthous`,
      description: t.meta.description,
      url: localePath(locale, "/blog"),
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = pagesCopy[locale].blog;
  const c = getCommon(locale);

  const rows = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
  const posts = rows.map((post) => localizePost(post, locale));
  const [lead, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: c.nav.kennisbank, url: localePath(locale, "/blog") }])}
      />

      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        crumbs={[{ href: "/blog", label: c.nav.kennisbank }]}
      />

      <Section size="lg">
        <Container>
          {posts.length === 0 && <p className="text-muted">{t.empty}</p>}

          {lead && (
            <article className="group grid gap-6 border-b border-paper-line pb-10 md:grid-cols-2 md:items-center md:gap-10">
              {lead.coverImage && (
                <Link
                  href={localePath(locale, `/blog/${lead.slug}`)}
                  className="relative block aspect-[16/10] overflow-hidden bg-paper-dim"
                >
                  <Image
                    src={lead.coverImage}
                    alt={lead.title}
                    fill
                    priority
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </Link>
              )}
              <div>
                <p className="font-sans text-[0.72rem] font-semibold tracking-[0.16em] text-brass-ink uppercase">
                  {lead.category}
                </p>
                <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1]">
                  <Link
                    href={localePath(locale, `/blog/${lead.slug}`)}
                    className="hover:text-brass-ink"
                  >
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-[56ch] text-[0.9375rem] leading-relaxed text-muted">
                  {lead.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-4 font-sans text-[0.78rem] text-muted">
                  {lead.publishedAt && (
                    <time dateTime={lead.publishedAt.toISOString()}>
                      {formatDate(lead.publishedAt, locale)}
                    </time>
                  )}
                  <Link
                    href={localePath(locale, `/blog/${lead.slug}`)}
                    className="inline-flex items-center gap-1.5 font-medium text-ink"
                  >
                    {t.read}
                    <IconArrow
                      size={14}
                      className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {rest.length > 0 && (
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {rest.map((post) => (
                <article key={post.id} className="group flex flex-col border border-paper-line">
                  {post.coverImage && (
                    <Link
                      href={localePath(locale, `/blog/${post.slug}`)}
                      className="relative block aspect-[16/9] overflow-hidden bg-paper-dim"
                    >
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </Link>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-sans text-[0.68rem] font-semibold tracking-[0.16em] text-brass-ink uppercase">
                      {post.category}
                    </p>
                    <h2 className="mt-2.5 text-[1.25rem] leading-snug">
                      <Link
                        href={localePath(locale, `/blog/${post.slug}`)}
                        className="after:absolute after:inset-0"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{post.excerpt}</p>
                    <span className="mt-auto pt-5 font-sans text-[0.76rem] text-muted">
                      {post.publishedAt ? formatDate(post.publishedAt, locale) : ""}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <CtaSection locale={locale} title={t.cta.title} text={t.cta.text} />
    </>
  );
}
