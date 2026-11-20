import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { formatDateNl } from "@/lib/utils";
import { lines } from "@/lib/db";
import { StatusForm, NotesForm, DeleteForm } from "@/components/admin/request-actions";
import { IconArrow } from "@/components/icons";

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  new: "Nieuw",
  in_progress: "In behandeling",
  done: "Afgerond",
  spam: "Spam",
};

export default async function QuoteDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const quote = await prisma.quoteRequest.findUnique({ where: { id } });
  if (!quote) notFound();

  const photos = lines(quote.photos);

  return (
    <div className="max-w-[900px]">
      <Link href="/admin/aanvragen" className="inline-flex min-h-9 items-center gap-1.5 font-sans text-[0.8rem] text-muted hover:text-ink">
        <IconArrow size={14} className="rotate-180" />
        Alle aanvragen
      </Link>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-sans text-[0.74rem] tracking-[0.12em] text-muted uppercase">{quote.reference}</p>
          <h1 className="mt-1 text-[1.7rem] leading-tight">{quote.name}</h1>
          <p className="mt-1 font-sans text-[0.82rem] text-muted">
            Binnengekomen {formatDateNl(quote.createdAt)} · {statusLabels[quote.status] ?? quote.status}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={`tel:${quote.phone}`}
            className="inline-flex min-h-10 items-center rounded-[2px] bg-ink px-4 font-sans text-[0.82rem] text-paper"
          >
            Bellen
          </a>
          <a
            href={`mailto:${quote.email}?subject=Uw%20aanvraag%20${quote.reference}`}
            className="inline-flex min-h-10 items-center rounded-[2px] border border-ink/20 px-4 font-sans text-[0.82rem] hover:border-ink/45"
          >
            Mailen
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <section className="border border-paper-line bg-paper p-5">
            <h2 className="font-sans text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">De klus</h2>
            <p className="mt-3 whitespace-pre-line text-[0.9rem] leading-relaxed">{quote.description}</p>
          </section>

          {photos.length > 0 && (
            <section className="border border-paper-line bg-paper p-5">
              <h2 className="font-sans text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                Foto&apos;s ({photos.length})
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {photos.map((src) => (
                  <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="Foto bij de aanvraag" className="aspect-square w-full border border-paper-line object-cover" />
                  </a>
                ))}
              </div>
            </section>
          )}

          <section className="border border-paper-line bg-paper p-5">
            <h2 className="font-sans text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">Interne notities</h2>
            <NotesForm id={quote.id} notes={quote.notes ?? ""} />
          </section>
        </div>

        <aside className="space-y-5">
          <section className="border border-paper-line bg-paper p-5">
            <h2 className="font-sans text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">Status</h2>
            <StatusForm id={quote.id} status={quote.status} />
          </section>

          <section className="border border-paper-line bg-paper p-5">
            <h2 className="font-sans text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">Gegevens</h2>
            <dl className="mt-3 space-y-2.5 text-[0.85rem]">
              {[
                ["E-mail", quote.email],
                ["Telefoon", quote.phone],
                ["Woonplaats", quote.city ?? "—"],
                ["Dienst", quote.serviceName ?? "Algemeen"],
                ["Startdatum", quote.startDate ?? "—"],
                ["Budget", quote.budget ?? "—"],
                ["Contactvoorkeur", quote.contactPref],
                ["Bron", quote.source],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right break-words">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <DeleteForm id={quote.id} />
        </aside>
      </div>
    </div>
  );
}
