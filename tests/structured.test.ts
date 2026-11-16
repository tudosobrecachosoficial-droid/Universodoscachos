import { test } from "node:test";
import assert from "node:assert/strict";
import { buildArticleGraph, buildProductGraph } from "../src/utils/structured";
import { postMeta, productMeta, categoryMeta, curlMeta } from "../src/content/pageMeta";

test("article graph carries dates, author link and breadcrumb", () => {
  const graph = buildArticleGraph(
    {
      slug: "meu-post",
      title: "Meu post",
      excerpt: "Resumo",
      image: "https://example.com/i.jpg",
      date: "2026-10-28",
      category: "Cuidados",
      tags: ["a", "b"],
      author: "Redação",
    },
    "https://site.com",
  ) as any;
  const article = graph["@graph"][0];
  assert.equal(article.datePublished, "2026-10-28");
  assert.equal(article.keywords, "a, b");
  assert.equal(article.author.url, "https://site.com/sobre-a-redacao");
  assert.equal(graph["@graph"][1].itemListElement.length, 3);
});

test("product graph has a four-step breadcrumb", () => {
  const graph = buildProductGraph(
    {
      slug: "p",
      name: "P",
      brand: "B",
      summary: "S",
      price: null,
      promoPrice: null,
      image: "https://example.com/p.jpg",
      updatedAt: "2026-10-01",
      categorySlug: "shampoos",
      categoryLabel: "Shampoos",
    },
    "https://site.com",
  ) as any;
  assert.equal(graph["@graph"][1].itemListElement.length, 4);
  assert.equal(graph["@graph"][1].itemListElement[2].item, "https://site.com/produtos/shampoos");
});

test("page meta helpers keep one title format", () => {
  assert.equal(postMeta({ slug: "a", title: "T", seoTitle: "", excerpt: "E" }).title, "T | Universo dos Cachos");
  assert.equal(postMeta({ slug: "a", title: "T", seoTitle: "SEO", seoDescription: "D", excerpt: "E" }).description, "D");
  assert.equal(productMeta({ slug: "p", name: "N", brand: "B", summary: "S" }).path, "/produtos/p");
  assert.match(categoryMeta({ slug: "c", label: "Máscaras", intro: "" }).description, /máscaras/);
  assert.equal(curlMeta({ slug: "2a", name: "Ondulado 2A", code: "2A", tagline: "Leve." }).path, "/tipos-de-cachos/2a");
});
