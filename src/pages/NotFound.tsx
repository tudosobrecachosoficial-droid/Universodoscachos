import { Link, useLocation } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFound() {
  const location = useLocation();

  usePageMeta({
    title: "Página não encontrada | Universo dos Cachos",
    description: "Este endereço não existe no Universo dos Cachos.",
    path: location.pathname,
    noindex: true,
  });

  return (
    <div className="page">
      <SiteNav solid />
      <main className="wrap" style={{ paddingTop: 160, paddingBottom: 120 }}>
        <div className="empty">
          <i className="ri-compass-3-line" aria-hidden="true" />
          <h1>Página não encontrada</h1>
          <p>
            O endereço <code>{location.pathname}</code> não existe ou mudou de lugar. Comece pelo
            blog ou pelo guia de tipos de cachos.
          </p>
          <Link className="section-link" to="/blog">
            Ver os artigos
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
          <Link className="section-link" to="/tipos-de-cachos">
            Descobrir meu tipo de cacho
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
