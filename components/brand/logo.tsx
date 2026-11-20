import { cn } from "@/lib/utils";

/**
 * Beeldmerk: een huis waarvan de wanden uit de letters P en H bestaan, in één
 * messing lijn getekend. Het dak loopt iets over de letters heen, zodat de
 * vorm op 24px nog als huis leest en op 96px als monogram — geen verloop,
 * geen schaduw, alleen lijnen.
 */
export function LogoMark({
  className,
  tone = "ink",
  size = 40,
}: {
  className?: string;
  tone?: "ink" | "paper";
  size?: number;
}) {
  // Messing, maar op papier een tint donkerder: b8924a haalt daar geen
  // leesbaar contrast, 8a6b2f wel.
  const line = tone === "paper" ? "#b8924a" : "#8a6b2f";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      focusable="false"
      className={cn("shrink-0", className)}
    >
      {/* dak, met overstek links en rechts */}
      <path
        d="M4 22 24 6l20 16"
        stroke={line}
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* P: stijl links, kom rechts */}
      <path
        d="M10 19v23M10 19h6a5.75 5.75 0 0 1 0 11.5h-6"
        stroke={line}
        strokeWidth="2.4"
        strokeLinecap="square"
      />
      {/* H: twee stijlen met dwarsbalk */}
      <path
        d="M26.5 19v23M38 19v23M26.5 29.5H38"
        stroke={line}
        strokeWidth="2.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Volledig logo: beeldmerk + woordmerk. */
export function Logo({
  tone = "ink",
  className,
  markSize = 40,
  showTagline = true,
  tagline = "Bouw & installatie",
}: {
  tone?: "ink" | "paper";
  className?: string;
  markSize?: number;
  showTagline?: boolean;
  /** Regel onder het woordmerk; volgt de taal van de pagina. */
  tagline?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark tone={tone} size={markSize} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.375rem] font-medium tracking-[-0.015em]",
            tone === "paper" ? "text-paper" : "text-ink",
          )}
        >
          Perfecthous
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1.5 font-sans text-[0.6rem] font-medium tracking-[0.2em] uppercase",
              tone === "paper" ? "text-paper/55" : "text-muted",
            )}
          >
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
