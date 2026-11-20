import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui/section";
import { QuoteForm } from "@/components/forms/quote-form";
import { IconCheck, IconPhone, IconWhatsapp, IconMail, IconClock } from "@/components/icons";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { site, telUrl, whatsappUrl, mailUrl } from "@/lib/site";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n/config";
import { fill, getCommon } from "@/lib/i18n";
import { pagesCopy } from "@/lib/i18n/dict/pages";
import { localizeService } from "@/lib/i18n/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = pagesCopy[locale].quote;
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localePath(locale, "/offerte"),
      languages: alternateLanguages("/offerte"),
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${t.meta.title} | Perfecthous`,
      description: t.meta.description,
      url: localePath(locale, "/offerte"),
    },
  };
}

export default async function OffertePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ dienst?: string }>;
}) {
  const { locale: raw } = await params;
  const { dienst } = await searchParams;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = pagesCopy[locale].quote;
  const c = getCommon(locale);

  const rows = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: { slug: true, title: true, translations: true },
  });
  const services = rows.map((service) => {
    const s = localizeService(
      { ...service, excerpt: "", intro: "", bullets: "", seoTitle: null, seoDesc: null, faqs: [] },
      locale,
    );
    return { slug: s.slug, title: s.title };
  });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: c.actions.quote, url: localePath(locale, "/offerte") }])}
      />

      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        crumbs={[{ href: "/offerte", label: c.actions.quote }]}
      />

      <Section size="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_0.7fr] lg:gap-14">
            <div className="border border-paper-line bg-paper p-6 md:p-9">
              <h2 className="text-[1.5rem] leading-tight">{t.formTitle}</h2>
              <p className="mt-2 mb-7 text-[0.875rem] leading-relaxed text-muted">
                {t.formNote}
              </p>
              <QuoteForm locale={locale} services={services} initialService={dienst} />
            </div>

            {/* Zijbalk */}
            <aside className="space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden bg-paper-dim lg:aspect-[3/4]">
                <Image
                  src="/images/maps-keuken.jpg"
                  alt={t.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="border border-paper-line p-6">
                <h2 className="font-sans text-[0.7rem] font-semibold tracking-[0.18em] text-brass-ink uppercase">
                  {t.contact.title}
                </h2>
                <ul className="mt-4 space-y-2.5 text-[0.9rem]">
                  <li>
                    <a
                      href={telUrl}
                      className="flex min-h-11 items-center gap-3 text-ink hover:text-brass-ink"
                    >
                      <IconPhone size={17} className="shrink-0 text-brass-ink" />
                      <span dir="ltr">{site.phoneDisplay}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={whatsappUrl(t.contact.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center gap-3 text-ink hover:text-brass-ink"
                    >
                      <IconWhatsapp size={17} className="shrink-0 text-brass-ink" />
                      {c.actions.whatsapp}
                    </a>
                  </li>
                  <li>
                    <a href={mailUrl} className="flex min-h-11 items-center gap-3 break-all text-ink hover:text-brass-ink">
                      <IconMail size={17} className="shrink-0 text-brass-ink" />
                      {site.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3 pt-1 text-[0.85rem] text-muted">
                    <IconClock size={17} className="mt-0.5 shrink-0 text-brass-ink" />
                    <span>
                      {t.hoursShort.week}
                      <br />
                      {t.hoursShort.sat}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-paper-dim p-6">
                <h2 className="text-[1.1rem] leading-snug">{t.after.title}</h2>
                <ol className="mt-3 space-y-2.5 text-[0.875rem] leading-relaxed text-muted">
                  {t.after.steps.map((step, i) => (
                    <li key={step} className="flex gap-2.5">
                      <span className="font-sans text-[0.75rem] text-brass-ink">0{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 flex items-start gap-2 text-[0.78rem] leading-relaxed text-muted">
                  <IconCheck size={14} className="mt-0.5 shrink-0 text-brass-ink" />
                  {t.after.privacy}{" "}
                  <Link href={localePath(locale, "/privacyverklaring")} className="link-underline">
                    {t.after.privacyLink}
                  </Link>
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
