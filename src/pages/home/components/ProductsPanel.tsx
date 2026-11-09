import { useCallback } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import Panel from "@/pages/home/components/Panel";
import { productsService } from "@/services";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import SupabaseState from "@/components/feature/SupabaseState";

export default function ProductsPanel() {
  const loadProducts = useCallback(() => productsService.getFeatured(), []);
  const { data: shelf, error, loading, reload } = useSupabaseData(loadProducts);

  return (
    <Panel
      id="produtos"
      side="left"
      image="https://readdy.ai/api/search-image?query=Still%20life%20of%20three%20unlabeled%20amber%20glass%20hair%20care%20bottles%20and%20a%20folded%20linen%20towel%20on%20a%20warm%20plaster%20shelf%2C%20products%20clustered%20in%20the%20right%20third%20of%20the%20frame%2C%20the%20left%20half%20empty%20soft%20shadowed%20wall%2C%20warm%20brown%20nude%20palette%2C%20gentle%20side%20light%2C%20editorial%20cosmetics%20photography%2C%20no%20text%2C%20no%20logos&width=2400&height=1350&seq=udc-shelf-2403&orientation=landscape"
      alt="Frascos âmbar de cuidado capilar e uma toalha de linho sobre uma prateleira de reboco claro."
    >
      <div className="panel-copy panel-copy--wide" data-parallax="-0.08">
        <p className="stamp" data-reveal>
          04 — Recomendações
        </p>
        <h2 data-reveal>
          A prateleira
          <br />
          que <em className="accent">funciona</em>.
        </h2>
        <p className="sub" data-reveal>
          Poucos produtos, escolhidos por função: hidratar, definir, finalizar. O atalho em cada cartão
          abre a prateleira filtrada por aquela curvatura.
        </p>

        <SupabaseState loading={loading} error={error} onRetry={reload} />

        <div className="shelf">
          {(shelf ?? []).map((product, index) => {
            const code = product.curls?.[0] ?? "";
            return (
              <article
                className="card"
                key={product.slug}
                data-reveal
                style={{ "--i": index } as CSSProperties}
              >
                <Link className="card-main" to={`/produtos/${product.slug}`}>
                  <img
                    className="card-img"
                    src={product.image}
                    alt={product.name}
                    width={900}
                    height={900}
                  />
                  <span className="card-body">
                    <span className="card-brand">{product.brand}</span>
                    <span className="card-name">{product.name}</span>
                    <span className="card-note">{product.summary}</span>
                    <span className="card-link">
                      {product.promoPrice || product.price || "Consulte o preço na loja"}
                      <i className="ri-arrow-right-line" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
                {code ? (
                  <Link className="card-curl" to={`/produtos?tipo=${code.toLowerCase()}`}>
                    <i className="ri-scissors-line" aria-hidden="true" />
                    Ver produtos {code}
                  </Link>
                ) : null}
              </article>
            );
          })}
        </div>

        <div data-reveal style={{ marginTop: 18 }}>
          <Link className="card-link" to="/produtos" style={{ fontSize: 13 }}>
            Ver o catálogo completo
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
        </div>

        <p className="note" data-reveal>
          Este conteúdo contém links de afiliados. Podemos receber uma comissão quando você compra por
          meio desses links, sem custo adicional para você. O Universo dos Cachos não vende os produtos
          diretamente. Conteúdo editorial em revisão antes da publicação.
        </p>
      </div>
    </Panel>
  );
}