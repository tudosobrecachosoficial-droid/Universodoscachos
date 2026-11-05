/* Three questions, each option distributes points across the nine curvatures.
   The quiz is a starting point for reading the hair — never a diagnosis. */

export type QuizOption = {
  id: string;
  label: string;
  scores: Record<string, number>;
};

export type QuizQuestion = {
  id: string;
  question: string;
  helper: string;
  weight: number;
  options: QuizOption[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "formato",
    question: "Com o cabelo lavado, sem produto e secando naturalmente, o que aparece?",
    helper:
      "Pense no desenho que fica depois de uma lavagem comum — sem creme, sem difusor e sem pentear.",
    weight: 2,
    options: [
      {
        id: "q1-a",
        label: "Uma ondulação leve, quase lisa perto da raiz",
        scores: { "2A": 2, "2B": 1 },
      },
      {
        id: "q1-b",
        label: "Ondas em S nítidas, que começam na metade do comprimento",
        scores: { "2B": 2, "2C": 1 },
      },
      {
        id: "q1-c",
        label: "Ondas largas e volumosas, com pontas que quase cacheiam",
        scores: { "2C": 2, "3A": 1 },
      },
      {
        id: "q1-d",
        label: "Espirais grandes, do tamanho aproximado de um cabo de vassoura",
        scores: { "3A": 2, "3B": 1 },
      },
      {
        id: "q1-e",
        label: "Espirais médias e fechadas, bem definidas",
        scores: { "3B": 2, "3C": 1 },
      },
      {
        id: "q1-f",
        label: "Espirais apertadas, quase do diâmetro de um canudo",
        scores: { "3C": 2, "4A": 1 },
      },
      {
        id: "q1-g",
        label: "Coils pequenos em zigue-zague, com bastante volume",
        scores: { "4A": 1, "4B": 2, "4C": 1 },
      },
      {
        id: "q1-h",
        label: "Coils muito apertados e compactos, quase sem espiral visível",
        scores: { "4B": 1, "4C": 2 },
      },
    ],
  },
  {
    id: "umidade",
    question: "Depois da lavagem, quanto tempo o cabelo fica confortável?",
    helper:
      "Confortável aqui significa macio, com movimento e sem aquela sensação de fio áspero.",
    weight: 1,
    options: [
      {
        id: "q2-a",
        label: "Uns quatro dias, sem parecer seco",
        scores: { "2A": 2, "3A": 1 },
      },
      {
        id: "q2-b",
        label: "Uns três dias; no segundo o cacho já abre um pouco",
        scores: { "2B": 2, "3A": 1, "3B": 1 },
      },
      {
        id: "q2-c",
        label: "Dois ou três dias, mas as pontas ficam opacas",
        scores: { "2C": 2, "3B": 2 },
      },
      {
        id: "q2-d",
        label: "Dois dias no máximo — resseca mesmo com creme",
        scores: { "3C": 2, "4A": 2 },
      },
      {
        id: "q2-e",
        label: "Parece seco quase sempre; só fica macio no banho",
        scores: { "4A": 1, "4B": 2, "4C": 2 },
      },
    ],
  },
  {
    id: "volume",
    question: "E o volume? Ele encolhe quando seca?",
    helper:
      "Segure uma mecha esticada e solte. A diferença entre esticado e solto é o encolhimento.",
    weight: 1,
    options: [
      {
        id: "q3-a",
        label: "Pouco volume e quase nenhum encolhimento",
        scores: { "2A": 2, "2B": 1 },
      },
      {
        id: "q3-b",
        label: "Volume médio; encolhe um pouco ao secar",
        scores: { "2B": 1, "2C": 2, "3A": 1 },
      },
      {
        id: "q3-c",
        label: "Volume alto; encolhe bastante, mas ainda dá para medir",
        scores: { "3B": 2, "3C": 2 },
      },
      {
        id: "q3-d",
        label: "Volume muito alto; o cabelo esconde metade do comprimento real",
        scores: { "4A": 1, "4B": 2, "4C": 2 },
      },
    ],
  },
];

export const QUIZ_DISCLAIMER =
  "O resultado é uma pista, não um diagnóstico. A escala 2A–4C descreve formato de fio, e a mesma cabeça costuma ter mais de um padrão: ondulado no topo, crespo na nuca, mechas mais abertas perto do rosto. Use o resultado para escolher onde começar — e ajuste observando o cabelo.";

export const QUIZ_FAQ = [
  {
    question: "O quiz substitui a avaliação de um profissional?",
    answer:
      "Não. O quiz observa três sinais do fio — formato, tempo de conforto depois da lavagem e encolhimento — e devolve uma pista de curvatura. Curvatura descreve formato de fio, não saúde do cabelo. Em caso de queda, irritação ou quebra persistente, procure orientação profissional.",
  },
  {
    question: "Quais são as três perguntas do quiz?",
    answer:
      "A primeira olha o desenho que aparece com o cabelo lavado, sem produto e secando naturalmente, e é a que mais pesa no resultado. A segunda mede por quanto tempo o cabelo fica confortável depois da lavagem. A terceira observa o volume e o quanto o cabelo encolhe ao secar. Juntas, elas apontam uma faixa entre 2A e 4C.",
  },
  {
    question: "Por que o resultado mostra uma segunda curvatura?",
    answer:
      "Porque a mesma cabeça costuma ter mais de um padrão: é comum encontrar ondulado no topo, cacho na lateral e crespo na nuca. A segunda opção é a curvatura mais próxima da primeira, e vale abrir as duas páginas do guia para comparar a finalização antes de decidir.",
  },
  {
    question: "O que fazer depois de ver o resultado?",
    answer:
      "Cada resultado abre direto no guia daquela curvatura, com características, finalização em três passos, cuidados e produtos indicados. Se quiser ver o conjunto, a tabela comparativa mostra as nove curvaturas lado a lado — e o catálogo pode ser filtrado por curvatura para ver só os produtos daquele código.",
  },
];