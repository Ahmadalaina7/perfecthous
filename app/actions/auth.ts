"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import { rateLimit, hashIp, clientIp } from "@/lib/rate-limit";

export type LoginState = { status: "idle" } | { status: "error"; message: string } | { status: "success" };

/** Inloggen via een server action, met rate limiting tegen brute force. */
export async function signInAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const h = await headers();
  const ip = clientIp(h);
  const limit = await rateLimit(`login:${hashIp(ip)}`, 10, 15 * 60 * 1000);
  if (!limit.ok) {
    return { status: "error", message: "Te veel inlogpogingen. Probeer het over een kwartier opnieuw." };
  }

  try {
    await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirect: false,
    });
    return { status: "success" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { status: "error", message: "E-mailadres of wachtwoord klopt niet." };
    }
    throw error;
  }
}
