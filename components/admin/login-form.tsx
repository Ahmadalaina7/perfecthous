"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signInAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input, Label, ErrorText } from "@/components/ui/form";

export function LoginForm() {
  const [state, action, pending] = useActionState(signInAction, { status: "idle" as const });
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success") router.replace("/admin");
  }, [state, router]);

  return (
    <form action={action} className="space-y-4">
      {state.status === "error" && (
        <div role="alert" className="border-l-2 border-[#9c3b2b] bg-[#9c3b2b]/[0.06] px-4 py-3 text-[0.85rem] text-[#7d2f22]">
          {state.message}
        </div>
      )}
      <div>
        <Label htmlFor="email">E-mailadres</Label>
        <Input id="email" name="email" type="email" autoComplete="username" required autoFocus />
      </div>
      <div>
        <Label htmlFor="password">Wachtwoord</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <Button type="submit" size="md" pending={pending} className="w-full">
        Inloggen
      </Button>
    </form>
  );
}
