import Link from "next/link";
import { fontClassName } from "@/app/fonts";
import { Container } from "@/components/ui/section";
import "./globals.css";

/**
 * 404 voor URL's die op geen enkele route passen (dus ook buiten /nl, /en, /ar).
 * Next rendert dit bestand zonder de gewone layouts, vandaar de eigen <html>.
 * De taal van de bezoeker is hier onbekend, dus staan de drie talen naast elkaar.
 */
export default function GlobalNotFound() {
  return (
    <html lang="nl" className={fontClassName}>
      <body>
        <section className="relative flex min-h-screen items-center bg-paper">
          <Container className="py-20">
            <div className="mx-auto max-w-[64ch]">
              <p className="font-display text-[clamp(5rem,18vw,11rem)] leading-none text-brass/25 select-none">
                404
              </p>
              <h1 className="-mt-4 text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.05]">
                Deze pagina bestaat niet · This page does not exist · هذه الصفحة غير موجودة
              </h1>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                Misschien is de link verouderd. · The link may be outdated. · ربما يكون الرابط قديمًا.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/nl"
                  className="inline-flex min-h-12 items-center justify-center rounded-[2px] border border-ink bg-ink px-6 font-sans text-[0.85rem] font-medium tracking-wide text-paper"
                >
                  Naar de homepage
                </Link>
                <Link
                  href="/en"
                  className="inline-flex min-h-12 items-center justify-center rounded-[2px] border border-ink/25 px-6 font-sans text-[0.85rem] font-medium tracking-wide text-ink"
                >
                  Go to homepage
                </Link>
                <Link
                  href="/ar"
                  className="inline-flex min-h-12 items-center justify-center rounded-[2px] border border-ink/25 px-6 font-sans text-[0.85rem] font-medium tracking-wide text-ink"
                  lang="ar"
                >
                  إلى الصفحة الرئيسية
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </body>
    </html>
  );
}
