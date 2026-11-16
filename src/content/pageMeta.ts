/* Titles and descriptions shared by the pages and by the build-time prerender,
   so the HTML crawlers receive matches what the page sets after it loads. */

const SUFFIX = "Universo dos Cachos";

export const HOME_META = {
  title: "Universo dos Cachos — cuidados, rotinas e produtos para cabelos naturais",
  description:
    "Portal sobre cabelos ondulados, cacheados e crespos: guia de curvaturas, rotinas de cuidado, blog com artigos e produtos recomendados para todas as idades.",
  path: "/",
};

export const BLOG_META = {
  title: "Blog do Universo dos Cachos — cuidados, rotinas e tipos de cachos",
  description:
    "Artigos sobre cuidados com cabelos ondulados, cacheados e crespos: rotinas, cronograma capilar, finalização, day after e cachos infantis.",
  path: "/blog",
};

export const postMeta = (post: { slug: string; title: string; seoTitle?: string | null; seoDescription?: string | null; excerpt: string }) => ({
  title: `${post.seoTitle || post.title} | ${SUFFIX}`,
  description: post.seoDescription || post.excerpt,
  path: `/blog/${post.slug}`,
});

export const productMeta = (product: { slug: string; name: string; brand: string; summary: string }) => ({
  title: `${product.name} — ${product.brand} | ${SUFFIX}`,
  description: product.summary,
  path: `/produtos/${product.slug}`,
});

export const categoryMeta = (category: { slug: string; label: string; intro?: string | null }) => ({
  title: `${category.label} para cabelos naturais | ${SUFFIX}`,
  description:
    category.intro ||
    `Seleção de ${category.label.toLowerCase()} recomendados para cabelos ondulados, cacheados e crespos.`,
  path: `/produtos/${category.slug}`,
});

export const curlMeta = (curl: { slug: string; name: string; code: string; tagline: string }) => ({
  title: `${curl.name}: características, finalização e cuidados | ${SUFFIX}`,
  description: `${curl.tagline} Veja características, necessidades, finalização passo a passo, cuidados e produtos indicados para o cabelo ${curl.code}.`,
  path: `/tipos-de-cachos/${curl.slug}`,
});

export const STATIC_ROUTES = [
  "/",
  "/produtos",
  "/blog",
  "/cachos-infantis",
  "/tipos-de-cachos",
  "/cuidados",
  "/rotinas",
  "/quiz",
  "/glossario",
  "/mapa-do-site",
  "/sobre-a-redacao",
  "/politica-de-privacidade",
  "/transparencia",
];
