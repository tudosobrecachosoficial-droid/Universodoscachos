import { useMemo } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/mocks/products";
import { POSTS } from "@/mocks/posts";
import { CURL_TYPES } from "@/mocks/curlTypes";
import { GLOSSARY_TERMS } from "@/mocks/glossary";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useStructuredData } from "@/hooks/useStructuredData";

const MAIN_PAGES = [
  { to: "/", label: "Início", note: "A capa do portal" },
  { to: "/tipos-de-cachos", label: "Guia de curvaturas", note: "De 2A a 4C" },
  { to: "/quiz", label: "Quiz de curvatura", note: "Três perguntas" },
  { to: "/glossario", label: "Glossário de termos", note: "As palavras do cuidado" },
  { to: "/cuidados", label: "Cuidados", note: "O que cada fio pede" },
  { to: "/rotinas", label: "Rotinas e cronograma", note: "Um mês possível" },
  { to: "/produtos", label: "Catálogo de produtos", note: "A prateleira completa" },
  { to: "/cachos-infantis", label: "Cachos infantis", note: "Rotina com crianças" },
  { to: "/blog", label: "Blog", note: "Todos os textos" },
  { to: "/sobre-a-redacao", label: "Sobre a redação", note: "Quem escreve e como revisamos" },
  { to: "/transparencia", label: "Transparência de afiliados", note: "Como ganhamos" },
  { to: "/politica-de-privacidade", label: "Política de privacidade", note: "Dados e cookies" },
];

const categories = PRODUCT_CATEGORIES.filter((item) => item.slug !== "todos");

export default function SiteIndexPage() {
  const totalPages =
    MAIN_PAGES.length +
    CURL_TYPES.length +
    categories.length +
    PRODUCTS.length +
    POSTS.length +
    GLOSSARY_TERMS.length;

  usePageMeta({
    title: "Índice do site — todas as páginas do Universo dos Cachos",
    description:
      "Índice completo do Universo dos Cachos: as nove curvaturas, quiz, glossário, cuidados, rotinas, catálogo de produtos e todos os artigos do blog em um só lugar.",
    path: "/mapa-do-site",
  });

  /* A CollectionPage that lists the sections of the site, so a crawler can read
     the whole structure from one address instead of following menus. */
  const structuredData = useMemo(() => {
    const origin = window.location.origin;
    const pageUrl = `${origin}/mapa-do-site`;
    const sections = [
      { name: "Início", path: "/" },
      { name: "Guia de curvaturas", path: "/tipos-de-cachos" },
      { name: "Quiz de curvatura", path: "/quiz" },
      { name: "Glossário de termos", path: "/glossario" },
      { name: "Cuidados", path: "/cuidados" },
      { name: "Rotinas e cronograma", path: "/rotinas" },
      { name: "Catálogo de produtos", path: "/produtos" },
      { name: "Cachos infantis", path: "/cachos-infantis" },
      { name: "Blog", path: "/blog" },
      { name: "Sobre a redação", path: "/sobre-a-redacao" },
    ];

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#indice`,
          name: "Índice do site",
          description:
            "Todas as páginas do Universo dos Cachos reunidas por assunto: curvaturas, quiz, glossário, cuidados, rotinas, produtos e artigos.",
          url: pageUrl,
          inLanguage: "pt-BR",
          isPartOf: { "@type": "WebSite", name: "Universo dos Cachos", url: `${origin}/` },
          mainEntity: {
            "@type": "ItemList",
            name: "Seções do site",
            numberOfItems: sections.length,
            itemListElement: sections.map((section, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: section.name,
              url: `${origin}${section.path}`,
            })),
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#trilha`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: `${origin}/` },
            { "@type": "ListItem", position: 2, name: "Índice do site", item: pageUrl },
          ],
        },
      ],
    };
  }, []);

  useStructuredData("site-index", structuredData);

  return (
    <div className="page">
      <SiteNav solid />
      <main>
        <header className="page-head">
          <div className="wrap">
            <nav className="crumbs" aria-label="Você está aqui">
              <Link to="/">Início</Link>
              <span>/</span>
              <span>Índice do site</span>
            </nav>
            <div className="page-head-row">
              <div>
                <p className="stamp">Índice</p>
                <h1>
                  Todas as páginas,
                  <br />
                  em <em>um só lugar</em>.
                </h1>
                <p className="page-sub">
                  Um mapa do portal para quem prefere ver o conjunto antes de escolher por onde
                  começar. As nove curvaturas, o quiz, o glossário, as rotinas, a prateleira e cada
                  texto do blog — organizados por assunto.
                </p>
              </div>
              <p className="head-count">{totalPages} endereços</p>
            </div>
          </div>
        </header>

        <div className="wrap">
          <section className="index-block" aria-labelledby="indice-principal">
            <div className="index-head">
              <h2 id="indice-principal">
                Páginas <em>principais</em>
              </h2>
              <span className="index-count">{MAIN_PAGES.length} páginas</span>
            </div>
            <ul className="index-grid">
              {MAIN_PAGES.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>
                    <span>{item.label}</span>
                    <span className="index-note">{item.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="index-block" aria-labelledby="indice-curvaturas">
            <div className="index-head">
              <h2 id="indice-curvaturas">
                As nove <em>curvaturas</em>
              </h2>
              <span className="index-count">{CURL_TYPES.length} guias</span>
            </div>
            <ul className="index-grid">
              {CURL_TYPES.map((curl) => (
                <li key={curl.slug}>
                  <Link to={`/tipos-de-cachos/${curl.slug}`}>
                    <span className="index-code">{curl.code}</span>
                    <span>{curl.name}</span>
                    <span className="index-note">{curl.tagline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="index-block" aria-labelledby="indice-prateleira">
            <div className="index-head">
              <h2 id="indice-prateleira">
                A <em>prateleira</em>
              </h2>
              <span className="index-count">
                {categories.length} categorias · {PRODUCTS.length} fichas
              </span>
            </div>
            <ul className="index-grid">
              {categories.map((item) => (
                <li key={item.slug}>
                  <Link to={`/produtos/${item.slug}`}>
                    <span>{item.label}</span>
                    <span className="index-note">Ver categoria</span>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="index-grid index-grid--products">
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <Link to={`/produtos/${product.slug}`}>
                    <span>{product.name}</span>
                    <span className="index-note">{product.brand}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="index-block" aria-labelledby="indice-blog">
            <div className="index-head">
              <h2 id="indice-blog">
                Todos os <em>artigos</em>
              </h2>
              <span className="index-count">{POSTS.length} textos</span>
            </div>
            <ul className="index-grid">
              {POSTS.map((post) => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`}>
                    <span>{post.title}</span>
                    <span className="index-note">{post.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="index-block" aria-labelledby="indice-glossario">
            <div className="index-head">
              <h2 id="indice-glossario">
                Termos do <em>glossário</em>
              </h2>
              <span className="index-count">{GLOSSARY_TERMS.length} verbetes</span>
            </div>
            <ul className="index-grid">
              {GLOSSARY_TERMS.map((term) => (
                <li key={term.slug}>
                  <Link to={`/glossario#${term.slug}`}>
                    <span>{term.term}</span>
                    <span className="index-note">{term.short}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <p className="disclosure">
            <strong>Nota:</strong> este índice reúne apenas páginas do próprio portal. Os links de
            produtos levam a lojas parceiras e podem gerar comissão, sem custo adicional para você —
            o Universo dos Cachos não vende os produtos diretamente.
          </p>
        </div>

        <div style={{ height: 56 }} />
      </main>
      <SiteFooter />
    </div>
  );
}