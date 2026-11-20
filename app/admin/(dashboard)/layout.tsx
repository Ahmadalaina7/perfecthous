import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Container } from "@/components/ui/section";
import { Logo } from "@/components/brand/logo";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata: Metadata = {
  title: "Beheer",
  robots: { index: false, follow: false },
};

/**
 * Layout voor het beheerpaneel. De loginpagina zit in een aparte routegroep,
 * zodat die deze beveiliging niet erft.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-paper-dim">
      <div className="border-b border-paper-line bg-paper">
        <Container className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" aria-label="Naar het beheeroverzicht">
              <Logo markSize={30} showTagline={false} />
            </Link>
            <span className="hidden font-sans text-[0.66rem] font-semibold tracking-[0.16em] text-brass-ink uppercase sm:inline">
              Beheer
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden font-sans text-[0.8rem] text-muted hover:text-ink sm:inline">
              Naar de site
            </Link>
            <span className="hidden font-sans text-[0.8rem] text-muted md:inline">{session.user.email}</span>
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="min-h-9 rounded-[2px] border border-ink/20 px-3 font-sans text-[0.78rem] text-ink transition-colors hover:border-ink/45"
              >
                Uitloggen
              </button>
            </form>
          </div>
        </Container>
      </div>

      <Container className="py-6 lg:py-9">
        <div className="lg:grid lg:grid-cols-[210px_1fr] lg:gap-9">
          <AdminNav />
          <div className="mt-6 min-w-0 lg:mt-0">{children}</div>
        </div>
      </Container>
    </div>
  );
}
