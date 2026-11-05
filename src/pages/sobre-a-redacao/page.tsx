import { Link } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";
import NewsletterBlock from "@/components/feature/NewsletterBlock";
import FaqList from "@/components/feature/FaqList";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useStructuredData } from "@/hooks/useStructuredData";

const TEAM = [
  {
    name: "Marina Alves",
    role: "Editora-chefe",
    bio: "Responde pelo que é publicado e pela pauta do mês. Escreve sobre rotinas, cronograma e a relação de longo prazo com o cabelo — inclusive nos dias em que ele não colabora.",
    beats: ["Rotinas", "Cronograma", "Cuidados"],
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20portrait%20of%20a%20Brazilian%20woman%20in%20her%20late%20thirties%20with%20voluminous%20dark%20curly%20hair%2C%20warm%20beige%20studio%20backdrop%2C%20soft%20directional%20window%20light%2C%20calm%20and%20confident%20expression%2C%20minimal%20styling%20in%20a%20cream%20linen%20shirt%2C%20warm%20nude%20and%20copper%20palette%2C%20no%20text&width=700&height=700&seq=udc-team-01&orientation=squarish",
  },
  {
    name: "Tainá Ferreira",
    role: "Repórter de curvaturas",
    bio: "Cuida dos guias de 3C a 4C e das pautas que chegam pelo quiz. Escreve sobre desembaraço, day after e transição — sempre com a mão no próprio cabelo antes de fechar um parágrafo.",
    beats: ["Curvaturas", "Day after", "Crespos"],
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20portrait%20of%20a%20Black%20Brazilian%20woman%20with%20tight%20coily%20hair%20shaped%20in%20a%20rounded%20silhouette%2C%20warm%20beige%20studio%20backdrop%2C%20soft%20diffused%20light%2C%20quiet%20confident%20gaze%2C%20minimal%20styling%2C%20warm%20brown%20and%20copper%20tones%2C%20no%20text&width=700&height=700&seq=udc-team-02&orientation=squarish",
  },
  {
    name: "Beatriz Nogueira",
    role: "Revisão de produtos",
    bio: "Lê rótulo por rótulo antes de um produto entrar na prateleira e confere se o texto descreve apenas o que a embalagem sustenta. Também revisa finalização e técnica de secagem.",
    beats: ["Prateleira", "Finalização", "Rótulos"],
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20portrait%20of%20a%20young%20Brazilian%20woman%20with%20long%20soft%20wavy%20light%20brown%20hair%2C%20warm%20beige%20studio%20backdrop%2C%20soft%20window%20light%2C%20relaxed%20half%20smile%2C%20minimal%20styling%20in%20a%20sand%20coloured%20knit%2C%20warm%20nude%20palette%2C%20no%20text&width=700&height=700&seq=udc-team-03&orientation=squarish",
  },
];

const STEPS = [
  {
    title: "Pauta",
    text: "As perguntas chegam pelas mensagens, pelo quiz e pelas próprias buscas do site. Antes de virar texto, a pauta precisa responder a uma dúvida real de quem tem cabelo ondulado, cacheado ou crespo — não a um termo que dá volume de busca.",
  },
  {
    title: "Apuração",
    text: "Lemos rótulos, embalagens e materiais técnicos dos fabricantes, conferimos a classificação de curvatura e cruzamos o que é dito com a literatura de cosmetologia. O que não se sustenta, sai do texto antes da revisão.",
  },
  {
    title: "Revisão",
    text: "Todo texto passa por uma segunda leitura antes de publicar: precisão, tom, links e português. Alegação sobre produto precisa estar na embalagem ou em material do próprio fabricante. Quando não está, o texto diz que é descrição de rótulo.",
  },
  {
    title: "Atualização",
    text: "Preço, disponibilidade e indicação de idade têm prazo de validade e são reconferidos. Quando muda o que a página afirma, muda também a data mostrada no fim do texto — nunca a data escondida no código.",
  },
];

const PRINCIPLES = [
  {
    icon: "ri-shield-check-line",
    title: "Sem promessa de resultado",
    text: "Cabelo não é protocolo. Nenhum texto aqui promete milagre, e nenhum produto aparece como solução garantida para todo mundo.",
  },
  {
    icon: "ri-scales-3-line",
    title: "Transparência de afiliados",
    text: "Ganhamos comissão quando alguém compra por um link nosso. Isso não decide o que entra na prateleira — e está explicado em cada página com produtos.",
  },
  {
    icon: "ri-chat-1-line",
    title: "Linguagem direta",
    text: "Termo técnico é explicado na primeira vez que aparece e aponta para o glossário quando volta. Se a frase precisa de três releituras, ela é reescrita.",
  },
  {
    icon: "ri-user-follow-line",
    title: "Conteúdo com assinatura",
    text: "Não publicamos texto de terceiros com nome da casa. Quem escreve está na lista acima, e o texto é revisado por outra pessoa da equipe.",
  },
];

const NOT_DONE = [
  "Não damos diagnóstico, não indicamos tratamento e não substituímos avaliação profissional.",
  "Não afirmamos que um produto funciona para todo mundo — falamos de indicação e de contexto.",
  "Não inventamos teste que não fizemos: quando a descrição vem do rótulo, o texto assume isso.",
  "Não escondemos link de afiliado, nem usamos imagem de antes e depois para sugerir resultado.",
  "Não publicamos prazo de entrega, estoque ou preço como se fossem nossos: eles são da loja parceira.",
];

const FAQ = [
  {
    question: "Quem escreve os textos do Universo dos Cachos?",
    answer:
      "Uma equipe editorial pequena, com três pessoas fixas: uma editora-chefe, uma repórter de curvaturas e uma revisora de produtos. Cada texto é escrito por uma pessoa e revisado por outra antes de entrar no ar.",
  },
  {
    question: "Os produtos da prateleira são testados pela equipe?",
    answer:
      "Nem sempre. Quando o texto descreve um produto a partir do rótulo, da textura e da indicação do fabricante, ele deixa isso claro. Nenhuma ficha do catálogo afirma resultado garantido, e nenhuma delas foi escrita pela marca.",
  },
  {
    question: "Como o portal ganha dinheiro?",
    answer:
      "Por links de afiliados: quando alguém compra em uma loja parceira depois de clicar em um link nosso, podemos receber comissão, sem custo adicional para quem compra. O portal não vende os produtos e não controla preço, estoque ou entrega.",
  },
  {
    question: "Encontrei um erro. Como aviso a redação?",
    answer:
      "Escreva pelo formulário de contato da página inicial, com o endereço do texto e o trecho em dúvida. Correções de fato são publicadas com a data de atualização revisada; correções de redação entram sem alarde.",
  },
];

export default function AboutEditorialPage() {
  usePageMeta({
    title: "Sobre a redação | Universo dos Cachos",
    description:
      "Quem escreve o Universo dos Cachos, como cada texto é apurado e revisado, nossos princípios editoriais e como o portal se sustenta com links de afiliados.",
    path: "/sobre-a-redacao",
  });

  /* AboutPage + Organization + FAQPage: the page gives a face and a method to
     the byline used across the articles, which is the part search engines look
     for when judging authorship. */
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${window.location.origin}/sobre-a-redacao#sobre`,
        name: "Sobre a redação do Universo dos Cachos",
        description:
          "Quem escreve o Universo dos Cachos, como o conteúdo é apurado e revisado e quais são os princípios editoriais do portal.",
        url: `${window.location.origin}/sobre-a-redacao`,
        inLanguage: "pt-BR",
        mainEntity: {
          "@type": "Organization",
          "@id": `${window.location.origin}/#organizacao`,
          name: "Universo dos Cachos",
          url: `${window.location.origin}/`,
          description:
            "Portal editorial sobre cabelos ondulados, cacheados e crespos: curvaturas, rotinas, produtos indicados e cuidados.",
          knowsAbout: [
            "cabelos cacheados",
            "cabelos crespos",
            "cronograma capilar",
            "finalização de cachos",
          ],
          employee: TEAM.map((person) => ({
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: person.bio,
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${window.location.origin}/sobre-a-redacao#perguntas`,
        inLanguage: "pt-BR",
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${window.location.origin}/sobre-a-redacao#trilha`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: `${window.location.origin}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Sobre a redação",
            item: `${window.location.origin}/sobre-a-redacao`,
          },
        ],
      },
    ],
  };

  useStructuredData("about-editorial", structuredData);

  return (
    <div className="page">
      <SiteNav solid />
      <main>
        <header className="page-head">
          <div className="wrap">
            <nav className="crumbs" aria-label="Você está aqui">
              <Link to="/">Início</Link>
              <span>/</span>
              <span>Sobre a redação</span>
            </nav>
            <div className="page-head-row">
              <div>
                <p className="stamp">Sobre a redação</p>
                <h1>
                  Quem escreve
                  <br />
                  o que você <em>lê</em>.
                </h1>
                <p className="page-sub">
                  O Universo dos Cachos é feito por uma equipe pequena de pessoas que vivem o cabelo
                  cacheado todos os dias — e que assinam embaixo o que publicam. Aqui está quem
                  somos, como trabalhamos e o que escolhemos não fazer.
                </p>
              </div>
              <p className="head-count">Equipe editorial</p>
            </div>
          </div>
        </header>

        <div className="wrap">
          <p className="about-lede">
            A assinatura no fim de cada artigo é sempre a mesma: <strong>Redação Universo dos
            Cachos</strong>. Atrás dela existem nomes, um método de apuração e um processo de
            revisão. Se um texto erra, a responsa é da casa — e a correção também.
          </p>

          <section className="about-block" aria-labelledby="quem-assina">
            <div className="index-head">
              <h2 id="quem-assina">
                Quem <em>assina</em>
              </h2>
              <span className="index-count">{TEAM.length} pessoas fixas</span>
            </div>

            <div className="about-team">
              {TEAM.map((person) => (
                <article className="about-person" key={person.name}>
                  <div className="about-person-media">
                    <img src={person.image} alt={`Retrato de ${person.name}`} width={700} height={700} />
                  </div>
                  <p className="about-person-role">{person.role}</p>
                  <h3>{person.name}</h3>
                  <p className="about-person-bio">{person.bio}</p>
                  <ul className="about-beats">
                    {person.beats.map((beat) => (
                      <li key={beat}>{beat}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="about-note">
              <i className="ri-stethoscope-line" aria-hidden="true" />
              <p>
                <strong>Revisão técnica.</strong> Conteúdos que tocam em couro cabeludo, queda e
                quebra passam pela leitura de uma profissional de cosmetologia parceira, fora da
                equipe fixa. Ela não assina os textos: aponta o que precisa mudar antes da
                publicação. O portal continua sendo editorial e não substitui consulta.
              </p>
            </div>
          </section>

          <section className="about-block" aria-labelledby="como-nasce">
            <div className="index-head">
              <h2 id="como-nasce">
                Como um texto <em>nasce</em>
              </h2>
              <span className="index-count">Quatro etapas</span>
            </div>

            <div className="about-steps">
              {STEPS.map((step, index) => (
                <div className="about-step" key={step.title}>
                  <span className="about-step-num">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="about-block" aria-labelledby="principios">
            <div className="index-head">
              <h2 id="principios">
                Nossos <em>princípios</em>
              </h2>
              <span className="index-count">O que segura a linha</span>
            </div>

            <div className="about-principles">
              {PRINCIPLES.map((item) => (
                <article className="about-principle" key={item.title}>
                  <span className="about-principle-icon" aria-hidden="true">
                    <i className={item.icon} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="about-block about-split" aria-labelledby="nao-fazemos">
            <div>
              <div className="index-head">
                <h2 id="nao-fazemos">
                  O que não <em>fazemos</em>
                </h2>
              </div>
              <ul className="about-not">
                {NOT_DONE.map((item) => (
                  <li key={item}>
                    <i className="ri-subtract-line" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="about-contact" aria-labelledby="correcoes">
              <p className="stamp">Correções</p>
              <h3 id="correcoes">Achou algo errado?</h3>
              <p>
                Escreva com o endereço do texto e o trecho em dúvida. Correção de fato é publicada
                com a data revisada; ajuste de redação entra sem alarde. O mesmo canal serve para
                sugerir pauta — boa parte dos nossos textos começou em uma pergunta de leitor.
              </p>
              <Link className="buy-btn" to="/#contato">
                Falar com a redação
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
              <Link className="about-link" to="/transparencia">
                Como ganhamos com indicações
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </aside>
          </section>

          <section className="about-block" id="perguntas-frequentes">
            <FaqList
              eyebrow="Sobre o conteúdo"
              title={
                <>
                  Perguntas <em>frequentes</em>
                </>
              }
              note={
                <>
                  As dúvidas que mais chegam sobre autoria, teste de produtos e sustentação do
                  portal. Se a sua não estiver aqui, <Link to="/#contato">escreva para a gente</Link>.
                </>
              }
              items={FAQ}
            />
          </section>

          <p className="disclosure">
            <strong>Nota editorial:</strong> o Universo dos Cachos publica conteúdo informativo sobre
            cabelos ondulados, cacheados e crespos. Nada aqui é diagnóstico, prescrição ou promessa de
            resultado. Em caso de queda intensa, irritação no couro cabeludo ou quebra que não
            melhora, procure orientação de um profissional.
          </p>
        </div>

        <div style={{ height: 56 }} />
      </main>
      <NewsletterBlock />
      <SiteFooter />
    </div>
  );
}