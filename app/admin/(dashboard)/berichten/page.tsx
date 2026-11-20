import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { updateContactStatus, deleteContact } from "@/app/actions/admin";
import { formatDateNl } from "@/lib/utils";
import { ConfirmButton } from "@/components/admin/confirm-button";

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  new: "Nieuw",
  in_progress: "In behandeling",
  done: "Afgerond",
  spam: "Spam",
};

export default async function BerichtenPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const { status = "alle" } = await searchParams;

  const messages = await prisma.contactMessage.findMany({
    where: status !== "alle" ? { status } : {},
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-[1.8rem] leading-tight">Contactberichten</h1>
        <a
          href="/api/admin/export?type=contacts"
          className="inline-flex min-h-9 items-center rounded-[2px] border border-ink/20 px-3 font-sans text-[0.78rem] text-ink hover:border-ink/45"
        >
          Export CSV
        </a>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {["alle", "new", "in_progress", "done", "spam"].map((s) => (
          <a
            key={s}
            href={s === "alle" ? "/admin/berichten" : `/admin/berichten?status=${s}`}
            aria-current={status === s ? "page" : undefined}
            className={
              status === s
                ? "rounded-full bg-ink px-3 py-1.5 font-sans text-[0.78rem] text-paper"
                : "rounded-full border border-ink/15 px-3 py-1.5 font-sans text-[0.78rem] text-ink/70 hover:border-ink/40"
            }
          >
            {s === "alle" ? "Alle" : statusLabels[s]}
          </a>
        ))}
      </div>

      {messages.length === 0 ? (
        <p className="mt-6 border border-paper-line bg-paper p-6 text-[0.9rem] text-muted">
          Geen berichten in deze selectie.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {messages.map((m) => (
            <li key={m.id} className="border border-paper-line bg-paper p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-sans text-[0.95rem] font-medium">{m.name}</p>
                  <p className="mt-0.5 font-sans text-[0.78rem] text-muted">
                    <a href={`mailto:${m.email}`} className="hover:underline">{m.email}</a>
                    {m.phone ? ` · ${m.phone}` : ""} · {formatDateNl(m.createdAt)}
                  </p>
                  {m.subject && <p className="mt-1 font-sans text-[0.8rem] text-ink/80">Onderwerp: {m.subject}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <form action={updateContactStatus} className="flex gap-1">
                    <input type="hidden" name="id" value={m.id} />
                    {["new", "in_progress", "done", "spam"].map((s) => (
                      <button
                        key={s}
                        type="submit"
                        name="status"
                        value={s}
                        className={
                          m.status === s
                            ? "rounded-[2px] bg-ink px-2 py-1 font-sans text-[0.68rem] text-paper"
                            : "rounded-[2px] border border-ink/15 px-2 py-1 font-sans text-[0.68rem] text-ink/70 hover:border-ink/40"
                        }
                      >
                        {statusLabels[s]}
                      </button>
                    ))}
                  </form>
                  <form action={deleteContact}>
                    <input type="hidden" name="id" value={m.id} />
                    <ConfirmButton message="Dit bericht definitief verwijderen?">Verwijderen</ConfirmButton>
                  </form>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line border-t border-paper-line pt-3 text-[0.88rem] leading-relaxed text-ink/85">
                {m.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
