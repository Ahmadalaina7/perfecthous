"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label, Hint, ErrorText, Select } from "@/components/ui/form";
import { IconArrow, IconCheck } from "@/components/icons";
import { localePath, type Locale } from "@/lib/i18n/config";
import { formsCopy } from "@/lib/i18n/dict/forms";

/** Contactformulier. Bij succes vervangen we het formulier door een bevestiging. */
export function ContactForm({ locale }: { locale: Locale }) {
  const t = formsCopy[locale].contact;
  const [state, formAction, pending] = useActionState<ContactState, FormData>(submitContact, { status: "idle" });
  const errors = state.status === "error" ? (state.fields ?? {}) : {};
  const [token, setToken] = useState("");

  if (state.status === "success") {
    return (
      <div role="status" className="border border-paper-line bg-paper-dim p-7 md:p-9">
        <span className="grid size-12 place-items-center rounded-full border border-brass/40 bg-brass/10 text-brass-ink">
          <IconCheck size={22} />
        </span>
        <h2 className="mt-5 text-[1.5rem] leading-tight">{t.success.title}</h2>
        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{t.success.text}</p>
        <Button type="button" variant="outline" size="md" className="mt-6" onClick={() => window.location.reload()}>
          {t.success.again}
        </Button>
      </div>
    );
  }

  const a11y = (name: string) => ({
    id: name,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="locale" value={locale} />

      {state.status === "error" && state.message && (
        <div role="alert" className="border-l-2 border-[#9c3b2b] bg-[#9c3b2b]/[0.06] px-4 py-3 text-[0.875rem] text-[#7d2f22]">
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{t.name}</Label>
          <Input {...a11y("name")} autoComplete="name" placeholder={t.namePlaceholder} />
          <div id="name-error"><ErrorText>{errors.name}</ErrorText></div>
        </div>
        <div>
          <Label htmlFor="email">{t.email}</Label>
          <Input {...a11y("email")} type="email" inputMode="email" autoComplete="email" placeholder={t.emailPlaceholder} />
          <div id="email-error"><ErrorText>{errors.email}</ErrorText></div>
        </div>
        <div>
          <Label htmlFor="phone">{t.phone}</Label>
          <Input {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder={t.phonePlaceholder} />
          <Hint>{t.phoneHint}</Hint>
        </div>
        <div>
          <Label htmlFor="subject">{t.subject}</Label>
          <Select {...a11y("subject")} defaultValue={t.subjects[0]}>
            {t.subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="message">{t.message}</Label>
        <Textarea {...a11y("message")} rows={6} placeholder={t.messagePlaceholder} />
        <div id="message-error"><ErrorText>{errors.message}</ErrorText></div>
      </div>

      <input type="hidden" name="turnstileToken" value={token} />

      <div className="absolute -left-[9999px] h-0" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.85rem] leading-relaxed text-ink/85">
          <input
            type="checkbox"
            name="privacy"
            required
            defaultChecked
            className="mt-0.5 size-5 shrink-0 accent-[#1a1d21]"
          />
          <span>
            {t.privacy.start}{" "}
            <Link
              href={localePath(locale, "/privacyverklaring")}
              target="_blank"
              className="link-underline font-medium text-ink"
            >
              {t.privacy.link}
            </Link>
            {t.privacy.end}
          </span>
        </label>
        <div id="privacy-error"><ErrorText>{errors.privacy}</ErrorText></div>
      </div>

      <Button type="submit" size="lg" pending={pending} className="w-full justify-between sm:w-auto sm:min-w-[220px]">
        {t.submit}
        <IconArrow size={17} className="rtl:-scale-x-100" />
      </Button>
    </form>
  );
}
