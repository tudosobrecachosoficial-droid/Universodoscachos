import { isPlaceholderAffiliateUrl } from "../../src/utils/offers";

/* Pure helpers for scripts/prerender.ts, kept free of file and network access so
   they can be tested on their own (tests/prerender.test.ts). */

export type PageSpec = {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  /** Leave the robots tag out (used by the generic app shell). */
  omitRobots?: boolean;
  /** false = no canonical/og:url (used by the generic app shell). */
  canonical?: boolean;
  jsonLd?: { id: string; data: unknown } | null;
  /** Plain semantic HTML placed inside #root; React replaces it when the app starts. */
  bodyHtml?: string;
};

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const absolute = (origin: string, value: string) =>
  /^https?:\/\//i.test(value) ? value : `${origin}${value.startsWith("/") ? "" : "/"}${value}`;

/** Normalises the public site address, or returns null when none is usable. */
export function resolveOrigin(env: Record<string, string | undefined>): string | null {
  const candidates = [
    env.VITE_SITE_URL,
    env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`,
    env.VERCEL_URL && `https://${env.VERCEL_URL}`,
  ];
  for (const candidate of candidates) {
    const value = candidate?.trim().replace(/\/+$/, "");
    if (value && /^https?:\/\/[^\s/]+/i.test(value)) return value;
  }
  return null;
}

/** Writes title, description, canonical, Open Graph, Twitter and JSON-LD into the built template. */
export function injectPage(template: string, spec: PageSpec, origin: string): string {
  const url = `${origin}${spec.path}`;
  const picture = absolute(origin, spec.image || "/og-default.jpg");
  const title = escapeHtml(spec.title);
  const description = escapeHtml(spec.description);

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    ...(spec.omitRobots
      ? []
      : [`<meta name="robots" content="${spec.noindex ? "noindex, follow" : "index, follow"}" />`]),
    ...(spec.canonical === false
      ? []
      : [
          `<link rel="canonical" href="${escapeHtml(url)}" />`,
          `<meta property="og:url" content="${escapeHtml(url)}" />`,
        ]),
    `<meta property="og:type" content="${spec.type ?? "website"}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${escapeHtml(picture)}" />`,
    `<meta property="og:site_name" content="Universo dos Cachos" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${escapeHtml(picture)}" />`,
  ];

  if (spec.jsonLd) {
    const json = JSON.stringify(spec.jsonLd.data).replace(/</g, "\\u003c");
    // data-structured-id lets the app's useStructuredData replace this block instead of duplicating it.
    tags.push(
      `<script type="application/ld+json" data-structured-id="${escapeHtml(spec.jsonLd.id)}">${json}</script>`,
    );
  }

  let html = template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+(?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "");

  html = html.replace("</head>", () => `    ${tags.join("\n    ")}\n</head>`);

  if (spec.bodyHtml !== undefined) {
    const body = spec.bodyHtml;
    html = html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
  }
  return html;
}

/* ---------- body fallbacks (what crawlers and no-JS readers see) ---------- */

const p = (text: string | null | undefined) => (text ? `<p>${escapeHtml(text)}</p>` : "");
const list = (items: string[] | null | undefined) =>
  items && items.length ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : "";

type Section = {
  heading: string;
  paragraphs?: string[] | null;
  list?: string[] | null;
  quote?: string | null;
};

const sectionsHtml = (sections: Section[] | null | undefined) =>
  (sections ?? [])
    .map(
      (section) =>
        `<section><h2>${escapeHtml(section.heading)}</h2>${(section.paragraphs ?? []).map(p).join("")}${list(section.list)}${
          section.quote ? `<blockquote>${escapeHtml(section.quote)}</blockquote>` : ""
        }</section>`,
    )
    .join("");

export const postBody = (post: {
  title: string;
  subtitle?: string | null;
  excerpt?: string | null;
  author?: string | null;
  sections?: Section[] | null;
}) =>
  `<main><article><h1>${escapeHtml(post.title)}</h1>${p(post.subtitle)}${p(post.author)}${p(post.excerpt)}${sectionsHtml(post.sections)}</article></main>`;

export const productBody = (product: {
  name: string;
  brand?: string | null;
  categoryLabel?: string | null;
  summary?: string | null;
  sections?: { heading: string; paragraphs?: string[] | null }[] | null;
}) =>
  `<main><article><h1>${escapeHtml(product.name)}</h1>${p([product.brand, product.categoryLabel].filter(Boolean).join(" · "))}${p(product.summary)}${sectionsHtml(product.sections)}</article></main>`;

export const curlBody = (curl: {
  name: string;
  tagline?: string | null;
  summary?: string | null;
  paragraphs?: string[] | null;
  characteristics?: string[] | null;
}) =>
  `<main><article><h1>${escapeHtml(curl.name)}</h1>${p(curl.tagline)}${p(curl.summary)}${(curl.paragraphs ?? []).map(p).join("")}${
    curl.characteristics?.length ? `<h2>Características</h2>${list(curl.characteristics)}` : ""
  }</article></main>`;

type Link = { href: string; title: string; text?: string | null };

export const linksBody = (heading: string, intro: string, links: Link[], linksHeading?: string) =>
  `<main><h1>${escapeHtml(heading)}</h1>${p(intro)}${linksHeading ? `<h2>${escapeHtml(linksHeading)}</h2>` : ""}<ul>${links
    .map(
      (link) =>
        `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.title)}</a>${link.text ? ` — ${escapeHtml(link.text)}` : ""}</li>`,
    )
    .join("")}</ul></main>`;

/* ---------- sitemap, robots, ads.txt ---------- */

export type SitemapEntry = { path: string; lastmod?: string | null; priority?: number };

const lastmodOf = (value: string | null | undefined) => {
  const match = value?.match(/^\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : null;
};

export function buildSitemap(entries: SitemapEntry[], origin: string): string {
  const seen = new Set<string>();
  const rows = entries
    .filter((entry) => (seen.has(entry.path) ? false : (seen.add(entry.path), true)))
    .map((entry) => {
      const lastmod = lastmodOf(entry.lastmod);
      return [
        "  <url>",
        `    <loc>${escapeHtml(origin + entry.path)}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        entry.priority !== undefined ? `    <priority>${entry.priority.toFixed(1)}</priority>` : null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join("\n")}\n</urlset>\n`;
}

export const buildRobots = (origin: string | null) =>
  `User-agent: *\nAllow: /\n${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ""}`;

/** ads.txt line for AdSense, or null when the publisher id is missing or malformed. */
export function buildAdsTxt(client: string | undefined): string | null {
  const match = client?.trim().match(/^(?:ca-)?(pub-\d+)$/);
  return match ? `google.com, ${match[1]}, DIRECT, f08c47fec0942fa0\n` : null;
}

/** Names of products whose affiliate link is empty or just a store home page. */
export const placeholderAffiliates = (products: { name: string; affiliateUrl?: string | null }[]) =>
  products.filter((product) => isPlaceholderAffiliateUrl(product.affiliateUrl)).map((product) => product.name);
