"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconPhone, IconWhatsapp } from "@/components/icons";
import { site, telUrl, whatsappUrl } from "@/lib/site";
import { localeFromPath, stripLocale } from "@/lib/i18n/config";
import { fill, getCommon } from "@/lib/i18n";

/**
 * Op mobiel altijd bereikbaar: bellen en WhatsApp als zwevende balk onderaan.
 * Verschijnt pas na de eerste schermhoogte, zodat de hero ongestoord blijft,
 * en verdwijnt op /admin en tijdens het offerteformulier (daar zit al een CTA).
 */
export function MobileCallBar() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname) ?? "nl";
  const t = getCommon(locale);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const path = stripLocale(pathname);
  if (path.startsWith("/admin") || path === "/offerte") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/15 bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <a
          href={telUrl}
          data-event="call-mobile-bar"
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-[2px] border border-ink/20 bg-white/70 font-sans text-[0.9375rem] font-medium text-ink transition-colors duration-150 active:bg-paper-dim"
          tabIndex={visible ? 0 : -1}
        >
          <IconPhone size={18} />
          {t.actions.callDirect}
        </a>
        <a
          href={whatsappUrl(fill(t.cta.whatsappMessage, { name: site.name }))}
          target="_blank"
          rel="noopener noreferrer"
          data-event="whatsapp-mobile-bar"
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-[2px] bg-ink font-sans text-[0.9375rem] font-medium text-paper transition-colors duration-150 active:bg-ink-soft"
          tabIndex={visible ? 0 : -1}
        >
          <IconWhatsapp size={18} />
          {t.actions.whatsapp}
        </a>
      </div>
    </div>
  );
}
