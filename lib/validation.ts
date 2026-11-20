import { z } from "zod";
import { pagesCopy } from "@/lib/i18n/dict/pages";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

/**
 * Zod-schema's per taal. Dezelfde regels voor elke taal, maar de foutmeldingen
 * komen uit het dictaat zodat een bezoeker die in het Engels of Arabisch
 * invult ook in die taal te horen krijgt wat er misgaat.
 */

const messages = (locale: Locale) => pagesCopy[locale].validation;

export function quoteSchemaFor(locale: Locale) {
  const m = messages(locale);

  const name = z.string().trim().min(2, m.nameMin).max(120, m.nameMax);
  const email = z.string().trim().min(1, m.emailEmpty).email(m.emailInvalid);
  const phone = z
    .string()
    .trim()
    .min(6, m.phoneMin)
    .max(24, m.phoneMax)
    .refine((v) => /^[+()\d\s-]{6,24}$/.test(v) && (v.match(/\d/g) ?? []).length >= 6, {
      message: m.phoneInvalid,
    });

  return z.object({
    serviceSlug: z.string().trim().max(80).optional().default(""),
    description: z
      .string()
      .trim()
      .min(20, m.descriptionMin)
      .max(4000, m.descriptionMax),
    startDate: z.string().trim().max(60).optional().default(""),
    budget: z.string().trim().max(60).optional().default(""),
    name,
    email,
    phone,
    city: z.string().trim().max(80).optional().default(""),
    contactPref: z.enum(["telefoon", "email", "whatsapp"]).default("telefoon"),
    /** Honeypot: moet leeg blijven. */
    website: z.string().max(0, m.spam).optional().default(""),
    /** Turnstile-token, alleen aanwezig als de widget is geconfigureerd. */
    turnstileToken: z.string().optional().default(""),
    privacy: z.literal("on", { message: m.privacy }),
  });
}

export function contactSchemaFor(locale: Locale) {
  const m = messages(locale);

  return z.object({
    name: z.string().trim().min(2, m.nameMin).max(120, m.nameMax),
    email: z.string().trim().min(1, m.emailEmpty).email(m.emailInvalid),
    phone: z.string().trim().max(24).optional().default(""),
    subject: z.string().trim().max(120).optional().default(""),
    message: z.string().trim().min(10, m.messageMin).max(3000, m.messageMax),
    website: z.string().max(0).optional().default(""),
    privacy: z.literal("on", { message: m.privacy }),
  });
}

/** Nederlandse variant, voor gebruik buiten een request (tests, scripts). */
export const quoteSchema = quoteSchemaFor(defaultLocale);
export const contactSchema = contactSchemaFor(defaultLocale);

export type QuoteInput = z.infer<ReturnType<typeof quoteSchemaFor>>;
export type ContactInput = z.infer<ReturnType<typeof contactSchemaFor>>;

/** Zet Zod-issues om naar een veld -> melding map voor de UI. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/** Simpele e-mailcontrole voor client-side hints (server valideert opnieuw). */
export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
