/**
 * Runs after `vite build`. For every page that matters to search engines it writes a
 * static HTML file with the right title, description, canonical, Open Graph tags,
 * JSON-LD and the text of the page, then generates sitemap.xml, robots.txt and
 * (when AdSense is configured) ads.txt.
 *
 * The app still starts normally: React replaces the prerendered text as soon as it loads.
 * Failures to reach the database never break the deploy; the site just keeps working as a SPA.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  buildAdsTxt,
  buildRobots,
  buildSitemap,
  curlBody,
  injectPage,
  linksBody,
  placeholderAffiliates,
  postBody,
  productBody,
  resolveOrigin,
  type PageSpec,
  type SitemapEntry,
} from "./lib/prerender-core";
import { BLOG_META, HOME_META, STATIC_ROUTES, categoryMeta, curlMeta, postMeta, productMeta } from "../src/content/pageMeta";
import { buildArticleGraph, buildProductGraph } from "../src/utils/structured";

config();

const dist = join(process.cwd(), "dist");
const templatePath = join(dist, "index.html");

if (!existsSync(templatePath)) {
  console.error("prerender: dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}

const template = readFileSync(templatePath, "utf-8");
const origin = resolveOrigin(process.env);

const write = (file: string, content: string) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

const pagePath = (path: string) => (path === "/" ? templatePath : join(dist, path, "index.html"));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = any;

async function load(): Promise<{ posts: Row[]; products: Row[]; categories: Row[]; curls: Row[] }> {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  const empty = { posts: [], products: [], categories: [], curls: [] };
  // Test hook: a JSON file with { posts, products, categories, curls } replaces the database.
  const fixture = process.env.PRERENDER_FIXTURE;
  if (fixture) return JSON.parse(readFileSync(fixture, "utf-8"));
  if (!url || !key) {
    console.warn("prerender: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing, dynamic pages skipped.");
    return empty;
  }
  try {
    const client = createClient(url, key);
    const [posts, products, categories, curls] = await Promise.all([
      client.from("posts").select("*").eq("published", true).order("date", { ascending: false }),
      client.from("products").select("*").order("created_at", { ascending: false }),
      client.from("product_categories").select("*").order("label"),
      client.from("curl_types").select("*").order("code"),
    ]);
    for (const result of [posts, products, categories, curls]) if (result.error) throw result.error;
    return {
      posts: posts.data ?? [],
      products: products.data ?? [],
      categories: categories.data ?? [],
      curls: curls.data ?? [],
    };
  } catch (error) {
    console.warn("prerender: could not read the database, dynamic pages skipped.", error);
    return empty;
  }
}

async function main() {
  // Generic shell for every address that has no prerendered file (static pages, new posts).
  // Vercel rewrites unknown paths to it, so it must never carry a page-specific canonical.
  const shellSpec: PageSpec = {
    path: "/",
    title: "Universo dos Cachos",
    description:
      "Seu universo de cuidados, descobertas e amor pelos cachos. Para cabelos ondulados, cacheados e crespos, de todas as idades.",
    canonical: false,
    omitRobots: true,
  };
  write(join(dist, "app-shell.html"), origin ? injectPage(template, shellSpec, origin) : template);

  if (!origin) {
    console.warn("prerender: no site address. Set VITE_SITE_URL (https://your-domain). Only app-shell.html was written.");
    write(join(dist, "robots.txt"), buildRobots(null));
    return;
  }

  const { posts, products, categories, curls } = await load();
  const entries: SitemapEntry[] = STATIC_ROUTES.map((path) => ({ path, priority: path === "/" ? 1 : 0.6 }));
  const pages: { spec: PageSpec; priority: number; lastmod?: string | null }[] = [];

  const latest = posts.slice(0, 6).map((post) => ({ href: `/blog/${post.slug}`, title: post.title, text: post.excerpt }));

  pages.push({
    spec: {
      ...HOME_META,
      bodyHtml: linksBody(
        "Universo dos Cachos",
        HOME_META.description,
        [
          { href: "/tipos-de-cachos", title: "Tipos de cachos" },
          { href: "/blog", title: "Blog" },
          { href: "/produtos", title: "Produtos" },
          { href: "/rotinas", title: "Rotinas" },
          { href: "/cuidados", title: "Cuidados" },
          { href: "/quiz", title: "Quiz de curvatura" },
          ...latest,
        ],
      ),
    },
    priority: 1,
  });

  pages.push({
    spec: {
      ...BLOG_META,
      bodyHtml: linksBody(
        "Blog do Universo dos Cachos",
        BLOG_META.description,
        posts.map((post) => ({ href: `/blog/${post.slug}`, title: post.title, text: post.excerpt })),
      ),
    },
    priority: 0.8,
  });

  for (const post of posts) {
    pages.push({
      spec: {
        ...postMeta(post),
        image: post.image,
        type: "article",
        jsonLd: { id: "blog-article", data: buildArticleGraph(post, origin) },
        bodyHtml: postBody(post),
      },
      priority: 0.8,
      lastmod: post.date,
    });
  }

  for (const product of products) {
    pages.push({
      spec: {
        ...productMeta(product),
        image: product.image,
        jsonLd: { id: "product-detail", data: buildProductGraph(product as any, origin) },
        bodyHtml: productBody(product),
      },
      priority: 0.6,
      lastmod: product.updatedAt,
    });
  }

  for (const category of categories.filter((item) => item.slug !== "todos")) {
    const inCategory = products.filter((item) => item.categorySlug === category.slug);
    pages.push({
      spec: {
        ...categoryMeta(category),
        image: category.image || undefined,
        bodyHtml: linksBody(
          `${category.label} para cabelos naturais`,
          category.intro ?? "",
          inCategory.map((item) => ({ href: `/produtos/${item.slug}`, title: item.name, text: item.summary })),
        ),
      },
      priority: 0.7,
    });
  }

  for (const curl of curls) {
    pages.push({
      spec: { ...curlMeta(curl), image: curl.image, bodyHtml: curlBody(curl) },
      priority: 0.7,
    });
  }

  for (const { spec, priority, lastmod } of pages) {
    write(pagePath(spec.path), injectPage(template, spec, origin));
    const known = entries.findIndex((entry) => entry.path === spec.path);
    const entry = { path: spec.path, priority, lastmod };
    if (known >= 0) entries[known] = entry;
    else entries.push(entry);
  }

  write(join(dist, "sitemap.xml"), buildSitemap(entries, origin));
  write(join(dist, "robots.txt"), buildRobots(origin));

  const ads = buildAdsTxt(process.env.VITE_ADSENSE_CLIENT);
  if (ads && !existsSync(join(dist, "ads.txt"))) write(join(dist, "ads.txt"), ads);
  if (process.env.VITE_ADSENSE_CLIENT && !ads) console.warn("prerender: VITE_ADSENSE_CLIENT is not a valid ca-pub-… id, ads.txt skipped.");

  const placeholders = placeholderAffiliates(products as any);
  if (placeholders.length) {
    console.warn(
      `prerender: ${placeholders.length} product(s) have no real affiliate link (empty or just a store home page): ${placeholders.join(", ")}`,
    );
  }

  console.log(`prerender: ${pages.length} pages and ${entries.length} sitemap entries written for ${origin}.`);
}

main().catch((error: unknown) => {
  // The shell and the plain SPA still work, so a failure here must not block the deploy.
  console.error("prerender: stopped early.", error);
});
