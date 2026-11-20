import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "brass" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // Antraciet op papier: de standaard actie
  primary:
    "bg-ink text-paper border-ink hover:bg-ink-soft hover:border-ink-soft shadow-[0_1px_0_rgb(255_255_255/0.08)_inset]",
  // Haarscherpe outline: tweede actie, nooit even zwaar als primary
  outline:
    "bg-transparent text-ink border-ink/25 hover:border-ink hover:bg-ink/[0.04]",
  ghost: "bg-transparent text-ink border-transparent hover:bg-ink/[0.05]",
  // Messing: alleen voor de echt commerciële CTA (offerte)
  brass:
    "bg-brass text-ink border-brass hover:bg-brass-soft hover:border-brass-soft",
  // Op donkere vlakken
  light: "bg-paper text-ink border-paper hover:bg-white hover:border-white",
};

const sizes: Record<Size, string> = {
  // 44px minimum raakvlak op mobiel
  sm: "min-h-11 px-5 text-[0.875rem]",
  md: "min-h-[52px] px-7 text-[0.9375rem]",
  lg: "min-h-[58px] px-8 text-base",
};

const shared =
  "inline-flex items-center justify-center gap-2.5 rounded-[2px] border font-sans font-medium tracking-[0.005em] " +
  // `scale` en `translate` staan expliciet in de transition: anders springt de
  // knop terug in plaats van terug te veren als de muis halverwege loslaat.
  "transition-[background-color,border-color,color,scale,translate] duration-200 ease-smooth " +
  // Stap op hover (1px), druk op klik.
  "hover:-translate-y-px active:scale-[0.96] disabled:pointer-events-none disabled:opacity-55";

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function buttonClasses({ variant = "primary", size = "md", className }: Omit<ButtonBaseProps, "children">) {
  return cn(shared, variants[variant], sizes[size], className);
}

/** Knop als Next.js-link, voor interne navigatie. */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonBaseProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </Link>
  );
}

/** Knop als <a>, voor telefoon, WhatsApp en externe links. */
export function ButtonAnchor({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonBaseProps & ComponentProps<"a">) {
  return (
    <a href={href} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </a>
  );
}

/** Echte submit-knop; toont een spinner-achtige staat via `pending`. */
export function Button({
  variant,
  size,
  className,
  children,
  pending,
  ...rest
}: ButtonBaseProps & ComponentProps<"button"> & { pending?: boolean }) {
  return (
    <button className={buttonClasses({ variant, size, className })} aria-busy={pending || undefined} {...rest}>
      {pending ? (
        <>
          <span
            aria-hidden
            className="size-4 animate-spin rounded-full border-[1.5px] border-current border-t-transparent"
          />
          <span>Versturen…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
