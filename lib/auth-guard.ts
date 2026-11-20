import { auth } from "@/auth";
import { redirect } from "next/navigation";

/** Haalt de beheerder op of stuurt naar de loginpagina. */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session.user;
}
