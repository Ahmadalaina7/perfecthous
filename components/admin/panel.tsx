"use client";

import { useState } from "react";
import { IconClose } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Inklapbaar formulierpaneel voor het beheer. Eén component voor alle CRUD-
 * formulieren, zodat de opmaak consistent blijft en de lijsten compact.
 */
export function Panel({
  title,
  openLabel,
  children,
  defaultOpen = false,
  tone = "light",
}: {
  title: string;
  openLabel: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  tone?: "light" | "muted";
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn("border", tone === "muted" ? "border-ink/10 bg-paper-dim" : "border-paper-line bg-paper")}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-12 w-full items-center justify-between gap-3 px-5 py-3 text-left"
      >
        <span className="font-sans text-[0.88rem] font-medium">{title}</span>
        <span className="inline-flex items-center gap-1.5 font-sans text-[0.76rem] text-muted">
          {open ? (
            <>
              <IconClose size={14} /> Sluiten
            </>
          ) : (
            openLabel
          )}
        </span>
      </button>
      {open && <div className="border-t border-paper-line/70 px-5 py-5">{children}</div>}
    </div>
  );
}

/** Velden binnen een beheerformulier, met label boven het veld. */
export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block font-sans text-[0.76rem] font-medium text-ink">{label}</label>
      {children}
      {hint && <p className="mt-1 text-[0.72rem] leading-snug text-muted">{hint}</p>}
    </div>
  );
}

export const adminInput =
  "w-full min-h-10 rounded-[2px] border border-ink/20 bg-white px-3 py-2 font-sans text-[0.875rem] focus:border-ink focus:outline-none";

export const adminTextarea =
  "w-full rounded-[2px] border border-ink/20 bg-white px-3 py-2 font-sans text-[0.875rem] leading-relaxed focus:border-ink focus:outline-none";

export function Submit({ children, variant = "dark" }: { children: React.ReactNode; variant?: "dark" | "light" }) {
  return (
    <button
      type="submit"
      className={cn(
        "min-h-10 rounded-[2px] px-5 font-sans text-[0.82rem] font-medium transition-colors",
        variant === "dark"
          ? "bg-ink text-paper hover:bg-ink-soft"
          : "border border-ink/20 text-ink hover:border-ink/45",
      )}
    >
      {children}
    </button>
  );
}
