import { useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import { productsService, postsService } from "@/services";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import SupabaseState from "@/components/feature/SupabaseState";
import ProductCategoryPage from "@/pages/produtos/categoria/page";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useStructuredData } from "@/hooks/useStructuredData";
import { buildProductGraph } from "@/utils/structured";
import { categoryMeta, productMeta } from "@/content/pageMeta";
import { getSiteOrigin } from "@/utils/site";

const formatDate = (iso?: string | null) => {
  if (!iso) return null;
  const date = new Date(`${iso.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const loadProduct = useCallback(() => productsService.getBySlug(slug ?? ""), [slug]);
  const loadPosts = useCallback(() => postsService.getByProductSlug(slug ?? ""), [slug]);
  const loadCategory = useCallback(() => productsService.getCategoryBySlug(slug ?? ""), [slug]);
  const productQuery = useSupabaseData(loadProduct, `product:${slug}`);
  const postsQuery = useSupabaseData(loadPosts, `product-posts:${slug}`);
  const categoryQuery = useSupabaseData(loadCategory, `category:${slug}`);
  const category = categoryQuery.data;
  const product = productQuery.data;
  const [active, setActive] = useState(0);

  const images = useMemo(
    () => (product ? [product.image, ...(product.gallery ?? [])].filter(Boolean) : []),
    [product],
  );

  const relatedPosts = product ? (postsQuery.data ?? []) : [];

  const meta = product ? productMeta(product) : category ? categoryMeta(category) : null;
  const settled = !productQuery.loading && !categoryQuery.loading && !productQuery.error && !categoryQuery.error;
  usePageMeta({
    title: meta?.title ?? "Produto não encontrado | Universo dos Cachos",
    description: meta?.description ?? "Este produto não está mais no catálogo do Universo dos Cachos.",
    path: meta?.path ?? "/produtos",
    image: product?.image || category?.image || undefined,
    noindex: !meta && settled,
  });

  const hasPrice = Boolean(product?.promoPrice || product?.price);

  /* Product + breadcrumb. The Offer is only declared while the printed price is
     recent, so the markup never runs ahead of what the page can vouch for. */
  const structuredData = useMemo(
    () => (product ? buildProductGraph(product, getSiteOrigin()) : null),
    [product],
  );

  useStructuredData("product-detail", structuredData);

  if (!product && category && slug) {
    return <ProductCategoryPage slug={slug} />;
  }

  if (!product) {
    return (
      <div className="page">
        <SiteNav solid />
        <main className="wrap" style={{ paddingTop: 160, paddingBottom: 120 }}>
          {productQuery.loading || productQuery.error || categoryQuery.loading || categoryQuery.error ? (
            <SupabaseState
              loading={productQuery.loading || categoryQuery.loading}
              error={productQuery.error || categoryQuery.error}
              onRetry={() => {
                productQuery.reload();
                categoryQuery.reload();
              }}
            />
          ) : <div className="empty">
            <i className="ri-price-tag-3-line" aria-hidden="true" />
            <h3>Produto não encontrado</h3>
            <p>O link pode ter mudado ou o produto saiu da prateleira. Veja o catálogo completo.</p>
            <Link className="section-link" to="/produtos">
              Voltar ao catálogo
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </Link>
          </div>}
        </main>
        <SiteFooter />
      </div>
    );
  }

  const updatedLabel = formatDate(product.updatedAt);

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
                  src={images[active] ?? product.image}
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
                    <img loading="lazy" decoding="async" src={image} alt="" width={400} height={300} />
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
                    {updatedLabel ? <span className="ask">Preço informado em {updatedLabel}</span> : null}
                  </>
                ) : product.price ? (
                  <>
                    <span className="now">{product.price}</span>
                    {updatedLabel ? <span className="ask">Preço informado em {updatedLabel}</span> : null}
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
                  <dd>{(product.curls ?? []).join(" · ")}</dd>
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
                {updatedLabel ? (
                  <div>
                    <dt>Atualizado em</dt>
                    <dd>{updatedLabel}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </div>

          <section className="pdetail-body prose-udc" style={{ paddingBottom: 48 }}>
            {(product.sections ?? []).map((section) => (
              <div key={section.heading}>
                <h2>{section.heading}</h2>
                {(section.paragraphs ?? []).map((paragraph) => (
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
                      <img loading="lazy" decoding="async" src={post.image} alt={post.title} width={1600} height={1000} />
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