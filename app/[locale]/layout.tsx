import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fontClassName } from "@/app/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCallBar } from "@/components/layout/mobile-call-bar";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { site } from "@/lib/site";
import {
  defaultLocale,
  dirOf,
  isLocale,
  locales,
  localeMeta,
  type Locale,
} from "@/lib/i18n/config";
import { getCommon } from "@/lib/i18n";
import { siteMeta } from "@/lib/i18n/site-meta";

/**
 * Root-layout van de publieke site. Elke taal heeft een eigen prefix, dus dit
 * layout rendert `<html>` en zet `lang` en `dir` per taal (Arabisch is RTL).
 * Het beheerpaneel heeft een eigen root-layout (app/admin/layout.tsx).
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const meta = siteMeta[locale];

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${meta.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      url: `/${locale}`,
      siteName: site.name,
      title: `${site.name} — ${meta.tagline}`,
      description: meta.description,
      images: [
        {
          url: "/images/perfecthous-vloer.jpg",
          width: 1600,
          height: 1200,
                      alt: meta.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${meta.tagline}`,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    formatDetection: { telephone: true, address: true, email: true },
    category: "construction",
  };
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getCommon(locale);

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      data-scroll-behavior="smooth"
      className={fontClassName}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-sm focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          {t.skipToContent}
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <MobileCallBar />
        <CookieBanner />
      </body>
    </html>
  );
}
