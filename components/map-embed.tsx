"use client";

import { useState } from "react";
import { IconPin } from "@/components/icons";

/**
 * Kaart die pas laadt na een klik. Google Maps plaatst bij het laden cookies;
 * door hem standaard niet te laden blijven we AVG-proof zonder de bezoeker
 * iets af te pakken.
 */
export function MapEmbed({
  query,
  title,
  address,
  labels,
}: {
  query: string;
  title: string;
  address: string;
  labels: { load: string; cookieNote: string };
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={title}
        src={`https://maps.google.com/maps?q=${query}&z=15&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  }

  return (
    <div className="absolute inset-0 grid place-items-center bg-paper-dim px-6">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e2ddd3 1px, transparent 1px), linear-gradient(to bottom, #e2ddd3 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative max-w-sm text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full border border-ink/15 bg-paper">
          <IconPin size={22} className="text-brass-ink" />
        </span>
        <p className="mt-4 font-display text-[1.2rem] leading-snug">{address}</p>
        <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted">{labels.cookieNote}</p>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[2px] border border-ink bg-ink px-5 font-sans text-[0.85rem] font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          {labels.load}
        </button>
      </div>
    </div>
  );
}
