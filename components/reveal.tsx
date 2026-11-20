"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal die het zonder JavaScript ook doet.
 *
 * Waarom niet framer-motion: die zet `opacity: 0` als beginstand in de HTML.
 * Laadt de JS-bundel niet (trage verbinding, oude browser, geblokkeerd script),
 * dan blijven die blokken onzichtbaar en lijkt de pagina leeg. Hier is de
 * standaardtoestand zichtbaar; pas als de observer daadwerkelijk loopt, zetten
 * we het element terug en laten we het infaden. Zonder JS of met
 * `prefers-reduced-motion` verandert er dus niets.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [hidden, setHidden] = useState(false);

  // useLayoutEffect: verbergen vóór de eerste paint, anders flitst de inhoud.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (!inView) setHidden(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hidden) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHidden(false);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "-40px 0px" },
    );
    observer.observe(el);

    // Vangnet: als de observer om wat voor reden dan ook niet afgaat, tonen we
    // het blok na twee seconden alsnog. Nooit content achter een animatie
    // verstoppen.
    const failsafe = window.setTimeout(() => setHidden(false), 2000);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [hidden]);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden ? "translate-y-3.5 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
      style={hidden ? undefined : { transitionDelay: delay ? `${delay}s` : undefined }}
    >
      {children}
    </Tag>
  );
}
