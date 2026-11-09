import { useCallback, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import CategoryChips from "@/components/feature/CategoryChips";
import { productsService } from "@/services";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import SupabaseState from "@/components/feature/SupabaseState";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useStructuredData } from "@/hooks/useStructuredData";
import { buildProductList } from "@/utils/offers";

const CURL_FILTERS = ["2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"];

const SORTS = [
  { value: "destaque", label: "Destaques primeiro" },
  { value: "nome", label: "Nome de A a Z" },
  { value: "recentes", label: "Atualizados recentemente" },
];

export default function ProductsPage() {
  const loadProducts = useCallback(() => productsService.getAll(), []);
  const { data: products, error, loading, reload } = useSupabaseData(loadProducts);
  const productList = products ?? [];
  const brands = Array.from(new Set(productList.map((product) => product.brand))).sort((a, b) =>
    a.localeCompare(b),
  );

  usePageMeta({
    title: "Produtos recomendados para cachos | Universo dos Cachos",
    description:
      "Catálogo de shampoos, máscaras, cremes de pentear, ativadores e acessórios recomendados para cabelos ondulados, cacheados e crespos.",
    path: "/produtos",
  });

  /* CollectionPage + ItemList: the whole shelf is declared once, with the same
     prices printed on the cards, so a crawler understands the catalogue as a
     list of products instead of a page of loose links. */
  const structuredData = useMemo(() => {
    const origin = window.location.origin;
    const pageUrl = `${origin}/produtos`;
    const listDescription =
      "Prateleira do Universo dos Cachos: shampoos, condicionadores, máscaras, nutrição, reconstrução, cremes de pentear, ativadores, óleos capilares, acessórios e produtos infantis indicados por curvatura.";

    const schemaProductList = buildProductList({
      origin,
      pageUrl,
      products: productList,
      name: "Prateleira de produtos para cachos",
      description: listDescription,
    });

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#catalogo`,
          name: "Catálogo de produtos para cachos",
          description: listDescription,
          url: pageUrl,
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "Universo dos Cachos",
            url: `${origin}/`,
          },
          ...(schemaProductList ? { mainEntity: { "@id": `${pageUrl}#produtos` } } : {}),
        },
        ...(schemaProductList ? [schemaProductList] : []),
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#trilha`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: `${origin}/` },
            { "@type": "ListItem", position: 2, name: "Produtos", item: pageUrl },
          ],
        },
      ],
    };
  }, [productList]);

  useStructuredData("product-catalog", structuredData);

  const [searchParams, setSearchParams] = useSearchParams();
  const [brand, setBrand] = useState("todas");
  const [sort, setSort] = useState("destaque");
  const [query, setQuery] = useState("");

  /* The curl type lives in the address (/produtos?tipo=3b) so every curvature
     page can send readers straight to a filtered shelf. */
  const rawTipo = (searchParams.get("tipo") ?? "").toLowerCase();
  const curl = CURL_FILTERS.some((item) => item.toLowerCase() === rawTipo)
    ? rawTipo.toUpperCase()
    : "todos";

  const setCurl = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === "todos") {
      next.delete("tipo");
    } else {
      next.set("tipo", value.toLowerCase());
    }
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = productList.filter((product) => {
      const matchCurl = curl === "todos" || (product.curls ?? []).includes(curl);
      const matchBrand = brand === "todas" || product.brand === brand;
      const matchTerm =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.need.toLowerCase().includes(term);
      return matchCurl && matchBrand && matchTerm;
    });

    if (sort === "nome") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "recentes") {
      return [...list].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    }
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [curl, brand, sort, query, productList]);

  const hasFilters = curl !== "todos" || brand !== "todas" || query.trim() !== "";

  const reset = () => {
    setCurl("todos");
    setBrand("todas");
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
              <span>Produtos</span>
            </nav>
            <div className="page-head-row">
              <div>
                <p className="stamp">A prateleira</p>
                <h1>
                  Produtos que fazem
                  <br />
                  sentido no seu <em>cabelo</em>.
                </h1>
                <p className="page-sub">
                  Escolhas organizadas por função: limpar, hidratar, nutrir, reconstruir, definir e
                  finalizar. Os links levam às lojas parceiras — o Universo dos Cachos não vende
                  diretamente.
                </p>
              </div>
              <p className="head-count">{filtered.length} produtos</p>
            </div>
          </div>
        </header>

        <div className="wrap">
          <section className="filters" aria-label="Filtros do catálogo">
            <CategoryChips active="todos" />

            <div className="filters-row">
              <label className="search-box">
                <i className="ri-search-line" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  placeholder="Buscar produto, marca ou necessidade"
                  aria-label="Buscar produto"
                  onChange={(event) => setQuery(event.currentTarget.value)}
                />
              </label>

              <div className="select-box">
                <i className="ri-scissors-line" aria-hidden="true" />
                <select value={curl} aria-label="Filtrar por tipo de cacho" onChange={(event) => setCurl(event.currentTarget.value)}>
                  <option value="todos">Todos os tipos de cacho</option>
                  {CURL_FILTERS.map((item) => (
                    <option key={item} value={item}>
                      Tipo {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="select-box">
                <i className="ri-price-tag-3-line" aria-hidden="true" />
                <select value={brand} aria-label="Filtrar por marca" onChange={(event) => setBrand(event.currentTarget.value)}>
                  <option value="todas">Todas as marcas</option>
                  {brands.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="select-box">
                <i className="ri-sort-desc" aria-hidden="true" />
                <select value={sort} aria-label="Ordenar produtos" onChange={(event) => setSort(event.currentTarget.value)}>
                  {SORTS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {hasFilters ? (
                <button type="button" className="clear-link" onClick={reset}>
                  Limpar filtros
                </button>
              ) : null}
            </div>
          </section>

          <SupabaseState loading={loading} error={error} onRetry={reload} />

          {curl !== "todos" ? (
            <div className="filter-note">
              <i className="ri-scissors-line" aria-hidden="true" />
              <p>
                Mostrando a prateleira do tipo <strong>{curl}</strong> — produtos indicados para essa
                curvatura.
              </p>
              <div className="filter-note-actions">
                <Link to={`/tipos-de-cachos/${curl.toLowerCase()}`}>
                  Ler o guia do {curl}
                </Link>
                <button type="button" className="clear-link" onClick={() => setCurl("todos")}>
                  Ver todos os tipos
                </button>
              </div>
            </div>
          ) : null}

          {!loading && !error && filtered.length === 0 ? (
            <div className="empty">
              <i className="ri-search-eye-line" aria-hidden="true" />
              <h3>{productList.length ? "Nenhum produto com esses filtros" : "Ainda não há produtos publicados"}</h3>
              <p>
                {productList.length
                  ? "Tente outro tipo de cacho, outra marca ou limpe a busca."
                  : "Os produtos cadastrados no banco aparecerão aqui."}
              </p>
              <button type="button" className="clear-link" onClick={reset}>
                {productList.length ? "Ver todos os produtos" : "Limpar filtros"}
              </button>
            </div>
          ) : !loading && !error ? (
            <div className="grid-products">
              {filtered.map((product) => (
                <Link className="pcard" key={product.slug} to={`/produtos/${product.slug}`}>
                  <div className="pcard-media">
                    <img src={product.image} alt={`${product.name} da marca ${product.brand}`} width={900} height={900} />
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
          ) : null}

          <p className="disclosure">
            <strong>Transparência:</strong> este conteúdo contém links de afiliados. Podemos receber
            uma comissão quando você compra por meio desses links, sem custo adicional para você. A
            atribuição da comissão segue as regras da própria loja. Preços e disponibilidade são
            informados na data de atualização de cada produto e podem mudar — confirme sempre na loja.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}