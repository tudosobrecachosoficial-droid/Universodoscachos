import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import { PRODUCTS } from "@/mocks/products";
import { POSTS } from "@/mocks/posts";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useStructuredData } from "@/hooks/useStructuredData";
import { buildProductNode } from "@/utils/offers";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((item) => item.slug === slug);
  const [active, setActive] = useState(0);

  const images = useMemo(
    () => (product ? [product.image, ...product.gallery] : []),
    [product],
  );

  const relatedPosts = useMemo(
    () => (product ? POSTS.filter((post) => post.productSlugs.includes(product.slug)).slice(0, 3) : []),
    [product],
  );

  usePageMeta({
    title: product
      ? `${product.name} — ${product.brand} | Universo dos Cachos`
      : "Produto não encontrado | Universo dos Cachos",
    description: product
      ? product.summary
      : "Este produto não está mais no catálogo do Universo dos Cachos.",
    path: product ? `/produtos/${product.slug}` : "/produtos",
  });

  const hasPrice = Boolean(product?.promoPrice || product?.price);

  /* Product + Offer + breadcrumb: the price and availability declared here are
     the same ones printed on the page, so the markup never runs ahead of it. */
  const structuredData = useMemo(() => {
    if (!product) return null;
    const origin = window.location.origin;
    const pageUrl = `${origin}/produtos/${product.slug}`;

    return {
      "@context": "https://schema.org",
      "@graph": [
        buildProductNode(product, origin),
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#trilha`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: `${origin}/` },
            { "@type": "ListItem", position: 2, name: "Produtos", item: `${origin}/produtos` },
            {
              "@type": "ListItem",
              position: 3,
              name: product.categoryLabel,
              item: `${origin}/produtos/${product.categorySlug}`,
            },
            { "@type": "ListItem", position: 4, name: product.name, item: pageUrl },
          ],
        },
      ],
    };
  }, [product]);

  useStructuredData("product-detail", structuredData);

  if (!product) {
    return (
      <div className="page">
        <SiteNav solid />
        <main className="wrap" style={{ paddingTop: 160, paddingBottom: 120 }}>
          <div className="empty">
            <i className="ri-price-tag-3-line" aria-hidden="true" />
            <h3>Produto não encontrado</h3>
            <p>O link pode ter mudado ou o produto saiu da prateleira. Veja o catálogo completo.</p>
            <Link className="section-link" to="/produtos">
              Voltar ao catálogo
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
        <div className="wrap">
          <nav className="crumbs" aria-label="Você está aqui" style={{ paddingTop: 100 }}>
            <Link to="/">Início</Link>
            <span>/</span>
            <Link to="/produtos">Produtos</Link>
            <span>/</span>
            <Link to={`/produtos/${product.categorySlug}`}>{product.categoryLabel}</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          <div className="pdetail">
            <div className="pdetail-media">
              <div className="pdetail-hero">
                <img
                  src={images[active]}
                  alt={`${product.name} da marca ${product.brand}`}
                  width={900}
                  height={900}
                />
              </div>
              <div className="thumbs">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={index === active ? "is-active" : undefined}
                    aria-label={`Ver imagem ${index + 1} de ${product.name}`}
                    onClick={() => setActive(index)}
                  >
                    <img src={image} alt="" width={400} height={300} />
                  </button>
                ))}
              </div>
            </div>

            <div className="pdetail-info">
              <p className="pcard-brand">
                {product.brand} · {product.categoryLabel}
              </p>
              <h1>{product.name}</h1>
              <p className="pdetail-summary">{product.summary}</p>

              <div className="pdetail-price">
                {product.promoPrice ? (
                  <>
                    <span className="now">{product.promoPrice}</span>
                    <span className="was">{product.price}</span>
                    <span className="ask">Preço informado em {formatDate(product.updatedAt)}</span>
                  </>
                ) : product.price ? (
                  <>
                    <span className="now">{product.price}</span>
                    <span className="ask">Preço informado em {formatDate(product.updatedAt)}</span>
                  </>
                ) : (
                  <span className="ask">Consulte o preço na loja</span>
                )}
              </div>

              <a
                className="buy-btn"
                href={product.affiliateUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
              >
                Ver produto na {product.store}
                <i className="ri-external-link-line" aria-hidden="true" />
              </a>

              <p className="buy-note">
                O link abre a loja parceira em uma nova aba. Podemos receber uma comissão pela compra,
                sem custo adicional para você. O Universo dos Cachos não vende o produto diretamente e
                não controla preço, estoque ou prazo de entrega.
              </p>

              <dl className="spec-list">
                <div>
                  <dt>Categoria</dt>
                  <dd>{product.categoryLabel}</dd>
                </div>
                <div>
                  <dt>Curvaturas</dt>
                  <dd>{product.curls.join(" · ")}</dd>
                </div>
                <div>
                  <dt>Necessidade</dt>
                  <dd>{product.need}</dd>
                </div>
                <div>
                  <dt>Loja</dt>
                  <dd>{product.store}</dd>
                </div>
                <div>
                  <dt>Disponibilidade</dt>
                  <dd>
                    {hasPrice
                      ? "Disponível na loja parceira"
                      : "Conferir disponibilidade na loja parceira"}
                  </dd>
                </div>
                <div>
                  <dt>Atualizado em</dt>
                  <dd>{formatDate(product.updatedAt)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <section className="pdetail-body prose-udc" style={{ paddingBottom: 48 }}>
            {product.sections.map((section) => (
              <div key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            ))}
            <p className="buy-note">
              Conteúdo editorial em revisão antes da publicação. Não há promessa de resultado: cada
              cabelo responde de um jeito. Em caso de irritação, suspenda o uso e procure orientação
              profissional.
            </p>
          </section>
        </div>

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
                      <span>{post.readingTime} min de leitura</span>
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
      </main>
      <SiteFooter />
    </div>
  );
}