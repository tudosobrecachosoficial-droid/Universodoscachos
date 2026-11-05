import { Link } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import CategoryChips from "@/components/feature/CategoryChips";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/mocks/products";
import { usePageMeta } from "@/hooks/usePageMeta";

type Props = {
  slug: string;
};

export default function ProductCategoryPage({ slug }: Props) {
  const category = PRODUCT_CATEGORIES.find((item) => item.slug === slug);
  const label = category?.label ?? "Categoria";
  const intro = category?.intro ?? "";

  usePageMeta({
    title: `${label} para cabelos naturais | Universo dos Cachos`,
    description:
      intro ||
      `Seleção de ${label.toLowerCase()} recomendados para cabelos ondulados, cacheados e crespos.`,
    path: `/produtos/${slug}`,
  });

  const products = PRODUCTS.filter((item) => item.categorySlug === slug).sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );

  const others = PRODUCT_CATEGORIES.filter(
    (item) => item.slug !== "todos" && item.slug !== slug,
  );

  return (
    <div className="page">
      <SiteNav solid />
      <main>
        <header className="page-head">
          <div className="wrap">
            <nav className="crumbs" aria-label="Você está aqui">
              <Link to="/">Início</Link>
              <span>/</span>
              <Link to="/produtos">Produtos</Link>
              <span>/</span>
              <span>{label}</span>
            </nav>

            <div className="cat-hero">
              <div>
                <p className="stamp">Prateleira · {label}</p>
                <h1>
                  {label} que fazem
                  <br />
                  sentido no <em>seu fio</em>.
                </h1>
                <p className="page-sub">{intro}</p>
                <p className="head-count" style={{ paddingTop: 18 }}>
                  {products.length} {products.length === 1 ? "produto" : "produtos"} nesta categoria
                </p>
              </div>
              {category?.image ? (
                <div className="cat-hero-media">
                  <img
                    src={category.image}
                    alt={`Seleção de ${label.toLowerCase()} do Universo dos Cachos`}
                    width={900}
                    height={675}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <div className="wrap">
          <section className="filters" aria-label="Categorias do catálogo">
            <CategoryChips active={slug} />
          </section>

          {products.length === 0 ? (
            <div className="empty">
              <i className="ri-price-tag-3-line" aria-hidden="true" />
              <h3>Ainda não há produtos nesta categoria</h3>
              <p>
                Estamos testando e escrevendo as fichas com calma — nada entra na prateleira sem
                passar por uma avaliação honesta. Enquanto isso, veja o catálogo completo.
              </p>
              <Link className="section-link" to="/produtos">
                Ver todos os produtos
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </div>
          ) : (
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
          )}

          <p className="disclosure">
            <strong>Transparência:</strong> este conteúdo contém links de afiliados. Podemos receber
            uma comissão quando você compra por meio desses links, sem custo adicional para você. A
            atribuição segue as regras da própria loja e o portal não vende os produtos diretamente.
            <Link to="/transparencia" style={{ color: "inherit", textDecoration: "underline" }}>
              {" "}
              Entenda como funciona.
            </Link>
          </p>

          <div className="cat-siblings">
            {others.map((item) => (
              <Link key={item.slug} className="chip" to={`/produtos/${item.slug}`}>
                {item.label}
              </Link>
            ))}
            <Link className="chip" to="/produtos">
              Ver catálogo completo
            </Link>
          </div>

          <div style={{ height: 56 }} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}