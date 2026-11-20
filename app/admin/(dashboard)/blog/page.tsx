import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { savePost, deletePost } from "@/app/actions/admin";
import { Panel, Field, adminInput, adminTextarea, Submit } from "@/components/admin/panel";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { ImageField } from "@/components/admin/image-field";
import { formatDateNl } from "@/lib/utils";

export const dynamic = "force-dynamic";

function PostForm({
  post,
}: {
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    coverImage: string | null;
    published: boolean;
  };
}) {
  return (
    <form action={savePost} className="grid gap-4 sm:grid-cols-2">
      {post && <input type="hidden" name="id" value={post.id} />}
      <Field label="Titel *">
        <input name="title" required defaultValue={post?.title} className={adminInput} />
      </Field>
      <Field label="Slug" hint="Leeg = automatisch uit de titel.">
        <input name="slug" defaultValue={post?.slug} className={adminInput} />
      </Field>
      <Field label="Categorie">
        <input name="category" defaultValue={post?.category ?? "Tips"} className={adminInput} />
      </Field>
      <ImageField name="coverImage" label="Omslagfoto" defaultValue={post?.coverImage ?? ""} />
      <Field label="Samenvatting" className="sm:col-span-2" hint="Verschijnt in het overzicht en in de meta description.">
        <textarea name="excerpt" rows={2} defaultValue={post?.excerpt} className={adminTextarea} />
      </Field>
      <Field
        label="Inhoud (Markdown)"
        className="sm:col-span-2"
        hint="Gebruik ## voor een kop, **vet**, - voor een lijst en [tekst](/pad) voor een link. HTML wordt niet uitgevoerd."
      >
        <textarea name="content" rows={16} defaultValue={post?.content} className={adminTextarea + " font-mono text-[0.8rem]"} />
      </Field>
      <div className="flex items-center gap-2 sm:col-span-2">
        <label className="inline-flex items-center gap-2 font-sans text-[0.84rem]">
          <input type="checkbox" name="published" defaultChecked={post?.published} className="size-4 accent-[#1a1d21]" />
          Publiceren
        </label>
      </div>
      <div className="sm:col-span-2">
        <Submit>{post ? "Opslaan" : "Artikel toevoegen"}</Submit>
      </div>
    </form>
  );
}

export default async function AdminBlog() {
  await requireAdmin();
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-[1.8rem] leading-tight">Blog / kennisbank</h1>
      <p className="mt-1.5 text-[0.9rem] text-muted">
        Artikelen verschijnen op /blog. Concepten zijn alleen hier zichtbaar.
      </p>

      <div className="mt-6">
        <Panel title="Nieuw artikel" openLabel="Schrijven">
          <PostForm />
        </Panel>
      </div>

      <ul className="mt-6 space-y-3">
        {posts.map((p) => (
          <li key={p.id} className="border border-paper-line bg-paper">
            <div className="flex flex-wrap items-center gap-3 px-5 py-4">
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[0.9rem] font-medium">
                  {p.title}
                  {!p.published && (
                    <span className="ml-2 rounded-full border border-ink/15 px-2 py-0.5 font-sans text-[0.62rem] font-normal text-muted">concept</span>
                  )}
                </p>
                <p className="mt-0.5 font-sans text-[0.74rem] text-muted">
                  {p.category} · {p.publishedAt ? formatDateNl(p.publishedAt) : "niet gepubliceerd"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {p.published && (
                  <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="font-sans text-[0.76rem] text-muted hover:text-ink">
                    Bekijken
                  </a>
                )}
                <form action={deletePost}>
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmButton>Verwijderen</ConfirmButton>
                </form>
              </div>
            </div>
            <div className="border-t border-paper-line/70 px-5 pb-5">
              <details>
                <summary className="cursor-pointer py-3 font-sans text-[0.78rem] text-ink/70 hover:text-ink">Bewerken</summary>
                <div className="pt-1">
                  <PostForm post={p} />
                </div>
              </details>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
