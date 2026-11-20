import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Formuliervelden met consistente maatvoering: 52px hoog, 16px tekst
   (voorkomt iOS-zoom), duidelijke focusrand. */

const fieldBase =
  "w-full min-h-[52px] rounded-[2px] border border-ink/20 bg-white/60 px-4 py-3 font-sans text-base text-ink " +
  "placeholder:text-muted/70 transition-[border-color,background-color,box-shadow] duration-200 " +
  "hover:border-ink/40 focus:border-ink focus:bg-white focus:outline-none focus:ring-1 focus:ring-ink " +
  "aria-[invalid=true]:border-[#9c3b2b] aria-[invalid=true]:ring-[#9c3b2b]";

export function Label({ className, children, ...rest }: ComponentProps<"label">) {
  return (
    <label className={cn("mb-2 block font-sans text-[0.8125rem] font-medium tracking-wide text-ink", className)} {...rest}>
      {children}
    </label>
  );
}

export function Hint({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("mt-1.5 text-[0.75rem] leading-snug text-muted", className)}>{children}</p>;
}

export function ErrorText({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return (
    <p
      className="mt-1.5 flex animate-[field-error-in_180ms_ease-out] items-start gap-1.5 text-[0.78rem] leading-snug text-[#9c3b2b]"
      role="alert"
    >
      <span aria-hidden className="mt-px">!</span>
      {children}
    </p>
  );
}

export function Input({ className, ...rest }: ComponentProps<"input">) {
  return <input className={cn(fieldBase, className)} {...rest} />;
}

export function Textarea({ className, ...rest }: ComponentProps<"textarea">) {
  return <textarea className={cn(fieldBase, "min-h-[132px] resize-y", className)} {...rest} />;
}

export function Select({ className, children, ...rest }: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        fieldBase,
        "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%231a1d21%22 stroke-width=%221.5%22 stroke-linecap=%22round%22%3E%3Cpath d=%22m3 6 5 5 5-5%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10",
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  );
}

export function Fieldset({ className, children, ...rest }: ComponentProps<"fieldset">) {
  return (
    <fieldset className={cn("min-w-0 border-0 p-0", className)} {...rest}>
      {children}
    </fieldset>
  );
}

export function Legend({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <legend className={cn("mb-2 font-sans text-[0.8125rem] font-medium tracking-wide text-ink", className)}>
      {children}
    </legend>
  );
}

/** Groep keuzerondjes als kaartjes: groot raakvlak, duidelijke geselecteerde staat. */
export function RadioCard({
  name,
  value,
  label,
  description,
  defaultChecked,
  icon,
}: {
  name: string;
  value: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
  icon?: ReactNode;
}) {
  return (
    <label className="group relative flex cursor-pointer items-start gap-3 rounded-[2px] border border-ink/15 bg-white/60 p-4 transition-colors hover:border-ink/35 has-[:checked]:border-ink has-[:checked]:bg-ink/[0.045] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink">
      <input type="radio" name={name} value={value} defaultChecked={defaultChecked} className="peer sr-only" />
      {icon && <span className="mt-0.5 shrink-0 text-ink/70">{icon}</span>}
      <span className="min-w-0">
        <span className="block font-sans text-[0.9375rem] font-medium text-ink">{label}</span>
        {description && <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">{description}</span>}
      </span>
      <span
        aria-hidden
        className="mt-1 ml-auto size-4 shrink-0 rounded-full border border-ink/30 transition-colors peer-checked:border-[5px] peer-checked:border-ink"
      />
    </label>
  );
}
