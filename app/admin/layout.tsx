import type { Metadata } from "next";
import { fontClassName } from "@/app/fonts";
import { site } from "@/lib/site";
import "../globals.css";

/**
 * Root-layout van het beheerpaneel. De publieke site heeft een eigen root-layout
 * onder `app/[locale]`, omdat daar `lang` en `dir` per taal verschillen. Het
 * beheer blijft bewust Nederlandstalig: dat is het werk van de eigenaar.
 */
export const metadata: Metadata = {
  title: { default: `Beheer | ${site.name}`, template: `%s | Beheer` },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" data-scroll-behavior="smooth" className={fontClassName}>
      <body>{children}</body>
    </html>
  );
}
