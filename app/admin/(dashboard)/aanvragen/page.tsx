import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { formatDateNl } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  new: "Nieuw",
  in_progress: "In behandeling",
  done: "Afgerond",
  spam: "Spam",
};

const statusStyles: Record<string, string> = {
  new: "border-brass/50 bg-brass/10 text-brass-ink",
  in_progress: "border-[#3d6b8a]/40 bg-[#3d6b8a]/10 text-[#2f556e]",
  done: "border-[#4a7350]/40 bg-[#4a7350]/10 text-[#3a5c40]",
  spam: "border-ink/15 bg-ink/[0.04] text-muted",
};

/**
 * Lijst met aanvragen. Zoeken en filteren gebeurt via de URL (server-side),
 * zodat de pagina ook werkt zonder JavaScript en de link deelbaar is.
 */
export default async function AanvragenPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>;
}) {
  await requireAdmin();
  const { status = "alle", q = "", page = "1" } = await searchParams;

  const where = {
    ...(status !== "alle" ? { status } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
            { phone: { contains: q } },
            { reference: { contains: q, mode: "insensitive" as const } },
            { description: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const perPage = 25;
  const current = Math.max(1, Number(page) || 1);
  const [rows, total] = await Promise.all([
    prisma.quoteRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (current - 1) * perPage,
      take: perPage,
    }),
    prisma.quoteRequest.count({ where }),
  ]);
  const pages = Math.max(1, Math.ceil(total / perPage));

  const filters = [
    { key: "alle", label: "Alle" },
    { key: "new", label: "Nieuw" },
    { key: "in_progress", label: "In behandeling" },
    { key: "done", label: "Afgerond" },
    { key: "spam", label: "Spam" },
  ];

  const buildHref = (nextStatus: string, nextPage = 1) => {
    const p = new URLSearchParams();
    if (nextStatus !== "alle") p.set("status", nextStatus);
    if (q) p.set("q", q);
    if (nextPage > 1) p.set("page", String(nextPage));
    const s = p.toString();
    return `/admin/aanvragen${s ? `?${s}` : ""}`;
  };

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-[1.8rem] leading-tight">Offerteaanvragen</h1>
        <a
          href={`/api/admin/export?type=quotes${status !== "alle" ? `&status=${status}` : ""}`}
          className="inline-flex min-h-9 items-center rounded-[2px] border border-ink/20 px-3 font-sans text-[0.78rem] text-ink hover:border-ink/45"
        >
          Export CSV
        </a>
      </div>

      {/* Zoeken */}
      <form method="get" className="mt-5 flex flex-wrap gap-2">
        {status !== "alle" && <input type="hidden" name="status" value={status} />}
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Zoek op naam, e-mail, referentie of tekst…"
          aria-label="Zoeken in aanvragen"
          className="min-h-10 min-w-0 flex-1 rounded-[2px] border border-ink/20 bg-white/70 px-3 font-sans text-[0.875rem] focus:border-ink focus:outline-none"
        />
        <button type="submit" className="min-h-10 rounded-[2px] bg-ink px-4 font-sans text-[0.82rem] text-paper">
          Zoeken
        </button>
        {q && (
          <Link href={buildHref(status)} className="inline-flex min-h-10 items-center px-3 font-sans text-[0.8rem] text-muted hover:text-ink">
            Wissen
          </Link>
        )}
      </form>

      {/* Statusfilters */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <Link
            key={f.key}
            href={buildHref(f.key)}
            aria-current={status === f.key ? "page" : undefined}
            className={
              status === f.key
                ? "rounded-full bg-ink px-3 py-1.5 font-sans text-[0.78rem] text-paper"
                : "rounded-full border border-ink/15 px-3 py-1.5 font-sans text-[0.78rem] text-ink/70 hover:border-ink/40"
            }
          >
            {f.label}
          </Link>
        ))}
        <span className="ml-auto self-center font-sans text-[0.76rem] text-muted">{total} resultaten</span>
      </div>

      {/* Tabel / lijst */}
      {rows.length === 0 ? (
        <p className="mt-6 border border-paper-line bg-paper p-6 text-[0.9rem] text-muted">
          Geen aanvragen gevonden{q || status !== "alle" ? " met deze filter" : ""}.
        </p>
      ) : (
        <>
          {/* Desktop: tabel */}
          <div className="mt-6 hidden overflow-x-auto border border-paper-line bg-paper md:block">
            <table className="w-full text-left text-[0.85rem]">
              <thead>
                <tr className="border-b border-paper-line">
                  {["Referentie", "Naam", "Dienst", "Contact", "Datum", "Status"].map((h) => (
                    <th key={h} className="px-4 py-2.5 font-sans text-[0.68rem] font-semibold tracking-[0.1em] text-muted uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-line">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-paper-dim">
                    <td className="px-4 py-3 font-sans text-[0.76rem] text-muted">
                      <Link href={`/admin/aanvragen/${r.id}`} className="hover:text-ink">
                        {r.reference}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/aanvragen/${r.id}`} className="font-medium hover:underline">
                        {r.name}
                      </Link>
                      <span className="block text-[0.76rem] text-muted">{r.city ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3 text-muted">{r.serviceName ?? "Algemeen"}</td>
                    <td className="px-4 py-3 text-[0.78rem]">
                      <a href={`mailto:${r.email}`} className="block hover:underline">{r.email}</a>
                      <a href={`tel:${r.phone}`} className="block text-muted hover:underline">{r.phone}</a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-[0.78rem] text-muted">{formatDateNl(r.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[0.7rem] ${statusStyles[r.status] ?? ""}`}>
                        {statusLabels[r.status] ?? r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobiel: kaarten */}
          <ul className="mt-5 space-y-2 md:hidden">
            {rows.map((r) => (
              <li key={r.id} className="border border-paper-line bg-paper p-4">
                <div className="flex items-start justify-between gap-3">
                  <Link href={`/admin/aanvragen/${r.id}`} className="font-sans text-[0.95rem] font-medium">
                    {r.name}
                  </Link>
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.68rem] ${statusStyles[r.status] ?? ""}`}>
                    {statusLabels[r.status] ?? r.status}
                  </span>
                </div>
                <p className="mt-0.5 font-sans text-[0.76rem] text-muted">
                  {r.reference} · {r.serviceName ?? "Algemeen"} · {formatDateNl(r.createdAt)}
                </p>
                <div className="mt-3 flex gap-2">
                  <a href={`tel:${r.phone}`} className="min-h-9 flex-1 rounded-[2px] border border-ink/20 text-center font-sans text-[0.78rem] leading-9">
                    Bellen
                  </a>
                  <a href={`mailto:${r.email}`} className="min-h-9 flex-1 rounded-[2px] border border-ink/20 text-center font-sans text-[0.78rem] leading-9">
                    Mailen
                  </a>
                  <Link href={`/admin/aanvragen/${r.id}`} className="min-h-9 flex-1 rounded-[2px] bg-ink text-center font-sans text-[0.78rem] leading-9 text-paper">
                    Open
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {pages > 1 && (
        <nav aria-label="Paginering" className="mt-5 flex items-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <Link
              key={i}
              href={buildHref(status, i + 1)}
              aria-current={current === i + 1 ? "page" : undefined}
              className={
                current === i + 1
                  ? "grid size-9 place-items-center rounded-[2px] bg-ink font-sans text-[0.8rem] text-paper"
                  : "grid size-9 place-items-center rounded-[2px] border border-ink/15 font-sans text-[0.8rem] hover:border-ink/40"
              }
            >
              {i + 1}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
