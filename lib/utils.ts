import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combineert Tailwind-klassen en laat de laatste winnen bij conflicten. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "Vlissingen" -> "vlissingen" (voor filterwaarden en ankers). */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const NL_MONTHS = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];

/** 2026-03-04 -> "4 maart 2026" */
export function formatDateNl(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return `${d.getDate()} ${NL_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** Korte referentie zoals PH-8F3K2A, gebruikt in bevestigingsmails. */
export function createReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `PH-${out}`;
}
