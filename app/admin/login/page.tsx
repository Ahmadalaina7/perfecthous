import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Container } from "@/components/ui/section";
import { Logo } from "@/components/brand/logo";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Inloggen beheer",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <div className="grid min-h-screen place-items-center bg-ink px-5 py-12">
      <div className="w-full max-w-[400px]">
        <div className="mb-7 flex justify-center">
          <Logo tone="paper" markSize={44} />
        </div>
        <div className="bg-paper p-7 md:p-8">
          <h1 className="text-[1.5rem] leading-tight">Beheerpaneel</h1>
          <p className="mt-1.5 mb-6 text-[0.85rem] leading-relaxed text-muted">
            Log in met het beheerdersaccount. Geen toegang? Vraag de eigenaar om een account.
          </p>
          <LoginForm />
        </div>
        <p className="mt-5 text-center font-sans text-[0.72rem] text-paper/40">
          Alleen voor geautoriseerde medewerkers van Perfecthous.
        </p>
      </div>
    </div>
  );
}
