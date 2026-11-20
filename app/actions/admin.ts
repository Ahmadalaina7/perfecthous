"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";

/**
 * Server actions voor het beheerpaneel. Elke actie begint met requireAdmin()
 * — nooit vertrouwen op de UI alleen, want actions zijn los aanroepbaar.
 */

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const bool = (fd: FormData, key: string) => fd.get(key) === "on" || fd.get(key) === "true";
const num = (fd: FormData, key: string) => {
  const v = Number(str(fd, key));
  return Number.isFinite(v) ? v : 0;
};

/* ---------- Status wijzigen ---------- */

export async function updateQuoteStatus(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const status = str(fd, "status");
  if (!id || !["new", "in_progress", "done", "spam"].includes(status)) return;
  await prisma.quoteRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/aanvragen");
  revalidatePath("/admin");
}

export async function updateQuoteNotes(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  if (!id) return;
  await prisma.quoteRequest.update({ where: { id }, data: { notes: str(fd, "notes") || null } });
  revalidatePath("/admin/aanvragen");
}

export async function deleteQuote(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  if (!id) return;
  await prisma.quoteRequest.delete({ where: { id } });
  revalidatePath("/admin/aanvragen");
  revalidatePath("/admin");
}

export async function updateContactStatus(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const status = str(fd, "status");
  if (!id || !["new", "in_progress", "done", "spam"].includes(status)) return;
  await prisma.contactMessage.update({ where: { id }, data: { status } });
  revalidatePath("/admin/berichten");
  revalidatePath("/admin");
}

export async function deleteContact(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  if (!id) return;
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/berichten");
}

/* ---------- Projecten ---------- */

export async function saveProject(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const title = str(fd, "title");
  if (!title) return;

  const data = {
    title,
    slug: str(fd, "slug") || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    category: str(fd, "category") || "Overig",
    location: str(fd, "location") || "Vlissingen",
    year: num(fd, "year") || null,
    summary: str(fd, "summary"),
    description: str(fd, "description"),
    coverImage: str(fd, "coverImage") || "/images/perfecthous-tvwand.jpg",
    gallery: str(fd, "gallery"),
    beforeImage: str(fd, "beforeImage") || null,
    afterImage: str(fd, "afterImage") || null,
    featured: bool(fd, "featured"),
    published: bool(fd, "published"),
    order: num(fd, "order"),
  };

  if (id) {
    await prisma.project.update({ where: { id }, data });
  } else {
    await prisma.project.create({ data });
  }
  revalidatePath("/admin/projecten");
  revalidatePath("/projecten");
  revalidatePath(`/projecten/${data.slug}`);
}

export async function deleteProject(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  if (!id) return;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projecten");
  revalidatePath("/projecten");
}

/* ---------- Reviews ---------- */

export async function saveReview(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const author = str(fd, "author");
  if (!author) return;
  const data = {
    author,
    city: str(fd, "city") || "Vlissingen",
    rating: Math.min(5, Math.max(1, num(fd, "rating") || 5)),
    body: str(fd, "body"),
    service: str(fd, "service") || null,
    published: bool(fd, "published"),
    order: num(fd, "order"),
  };
  if (id) await prisma.review.update({ where: { id }, data });
  else await prisma.review.create({ data });
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}

export async function deleteReview(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  if (!id) return;
  await prisma.review.delete({ where: { id } });
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}

/* ---------- Blog ---------- */

export async function savePost(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const title = str(fd, "title");
  if (!title) return;
  const published = bool(fd, "published");
  const data = {
    title,
    slug: str(fd, "slug") || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    excerpt: str(fd, "excerpt"),
    content: String(fd.get("content") ?? ""),
    category: str(fd, "category") || "Tips",
    coverImage: str(fd, "coverImage") || null,
    published,
    publishedAt: published ? new Date() : null,
  };
  if (id) {
    const existing = await prisma.post.findUnique({ where: { id }, select: { publishedAt: true } });
    await prisma.post.update({
      where: { id },
      data: { ...data, publishedAt: published ? (existing?.publishedAt ?? new Date()) : null },
    });
  } else {
    await prisma.post.create({ data });
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
}

export async function deletePost(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  if (!id) return;
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
