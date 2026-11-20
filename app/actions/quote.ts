"use server";

import { prisma } from "@/lib/db";
import { quoteSchemaFor, fieldErrors } from "@/lib/validation";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { pagesCopy } from "@/lib/i18n/dict/pages";
import { hashIp, clientIp, rateLimit, cleanupRateLimits } from "@/lib/rate-limit";
import { saveUploads } from "@/lib/uploads";
import { ownerQuoteMail, customerQuoteMail } from "@/lib/mail";
import { createReference } from "@/lib/utils";
import { headers } from "next/headers";

export type QuoteState =
  | { status: "idle" }
  | { status: "error"; message?: string; fields?: Record<string, string> }
  | { status: "success"; reference: string };

/** Controleert een Turnstile-token als de widget is geconfigureerd. */
async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return true; // niet geconfigureerd: honeypot + rate limit is de rem
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

/**
 * Offerteaanvraag. Volgorde is bewust: eerst goedkope spamchecks en validatie,
 * dan foto's opslaan, dan pas de database — zo blijft er geen rommel achter.
 */
export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const h = await headers();
  const ip = clientIp(h);
  const ipHash = hashIp(ip);

  const rawLocale = String(formData.get("locale") ?? "");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const m = pagesCopy[locale].validation;

  const limit = await rateLimit(`quote:${ipHash}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return { status: "error", message: m.rateLimitQuote };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = quoteSchemaFor(locale).safeParse(raw);

  if (!parsed.success) {
    // Honeypot ingevuld? Doe alsof het gelukt is, maar sla niets op.
    if (String(raw.website ?? "").length > 0) {
      return { status: "success", reference: createReference() };
    }
    return { status: "error", fields: fieldErrors(parsed.error) };
  }

  const data = parsed.data;
  const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstileOk) {
    return { status: "error", message: m.captcha };
  }

  const files = formData.getAll("photos").filter((f): f is File => f instanceof File);
  const upload = await saveUploads(files);
  if (upload.error) return { status: "error", message: upload.error };

  const service = data.serviceSlug
    ? await prisma.service.findUnique({ where: { slug: data.serviceSlug }, select: { title: true } })
    : null;

  const reference = createReference();

  try {
    await prisma.quoteRequest.create({
      data: {
        reference,
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city || null,
        serviceSlug: data.serviceSlug || null,
        serviceName: service?.title ?? null,
        description: data.description,
        startDate: data.startDate || null,
        budget: data.budget || null,
        contactPref: data.contactPref,
        photos: upload.saved.join("\n"),
        ipHash,
        userAgent: h.get("user-agent")?.slice(0, 400) ?? null,
      },
    });
  } catch (error) {
    console.error("Offerte opslaan mislukt:", error);
    return { status: "error", message: m.save };
  }

  const mailData = {
    reference,
    name: data.name,
    email: data.email,
    phone: data.phone,
    city: data.city || null,
    serviceName: service?.title ?? null,
    description: data.description,
    startDate: data.startDate || null,
    budget: data.budget || null,
    contactPref: data.contactPref,
    photos: upload.saved,
    locale,
  };

  // Mails mogen de aanvraag nooit blokkeren: de data staat al veilig in de DB.
  await Promise.allSettled([ownerQuoteMail(mailData), customerQuoteMail(mailData, locale)]);
  void cleanupRateLimits();

  return { status: "success", reference };
}
