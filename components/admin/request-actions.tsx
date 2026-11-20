"use client";

import { useFormStatus } from "react-dom";
import { updateQuoteStatus, updateQuoteNotes, deleteQuote } from "@/app/actions/admin";
import { cn } from "@/lib/utils";

const options = [
  { value: "new", label: "Nieuw" },
  { value: "in_progress", label: "In behandeling" },
  { value: "done", label: "Afgerond" },
  { value: "spam", label: "Spam" },
];

function Pending({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <span className={cn(pending && "opacity-60")}>{children}</span>
  );
}

/** Statuswijziging in één klik: elk knopje submit zijn eigen status. */
export function StatusForm({ id, status }: { id: string; status: string }) {
  return (
    <form action={updateQuoteStatus} className="mt-3 grid gap-1.5">
      <input type="hidden" name="id" value={id} />
      {options.map((o) => (
        <button
          key={o.value}
          type="submit"
          name="status"
          value={o.value}
          className={cn(
            "min-h-9 rounded-[2px] border px-3 text-left font-sans text-[0.8rem] transition-colors",
            status === o.value
              ? "border-ink bg-ink text-paper"
              : "border-ink/15 text-ink/75 hover:border-ink/40",
          )}
        >
          <Pending>{o.label}</Pending>
        </button>
      ))}
    </form>
  );
}

export function NotesForm({ id, notes }: { id: string; notes: string }) {
  return (
    <form action={updateQuoteNotes} className="mt-3">
      <input type="hidden" name="id" value={id} />
      <textarea
        name="notes"
        defaultValue={notes}
        rows={4}
        placeholder="Bijv. gebeld op 12-11, afspraak voor opname woensdag."
        className="w-full rounded-[2px] border border-ink/20 bg-white/70 px-3 py-2 font-sans text-[0.85rem] focus:border-ink focus:outline-none"
      />
      <button type="submit" className="mt-2 min-h-9 rounded-[2px] bg-ink px-4 font-sans text-[0.78rem] text-paper">
        <Pending>Notitie opslaan</Pending>
      </button>
    </form>
  );
}

export function DeleteForm({ id }: { id: string }) {
  return (
    <form
      action={deleteQuote}
      className="border border-[#9c3b2b]/25 bg-[#9c3b2b]/[0.04] p-5"
      onSubmit={(e) => {
        if (!window.confirm("Deze aanvraag definitief verwijderen?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <p className="text-[0.82rem] leading-relaxed text-[#7d2f22]">
        Verwijderen kan niet ongedaan worden gemaakt. Overweeg bij spam de status op "Spam" te zetten, dan blijft de
        geschiedenis intact.
      </p>
      <button type="submit" className="mt-3 min-h-9 rounded-[2px] border border-[#9c3b2b]/40 px-4 font-sans text-[0.78rem] text-[#7d2f22] hover:bg-[#9c3b2b]/10">
        <Pending>Definitief verwijderen</Pending>
      </button>
    </form>
  );
}
