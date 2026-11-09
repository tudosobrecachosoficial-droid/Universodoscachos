import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import NewsletterBlock from "@/components/feature/NewsletterBlock";
import { POST_CATEGORIES } from "@/mocks/posts";
import { postsService } from "@/services";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import SupabaseState from "@/components/feature/SupabaseState";
import { formatShortDate } from "@/utils/date";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function BlogPage() {
  const loadPosts = useCallback(() => postsService.getAll(), []);
  const { data: posts, error, loading, reload } = useSupabaseData(loadPosts);
  usePageMeta({
    title: "Blog do Universo dos Cachos — cuidados, rotinas e tipos de cachos",
    description:
      "Artigos sobre cuidados com cabelos ondulados, cacheados e crespos: rotinas, cronograma capilar, finalização, day after e cachos infantis.",
    path: "/blog",
  });

  const [category, setCategory] = useState("todos");

  const sorted = useMemo(
    () => [...(posts ?? [])].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "")),
    [posts],
  );

  const featured = sorted.find((post) => post.featured) ?? sorted[0];

  const rest = useMemo(() => {
    if (!featured) return [];
    const list = sorted.filter((post) => post.slug !== featured.slug);
    if (category === "todos") return list;
    return list.filter((post) => post.categorySlug === category);
  }, [sorted, featured, category]);

  return (
    <div className="page">
      <SiteNav solid />
      <main>
        <header className="page-head">
          <div className="wrap">
            <nav className="crumbs" aria-label="Você está aqui">
              <Link to="/">Início</Link>
              <span>/</span>
              <span>Blog</span>
            </nav>
            <div className="page-head-row">
              <div>
                <p className="stamp">O diário</p>
                <h1>
                  Textos para ler
                  <br />
                  com o cabelo <em>molhado</em>.
                </h1>
                <p className="page-sub">
                  Rotinas honestas, guias de curvatura e respostas para as dúvidas que aparecem no
                  banheiro. Conteúdo editorial, sem promessa de milagre.
                </p>
              </div>
              <p className="head-count">{sorted.length} publicações</p>
            </div>
          </div>
        </header>

        <div className="wrap">
          <SupabaseState loading={loading} error={error} onRetry={reload} />

          {featured ? <article className="feature-post">
            <Link to={`/blog/${featured.slug}`} aria-label={featured.title}>
              <div className="feature-media">
                <img src={featured.image} alt={featured.title} width={1600} height={1000} />
              </div>
            </Link>
            <div>
              <p className="post-meta">
                <span className="post-cat">Em destaque · {featured.category}</span>
                <span className="dot">·</span>
                <span>{formatShortDate(featured.date)}</span>
                <span className="dot">·</span>
                <span>{featured.readingTime} min</span>
              </p>
              <Link to={`/blog/${featured.slug}`}>
                <h2 className="feature-title">{featured.title}</h2>
              </Link>
              <p className="post-excerpt">{featured.excerpt}</p>
              <Link className="read-link" to={`/blog/${featured.slug}`}>
                Ler o artigo
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </div>
          </article> : !loading && !error ? (
            <div className="empty">
              <i className="ri-article-line" aria-hidden="true" />
              <h3>Ainda não há artigos publicados</h3>
              <p>Os artigos publicados no banco aparecerão aqui.</p>
            </div>
          ) : null}

          <section className="filters" aria-label="Categorias do blog" style={{ paddingTop: 26 }}>
            <div className="chip-row">
              {POST_CATEGORIES.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  className={category === item.slug ? "chip is-active" : "chip"}
                  aria-pressed={category === item.slug}
                  onClick={() => setCategory(item.slug)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </section>

          {!loading && !error && rest.length === 0 && featured ? (
            <div className="empty">
              <i className="ri-article-line" aria-hidden="true" />
              <h3>Ainda não há textos nesta categoria</h3>
              <p>
                Estamos escrevendo. Enquanto isso, veja as outras categorias ou receba os próximos
                textos pela newsletter.
              </p>
              <button type="button" className="clear-link" onClick={() => setCategory("todos")}>
                Ver todos os textos
              </button>
            </div>
          ) : (
            <div className="grid-posts">
              {rest.map((post) => (
                <Link className="post-card" key={post.slug} to={`/blog/${post.slug}`}>
                  <div className="post-card-media">
                    <img src={post.image} alt={post.title} width={1600} height={1000} />
                  </div>
                  <p className="post-meta">
                    <span className="post-cat">{post.category}</span>
                    <span className="dot">·</span>
                    <span>{formatShortDate(post.date)}</span>
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
          )}
        </div>

        <div style={{ height: 48 }} />
      </main>
      <NewsletterBlock />
      <SiteFooter />
    </div>
  );
}