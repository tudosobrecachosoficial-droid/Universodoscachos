import { useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import NewsletterBlock from "@/components/feature/NewsletterBlock";
import FaqList from "@/components/feature/FaqList";
import { CURL_FAMILIES } from "@/mocks/curlTypes";
import { curlTypesService, productsService, postsService } from "@/services";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import SupabaseState from "@/components/feature/SupabaseState";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useStructuredData } from "@/hooks/useStructuredData";
import { buildCurlFaq } from "@/utils/curlFaq";
import { buildProductList } from "@/utils/offers";

const RELATED_CATEGORIES = ["tipos-de-cachos", "finalizacao", "cuidados", "rotinas"];

export default function CurlTypeDetailPage() {
  const { slug } = useParams();
  const loadCurl = useCallback(() => curlTypesService.getBySlug(slug ?? ""), [slug]);
  const loadCurls = useCallback(() => curlTypesService.getAll(), []);
  const loadProducts = useCallback(() => productsService.getAll(), []);
  const loadPosts = useCallback(() => postsService.getAll(), []);
  const curlQuery = useSupabaseData(loadCurl);
  const curlsQuery = useSupabaseData(loadCurls);
  const productsQuery = useSupabaseData(loadProducts);
  const postsQuery = useSupabaseData(loadPosts);
  const curl = curlQuery.data;
  const family = CURL_FAMILIES.find((item) => item.slug === curl?.familySlug);
  const curls = curlsQuery.data ?? [];
  const index = curls.findIndex((item) => item.slug === slug);

  const metaTitle = curl
    ? `${curl.name}: características, finalização e cuidados | Universo dos Cachos`
    : "Curvatura não encontrada | Universo dos Cachos";
  const metaDescription = curl
    ? `${curl.tagline} Veja características, necessidades, finalização passo a passo, cuidados e produtos indicados para o cabelo ${curl.code}.`
    : "Esta página de curvatura não está disponível no Universo dos Cachos.";
  const canonicalPath = curl ? `/tipos-de-cachos/${curl.slug}` : "/tipos-de-cachos";

  usePageMeta({
    title: metaTitle,
    description: metaDescription,
    path: canonicalPath,
  });

  const faq = useMemo(() => (curl ? buildCurlFaq(curl) : []), [curl]);

  const products = useMemo(() => {
    if (!curl) return [];
    return curl.productSlugs
      .map((productSlug) => (productsQuery.data ?? []).find((item) => item.slug === productSlug))
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
  }, [curl, productsQuery.data]);

  const structuredData = useMemo(() => {
    if (!curl) return null;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const pageUrl = `${origin}/tipos-de-cachos/${curl.slug}`;
    const siteUrl = `${origin}/`;
    const productList = buildProductList({ origin, pageUrl, products });

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": `${pageUrl}#artigo`,
          headline: metaTitle,
          description: metaDescription,
          image: [curl.image],
          inLanguage: "pt-BR",
          mainEntityOfPage: { "@id": pageUrl },
          articleSection: `Curvatura ${curl.code} · Família ${curl.family}`,
          about: [
            {
              "@type": "Thing",
              name: `Cabelo ${curl.family.toLowerCase()} ${curl.code}`,
            },
          ],
          author: {
            "@type": "Organization",
            name: "Universo dos Cachos",
            url: siteUrl,
          },
          publisher: {
            "@type": "Organization",
            name: "Universo dos Cachos",
            url: siteUrl,
          },
        },
        {
          "@type": "FAQPage",
          "@id": `${pageUrl}#perguntas`,
          inLanguage: "pt-BR",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#trilha`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
            {
              "@type": "ListItem",
              position: 2,
              name: "Tipos de cachos",
              item: `${origin}/tipos-de-cachos`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: `Curvatura ${curl.code} · ${curl.name}`,
              item: pageUrl,
            },
          ],
        },
        ...(productList ? [productList] : []),
      ],
    };
  }, [curl, faq, metaDescription, metaTitle, products]);

  useStructuredData("curl-type", structuredData);

  const relatedPosts = useMemo(() => {
    if (!curl) return [];
    const tagKey = curl.code.toLowerCase();
    const allPosts = postsQuery.data ?? [];
    const direct = allPosts.filter((post) =>
      (post.tags ?? []).some((tag) => tag.toLowerCase() === tagKey),
    );
    const contextual = allPosts.filter(
      (post) =>
        !direct.includes(post) && RELATED_CATEGORIES.includes(post.categorySlug),
    );
    const rest = allPosts.filter(
      (post) => !direct.includes(post) && !contextual.includes(post),
    );
    return [...direct, ...contextual, ...rest].slice(0, 3);
  }, [curl, postsQuery.data]);

  const pager = useMemo(() => {
    if (index < 0) return { prev: undefined, next: undefined };
    return {
      prev: index > 0 ? curls[index - 1] : undefined,
      next: index >= 0 && index < curls.length - 1 ? curls[index + 1] : undefined,
    };
  }, [index, curls]);

  if (!curl && (curlQuery.loading || curlQuery.error)) {
    return (
      <div className="page">
        <SiteNav solid />
        <main className="wrap" style={{ paddingTop: 160, paddingBottom: 120 }}>
          <SupabaseState loading={curlQuery.loading} error={curlQuery.error} onRetry={curlQuery.reload} />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!curl) {
    return (
      <div className="page">
        <SiteNav solid />
        <main className="wrap" style={{ paddingTop: 160, paddingBottom: 120 }}>
          <div className="empty">
            <i className="ri-scissors-cut-line" aria-hidden="true" />
            <h3>Curvatura não encontrada</h3>
            <p>
              O endereço pode ter mudado. O guia completo reúne as nove curvaturas, de 2A a 4C.
            </p>
            <Link className="section-link" to="/tipos-de-cachos">
              Ver o guia de curvaturas
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="page">
      <SiteNav solid />
      <main>
        <header className="page-head">
          <div className="wrap">
            <nav className="crumbs" aria-label="Você está aqui">
              <Link to="/">Início</Link>
              <span>/</span>
              <Link to="/tipos-de-cachos">Tipos de cachos</Link>
              <span>/</span>
              <span>{curl.code}</span>
            </nav>

            <div className="curl-hero">
              <div className="curl-hero-copy">
                <p className="stamp">
                  {curl.family} · Curvatura {curl.code}
                </p>
                <h1>
                  {curl.family} <em>{curl.code}</em>
                </h1>
                <p className="page-sub" style={{ marginTop: 16 }}>
                  {curl.summary}
                </p>

                <dl className="curl-facts">
                  {curl.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="kids-ctas">
                  <a className="buy-btn" href="#finalizacao">
                    Ver a finalização
                    <i className="ri-arrow-down-line" aria-hidden="true" />
                  </a>
                  <a className="btn-outline" href="#produtos-relacionados">
                    Produtos para {curl.code}
                    <i className="ri-arrow-down-line" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="curl-hero-media">
                <img src={curl.image} alt={curl.imageAlt} width={900} height={1125} />
              </div>
            </div>
          </div>
        </header>

        <div className="wrap">
          <div className="read-grid">
            <div className="prose-udc">
              {curl.paragraphs.map((paragraph) => (
                <p className="prose-lead" key={paragraph.slice(0, 40)}>
                  {paragraph}
                </p>
              ))}

              <section id="caracteristicas">
                <h2>Características visuais</h2>
                <ul>
                  {curl.characteristics.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section id="necessidades">
                <h2>O que esse fio costuma pedir</h2>
                <ul>
                  {curl.needs.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section id="finalizacao">
                <h2>Como finalizar o {curl.code}</h2>
                <p>
                  A finalização é onde a curvatura aparece de verdade. A ordem é sempre a mesma —
                  água, creme, fixação — e a quantidade muda com a espessura do fio.
                </p>
                <ol className="curl-steps">
                  {curl.finishing.map((step, stepIndex) => (
                    <li key={step.title}>
                      <span className="curl-step-num">
                        {String(stepIndex + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section id="cuidados">
                <h2>Cuidados que fazem diferença</h2>
                <ul>
                  {curl.care.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <p className="buy-note" style={{ marginTop: 32 }}>
                Conteúdo editorial em revisão antes da publicação. Nenhuma curvatura é diagnóstico e
                não há promessa de resultado: cada cabelo responde de um jeito. Em caso de queda,
                irritação ou quebra persistente, procure orientação profissional.
              </p>
            </div>

            <aside className="toc" aria-label="Neste guia">
              <p>Neste guia</p>
              <a href="#caracteristicas">Características visuais</a>
              <a href="#necessidades">O que esse fio pede</a>
              <a href="#finalizacao">Como finalizar</a>
              <a href="#cuidados">Cuidados</a>
              <a href="#perguntas-frequentes">Perguntas frequentes</a>
              <Link to={`/produtos?tipo=${curl.slug}`}>Produtos {curl.code} no catálogo</Link>
              <Link className="toc-cta" to="/tipos-de-cachos">
                Comparar com as outras curvaturas
              </Link>
            </aside>
          </div>
        </div>

        <section className="section-block" id="perguntas-frequentes">
          <div className="wrap">
            <FaqList
              eyebrow={`Dúvidas sobre o ${curl.code}`}
              title={
                <>
                  Perguntas <em>frequentes</em>
                </>
              }
              note={
                <>
                  Respostas curtas para as dúvidas que mais aparecem sobre o fio {curl.code}. Para
                  comparar com as outras faixas, veja o{" "}
                  <Link to="/tipos-de-cachos">guia completo de curvaturas</Link>.
                </>
              }
              items={faq}
            />
          </div>
        </section>

        {products.length > 0 ? (
          <section className="section-block" id="produtos-relacionados">
            <div className="wrap">
              <div className="section-head">
                <h2>
                  Produtos para <em>{curl.code}</em>
                </h2>
                <Link className="section-link" to={`/produtos?tipo=${curl.slug}`}>
                  Ver só produtos {curl.code}
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </Link>
              </div>

              <div className="grid-products">
                {products.map((product) => (
                  <Link className="pcard" key={product.slug} to={`/produtos/${product.slug}`}>
                    <div className="pcard-media">
                      <img
                        src={product.image}
                        alt={`${product.name} da marca ${product.brand}`}
                        width={900}
                        height={900}
                      />
                      <span className="pcard-tag">{product.categoryLabel}</span>
                    </div>
                    <div className="pcard-body">
                      <span className="pcard-brand">{product.brand}</span>
                      <span className="pcard-name">{product.name}</span>
                      <span className="pcard-note">{product.summary}</span>
                      <span className="pcard-foot">
                        {product.promoPrice ? (
                          <span className="price">
                            {product.promoPrice}
                            <span className="price-old">{product.price}</span>
                          </span>
                        ) : product.price ? (
                          <span className="price">{product.price}</span>
                        ) : (
                          <span className="price-ask">Consulte o preço na loja</span>
                        )}
                        <span className="pcard-go">
                          Ver produto
                          <i className="ri-arrow-right-line" aria-hidden="true" />
                        </span>
                      </span>
                      <span className="pcard-avail">
                        <i className="ri-store-2-line" aria-hidden="true" />
                        Disponível na loja parceira
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <p className="disclosure">
                <strong>Transparência:</strong> este conteúdo contém links de afiliados. Podemos
                receber uma comissão quando você compra por meio desses links, sem custo adicional
                para você. O portal não vende os produtos e não controla preço, estoque ou prazo de
                entrega.
                <Link to="/transparencia" style={{ color: "inherit", textDecoration: "underline" }}>
                  {" "}
                  Entenda como funciona.
                </Link>
              </p>
            </div>
          </section>
        ) : null}

        {relatedPosts.length > 0 ? (
          <section className="section-block">
            <div className="wrap">
              <div className="section-head">
                <h2>
                  Para ler <em>junto</em>
                </h2>
                <Link className="section-link" to="/blog">
                  Ver todos os artigos
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid-posts">
                {relatedPosts.map((post) => (
                  <Link className="post-card" key={post.slug} to={`/blog/${post.slug}`}>
                    <div className="post-card-media">
                      <img src={post.image} alt={post.title} width={1600} height={1000} />
                    </div>
                    <p className="post-meta">
                      <span className="post-cat">{post.category}</span>
                      <span className="dot">·</span>
                      <span>{post.readingTime} min</span>
                    </p>
                    <h3>{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <span className="read-link">
                      Ler artigo
                      <i className="ri-arrow-right-line" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="section-block">
          <div className="wrap">
            <div className="curl-pager">
              {pager.prev ? (
                <Link className="curl-pager-link" to={`/tipos-de-cachos/${pager.prev.slug}`}>
                  <span className="curl-pager-label">
                    <i className="ri-arrow-left-line" aria-hidden="true" /> Curvatura anterior
                  </span>
                  <strong>
                    {pager.prev.code} · {pager.prev.name}
                  </strong>
                </Link>
              ) : (
                <span />
              )}
              {pager.next ? (
                <Link
                  className="curl-pager-link is-next"
                  to={`/tipos-de-cachos/${pager.next.slug}`}
                >
                  <span className="curl-pager-label">
                    Próxima curvatura <i className="ri-arrow-right-line" aria-hidden="true" />
                  </span>
                  <strong>
                    {pager.next.code} · {pager.next.name}
                  </strong>
                </Link>
              ) : (
                <span />
              )}
            </div>

            {family ? (
              <p className="curl-family-foot">
                {family ? `Família ${family.label} — ${family.range}. ` : ""}
                <Link to="/tipos-de-cachos">Ver o guia completo de curvaturas.</Link>
              </p>
            ) : null}
          </div>
        </section>
      </main>
      <NewsletterBlock />
      <SiteFooter />
    </div>
  );
}