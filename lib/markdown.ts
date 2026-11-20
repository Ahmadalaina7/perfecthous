/**
 * Kleine Markdown-renderer voor blogberichten. Bewust beperkt tot de subset
 * die we in de admin aanbieden: koppen (##, ###), alinea's, lijsten, **vet**,
 * *cursief*, `code` en [links](url). Geen HTML-passthrough: de inhoud komt
 * uit de database en mag nooit als ruwe HTML worden uitgevoerd.
 */

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Inline opmaak: eerst escapen, dan patronen vervangen door tags. */
function inline(text: string) {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, '<code class="rounded bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.9em]">$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g,
    (_m, label: string, href: string) =>
      `<a class="link-underline font-medium text-ink" href="${href}">${label}</a>`,
  );
  return out;
}

export function renderMarkdown(md: string): string {
  const blocks = md.trim().split(/\n{2,}/);
  const html: string[] = [];
  let list: string[] | null = null;
  let ordered = false;

  const flushList = () => {
    if (!list) return;
    const tag = ordered ? "ol" : "ul";
    const cls = ordered
      ? "mt-5 list-decimal space-y-2 pl-5 text-muted"
      : "mt-5 list-disc space-y-2 pl-5 text-muted";
    html.push(`<${tag} class="${cls}">${list.map((li) => `<li>${inline(li)}</li>`).join("")}</${tag}>`);
    list = null;
  };

  for (const block of blocks) {
    const lines = block.split("\n").filter((l) => l.trim().length > 0);
    if (lines.length === 0) continue;

    // Lijstitems (kunnen meerdere blokken vullen als er geen lege regel tussen zit)
    const isOrdered = lines.every((l) => /^\d+\.\s+/.test(l));
    const isBullet = lines.every((l) => /^[-*]\s+/.test(l));
    if (isOrdered || isBullet) {
      ordered = isOrdered;
      list = lines.map((l) => l.replace(/^(\d+\.|[-*])\s+/, ""));
      flushList();
      continue;
    }

    for (const line of lines) {
      if (line.startsWith("### ")) {
        html.push(`<h3 class="mt-9 text-[1.15rem] leading-snug">${inline(line.slice(4))}</h3>`);
      } else if (line.startsWith("## ")) {
        html.push(`<h2 class="mt-10 text-[1.45rem] leading-snug">${inline(line.slice(3))}</h2>`);
      } else if (line.startsWith("# ")) {
        html.push(`<h2 class="mt-10 text-[1.6rem] leading-snug">${inline(line.slice(2))}</h2>`);
      } else if (line.startsWith("> ")) {
        html.push(
          `<blockquote class="mt-6 border-l-2 border-brass pl-5 font-display text-[1.15rem] leading-snug text-ink">${inline(line.slice(2))}</blockquote>`,
        );
      } else {
        html.push(`<p class="mt-5 leading-[1.75] text-muted">${inline(line)}</p>`);
      }
    }
  }
  flushList();
  return html.join("");
}
