import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { site } from "@/lib/site";
import { alternateLanguages, localePath, locales } from "@/lib/i18n/config";

/**
 * Sitemap: elke pagina in elke taal, met hreflang-alternatieven zodat Google
 * de drie versies als hetzelfde onderwerp ziet in plaats van als duplicaten.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");

  type Route = {
    path: string;
    changeFrequency: "weekly" | "monthly" | "yearly";
    priority: number;
  };

  const staticRoutes: Route[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/diensten", changeFrequency: "monthly", priority: 0.9 },
    { path: "/projecten", changeFrequency: "weekly", priority: 0.9 },
    { path: "/over-ons", changeFrequency: "yearly", priority: 0.7 },
    { path: "/werkgebied", changeFrequency: "yearly", priority: 0.7 },
    { path: "/reviews", changeFrequency: "monthly", priority: 0.6 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { path: "/offerte", changeFrequency: "monthly", priority: 0.9 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/privacyverklaring", changeFrequency: "yearly", priority: 0.2 },
    { path: "/algemene-voorwaarden", changeFrequency: "yearly", priority: 0.2 },
    { path: "/cookieverklaring", changeFrequency: "yearly", priority: 0.2 },
  ];

  /** Eén entry per taal, elk met dezelfde hreflang-set. */
  const entriesFor = (
    path: string,
    changeFrequency: Route["changeFrequency"],
    priority: number,
    lastModified?: Date,
  ): MetadataRoute.Sitemap => {
    const languages = alternateLanguages(path);
    return locales.map((locale) => ({
      url: `${base}${localePath(locale, path)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  };

  const staticEntries = staticRoutes.flatMap((route) =>
    entriesFor(route.path, route.changeFrequency, route.priority),
  );

  try {
    const [services, projects, posts] = await Promise.all([
      prisma.service.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.project.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    ]);

    return [
      ...staticEntries,
      ...services.flatMap((s) =>
        entriesFor(`/diensten/${s.slug}`, "monthly", 0.8, s.updatedAt),
      ),
      ...projects.flatMap((p) =>
        entriesFor(`/projecten/${p.slug}`, "yearly", 0.6, p.updatedAt),
      ),
      ...posts.flatMap((p) => entriesFor(`/blog/${p.slug}`, "yearly", 0.5, p.updatedAt)),
    ];
  } catch {
    // Zonder database (bijv. tijdens een build zonder DB) nog steeds een geldige sitemap
    return staticEntries;
  }
}
