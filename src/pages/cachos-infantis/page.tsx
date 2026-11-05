import { useMemo } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import CategoryChips from "@/components/feature/CategoryChips";
import { PRODUCTS } from "@/mocks/products";
import { POSTS } from "@/mocks/posts";
import { formatShortDate } from "@/utils/date";
import { usePageMeta } from "@/hooks/usePageMeta";

const CHANGES = [
  {
    num: "01",
    title: "O fio é mais fino",
    text: "Cabelo infantil tem diâmetro menor e se embola com mais facilidade. Produto em excesso pesa na hora e some no dia seguinte.",
  },
  {
    num: "02",
    title: "O couro é mais sensível",
    text: "A pele da cabeça absorve e reage mais. Fórmulas suaves, sem essências fortes, e enxágue completo fazem diferença.",
  },
  {
    num: "03",
    title: "A paciência é curta",
    text: "Cinco minutos tranquilos valem mais do que uma rotina completa e tensa. Rotina curta, previsível e conversada funciona melhor.",
  },
  {
    num: "04",
    title: "A indicação vem da embalagem",
    text: "Produto de adulto não é versão infantil em quantidade menor. Confira sempre a faixa etária indicada pelo fabricante.",
  },
];

const STEPS = [
  {
    num: "Passo 01",
    title: "Lavagem sem drama",
    text: "Molhe bem, use uma quantidade pequena de shampoo suave e massageie o couro com a ponta dos dedos. Enxágue protegendo olhos e orelhas, com água morna — nunca quente.",
  },
  {
    num: "Passo 02",
    title: "Desembaraço com produto",
    text: "Sempre no molhado e com condicionador. Divida em partes, comece pelas pontas e use os dedos antes de qualquer pente. Se travar, falta produto ou água: não force.",
  },
  {
    num: "Passo 03",
    title: "Finalização leve",
    text: "Um creme suave, pouco produto, aplicado com a mão em concha. Nada de camadas: em cabelo fino, menos é mais. Deixe secar sem tocar para o cacho se formar.",
  },
  {
    num: "Passo 04",
    title: "Noite protegida",
    text: "Fronha de cetim ou touca de tecido leve ajudam a evitar atrito. Se o cabelo for longo, um abacaxi bem frouxo no topo da cabeça já resolve.",
  },
  {
    num: "Passo 05",
    title: "Proteção sem aperto",
    text: "Elásticos finos e tranças muito tensionadas podem causar desconforto e quebra. Prefira laços de tecido, solte antes de dormir e varie o penteado.",
  },
  {
    num: "Passo 06",
    title: "Sol e piscina",
    text: "Chinelo, boné e água doce depois do mar ou da piscina. Enxaguar o cloro e o sal no mesmo dia é mais eficiente do que qualquer tratamento posterior.",
  },
];

const SAFETY = [
  "Use apenas produtos indicados para a faixa etária da criança e leia a embalagem com atenção.",
  "Evite misturas caseiras, essências e ativos fortes: o couro cabeludo infantil é mais permeável.",
  "Não use alisantes, progressivas ou químicas de adulto em crianças.",
  "Suspenda o produto e procure orientação profissional se aparecer coceira, descamação ou irritação.",
  "Nunca deixe a criança sozinha na banheira ou com o secador ligado ao alcance das mãos.",
];

export default function KidsPage() {
  usePageMeta({
    title: "Cachos infantis: cuidados, rotina e produtos para crianças | Universo dos Cachos",
    description:
      "Guia para pais e responsáveis sobre cabelos cacheados e crespos de crianças: lavagem, desembaraço sem quebra, finalização suave, rotina noturna e produtos indicados por idade.",
    path: "/cachos-infantis",
  });

  const kidsProducts = useMemo(
    () =>
      PRODUCTS.filter((product) => product.categorySlug === "infantil").sort(
        (a, b) => Number(b.featured) - Number(a.featured),
      ),
    [],
  );

  const kidsPosts = useMemo(() => {
    const priority = POSTS.filter(
      (post) => post.categorySlug === "cachos-infantis" || post.categorySlug === "cuidados",
    ).sort((a, b) => b.date.localeCompare(a.date));
    return priority.slice(0, 3);
  }, []);

  return (
    <div className="page">
      <SiteNav solid />
      <main>
        <div className="wrap">
          <section className="kids-hero">
            <div>
              <nav className="crumbs" aria-label="Você está aqui">
                <Link to="/">Início</Link>
                <span>/</span>
                <span>Cachos infantis</span>
              </nav>
              <p className="stamp">Cachos infantis · para pais e responsáveis</p>
              <h1>
                Cabelo de criança pede
                <br />
                <em>gentileza</em>, não pressa.
              </h1>
              <p className="page-sub">
                Rotinas curtas, produtos indicados para a idade e um desembaraço que não vira briga.
                Um espaço para entender o fio da criança — e para cuidar da relação dela com o
                próprio cabelo.
              </p>
              <div className="kids-ctas">
                <a className="buy-btn" href="#rotina-infantil">
                  Ver a rotina em seis passos
                  <i className="ri-arrow-down-line" aria-hidden="true" />
                </a>
                <a className="btn-outline" href="#produtos-infantis">
                  Produtos infantis
                  <i className="ri-arrow-down-line" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="kids-hero-media">
              <img
                src="https://readdy.ai/api/search-image?query=Close%20gentle%20photograph%20of%20a%20parent&width=1200&height=900&seq=udc-kids-hero-01&orientation=landscape's hands arranging the soft natural curls of a small child in warm morning light, warm plaster wall, tender calm mood, warm nude and copper palette, no faces visible, no text"
                alt="Mãos de um adulto ajeitando os cachos naturais de uma criança"
                width={1200}
                height={900}
              />
            </div>
          </section>
        </div>

        <section className="section-block">
          <div className="wrap">
            <div className="section-head">
              <h2>
                O que muda no cabelo <em>de criança</em>
              </h2>
              <span className="head-count">Antes de qualquer produto</span>
            </div>
            <div className="kids-grid">
              {CHANGES.map((item) => (
                <article className="kids-card" key={item.num}>
                  <span className="num">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block" id="rotina-infantil">
          <div className="wrap">
            <div className="section-head">
              <h2>
                A rotina em seis <em>passos</em>
              </h2>
              <Link className="section-link" to="/produtos/infantil">
                Produtos infantis
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </div>
            <p className="page-sub" style={{ marginTop: 0, marginBottom: 22 }}>
              Uma sequência que caiba no banho de cinco minutos. Cada passo pode ser curto — o que
              importa é a ordem e a mão leve.
            </p>
            <div className="kids-steps">
              {STEPS.map((step) => (
                <article className="kids-card" key={step.num}>
                  <span className="num">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="wrap">
            <div className="cat-hero">
              <div>
                <p className="stamp">Segurança primeiro</p>
                <h2
                  style={{
                    margin: "14px 0 12px",
                    fontSize: "clamp(22px, 2.6vw, 34px)",
                    letterSpacing: "-.03em",
                    lineHeight: 1.1,
                  }}
                >
                  O que não entra na rotina
                  <br />
                  de uma <em className="accent">criança</em>.
                </h2>
                <ul className="kids-safety">
                  {SAFETY.map((item) => (
                    <li key={item}>
                      <i className="ri-shield-check-line" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="disclosure">
                  <strong>Importante:</strong> este conteúdo é informativo e não substitui a
                  avaliação de um profissional. Em caso de irritação, queda de cabelo ou coceira
                  persistente, procure um dermatologista ou pediatra.
                </p>
              </div>
              <div className="cat-hero-media">
                <img
                  src="https://readdy.ai/api/search-image?query=Soft%20still%20life%20of%20a%20small%20child&width=900&height=675&seq=udc-kids-safety-02&orientation=landscape's hair care items on warm beige plaster, a pale cream bottle, a wide tooth comb and a folded muslin cloth, minimal warm palette, gentle daylight, no text no labels"
                  alt="Itens simples de cuidado infantil sobre uma superfície clara"
                  width={900}
                  height={675}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-block" id="produtos-infantis">
          <div className="wrap">
            <div className="section-head">
              <h2>
                Produtos <em>infantis</em>
              </h2>
              <Link className="section-link" to="/produtos/infantil">
                Ver a categoria completa
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </div>

            {kidsProducts.length === 0 ? (
              <div className="empty">
                <i className="ri-price-tag-3-line" aria-hidden="true" />
                <h3>A prateleira infantil está sendo montada</h3>
                <p>
                  Estamos avaliando rótulos e faixas etárias antes de recomendar qualquer produto.
                  Enquanto isso, veja o catálogo completo.
                </p>
                <Link className="section-link" to="/produtos">
                  Ver todos os produtos
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <div className="grid-products shelf-kids">
                {kidsProducts.map((product) => (
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
            )}

            <p className="disclosure">
              <strong>Transparência:</strong> os links levam a lojas parceiras e podemos receber
              comissão pela compra, sem custo adicional para você. O Universo dos Cachos não vende os
              produtos e não substitui a indicação do fabricante nem a orientação de um profissional.
              <Link to="/transparencia" style={{ color: "inherit", textDecoration: "underline" }}>
                {" "}
                Como funcionam os afiliados.
              </Link>
            </p>

            <div style={{ paddingTop: 26 }}>
              <CategoryChips active="infantil" />
            </div>
          </div>
        </section>

        {kidsPosts.length > 0 ? (
          <section className="section-block">
            <div className="wrap">
              <div className="section-head">
                <h2>
                  Para ler com <em>calma</em>
                </h2>
                <Link className="section-link" to="/blog">
                  Ver todos os artigos
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid-posts">
                {kidsPosts.map((post) => (
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
      <SiteFooter />
    </div>
  );
}