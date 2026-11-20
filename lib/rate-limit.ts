import { createHash } from "node:crypto";
import { prisma } from "@/lib/db";

/** Hash IP's zodat we ze niet onversleuteld hoeven te bewaren (AVG). */
export function hashIp(ip: string) {
  const salt = process.env.AUTH_SECRET ?? "perfecthous";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

/** Haalt het client-IP uit de headers van een request. */
export function clientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "onbekend";
}

/**
 * Eenvoudige rate limiter op de database (werkt op Vercel zonder extra dienst).
 * Per sleutel in een tijdvenster; bij overschrijding gooien we een fout die de
 * actie netjes teruggeeft aan de gebruiker.
 */
export async function rateLimit(key: string, limit: number, windowMs: number) {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + windowMs);

  try {
    const row = await prisma.rateLimit.findUnique({ where: { key } });
    if (!row || row.expiresAt < now) {
      await prisma.rateLimit.upsert({
        where: { key },
        update: { count: 1, expiresAt },
        create: { key, count: 1, expiresAt },
      });
      return { ok: true as const };
    }
    if (row.count >= limit) {
      return { ok: false as const, retryAfter: Math.ceil((row.expiresAt.getTime() - now.getTime()) / 1000) };
    }
    await prisma.rateLimit.update({ where: { key }, data: { count: { increment: 1 } } });
    return { ok: true as const };
  } catch {
    // Als de limiter zelf faalt, mag het formulier niet stukgaan.
    return { ok: true as const };
  }
}

/** Ruim verlopen rijen op; wordt af en toe aangeroepen, kost bijna niets. */
export async function cleanupRateLimits() {
  try {
    await prisma.rateLimit.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  } catch {
    /* stil falen */
  }
}
