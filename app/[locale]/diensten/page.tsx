import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { serviceImageAlt } from "@/lib/image-alts";
import { PageHero } from "@/components/page-hero";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ServiceIcon, IconArrow, IconCheck } from "@/components/icons";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n/config";
import { getCommon } from "@/lib/i18n";
import { servicesCopy } from "@/lib/i18n/dict/services";
import { localizeService } from "@/lib/i18n/content";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = servicesCopy[locale];
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: localePath(locale, "/diensten"), languages: alternateLanguages("/diensten") },
    openGraph: {
      title: `${t.meta.title} | Perfecthous`,
      description: t.meta.description,
      url: localePath(locale, "/diensten"),
    },
  };
}

export default async function DienstenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = servicesCopy[locale];
  const c = getCommon(locale);

  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: { faqs: { orderBy: { order: "asc" }, take: 1 } },
  });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: c.nav.diensten, url: localePath(locale, "/diensten") }])}
      />

      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        image="/images/maps-kamer.jpg"
        imageAlt={t.hero.imageAlt}
        crumbs={[{ href: "/diensten", label: c.nav.diensten }]}
      />

      <Section size="lg">
        <Container>
          <div className="grid gap-px border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const s = localizeService(service, locale);
              return (
                <Reveal key={service.id} delay={Math.min(i * 0.04, 0.2)} className="bg-paper">
                  <Link
                    href={localePath(locale, `/diensten/${service.slug}`)}
                    className="group flex h-full flex-col"
                  >
                    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-paper-dim">
                      {service.image ? (
                        <>
                          <Image
                            src={service.image}
                            alt={serviceImageAlt(service.image, s.title, locale)}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                          />
                          <span className="absolute top-3 left-3 flex size-10 items-center justify-center bg-paper/95 text-brass-ink backdrop-blur-sm rtl:right-3 rtl:left-auto">
                            <ServiceIcon name={service.icon} size={21} />
                          </span>
                        </>
                      ) : (
                        // Voor deze dienst is er geen eigen opname: dan liever het
                        // icoon op een rustig vlak dan een foto van ander werk.
                        <ServiceIcon name={service.icon} size={46} className="text-brass-ink/35" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <div className="flex items-baseline justify-between gap-4">
                        <h2 className="text-[1.25rem] leading-snug">{s.title}</h2>
                        <span className="font-sans text-[0.68rem] tracking-[0.18em] text-muted/60 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{s.excerpt}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 font-sans text-[0.8rem] font-medium text-ink">
                        {t.card.cta}
                        <IconArrow
                          size={15}
                          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="dim" size="md" rule>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow={t.unsure.eyebrow}
              title={t.unsure.title}
              lead={t.unsure.lead}
            />
            <ul className="grid gap-3 sm:grid-cols-2 lg:self-center">
              {t.unsure.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 bg-paper p-4 text-[0.9rem] text-ink/85"
                >
                  <IconCheck size={17} className="mt-0.5 shrink-0 text-brass-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaSection locale={locale} title={t.cta.title} text={t.cta.text} />
    </>
  );
}
