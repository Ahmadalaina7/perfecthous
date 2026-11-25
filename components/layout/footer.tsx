import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/section";
import { IconArrow, IconMail, IconPhone, IconPin } from "@/components/icons";
import { addressLine, mailUrl, site, telUrl } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getCommon, siteValue } from "@/lib/i18n";
import { workAreaNames } from "@/lib/i18n/dict/work-area";

export function Footer({ locale }: { locale: Locale }) {
  const t = getCommon(locale);
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t.footer.services,
      links: [
        { href: "/diensten/verbouwing-renovatie", label: t.footer.serviceLinks.verbouwing },
        { href: "/diensten/aanbouw-uitbouw", label: t.footer.serviceLinks.aanbouw },
        { href: "/diensten/badkamer-keuken", label: t.footer.serviceLinks.badkamer },
        { href: "/diensten/tegelwerk", label: t.footer.serviceLinks.tegelwerk },
        { href: "/diensten/stucwerk", label: t.footer.serviceLinks.stucwerk },
        { href: "/diensten/loodgieterswerk", label: t.footer.serviceLinks.loodgieterswerk },
        { href: "/diensten/elektrisch-werk", label: t.footer.serviceLinks.elektra },
        { href: "/diensten", label: t.footer.serviceLinks.all },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { href: "/over-ons", label: t.footer.companyLinks.overOns },
        { href: "/projecten", label: t.footer.companyLinks.projecten },
        { href: "/reviews", label: t.footer.companyLinks.reviews },
        { href: "/blog", label: t.footer.companyLinks.kennisbank },
        { href: "/faq", label: t.footer.companyLinks.faq },
        { href: "/contact", label: t.footer.companyLinks.contact },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { href: "/privacyverklaring", label: t.footer.legalLinks.privacy },
        { href: "/algemene-voorwaarden", label: t.footer.legalLinks.terms },
        { href: "/cookieverklaring", label: t.footer.legalLinks.cookies },
      ],
    },
  ];

  return (
    <footer className="grain relative bg-ink text-paper">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2.4fr]">
          {/* Merk + contact */}
          <div>
            <Logo tone="paper" markSize={42} tagline={t.logoTagline} />
            <p className="mt-6 max-w-[34ch] text-[0.9375rem] leading-relaxed text-paper/60">
              {t.footer.intro}
            </p>

            {/* Op een telefoon en tablet is elk contact een raakvlak van 44 px;
                vanaf lg mag het compacter, want daar wijst een muis. */}
            <address className="mt-6 space-y-1 text-[0.9375rem] not-italic md:mt-8 md:space-y-3.5">
              <a
                href={telUrl}
                className="flex min-h-11 items-center gap-3 text-paper/85 transition-colors hover:text-brass-soft lg:min-h-0"
              >
                <IconPhone size={17} className="text-brass" />
                <span dir="ltr">{site.phoneDisplay}</span>
              </a>
              <a
                href={mailUrl}
                className="flex min-h-11 items-center gap-3 text-paper/85 transition-colors hover:text-brass-soft lg:min-h-0"
              >
                <IconMail size={17} className="text-brass" />
                {site.email}
              </a>
              <span className="flex items-start gap-3 py-2 text-paper/70 md:py-0">
                <IconPin size={17} className="mt-0.5 shrink-0 text-brass" />
                {addressLine}
              </span>
            </address>
          </div>

          {/* Linkkolommen */}
          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="font-sans text-[0.68rem] font-semibold tracking-[0.18em] text-paper/45 uppercase">
                  {col.title}
                </h2>
                <ul className="mt-3 space-y-0 lg:mt-5 lg:space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={localePath(locale, link.href)}
                        className="inline-flex min-h-11 items-center text-[0.9rem] text-paper/70 transition-colors hover:text-paper lg:min-h-0"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Werkgebied + CTA */}
        <div className="mt-14 flex flex-col gap-6 border-t border-line-dark pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-sans text-[0.68rem] font-semibold tracking-[0.18em] text-paper/45 uppercase">
              {t.footer.workArea}
            </p>
            <p className="mt-2.5 max-w-[60ch] text-[0.84rem] leading-relaxed text-paper/55">
              {workAreaNames[locale].join(" · ")}
            </p>
          </div>
          <Link
            href={localePath(locale, "/offerte")}
            className="group inline-flex shrink-0 items-center gap-2.5 font-sans text-[0.9rem] font-medium text-brass-soft transition-colors hover:text-paper"
          >
            {t.actions.quoteLong}
            <IconArrow size={17} className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100" />
          </Link>
        </div>
      </Container>

      <div className="border-t border-line-dark">
        <Container className="flex flex-col gap-3 py-6 text-[0.78rem] text-paper/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. {t.footer.rights}
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <span>
              {t.footer.kvk} {siteValue(site.kvk, locale, "kvk")}
            </span>
            <span>
              {t.footer.vat} {siteValue(site.vat, locale, "vat")}
            </span>
          </p>
        </Container>
      </div>
    </footer>
  );
}
