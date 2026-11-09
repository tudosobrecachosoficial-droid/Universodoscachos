import { useCallback } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import Panel from "@/pages/home/components/Panel";
import { postsService } from "@/services";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import SupabaseState from "@/components/feature/SupabaseState";
import { formatShortDate } from "@/utils/date";

export default function ArticlesPanel() {
  const loadPosts = useCallback(() => postsService.getFeatured(3), []);
  const { data: posts, error, loading, reload } = useSupabaseData(loadPosts);

  return (
    <Panel
      id="diario"
      side="right"
      image="https://readdy.ai/api/search-image?query=Quiet%20editorial%20desk%20scene%20in%20a%20warm%20plaster%20room%2C%20an%20open%20notebook%20with%20handwritten%20notes%2C%20a%20ceramic%20cup%20and%20a%20small%20amber%20bottle%2C%20objects%20gathered%20in%20the%20left%20third%20of%20the%20frame%2C%20the%20right%20half%20soft%20empty%20shadowed%20wall%2C%20warm%20brown%20and%20nude%20palette%2C%20soft%20afternoon%20light%2C%20no%20text&width=2400&height=1350&seq=udc-journal-2405&orientation=landscape"
      alt="Mesa de trabalho com caderno aberto, xícara de cerâmica e um pequeno frasco âmbar em uma sala de tons quentes."
    >
      <div className="panel-copy panel-copy--wide" data-parallax="-0.08">
        <p className="stamp" data-reveal>
          05 — O diário
        </p>
        <h2 data-reveal>
          O que a gente
          <br />
          aprendeu <em className="accent">lendo</em>.
        </h2>
        <p className="sub" data-reveal>
          Rotinas honestas, guias de curvatura e respostas para as dúvidas que aparecem no banheiro.
        </p>

        <SupabaseState loading={loading} error={error} onRetry={reload} />

        <div className="shelf">
          {(posts ?? []).map((post, index) => (
            <Link
              className="card"
              to={`/blog/${post.slug}`}
              key={post.slug}
              data-reveal
              style={{ "--i": index } as CSSProperties}
            >
              <img className="card-img" src={post.image} alt={post.title} width={1600} height={1000} />
              <span className="card-body">
                <span className="card-brand">
                  {post.category} · {formatShortDate(post.date)}
                </span>
                <span className="card-name">{post.title}</span>
                <span className="card-note">{post.excerpt}</span>
                <span className="card-link">
                  Ler artigo
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div data-reveal style={{ marginTop: 18 }}>
          <Link className="card-link" to="/blog" style={{ fontSize: 13 }}>
            Ver todos os artigos do blog
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Panel>
  );
}