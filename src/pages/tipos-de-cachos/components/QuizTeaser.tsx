import { Link } from "react-router-dom";

/** Invitation to the three-question quiz, placed before the comparison table. */
export default function QuizTeaser() {
  return (
    <section className="quiz-teaser" aria-labelledby="quiz-curvatura">
      <div className="wrap">
        <div className="quiz-teaser-inner">
          <div>
            <p className="stamp">Não sabe por onde começar?</p>
            <h2 id="quiz-curvatura">
              Três perguntas e uma <em>pista</em>.
            </h2>
            <p>
              Formato do fio, tempo de conforto depois da lavagem e encolhimento. O quiz sugere uma
              curvatura para ler primeiro — e leva direto ao guia e à prateleira filtrada.
            </p>
          </div>
          <Link className="buy-btn" to="/quiz">
            Fazer o quiz
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}