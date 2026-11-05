import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import Panel from "@/pages/home/components/Panel";
import { CURL_TYPES } from "@/pages/home/data";

export default function CurlTypesPanel() {
  return (
    <Panel
      id="tipos-de-cachos"
      side="right"
      image="https://readdy.ai/api/search-image?query=Extremely%20close%20detail%20of%20defined%20natural%20curls%20and%20coils%20catching%20warm%20sunlight%2C%20main%20subject%20in%20the%20left%20third%20of%20the%20frame%2C%20the%20right%20half%20falling%20into%20soft%20empty%20shadowed%20brown%20background%2C%20macro%20texture%2C%20glossy%20hydrated%20hair%2C%20warm%20nude%20and%20copper%20tones%2C%20cinematic%20film%20still%2C%20shallow%20depth%20of%20field%2C%20no%20text&width=2400&height=1350&seq=udc-curls-2402&orientation=landscape"
      alt="Detalhe macro de cachos definidos e hidratados em luz dourada, sobre fundo marrom suave."
    >
      <div className="panel-copy panel-copy--list" data-parallax="-0.08">
        <p className="stamp" data-reveal>
          03 — Guia de curvaturas
        </p>
        <h2 data-reveal>
          Ondulado, cacheado
          <br />
          ou <em className="accent">crespo</em>.
        </h2>
        <ul className="rule-list">
          {CURL_TYPES.map((type, index) => (
            <li key={type.idx} data-reveal style={{ "--i": index } as CSSProperties}>
              <span className="idx">{type.idx}</span>
              <h3>{type.title}</h3>
              <p>{type.text}</p>
            </li>
          ))}
        </ul>
        <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px", marginTop: 8 }}>
          <Link className="section-link" to="/tipos-de-cachos">
            Abrir o guia completo, de 2A a 4C
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
          <Link className="section-link" to="/quiz">
            Fazer o quiz de 3 perguntas
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Panel>
  );
}