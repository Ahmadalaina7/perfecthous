"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IconChevron } from "@/components/icons";
import { cn } from "@/lib/utils";

export type FaqItem = { question: string; answer: string };

/**
 * Accordeon met één open item tegelijk. Gebruikt echte <button>-koppen met
 * aria-expanded/aria-controls, dus volledig toetsenbordbedienbaar.
 */
export function FaqAccordion({
  items,
  className,
  defaultOpen = 0,
}: {
  items: FaqItem[];
  className?: string;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const reduce = useReducedMotion();

  return (
    <div className={cn("divide-y divide-paper-line border-y border-paper-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.question}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-5 py-5 text-left sm:py-6"
              >
                <span className="font-display text-[1.0625rem] leading-snug text-ink sm:text-[1.1875rem]">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "rotate-180 border-ink bg-ink text-paper" : "border-ink/20 text-ink",
                  )}
                >
                  <IconChevron size={16} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={
                    reduce
                      ? { opacity: 0, transition: { duration: 0.15 } }
                      : { height: 0, opacity: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }
                  }
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[62ch] pr-10 pb-6 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
