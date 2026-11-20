"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const MAX = 8 * 1024 * 1024;

/**
 * Foto-upload vanuit het beheerpaneel. Schrijft naar /public/uploads en geeft
 * het publieke pad terug. Bestandsnaam is een UUID; de originele naam wordt
 * niet gebruikt (voorkomt path-traversal en rare tekens in URL's).
 */
export async function uploadImage(formData: FormData): Promise<{ path?: string; error?: string }> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Geen bestand ontvangen." };
  if (!ALLOWED.has(file.type)) return { error: "Alleen JPG, PNG, WebP of AVIF." };
  if (file.size > MAX) return { error: "Maximaal 8 MB per foto." };

  const ext =
    file.type === "image/png" ? ".png" : file.type === "image/webp" ? ".webp" : file.type === "image/avif" ? ".avif" : ".jpg";
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const name = `${randomUUID()}${ext}`;
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

  revalidatePath("/admin/projecten");
  return { path: `/uploads/${name}` };
}
