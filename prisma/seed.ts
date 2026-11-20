import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { services } from "./seed-services";
import { projects, reviews, posts } from "./seed-content";
import { serviceTranslations } from "./seed-translations-services";
import {
  projectTranslations,
  reviewTranslations,
  postTranslations,
} from "./seed-translations-content";

const prisma = new PrismaClient();

/**
 * Seed-data. Alle teksten zijn echte, bruikbare Nederlandse copy.
 * Projecten en reviews zijn voorbeelden: vervang ze door eigen werk voordat
 * de site live gaat (zie README).
 */
async function main() {
  console.log("Seeding…");

  /* ---------- Beheerder ---------- */
  const email = process.env.ADMIN_EMAIL || "beheer@perfecthous.nl";
  const password = process.env.ADMIN_PASSWORD || "WijzigDitWachtwoord123!";
  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Beheerder",
      passwordHash: await bcrypt.hash(password, 12),
      role: "admin",
    },
  });
  console.log(`  beheerder: ${email}`);

  /* ---------- Diensten ---------- */
  for (const [i, s] of services.entries()) {
    const data = {
      title: s.title,
      excerpt: s.excerpt,
      intro: s.intro,
      bullets: s.bullets,
      icon: s.icon,
      image: s.image,
      order: i + 1,
      published: true,
      translations: serviceTranslations[s.slug] ?? undefined,
    };
    const service = await prisma.service.upsert({
      where: { slug: s.slug },
      update: data,
      create: { slug: s.slug, ...data },
    });
    // FAQ's zijn eenvoudig te vervangen: eerst weg, dan opnieuw
    await prisma.serviceFaq.deleteMany({ where: { serviceId: service.id } });
    await prisma.serviceFaq.createMany({
      data: s.faqs.map((f, j) => ({
        serviceId: service.id,
        question: f.question,
        answer: f.answer,
        order: j,
      })),
    });
  }
  console.log(`  ${services.length} diensten`);

  /* ---------- Projecten ---------- */
  for (const p of projects) {
    const service = await prisma.service.findUnique({ where: { slug: p.serviceSlug } });
    const data = {
      title: p.title,
      category: p.category,
      location: p.location,
      year: p.year,
      summary: p.summary,
      description: p.description,
      coverImage: p.coverImage,
      gallery: p.gallery,
      beforeImage: p.beforeImage,
      afterImage: p.afterImage,
      featured: p.featured,
      published: true,
      order: p.order,
      serviceId: service?.id ?? null,
      translations: projectTranslations[p.slug] ?? undefined,
    };
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: data,
      create: { slug: p.slug, ...data },
    });
  }
  // Projecten die niet meer in de seed staan horen niet meer op de site (zoals de
  // oude voorbeeldprojecten met gelicentieerd beeld). Upsert verwijdert ze niet zelf.
  await prisma.project.deleteMany({ where: { slug: { notIn: projects.map((p) => p.slug) } } });
  console.log(`  ${projects.length} projecten`);

  /* ---------- Reviews ---------- */
  for (const [i, r] of reviews.entries()) {
    // Reviews hebben geen natuurlijke sleutel: seed idempotent via auteur
    const existing = await prisma.review.findFirst({ where: { author: r.author } });
    const data = {
      ...r,
      published: true,
      order: i,
      translations: reviewTranslations[r.author] ?? undefined,
    };
    if (existing) {
      await prisma.review.update({ where: { id: existing.id }, data });
    } else {
      await prisma.review.create({ data });
    }
  }
  console.log(`  ${reviews.length} reviews`);

  /* ---------- Blog ---------- */
  const postImages = ["/images/perfecthous-plafond.jpg", "/images/maps-kamer.jpg", "/images/perfecthous-salon.jpg"];
  for (const [i, p] of posts.entries()) {
    const data = {
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      category: p.category,
      coverImage: postImages[i] ?? null,
      published: true,
      publishedAt: new Date(Date.now() - (i + 1) * 12 * 24 * 3600 * 1000),
      translations: postTranslations[p.slug] ?? undefined,
    };
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: data,
      create: { slug: p.slug, ...data },
    });
  }
  console.log(`  ${posts.length} blogberichten`);

  console.log("Klaar.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
