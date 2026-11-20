import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Horizontale maatvoering: één bron voor de paginamarge op elk scherm. */
export function Container({ className, ...rest }: ComponentProps<"div">) {
  return <div className={cn("container-page", className)} {...rest} />;
}

type SectionProps = ComponentProps<"section"> & {
  tone?: "paper" | "dim" | "ink";
  size?: "sm" | "md" | "lg";
  /** Haarlijn boven de sectie, zoals in een architectuurmagazine */
  rule?: boolean;
};

const tones = {
  paper: "bg-paper text-ink",
  dim: "bg-paper-dim text-ink",
  ink: "bg-ink text-paper",
};

// Verticale ritmiek op de 4-punts schaal (4, 8, 12, 16, 24, 32, 48, 64, 96, 128).
const paddings = {
  sm: "py-16 md:py-20",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
};

export function Section({ tone = "paper", size = "md", rule, className, ...rest }: SectionProps) {
  return (
    <section
      className={cn("relative", tones[tone], paddings[size], rule && "border-t border-paper-line", className)}
      {...rest}
    />
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
  children?: import("react").ReactNode;
};

/** Sectiekop met optioneel label en inleiding — houdt de typografie consistent. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
  children,
}: HeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-5", centered && "eyebrow--plain justify-center", tone === "dark" && "text-brass-soft")}>
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.06]",
          tone === "dark" ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={cn(
            "mt-5 text-[1.0625rem] leading-relaxed md:text-lg",
            tone === "dark" ? "text-paper/70" : "text-muted",
          )}
        >
          {lead}
        </p>
      )}
      {children}
    </div>
  );
}
