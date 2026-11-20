import type { SVGProps } from "react";

/**
 * Eén iconenset, getekend op een 24×24-raster met 1,5px lijn.
 * Alle iconen delen dezelfde lijndikte en ronding, zodat ze naast elkaar
 * als één familie lezen. `stroke` staat op currentColor.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 24) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  focusable: "false" as const,
});

export function IconVerbouw({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </svg>
  );
}

export function IconAanbouw({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M2 20h20" />
      <path d="M4 20V11l7-5 7 5v9" />
      <path d="M11 20v-4.5h4V20" />
      <path d="M18 20h4v-6l-4-3" />
    </svg>
  );
}

export function IconVloeren({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="2.5" y="14" width="19" height="6.5" rx="0.5" />
      <path d="M2.5 17.2h19M8 14v3.2M14.5 17.2V20M19 14v3.2" />
      <path d="M6 11.5h5M13 8.5h6M4.5 5h5" />
    </svg>
  );
}

export function IconTegelwerk({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="0.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="0.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="0.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="0.5" />
    </svg>
  );
}

export function IconStucwerk({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M14.5 3.5 20.5 9.5 12 18H6v-6z" />
      <path d="M11 7l6 6" />
      <path d="M3 21h7" />
    </svg>
  );
}

export function IconBadkamer({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M3 12h18v2.5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
      <path d="M6 12V6.5A2.5 2.5 0 0 1 8.5 4c1.3 0 2.3.9 2.5 2" />
      <path d="M7 21l.8-2M17 21l-.8-2" />
    </svg>
  );
}

export function IconKeuken({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M3 10h18" />
      <path d="M8 10v10M16 10v10" />
      <path d="M6 6.6h1.6M13.6 6.6h1.6" />
    </svg>
  );
}

export function IconTimmerwerk({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12.5 3.5 20 11l-3.5 3.5-7.5-7.5z" />
      <path d="M9 7 3.5 12.5a1.8 1.8 0 0 0 0 2.5l1.5 1.5a1.8 1.8 0 0 0 2.5 0L14.5 11" />
      <path d="M5 19.5l2-2" />
    </svg>
  );
}

export function IconLoodgieter({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 3s5.5 6.2 5.5 10a5.5 5.5 0 1 1-11 0C6.5 9.2 12 3 12 3z" />
      <path d="M9.6 14.2a2.6 2.6 0 0 0 2.4 2.4" />
    </svg>
  );
}

export function IconElektra({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M13 2.2 4.6 13.6h5.9l-1 8.2 9.9-11.4h-5.8z" />
    </svg>
  );
}

export function IconKlussen({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M15.5 3.5a4.5 4.5 0 0 0-4.1 6.2L3.9 17.2a1.9 1.9 0 0 0 2.7 2.7l7.5-7.5A4.5 4.5 0 1 0 15.5 3.5z" />
      <circle cx="16.4" cy="7.6" r="1.1" />
    </svg>
  );
}

export function IconDak({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M2 12 12 4l10 8" />
      <path d="M4.5 10.5V20h15v-9.5" />
      <path d="M8.5 20v-4h7v4" />
    </svg>
  );
}

export function IconSchilder({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3" y="3.5" width="13" height="6" rx="1" />
      <path d="M16 6.5h3.5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5H11" />
      <path d="M11 12.5v2a1.5 1.5 0 0 0 1.5 1.5H13a1 1 0 0 1 1 1V21" />
      <path d="M8 9.5v3" />
    </svg>
  );
}

/** Fallback voor onbekende iconnamen uit de database. */
export function IconHammer({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M14.5 3 21 9.5l-2.4 2.4-2.2-2.2-6.9 6.9-2.6-2.6 6.9-6.9L11.6 5z" />
      <path d="M8.4 15.7 4 20.1a1.7 1.7 0 0 1-2.4-2.4l4.4-4.4" />
    </svg>
  );
}

/* ---------- UI-iconen ---------- */

export function IconPhone({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M6.2 3.5H8a1.5 1.5 0 0 1 1.5 1.3c.1 1 .4 1.9.7 2.8a1.5 1.5 0 0 1-.4 1.6L9 10a12.5 12.5 0 0 0 5 5l.8-.8a1.5 1.5 0 0 1 1.6-.4c.9.3 1.8.6 2.8.7A1.5 1.5 0 0 1 20.5 16v1.8a1.7 1.7 0 0 1-1.8 1.7A16.4 16.4 0 0 1 4.5 5.3a1.7 1.7 0 0 1 1.7-1.8z" />
    </svg>
  );
}

export function IconMail({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function IconPin({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconClock({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  );
}

export function IconArrow({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M4 12h15M13 5.5l6.5 6.5-6.5 6.5" />
    </svg>
  );
}

export function IconCheck({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function IconStar({ size, ...p }: IconProps) {
  return (
    <svg
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
      {...p}
    >
      <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5L2.5 9.5l6.6-.9z" />
    </svg>
  );
}

export function IconWhatsapp({ size, ...p }: IconProps) {
  return (
    <svg width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.86 9.86 0 0 0 4.68 1.19h.01c5.43 0 9.84-4.4 9.84-9.84A9.78 9.78 0 0 0 12.04 2zm0 17.98h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.3c0-4.52 3.68-8.2 8.2-8.2a8.15 8.15 0 0 1 5.8 2.4 8.15 8.15 0 0 1 2.4 5.8c0 4.53-3.68 8.14-8.2 8.14zm4.5-6.1c-.25-.13-1.46-.72-1.68-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.21 7.4 7.4 0 0 1-1.36-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.65 4.2 3.71.58.26 1.04.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.48-.29z" />
    </svg>
  );
}

export function IconMenu({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  );
}

export function IconClose({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconChevron({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconQuote({ size, ...p }: IconProps) {
  return (
    <svg width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M9.6 5C6.5 6.3 4.6 9 4.6 12.2c0 3.6 2 5.8 4.6 5.8 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.7 0-1 .1.4-1.6 1.6-2.9 3.3-3.7L9.6 5zm8.6 0c-3.1 1.3-5 4-5 7.2 0 3.6 2 5.8 4.6 5.8 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.7 0-1 .1.4-1.6 1.6-2.9 3.3-3.7L18.2 5z" />
    </svg>
  );
}

/* ---------- Naam -> component, voor data uit de database ---------- */

const registry = {
  verbouw: IconVerbouw,
  aanbouw: IconAanbouw,
  vloeren: IconVloeren,
  tegelwerk: IconTegelwerk,
  stucwerk: IconStucwerk,
  badkamer: IconBadkamer,
  keuken: IconKeuken,
  timmerwerk: IconTimmerwerk,
  loodgieter: IconLoodgieter,
  elektra: IconElektra,
  klussen: IconKlussen,
  dak: IconDak,
  schilder: IconSchilder,
  hammer: IconHammer,
} as const;

export type IconName = keyof typeof registry;

export function ServiceIcon({ name, ...props }: { name: string } & IconProps) {
  const Cmp = registry[name as IconName] ?? IconHammer;
  return <Cmp {...props} />;
}
