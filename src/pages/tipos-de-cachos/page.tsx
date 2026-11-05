import { useMemo } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import FaqList from "@/components/feature/FaqList";
import { CURL_FAMILIES, CURL_TYPES } from "@/mocks/curlTypes";
import CurlCompareTable from "@/pages/tipos-de-cachos/components/CurlCompareTable";
import QuizTeaser from "@/pages/tipos-de-cachos/components/QuizTeaser";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useStructuredData } from "@/hooks/useStructuredData";
import { GUIDE_FAQ } from "@/utils/guideFaq";

const GUIDE_TITLE = "Tipos de cachos: guia das curvaturas 2A a 4C | Universo dos Cachos";
const GUIDE_DESCRIPTION =
  "Guia completo das curvaturas 2A, 2B, 2C, 3A, 3B, 3C, 4A, 4B e 4C: características, necessidades, finalização passo a passo, cuidados e produtos relacionados.";

export default function CurlTypesPage() {
  usePageMeta({
    title: GUIDE_TITLE,
    description: GUIDE_DESCRIPTION,
    path: "/tipos-de-cachos",
  });

  const structuredData = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const pageUrl = `${origin}/tipos-de-cachos`;

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#pagina`,
          name: GUIDE_TITLE,
          description: GUIDE_DESCRIPTION,
          url: pageUrl,
          inLanguage: "pt-BR",
          isPartOf: { "@type": "WebSite", name: "Universo dos Cachos", url: `${origin}/` },
        },
        {
          "@type": "ItemList",
          "@id": `${pageUrl}#curvaturas`,
          name: "As nove curvaturas, de 2A a 4C",
          numberOfItems: CURL_TYPES.length,
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          itemListElement: CURL_TYPES.map((type, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Article",
              "@id": `${origin}/tipos-de-cachos/${type.slug}#artigo`,
              headline: `${type.name}: características, finalização e cuidados`,
              description: type.summary,
              image: [type.image],
              url: `${origin}/tipos-de-cachos/${type.slug}`,
              inLanguage: "pt-BR",
              articleSection: `Curvatura ${type.code} · Família ${type.family}`,
            },
          })),
        },
        {
          "@type": "FAQPage",
          "@id": `${pageUrl}#perguntas`,
          inLanguage: "pt-BR",
          mainEntity: GUIDE_FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#trilha`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: `${origin}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "Tipos de cachos",
              item: pageUrl,
            },
          ],
        },
      ],
    };
  }, []);

  useStructuredData("curl-guide", structuredData);

  return (
    <div className="page">
      <SiteNav solid />
      <main>
        <header className="page-head">
          <div className="wrap">
            <nav className="crumbs" aria-label="Você está aqui">
              <Link to="/">Início</Link>
              <span>/</span>
              <span>Tipos de cachos</span>
            </nav>
            <p className="stamp">Guia de curvaturas · 2A a 4C</p>
            <h1>
              Ondulado, cacheado
              <br />
              ou <em>crespo</em>.
            </h1>
            <p className="page-sub">
              Nove curvaturas, um guia cada. A classificação serve para escolher produto e técnica —
              não para definir o que o seu cabelo pode ou não fazer. É comum a mesma cabeça ter mais de
              um padrão: ondulado no topo, crespo na nuca, mechas mais abertas perto do rosto.
            </p>
          </div>
        </header>

        <QuizTeaser />

        <CurlCompareTable />

        {CURL_FAMILIES.map((family) => {
          const types = CURL_TYPES.filter((item) => item.familySlug === family.slug);
          return (
            <section className="curl-family" key={family.slug}>
              <div className="wrap">
                <div className="curl-family-head">
                  <div>
                    <p className="stamp">{family.range}</p>
                    <h2>
                      {family.label} <em>em detalhe</em>
                    </h2>
                  </div>
                  <p className="curl-family-note">{family.intro}</p>
                </div>

                <div className="curl-grid">
                  {types.map((type) => (
                    <article className="curl-card" key={type.slug}>
                      <Link
                        className="curl-card-media"
                        to={`/tipos-de-cachos/${type.slug}`}
                        aria-label={`Ler o guia do ${type.name}`}
                      >
                        <img
                          src={type.image}
                          alt={type.imageAlt}
                          width={900}
                          height={1125}
                        />
                        <span className="curl-card-code">{type.code}</span>
                      </Link>
                      <div className="curl-card-body">
                        <h3>
                          <Link to={`/tipos-de-cachos/${type.slug}`}>{type.name}</Link>
                        </h3>
                        <p>{type.tagline}</p>
                        <div className="curl-card-links">
                          <Link className="read-link" to={`/tipos-de-cachos/${type.slug}`}>
                            Ler o guia
                            <i className="ri-arrow-right-line" aria-hidden="true" />
                          </Link>
                          <Link className="curl-card-shop" to={`/produtos?tipo=${type.slug}`}>
                            <i className="ri-store-2-line" aria-hidden="true" />
                            Produtos {type.code}
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="section-block" id="perguntas-frequentes">
          <div className="wrap">
            <FaqList
              eyebrow="Antes de escolher a sua faixa"
              title={
                <>
                  Perguntas <em>frequentes</em>
                </>
              }
              note={
                <>
                  Respostas curtas sobre a escala 2A–4C. Cada curvatura tem a sua própria página
                  com características, finalização e produtos indicados.
                </>
              }
              items={GUIDE_FAQ}
            />
          </div>
        </section>

        <section className="section-block">
          <div className="wrap">
            <div className="disclosure">
              <strong>Um aviso honesto:</strong> nenhuma curvatura é diagnóstico. A escala 2A–4C
              descreve formato de fio, e o seu cabelo pode mudar com corte, química, calor ou idade.
              Use o guia como ponto de partida para observar e testar — nunca como limite.
            </div>

            <div className="cat-siblings" style={{ paddingTop: 28 }}>
              <Link className="chip" to="/blog/como-descobrir-seu-tipo-de-cacho">
                Como descobrir seu tipo de cacho
              </Link>
              <Link className="chip" to="/blog">
                Ver todos os artigos
              </Link>
              <Link className="chip" to="/glossario">
                Glossário de termos
              </Link>
              <Link className="chip" to="/produtos">
                Prateleira de produtos
              </Link>
              <Link className="chip" to="/cachos-infantis">
                Cachos infantis
              </Link>
            </div>
          </div>
        </section>

        <div style={{ height: 56 }} />
      </main>
      <SiteFooter />
    </div>
  );
}