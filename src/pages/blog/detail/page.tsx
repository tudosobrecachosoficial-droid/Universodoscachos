import { useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import NewsletterBlock from "@/components/feature/NewsletterBlock";
import { postsService, productsService, glossaryService } from "@/services";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import SupabaseState from "@/components/feature/SupabaseState";
import { formatLongDate } from "@/utils/date";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useStructuredData } from "@/hooks/useStructuredData";

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
  const loadPosts = useCallback(() => postsService.getAll(), []);
  const loadProducts = useCallback(() => productsService.getAll(), []);
  const loadTerms = useCallback(() => glossaryService.getAll(), []);
  const postQuery = useSupabaseData(loadPost);
  const postsQuery = useSupabaseData(loadPosts);
  const productsQuery = useSupabaseData(loadProducts);
  const termsQuery = useSupabaseData(loadTerms);
  const post = postQuery.data;

  const related = useMemo(() => {
    if (!post) return [];
    const allPosts = postsQuery.data ?? [];
    const sameCategory = allPosts.filter(
      (item) => item.slug !== post.slug && item.categorySlug === post.categorySlug,
    );
    const others = allPosts.filter(
      (item) => item.slug !== post.slug && item.categorySlug !== post.categorySlug,
    );
    return [...sameCategory, ...others].slice(0, 3);
  }, [post, postsQuery.data]);

  const products = useMemo(
    () =>
      post
        ? (productsQuery.data ?? []).filter((item) => (post.productSlugs ?? []).includes(item.slug))
        : [],
    [post, productsQuery.data],
  );

  /* Terms from the glossary that are used in this article, so the reading
     can continue from the word to the explanation. */
  const terms = useMemo(
    () =>
      post
        ? (termsQuery.data ?? []).filter((item) => (item.postSlugs ?? []).includes(post.slug))
        : [],
    [post, termsQuery.data],
  );

  usePageMeta({
    title: post
      ? `${post.seoTitle} | Universo dos Cachos`
      : "Artigo não encontrado | Universo dos Cachos",
    description: post
      ? post.seoDescription
      : "Este artigo não está disponível no Universo dos Cachos.",
    path: post ? `/blog/${post.slug}` : "/blog",
  });

  /* Article + breadcrumb trail, so the reading path is explicit to search
     engines: which section the text belongs to and where it sits on the site. */
  const structuredData = useMemo(() => {
    if (!post) return null;
    const origin = window.location.origin;
    const pageUrl = `${origin}/blog/${post.slug}`;
    const siteUrl = `${origin}/`;
    const publisher = {
      "@type": "Organization",
      name: "Universo dos Cachos",
      url: siteUrl,
    };

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
          ...(post.date
            ? {
                datePublished: post.date,
                dateModified: post.date,
              }
            : {}),
          articleSection: post.category,
          keywords: (post.tags ?? []).join(", "),
          mainEntityOfPage: { "@id": pageUrl },
          author: {
            "@type": "Organization",
            name: post.author,
            url: `${origin}/sobre-a-redacao`,
          },
          publisher,
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
  }, [post]);

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

                {(post.sections ?? []).map((section) => (
                  <section key={section.heading} id={slugifyHeading(section.heading)}>
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
                ))}

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
                      <img src={product.image} alt={product.name} width={900} height={900} />
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
                      <img src={item.image} alt={item.title} width={1600} height={1000} />
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