"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/app/actions/upload";
import { adminInput } from "@/components/admin/panel";

/**
 * Fotoveld met uploadknop voor het beheer. Na upload vullen we het tekstveld
 * met het pad, zodat de server action gewoon één string ontvangt en er geen
 * tweede formulierlogica nodig is.
 */
export function ImageField({
  name,
  label,
  defaultValue = "",
  hint,
  preview = true,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  hint?: string;
  preview?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setBusy(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadImage(fd);
    if (result.error) setError(result.error);
    else if (result.path) setValue(result.path);
    setBusy(false);
  };

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block font-sans text-[0.76rem] font-medium text-ink">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={name}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="/images/maps-keuken.jpg"
          className={adminInput}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="min-h-10 shrink-0 rounded-[2px] border border-ink/20 px-3 font-sans text-[0.78rem] text-ink hover:border-ink/45 disabled:opacity-60"
        >
          {busy ? "Uploaden…" : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
            e.target.value = "";
          }}
        />
      </div>
      {hint && <p className="mt-1 text-[0.72rem] leading-snug text-muted">{hint}</p>}
      {error && <p className="mt-1 text-[0.72rem] text-[#9c3b2b]">{error}</p>}
      {preview && value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Voorbeeld" className="mt-2 h-20 w-28 border border-paper-line object-cover" />
      )}
    </div>
  );
}
