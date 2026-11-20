"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overzicht", exact: true },
  { href: "/admin/aanvragen", label: "Offerteaanvragen" },
  { href: "/admin/berichten", label: "Contactberichten" },
  { href: "/admin/projecten", label: "Projecten" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/blog", label: "Blog" },
];

export function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav aria-label="Beheermenu" className="lg:sticky lg:top-6 lg:self-start">
      <ul className="-mx-1 flex gap-1 overflow-x-auto pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:pb-0">
        {links.map((l) => (
          <li key={l.href} className="shrink-0">
            <Link
              href={l.href}
              aria-current={isActive(l.href, l.exact) ? "page" : undefined}
              className={cn(
                "flex min-h-10 items-center whitespace-nowrap rounded-[2px] px-3 font-sans text-[0.84rem] transition-colors",
                isActive(l.href, l.exact)
                  ? "bg-ink text-paper"
                  : "text-ink/70 hover:bg-ink/[0.05] hover:text-ink",
              )}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
