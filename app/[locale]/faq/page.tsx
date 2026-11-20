import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui/section";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaSection } from "@/components/cta-section";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/json-ld";
import { IconArrow } from "@/components/icons";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n/config";
import { getCommon } from "@/lib/i18n";
import { companyCopy } from "@/lib/i18n/dict/company";
import { localizeService } from "@/lib/i18n/content";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = companyCopy[locale].faq;
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localePath(locale, "/faq"),
      languages: alternateLanguages("/faq"),
    },
    openGraph: {
      title: `${t.meta.title} | Perfecthous`,
      description: t.meta.description,
      url: localePath(locale, "/faq"),
    },
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = companyCopy[locale].faq;
  const c = getCommon(locale);

  // FAQ's per dienst komen uit de database; de vertaling zit in de dienst zelf,
  // zodat vraag en antwoord dezelfde taal hebben als de rest van de pagina.
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: { faqs: { orderBy: { order: "asc" } } },
  });

  const grouped = services
    .map((service) => {
      const s = localizeService(service, locale);
      return {
        title: s.title,
        slug: s.slug,
        items: s.faqs.map((f) => ({ question: f.question, answer: f.answer })),
      };
    })
    .filter((group) => group.items.length > 0);

  const all = [...t.items, ...grouped.flatMap((g) => g.items)];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.footer.companyLinks.faq, url: localePath(locale, "/faq") },
        ])}
      />
      <JsonLd data={faqSchema(all)} />

      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        crumbs={[{ href: "/faq", label: c.footer.companyLinks.faq }]}
      />

      <Section size="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight">
                {t.general.title}
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{t.general.text}</p>
              <div className="mt-6 border-t border-paper-line pt-5">
                <p className="font-sans text-[0.78rem] text-muted">{t.general.perService}</p>
                <ul className="mt-3 space-y-2">
                  {grouped.map((g) => (
                    <li key={g.slug}>
                      <a
                        href={`#${g.slug}`}
                        className="flex min-h-9 items-center gap-2 font-sans text-[0.85rem] text-ink/75 transition-colors hover:text-ink"
                      >
                        <IconArrow size={13} className="text-brass-ink rtl:-scale-x-100" />
                        {g.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <FaqAccordion items={t.items} defaultOpen={0} />

              {grouped.map((g) => (
                <div key={g.slug} id={g.slug} className="mt-14">
                  <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="text-[1.3rem] leading-snug">{g.title}</h2>
                    <Link
                      href={localePath(locale, `/diensten/${g.slug}`)}
                      className="link-underline font-sans text-[0.8rem] text-ink"
                    >
                      {t.toService}
                    </Link>
                  </div>
                  <FaqAccordion items={g.items} defaultOpen={null} />
                </div>
              ))}

              <div className="mt-14 border border-paper-line p-6">
                <h2 className="text-[1.15rem] leading-snug">{t.notFound.title}</h2>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
                  {t.notFound.text}
                </p>
                <Link
                  href={localePath(locale, "/contact")}
                  className="link-underline mt-4 inline-block font-sans text-[0.85rem] font-medium text-ink"
                >
                  {t.notFound.link}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}
