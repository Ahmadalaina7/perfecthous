"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { submitQuote, type QuoteState } from "@/app/actions/quote";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Label, Hint, ErrorText, Fieldset, Legend, RadioCard } from "@/components/ui/form";
import { IconArrow, IconCheck, IconPhone, IconWhatsapp } from "@/components/icons";
import { site, telUrl, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Turnstile, TurnstileField } from "@/components/forms/turnstile";
import { localePath, type Locale } from "@/lib/i18n/config";
import { fill } from "@/lib/i18n";
import { formsCopy } from "@/lib/i18n/dict/forms";

type ServiceOption = { slug: string; title: string };

/**
 * Meerstaps offerteformulier. Alle stappen staan in één <form>, verborgen met
 * het `hidden`-attribuut: zo blijven geüploade bestanden en eerder ingevulde
 * velden bewaard bij het wisselen van stap (een unmount zou ze wissen).
 */
export function QuoteForm({
  locale,
  services,
  initialService,
}: {
  locale: Locale;
  services: ServiceOption[];
  initialService?: string;
}) {
  const t = formsCopy[locale].quote;
  const steps = t.steps;
  const [step, setStep] = useState(0);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const [state, formAction, pending] = useActionState<QuoteState, FormData>(submitQuote, { status: "idle" });
  const router = useRouter();

  // Bij succes naar de bedankpagina; de referentie gaat mee in de URL.
  useEffect(() => {
    if (state.status === "success") {
      router.push(
        localePath(locale, `/bedankt?ref=${encodeURIComponent(state.reference)}`),
      );
    }
  }, [state, router, locale]);

  const errors = state.status === "error" ? { ...state.fields, ...clientErrors } : clientErrors;

  /** Leeswaarde van een veld binnen de form, ongeacht de stap. */
  const value = (name: string) => {
    const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      `form[data-quote] [name="${name}"]`,
    );
    return el?.value ?? "";
  };

  const validateStep = () => {
    const next: Record<string, string> = {};
    if (step === 0) {
      if (value("description").trim().length < 20) {
        next.description = t.clientErrors.description;
      }
    }
    if (step === 2) {
      if (value("name").trim().length < 2) next.name = t.clientErrors.name;
      const email = value("email").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = t.clientErrors.email;
      const phone = value("phone").replace(/\D/g, "");
      if (phone.length < 6) next.phone = t.clientErrors.phone;
    }
    setClientErrors(next);
    return Object.keys(next).length === 0;
  };

  /**
   * Scrollt de kop van het formulier in beeld, anders lijkt er niets te
   * gebeuren. `behavior: "smooth"` in JS gaat vóór de CSS-regel, dus hier
   * moet de bewegingsvoorkeur zelf worden gerespecteerd.
   */
  const scrollToForm = () => {
    const el = document.getElementById("offerte-form");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
    scrollToForm();
  };

  const goBack = () => {
    setClientErrors({});
    setStep((s) => Math.max(s - 1, 0));
    scrollToForm();
  };

  const fieldA11y = (name: string) => ({
    id: name,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form id="offerte-form" data-quote action={formAction} className="scroll-mt-24" noValidate>
      <input type="hidden" name="locale" value={locale} />

      {/* Voortgang */}
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label={t.progress}>
        {steps.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined}>
            <div className={cn("h-0.5 w-full transition-colors duration-500", i <= step ? "bg-ink" : "bg-ink/15")} />
            <span
              className={cn(
                "mt-2.5 block font-sans text-[0.68rem] tracking-[0.1em] uppercase transition-colors sm:text-[0.72rem]",
                i === step ? "text-ink" : "text-muted/70",
              )}
            >
              <span className="me-1.5 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="hidden sm:inline">{label}</span>
            </span>
          </li>
        ))}
      </ol>

      <p className="sr-only" aria-live="polite">
        {fill(t.stepStatus, { current: step + 1, total: steps.length, label: steps[step] })}
      </p>

      {state.status === "error" && state.message && (
        <div role="alert" className="mb-6 border-l-2 border-[#9c3b2b] bg-[#9c3b2b]/[0.06] px-4 py-3 text-[0.875rem] text-[#7d2f22]">
          {state.message}
        </div>
      )}

      {/* ---------- Stap 1 ---------- */}
      <div hidden={step !== 0} className="space-y-6">
        <div>
          <Label htmlFor="serviceSlug">{t.service.label}</Label>
          <Select {...fieldA11y("serviceSlug")} defaultValue={initialService ?? ""}>
            <option value="">{t.service.placeholder}</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="overig">{t.service.other}</option>
          </Select>
          <Hint>{t.service.hint}</Hint>
        </div>

        <div>
          <Label htmlFor="description">{t.description.label}</Label>
          <Textarea {...fieldA11y("description")} rows={6} placeholder={t.description.placeholder} />
          <Hint>{t.description.hint}</Hint>
          <div id="description-error">
            <ErrorText>{errors.description}</ErrorText>
          </div>
        </div>

        <Fieldset>
          <Legend>{t.scope.legend}</Legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {t.scope.options.map((o) => (
              <RadioCard
                key={o.value}
                name="scope"
                value={o.value}
                label={o.label}
                description={o.desc}
                defaultChecked={o.value === "renovatie"}
              />
            ))}
          </div>
          <Hint>{t.scope.hint}</Hint>
        </Fieldset>
      </div>

      {/* ---------- Stap 2 ---------- */}
      <div hidden={step !== 1} className="space-y-6">
        <div>
          <Label htmlFor="photos">{t.photos.label}</Label>
          <div className="rounded-[2px] border border-dashed border-ink/25 bg-white/50 p-5">
            <input
              id="photos"
              name="photos"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
              multiple
              className="block w-full font-sans text-[0.875rem] text-ink file:mr-4 file:min-h-11 file:cursor-pointer file:rounded-[2px] file:border file:border-ink/25 file:bg-paper file:px-4 file:font-sans file:text-[0.85rem] file:font-medium file:text-ink hover:file:border-ink/60"
              aria-describedby="photos-hint"
            />
            <Hint className="mt-3">
              <span id="photos-hint">{t.photos.hint}</span>
            </Hint>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="startDate">{t.start.label}</Label>
            <Select {...fieldA11y("startDate")} defaultValue="">
              <option value="">{t.start.none}</option>
              {t.start.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="budget">{t.budget.label}</Label>
            <Select {...fieldA11y("budget")} defaultValue="">
              <option value="">{t.budget.none}</option>
              {t.budget.options.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Select>
            <Hint>{t.budget.hint}</Hint>
          </div>
        </div>
      </div>

      {/* ---------- Stap 3 ---------- */}
      <div hidden={step !== 2} className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">{t.person.name}</Label>
            <Input {...fieldA11y("name")} autoComplete="name" placeholder={t.person.namePlaceholder} />
            <div id="name-error"><ErrorText>{errors.name}</ErrorText></div>
          </div>
          <div>
            <Label htmlFor="city">{t.person.city}</Label>
            <Input {...fieldA11y("city")} autoComplete="address-level2" placeholder={t.person.cityPlaceholder} />
          </div>
          <div>
            <Label htmlFor="phone">{t.person.phone}</Label>
            <Input {...fieldA11y("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12 34 56 78" />
            <div id="phone-error"><ErrorText>{errors.phone}</ErrorText></div>
          </div>
          <div>
            <Label htmlFor="email">{t.person.email}</Label>
            <Input {...fieldA11y("email")} type="email" inputMode="email" autoComplete="email" placeholder={t.person.emailPlaceholder} />
            <div id="email-error"><ErrorText>{errors.email}</ErrorText></div>
          </div>
        </div>

        <Fieldset>
          <Legend>{t.contactPref.legend}</Legend>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {t.contactPref.options.map((o) => (
              <RadioCard
                key={o.value}
                name="contactPref"
                value={o.value}
                label={o.label}
                description={o.desc}
                defaultChecked={o.value === "telefoon"}
              />
            ))}
          </div>
        </Fieldset>
      </div>

      {/* ---------- Stap 4 ---------- */}
      <div hidden={step !== 3} className="space-y-5">
        <div className="border border-paper-line bg-white/50 p-5">
          <h2 className="font-display text-[1.15rem]">{t.review.title}</h2>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">{t.review.text}</p>
          <ul className="mt-4 space-y-2 text-[0.85rem] text-ink/80">
            {t.review.checks.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <IconCheck size={15} className="mt-0.5 shrink-0 text-brass-ink" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Botbescherming: alleen actief als er een Turnstile-sitekey is ingesteld */}
        <TurnstileField token={turnstileToken} />
        <Turnstile onToken={setTurnstileToken} />

        {/* Honeypot: onzichtbaar voor mensen, verleidelijk voor bots */}
        <div className="absolute -left-[9999px] h-0" aria-hidden>
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 p-1 text-[0.85rem] leading-relaxed text-ink/85">
            <input
              type="checkbox"
              name="privacy"
              required
              defaultChecked
              className="mt-0.5 size-5 shrink-0 accent-[#1a1d21]"
              aria-describedby="privacy-error"
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
      </div>

      {/* Navigatie */}
      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-paper-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          {step > 0 && (
            <Button type="button" variant="ghost" size="md" onClick={goBack} disabled={pending}>
              {t.buttons.back}
            </Button>
          )}
        </div>

        {/*
          Let op: de twee knoppen hebben een expliciete key. Zonder key hergebruikt
          React hetzelfde <button>-element en verandert alleen het type van
          "button" naar "submit". De klik die u naar de laatste stap brengt,
          zou dan direct het formulier versturen. Met een key wordt het element
          vervangen en heeft die klik geen default-actie meer.
        */}
        {step < steps.length - 1 ? (
          <Button key="next" type="button" size="md" onClick={goNext} className="sm:min-w-[190px]">
            {t.buttons.next}
            <IconArrow size={17} className="rtl:-scale-x-100" />
          </Button>
        ) : (
          <Button key="submit" type="submit" variant="brass" size="lg" pending={pending} className="sm:min-w-[220px]">
            {t.buttons.submit}
            <IconArrow size={17} className="rtl:-scale-x-100" />
          </Button>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-[0.78rem] text-muted">
        <a href={telUrl} className="inline-flex items-center gap-1.5 hover:text-ink">
          <IconPhone size={14} /> {fill(t.buttons.call, { phone: site.phoneDisplay })}
        </a>
        <a
          href={whatsappUrl(t.buttons.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-ink"
        >
          <IconWhatsapp size={14} /> {t.buttons.whatsapp}
        </a>
      </div>
    </form>
  );
}
