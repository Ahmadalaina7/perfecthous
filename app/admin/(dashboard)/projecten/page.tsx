import { prisma, lines } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { saveProject, deleteProject } from "@/app/actions/admin";
import { Panel, Field, adminInput, adminTextarea, Submit } from "@/components/admin/panel";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { ImageField } from "@/components/admin/image-field";

export const dynamic = "force-dynamic";

const categories = [
  "Verbouwing & renovatie",
  "Aanbouw & uitbouw",
  "Badkamer & keuken",
  "Tegelwerk",
  "Stucwerk",
  "Timmerwerk",
  "Loodgieterswerk",
  "Elektrisch werk",
  "Buitenwerk",
];

function ProjectForm({
  project,
}: {
  project?: {
    id: string;
    title: string;
    slug: string;
    category: string;
    location: string;
    year: number | null;
    summary: string;
    description: string;
    coverImage: string;
    gallery: string;
    beforeImage: string | null;
    afterImage: string | null;
    featured: boolean;
    published: boolean;
    order: number;
  };
}) {
  return (
    <form action={saveProject} className="grid gap-4 sm:grid-cols-2">
      {project && <input type="hidden" name="id" value={project.id} />}
      <Field label="Titel *">
        <input name="title" required defaultValue={project?.title} className={adminInput} />
      </Field>
      <Field label="Slug" hint="Leeg = automatisch uit de titel.">
        <input name="slug" defaultValue={project?.slug} className={adminInput} />
      </Field>
      <Field label="Categorie">
        <select name="category" defaultValue={project?.category ?? categories[0]} className={adminInput}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Field>
      <Field label="Locatie">
        <input name="location" defaultValue={project?.location ?? "Vlissingen"} className={adminInput} />
      </Field>
      <Field label="Jaar">
        <input name="year" type="number" min={1990} max={2100} defaultValue={project?.year ?? new Date().getFullYear()} className={adminInput} />
      </Field>
      <Field label="Volgorde">
        <input name="order" type="number" defaultValue={project?.order ?? 0} className={adminInput} />
      </Field>
      <Field label="Korte samenvatting" className="sm:col-span-2" hint="Verschijnt op kaarten in het projectoverzicht.">
        <textarea name="summary" rows={2} defaultValue={project?.summary} className={adminTextarea} />
      </Field>
      <Field label="Beschrijving" className="sm:col-span-2">
        <textarea name="description" rows={5} defaultValue={project?.description} className={adminTextarea} />
      </Field>

      <div className="sm:col-span-2">
        <ImageField
          name="coverImage"
          label="Hoofdfoto"
          defaultValue={project?.coverImage}
          hint="Upload een foto of typ een bestaand pad, bijv. /images/maps-keuken.jpg."
        />
      </div>
      <Field label="Galerij" className="sm:col-span-2" hint="Eén pad per regel.">
        <textarea name="gallery" rows={3} defaultValue={project?.gallery} className={adminTextarea} />
      </Field>
      <ImageField name="beforeImage" label="Voor-foto (voor/na)" defaultValue={project?.beforeImage ?? ""} />
      <ImageField name="afterImage" label="Na-foto (voor/na)" defaultValue={project?.afterImage ?? ""} />

      <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
        <label className="inline-flex items-center gap-2 font-sans text-[0.84rem]">
          <input type="checkbox" name="featured" defaultChecked={project?.featured} className="size-4 accent-[#1a1d21]" />
          Uitgelicht op de homepage
        </label>
        <label className="inline-flex items-center gap-2 font-sans text-[0.84rem]">
          <input type="checkbox" name="published" defaultChecked={project?.published ?? true} className="size-4 accent-[#1a1d21]" />
          Gepubliceerd
        </label>
      </div>

      <div className="sm:col-span-2">
        <Submit>{project ? "Wijzigingen opslaan" : "Project toevoegen"}</Submit>
      </div>
    </form>
  );
}

export default async function AdminProjecten() {
  await requireAdmin();
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-[1.8rem] leading-tight">Projecten</h1>
      <p className="mt-1.5 text-[0.9rem] text-muted">
        Voeg werk toe of pas bestaande projecten aan. Foto's uploadt u via het offerteformulier of zet u in
        <code className="mx-1 rounded bg-ink/[0.06] px-1 text-[0.8em]">public/uploads</code>.
      </p>

      <div className="mt-6">
        <Panel title="Nieuw project" openLabel="Toevoegen">
          <ProjectForm />
        </Panel>
      </div>

      <ul className="mt-6 space-y-3">
        {projects.map((p) => (
          <li key={p.id} className="border border-paper-line bg-paper">
            <div className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[0.9rem] font-medium">
                  {p.title}
                  {!p.published && (
                    <span className="ml-2 rounded-full border border-ink/15 px-2 py-0.5 font-sans text-[0.64rem] font-normal text-muted">
                      concept
                    </span>
                  )}
                  {p.featured && (
                    <span className="ml-2 rounded-full border border-brass/40 bg-brass/10 px-2 py-0.5 font-sans text-[0.64rem] font-normal text-brass-ink">
                      uitgelicht
                    </span>
                  )}
                </p>
                <p className="mt-0.5 font-sans text-[0.76rem] text-muted">
                  /projecten/{p.slug} · {p.category} · {p.location}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a href={`/projecten/${p.slug}`} target="_blank" rel="noopener noreferrer" className="font-sans text-[0.76rem] text-muted hover:text-ink">
                  Bekijken
                </a>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmButton>Verwijderen</ConfirmButton>
                </form>
              </div>
            </div>
            <div className="border-t border-paper-line/70 px-5 pb-5">
              <details>
                <summary className="cursor-pointer py-3 font-sans text-[0.78rem] text-ink/70 hover:text-ink">
                  Bewerken
                </summary>
                <div className="pt-1">
                  <ProjectForm project={{ ...p, gallery: lines(p.gallery).join("\n") }} />
                </div>
              </details>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
