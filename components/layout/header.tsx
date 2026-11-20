"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/brand/logo";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { IconChevron, IconClose, IconMenu, IconPhone } from "@/components/icons";
import { cn } from "@/lib/utils";
import { telUrl } from "@/lib/site";
import {
  localeFromPath,
  localeMeta,
  localePath,
  locales,
  stripLocale,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n/config";
import { getCommon } from "@/lib/i18n";

const navigation = [
  { href: "/diensten", key: "diensten" },
  { href: "/projecten", key: "projecten" },
  { href: "/over-ons", key: "overOns" },
  { href: "/werkgebied", key: "werkgebied" },
  { href: "/reviews", key: "reviews" },
  { href: "/blog", key: "kennisbank" },
  { href: "/contact", key: "contact" },
] as const;

/**
 * Compacte taalkeuze als uitklapmenu. `<details>` werkt ook zonder JavaScript;
 * daarnaast sluit hij bij Escape en bij een klik of tik buiten het menu. Twee
 * instanties in de header (naast het menu op desktop, bij de knoppen op tablet)
 * zijn nooit tegelijk zichtbaar.
 */
function LanguageMenu({
  locale,
  pathname,
  className,
}: {
  locale: Locale;
  pathname: string;
  className?: string;
}) {
  const t = getCommon(locale);
  const ref = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = () => {
      if (ref.current?.open) ref.current.open = false;
    };
    const onPointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !ref.current?.open) return;
      close();
      summaryRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Sluit bij een routewissel
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details ref={ref} className={cn("group relative", className)}>
      <summary
        ref={summaryRef}
        aria-label={t.languageSwitch}
        className="flex min-h-9 cursor-pointer list-none items-center gap-1.5 rounded-[2px] px-2 font-sans text-[0.78rem] font-medium tracking-[0.04em] text-ink/70 uppercase transition-colors hover:text-ink [&::-webkit-details-marker]:hidden"
      >
        {localeMeta[locale].short}
        <IconChevron
          size={12}
          className="opacity-60 transition-transform duration-300 group-open:rotate-180"
        />
      </summary>
      <ul
        aria-label={t.language}
        className="absolute end-0 top-full z-50 mt-1 min-w-[150px] bg-paper py-1 shadow-[0_18px_44px_-20px_rgb(26_29_33/0.42)]"
      >
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={switchLocalePath(pathname, l)}
              hrefLang={l}
              lang={l}
              aria-current={l === locale ? "true" : undefined}
              className={cn(
                "flex min-h-10 items-center px-3.5 font-sans text-[0.85rem] transition-colors hover:bg-paper-dim",
                l === locale ? "font-medium text-ink" : "text-ink/70",
              )}
            >
              {localeMeta[l].label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function Header() {
  const pathname = usePathname();
  const locale: Locale = localeFromPath(pathname) ?? "nl";
  const t = getCommon(locale);
  const path = stripLocale(pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Sluit het menu bij een routewissel
  useEffect(() => setOpen(false), [pathname]);

  // Compacte, iets dichtere header zodra er gescrold is
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zolang het mobiele menu open is: achtergrond vergrendelen en sluiten bij
  // Escape of bij een klik of tik buiten het menu (de knop zelf uitgezonderd,
  // anders sluit en heropent één tik hem).
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (mobileMenuRef.current?.contains(target) || toggleRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const isActive = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500",
        scrolled || open
          ? "border-paper-line bg-paper/95 shadow-[0_1px_0_rgb(26_29_33/0.04)] backdrop-blur-md"
          : "border-transparent bg-paper",
      )}
    >
      <Container>
        <div
          className={cn(
            // Op 320 px moeten logo, taalkeuze en menuknop samen in de marge
            // passen; daarom een kleinere minimumruimte onder sm.
            "flex items-center justify-between gap-2 transition-[height] duration-500 sm:gap-6 lg:gap-3.5",
            scrolled ? "h-16 md:h-[70px]" : "h-[72px] md:h-20",
          )}
        >
          <Link href={localePath(locale)} aria-label={t.homeLink} className="shrink-0">
            <Logo markSize={scrolled ? 34 : 38} showTagline={false} />
          </Link>

          <nav aria-label={t.mainMenu} className="hidden lg:flex lg:items-center lg:gap-3.5 xl:gap-4">
            {/* Op lg is de ruimte krap: menu, taalkeuze en twee knoppen moeten
                naast logo passen. Daarom kleinere tussenruimte en geen
                regelafbreking in de labels. */}
            <ul className="flex items-center gap-2.5 lg:gap-2 xl:gap-5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(locale, item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "link-underline py-2.5 font-sans text-[0.84rem] font-medium whitespace-nowrap transition-colors xl:text-[0.875rem]",
                      isActive(item.href) ? "text-ink" : "text-ink/70 hover:text-ink",
                    )}
                  >
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Taalkeuze direct naast het menu, als uitklapmenu. */}
            <LanguageMenu locale={locale} pathname={pathname} />
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Op tablet is het hoofdmenu verborgen; daar staat de taalkeuze
                naast de knoppen in plaats van in de nav. */}
            <LanguageMenu locale={locale} pathname={pathname} className="lg:hidden" />
            <ButtonAnchor
              href={telUrl}
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
              data-event="call-header"
            >
              <IconPhone size={16} />
              <span className="hidden xl:inline">{t.actions.call}</span>
              <span className="xl:hidden">{t.actions.callShort}</span>
            </ButtonAnchor>
            <ButtonLink
              href={localePath(locale, "/offerte")}
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <span className="xl:hidden">{t.actions.quoteShort}</span>
              <span className="hidden xl:inline">{t.actions.quote}</span>
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.menuClose : t.menuOpen}
              className="grid size-11 place-items-center rounded-[2px] text-ink transition-colors hover:bg-ink/[0.06] lg:hidden"
            >
              {/* Menu-icoon wisselt met schaal, opacity en blur in plaats van
                  hard om te klappen: hetzelfde icoonvlak, andere stand. */}
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={open ? "close" : "menu"}
                  initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                  transition={
                    reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }
                  }
                  className="grid place-items-center"
                >
                  {open ? <IconClose size={20} /> : <IconMenu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            key="mobile-menu"
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            /* Uitgang korter dan ingang: het menu verdwijnt terwijl de
               aandacht al naar de pagina gaat. */
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.15 } }
                : { height: 0, opacity: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }
            }
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-paper-line bg-paper lg:hidden"
          >
            <Container className="py-5">
              <nav aria-label={t.mobileMenu}>
                <ul className="divide-y divide-paper-line">
                  {navigation.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={reduceMotion ? undefined : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: reduceMotion ? 0 : 0.04 * i + 0.06, duration: 0.3 }}
                    >
                      <Link
                        href={localePath(locale, item.href)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "flex min-h-[52px] items-center justify-between font-display text-[1.35rem] transition-colors",
                          isActive(item.href) ? "text-ink" : "text-ink/80",
                        )}
                      >
                        {t.nav[item.key]}
                        <span aria-hidden className="font-sans text-[0.7rem] tracking-widest text-brass-ink">
                          0{i + 1}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-5 grid gap-2.5">
                <ButtonLink
                  href={localePath(locale, "/offerte")}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  {t.actions.quoteLong}
                </ButtonLink>
                <ButtonAnchor href={telUrl} variant="outline" size="md" className="w-full">
                  <IconPhone size={17} /> {t.actions.callDirect}
                </ButtonAnchor>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
