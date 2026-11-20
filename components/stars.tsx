import { IconStar } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Vijfsterrenrij. `rating` bepaalt hoeveel er gevuld zijn; `label` is de
 * voorleesbare tekst en volgt de taal van de pagina.
 */
export function Stars({
  rating = 5,
  size = 15,
  className,
  label,
}: {
  rating?: number;
  size?: number;
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5 text-brass", className)}
      role="img"
      aria-label={label ?? `${rating} van 5 sterren`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar
          key={i}
          size={size}
          className={i < rating ? "text-brass" : "text-ink/15"}
        />
      ))}
    </span>
  );
}
