"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { contactSchemaFor, fieldErrors } from "@/lib/validation";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { pagesCopy } from "@/lib/i18n/dict/pages";
import { hashIp, clientIp, rateLimit } from "@/lib/rate-limit";
import { ownerContactMail, customerContactMail } from "@/lib/mail";

export type ContactState =
  | { status: "idle" }
  | { status: "error"; message?: string; fields?: Record<string, string> }
  | { status: "success" };

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const h = await headers();
  const ip = clientIp(h);
  const ipHash = hashIp(ip);

  const rawLocale = String(formData.get("locale") ?? "");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const m = pagesCopy[locale].validation;

  const limit = await rateLimit(`contact:${ipHash}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return { status: "error", message: m.rateLimitContact };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchemaFor(locale).safeParse(raw);
  if (!parsed.success) {
    if (String(raw.website ?? "").length > 0) return { status: "success" };
    return { status: "error", fields: fieldErrors(parsed.error) };
  }

  const data = parsed.data;

  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject || null,
        message: data.message,
        ipHash,
      },
    });
  } catch (error) {
    console.error("Contactbericht opslaan mislukt:", error);
    return { status: "error", message: m.send };
  }

  await Promise.allSettled([
    ownerContactMail({ ...data, locale }),
    customerContactMail({ name: data.name, email: data.email }, locale),
  ]);

  return { status: "success" };
}
