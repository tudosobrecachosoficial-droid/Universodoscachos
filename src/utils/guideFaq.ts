export type GuideFaqEntry = {
  question: string;
  answer: string;
};

/**
 * FAQ das páginas de guia (índice e comparação). As respostas resumem o que o
 * próprio guia explica, para que o FAQPage e o texto visível digam o mesmo.
 */
export const GUIDE_FAQ: GuideFaqEntry[] = [
  {
    question: "O que muda entre as nove curvaturas?",
    answer:
      "A escala vai de 2A a 4C e descreve o formato do fio. Ondulados (2A, 2B, 2C) formam ondas em S, abertas nas primeiras faixas e mais fechadas no 2C. Cacheados (3A, 3B, 3C) desenham espirais, do diâmetro de um cabo de vassoura ao de um canudo. Crespos (4A, 4B, 4C) se fecham em coils e em zigue-zague, com encolhimento maior e umidade natural mais baixa. A curvatura serve para escolher quantidade de produto e técnica de finalização — não para definir o que o cabelo pode ou não fazer.",
  },
  {
    question: "Como descubro a minha curvatura?",
    answer:
      "Lave o cabelo como de costume, retire o excesso de água com uma camiseta de algodão e deixe secar sem mexer, sem creme e sem difusor. O desenho que aparecer é a referência mais honesta. Depois observe três coisas: o formato (S aberto, S fechado, espiral ou zigue-zague), o diâmetro do cacho e a umidade natural do fio. Se quiser um ponto de partida rápido, o quiz de três perguntas sugere uma curvatura e leva ao guia correspondente.",
  },
  {
    question: "É possível ter mais de uma curvatura na mesma cabeça?",
    answer:
      "Sim, e é comum. A mesma cabeça costuma ter ondulado no topo, crespo na nuca e mechas mais abertas perto do rosto. Por isso o guia recomenda observar as áreas separadamente e ajustar a quantidade de produto por região, em vez de tratar o cabelo como um bloco único.",
  },
  {
    question: "A curvatura pode mudar com o tempo?",
    answer:
      "Pode mudar com corte, química, calor frequente ou idade. A classificação descreve o fio que você tem hoje, então o cuidado deve acompanhar o cabelo atual. Quando o desenho mudar, ajuste produto e técnica em vez de tentar forçar o padrão antigo.",
  },
];