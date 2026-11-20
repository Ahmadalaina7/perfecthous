import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * CSV-export van aanvragen of contactberichten. Beveiligd met dezelfde sessie
 * als het beheerpaneel. Waarden worden ge-"escaped" volgens RFC 4180, en tekst
 * die met =, +, - of @ begint krijgt een apostrof om CSV-injectie in Excel te
 * voorkomen.
 */
function csvCell(value: string | number | null | undefined) {
  const raw = value === null || value === undefined ? "" : String(value);
  const safe = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${safe.replace(/"/g, '""')}"`;
}

const toCsv = (headers: string[], rows: (string | number | null | undefined)[][]) =>
  [headers.map(csvCell).join(";"), ...rows.map((r) => r.map(csvCell).join(";"))].join("\r\n");

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });

  const url = new URL(request.url);
  const type = url.searchParams.get("type") ?? "quotes";
  const status = url.searchParams.get("status");
  const where = status && status !== "alle" ? { status } : {};

  let csv = "";
  let filename = "";

  if (type === "contacts") {
    const rows = await prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" } });
    csv = toCsv(
      ["Naam", "E-mail", "Telefoon", "Onderwerp", "Bericht", "Status", "Datum"],
      rows.map((r) => [r.name, r.email, r.phone, r.subject, r.message, r.status, r.createdAt.toISOString()]),
    );
    filename = `perfecthous-berichten-${new Date().toISOString().slice(0, 10)}.csv`;
  } else {
    const rows = await prisma.quoteRequest.findMany({ where, orderBy: { createdAt: "desc" } });
    csv = toCsv(
      [
        "Referentie",
        "Naam",
        "E-mail",
        "Telefoon",
        "Plaats",
        "Dienst",
        "Omschrijving",
        "Startdatum",
        "Budget",
        "Contactvoorkeur",
        "Foto's",
        "Status",
        "Notities",
        "Datum",
      ],
      rows.map((r) => [
        r.reference,
        r.name,
        r.email,
        r.phone,
        r.city,
        r.serviceName,
        r.description,
        r.startDate,
        r.budget,
        r.contactPref,
        r.photos,
        r.status,
        r.notes,
        r.createdAt.toISOString(),
      ]),
    );
    filename = `perfecthous-aanvragen-${new Date().toISOString().slice(0, 10)}.csv`;
  }

  return new NextResponse("\uFEFF" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
