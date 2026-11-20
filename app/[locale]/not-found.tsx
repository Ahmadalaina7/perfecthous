"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/section";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { IconArrow, IconPhone } from "@/components/icons";
import { site, telUrl } from "@/lib/site";
import { localeFromPath, localePath } from "@/lib/i18n/config";
import { fill, getCommon } from "@/lib/i18n";

/**
 * Eigen 404 binnen de taalsectie. Client-component omdat een `not-found`
 * geen route-params krijgt: de taal komt uit het pad (/en/..., /ar/...).
 */
export default function NotFound() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname) ?? "nl";
  const t = getCommon(locale).notFound;

  return (
    <section className="relative flex min-h-[calc(100svh-72px)] items-center overflow-hidden bg-paper">
      <Container className="py-20">
        <div className="mx-auto max-w-[64ch]">
          <p className="font-display text-[clamp(5rem,18vw,11rem)] leading-none text-brass/25 select-none">
            404
          </p>
          <h1 className="-mt-4 text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.05]">{t.title}</h1>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">{t.text}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={localePath(locale)}
              size="md"
              className="justify-between sm:min-w-[200px]"
            >
              {t.home}
              <IconArrow size={17} className="rtl:-scale-x-100" />
            </ButtonLink>
            <ButtonAnchor href={telUrl} variant="outline" size="md">
              <IconPhone size={17} />
              {fill(getCommon(locale).actions.callNumber, { phone: site.phoneDisplay })}
            </ButtonAnchor>
          </div>

          <div className="mt-12 border-t border-paper-line pt-7">
            <p className="font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-brass-ink uppercase">
              {t.popular}
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                { href: "/diensten", label: t.links.services },
                { href: "/projecten", label: t.links.projects },
                { href: "/offerte", label: t.links.quote },
                { href: "/contact", label: t.links.contact },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={localePath(locale, l.href)}
                    className="link-underline font-sans text-[0.9rem] text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
