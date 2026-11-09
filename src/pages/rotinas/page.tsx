import { useCallback } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import NewsletterBlock from "@/components/feature/NewsletterBlock";
import {
  DAY_AFTER_TIPS,
  ROUTINE_PLAN,
  ROUTINE_PRODUCT_SLUGS,
  WASH_STEPS,
} from "@/mocks/routines";
import { curlTypesService, productsService, postsService, routinesService } from "@/services";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import SupabaseState from "@/components/feature/SupabaseState";
import { usePageMeta } from "@/hooks/usePageMeta";
import { formatShortDate } from "@/utils/date";

export default function RoutinesPage() {
  const loadRoutine = useCallback(() => routinesService.getAll(), []);
  const loadCurls = useCallback(() => curlTypesService.getAll(), []);
  const loadProducts = useCallback(() => productsService.getAll(), []);
  const loadPosts = useCallback(() => postsService.getAll(), []);
  const routineQuery = useSupabaseData(loadRoutine);
  const curlQuery = useSupabaseData(loadCurls);
  const productsQuery = useSupabaseData(loadProducts);
  const postsQuery = useSupabaseData(loadPosts);
  const routineWeek = routineQuery.data ?? [];
  const curlTypes = curlQuery.data ?? [];
  const allProducts = productsQuery.data ?? [];
  const allPosts = postsQuery.data ?? [];

  usePageMeta({
    title: "Rotinas capilares para cachos: semana, mês e day after | Universo dos Cachos",
    description:
      "Uma rotina capilar que cabe na semana real: passo a passo do dia de lavagem, cronograma mensal de hidratação, nutrição e reconstrução, day after e cuidados por curvatura.",
    path: "/rotinas",
  });

  const products = ROUTINE_PRODUCT_SLUGS
    .map((slug) => allProducts.find((item) => item.slug === slug))
    .filter((item): item is (typeof allProducts)[number] => Boolean(item));

  const posts = allPosts
    .filter((post) => post.categorySlug === "rotinas")
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .slice(0, 3);

  return (
    <div className="page">
      <SiteNav solid />
      <main>
        <div className="wrap">
          <SupabaseState
            loading={routineQuery.loading || curlQuery.loading || productsQuery.loading || postsQuery.loading}
            error={routineQuery.error || curlQuery.error || productsQuery.error || postsQuery.error}
            onRetry={() => {
              routineQuery.reload();
              curlQuery.reload();
              productsQuery.reload();
              postsQuery.reload();
            }}
          />
        </div>
        <header className="page-head">
          <div className="wrap">
            <nav className="crumbs" aria-label="Você está aqui">
              <Link to="/">Início</Link>
              <span>/</span>
              <span>Rotinas</span>
            </nav>

            <div className="curl-hero">
              <div className="curl-hero-copy">
                <p className="stamp">Rotinas</p>
                <h1>
                  A rotina que
                  <br />
                  <em>cabe</em> na sua semana.
                </h1>
                <p className="page-sub">
                  Cronograma não é prova de resistência. É uma sequência simples — lavagem,
                  hidratação, nutrição e uma reconstrução pontual — distribuída em dias que você
                  realmente tem. O resto é técnica e paciência.
                </p>
                <div className="kids-ctas">
                  <Link className="buy-btn" to="/cuidados">
                    Entender os cuidados
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </Link>
                  <Link className="btn-outline" to="/tipos-de-cachos">
                    Ajustar pela curvatura
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="curl-hero-media">
                <img
                  src="https://readdy.ai/api/search-image?query=Editorial%20flat%20lay%20of%20an%20unlabeled%20cream%20hair%20mask%20jar%2C%20a%20wooden%20comb%20and%20a%20linen%20towel%20on%20a%20warm%20beige%20plaster%20surface%2C%20soft%20morning%20daylight%2C%20warm%20nude%20and%20copper%20tones%2C%20calm%20minimal%20beauty%20still%20life%2C%20no%20text%20no%20logos&width=900&height=1125&seq=udc-routine-hero-2026&orientation=portrait"
                  alt="Composição com máscara capilar, pente de madeira e toalha de linho sobre superfície de gesso quente."
                  width={900}
                  height={1125}
                />
              </div>
            </div>
          </div>
        </header>

        <section className="section-block">
          <div className="wrap">
            <div className="section-head">
              <h2>
                Uma semana <em>possível</em>
              </h2>
            </div>
            <p className="section-lede">
              Esse é um exemplo de sequência para cabelos cacheados que lavam duas vezes por semana.
              Ajuste os dias ao seu couro cabeludo: <strong>oleosidade manda mais do que calendário</strong>.
            </p>

            <div className="routine-week">
              {routineWeek.map((item) => (
                <div className="routine-row" key={item.id}>
                  <span className="routine-day">{item.day}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text ?? item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="wrap">
            <div className="section-head">
              <h2>
                O mês, em quatro <em>etapas</em>
              </h2>
              <Link className="section-link" to="/blog/como-montar-um-cronograma-capilar">
                Montar o seu cronograma
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </div>
            <p className="section-lede">
              Hidratação é a base; nutrição entra a cada quinze dias; reconstrução é exceção, não
              rotina. Na dúvida entre as três, comece pela água.
            </p>

            <div className="routine-plan">
              {ROUTINE_PLAN.map((item) => (
                <div className="kids-card" key={item.week}>
                  <span className="num">{item.week}</span>
                  <h3>{item.focus}</h3>
                  <p>{item.text}</p>
                  <span className="routine-tag">
                    <i className="ri-leaf-line" aria-hidden="true" />
                    {item.product}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="wrap">
            <div className="section-head">
              <h2>
                O dia de lavagem, em <em>cinco passos</em>
              </h2>
            </div>

            <div className="prose-udc">
              <ol className="curl-steps">
                {WASH_STEPS.map((step, index) => (
                  <li key={step.title}>
                    <span className="curl-step-num">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="wrap">
            <div className="section-head">
              <h2>
                Day after sem <em>retrabalho</em>
              </h2>
              <Link className="section-link" to="/blog/o-que-e-day-after">
                Ler sobre day after
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </div>

            <div className="kids-grid">
              {DAY_AFTER_TIPS.map((tip, index) => (
                <div className="kids-card" key={tip.title}>
                  <span className="num">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{tip.title}</h3>
                  <p>{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="wrap">
            <div className="section-head">
              <h2>
                A rotina muda com a <em>curvatura</em>
              </h2>
              <Link className="section-link" to="/tipos-de-cachos">
                Guia 2A a 4C
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </div>

            <div className="curl-mini-grid">
              {curlTypes.map((type) => (
                <Link className="curl-mini" key={type.slug} to={`/tipos-de-cachos/${type.slug}`}>
                  <span className="curl-mini-code">{type.code}</span>
                  <span className="curl-mini-name">{type.name}</span>
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="wrap">
            <div className="section-head">
              <h2>
                O que costuma estar na <em>bancada</em>
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
                  </div>
                </Link>
              ))}
            </div>

            <p className="disclosure">
              <strong>Transparência:</strong> este conteúdo contém links de afiliados. Podemos receber
              uma comissão quando você compra por meio deles, sem custo adicional para você. Preços e
              disponibilidade são conferidos na loja.
            </p>
          </div>
        </section>

        {posts.length > 0 ? (
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
                {posts.map((post) => (
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
            </div>
          </section>
        ) : null}

        <div style={{ height: 56 }} />
      </main>
      <NewsletterBlock />
      <SiteFooter />
    </div>
  );
}