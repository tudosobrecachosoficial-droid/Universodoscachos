export const POST_CATEGORIES = [
  { slug: "todos", label: "Todos os textos" },
  { slug: "tipos-de-cachos", label: "Tipos de cachos" },
  { slug: "rotinas", label: "Rotinas" },
  { slug: "finalizacao", label: "Finalização" },
  { slug: "cuidados", label: "Cuidados" },
  { slug: "cachos-infantis", label: "Cachos infantis" },
  { slug: "produtos", label: "Produtos" },
];

export const POSTS = [
  {
    slug: "como-descobrir-seu-tipo-de-cacho",
    title: "Como descobrir seu tipo de cacho",
    seoTitle: "Como descobrir seu tipo de cacho",
    seoDescription:
      "Aprenda a ler a curvatura do seu cabelo em casa, entenda o que muda entre 2A e 4C e saiba como usar o resultado ao escolher produtos e técnicas.",
    subtitle: "Um guia calmo para ler a curvatura do seu cabelo sem transformar isso em regra.",
    category: "Tipos de cachos",
    categorySlug: "tipos-de-cachos",
    tags: ["curvatura", "guia", "autoconhecimento"],
    author: "Redação Universo dos Cachos",
    date: "2026-10-28",
    readingTime: 6,
    featured: true,
    excerpt:
      "Ondulado, cacheado ou crespo? A classificação 2A–4C ajuda a escolher produto e técnica, mas não define o que o seu cabelo pode ou não fazer.",
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20beauty%20portrait%20of%20a%20Black%20woman%20with%20damp%20natural%20curls%20held%20in%20her%20hands%2C%20seen%20in%20profile%2C%20warm%20plaster%20background%2C%20soft%20diffused%20window%20light%2C%20warm%20nude%20and%20copper%20tones%2C%20intimate%20and%20calm%2C%20shallow%20depth%20of%20field%2C%20no%20text&width=1600&height=1000&seq=udc-post-tipo-01&orientation=landscape",
    sections: [
      {
        heading: "Para que serve a classificação",
        paragraphs: [
          "A escala que vai de 2A a 4C foi criada para descrever o formato do fio: o quanto ele se curva, quantas curvas cabem em um centímetro e qual é o diâmetro do cacho. Serve como vocabulário comum — para você entender uma embalagem, uma resenha, uma recomendação.",
          "O que ela não é: um diagnóstico. Cabelo não é documento, e a mesma cabeça costuma ter mais de um padrão. É comum encontrar ondulado na parte de cima e crespo na nuca, ou mechas mais abertas perto do rosto.",
        ],
        list: [],
        quote: "",
      },
      {
        heading: "Como observar o seu cabelo",
        paragraphs: [
          "Lave como de costume, retire o excesso de água com uma camiseta de algodão e deixe secar sem mexer. Sem creme, sem gel, sem difusor. O desenho que aparece é a sua curvatura natural — a referência mais honesta que existe.",
          "Depois, observe três coisas: o formato (S aberto, S fechado, espiral, zigue-zague), o diâmetro do cacho (mais grosso que um giz, do tamanho de um lápis, mais fino) e a umidade natural. Fios que secam rápido e parecem ásperos costumam pedir mais nutrição.",
        ],
        list: [
          "Ondulado 2A–2C: ondas em S suave, que perdem a forma com facilidade.",
          "Cacheado 3A–3C: espirais definidas, de diâmetro médio a fino.",
          "Crespo 4A–4C: coils apertados, em zigue-zague, naturalmente mais secos.",
        ],
        quote: "",
      },
      {
        heading: "O que fazer com essa informação",
        paragraphs: [
          "Use o tipo como ponto de partida para a quantidade de produto e para a técnica de finalização — não como limite. Um cabelo 3B pode amar uma finalização leve de ondulado; um 2C pode precisar de nutrição de crespo.",
          "Se o seu cabelo passa por química, coloração ou calor frequente, a curvatura visível pode mudar com o tempo. O que importa é ajustar o cuidado ao fio que você tem hoje.",
        ],
        list: [],
        quote: "Cachos não são regras rígidas. São um jeito de olhar com mais atenção.",
      },
    ],
    productSlugs: ["creme-de-pentear-definidor", "mascara-de-hidratacao-intensa"],
  },
  {
    slug: "hidratacao-nutricao-reconstrucao",
    title: "Hidratação, nutrição e reconstrução: a diferença",
    seoTitle: "Hidratação, nutrição e reconstrução",
    seoDescription:
      "Água, óleo ou proteína? Entenda o que cada etapa do cronograma capilar resolve, de quanto em quanto tempo usar e como evitar o excesso de produto.",
    subtitle: "Três etapas, três funções. Entender isso resolve metade das compras erradas.",
    category: "Rotinas",
    categorySlug: "rotinas",
    tags: ["cronograma", "hidratação", "nutrição", "reconstrução"],
    author: "Redação Universo dos Cachos",
    date: "2026-10-24",
    readingTime: 7,
    featured: true,
    excerpt:
      "Água, óleo e proteína. Cada etapa resolve uma necessidade diferente — e usar a errada pode deixar o cabelo pesado ou endurecido.",
    image:
      "https://readdy.ai/api/search-image?query=Three%20unlabeled%20ceramic%20bowls%20with%20cream%2C%20oil%20and%20pale%20liquid%20arranged%20on%20warm%20beige%20plaster%2C%20hair%20care%20ingredients%2C%20soft%20directional%20light%2C%20warm%20nude%20and%20copper%20tones%2C%20minimal%20editorial%20still%20life%2C%20no%20text&width=1600&height=1000&seq=udc-post-crono-02&orientation=landscape",
    sections: [
      {
        heading: "Hidratação devolve água",
        paragraphs: [
          "Quando o cabelo está áspero, sem brilho e com frizz, normalmente falta água. A hidratação é a etapa mais frequente do cronograma e a mais indicada para a maioria dos fios cacheados.",
          "Máscaras de hidratação costumam ter textura cremosa e enxágue leve. Em excesso, porém, deixam o fio mole demais — e aí o cacho perde a forma.",
        ],
        list: [],
        quote: "",
      },
      {
        heading: "Nutrição devolve óleo",
        paragraphs: [
          "Se o cabelo está opaco, embolado e com a ponta parecendo palha, provavelmente falta lipídio. A nutrição entra com óleos vegetais e manteigas, e é o que devolve maleabilidade.",
          "É a etapa que mais pesa. Em fios finos, vale usar pouco produto e concentrar só no comprimento e nas pontas.",
        ],
        list: [],
        quote: "",
      },
      {
        heading: "Reconstrução devolve proteína",
        paragraphs: [
          "Reconstrução é pontual. Faz sentido quando o fio estica como elástico, quebra com facilidade ou passou por química recente. Em cabelo saudável, o excesso pode deixar o cacho duro.",
          "Uma frequência segura para a maioria das pessoas é a cada 30 a 45 dias. Na dúvida, converse com quem acompanha o seu cabelo.",
        ],
        list: [
          "Hidratação: semanal ou quinzenal, conforme a porosidade.",
          "Nutrição: a cada 15 dias, ou intercalada com a hidratação.",
          "Reconstrução: a cada 30 a 45 dias, só quando houver sinal de fragilidade.",
        ],
        quote: "Antes de comprar mais um pote, pergunte: meu cabelo está sem água, sem óleo ou sem proteína?",
      },
    ],
    productSlugs: ["mascara-de-hidratacao-intensa", "mascara-de-nutricao-com-oleos", "tratamento-de-reconstrucao"],
  },
  {
    slug: "como-finalizar-cabelos-ondulados",
    title: "Como finalizar cabelos ondulados",
    seoTitle: "Como finalizar cabelos ondulados",
    seoDescription:
      "Finalização leve para ondas 2A a 2C: quantidade certa de creme, ordem dos produtos, secagem sem toque e como quebrar o efeito no final.",
    subtitle: "Leveza é a palavra-chave. Menos produto, mais técnica.",
    category: "Finalização",
    categorySlug: "finalizacao",
    tags: ["ondulados", "finalização", "2A", "2B", "2C"],
    author: "Redação Universo dos Cachos",
    date: "2026-10-20",
    readingTime: 5,
    featured: false,
    excerpt:
      "Ondulado perde a forma quando recebe produto demais. Veja uma finalização simples, em quatro passos, que preserva o movimento.",
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20back%20view%20portrait%20of%20a%20woman%20with%20long%20soft%20wavy%20brown%20hair%20catching%20warm%20window%20light%2C%20warm%20plaster%20wall%2C%20natural%20texture%2C%20warm%20nude%20and%20copper%20palette%2C%20cinematic%20soft%20focus%2C%20no%20text&width=1600&height=1000&seq=udc-post-onda-03&orientation=landscape",
    sections: [
      {
        heading: "Comece com o cabelo muito úmido",
        paragraphs: [
          "Ondulado tende a secar rápido e a frisar. Aplicar o produto com o cabelo bem molhado ajuda a distribuir melhor e evita aquele aspecto de fio grudado.",
          "Retire o excesso de água com a mão em concha, não com toalha. Atrito é o principal inimigo do movimento.",
        ],
        list: [],
        quote: "",
      },
      {
        heading: "Pouco creme, bem distribuído",
        paragraphs: [
          "Use uma quantidade menor do que você usaria em cabelo cacheado. Espalhe entre as palmas das mãos e aplique da metade para as pontas, apertando o cabelo de baixo para cima.",
          "Se quiser mais definição, uma geleia leve entra depois, em quantidade mínima. Nunca os dois em excesso: o ondulado pesa rápido.",
        ],
        list: [
          "Creme de pentear leve: uma porção do tamanho de uma moeda.",
          "Geleia: opcional, só nas pontas.",
          "Óleo: apenas quando o cabelo já estiver seco.",
        ],
        quote: "",
      },
      {
        heading: "Seque sem tocar",
        paragraphs: [
          "Deixe secar naturalmente sempre que possível. Se for usar difusor, temperatura baixa, velocidade mínima, e apoie o cesto no cabelo antes de ligar.",
          "Quando estiver completamente seco, quebre o efeito com as mãos abertas. Se ainda estiver muito definido, uma gota de óleo nas pontas resolve.",
        ],
        list: [],
        quote: "",
      },
    ],
    productSlugs: ["creme-de-pentear-definidor", "difusor-universal-de-silicone", "oleo-de-acabamento-para-pontas"],
  },
  {
    slug: "como-conquistar-mais-definicao-nos-cachos",
    title: "Como conquistar mais definição nos cachos",
    seoTitle: "Mais definição nos cachos",
    seoDescription:
      "Definição depende mais de água e de não mexer no cabelo do que de produto. Veja a ordem certa de aplicação e os três erros que abrem o cacho.",
    subtitle: "Da quantidade certa de água à ordem dos produtos.",
    category: "Finalização",
    categorySlug: "finalizacao",
    tags: ["definição", "cacheado", "finalização"],
    author: "Redação Universo dos Cachos",
    date: "2026-10-16",
    readingTime: 6,
    featured: true,
    excerpt:
      "Definição quase nunca é sobre usar mais produto. É sobre água, ordem e o quanto você mexe no cabelo enquanto ele seca.",
    image:
      "https://readdy.ai/api/search-image?query=Macro%20editorial%20photograph%20of%20tightly%20defined%20glossy%20dark%20curls%20forming%20a%20spiral%2C%20warm%20sunlight%2C%20warm%20brown%20and%20copper%20tones%2C%20shallow%20depth%20of%20field%2C%20no%20text&width=1600&height=1000&seq=udc-post-def-04&orientation=landscape",
    sections: [
      {
        heading: "A água é o primeiro produto",
        paragraphs: [
          "Cacho se forma com água. Se o cabelo estiver apenas úmido, o creme não desliza e o desenho sai irregular. A referência prática: ainda escorrendo água quando você aplica o primeiro produto.",
          "Durante a semana, se o cabelo estiver seco, reumedeça antes de reaplicar qualquer coisa. Produto sobre fio seco cria resíduo.",
        ],
        list: [],
        quote: "",
      },
      {
        heading: "A ordem importa",
        paragraphs: [
          "Primeiro o creme de pentear, que dá base e maleabilidade. Depois o gel ou a geleia, que segura o desenho até secar. Por último, se quiser, o óleo — mas só no cabelo seco, para não atrapalhar a fixação.",
          "A técnica também conta: amassar de baixo para cima com a mão em concha, mecha por mecha, distribui o produto e ajuda o cacho a assumir a forma natural.",
        ],
        list: [
          "Cabelo muito úmido.",
          "Creme de pentear em mechas, amassando.",
          "Geleia em quantidade mínima, só para fixar.",
          "Secar sem tocar. Quebrar o efeito no final.",
        ],
        quote: "",
      },
      {
        heading: "Evite os três erros mais comuns",
        paragraphs: [
          "Mexer no cabelo enquanto seca, secar com jato de ar direto e usar produto demais. Esses três hábitos sozinhos explicam boa parte dos dias em que o cacho não colabora.",
          "Se o cabelo costuma abrir no meio da tarde, vale testar uma fixação levemente maior — e não mais creme.",
        ],
        list: [],
        quote: "",
      },
    ],
    productSlugs: ["geleia-definidora-sem-alcool", "creme-de-pentear-definidor", "ativador-de-cachos-leve"],
  },
  {
    slug: "o-que-e-day-after",
    title: "O que é day after e como preservar os cachos",
    seoTitle: "Day after: preservar os cachos",
    seoDescription:
      "O que fazer antes de dormir, como reativar o cacho pela manhã e quando vale lavar de novo. Um guia curto para o segundo dia render mais.",
    subtitle: "O segundo dia pode ser tão bom quanto o primeiro — com menos esforço.",
    category: "Cuidados",
    categorySlug: "cuidados",
    tags: ["day after", "rotina", "cachos"],
    author: "Redação Universo dos Cachos",
    date: "2026-10-11",
    readingTime: 4,
    featured: false,
    excerpt:
      "Dormir protegida, reativar sem encharcar e aceitar um pouco de imperfeição: o day after é técnica, não sorte.",
    image:
      "https://readdy.ai/api/search-image?query=Woman%20with%20curly%20hair%20waking%20in%20soft%20morning%20light%2C%20wrapped%20in%20linen%2C%20warm%20plaster%20bedroom%2C%20natural%20calm%20mood%2C%20warm%20nude%20and%20copper%20palette%2C%20cinematic%20soft%20focus%2C%20no%20text&width=1600&height=1000&seq=udc-post-day-05&orientation=landscape",
    sections: [
      {
        heading: "Antes de dormir",
        paragraphs: [
          "A maior parte do day after se decide na noite anterior. Prenda o cabelo em um abacaxi frouxo no topo da cabeça, com um laço de cetim ou uma touca de cetim. O atrito do algodão é o que amassa o cacho.",
          "Se o cabelo estiver muito definido, tudo bem: ele vai amolecer durante a noite, o que costuma ser desejável.",
        ],
        list: [],
        quote: "",
      },
      {
        heading: "Reativar pela manhã",
        paragraphs: [
          "Borrife um pouco de água ou de ativador nas áreas que perderam forma — nunca na cabeça inteira. Amasse com a mão em concha e deixe secar antes de sair.",
          "Para o frizz nas pontas, uma gota de óleo de acabamento resolve sem desmanchar o volume.",
        ],
        list: [],
        quote: "Day after perfeito não existe. Existe day after cuidado.",
      },
      {
        heading: "Quando lavar de novo",
        paragraphs: [
          "Não existe intervalo fixo. Couro cabeludo oleoso pede lavagem mais frequente; cabelos crespos costumam aguentar mais dias. O que importa é não acumular produto.",
          "Se o cabelo estiver pesado e sem movimento, é sinal de que chegou a hora.",
        ],
        list: [],
        quote: "",
      },
    ],
    productSlugs: ["ativador-de-cachos-leve", "oleo-de-acabamento-para-pontas"],
  },
  {
    slug: "como-cuidar-dos-cabelos-crespos",
    title: "Como cuidar dos cabelos crespos",
    seoTitle: "Como cuidar dos cabelos crespos",
    seoDescription:
      "Crespos retêm menos água: veja como ajustar a nutrição, desembaraçar sem quebrar, montar a rotina e proteger o cabelo durante a noite.",
    subtitle: "Nutrição, paciência e mãos que não puxam.",
    category: "Cuidados",
    categorySlug: "cuidados",
    tags: ["crespo", "4A", "4B", "4C", "nutrição"],
    author: "Redação Universo dos Cachos",
    date: "2026-10-06",
    readingTime: 7,
    featured: true,
    excerpt:
      "Crespo naturalmente retém menos água. O cuidado muda de ênfase: mais nutrição, menos manipulação e desembaraço com produto.",
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20portrait%20of%20a%20Black%20woman%20with%20a%20full%20natural%20afro%20of%20tight%20coils%2C%20warm%20plaster%20background%2C%20soft%20golden%20light%2C%20warm%20brown%20and%20copper%20tones%2C%20intimate%20and%20powerful%2C%20shallow%20depth%20of%20field%2C%20no%20text&width=1600&height=1000&seq=udc-post-crespo-06&orientation=landscape",
    sections: [
      {
        heading: "Entenda o fio",
        paragraphs: [
          "Quanto mais fechada a curva, mais difícil a água e o óleo do couro cabeludo descerem até as pontas. Por isso crespos tendem a ser mais secos e a precisar de mais nutrição.",
          "Isso não significa usar muito produto em tudo: significa escolher produtos com mais lipídios e aplicar em mechas, com o cabelo molhado.",
        ],
        list: [],
        quote: "",
      },
      {
        heading: "Desembaraço sem quebrar",
        paragraphs: [
          "Sempre com o cabelo molhado e cheio de condicionador, em partes pequenas, começando pelas pontas. Os dedos primeiro, o pente de dentes largos depois.",
          "Se o pente travar, falta produto ou água — nunca força. Cada mecha puxada é uma oportunidade de quebra.",
        ],
        list: [
          "Divida em quatro a oito partes, conforme o volume.",
          "Condicionador generoso em cada parte.",
          "Dedos, depois pente de dentes largos.",
          "Enxágue só ao final, parte por parte.",
        ],
        quote: "",
      },
      {
        heading: "Rotina possível",
        paragraphs: [
          "Hidratação com frequência, nutrição a cada quinze dias e reconstrução pontual formam uma base segura. Finalizações com creme e geleia ajudam a manter o desenho por mais dias.",
          "Proteja o cabelo à noite, com touca ou fronha de cetim, e evite dormir com o cabelo preso com força.",
        ],
        list: [],
        quote: "Crespo pede constância, não milagre.",
      },
    ],
    productSlugs: ["mascara-de-nutricao-com-oleos", "mascara-de-hidratacao-intensa", "tratamento-de-reconstrucao"],
  },
  {
    slug: "como-montar-um-cronograma-capilar",
    title: "Como montar um cronograma capilar",
    seoTitle: "Como montar um cronograma capilar",
    seoDescription:
      "Um mês possível de hidratação, nutrição e reconstrução, com a frequência de cada etapa e o que observar para ajustar o plano ao seu fio.",
    subtitle: "Um calendário simples, que caiba na sua semana real.",
    category: "Rotinas",
    categorySlug: "rotinas",
    tags: ["cronograma", "rotina", "planejamento"],
    author: "Redação Universo dos Cachos",
    date: "2026-09-30",
    readingTime: 5,
    featured: false,
    excerpt:
      "Cronograma não é prova de resistência. É uma sequência de três etapas distribuídas no mês, ajustada ao seu fio.",
    image:
      "https://readdy.ai/api/search-image?query=Flat%20lay%20of%20a%20linen%20calendar%20card%2C%20small%20ceramic%20bowls%20of%20hair%20cream%20and%20oil%2C%20and%20dried%20flowers%20on%20warm%20beige%20plaster%2C%20minimal%20editorial%20still%20life%2C%20warm%20nude%20and%20copper%20tones%2C%20soft%20daylight%2C%20no%20text&width=1600&height=1000&seq=udc-post-cronograma-07&orientation=landscape",
    sections: [
      {
        heading: "Comece pelo diagnóstico",
        paragraphs: [
          "Antes de montar datas, observe: o cabelo está áspero (falta água), opaco e embolado (falta óleo) ou elástico e quebradiço (falta proteína)? A resposta define a ordem.",
          "Na dúvida, comece pela hidratação. É a etapa mais segura e resolve mais casos do que parece.",
        ],
        list: [],
        quote: "",
      },
      {
        heading: "Um mês possível",
        paragraphs: [
          "Semana 1: hidratação. Semana 2: nutrição. Semana 3: hidratação novamente. Semana 4: reconstrução, se houver sinal de fragilidade — caso contrário, repita hidratação.",
          "Nas semanas em que não houver máscara, a lavagem normal com condicionador já é cuidado suficiente.",
        ],
        list: [
          "Hidratação: devolve água e maciez.",
          "Nutrição: devolve óleo e brilho.",
          "Reconstrução: devolve proteína, com moderação.",
        ],
        quote: "",
      },
      {
        heading: "Registre o que funcionou",
        paragraphs: [
          "Anote a data, o produto e como o cabelo ficou dois dias depois. Em dois meses você terá um histórico muito mais confiável do que qualquer recomendação genérica.",
          "E não tenha medo de mudar o plano: cronograma serve ao cabelo, não o contrário.",
        ],
        list: [],
        quote: "",
      },
    ],
    productSlugs: ["mascara-de-hidratacao-intensa", "mascara-de-nutricao-com-oleos", "tratamento-de-reconstrucao"],
  },
  {
    slug: "desembaracar-sem-quebrar-os-fios",
    title: "Como desembaraçar cachos sem quebrar os fios",
    seoTitle: "Desembaraçar sem quebrar os fios",
    seoDescription:
      "Desembarace no molhado, com condicionador, de baixo para cima e sem forçar o pente. O passo a passo que reduz quebra e preserva o desenho.",
    subtitle: "O passo que quase todo mundo faz rápido demais.",
    category: "Cuidados",
    categorySlug: "cuidados",
    tags: ["desembaraço", "quebra", "condicionador"],
    author: "Redação Universo dos Cachos",
    date: "2026-09-24",
    readingTime: 4,
    featured: false,
    excerpt:
      "Desembaraçar no seco, de cima para baixo e sem produto é a receita da quebra. Existe um caminho mais gentil.",
    image:
      "https://readdy.ai/api/search-image?query=Close%20detail%20of%20hands%20running%20a%20wide%20tooth%20comb%20through%20wet%20conditioned%20curly%20hair%2C%20warm%20plaster%20bathroom%2C%20soft%20light%2C%20warm%20nude%20and%20copper%20tones%2C%20calm%20editorial%20photography%2C%20no%20text&width=1600&height=1000&seq=udc-post-desemb-08&orientation=landscape",
    sections: [
      {
        heading: "Sempre no molhado",
        paragraphs: [
          "Fio molhado com condicionador desliza. Fio seco estica até quebrar. É a diferença mais simples e a mais ignorada.",
          "Molhe bem, aplique condicionador em quantidade generosa e comece pelas pontas, em partes pequenas.",
        ],
        list: [],
        quote: "",
      },
      {
        heading: "De baixo para cima",
        paragraphs: [
          "Segure a mecha acima do ponto que está desembaraçando, para não puxar a raiz. Solte os nós das pontas primeiro e suba aos poucos.",
          "Se sentir resistência, adicione água e condicionador. Nunca force o pente.",
        ],
        list: [],
        quote: "",
      },
      {
        heading: "Depois do banho",
        paragraphs: [
          "Seque com uma camiseta de algodão, apertando o cabelo — não esfregando. E evite pentear de novo com o cabelo seco: você desfaz o cacho e cria atrito.",
        ],
        list: [],
        quote: "Se o pente trava, o problema é falta de produto — não falta de força.",
      },
    ],
    productSlugs: ["condicionador-deslizante", "pente-de-dentes-largos"],
  },
  {
    slug: "como-cuidar-dos-cachinhos-das-criancas",
    title: "Como cuidar dos cachinhos das crianças",
    seoTitle: "Cuidados com os cachinhos infantis",
    seoDescription:
      "Rotina curta e segura para cabelo infantil: produtos indicados para a idade, desembaraço sem puxar, atenção ao couro cabeludo e o que evitar.",
    subtitle: "Menos produto, mais gentileza — e sempre seguindo a indicação do fabricante.",
    category: "Cachos infantis",
    categorySlug: "cachos-infantis",
    tags: ["infantil", "crianças", "rotina"],
    author: "Redação Universo dos Cachos",
    date: "2026-09-18",
    readingTime: 5,
    featured: true,
    excerpt:
      "Cabelo infantil é mais fino e o couro cabeludo, mais sensível. A rotina precisa ser curta, previsível e sem improviso com produtos de adulto.",
    image:
      "https://readdy.ai/api/search-image?query=Gentle%20close-up%20of%20a%20parent&width=1600&height=1000&seq=udc-post-kids-09&orientation=landscape's hands arranging soft curly hair of a small child, warm plaster room, soft morning light, tender mood, warm nude and copper tones, no faces visible, no text",
    sections: [
      {
        heading: "Segurança primeiro",
        paragraphs: [
          "Use apenas produtos indicados para a faixa etária da criança e leia a embalagem. Evite misturas caseiras, essências e ativos fortes: o couro cabeludo infantil é mais permeável.",
          "Se houver coceira, descamação ou irritação, suspenda o produto e procure orientação profissional.",
        ],
        list: [],
        quote: "",
      },
      {
        heading: "Uma rotina curta",
        paragraphs: [
          "Lavar duas ou três vezes por semana costuma bastar. Condicionador leve, desembaraço com os dedos e um creme suave já resolvem a maior parte dos dias.",
          "Evite prender com força, elásticos apertados e tranças muito tensionadas, que podem causar desconforto e quebra.",
        ],
        list: [
          "Shampoo suave, quantidade pequena.",
          "Condicionador do meio às pontas.",
          "Desembaraço com os dedos, molhado.",
          "Pente de dentes largos, sem puxar.",
        ],
        quote: "",
      },
      {
        heading: "Tornar o momento bom",
        paragraphs: [
          "Criança colabora quando entende o que vai acontecer. Avise cada passo, deixe ela escolher o laço, cante, converse. Cinco minutos tranquilos valem mais do que uma rotina completa e tensa.",
        ],
        list: [],
        quote: "Cuidar do cabelo de uma criança é, antes de tudo, cuidar da relação dela com o próprio cabelo.",
      },
    ],
    productSlugs: ["shampoo-infantil-sem-lagrimas", "condicionador-infantil-desembaracador"],
  },
  {
    slug: "como-escolher-um-creme-de-pentear",
    title: "Como escolher um creme de pentear",
    seoTitle: "Como escolher um creme de pentear",
    seoDescription:
      "Espessura do fio, textura e lista de ingredientes: o que realmente importa ao escolher um creme de pentear e como testar sem gastar demais.",
    subtitle: "Textura, fixação e o que realmente importa no rótulo.",
    category: "Produtos",
    categorySlug: "produtos",
    tags: ["creme de pentear", "produtos", "finalização"],
    author: "Redação Universo dos Cachos",
    date: "2026-09-10",
    readingTime: 6,
    featured: false,
    excerpt:
      "O creme certo é o que combina com a espessura do seu fio e com o resultado que você quer — não o mais caro da prateleira.",
    image:
      "https://readdy.ai/api/search-image?query=Several%20unlabeled%20hair%20styling%20cream%20tubes%20and%20jars%20of%20different%20sizes%20arranged%20on%20warm%20beige%20plaster%2C%20minimal%20editorial%20still%20life%2C%20warm%20nude%20and%20copper%20tones%2C%20soft%20directional%20light%2C%20no%20text&width=1600&height=1000&seq=udc-post-creme-10&orientation=landscape",
    sections: [
      {
        heading: "Comece pela espessura",
        paragraphs: [
          "Fio fino pede textura leve e pouca quantidade. Fio grosso aceita cremes mais densos, com manteigas na composição. Usar um creme denso em cabelo fino é o caminho mais rápido para o cacho murcho.",
          "Se você tem mais de um padrão na cabeça, pode usar produtos diferentes em áreas diferentes — não é exagero, é ajuste.",
        ],
        list: [],
        quote: "",
      },
      {
        heading: "Leia a lista de ingredientes",
        paragraphs: [
          "Água costuma ser o primeiro item. Óleos e manteigas aparecem mais adiante e indicam nutrição. Glicerina ajuda a manter umidade, mas em excesso pode deixar o fio pesado em climas muito úmidos.",
          "Não existe ingrediente vilão universal: existe quantidade e contexto. Teste em uma mecha antes de assumir que o produto inteiro não serve.",
        ],
        list: [],
        quote: "",
      },
      {
        heading: "Teste antes de comprar de novo",
        paragraphs: [
          "Use o mesmo creme por três lavagens, com a mesma técnica, antes de decidir. Uma finalização ruim pode ser só falta de água.",
          "E lembre: preço e fama não substituem o teste no seu próprio cabelo.",
        ],
        list: [],
        quote: "",
      },
    ],
    productSlugs: ["creme-de-pentear-definidor", "geleia-definidora-sem-alcool"],
  },
];