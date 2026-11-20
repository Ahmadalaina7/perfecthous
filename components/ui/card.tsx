import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IconArrow } from "@/components/icons";

/** Basiskaart: dunne rand, licht op bij hover (2px) met een zachte schaduw. */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "group relative flex flex-col border border-paper-line bg-paper transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_18px_40px_-28px_rgb(26_29_33/0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Kaart met foto bovenaan; gebruikt op de diensten- en projectoverzichten. */
export function ImageCard({
  href,
  image,
  imageAlt,
  label,
  title,
  text,
  footer,
  cta,
  priority,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
}: {
  href: string;
  image: string;
  imageAlt: string;
  label?: string;
  title: string;
  text?: string;
  footer?: ReactNode;
  /** Label van de standaard "bekijk"-link; verplicht zodra er geen footer is. */
  cta?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-dim">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
        {label && (
          <span className="absolute top-3 left-3 bg-paper/95 px-2.5 py-1 font-sans text-[0.75rem] font-semibold tracking-[0.1em] text-ink uppercase backdrop-blur-sm">
            {label}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="text-[1.25rem] leading-snug">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {title}
          </Link>
        </h3>
        {text && <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{text}</p>}
        <div className="mt-auto flex items-center justify-between pt-5">
          {footer ??
            (cta ? (
              <span className="inline-flex items-center gap-2 font-sans text-[0.8125rem] font-medium tracking-wide text-ink">
                {cta}
                <IconArrow size={16} className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </span>
            ) : null)}
        </div>
      </div>
    </Card>
  );
}
