import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { saveReview, deleteReview } from "@/app/actions/admin";
import { Panel, Field, adminInput, adminTextarea, Submit } from "@/components/admin/panel";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { Stars } from "@/components/stars";

export const dynamic = "force-dynamic";

function ReviewForm({
  review,
}: {
  review?: {
    id: string;
    author: string;
    city: string;
    rating: number;
    body: string;
    service: string | null;
    published: boolean;
    order: number;
  };
}) {
  return (
    <form action={saveReview} className="grid gap-4 sm:grid-cols-2">
      {review && <input type="hidden" name="id" value={review.id} />}
      <Field label="Naam *">
        <input name="author" required defaultValue={review?.author} className={adminInput} />
      </Field>
      <Field label="Woonplaats">
        <input name="city" defaultValue={review?.city ?? "Vlissingen"} className={adminInput} />
      </Field>
      <Field label="Dienst">
        <input name="service" defaultValue={review?.service ?? ""} placeholder="Bijv. Badkamer & keuken" className={adminInput} />
      </Field>
      <Field label="Sterren">
        <select name="rating" defaultValue={String(review?.rating ?? 5)} className={adminInput}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{n} van 5</option>
          ))}
        </select>
      </Field>
      <Field label="Reviewtekst" className="sm:col-span-2">
        <textarea name="body" rows={4} defaultValue={review?.body} className={adminTextarea} />
      </Field>
      <Field label="Volgorde">
        <input name="order" type="number" defaultValue={review?.order ?? 0} className={adminInput} />
      </Field>
      <div className="flex items-end">
        <label className="inline-flex items-center gap-2 pb-2 font-sans text-[0.84rem]">
          <input type="checkbox" name="published" defaultChecked={review?.published ?? true} className="size-4 accent-[#1a1d21]" />
          Zichtbaar op de site
        </label>
      </div>
      <div className="sm:col-span-2">
        <Submit>{review ? "Opslaan" : "Review toevoegen"}</Submit>
      </div>
    </form>
  );
}

export default async function AdminReviews() {
  await requireAdmin();
  const reviews = await prisma.review.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-[1.8rem] leading-tight">Reviews</h1>
      <p className="mt-1.5 max-w-[70ch] text-[0.9rem] leading-relaxed text-muted">
        Voer alleen reviews in die u echt heeft ontvangen, met toestemming van de klant. Verzonnen
        reviews zijn misleidend en schaden het vertrouwen — ook bij een controle door Google.
      </p>

      <div className="mt-6">
        <Panel title="Nieuwe review" openLabel="Toevoegen">
          <ReviewForm />
        </Panel>
      </div>

      <ul className="mt-6 space-y-3">
        {reviews.map((r) => (
          <li key={r.id} className="border border-paper-line bg-paper">
            <div className="flex flex-wrap items-start gap-3 px-5 py-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5">
                  <p className="font-sans text-[0.9rem] font-medium">{r.author}</p>
                  <Stars rating={r.rating} size={12} />
                  {!r.published && (
                    <span className="rounded-full border border-ink/15 px-2 py-0.5 font-sans text-[0.62rem] text-muted">verborgen</span>
                  )}
                </div>
                <p className="mt-0.5 font-sans text-[0.74rem] text-muted">
                  {r.city}
                  {r.service ? ` · ${r.service}` : ""}
                </p>
                <p className="mt-2 line-clamp-2 max-w-[70ch] text-[0.85rem] leading-relaxed text-ink/80">{r.body}</p>
              </div>
              <form action={deleteReview}>
                <input type="hidden" name="id" value={r.id} />
                <ConfirmButton>Verwijderen</ConfirmButton>
              </form>
            </div>
            <div className="border-t border-paper-line/70 px-5 pb-5">
              <details>
                <summary className="cursor-pointer py-3 font-sans text-[0.78rem] text-ink/70 hover:text-ink">Bewerken</summary>
                <div className="pt-1">
                  <ReviewForm review={r} />
                </div>
              </details>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
