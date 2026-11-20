"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { localeFromPath, localePath } from "@/lib/i18n/config";
import { getCommon } from "@/lib/i18n";

const STORAGE_KEY = "ph-consent-v1";

type Consent = { necessary: true; analytics: boolean; marketing: boolean; at: string };

/**
 * AVG-proof cookiebanner: geen cookies geplaatst vóór toestemming is gegeven.
 * De keuze wordt in localStorage bewaard (geen cookie), dus de banner zelf
 * plaatst ook niets. Analytics en marketing staan standaard uit.
 */
export function CookieBanner() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname) ?? "nl";
  const t = getCommon(locale).cookie;
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      // Privémodus: geen opslag, dan ook geen banner om te onthouden
    }
  }, []);

  const save = (analytics: boolean, marketing: boolean) => {
    const consent: Consent = { necessary: true, analytics, marketing, at: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      /* niets */
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-2xl border border-ink/15 bg-paper p-5 shadow-[0_18px_60px_-20px_rgb(26_29_33/0.4)] md:inset-x-auto md:right-6 md:bottom-6 md:left-6 md:p-6"
        >
          <h2 id="cookie-title" className="font-display text-[1.25rem] text-ink">
            {t.title}
          </h2>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
            {t.text}{" "}
            <Link
              href={localePath(locale, "/cookieverklaring")}
              className="link-underline font-medium text-ink"
            >
              {t.linkLabel}
            </Link>
            .
          </p>

          {detail && (
            <ul className="mt-4 space-y-2.5 border-t border-paper-line pt-4 text-[0.85rem]">
              <li className="flex items-start justify-between gap-4">
                <span>
                  <strong className="font-medium text-ink">{t.necessary}</strong>
                  <span className="block text-muted">{t.necessaryDesc}</span>
                </span>
                <span className="shrink-0 font-sans text-[0.72rem] tracking-widest text-muted uppercase">
                  {t.always}
                </span>
              </li>
              <li className="flex items-start justify-between gap-4">
                <span>
                  <strong className="font-medium text-ink">{t.stats}</strong>
                  <span className="block text-muted">{t.statsDesc}</span>
                </span>
                <span className="shrink-0 font-sans text-[0.72rem] tracking-widest text-muted uppercase">
                  {t.optional}
                </span>
              </li>
              <li className="flex items-start justify-between gap-4">
                <span>
                  <strong className="font-medium text-ink">{t.marketing}</strong>
                  <span className="block text-muted">{t.marketingDesc}</span>
                </span>
                <span className="shrink-0 font-sans text-[0.72rem] tracking-widest text-muted uppercase">
                  {t.optional}
                </span>
              </li>
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button size="sm" onClick={() => save(false, false)}>
              {t.onlyNecessary}
            </Button>
            <Button size="sm" variant="outline" onClick={() => save(true, true)}>
              {t.acceptAll}
            </Button>
            <button
              type="button"
              onClick={() => setDetail((v) => !v)}
              className="min-h-11 px-2 font-sans text-[0.85rem] text-muted underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
            >
              {detail ? t.lessOptions : t.preferences}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
