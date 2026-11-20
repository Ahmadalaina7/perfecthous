import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui/section";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { renderMarkdown } from "@/lib/markdown";
import { site, telUrl } from "@/lib/site";
import { IconArrow } from "@/components/icons";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { fill, formatDate, getCommon } from "@/lib/i18n";
import { pagesCopy } from "@/lib/i18n/dict/pages";
import { hasTranslation, localizePost } from "@/lib/i18n/content";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

async function getPost(slug: string) {
  return prisma.post.findFirst({ where: { slug, published: true } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const post = await getPost(slug);
  if (!post) return {};
  const p = localizePost(post, locale);
  return {
    title: p.title,
    description: p.excerpt,
    alternates: {
      canonical: localePath(locale, `/blog/${p.slug}`),
      languages: alternateLanguages(`/blog/${p.slug}`),
    },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      url: localePath(locale, `/blog/${p.slug}`),
      publishedTime: post.publishedAt?.toISOString(),
      images: p.coverImage ? [{ url: p.coverImage, alt: p.title }] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = pagesCopy[locale].blog;
  const c = getCommon(locale);

  const post = await getPost(slug);
  if (!post) notFound();

  const p = localizePost(post, locale);
  const relatedRows = await prisma.post.findMany({
    where: { published: true, slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: 2,
  });
  const related = relatedRows.map((row) => localizePost(row, locale));

  // De artikelen zijn vertaald (seed). Alleen als een artikel geen vertaling
  // heeft valt de pagina terug op de Nederlandse tekst, met een notice erboven.
  const dutchBody = locale !== "nl" && !hasTranslation(post.translations, locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.nav.kennisbank, url: localePath(locale, "/blog") },
          { name: p.title, url: localePath(locale, `/blog/${p.slug}`) },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.excerpt,
          datePublished: post.publishedAt?.toISOString(),
          dateModified: post.updatedAt.toISOString(),
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}${localePath(locale, `/blog/${p.slug}`)}`,
        }}
      />

      <PageHero
        locale={locale}
        eyebrow={p.category}
        title={p.title}
        lead={p.excerpt}
        crumbs={[
          { href: "/blog", label: c.nav.kennisbank },
          { href: `/blog/${p.slug}`, label: p.title },
        ]}
      >
        <p className="mt-6 font-sans text-[0.8rem] text-paper/50">
          {post.publishedAt && (
            <time dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt, locale)}
            </time>
          )}
          {" · "}
          {Math.max(1, Math.round(p.content.split(/\s+/).length / 200))} {t.post.readTime}
        </p>
      </PageHero>

      <Section size="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.32fr_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-brass-ink uppercase">
                {t.post.toc}
              </p>
              <ul className="mt-4 space-y-2 border-l border-paper-line pl-4 rtl:border-r rtl:border-l-0 rtl:pr-4 rtl:pl-0">
                {p.content
                  .split("\n")
                  .filter((line) => line.startsWith("## "))
                  .map((line) => (
                    <li key={line} className="font-sans text-[0.82rem] leading-snug text-muted">
                      {line.slice(3)}
                    </li>
                  ))}
              </ul>
              <div className="mt-8 border-t border-paper-line pt-5">
                <p className="text-[0.85rem] leading-relaxed text-muted">
                  {t.post.question}{" "}
                  <a href={telUrl} className="link-underline text-ink" dir="ltr">
                    {site.phoneDisplay}
                  </a>{" "}
                  {t.post.orAsk}
                </p>
                <Link
                  href={localePath(locale, "/offerte")}
                  className="link-underline mt-3 inline-flex items-center gap-1.5 font-sans text-[0.84rem] font-medium text-ink"
                >
                  {t.post.quote}
                  <IconArrow size={14} className="rtl:-scale-x-100" />
                </Link>
              </div>
            </aside>

            <div>
              {dutchBody && (
                <p className="mb-7 border-l-2 border-brass bg-paper-dim px-4 py-3 text-[0.875rem] leading-relaxed text-muted rtl:border-l-0 rtl:border-r-2">
                  {t.post.dutchOnly}
                </p>
              )}
              <article
                dir={dutchBody ? "ltr" : undefined}
                className="max-w-[68ch] text-[1.0625rem] [&>*:first-child]:mt-0"
                // Inhoud is onze eigen redactie; de renderer escapet alle HTML.
                dangerouslySetInnerHTML={{ __html: renderMarkdown(p.content) }}
              />
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16 border-t border-paper-line pt-9">
              <h2 className="text-[1.3rem]">{t.post.related}</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={localePath(locale, `/blog/${item.slug}`)}
                      className="group flex min-h-[76px] items-center gap-4 border border-paper-line p-4 transition-colors hover:border-ink/30"
                    >
                      <span className="flex-1">
                        <span className="block font-sans text-[0.68rem] font-semibold tracking-[0.14em] text-brass-ink uppercase">
                          {item.category}
                        </span>
                        <span className="mt-1 block text-[0.95rem] font-medium leading-snug">
                          {item.title}
                        </span>
                      </span>
                      <IconArrow
                        size={16}
                        className="shrink-0 text-muted transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}
