"use client";

import { useFormStatus } from "react-dom";

/** Verwijderknop met bevestiging; werkt binnen een server-action formulier. */
export function ConfirmButton({
  children,
  message = "Weet u het zeker? Dit kan niet ongedaan worden gemaakt.",
  className,
}: {
  children: React.ReactNode;
  message?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className={className ?? "min-h-9 rounded-[2px] px-2 py-1 font-sans text-[0.68rem] text-[#7d2f22] hover:bg-[#9c3b2b]/10"}
    >
      {pending ? "Bezig…" : children}
    </button>
  );
}
