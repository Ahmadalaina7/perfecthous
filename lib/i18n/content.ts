import type { Prisma } from "@prisma/client";
import type { Locale } from "./config";

/**
 * Vertalingen van database-content. Nederlands staat in de gewone kolommen;
 * Engels en Arabisch in het `translations`-jsonveld:
 *
 *   { "en": { "title": "...", ... }, "ar": { ... } }
 *
 * Ontbreekt een veld of een hele taal, dan valt de site terug op het
 * Nederlands. Zo blijft de site werken als de eigenaar een dienst toevoegt
 * zonder vertaling.
 */

type Bag = Record<string, unknown>;

const bagOf = (translations: Prisma.JsonValue | null | undefined, locale: Locale): Bag => {
  if (locale === "nl" || !translations) return {};
  if (typeof translations !== "object" || Array.isArray(translations)) return {};
  const entry = (translations as Bag)[locale];
  return entry && typeof entry === "object" && !Array.isArray(entry) ? (entry as Bag) : {};
};

const text = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim().length > 0 ? value : fallback;

const lines = (value: unknown, fallback: string) => {
  if (Array.isArray(value)) {
    const items = value.filter((v): v is string => typeof v === "string" && v.trim().length > 0);
    if (items.length > 0) return items.join("\n");
  }
  return fallback;
};

const optionalText = (value: unknown, fallback: string | null) =>
  typeof value === "string" && value.trim().length > 0 ? value : fallback;

type LocalizableService = {
  translations: Prisma.JsonValue | null;
  title: string;
  excerpt: string;
  intro: string;
  bullets: string;
  seoTitle: string | null;
  seoDesc: string | null;
  /** Alleen aanwezig als de query de faqs-relatie meelaadt. */
  faqs?: { question: string; answer: string }[];
};

type LocalizedFaq = { question: string; answer: string };

/** Dienst met titel, tekst, bullets, SEO en FAQ's in de gekozen taal. */
export function localizeService<T extends LocalizableService>(
  service: T,
  locale: Locale,
): T & { faqs: LocalizedFaq[] } {
  const t = bagOf(service.translations, locale);
  if (Object.keys(t).length === 0) return { ...service, faqs: service.faqs ?? [] };

  const translatedFaqs = Array.isArray(t.faqs)
    ? (t.faqs as { question?: unknown; answer?: unknown }[])
    : [];

  const faqs = (service.faqs ?? []).map((faq, i) => ({
    ...faq,
    question: text(translatedFaqs[i]?.question, faq.question),
    answer: text(translatedFaqs[i]?.answer, faq.answer),
  }));

  return {
    ...service,
    title: text(t.title, service.title),
    excerpt: text(t.excerpt, service.excerpt),
    intro: text(t.intro, service.intro),
    bullets: lines(t.bullets, service.bullets),
    seoTitle: optionalText(t.seoTitle, service.seoTitle),
    seoDesc: optionalText(t.seoDesc, service.seoDesc),
    faqs,
  };
}

type LocalizableProject = {
  translations: Prisma.JsonValue | null;
  title: string;
  category: string;
  summary: string;
  description: string;
};

export function localizeProject<T extends LocalizableProject>(project: T, locale: Locale): T {
  const t = bagOf(project.translations, locale);
  if (Object.keys(t).length === 0) return project;
  return {
    ...project,
    title: text(t.title, project.title),
    category: text(t.category, project.category),
    summary: text(t.summary, project.summary),
    description: text(t.description, project.description),
  };
}

type LocalizableReview = {
  translations: Prisma.JsonValue | null;
  body: string;
  service: string | null;
};

export function localizeReview<T extends LocalizableReview>(review: T, locale: Locale): T {
  const t = bagOf(review.translations, locale);
  if (Object.keys(t).length === 0) return review;
  return {
    ...review,
    body: text(t.body, review.body),
    service: optionalText(t.service, review.service),
  };
}

type LocalizablePost = {
  translations: Prisma.JsonValue | null;
  title: string;
  excerpt: string;
  content: string;
  category: string;
};

export function localizePost<T extends LocalizablePost>(post: T, locale: Locale): T {
  const t = bagOf(post.translations, locale);
  if (Object.keys(t).length === 0) return post;
  return {
    ...post,
    title: text(t.title, post.title),
    excerpt: text(t.excerpt, post.excerpt),
    content: text(t.content, post.content),
    category: text(t.category, post.category),
  };
}

/** Heeft dit record een vertaling voor deze taal? */
export function hasTranslation(
  translations: Prisma.JsonValue | null | undefined,
  locale: Locale,
): boolean {
  if (locale === "nl") return true;
  return Object.keys(bagOf(translations, locale)).length > 0;
}
