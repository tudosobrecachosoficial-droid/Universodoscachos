import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import NewsletterBlock from "@/components/feature/NewsletterBlock";
import FaqList from "@/components/feature/FaqList";
import { QUIZ_DISCLAIMER, QUIZ_FAQ } from "@/mocks/quiz";
import { quizService, curlTypesService } from "@/services";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import SupabaseState from "@/components/feature/SupabaseState";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useStructuredData } from "@/hooks/useStructuredData";

const QUIZ_TITLE = "Quiz: qual é o seu tipo de cacho? | Universo dos Cachos";
const QUIZ_DESCRIPTION =
  "Três perguntas rápidas sobre formato, umidade e volume sugerem a sua curvatura — de 2A a 4C — com link direto para o guia e para os produtos indicados.";

export default function QuizPage() {
  const loadQuestions = useCallback(() => quizService.getAll(), []);
  const loadCurlTypes = useCallback(() => curlTypesService.getAll(), []);
  const { data: loadedQuestions, error, loading, reload } = useSupabaseData(loadQuestions);
  const curlQuery = useSupabaseData(loadCurlTypes);
  const questions = loadedQuestions ?? [];
  const curlTypes = curlQuery.data ?? [];
  usePageMeta({
    title: QUIZ_TITLE,
    description: QUIZ_DESCRIPTION,
    path: "/quiz",
  });

  const structuredData = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const pageUrl = `${origin}/quiz`;

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${pageUrl}#pagina`,
          name: QUIZ_TITLE,
          description: QUIZ_DESCRIPTION,
          url: pageUrl,
          inLanguage: "pt-BR",
          isPartOf: { "@type": "WebSite", name: "Universo dos Cachos", url: `${origin}/` },
        },
        {
          "@type": "FAQPage",
          "@id": `${pageUrl}#perguntas`,
          inLanguage: "pt-BR",
          mainEntity: QUIZ_FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        },
      ],
    };
  }, []);

  useStructuredData("quiz", structuredData);

  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = questions.length;

  const ranking = useMemo(() => {
    const scores: Record<string, number> = {};
    questions.forEach((question, index) => {
      const option = question.options.find((item) => item.id === answers[index]);
      if (!option) return;
      Object.entries(option.scores).forEach(([code, value]) => {
        scores[code] = (scores[code] ?? 0) + value * (question.weight ?? 1);
      });
    });
    return [...curlTypes]
      .map((type) => ({ type, score: scores[type.code] ?? 0 }))
      .sort((a, b) => b.score - a.score);
  }, [answers, questions, curlTypes]);

  const primary = ranking[0]?.type ?? curlTypes[0];
  const secondary = ranking[1]?.type ?? curlTypes[1];
  const answered = answers.filter(Boolean).length;
  const progress = finished ? 100 : (answered / total) * 100;
  const current = questions[step];
  const picked = answers[step];

  const choose = (id: string) => {
    setAnswers((previous) => {
      const next = Array.from({ length: total }, (_, index) => previous[index] ?? null);
      next[step] = id;
      return next;
    });
  };

  const goNext = () => {
    if (!picked) return;
    if (step === total - 1) {
      setFinished(true);
      return;
    }
    setStep((value) => value + 1);
  };

  const goBack = () => {
    setStep((value) => Math.max(0, value - 1));
  };

  const restart = () => {
    setAnswers(Array.from({ length: total }, () => null));
    setStep(0);
    setFinished(false);
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
              <Link to="/tipos-de-cachos">Tipos de cachos</Link>
              <span>/</span>
              <span>Quiz</span>
            </nav>
            <p className="stamp">Quiz de curvatura · 3 perguntas</p>
            <h1>
              Três perguntas,
              <br />
              uma <em>pista</em>.
            </h1>
            <p className="page-sub">
              Formato do fio, tempo de conforto depois da lavagem e encolhimento. Com essas três
              respostas dá para chegar bem perto de uma curvatura — e saber onde começar a ler o
              guia. Leva menos de um minuto.
            </p>
          </div>
        </header>

        <section className="quiz-section">
          <div className="wrap">
            <div className="quiz-wrap">
              <SupabaseState
                loading={loading || curlQuery.loading}
                error={error || curlQuery.error}
                onRetry={() => {
                  reload();
                  curlQuery.reload();
                }}
              />
              {!loading && !curlQuery.loading && !error && !curlQuery.error && total === 0 ? (
                <div className="empty">
                  <h3>O quiz ainda não foi cadastrado</h3>
                  <p>As perguntas cadastradas no banco aparecerão aqui.</p>
                </div>
              ) : null}
              {!loading && !curlQuery.loading && !error && !curlQuery.error && total > 0 && curlTypes.length > 1 && finished && primary && secondary ? (
                <div className="quiz-card">
                  <div className="quiz-result">
                    <div className="quiz-result-media">
                      <img
                        src={primary.image}
                        alt={primary.imageAlt}
                        width={900}
                        height={1125}
                      />
                    </div>
                    <div className="quiz-result-copy">
                      <p className="stamp">Sua pista</p>
                      <h2 className="quiz-result-title">
                        {primary.family} <em>{primary.code}</em>
                      </h2>
                      <p className="quiz-result-sub">{primary.summary}</p>

                      <p className="quiz-result-label">O que esse fio costuma pedir</p>
                      <ul className="quiz-result-list">
                        {primary.needs.slice(0, 3).map((need) => (
                          <li key={need}>{need}</li>
                        ))}
                      </ul>

                      <p className="quiz-result-finish">
                        <span>Finalização</span>
                        {primary.finishing[0]?.text}
                      </p>

                      <div className="kids-ctas">
                        <Link className="buy-btn" to={`/tipos-de-cachos/${primary.slug}`}>
                          Ler o guia do {primary.code}
                          <i className="ri-arrow-right-line" aria-hidden="true" />
                        </Link>
                        <Link className="btn-outline" to={`/produtos?tipo=${primary.slug}`}>
                          Ver produtos {primary.code}
                          <i className="ri-store-2-line" aria-hidden="true" />
                        </Link>
                      </div>

                      <p className="quiz-alt">
                        Também pode ser{" "}
                        <Link to={`/tipos-de-cachos/${secondary.slug}`}>
                          {secondary.code} · {secondary.name}
                        </Link>
                        . Vale abrir as duas páginas e comparar a finalização antes de decidir.
                      </p>

                      <div className="quiz-result-actions">
                        <button type="button" className="quiz-back" onClick={restart}>
                          <i className="ri-refresh-line" aria-hidden="true" />
                          Refazer o quiz
                        </button>
                        <Link className="quiz-back" to="/tipos-de-cachos">
                          <i className="ri-table-line" aria-hidden="true" />
                          Comparar as nove curvaturas
                        </Link>
                      </div>
                    </div>
                  </div>

                  <p className="quiz-disclaimer">{QUIZ_DISCLAIMER}</p>
                </div>
              ) : !loading && !curlQuery.loading && !error && !curlQuery.error && total > 0 && curlTypes.length > 1 ? (
                <div className="quiz-card">
                  <div className="quiz-progress">
                    <span className="quiz-step-label">
                      Pergunta {step + 1} de {total}
                    </span>
                    <span className="quiz-progress-track" aria-hidden="true">
                      <span className="quiz-progress-fill" style={{ width: `${progress}%` }} />
                    </span>
                  </div>

                  <h2 className="quiz-question">{current.question}</h2>
                  <p className="quiz-helper">{current.helper}</p>

                  <div className="quiz-options" role="group" aria-label={current.question}>
                    {current.options.map((option) => {
                      const isPicked = picked === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          className={isPicked ? "quiz-option is-picked" : "quiz-option"}
                          aria-pressed={isPicked}
                          onClick={() => choose(option.id)}
                        >
                          <span className="quiz-mark" aria-hidden="true">
                            {isPicked ? <i className="ri-check-line" /> : null}
                          </span>
                          <span>{option.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="quiz-actions">
                    {step > 0 ? (
                      <button type="button" className="quiz-back" onClick={goBack}>
                        <i className="ri-arrow-left-line" aria-hidden="true" />
                        Voltar
                      </button>
                    ) : (
                      <Link className="quiz-back" to="/tipos-de-cachos">
                        <i className="ri-arrow-left-line" aria-hidden="true" />
                        Ver o guia completo
                      </Link>
                    )}

                    <button
                      type="button"
                      className="buy-btn quiz-next"
                      onClick={goNext}
                      disabled={!picked}
                    >
                      {step === total - 1 ? "Ver meu resultado" : "Continuar"}
                      <i className="ri-arrow-right-line" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ) : null}

              <p className="quiz-foot">
                Prefere ler primeiro? O{" "}
                <Link to="/tipos-de-cachos">guia de curvaturas</Link> mostra as nove opções lado a
                lado, com finalização e cuidados. As palavras que aparecem no caminho estão no{" "}
                <Link to="/glossario">glossário</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section-block" id="perguntas-frequentes">
          <div className="wrap">
            <FaqList
              eyebrow="Antes de começar"
              title={
                <>
                  Perguntas <em>frequentes</em>
                </>
              }
              note={
                <>
                  O quiz é um ponto de partida para ler o cabelo, não um diagnóstico. Se quiser
                  entender a escala inteira antes de responder, comece pela{" "}
                  <Link to="/tipos-de-cachos">tabela comparativa das nove curvaturas</Link>.
                </>
              }
              items={QUIZ_FAQ}
            />
          </div>
        </section>

        <div style={{ height: 48 }} />
      </main>
      <NewsletterBlock />
      <SiteFooter />
    </div>
  );
}