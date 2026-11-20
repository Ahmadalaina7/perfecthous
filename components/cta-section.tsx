import Link from "next/link";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { IconArrow, IconPhone, IconWhatsapp } from "@/components/icons";
import { site, telUrl, whatsappUrl } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { localePath, type Locale } from "@/lib/i18n/config";
import { fill, getCommon } from "@/lib/i18n";

/** Afsluitende donkere CTA, op vrijwel elke pagina identiek. */
export function CtaSection({
  locale,
  title,
  text,
  eyebrow,
}: {
  locale: Locale;
  title?: string;
  text?: string;
  eyebrow?: string;
}) {
  const t = getCommon(locale);
  return (
    <section className="grain relative overflow-hidden bg-ink py-16 text-paper md:py-24">
      {/* Dun messing raster als subtiel detail */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #b8924a 1px, transparent 1px), linear-gradient(to bottom, #b8924a 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <Container className="relative">
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="eyebrow text-brass-soft">{eyebrow ?? t.cta.eyebrow}</p>
            <h2 className="mt-5 max-w-[24ch] text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] text-paper">
              {title ?? t.cta.title}
            </h2>
            <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-paper/75">
              {text ?? t.cta.text}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-3 lg:items-end">
            <ButtonLink
              href={localePath(locale, "/offerte")}
              variant="brass"
              size="lg"
              className="w-full justify-between lg:w-auto lg:min-w-[290px]"
            >
              {t.actions.quoteLong}
              <IconArrow size={18} className="rtl:-scale-x-100" />
            </ButtonLink>
            <ButtonAnchor
              href={telUrl}
              variant="light"
              size="lg"
              className="w-full border-paper/25 bg-transparent text-paper hover:bg-paper hover:text-ink lg:w-auto lg:min-w-[290px]"
            >
              <IconPhone size={18} />
              {fill(t.actions.callNumber, { phone: site.phoneDisplay })}
            </ButtonAnchor>
            <a
              href={whatsappUrl(fill(t.cta.whatsappMessage, { name: site.name }))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex min-h-11 items-center gap-2 self-start font-sans text-[0.875rem] text-paper/75 transition-colors hover:text-paper lg:self-end"
            >
              <IconWhatsapp size={16} />
              {t.actions.whatsappPrefer}
            </a>
          </Reveal>
        </div>

        <p className="mt-10 border-t border-line-dark pt-5 font-sans text-[0.8125rem] text-paper/70">
          {t.cta.responseNote}{" "}
          <Link
            href={localePath(locale, "/contact")}
            className="link-underline text-paper/80 hover:text-paper"
          >
            {t.actions.sendMessage}
          </Link>
        </p>
      </Container>
    </section>
  );
}
