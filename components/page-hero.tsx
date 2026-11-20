import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/section";
import { IconChevron } from "@/components/icons";
import { cn } from "@/lib/utils";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getCommon } from "@/lib/i18n";

export type Crumb = { href: string; label: string };

/**
 * Paginakop voor binnenseiten: donker vlak met foto, kruimelpad en titel.
 * Houdt de verticale maat op mobiel klein zodat content snel in beeld komt.
 * `locale` is nodig voor de taalspecifieke links in het kruimelpad.
 */
export function PageHero({
  locale,
  eyebrow,
  title,
  lead,
  crumbs,
  image,
  imageAlt,
  children,
  align = "left",
}: {
  locale: Locale;
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  const t = getCommon(locale);
  return (
    <section className="grain relative isolate overflow-hidden bg-ink text-paper">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover opacity-45"
          />
          {/* Verloop naar antraciet zodat tekst altijd leesbaar blijft (AA) */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(26_29_33/0.94)_0%,rgb(26_29_33/0.78)_45%,rgb(26_29_33/0.35)_100%)]"
          />
        </>
      )}
      <Container className={cn("pt-10 pb-14 md:pt-14 md:pb-20", align === "center" && "text-center")}>
        {crumbs && crumbs.length > 0 && (
          <nav aria-label={t.breadcrumb} className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 font-sans text-[0.75rem] text-paper/50">
              <li>
                <Link href={localePath(locale)} className="transition-colors hover:text-paper">
                  {t.home}
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  <IconChevron size={12} className="-rotate-90 opacity-50 rtl:rotate-90" />
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-paper/80">
                      {c.label}
                    </span>
                  ) : (
                    <Link
                      href={localePath(locale, c.href)}
                      className="transition-colors hover:text-paper"
                    >
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && <p className="eyebrow text-brass-soft">{eyebrow}</p>}
        <h1 className="mt-5 max-w-[26ch] text-[clamp(2.1rem,5vw,4rem)] leading-[1.02] text-paper">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-paper/70 md:text-lg">
            {lead}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
