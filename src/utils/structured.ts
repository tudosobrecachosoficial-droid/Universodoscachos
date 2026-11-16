import { buildProductNode } from "./offers";

type ArticleInput = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string | null;
  category: string;
  tags: string[] | null;
  author: string;
};

/** Article + breadcrumb trail for a blog post. */
export function buildArticleGraph(post: ArticleInput, origin: string) {
  const pageUrl = `${origin}/blog/${post.slug}`;
  const siteUrl = `${origin}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#artigo`,
        headline: post.title,
        description: post.excerpt,
        image: [post.image],
        inLanguage: "pt-BR",
        ...(post.date ? { datePublished: post.date, dateModified: post.date } : {}),
        articleSection: post.category,
        keywords: (post.tags ?? []).join(", "),
        mainEntityOfPage: { "@id": pageUrl },
        author: {
          "@type": "Organization",
          name: post.author,
          url: `${origin}/sobre-a-redacao`,
        },
        publisher: { "@type": "Organization", name: "Universo dos Cachos", url: siteUrl },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#trilha`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${origin}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
        ],
      },
    ],
  };
}

type ProductInput = Parameters<typeof buildProductNode>[0] & {
  categorySlug: string;
  categoryLabel: string;
};

/** Product + Offer (while the price is recent) + breadcrumb trail. */
export function buildProductGraph(product: ProductInput, origin: string) {
  const pageUrl = `${origin}/produtos/${product.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildProductNode(product, origin),
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#trilha`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${origin}/` },
          { "@type": "ListItem", position: 2, name: "Produtos", item: `${origin}/produtos` },
          {
            "@type": "ListItem",
            position: 3,
            name: product.categoryLabel,
            item: `${origin}/produtos/${product.categorySlug}`,
          },
          { "@type": "ListItem", position: 4, name: product.name, item: pageUrl },
        ],
      },
    ],
  };
}
