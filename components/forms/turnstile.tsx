"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cloudflare Turnstile. Wordt alleen gerenderd als er een site key is
 * geconfigureerd; zonder sleutel vertrouwt het formulier op honeypot +
 * rate limiting. Het script wordt pas geladen als de widget in beeld komt.
 */
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!siteKey) return;
    if (document.querySelector('script[data-turnstile]')) {
      setReady(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.dataset.turnstile = "1";
    s.onload = () => setReady(true);
    document.head.appendChild(s);
  }, [siteKey]);

  useEffect(() => {
    if (!ready || !siteKey || !ref.current) return;
    const w = window as unknown as {
      turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => void };
    };
    if (!w.turnstile) return;
    w.turnstile.render(ref.current, {
      sitekey: siteKey,
      theme: "light",
      callback: onToken,
      "expired-callback": () => onToken(""),
    });
  }, [ready, siteKey, onToken]);

  if (!siteKey) return null;
  return <div ref={ref} className="mt-2" />;
}

/** Verborgen veld dat de token meestuurt met het formulier. */
export function TurnstileField({ token }: { token: string }) {
  return <input type="hidden" name="turnstileToken" value={token} />;
}
