import { Resend } from "resend";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";

/**
 * E-mailverzending met Resend. Zonder RESEND_API_KEY loggen we alleen naar de
 * console, zodat lokaal ontwikkelen werkt zonder account. Zet de sleutel in
 * productie om echte meldingen te versturen.
 */

const apiKey = process.env.RESEND_API_KEY?.trim();
const from = process.env.MAIL_FROM?.trim() || `${site.name} <offerte@perfecthous.nl>`;
const to = process.env.MAIL_TO?.trim() || site.email;

const resend = apiKey ? new Resend(apiKey) : null;

type Mail = { to: string; subject: string; html: string; replyTo?: string };

export async function sendMail(mail: Mail) {
  const payload = {
    from,
    to: mail.to,
    subject: mail.subject,
    html: mail.html,
    replyTo: mail.replyTo,
  };

  if (!resend) {
    console.log("\n── [mail:dev] ─────────────────────────────");
    console.log(`Aan:      ${payload.to}`);
    console.log(`Onderwerp:${payload.subject}`);
    console.log(`Reply-to: ${payload.replyTo ?? "—"}`);
    console.log("(geen RESEND_API_KEY ingesteld; inhoud niet verstuurd)");
    console.log("──────────────────────────────────────────\n");
    return { ok: true as const, dev: true };
  }

  try {
    const result = await resend.emails.send(payload);
    if (result.error) {
      console.error("Resend-fout:", result.error);
      return { ok: false as const, error: result.error.message };
    }
    return { ok: true as const };
  } catch (error) {
    console.error("E-mail mislukt:", error);
    return { ok: false as const, error: "Onbekende fout bij verzenden" };
  }
}

/* ---------- Opmaak ---------- */

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const shell = (title: string, body: string) => `
<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f6f4f0;padding:28px">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2ddd3">
    <div style="background:#1a1d21;color:#f6f4f0;padding:22px 26px">
      <div style="font-size:19px;letter-spacing:-0.01em">Perfecthous</div>
      <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#b8924a;margin-top:5px">Vlissingen</div>
    </div>
    <div style="padding:26px;color:#1a1d21;font-size:15px;line-height:1.6">
      <h1 style="font-family:Georgia,serif;font-size:22px;font-weight:500;margin:0 0 16px">${esc(title)}</h1>
      ${body}
    </div>
    <div style="padding:16px 26px;border-top:1px solid #e2ddd3;font-size:12px;color:#5c6167">
      ${esc(site.name)} · ${esc(site.address.street)}, ${esc(site.address.zip)} ${esc(site.address.city)} · ${esc(site.phoneDisplay)}
    </div>
  </div>
</div>`;

export type QuoteMailData = {
  reference: string;
  name: string;
  email: string;
  phone: string;
  city?: string | null;
  serviceName?: string | null;
  description: string;
  startDate?: string | null;
  budget?: string | null;
  contactPref: string;
  photos: string[];
  locale?: Locale;
};

/**
 * Klantmails in de taal van de pagina. De mails aan de eigenaar blijven
 * Nederlands (dat is de backoffice), maar vermelden in welke taal de
 * bezoeker de site gebruikte.
 */
const mailCopy = {
  nl: {
    quoteSubject: (ref: string) => `We hebben uw aanvraag ontvangen (${ref})`,
    quoteTitle: (name: string) => `Bedankt, ${name}`,
    quoteIntro: (ref: string) =>
      `We hebben uw aanvraag goed ontvangen. Uw referentie is <strong>${esc(ref)}</strong> — handig als u ons later belt of mailt.`,
    quoteFollow: (channel: string) =>
      `We nemen binnen één werkdag contact met u op ${channel} om een opname in te plannen. Die opname en de offerte zijn gratis en verplichten u tot niets.`,
    channels: { telefoon: "per telefoon", whatsapp: "via WhatsApp", email: "per e-mail" },
    box: "Uw aanvraag",
    quoteQuestion: (phone: string) =>
      `Heeft u in de tussentijd een vraag of foto's? Antwoord gerust op deze e-mail of bel ${esc(phone)}.`,
    signoff: "Met vriendelijke groet,<br/>Team Perfecthous",
    contactSubject: "We hebben uw bericht ontvangen",
    contactTitle: (name: string) => `Bedankt, ${name}`,
    contactIntro: "Uw bericht is bij ons binnen. We reageren binnen één werkdag, meestal sneller.",
    contactUrgent: (phone: string) =>
      `Bij spoed — lekkage of wateroverlast — kunt u beter direct bellen: ${esc(phone)}.`,
  },
  en: {
    quoteSubject: (ref: string) => `We received your request (${ref})`,
    quoteTitle: (name: string) => `Thank you, ${name}`,
    quoteIntro: (ref: string) =>
      `We have received your request. Your reference is <strong>${esc(ref)}</strong> — useful if you call or email us later.`,
    quoteFollow: (channel: string) =>
      `We will contact you within one working day ${channel} to schedule a survey. The survey and the quote are free and without obligation.`,
    channels: { telefoon: "by phone", whatsapp: "via WhatsApp", email: "by email" },
    box: "Your request",
    quoteQuestion: (phone: string) =>
      `Do you have a question or photos in the meantime? Simply reply to this email or call ${esc(phone)}.`,
    signoff: "Kind regards,<br/>Team Perfecthous",
    contactSubject: "We received your message",
    contactTitle: (name: string) => `Thank you, ${name}`,
    contactIntro: "Your message has arrived. We reply within one working day, usually sooner.",
    contactUrgent: (phone: string) =>
      `In an emergency — a leak or flooding — it is better to call us directly: ${esc(phone)}.`,
  },
  ar: {
    quoteSubject: (ref: string) => `استلمنا طلبك (${ref})`,
    quoteTitle: (name: string) => `شكرًا لك، ${name}`,
    quoteIntro: (ref: string) =>
      `استلمنا طلبك بنجاح. رقمك المرجعي هو <strong>${esc(ref)}</strong> — مفيد إذا اتصلت بنا أو راسلتنا لاحقًا.`,
    quoteFollow: (channel: string) =>
      `سنتواصل معك خلال يوم عمل واحد ${channel} لتحديد موعد معاينة. المعاينة وعرض السعر مجانيان ودون التزام.`,
    channels: { telefoon: "هاتفيًا", whatsapp: "عبر واتساب", email: "بالبريد الإلكتروني" },
    box: "طلبك",
    quoteQuestion: (phone: string) =>
      `هل لديك سؤال أو صور في هذه الأثناء؟ رُد على هذه الرسالة أو اتصل على ${esc(phone)}.`,
    signoff: "مع أطيب التحيات،<br/>فريق Perfecthous",
    contactSubject: "استلمنا رسالتك",
    contactTitle: (name: string) => `شكرًا لك، ${name}`,
    contactIntro: "وصلتنا رسالتك. نرد خلال يوم عمل واحد، وغالبًا أسرع.",
    contactUrgent: (phone: string) =>
      `في الحالات الطارئة — تسرب أو فيضان — الأفضل الاتصال مباشرة: ${esc(phone)}.`,
  },
} as const;

export function ownerQuoteMail(q: QuoteMailData) {
  const rows: [string, string][] = [
    ["Referentie", q.reference],
    ["Naam", q.name],
    ["E-mail", q.email],
    ["Telefoon", q.phone],
    ["Plaats", q.city || "—"],
    ["Dienst", q.serviceName || "—"],
    ["Startdatum", q.startDate || "—"],
    ["Budget", q.budget || "—"],
    ["Contactvoorkeur", q.contactPref],
    ["Taal website", q.locale ?? "nl"],
    ["Foto's", q.photos.length ? `${q.photos.length} bijgevoegd` : "geen"],
  ];
  return sendMail({
    to,
    replyTo: q.email,
    subject: `Nieuwe offerteaanvraag ${q.reference} — ${q.name}`,
    html: shell(
      "Nieuwe offerteaanvraag",
      `<table style="width:100%;font-size:14px;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:5px 0;color:#5c6167;width:150px">${esc(k)}</td><td style="padding:5px 0">${esc(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <div style="margin-top:18px;padding-top:16px;border-top:1px solid #e2ddd3">
        <div style="font-size:12px;color:#5c6167;text-transform:uppercase;letter-spacing:.12em">Omschrijving</div>
        <p style="white-space:pre-line;margin:8px 0 0">${esc(q.description)}</p>
      </div>
      ${
        q.photos.length
          ? `<p style="font-size:13px;color:#5c6167">Foto's: ${q.photos.map((p) => `<a href="${esc(site.url + p)}">${esc(p.split("/").pop() ?? p)}</a>`).join(", ")}</p>`
          : ""
      }
      <p style="margin-top:22px"><a href="${site.url}/admin/aanvragen" style="background:#1a1d21;color:#f6f4f0;padding:11px 18px;text-decoration:none;display:inline-block">Open in beheer</a></p>`,
    ),
  });
}

export function customerQuoteMail(q: QuoteMailData, locale: Locale = "nl") {
  const t = mailCopy[locale];
  const channel = t.channels[q.contactPref as keyof typeof t.channels] ?? t.channels.telefoon;
  return sendMail({
    to: q.email,
    subject: t.quoteSubject(q.reference),
    html: shell(
      t.quoteTitle(q.name.split(" ")[0]),
      `<p>${t.quoteIntro(q.reference)}</p>
       <p>${t.quoteFollow(channel)}</p>
       <div dir="auto" style="margin:18px 0;padding:14px 16px;background:#f6f4f0;border-left:2px solid #b8924a">
         <div style="font-size:12px;color:#5c6167;text-transform:uppercase;letter-spacing:.12em">${esc(t.box)}</div>
         <p style="margin:7px 0 0;white-space:pre-line">${esc(q.description)}</p>
       </div>
       <p>${t.quoteQuestion(site.phoneDisplay)}</p>
       <p style="margin-top:20px">${t.signoff}</p>`,
    ),
  });
}

export function ownerContactMail(m: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  locale?: Locale;
}) {
  return sendMail({
    to,
    replyTo: m.email,
    subject: `Nieuw contactbericht — ${m.name}${m.subject ? `: ${m.subject}` : ""}`,
    html: shell(
      "Nieuw contactbericht",
      `<p><strong>${esc(m.name)}</strong><br/>${esc(m.email)}${m.phone ? `<br/>${esc(m.phone)}` : ""}</p>
       <p style="font-size:13px;color:#5c6167">Taal website: ${esc(m.locale ?? "nl")}</p>
       <div style="margin-top:16px;padding-top:14px;border-top:1px solid #e2ddd3">
         <p dir="auto" style="white-space:pre-line;margin:0">${esc(m.message)}</p>
       </div>
       <p style="margin-top:20px"><a href="${site.url}/admin/berichten" style="background:#1a1d21;color:#f6f4f0;padding:11px 18px;text-decoration:none;display:inline-block">Open in beheer</a></p>`,
    ),
  });
}

export function customerContactMail(m: { name: string; email: string }, locale: Locale = "nl") {
  const t = mailCopy[locale];
  return sendMail({
    to: m.email,
    subject: t.contactSubject,
    html: shell(
      t.contactTitle(m.name.split(" ")[0]),
      `<p>${t.contactIntro}</p>
       <p>${t.contactUrgent(site.phoneDisplay)}</p>
       <p style="margin-top:20px">${t.signoff}</p>`,
    ),
  });
}
