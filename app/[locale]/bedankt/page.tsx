import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/section";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { IconArrow, IconCheck, IconPhone, IconWhatsapp } from "@/components/icons";
import { site, telUrl, whatsappUrl } from "@/lib/site";
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
  const t = pagesCopy[locale].thanks;
  return {
    title: t.meta.title,
    description: t.meta.description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: localePath(locale, "/bedankt"),
      languages: alternateLanguages("/bedankt"),
    },
  };
}

export default async function BedanktPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { locale: raw } = await params;
  const { ref } = await searchParams;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = pagesCopy[locale].thanks;
  const c = getCommon(locale);

  return (
    <Section size="lg" className="min-h-[70svh]">
      <Container>
        <div className="mx-auto max-w-[62ch]">
          <span className="grid size-14 place-items-center rounded-full border border-brass/40 bg-brass/10 text-brass-ink">
            <IconCheck size={26} />
          </span>
          <h1 className="mt-6 text-[clamp(2rem,4vw,3rem)] leading-[1.05]">{t.title}</h1>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">{t.lead}</p>

          {ref && (
            <div className="mt-7 border-l-2 border-brass bg-paper-dim px-5 py-4 rtl:border-l-0 rtl:border-r-2">
              <p className="font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-brass-ink uppercase">
                {t.reference}
              </p>
              <p className="mt-1 font-display text-[1.4rem] tracking-wide">{ref}</p>
              <p className="mt-1 text-[0.8rem] text-muted">{t.referenceNote}</p>
            </div>
          )}

          <div className="mt-9 border-t border-paper-line pt-7">
            <h2 className="text-[1.2rem]">{t.more}</h2>
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <ButtonAnchor href={telUrl} size="md">
                <IconPhone size={17} />
                {fill(c.actions.callNumber, { phone: site.phoneDisplay })}
              </ButtonAnchor>
              <ButtonAnchor
                href={whatsappUrl(t.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="md"
              >
                <IconWhatsapp size={17} />
                {c.actions.whatsapp}
              </ButtonAnchor>
            </div>
          </div>

          <p className="mt-9 text-[0.9rem] text-muted">
            {t.work}{" "}
            <Link href={localePath(locale, "/projecten")} className="link-underline text-ink">
              {t.projects}
            </Link>{" "}
            <Link href={localePath(locale, "/diensten")} className="link-underline text-ink">
              {t.services}
            </Link>
            .
          </p>
          <ButtonLink
            href={localePath(locale)}
            variant="ghost"
            size="md"
            className="mt-4 -ms-2"
          >
            {t.back}
            <IconArrow size={16} className="rtl:-scale-x-100" />
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
