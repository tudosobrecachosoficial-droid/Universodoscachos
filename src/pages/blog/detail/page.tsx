import { Fragment, useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import NewsletterBlock from "@/components/feature/NewsletterBlock";
import AdSlot from "@/components/feature/AdSlot";
import { postsService, productsService, glossaryService } from "@/services";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import SupabaseState from "@/components/feature/SupabaseState";
import { formatLongDate } from "@/utils/date";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useStructuredData } from "@/hooks/useStructuredData";
import { postMeta } from "@/content/pageMeta";
import { buildArticleGraph } from "@/utils/structured";
import { getSiteOrigin } from "@/utils/site";

const AD_SLOT_MID = import.meta.env.VITE_ADSENSE_SLOT_ARTICLE_MID as string | undefined;
const AD_SLOT_END = import.meta.env.VITE_ADSENSE_SLOT_ARTICLE_END as string | undefined;

const slugifyHeading = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function ArticlePage() {
  const { slug } = useParams();
  const loadPost = useCallback(() => postsService.getBySlug(slug ?? ""), [slug]);
  const postQuery = useSupabaseData(loadPost, `post:${slug}`);
  const post = postQuery.data;

  /* Everything below depends on the article, so each query asks the database
     only for what this article needs instead of loading whole tables. */
  const loadRelated = useCallback(
    async () => (post ? postsService.getRelated(post.slug, post.categorySlug) : []),
    [post],
  );
  const loadProducts = useCallback(
    async () => (post ? productsService.getBySlugs(post.productSlugs ?? []) : []),
    [post],
  );
  const loadTerms = useCallback(
    async () => (post ? glossaryService.getByPostSlug(post.slug) : []),
    [post],
  );
  const relatedQuery = useSupabaseData(loadRelated, post ? `related:${post.slug}` : undefined);
  const productsQuery = useSupabaseData(loadProducts, post ? `post-products:${post.slug}` : undefined);
  const termsQuery = useSupabaseData(loadTerms, post ? `post-terms:${post.slug}` : undefined);

  const related = relatedQuery.data ?? [];
  const terms = termsQuery.data ?? [];

  const products = useMemo(() => {
    const order = post?.productSlugs ?? [];
    return [...(productsQuery.data ?? [])].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
  }, [post, productsQuery.data]);

  const meta = post ? postMeta(post) : null;
  usePageMeta({
    title: meta?.title ?? "Artigo não encontrado | Universo dos Cachos",
    description: meta?.description ?? "Este artigo não está disponível no Universo dos Cachos.",
    path: meta?.path ?? "/blog",
    image: post?.image,
    type: post ? "article" : "website",
    noindex: !post && !postQuery.loading && !postQuery.error,
  });

  /* Article + breadcrumb trail, so the reading path is explicit to search engines. */
  const structuredData = useMemo(
    () => (post ? buildArticleGraph(post, getSiteOrigin()) : null),
    [post],
  );

  useStructuredData("blog-article", structuredData);

  if (!post && (postQuery.loading || postQuery.error)) {
    return (
      <div className="page">
        <SiteNav solid />
        <main className="wrap" style={{ paddingTop: 160, paddingBottom: 120 }}>
          <SupabaseState loading={postQuery.loading} error={postQuery.error} onRetry={postQuery.reload} />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="page">
        <SiteNav solid />
        <main className="wrap" style={{ paddingTop: 160, paddingBottom: 120 }}>
          <div className="empty">
            <i className="ri-article-line" aria-hidden="true" />
            <h3>Artigo não encontrado</h3>
            <p>O texto pode ter mudado de endereço. Veja a biblioteca completa do blog.</p>
            <Link className="section-link" to="/blog">
              Voltar ao blog
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
        <article>
          <header className="article-head">
            <div className="wrap">
              <nav className="crumbs" aria-label="Você está aqui">
                <Link to="/">Início</Link>
                <span>/</span>
                <Link to="/blog">Blog</Link>
                <span>/</span>
                <span>{post.category}</span>
              </nav>

              <p className="post-meta">
                <span className="post-cat">{post.category}</span>
                <span className="dot">·</span>
                <span>{formatLongDate(post.date)}</span>
                <span className="dot">·</span>
                <span>{post.readingTime} min de leitura</span>
              </p>

              <h1>{post.title}</h1>
              <p className="article-sub">{post.subtitle}</p>

              <div className="article-meta">
                <Link className="article-byline" to="/sobre-a-redacao">
                  {post.author}
                </Link>
                <span className="dot">·</span>
                <span>{(post.tags ?? []).map((tag) => `#${tag}`).join("  ")}</span>
              </div>

              <div className="article-cover">
                <img src={post.image} alt={post.title} width={1600} height={1000} />
              </div>
            </div>
          </header>

          <div className="wrap">
            <div className="read-grid">
              <div className="prose-udc">
                <p className="prose-lead">{post.excerpt}</p>

                {(post.sections ?? []).map((section, index) => (
                  <Fragment key={section.heading}>
                    <section id={slugifyHeading(section.heading)}>
                      <h2>{section.heading}</h2>
                      {(section.paragraphs ?? []).map((paragraph) => (
                        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                      ))}
                      {(section.list ?? []).length > 0 ? (
                        <ul>
                          {(section.list ?? []).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                      {section.quote ? <blockquote>{section.quote}</blockquote> : null}
                    </section>
                    {index === 1 ? <AdSlot key={`${post.slug}-mid`} slot={AD_SLOT_MID} /> : null}
                  </Fragment>
                ))}

                <AdSlot key={`${post.slug}-end`} slot={AD_SLOT_END} />

                <p className="buy-note" style={{ marginTop: 32 }}>
                  Conteúdo editorial em revisão antes da publicação. Este texto tem caráter
                  informativo e não substitui avaliação profissional. Cada cabelo responde de um
                  jeito — observe o seu antes de mudar toda a rotina.
                </p>

                <p className="article-byline-note">
                  Escrito e revisado pela{" "}
                  <Link to="/sobre-a-redacao">redação do Universo dos Cachos</Link>. Na página da
                  equipe você vê quem assina cada área e como o conteúdo é apurado, revisado e
                  atualizado.
                </p>
              </div>

              <aside className="toc" aria-label="Sumário do artigo">
                <p>Neste texto</p>
                {(post.sections ?? []).map((section) => (
                  <a key={section.heading} href={`#${slugifyHeading(section.heading)}`}>
                    {section.heading}
                  </a>
                ))}
                <Link className="toc-cta" to="/produtos">
                  Ver a prateleira de produtos
                </Link>
              </aside>
            </div>
          </div>
        </article>

        {terms.length > 0 ? (
          <section className="section-block">
            <div className="wrap">
              <div className="section-head">
                <h2>
                  Termos <em>deste texto</em>
                </h2>
                <Link className="section-link" to="/glossario">
                  Glossário completo
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </Link>
              </div>
              <div className="gloss-mini-grid">
                {terms.map((term) => (
                  <Link
                    className="gloss-mini"
                    key={term.slug}
                    to={`/glossario#${term.slug}`}
                  >
                    <span className="gloss-mini-term">{term.term}</span>
                    <span className="gloss-mini-short">{term.short}</span>
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {products.length > 0 ? (
          <section className="section-block">
            <div className="wrap">
              <div className="section-head">
                <h2>
                  Produtos citados <em>neste texto</em>
                </h2>
                <Link className="section-link" to="/produtos">
                  Catálogo completo
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </Link>
              </div>

              <div className="grid-products">
                {products.map((product) => (
                  <Link className="pcard" key={product.slug} to={`/produtos/${product.slug}`}>
                    <div className="pcard-media">
                      <img loading="lazy" decoding="async" src={product.image} alt={product.name} width={900} height={900} />
                      <span className="pcard-tag">{product.categoryLabel}</span>
                    </div>
                    <div className="pcard-body">
                      <span className="pcard-brand">{product.brand}</span>
                      <span className="pcard-name">{product.name}</span>
                      <span className="pcard-foot">
                        {product.promoPrice || product.price ? (
                          <span className="price">{product.promoPrice || product.price}</span>
                        ) : (
                          <span className="price-ask">Consulte o preço na loja</span>
                        )}
                        <span className="pcard-go">
                          Ver produto
                          <i className="ri-arrow-right-line" aria-hidden="true" />
                        </span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <p className="disclosure">
                <strong>Transparência:</strong> os links levam a lojas parceiras e podemos receber
                comissão pela compra, sem custo adicional para você. O Universo dos Cachos não vende
                os produtos diretamente.
              </p>
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="section-block">
            <div className="wrap">
              <div className="section-head">
                <h2>
                  Continue <em>lendo</em>
                </h2>
                <Link className="section-link" to="/blog">
                  Ver todos os artigos
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid-posts">
                {related.map((item) => (
                  <Link className="post-card" key={item.slug} to={`/blog/${item.slug}`}>
                    <div className="post-card-media">
                      <img loading="lazy" decoding="async" src={item.image} alt={item.title} width={1600} height={1000} />
                    </div>
                    <p className="post-meta">
                      <span className="post-cat">{item.category}</span>
                      <span className="dot">·</span>
                      <span>{item.readingTime} min</span>
                    </p>
                    <h3>{item.title}</h3>
                    <p className="post-excerpt">{item.excerpt}</p>
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
      </main>
      <NewsletterBlock />
      <SiteFooter />
    </div>
  );
}