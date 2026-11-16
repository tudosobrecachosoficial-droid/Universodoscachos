import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildAdsTxt,
  buildRobots,
  buildSitemap,
  escapeHtml,
  injectPage,
  placeholderAffiliates,
  postBody,
  resolveOrigin,
} from "../scripts/lib/prerender-core";

const template = `<!doctype html><html lang="pt-BR"><head>
<meta charset="UTF-8" />
<title>Universo dos Cachos</title>
<meta name="description" content="old" />
<meta property="og:title" content="old" />
<meta name="twitter:card" content="summary" />
<link rel="canonical" href="https://old.example/" />
</head><body><div id="root"></div></body></html>`;

test("injectPage replaces head tags, adds canonical, JSON-LD and the body fallback", () => {
  const html = injectPage(
    template,
    {
      path: "/blog/x",
      title: 'Título "com aspas" & mais',
      description: "Descrição <b>",
      image: "/img.jpg",
      type: "article",
      jsonLd: { id: "blog-article", data: { a: "</script><b>" } },
      bodyHtml: "<main>texto</main>",
    },
    "https://site.com",
  );

  assert.equal((html.match(/<title>/g) ?? []).length, 1);
  assert.match(html, /<title>Título &quot;com aspas&quot; &amp; mais<\/title>/);
  assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
  assert.match(html, /rel="canonical" href="https:\/\/site\.com\/blog\/x"/);
  assert.match(html, /property="og:image" content="https:\/\/site\.com\/img\.jpg"/);
  assert.match(html, /property="og:type" content="article"/);
  assert.equal(html.includes("old.example"), false);
  assert.match(html, /data-structured-id="blog-article"/);
  assert.equal(html.includes("</script><b>"), false); // JSON-LD cannot close its own tag
  assert.match(html, /<div id="root"><main>texto<\/main><\/div>/);
});

test("the app shell carries no canonical and no robots tag", () => {
  const html = injectPage(
    template,
    { path: "/", title: "Universo dos Cachos", description: "d", canonical: false, omitRobots: true },
    "https://site.com",
  );
  assert.equal(html.includes('rel="canonical"'), false);
  assert.equal(html.includes('name="robots"'), false);
  assert.equal(html.includes('property="og:url"'), false);
  assert.match(html, /<div id="root"><\/div>/);
});

test("noindex pages say so", () => {
  const html = injectPage(template, { path: "/x", title: "t", description: "d", noindex: true }, "https://site.com");
  assert.match(html, /name="robots" content="noindex, follow"/);
});

test("body fallbacks escape content", () => {
  const html = postBody({ title: "<script>x</script>", sections: [{ heading: "H", paragraphs: ["a & b"] }] });
  assert.equal(html.includes("<script>"), false);
  assert.match(html, /a &amp; b/);
  assert.equal(escapeHtml(`<'">&`), "&lt;&#39;&quot;&gt;&amp;");
});

test("sitemap lists unique absolute URLs with dates", () => {
  const xml = buildSitemap(
    [
      { path: "/", priority: 1 },
      { path: "/blog/a", lastmod: "2026-10-28T10:00:00Z", priority: 0.8 },
      { path: "/blog/a" },
    ],
    "https://site.com",
  );
  assert.equal((xml.match(/<url>/g) ?? []).length, 2);
  assert.match(xml, /<loc>https:\/\/site\.com\/blog\/a<\/loc>/);
  assert.match(xml, /<lastmod>2026-10-28<\/lastmod>/);
});

test("robots, ads.txt and origin resolution", () => {
  assert.match(buildRobots("https://site.com"), /Sitemap: https:\/\/site\.com\/sitemap\.xml/);
  assert.equal(buildRobots(null).includes("Sitemap"), false);

  assert.equal(buildAdsTxt("ca-pub-1234567890"), "google.com, pub-1234567890, DIRECT, f08c47fec0942fa0\n");
  assert.equal(buildAdsTxt("pub-99"), "google.com, pub-99, DIRECT, f08c47fec0942fa0\n");
  assert.equal(buildAdsTxt(""), null);
  assert.equal(buildAdsTxt("lixo"), null);

  assert.equal(resolveOrigin({ VITE_SITE_URL: "https://a.com/" }), "https://a.com");
  assert.equal(resolveOrigin({ VERCEL_PROJECT_PRODUCTION_URL: "b.vercel.app" }), "https://b.vercel.app");
  assert.equal(resolveOrigin({ VITE_SITE_URL: "not a url" }), null);
  assert.equal(resolveOrigin({}), null);
});

test("placeholder affiliate links are reported by product name", () => {
  const names = placeholderAffiliates([
    { name: "A", affiliateUrl: "https://shopee.com.br/" },
    { name: "B", affiliateUrl: "https://shopee.com.br/produto-i.1.2" },
    { name: "C", affiliateUrl: "" },
  ]);
  assert.deepEqual(names, ["A", "C"]);
});
