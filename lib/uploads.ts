import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Foto-opslag. Lokaal schrijven we naar /public/uploads; in productie op
 * Vercel (waar het bestandssysteem vluchtig is) moet dit naar object storage
 * wijzen — zie README. Bestandsnaam is een UUID, originele naam wordt niet
 * vertrouwd.
 */

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB per foto
const MAX_FILES = 6;

export type UploadResult = { saved: string[]; error?: string };

const extFrom = (name: string, type: string) => {
  const ext = path.extname(name).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"].includes(ext)) return ext === ".jpeg" ? ".jpg" : ext;
  if (type === "image/png") return ".png";
  if (type === "image/webp") return ".webp";
  if (type === "image/heic" || type === "image/heif") return ".heic";
  return ".jpg";
};

export async function saveUploads(files: File[]): Promise<UploadResult> {
  const chosen = files.filter((f) => f && f.size > 0);
  if (chosen.length === 0) return { saved: [] };
  if (chosen.length > MAX_FILES) return { saved: [], error: `Maximaal ${MAX_FILES} foto's per aanvraag.` };

  for (const file of chosen) {
    if (!ALLOWED.has(file.type)) {
      return { saved: [], error: "Alleen foto's (JPG, PNG, WebP of HEIC) zijn toegestaan." };
    }
    if (file.size > MAX_BYTES) {
      return { saved: [], error: "Elke foto mag maximaal 8 MB zijn." };
    }
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });

  const saved: string[] = [];
  for (const file of chosen) {
    const name = `${randomUUID()}${extFrom(file.name, file.type)}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, name), buffer);
    saved.push(`/uploads/${name}`);
  }
  return { saved };
}
