"use client";

import { useState } from "react";
import Image from "next/image";
import { IconArrow } from "@/components/icons";

/**
 * Voor/na-slider. Werkt met een echte range-input over de foto heen, zodat
 * hij ook met toetsenbord en op touch te bedienen is. De "na"-foto ligt
 * eronder en wordt onthuld door de bovenste laag te clippen.
 */
export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  labels,
  aspect = "16/10",
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  labels?: { before: string; after: string; slider: string; hint: string };
  aspect?: string;
}) {
  const [value, setValue] = useState(50);
  const l = labels ?? {
    before: "Voor",
    after: "Na",
    slider: "Vergelijk voor en na",
    hint: "Sleep of gebruik de pijltjestoetsen om de voor- en nafoto te vergelijken.",
  };

  return (
    <figure className="group relative overflow-hidden bg-paper-dim select-none" style={{ aspectRatio: aspect }}>
      {/* Na-foto: de basis */}
      <Image src={after} alt={afterAlt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
      {/* Voor-foto: geclipt op de sliderwaarde */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <Image src={before} alt={beforeAlt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 bg-ink/80 px-2.5 py-1 font-sans text-[0.65rem] font-semibold tracking-[0.16em] text-paper uppercase rtl:right-3 rtl:left-auto">
        {l.before}
      </span>
      <span className="absolute top-3 right-3 bg-paper/90 px-2.5 py-1 font-sans text-[0.65rem] font-semibold tracking-[0.16em] text-ink uppercase rtl:left-3 rtl:right-auto">
        {l.after}
      </span>

      {/* Scheidslijn + handvat */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${value}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-paper shadow-[0_0_12px_rgb(0_0_0/0.35)]" />
        <div className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink/15 bg-paper text-ink shadow-lg">
          <IconArrow size={18} className="-scale-x-100" />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={l.slider}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <figcaption className="sr-only">{l.hint}</figcaption>
    </figure>
  );
}
