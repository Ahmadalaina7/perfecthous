import { cn } from "@/lib/utils";

/**
 * Beeldmerk, overgetekend van het aangeleverde logo. De viewBox is het gemeten
 * kader van het origineel (231 × 220), zodat alle maten hieronder letterlijk de
 * gemeten pixels zijn: geen omrekenen, geen oogwerk.
 *
 * Opbouw:
 *
 * - Dak: een band van 18 dik met twee schuine randen van 36° die in een scherpe
 *   nok samenkomen. De einden zijn geen rechte afsnijdingen maar lopen toe: de
 *   bovenrand loopt door tot de punt, de onderrand stopt 20 eenheden eerder en
 *   gaat vandaar schuin omhoog naar die punt. Daardoor krijgt elk einde de
 *   puntige "beek" van het origineel.
 * - Schoorsteen: een korte rechtopstaande balk die in het dak verdwijnt, recht
 *   boven de rechterstijl van de H. Zijn bovenkant ligt 15 eenheden onder de
 *   nok, dus hij komt maar een stukje boven het dak uit.
 * - P: stijl met een scherpe hoek linksboven, een bovenbalk die met een ruime
 *   bocht naar de gedeelde middenstijl loopt (buitenradius 35,5 vanaf x = 91,
 *   binnenhoek 16,5). Die ruime bocht is wat de kom van het origineel zijn
 *   volle, ronde schouder geeft; een krappere bocht maakt hem te vierkant.
 * - H: de rechterstijl van de P is meteen de linkerstijl van de H en loopt
 *   bovenin over in die bocht, dus er steekt geen blokje boven de schouder uit.
 *   De rechterstijl van de H loopt wel tot de kapitaalhoogte, waardoor de H
 *   even hoog is als de P (het detail dat op het origineel opvalt).
 * - De onderkant van de P-kom en de dwarsbalk van de H zijn één doorlopende
 *   lijn, iets onder het midden van de letters; die balk begint bij de
 *   binnenkant van de P-stijl, niet bij de buitenkant.
 *
 * De letters zijn gevulde vlakken op de gemeten maten: de verticale stijlen
 * zijn 21,5 breed, de horizontale balken 18 — dat verschil zit echt in het
 * origineel (dwars over een stijl zie je de volle breedte, dwars over een balk
 * een smallere band). Tekenen met één lijndikte zou de balken te zwaar maken.
 * De dunne donkere naadjes in het aangeleverde beeld zijn bevelschaduw van de
 * 3D-mockup; hier is alles vlak en verbonden getekend.
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
      height={(size * 220) / 231}
      viewBox="0 0 231 220"
      fill="none"
      aria-hidden
      focusable="false"
      className={cn("shrink-0", className)}
    >
      {/* schoorsteen, recht boven de rechterstijl van de H; de voet verdwijnt in het dak */}
      <path d="M175 15h18v47h-18z" fill={line} />
      {/* dak: 36°, scherpe nok, einden lopend naar een punt. Elk einde heeft
          eerst een kort recht facet (0 → 3,5) en loopt daarna met een zwakke
          helling naar de onderrand — zo puntig is het in het origineel. */}
      <path
        d="M0 83V86.5L16 91L114.5 22.2L214 91L230 86.5V83L114.5 0Z"
        fill={line}
      />
      {/* P met de gedeelde middenstijl: buitenom van de kapitaalhoogte langs de
          bocht naar de basis, met een uitsparing tussen de stijl en die
          middenstijl. De kom is een gat (evenodd). */}
      <path
        fillRule="evenodd"
        fill={line}
        d="M34.5 91H91A35.5 35.5 0 0 1 126.5 126.5V218.5H105V165.5H56V218.5H34.5Z M56 109H88.5A16.5 16.5 0 0 1 105 125.5V147.5H56Z"
      />
      {/* dwarsbalk: onderkant van de P-kom én dwarsbalk van de H in één lijn.
          Hij begint bij de binnenkant van de P-stijl, niet bij de buitenkant:
          in het origineel blijft de stijl daar een doorlopende verticale lijn. */}
      <path d="M64.5 147.5H196.5V165.5H64.5Z" fill={line} />
      {/* H: rechterstijl, tot dezelfde kapitaalhoogte als de P */}
      <path d="M175 91H196.5V218.5H175Z" fill={line} />
    </svg>
  );
}

/**
 * Volledig logo: beeldmerk + woordmerk in kapitalen, zoals op het aangeleverde
 * logo. Het woordmerk is echte tekst (geen pad), dus het blijft scherp, staat in
 * de toegankelijke naam en kan per taal verschillen.
 */
export function Logo({
  tone = "ink",
  className,
  markSize = 38,
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
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} size={markSize} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-brand text-[0.75rem] font-semibold tracking-[0.02em] uppercase",
            tone === "paper" ? "text-paper" : "text-ink",
          )}
        >
          Perfecte Huis
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
