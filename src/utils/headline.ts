export type HeadlinePart = { text: string; em?: boolean; className?: string };

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": "\u00a0",
};

const decode = (value: string) =>
  value.replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (entity) => ENTITIES[entity] ?? entity);

const plain = (value: string) => decode(value.replace(/<[^>]*>/g, ""));

const EM = /<em(?:\s+class="([^"]*)")?\s*>([\s\S]*?)<\/em>/gi;

/**
 * Splits a headline written as "line one<br>line <em class=\"accent\">two</em>"
 * into lines of plain text and emphasised parts. Any other markup is dropped, so
 * the result can be rendered by React without raw HTML.
 */
export function parseHeadline(html: string): HeadlinePart[][] {
  return html
    .split(/<br\s*\/?>/i)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts: HeadlinePart[] = [];
      let last = 0;
      for (const match of line.matchAll(EM)) {
        const index = match.index ?? 0;
        const before = plain(line.slice(last, index));
        if (before) parts.push({ text: before });
        parts.push({ text: plain(match[2]), em: true, className: match[1] || undefined });
        last = index + match[0].length;
      }
      const rest = plain(line.slice(last));
      if (rest) parts.push({ text: rest });
      return parts;
    });
}
