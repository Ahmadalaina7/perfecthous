"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { IconArrow } from "@/components/icons";
import { cn } from "@/lib/utils";
import { projectImageAlt } from "@/lib/image-alts";
import { localePath, type Locale } from "@/lib/i18n/config";

export type ProjectCard = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number | null;
  summary: string;
  coverImage: string;
};

/**
 * Filterbaar projectraster. Filteren gebeurt client-side (weinig projecten,
 * dus direct en zonder navigatie). De knoppenrij is een echte radiogroep.
 */
export function ProjectGrid({
  locale,
  projects,
  labels,
}: {
  locale: Locale;
  projects: ProjectCard[];
  labels: { all: string; filterLabel: string; project: string; projects: string };
}) {
  const [active, setActive] = useState(labels.all);
  const reduce = useReducedMotion();

  const categories = useMemo(
    () => [labels.all, ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects, labels.all],
  );

  const visible = active === labels.all ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={labels.filterLabel}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={cn(
              "min-h-11 rounded-[2px] border px-4 font-sans text-[0.82rem] font-medium transition-colors duration-300",
              active === cat
                ? "border-ink bg-ink text-paper"
                : "border-ink/20 text-ink/75 hover:border-ink/45 hover:text-ink",
            )}
          >
            {cat}
            {cat !== labels.all && (
              <span className="ml-2 tabular-nums text-[0.7rem] opacity-60">
                {projects.filter((p) => p.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <p className="mt-4 font-sans text-[0.78rem] tabular-nums text-muted" aria-live="polite">
        {visible.length} {visible.length === 1 ? labels.project : labels.projects}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <motion.article
              key={project.slug}
              layout={!reduce}
              // Geen beginstand met opacity 0: de kaarten staan al in de HTML en
              // moeten ook zichtbaar zijn als JS niet (volledig) laadt. Alleen
              // bij filteren animeren we, via de layout-overgang hieronder.
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col border border-paper-line bg-paper transition-colors hover:border-ink/25"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-paper-dim">
                <Image
                  src={project.coverImage}
                  alt={projectImageAlt(project.coverImage, `${project.title}, ${project.location}`, locale)}
                  fill
                  // De eerste kaart is meestal het grootste beeld boven de vouw.
                  priority={index === 0}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                />
                <span className="absolute top-3 left-3 bg-paper/95 px-2.5 py-1 font-sans text-[0.65rem] font-semibold tracking-[0.14em] text-ink uppercase">
                  {project.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[1.25rem] leading-snug">
                  <Link href={localePath(locale, `/projecten/${project.slug}`)} className="after:absolute after:inset-0 after:content-['']">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{project.summary}</p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="font-sans text-[0.76rem] tracking-wide text-muted">
                    {project.location}
                    {project.year ? ` · ${project.year}` : ""}
                  </span>
                  <IconArrow
                    size={16}
                    className="text-ink transition-transform duration-500 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
