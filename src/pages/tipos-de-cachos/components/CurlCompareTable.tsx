import { Link } from "react-router-dom";
import type { CurlType } from "@/lib/supabase/types";

/**
 * One-screen comparison of the nine curvatures. Each row links to the full
 * guide and to the catalogue filtered by that code.
 */
export default function CurlCompareTable({ types }: { types: CurlType[] }) {
  return (
    <section className="compare-block" aria-labelledby="comparar-curvaturas">
      <div className="wrap">
        <div className="compare-head">
          <div>
            <p className="stamp">Comparar</p>
            <h2 id="comparar-curvaturas">
              As nove curvaturas, <em>lado a lado</em>.
            </h2>
          </div>
          <p className="compare-note">
            Formato, diâmetro e umidade em uma linha. A última coluna leva direto aos produtos
            indicados para aquele código — a finalização é só um ponto de partida.
          </p>
        </div>

        <div className="compare-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col">Curvatura</th>
                <th scope="col">Família</th>
                <th scope="col">Formato</th>
                <th scope="col">Diâmetro</th>
                <th scope="col">Umidade</th>
                <th scope="col">Como finalizar</th>
                <th scope="col">Produtos</th>
              </tr>
            </thead>
            <tbody>
              {types.map((type) => (
                <tr key={type.slug}>
                  <td>
                    <Link className="compare-code" to={`/tipos-de-cachos/${type.slug}`}>
                      {type.code}
                      <span className="compare-name">{type.name.split(" ")[0]}</span>
                    </Link>
                  </td>
                  <td>
                    <span className="compare-family">{type.family}</span>
                  </td>
                  <td>{type.facts[0]?.value}</td>
                  <td>{type.facts[1]?.value}</td>
                  <td>{type.facts[2]?.value}</td>
                  <td>{type.finishing[0]?.text}</td>
                  <td>
                    <Link className="compare-link" to={`/produtos?tipo=${type.slug}`}>
                      Ver {type.code}
                      <i className="ri-arrow-right-line" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="compare-foot">
          A tabela descreve tendências, não regras. O mesmo cabelo pode ter mais de um padrão —
          veja <Link to="/cuidados">cuidados</Link> e{" "}
          <Link to="/rotinas">rotinas</Link> para ajustar a quantidade de produto ao seu fio.
        </p>
      </div>
    </section>
  );
}