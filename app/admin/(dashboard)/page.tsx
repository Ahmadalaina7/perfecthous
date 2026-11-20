import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { formatDateNl } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  new: "Nieuw",
  in_progress: "In behandeling",
  done: "Afgerond",
  spam: "Spam",
};

export default async function AdminHome() {
  await requireAdmin();

  const [newQuotes, newMessages, totalQuotes, projects, posts, latestQuotes] = await Promise.all([
    prisma.quoteRequest.count({ where: { status: "new" } }),
    prisma.contactMessage.count({ where: { status: "new" } }),
    prisma.quoteRequest.count(),
    prisma.project.count(),
    prisma.post.count(),
    prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
  ]);

  const cards = [
    { label: "Nieuwe offerteaanvragen", value: newQuotes, href: "/admin/aanvragen?status=new" },
    { label: "Nieuwe berichten", value: newMessages, href: "/admin/berichten?status=new" },
    { label: "Aanvragen totaal", value: totalQuotes, href: "/admin/aanvragen" },
    { label: "Projecten", value: projects, href: "/admin/projecten" },
    { label: "Blogberichten", value: posts, href: "/admin/blog" },
  ];

  return (
    <div>
      <h1 className="text-[1.8rem] leading-tight">Overzicht</h1>
      <p className="mt-1.5 text-[0.9rem] text-muted">Alles wat binnenkomt en wat er online staat.</p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group border border-paper-line bg-paper p-5 transition-colors hover:border-ink/30"
          >
            <span className="font-display text-[2rem] leading-none tabular-nums">{c.value}</span>
            <span className="mt-2 block font-sans text-[0.82rem] text-muted group-hover:text-ink">{c.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-9">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[1.2rem]">Laatste aanvragen</h2>
          <Link href="/admin/aanvragen" className="font-sans text-[0.8rem] text-muted hover:text-ink">
            Alles bekijken
          </Link>
        </div>

        {latestQuotes.length === 0 ? (
          <p className="mt-4 border border-paper-line bg-paper p-6 text-[0.9rem] text-muted">
            Nog geen aanvragen. Zodra iemand het offerteformulier invult, verschijnen ze hier.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-paper-line border border-paper-line bg-paper">
            {latestQuotes.map((q) => (
              <li key={q.id}>
                <Link href={`/admin/aanvragen/${q.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3.5 hover:bg-paper-dim">
                  <span className="font-sans text-[0.72rem] tracking-wide text-muted tabular-nums">{q.reference}</span>
                  <span className="flex-1 font-sans text-[0.9rem] font-medium">{q.name}</span>
                  <span className="font-sans text-[0.8rem] text-muted">{q.serviceName ?? "Algemeen"}</span>
                  <span className="rounded-full border border-ink/15 px-2.5 py-0.5 font-sans text-[0.7rem]">
                    {statusLabel[q.status] ?? q.status}
                  </span>
                  <span className="font-sans text-[0.75rem] text-muted tabular-nums">{formatDateNl(q.createdAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
