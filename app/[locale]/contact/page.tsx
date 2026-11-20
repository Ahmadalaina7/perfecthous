import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";
import { ButtonAnchor } from "@/components/ui/button";
import { MapEmbed } from "@/components/map-embed";
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsapp } from "@/components/icons";
import { JsonLd, breadcrumbSchema, localBusinessSchema } from "@/components/seo/json-ld";
import { addressLine, mailUrl, site, telUrl, whatsappUrl } from "@/lib/site";
import {
  alternateLanguages,
  defaultLocale,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n/config";
import { fill, getCommon } from "@/lib/i18n";
import { pagesCopy } from "@/lib/i18n/dict/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = pagesCopy[locale].contact;
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localePath(locale, "/contact"),
      languages: alternateLanguages("/contact"),
    },
    openGraph: {
      title: `${t.meta.title} | Perfecthous`,
      description: t.meta.description,
      url: localePath(locale, "/contact"),
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = pagesCopy[locale].contact;
  const c = getCommon(locale);
  const mapQuery = encodeURIComponent(
    `${site.address.street}, ${site.address.zip} ${site.address.city}`,
  );

  return (
    <>
      <JsonLd data={localBusinessSchema(locale)} />
      <JsonLd
        data={breadcrumbSchema([{ name: c.nav.contact, url: localePath(locale, "/contact") }])}
      />

      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        crumbs={[{ href: "/contact", label: c.nav.contact }]}
      />

      <Section size="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/* Formulier */}
            <div>
              <h2 className="text-[1.6rem] leading-tight">{t.form.title}</h2>
              <p className="mt-2 mb-7 text-[0.9375rem] leading-relaxed text-muted">
                {t.form.intro}{" "}
                <Link href={localePath(locale, "/offerte")} className="link-underline text-ink">
                  {t.form.introLink}
                </Link>
                {t.form.introEnd}
              </p>
              <ContactForm locale={locale} />
            </div>

            {/* Contactgegevens */}
            <aside className="space-y-6">
              <div className="border border-paper-line p-6 md:p-7">
                <h2 className="font-sans text-[0.7rem] font-semibold tracking-[0.18em] text-brass-ink uppercase">
                  {t.direct}
                </h2>
                <ul className="mt-4 divide-y divide-paper-line">
                  <li>
                    <a
                      href={telUrl}
                      className="flex min-h-[56px] items-center gap-3.5 text-[0.95rem] text-ink transition-colors hover:text-brass-ink"
                    >
                      <IconPhone size={18} className="shrink-0 text-brass-ink" />
                      <span dir="ltr">{site.phoneDisplay}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={whatsappUrl(t.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[56px] items-center gap-3.5 text-[0.95rem] text-ink transition-colors hover:text-brass-ink"
                    >
                      <IconWhatsapp size={18} className="shrink-0 text-brass-ink" />
                      {c.actions.whatsapp}
                    </a>
                  </li>
                  <li>
                    <a
                      href={mailUrl}
                      className="flex min-h-[56px] items-center gap-3.5 break-all text-[0.95rem] text-ink transition-colors hover:text-brass-ink"
                    >
                      <IconMail size={18} className="shrink-0 text-brass-ink" />
                      {site.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="border border-paper-line p-6 md:p-7">
                <h2 className="font-sans text-[0.7rem] font-semibold tracking-[0.18em] text-brass-ink uppercase">
                  {t.address.title}
                </h2>
                <address className="mt-4 flex items-start gap-3.5 text-[0.95rem] leading-relaxed not-italic">
                  <IconPin size={18} className="mt-0.5 shrink-0 text-brass-ink" />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.zip} {site.address.city}
                    <br />
                    <span className="text-[0.82rem] text-muted">{t.address.note}</span>
                  </span>
                </address>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center font-sans text-[0.85rem] font-medium text-ink"
                >
                  {t.address.route}
                </a>
              </div>

              <div className="border border-paper-line p-6 md:p-7">
                <h2 className="font-sans text-[0.7rem] font-semibold tracking-[0.18em] text-brass-ink uppercase">
                  {t.hours.title}
                </h2>
                <ul className="mt-4 space-y-2 text-[0.9rem]">
                  {t.hours.rows.map((row) => (
                    <li key={row.days} className="flex items-baseline justify-between gap-4">
                      <span className="text-muted">{row.days}</span>
                      <span className="font-sans tabular-nums">{row.hours}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-start gap-2 border-t border-paper-line pt-4 text-[0.82rem] leading-relaxed text-muted">
                  <IconClock size={15} className="mt-0.5 shrink-0 text-brass-ink" />
                  {t.hours.emergency}
                </p>
              </div>

              <ButtonAnchor href={telUrl} size="md" className="w-full justify-between">
                <IconPhone size={17} />
                {fill(c.actions.callNumber, { phone: site.phoneDisplay })}
              </ButtonAnchor>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Kaart */}
      <section aria-label={t.map.label} className="border-t border-paper-line">
        <div className="relative h-[320px] w-full bg-paper-dim md:h-[420px]">
          <MapEmbed
            query={mapQuery}
            title={`${site.name}, ${addressLine}`}
            address={addressLine}
            labels={{ load: t.map.load, cookieNote: t.map.cookieNote }}
          />
        </div>
        <p className="container-page py-3 font-sans text-[0.72rem] text-muted">
          {t.map.note}{" "}
          <Link href={localePath(locale, "/cookieverklaring")} className="link-underline">
            {t.map.link}
          </Link>
          .
        </p>
      </section>
    </>
  );
}
