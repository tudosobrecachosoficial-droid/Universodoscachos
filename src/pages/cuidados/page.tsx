import { Link } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import NewsletterBlock from "@/components/feature/NewsletterBlock";
import { CARE_MISTAKES, CARE_PILLARS, CARE_PRODUCT_SLUGS, CARE_SIGNS } from "@/mocks/care";
import { CURL_TYPES } from "@/mocks/curlTypes";
import { PRODUCTS } from "@/mocks/products";
import { POSTS } from "@/mocks/posts";
import { usePageMeta } from "@/hooks/usePageMeta";
import { formatShortDate } from "@/utils/date";

export default function CarePage() {
  usePageMeta({
    title: "Cuidados com cabelos cacheados e crespos | Universo dos Cachos",
    description:
      "O que sustenta o cuidado com cabelos ondulados, cacheados e crespos: lavagem, desembaraço, hidratação, proteção contra atrito e os sinais que o fio dá antes de quebrar.",
    path: "/cuidados",
  });

  const products = CARE_PRODUCT_SLUGS
    .map((slug) => PRODUCTS.find((item) => item.slug === slug))
    .filter((item): item is (typeof PRODUCTS)[number] => Boolean(item));

  const posts = POSTS
    .filter((post) => post.categorySlug === "cuidados")
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <div className="page">
      <SiteNav solid />
      <main>
        <header className="page-head">
          <div className="wrap">
            <nav className="crumbs" aria-label="Você está aqui">
              <Link to="/">Início</Link>
              <span>/</span>
              <span>Cuidados</span>
            </nav>

            <div className="curl-hero">
              <div className="curl-hero-copy">
                <p className="stamp">Cuidados</p>
                <h1>
                  O cuidado começa
                  <br />
                  <em>antes</em> do produto.
                </h1>
                <p className="page-sub">
                  Cabelo cacheado não pede uma prateleira inteira: pede ordem, quantidade e
                  constância. Antes de comprar mais um pote, vale entender o que o seu fio está
                  pedindo — e o que ele já tem de sobra.
                </p>
                <div className="kids-ctas">
                  <Link className="buy-btn" to="/rotinas">
                    Ver a rotina semanal
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </Link>
                  <Link className="btn-outline" to="/tipos-de-cachos">
                    Guia de curvaturas
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="curl-hero-media">
                <img
                  src="https://readdy.ai/api/search-image?query=Editorial%20close-up%20of%20hands%20applying%20conditioner%20to%20wet%20curly%20dark%20hair%20in%20a%20warm%20plaster%20bathroom%2C%20soft%20diffused%20daylight%2C%20warm%20nude%20and%20copper%20tones%2C%20calm%20intimate%20beauty%20photography%2C%20shallow%20depth%20of%20field%2C%20no%20text%20no%20logos&width=900&height=1125&seq=udc-care-hero-2026&orientation=portrait"
                  alt="Mãos aplicando condicionador em cabelo cacheado molhado, em um banheiro de tons quentes."
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
                Quatro cuidados que <em>sustentam</em> o resto
              </h2>
            </div>
            <p className="section-lede">
              Técnica resolve mais do que produto caro. Se esses quatro pontos estiverem no lugar, a
              finalização rende melhor — e o cabelo chega ao dia seguinte inteiro.
            </p>

            <div className="kids-grid">
              {CARE_PILLARS.map((pillar) => (
                <div className="kids-card" key={pillar.num}>
                  <span className="num">{pillar.num}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="wrap">
            <div className="section-head">
              <h2>
                O que o fio costuma <em>avisar</em>
              </h2>
              <Link className="section-link" to="/blog/hidratacao-nutricao-reconstrucao">
                Entender as três etapas
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </div>
            <p className="section-lede">
              Fio áspero não é a mesma coisa que fio opaco, e nenhum dos dois é a mesma coisa que fio
              que estica. Ler o sinal certo evita meses usando o produto errado.
            </p>

            <div className="care-signs">
              {CARE_SIGNS.map((item) => (
                <div className="care-sign" key={item.signal}>
                  <span className="label">Sinal</span>
                  <h3>{item.signal}</h3>
                  {item.missing ? <span className="missing">Costuma faltar: {item.missing}</span> : null}
                  <p>{item.action}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="wrap">
            <div className="section-head">
              <h2>
                O que costuma <em>atrapalhar</em>
              </h2>
            </div>
            <div className="prose-udc">
              <p>
                Nenhum desses hábitos é imperdoável — todos aparecem com frequência, inclusive em
                rotinas bem intencionadas. A diferença é que, quando eles saem do caminho, o cabelo
                responde rápido.
              </p>
              <ul>
                {CARE_MISTAKES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                E existe um cuidado que não é sobre produto: se houver queda intensa, coceira
                persistente, feridas no couro cabeludo ou quebra que não melhora, procure orientação
                profissional. Conteúdo editorial ajuda a entender o cabelo, mas não substitui
                avaliação.
              </p>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="wrap">
            <div className="section-head">
              <h2>
                Cuidados <em>por curvatura</em>
              </h2>
              <Link className="section-link" to="/tipos-de-cachos">
                Comparar as nove
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </div>
            <p className="section-lede">
              A curvatura muda a quantidade de produto e a frequência dos tratamentos. Cada página
              traz características, finalização passo a passo e os produtos indicados.
            </p>

            <div className="curl-mini-grid">
              {CURL_TYPES.map((type) => (
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
                Produtos que aparecem <em>nestes cuidados</em>
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
              uma comissão quando você compra por meio deles, sem custo adicional para você. O portal
              não vende os produtos e não controla preço, estoque ou prazo de entrega.
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