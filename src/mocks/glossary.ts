/* Glossário do portal: cada termo aponta para os artigos onde ele aparece
   e, quando faz sentido, para as curvaturas em que o assunto pesa mais. */

export type GlossaryTerm = {
  slug: string;
  term: string;
  letter: string;
  short: string;
  long: string;
  postSlugs: string[];
  codes: string[];
};

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: "abacaxi",
    term: "Abacaxi",
    letter: "A",
    short: "O jeito de prender o cabelo no topo da cabeça à noite, sem aperto.",
    long:
      "Um laço frouxo no alto da cabeça, com o cabelo solto por cima, para o cacho não ser amassado pelo travesseiro. Quanto mais frouxo, melhor: a ideia é proteger o desenho, não prender o cabelo. Funciona melhor com laço de cetim, porque o algodão cria atrito.",
    postSlugs: ["o-que-e-day-after", "como-conquistar-mais-definicao-nos-cachos"],
    codes: ["3A", "3B", "3C", "4A"],
  },
  {
    slug: "alta-porosidade",
    term: "Alta porosidade",
    letter: "A",
    short: "Cutícula mais aberta: o fio absorve água rápido e perde rápido também.",
    long:
      "Cabelos porosos molham depressa, secam depressa e costumam frisar com facilidade. A resposta prática não é usar produto em quantidade industrial, e sim em camadas: água, creme e depois um óleo de acabamento para segurar a umidade que você acabou de colocar.",
    postSlugs: ["hidratacao-nutricao-reconstrucao", "como-cuidar-dos-cabelos-crespos"],
    codes: ["3C", "4B", "4C"],
  },
  {
    slug: "baixa-porosidade",
    term: "Baixa porosidade",
    letter: "B",
    short: "Cutícula fechada: a água custa a entrar e o produto tende a acumular.",
    long:
      "O fio demora a molhar por completo e, por isso, recebe produto na superfície antes de estar realmente úmido. Vale usar água morna, deixar a máscara agir mais tempo e aplicar quantidades menores — em cabelo de baixa porosidade, excesso escorre e pesa em vez de penetrar.",
    postSlugs: ["hidratacao-nutricao-reconstrucao"],
    codes: ["2A", "2B", "2C"],
  },
  {
    slug: "coil",
    term: "Coil",
    letter: "C",
    short: "O cacho em formato de mola, típico das curvaturas 4A a 4C.",
    long:
      "É o nome usado para o fio que se enrola em espiral bem pequena, quase uma mola. No 4A o coil desenha espiral; no 4B e no 4C ele dobra em zigue-zague, com menos desenho visível e mais volume. Coils naturalmente retêm menos água, o que pede nutrição com constância.",
    postSlugs: ["como-cuidar-dos-cabelos-crespos", "como-descobrir-seu-tipo-de-cacho"],
    codes: ["4A", "4B", "4C"],
  },
  {
    slug: "cronograma-capilar",
    term: "Cronograma capilar",
    letter: "C",
    short: "Calendário que distribui hidratação, nutrição e reconstrução no mês.",
    long:
      "Não é uma prova de resistência: é uma sequência que evita fazer tudo na mesma semana. Um mês possível alterna hidratação, nutrição e hidratação de novo, deixando a reconstrução só para quando houver sinal de fragilidade — fio que estica como elástico ou quebra com facilidade.",
    postSlugs: ["como-montar-um-cronograma-capilar", "hidratacao-nutricao-reconstrucao"],
    codes: ["3B", "3C", "4A", "4B", "4C"],
  },
  {
    slug: "cuticula",
    term: "Cutícula",
    letter: "C",
    short: "A camada mais externa do fio, formada por escamas sobrepostas.",
    long:
      "Quando as escamas estão assentadas, o fio reflete luz e parece brilhante. Quando abrem — por atrito, calor, química ou desembaraço agressivo —, a superfície fica áspera, o frizz aparece e a água evapora mais rápido. É por isso que fechar a cutícula no fim da lavagem faz tanta diferença.",
    postSlugs: ["desembaracar-sem-quebrar-os-fios", "hidratacao-nutricao-reconstrucao"],
    codes: [],
  },
  {
    slug: "day-after",
    term: "Day after",
    letter: "D",
    short: "O segundo dia do cabelo, sem lavar de novo.",
    long:
      "Nome dado ao dia seguinte da finalização. Metade do resultado se decide na noite anterior: abacaxi frouxo, touca ou fronha de cetim. De manhã, o caminho é reativar só as áreas que perderam forma, com água ou um ativador leve, em vez de reaplicar creme no cabelo inteiro.",
    postSlugs: ["o-que-e-day-after", "como-conquistar-mais-definicao-nos-cachos"],
    codes: ["3A", "3B", "3C"],
  },
  {
    slug: "definicao",
    term: "Definição",
    letter: "D",
    short: "O quanto o desenho do cacho aparece depois de seco.",
    long:
      "Definição nasce de três coisas: água suficiente, produto na ordem certa e o hábito de não mexer no cabelo enquanto ele seca. Quase nunca é sobre usar mais creme — produto demais derruba o cacho em vez de desenhá-lo.",
    postSlugs: ["como-conquistar-mais-definicao-nos-cachos", "como-finalizar-cabelos-ondulados"],
    codes: ["2C", "3A", "3B"],
  },
  {
    slug: "desembaraco",
    term: "Desembaraço",
    letter: "D",
    short: "O ato de soltar os nós — sempre molhado, com condicionador, de baixo para cima.",
    long:
      "Fio molhado com condicionador desliza; fio seco estica até quebrar. O caminho gentil é dividir em partes pequenas, começar pelas pontas, segurar a mecha acima do ponto trabalhado e nunca forçar o pente. Se trava, falta produto ou água.",
    postSlugs: ["desembaracar-sem-quebrar-os-fios", "como-cuidar-dos-cabelos-crespos"],
    codes: ["4A", "4B", "4C"],
  },
  {
    slug: "encolhimento",
    term: "Encolhimento",
    letter: "E",
    short: "A redução do comprimento quando o cabelo seca.",
    long:
      "Quanto mais fechada a curva, maior o encolhimento — em 4C ele pode esconder metade do comprimento real. É por isso que medir o cabelo esticado e medir seco dão resultados tão diferentes, e por que comparar comprimento com outra pessoa raramente diz alguma coisa.",
    postSlugs: ["como-cuidar-dos-cabelos-crespos", "como-descobrir-seu-tipo-de-cacho"],
    codes: ["4A", "4B", "4C"],
  },
  {
    slug: "finalizacao",
    term: "Finalização",
    letter: "F",
    short: "A etapa em que creme, geleia e secagem constroem o cacho.",
    long:
      "É o passo depois do banho: creme de pentear para dar base, geleia para segurar o desenho, e secagem sem tocar. A técnica de amassar de baixo para cima, com a mão em concha, distribui o produto e ajuda o cacho a assumir a forma natural.",
    postSlugs: ["como-finalizar-cabelos-ondulados", "como-conquistar-mais-definicao-nos-cachos"],
    codes: ["2A", "2B", "2C"],
  },
  {
    slug: "frizz",
    term: "Frizz",
    letter: "F",
    short: "Fios arrepiados que se levantam da superfície, geralmente por atrito ou umidade.",
    long:
      "Boa parte do frizz que aparece de manhã nasce no travesseiro, na toalha de banho e no hábito de pentear a seco. Um pouco de frizz é normal e não é defeito — mas reduzir atrito e selar as pontas com uma gota de óleo muda bastante o resultado.",
    postSlugs: ["como-finalizar-cabelos-ondulados", "o-que-e-day-after"],
    codes: ["2A", "2B", "4B"],
  },
  {
    slug: "hidratacao",
    term: "Hidratação",
    letter: "H",
    short: "Etapa que devolve água ao fio — a mais frequente do cronograma.",
    long:
      "Fio áspero, sem brilho e com frizz costuma estar com falta de água. Máscaras de hidratação têm textura cremosa e enxágue leve, e funcionam melhor com constância do que em emergências. Em excesso, deixam o cabelo mole e o cacho perde a forma.",
    postSlugs: ["hidratacao-nutricao-reconstrucao", "como-montar-um-cronograma-capilar"],
    codes: ["2A", "2B", "3A", "3B"],
  },
  {
    slug: "nutricao",
    term: "Nutrição",
    letter: "N",
    short: "Etapa que devolve óleo e maleabilidade, com óleos vegetais e manteigas.",
    long:
      "Quando o cabelo está opaco, embolado e com a ponta parecendo palha, provavelmente falta lipídio. A nutrição entra com textura mais rica e é a etapa que mais pesa — em fio fino, vale usar pouco produto e concentrar no comprimento e nas pontas.",
    postSlugs: ["hidratacao-nutricao-reconstrucao", "como-cuidar-dos-cabelos-crespos"],
    codes: ["4A", "4B", "4C"],
  },
  {
    slug: "reconstrucao",
    term: "Reconstrução",
    letter: "R",
    short: "Etapa pontual de proteína, para fio que estica e quebra.",
    long:
      "Reconstrução repõe proteína e não é para toda semana: em cabelo saudável, o excesso endurece o cacho. Ela faz sentido quando o fio estica como elástico, quebra com facilidade ou passou por química recente — a cada 30 ou 45 dias, na maioria dos casos.",
    postSlugs: ["hidratacao-nutricao-reconstrucao", "como-montar-um-cronograma-capilar"],
    codes: ["3C", "4B", "4C"],
  },
  {
    slug: "selagem",
    term: "Selagem",
    letter: "S",
    short: "Fechar a cutícula no fim da lavagem, com água fria, produto ácido ou óleo.",
    long:
      "A selagem ajuda a manter o que a hidratação e a nutrição acabaram de depositar. Pode ser um enxágue final com água mais fria, um condicionador de pH mais baixo ou algumas gotas de óleo nas pontas, já com o cabelo seco ou quase seco.",
    postSlugs: ["como-finalizar-cabelos-ondulados", "o-que-e-day-after"],
    codes: ["2B", "2C", "3C"],
  },
  {
    slug: "umectacao",
    term: "Umectação",
    letter: "U",
    short: "Aplicar óleo vegetal puro no cabelo antes da lavagem, para nutrir.",
    long:
      "Diferente do óleo de acabamento, a umectação é um passo de tratamento: óleo vegetal aplicado no cabelo seco, do meio às pontas, deixado agir por um tempo e retirado com shampoo. Costuma render mais em fios crespos e ressecados.",
    postSlugs: ["hidratacao-nutricao-reconstrucao", "como-cuidar-dos-cabelos-crespos"],
    codes: ["4A", "4B", "4C"],
  },
  {
    slug: "zigue-zague",
    term: "Zigue-zague",
    letter: "Z",
    short: "Padrão de ondulação em ângulos, sem espiral — marca das curvaturas 4B e 4C.",
    long:
      "No zigue-zague o fio dobra em ângulos em vez de se enrolar em mola. Isso cria volume em vez de definição, e não é defeito: é o desenho natural dessas curvaturas. Produtos com mais lipídios e aplicação em mechas pequenas ajudam a manter o formato.",
    postSlugs: ["como-descobrir-seu-tipo-de-cacho", "como-cuidar-dos-cabelos-crespos"],
    codes: ["4B", "4C"],
  },
];