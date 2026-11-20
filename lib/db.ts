import { PrismaClient } from "@prisma/client";

/**
 * In development maakt Next.js bij elke hot-reload een nieuwe module-instantie.
 * Zonder cache zou dat de database-verbindingen laten lekken, dus bewaren we
 * de client op `globalThis`.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/** Splitst een veld met één waarde per regel in een schone array. */
export const lines = (value: string | null | undefined): string[] =>
  (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
