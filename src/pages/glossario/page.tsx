import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import NewsletterBlock from "@/components/feature/NewsletterBlock";
import { glossaryService, postsService, curlTypesService } from "@/services";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import SupabaseState from "@/components/feature/SupabaseState";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function GlossaryPage() {
  const loadTerms = useCallback(() => glossaryService.getAll(), []);
  const loadPosts = useCallback(() => postsService.getAll(), []);
  const loadCurlTypes = useCallback(() => curlTypesService.getAll(), []);
  const termsQuery = useSupabaseData(loadTerms);
  const postsQuery = useSupabaseData(loadPosts);
  const curlTypesQuery = useSupabaseData(loadCurlTypes);
  const terms = termsQuery.data ?? [];
  const posts = postsQuery.data ?? [];
  const curlTypes = curlTypesQuery.data ?? [];
  const letters = Array.from(new Set(terms.map((item) => item.letter).filter(Boolean))).sort();
  const termsReady = !termsQuery.loading && !termsQuery.error;

  usePageMeta({
    title: "Glossário de termos capilares | Universo dos Cachos",
    description:
      "Coil, day after, cronograma capilar, cutícula, umectação e outros termos do cuidado com cachos explicados em linguagem direta, com links para os artigos do portal.",
    path: "/glossario",
  });

  const { hash } = useLocation();
  const [letter, setLetter] = useState("todas");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 140);
    return () => window.clearTimeout(timer);
  }, [hash]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return terms.filter((item) => {
      const matchLetter = letter === "todas" || item.letter === letter;
      const matchTerm =
        !term ||
        item.term.toLowerCase().includes(term) ||
        item.short.toLowerCase().includes(term) ||
        item.long.toLowerCase().includes(term);
      return matchLetter && matchTerm;
    });
  }, [letter, query, terms]);

  const hasFilters = letter !== "todas" || query.trim() !== "";

  const reset = () => {
    setLetter("todas");
    setQuery("");
  };

  return (
    <div className="page">
      <SiteNav solid />
      <main>
        <header className="page-head">
          <div className="wrap">
            <nav className="crumbs" aria-label="Você está aqui">
              <Link to="/">Início</Link>
              <span>/</span>
              <span>Glossário</span>
            </nav>
            <div className="page-head-row">
              <div>
                <p className="stamp">Glossário</p>
                <h1>
                  As palavras do
                  <br />
                  cuidado, <em>explicadas</em>.
                </h1>
                <p className="page-sub">
                  Coil, cutícula, umectação, day after. Cada termo aparece aqui em linguagem direta e
                  aponta para os artigos em que ele é usado — assim nenhuma palavra do portal fica
                  solta no caminho.
                </p>
              </div>
              <p className="head-count">{terms.length} termos</p>
            </div>
          </div>
        </header>

        <div className="wrap">
          <SupabaseState
            loading={termsQuery.loading}
            error={termsQuery.error || postsQuery.error || curlTypesQuery.error}
            onRetry={() => {
              termsQuery.reload();
              postsQuery.reload();
              curlTypesQuery.reload();
            }}
          />
          <section className="gloss-toolbar" aria-label="Navegar pelo glossário">
            <label className="search-box gloss-search">
              <i className="ri-search-line" aria-hidden="true" />
              <input
                type="search"
                value={query}
                placeholder="Buscar termo, como coil ou day after"
                aria-label="Buscar termo no glossário"
                onChange={(event) => setQuery(event.currentTarget.value)}
              />
            </label>

            <div className="gloss-letters" role="group" aria-label="Filtrar por letra">
              <button
                type="button"
                className={letter === "todas" ? "gloss-letter is-active" : "gloss-letter"}
                aria-pressed={letter === "todas"}
                onClick={() => setLetter("todas")}
              >
                Todos
              </button>
              {letters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={letter === item ? "gloss-letter is-active" : "gloss-letter"}
                  aria-pressed={letter === item}
                  onClick={() => setLetter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {hasFilters ? (
              <button type="button" className="clear-link" onClick={reset}>
                Limpar
              </button>
            ) : null}
          </section>

          {termsReady && filtered.length === 0 ? (
            <div className="empty">
              <i className="ri-book-open-line" aria-hidden="true" />
              <h3>Nenhum termo com esses filtros</h3>
              <p>
                Tente outra palavra ou volte para a lista completa. Se o termo que você procura não
                existe aqui, escreva para a gente — o glossário cresce com as dúvidas de quem lê.
              </p>
              <button type="button" className="clear-link" onClick={reset}>
                Ver todos os termos
              </button>
            </div>
          ) : termsReady ? (
            <div className="gloss-list">
              {filtered.map((item) => {
                const relatedPosts = (item.postSlugs ?? [])
                .map((slug) => posts.find((post) => post.slug === slug))
                .filter((post): post is (typeof posts)[number] => Boolean(post));
                const codes = (item.codes ?? [])
                .map((code) => curlTypes.find((type) => type.code === code))
                .filter((type): type is (typeof curlTypes)[number] => Boolean(type));

                return (
                  <article className="gloss-term" id={item.slug || item.id} key={item.id}>
                    <div className="gloss-term-head">
                      <span className="gloss-letter-mark">{item.letter}</span>
                      <h2>{item.term}</h2>
                    </div>
                    <p className="gloss-short">{item.short}</p>
                    <p className="gloss-long">{item.long}</p>

                    <div className="gloss-term-foot">
                      {relatedPosts.length > 0 ? (
                        <div className="gloss-links">
                          <span className="gloss-links-label">Onde aparece</span>
                          {relatedPosts.map((post) => (
                            <Link
                              className="gloss-article"
                              key={post.slug}
                              to={`/blog/${post.slug}`}
                            >
                              {post.title}
                              <i className="ri-arrow-right-line" aria-hidden="true" />
                            </Link>
                          ))}
                        </div>
                      ) : null}

                      {codes.length > 0 ? (
                        <div className="gloss-codes">
                          <span className="gloss-links-label">Curvaturas</span>
                          {codes.map((type) => (
                            <Link
                              className="gloss-code"
                              key={type.slug}
                              to={`/tipos-de-cachos/${type.slug}`}
                              title={`Guia do ${type.name}`}
                            >
                              {type.code}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : null}

          <div className="gloss-footer">
            <div>
              <p className="stamp">Continue</p>
              <p className="gloss-footer-text">
                As palavras fazem mais sentido dentro de uma rotina. Se você ainda não sabe por onde
                começar, o quiz de três perguntas indica uma curvatura para ler primeiro.
              </p>
            </div>
            <div className="cat-siblings" style={{ paddingTop: 0 }}>
              <Link className="chip" to="/quiz">
                Fazer o quiz de curvatura
              </Link>
              <Link className="chip" to="/tipos-de-cachos">
                Guia das nove curvaturas
              </Link>
              <Link className="chip" to="/blog">
                Todos os artigos
              </Link>
            </div>
          </div>

          <p className="disclosure">
            <strong>Nota editorial:</strong> o glossário explica termos usados no portal e não
            substitui avaliação profissional. Se houver queda intensa, irritação no couro cabeludo ou
            quebra que não melhora, procure orientação de um profissional.
          </p>
        </div>

        <div style={{ height: 56 }} />
      </main>
      <NewsletterBlock />
      <SiteFooter />
    </div>
  );
}