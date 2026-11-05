export const CURL_FAMILIES = [
  {
    slug: "ondulados",
    label: "Ondulados",
    range: "2A · 2B · 2C",
    intro:
      "Ondas em S que aparecem com mais clareza depois do comprimento médio. Costumam ser o tipo mais fácil de achatar — e o que mais ganha com finalização leve.",
  },
  {
    slug: "cacheados",
    label: "Cacheados",
    range: "3A · 3B · 3C",
    intro:
      "Espirais visíveis, de diâmetro médio a fino. Aqui a hidratação frequente e a ordem certa dos produtos fazem mais diferença do que a quantidade.",
  },
  {
    slug: "crespos",
    label: "Crespos",
    label_singular: "Crespo",
    range: "4A · 4B · 4C",
    intro:
      "Coils apertados, em zigue-zague, naturalmente mais secos. Pedem nutrição com constância, desembaraço com produto e mãos que não puxam.",
  },
];

export type CurlType = {
  slug: string;
  code: string;
  name: string;
  familySlug: string;
  family: string;
  tagline: string;
  summary: string;
  image: string;
  imageAlt: string;
  facts: { label: string; value: string }[];
  paragraphs: string[];
  characteristics: string[];
  needs: string[];
  finishing: { title: string; text: string }[];
  care: string[];
  productSlugs: string[];
};

export const CURL_TYPES: CurlType[] = [
  {
    slug: "2a",
    code: "2A",
    name: "Ondulado 2A",
    familySlug: "ondulados",
    family: "Ondulados",
    tagline: "A onda mais aberta do guia.",
    summary:
      "Ondas suaves em S, que se formam principalmente do meio para as pontas. Fios que costumam secar rápido e perder o desenho com facilidade quando recebem produto demais.",
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20back%20view%20beauty%20portrait%20of%20a%20woman%20with%20long%20fine%20hair%20falling%20in%20soft%20loose%20S%20waves%2C%20gentle%20bend%20only%20from%20mid-length%20to%20ends%2C%20warm%20plaster%20wall%20in%20soft%20nude%20and%20copper%20tones%2C%20natural%20diffused%20window%20light%2C%20calm%20minimal%20styling%2C%20no%20text%20no%20logos&width=900&height=1125&seq=udc-curl-2a&orientation=portrait",
    imageAlt: "Costas de uma pessoa com cabelo longo em ondas suaves e abertas, do meio às pontas.",
    facts: [
      { label: "Formato", value: "S aberto" },
      { label: "Diâmetro", value: "Onda larga" },
      { label: "Umidade", value: "Seca rápido" },
    ],
    paragraphs: [
      "O 2A é a curvatura mais discreta da escala: um S aberto, quase um movimento, que aparece com mais clareza quando o cabelo está no comprimento médio ou longo. Perto da raiz, o fio costuma ser praticamente liso.",
      "Por ser leve, ele responde muito rápido ao que você coloca. Uma quantidade a mais de creme já é suficiente para transformar onda em fio pesado — e aí o desenho desaparece até a próxima lavagem.",
    ],
    characteristics: [
      "Ondas largas em S, com movimento solto, sem espiral fechada.",
      "Fio geralmente fino a médio, que seca rápido mesmo sem secador.",
      "Textura lisa ao toque, com brilho natural e pouco volume na raiz.",
      "Costuma perder a forma com vento, atrito e excesso de produto.",
    ],
    needs: [
      "Leveza acima de tudo: produtos densos achatam a onda.",
      "Hidratação leve e frequente, porque o fio fino resseca rápido.",
      "Proteção contra atrito ao dormir, principal causa de frizz.",
      "Definição construída com técnica, não com quantidade de creme.",
    ],
    finishing: [
      {
        title: "Cabelo muito úmido, produto mínimo",
        text: "Retire o excesso de água com a mão em concha, nunca com toalha. Aplique uma porção de creme leve do tamanho de uma moeda, da metade para as pontas, apertando o cabelo de baixo para cima.",
      },
      {
        title: "Se precisar de fixação, use pouco",
        text: "Uma geleia leve entra depois do creme, só nas pontas. Em 2A, a regra é simples: se você sente o produto no cabelo úmido, provavelmente já é demais.",
      },
      {
        title: "Seque sem tocar",
        text: "Deixe secar naturalmente sempre que possível. Se usar difusor, temperatura baixa, velocidade mínima, apoiando o cesto antes de ligar. Quando estiver completamente seco, quebre o efeito com as mãos abertas.",
      },
    ],
    care: [
      "Lave com shampoo suave, concentrando no couro cabeludo.",
      "Máscara de hidratação a cada 10 ou 15 dias, com enxágue completo.",
      "Nutrição em quantidade pequena: uma gota de óleo nas pontas, com o cabelo seco.",
      "Fronha de cetim ou touca de tecido leve para preservar a onda durante a noite.",
    ],
    productSlugs: [
      "shampoo-suave-de-limpeza",
      "creme-de-pentear-definidor",
      "oleo-de-acabamento-para-pontas",
    ],
  },
  {
    slug: "2b",
    code: "2B",
    name: "Ondulado 2B",
    familySlug: "ondulados",
    family: "Ondulados",
    tagline: "O S que já se desenha sozinho.",
    summary:
      "Onda em S mais fechada, com movimento visível já perto da metade do comprimento. Um pouco mais de corpo que o 2A, e uma tendência maior a frisar na parte de cima.",
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20side%20beauty%20portrait%20of%20a%20woman%20with%20medium%20length%20brown%20hair%20in%20defined%20S%20shaped%20waves%2C%20visible%20wave%20starting%20at%20mid%20length%2C%20slightly%20more%20body%20than%20loose%20waves%2C%20warm%20plaster%20background%20in%20nude%20and%20copper%20tones%2C%20soft%20diffused%20daylight%2C%20minimal%20calm%20styling%2C%20no%20text%20no%20logos&width=900&height=1125&seq=udc-curl-2b&orientation=portrait",
    imageAlt: "Retrato de perfil de uma pessoa com ondas em S mais desenhadas no comprimento médio.",
    facts: [
      { label: "Formato", value: "S fechado" },
      { label: "Diâmetro", value: "Onda média" },
      { label: "Umidade", value: "Equilibrada" },
    ],
    paragraphs: [
      "No 2B, a onda já tem opinião: o S aparece com definição, o volume aumenta um pouco e o cabelo ganha corpo. É a faixa em que muitas pessoas começam a perceber que o cabelo \"mudou\" depois de uma mudança de corte ou de rotina.",
      "O ponto delicado é o topo da cabeça. Como o fio ainda é relativamente liso na raiz, é ali que o frizz se instala primeiro — e é ali também que o excesso de produto pesa sem definir nada.",
    ],
    characteristics: [
      "Ondas em S visíveis a partir da metade do comprimento.",
      "Mais volume e corpo que o 2A, com fio de espessura média.",
      "Raiz mais lisa, o que pede atenção ao frizz no topo.",
      "Aceita melhor cremes leves e finalizações com um pouco de fixação.",
    ],
    needs: [
      "Distribuir produto só do meio às pontas, para não achatar a raiz.",
      "Controlar o frizz do topo sem recorrer a produto pesado.",
      "Alternar hidratação e nutrição leve a cada quinze dias.",
      "Técnica de amassamento para ajudar a onda a subir.",
    ],
    finishing: [
      {
        title: "Comece com o cabelo molhado e dividido",
        text: "Separe em quatro partes e aplique o creme leve mecha por mecha, do meio às pontas. Amasse de baixo para cima com a mão em concha — o gesto ajuda a onda a se formar com mais definição.",
      },
      {
        title: "Umidade no topo, sem produto pesado",
        text: "Para o frizz da raiz, borrife água com um fio de creme na palma da mão e alise de leve. Evite aplicar creme diretamente no couro cabeludo.",
      },
      {
        title: "Difusor com pausas",
        text: "Apoie o cesto, ligue por alguns segundos, desligue antes de mudar de área. Repetir esse ciclo em temperatura baixa preserva a onda e reduz o volume indesejado.",
      },
    ],
    care: [
      "Shampoo suave duas a três vezes por semana, com enxágue completo.",
      "Condicionador do meio às pontas, desembaraçando com os dedos.",
      "Hidratação a cada quinze dias e nutrição leve quando o fio estiver opaco.",
      "Corte a cada três ou quatro meses, para o peso não derrubar a onda.",
    ],
    productSlugs: [
      "shampoo-suave-de-limpeza",
      "condicionador-deslizante",
      "creme-de-pentear-definidor",
    ],
  },
  {
    slug: "2c",
    code: "2C",
    name: "Ondulado 2C",
    familySlug: "ondulados",
    family: "Ondulados",
    tagline: "A ponte entre a onda e o cacho.",
    summary:
      "Ondas largas e bem definidas, com fio mais grosso e bastante volume. Um pé no ondulado, outro no cacheado — e a finalização costuma decidir para qual lado o cabelo vai.",
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20beauty%20portrait%20of%20a%20woman%20with%20thick%20voluminous%20hair%20in%20wide%20defined%20waves%20and%20soft%20loose%20curls%20at%20the%20ends%2C%20warm%20plaster%20wall%2C%20warm%20nude%20and%20copper%20palette%2C%20natural%20soft%20daylight%2C%20generous%20volume%2C%20calm%20confident%20expression%20turned%20slightly%20away%2C%20no%20text%20no%20logos&width=900&height=1125&seq=udc-curl-2c&orientation=portrait",
    imageAlt: "Retrato de uma pessoa com ondas largas, volumosas e bem definidas.",
    facts: [
      { label: "Formato", value: "Onda larga definida" },
      { label: "Diâmetro", value: "Grosso" },
      { label: "Umidade", value: "Pede nutrição" },
    ],
    paragraphs: [
      "O 2C é generoso: ondas largas, volume alto e uma definição que já conversa com o cacheado. O fio costuma ser mais grosso, o que significa que aceita mais produto — mas não significa que precise de produto pesado.",
      "Aqui a diferença entre um dia bonito e um dia irregular quase sempre está na quantidade de água no momento da finalização e no quanto você mexe no cabelo enquanto ele seca.",
    ],
    characteristics: [
      "Ondas largas e definidas, com início próximo da raiz.",
      "Fio mais grosso e com bastante volume natural.",
      "Tendência a abrir no meio da tarde quando o ar está úmido.",
      "Aceita creme mais denso sem perder completamente o movimento.",
    ],
    needs: [
      "Equilíbrio entre definição e leveza: produto denso em excesso derruba a onda.",
      "Nutrição além da hidratação, porque o fio grosso tende a ficar opaco.",
      "Fixação leve nos dias de clima úmido.",
      "Corte pensado para distribuir volume, não para acumular peso nas pontas.",
    ],
    finishing: [
      {
        title: "Creme mais denso, em mechas",
        text: "Com o cabelo escorrendo água, aplique o creme em mechas, amassando de baixo para cima. Em 2C, a técnica de amassamento é o que separa onda larga de cabelo armado.",
      },
      {
        title: "Geleia leve para segurar o dia",
        text: "Uma camada fina de geleia por cima do creme segura a definição em dias úmidos. Depois de seco, quebre o efeito com as mãos para voltar ao toque macio.",
      },
      {
        title: "Difusor em ar frio até quase secar",
        text: "Seque em temperatura baixa, deixando os últimos 20% secarem naturalmente. Isso preserva o volume sem frisar a superfície do fio.",
      },
    ],
    care: [
      "Shampoo suave, com atenção ao couro cabeludo e enxágue completo.",
      "Máscara de hidratação semanal e nutrição a cada quinze dias.",
      "Óleo de acabamento só nas pontas, com o cabelo seco.",
      "Reconstrução apenas se houver sinal de fragilidade, a cada 30 ou 45 dias.",
    ],
    productSlugs: [
      "condicionador-deslizante",
      "creme-de-pentear-definidor",
      "difusor-universal-de-silicone",
    ],
  },
  {
    slug: "3a",
    code: "3A",
    name: "Cacheado 3A",
    familySlug: "cacheados",
    family: "Cacheados",
    tagline: "Espirais largas, cachos grandes.",
    summary:
      "Cachos em espiral larga, do tamanho aproximado de um cabo de vassoura. Definição fácil, volume moderado e uma tendência a perder forma no segundo dia.",
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20beauty%20portrait%20of%20a%20woman%20with%20large%20loose%20spiral%20curls%20about%20the%20width%20of%20a%20broomstick%2C%20glossy%20defined%20curls%20framing%20her%20face%2C%20warm%20plaster%20wall%20in%20nude%20and%20copper%20tones%2C%20soft%20window%20light%2C%20calm%20natural%20makeup%2C%20no%20text%20no%20logos&width=900&height=1125&seq=udc-curl-3a&orientation=portrait",
    imageAlt: "Retrato de uma pessoa com cachos grandes em espiral larga emoldurando o rosto.",
    facts: [
      { label: "Formato", value: "Espiral larga" },
      { label: "Diâmetro", value: "Cabo de vassoura" },
      { label: "Umidade", value: "Média" },
    ],
    paragraphs: [
      "O 3A é o cacheado mais aberto: espirais grandes, bem visíveis, com brilho fácil e boa maleabilidade. É uma faixa em que muita gente consegue o cacho desejado logo na primeira tentativa de finalização.",
      "O desafio vem depois: no segundo dia, a espiral tende a abrir e o volume pode dobrar. Reativar com água e um ativador leve resolve mais do que reaplicar creme.",
    ],
    characteristics: [
      "Espirais largas e regulares, do tamanho aproximado de um cabo de vassoura.",
      "Fio médio, com brilho natural e boa elasticidade.",
      "Definição relativamente fácil, mesmo com pouca técnica.",
      "Perde forma e ganha volume entre o primeiro e o segundo dia.",
    ],
    needs: [
      "Hidratação frequente para manter a elasticidade da espiral.",
      "Produtos de base leve a média, que definam sem endurecer.",
      "Reativação no day after, em vez de reaplicação de produto.",
      "Corte em camadas discretas, para não pesar as pontas.",
    ],
    finishing: [
      {
        title: "Creme de pentear no cabelo muito úmido",
        text: "Aplique em mechas, distribuindo com as mãos e amassando de baixo para cima. Em 3A, o cabelo precisa estar bem molhado para o cacho se agrupar.",
      },
      {
        title: "Geleia ou ativador para selar",
        text: "Uma camada fina de geleia por cima segura a espiral até secar. Se preferir um resultado mais natural, use apenas ativador e aceite um pouco menos de definição.",
      },
      {
        title: "Amasse até secar e quebre no final",
        text: "Não toque no cabelo enquanto estiver secando. Depois de seco, aperte com as mãos abertas para o cacho ficar macio e volumoso, sem aquele aspecto de casquinha.",
      },
    ],
    care: [
      "Lavagem com shampoo suave duas a três vezes por semana.",
      "Hidratação semanal é o centro da rotina; nutrição a cada quinze dias.",
      "Desembaraço sempre molhado, com condicionador e pente de dentes largos.",
      "Touca ou fronha de cetim à noite e abacaxi frouxo no topo da cabeça.",
    ],
    productSlugs: [
      "mascara-de-hidratacao-intensa",
      "creme-de-pentear-definidor",
      "ativador-de-cachos-leve",
    ],
  },
  {
    slug: "3b",
    code: "3B",
    name: "Cacheado 3B",
    familySlug: "cacheados",
    family: "Cacheados",
    tagline: "A espiral do tamanho de um lápis.",
    summary:
      "Cachos médios, em espiral fechada e regular, com volume natural e boa definição. A faixa mais comum — e a que mais depende do equilíbrio entre água, creme e fixação.",
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20beauty%20portrait%20of%20a%20woman%20with%20medium%20tight%20springy%20spiral%20curls%20about%20the%20width%20of%20a%20pencil%2C%20full%20defined%20volume%20around%20the%20head%2C%20warm%20plaster%20background%20in%20nude%20and%20copper%20tones%2C%20soft%20directional%20daylight%2C%20calm%20expression%2C%20no%20text%20no%20logos&width=900&height=1125&seq=udc-curl-3b&orientation=portrait",
    imageAlt: "Retrato de uma pessoa com cachos médios em espiral fechada e volume definido.",
    facts: [
      { label: "Formato", value: "Espiral fechada" },
      { label: "Diâmetro", value: "Lápis" },
      { label: "Umidade", value: "Pede hidratação" },
    ],
    paragraphs: [
      "O 3B tem a espiral bem desenhada — o cacho fecha em volta do dedo e mantém a forma por mais tempo. É uma curvatura com bastante corpo, que responde bem à técnica de amassamento e à ordem correta dos produtos.",
      "Como a espiral é mais fechada, o produto demora mais para descer até as pontas. Aplicar em mechas, com o cabelo escorrendo água, faz diferença real no resultado.",
    ],
    characteristics: [
      "Espirais médias e regulares, do diâmetro aproximado de um lápis.",
      "Volume natural acentuado, com definição consistente.",
      "Fio médio a grosso, que aceita cremes de textura intermediária.",
      "Pode ficar ressecado nas pontas mesmo com a raiz confortável.",
    ],
    needs: [
      "Hidratação frequente e nutrição regular para manter a espiral macia.",
      "Produtos aplicados em mechas, com água suficiente para deslizar.",
      "Fixação média para segurar a forma sem endurecer.",
      "Proteção noturna, porque o atrito desfaz o desenho com facilidade.",
    ],
    finishing: [
      {
        title: "Divida em mechas e mantenha a água",
        text: "Quatro a seis partes, creme generoso em cada uma, amassando de baixo para cima. Se o cabelo começar a secar durante a aplicação, borrife água — produto sobre fio seco cria resíduo.",
      },
      {
        title: "Creme primeiro, geleia depois",
        text: "O creme dá base e maleabilidade; a geleia segura o desenho até secar. Nunca o contrário: geleia por baixo do creme perde a função.",
      },
      {
        title: "Seque sem tocar e quebre o efeito",
        text: "Difusor em temperatura baixa ou secagem natural. Quando estiver completamente seco, aperte o cabelo entre as mãos para soltar a fixação e ganhar volume.",
      },
    ],
    care: [
      "Hidratação semanal, alternando com nutrição a cada quinze dias.",
      "Condicionador em quantidade generosa no desembaraço.",
      "Reconstrução pontual, a cada 30 ou 45 dias, só se o fio estiver frágil.",
      "Evite prender com elástico fino e dormir com o cabelo apertado.",
    ],
    productSlugs: [
      "mascara-de-hidratacao-intensa",
      "creme-de-pentear-definidor",
      "geleia-definidora-sem-alcool",
    ],
  },
  {
    slug: "3c",
    code: "3C",
    name: "Cacheado 3C",
    familySlug: "cacheados",
    family: "Cacheados",
    tagline: "Espirais fechadas, muito volume.",
    summary:
      "Cachos bem fechados, em espiral apertada, com volume alto e fio mais grosso. Exige mais produto por mecha e mais paciência no desembaraço.",
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20beauty%20portrait%20of%20a%20woman%20with%20very%20tight%20corkscrew%20curls%20about%20the%20width%20of%20a%20straw%2C%20dense%20voluminous%20curl%20mass%2C%20warm%20plaster%20wall%20in%20nude%20and%20copper%20tones%2C%20soft%20dramatic%20daylight%2C%20calm%20expression%20turned%20slightly%20away%2C%20no%20text%20no%20logos&width=900&height=1125&seq=udc-curl-3c&orientation=portrait",
    imageAlt: "Retrato de uma pessoa com cachos bem fechados em espiral apertada e volume alto.",
    facts: [
      { label: "Formato", value: "Espiral apertada" },
      { label: "Diâmetro", value: "Canudo" },
      { label: "Umidade", value: "Baixa" },
    ],
    paragraphs: [
      "O 3C fecha a família dos cacheados com espirais apertadas, quase do diâmetro de um canudo, e um volume que impressiona. O fio é mais grosso e retém menos água do que parece — a superfície seca enquanto o interior ainda está úmido.",
      "Por isso, aqui a hidratação não é luxo: é manutenção. E o desembaraço precisa acontecer sempre molhado, em partes pequenas, com condicionador suficiente para o pente deslizar sem travar.",
    ],
    characteristics: [
      "Espirais apertadas e bem próximas, com muito volume.",
      "Fio grosso, com tendência a ressecar nas pontas.",
      "Definição intensa, mas suscetível a frizz na superfície.",
      "Necessita mais produto por mecha do que as faixas 3A e 3B.",
    ],
    needs: [
      "Hidratação frequente e nutrição consistente, sem exagerar na proteína.",
      "Desembaraço em partes pequenas, sempre com produto.",
      "Fixação maior para manter a espiral por mais dias.",
      "Cuidado redobrado com tração: nada de prender apertado.",
    ],
    finishing: [
      {
        title: "Produto em mechas menores",
        text: "Trabalhe em seis a oito partes, com creme mais denso e água suficiente. O cacho 3C se forma melhor quando cada mecha recebe produto de verdade, e não uma camada por cima.",
      },
      {
        title: "Geleia para segurar a espiral",
        text: "Uma camada de geleia ajuda a espiral a secar fechada. Aplique com a mão em concha, sem pentear depois — pentear no fim desfaz o agrupamento.",
      },
      {
        title: "Secagem longa, sem pressa",
        text: "Difusor em temperatura baixa, em ciclos curtos, ou secagem natural em local ventilado. Tocar antes de secar por completo é o que mais cria frizz nessa faixa.",
      },
    ],
    care: [
      "Lavagem com shampoo suave, atenção ao couro cabeludo.",
      "Hidratação semanal e nutrição a cada quinze dias.",
      "Máscara de reconstrução apenas a cada 30 ou 45 dias.",
      "Proteção noturna com touca de cetim e abacaxi bem frouxo.",
    ],
    productSlugs: [
      "mascara-de-hidratacao-intensa",
      "mascara-de-nutricao-com-oleos",
      "geleia-definidora-sem-alcool",
    ],
  },
  {
    slug: "4a",
    code: "4A",
    name: "Crespo 4A",
    familySlug: "crespos",
    family: "Crespos",
    tagline: "Coils em espiral pequena.",
    summary:
      "Coils apertados em espiral pequena, com bastante versatilidade de forma. Naturalmente mais seco, pede nutrição com constância e desembaraço sem pressa.",
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20beauty%20portrait%20of%20a%20Black%20woman%20with%20small%20tight%20springy%20coils%20in%20a%20soft%20rounded%20shape%2C%20naturally%20dry%20texture%20with%20warm%20sheen%2C%20warm%20plaster%20background%20in%20nude%20and%20copper%20tones%2C%20soft%20golden%20daylight%2C%20calm%20powerful%20expression%2C%20no%20text%20no%20logos&width=900&height=1125&seq=udc-curl-4a&orientation=portrait",
    imageAlt: "Retrato de uma mulher negra com coils pequenos e apertados em formato arredondado.",
    facts: [
      { label: "Formato", value: "Coil em espiral" },
      { label: "Diâmetro", value: "Pequeno" },
      { label: "Umidade", value: "Baixa" },
    ],
    paragraphs: [
      "O 4A é o primeiro degrau dos crespos: coils pequenos, em espiral, com uma definição que lembra um cacho bem fechado. É a faixa mais versátil da família — aceita desde o uso solto até penteados mais elaborados.",
      "A característica que muda a rotina é a retenção de água. O óleo do couro cabeludo não desce até as pontas com facilidade, então a nutrição precisa vir de fora, com regularidade.",
    ],
    characteristics: [
      "Coils pequenos e regulares, em espiral fechada.",
      "Fio com menos brilho natural e sensação mais seca ao toque.",
      "Grande versatilidade: solto, preso, torcido ou com gel.",
      "Encolhimento visível quando o cabelo seca.",
    ],
    needs: [
      "Nutrição com óleos vegetais, além da hidratação com água.",
      "Desembaraço em partes pequenas, molhado e com condicionador.",
      "Proteção contra tração: penteados sem aperto e sem elástico fino.",
      "Reconstrução pontual, só quando o fio estiver elástico ou quebrando.",
    ],
    finishing: [
      {
        title: "Mechas pequenas, produto generoso",
        text: "Divida em partes menores do que você imagina e aplique creme em cada mecha, com o cabelo bem molhado. Amasse de baixo para cima para o coil se agrupar.",
      },
      {
        title: "Geleia ou gel para fixar",
        text: "Uma camada de geleia segura o desenho e ajuda a reduzir o frizz na superfície. Aplique antes de qualquer toque no cabelo molhado.",
      },
      {
        title: "Secar sem tocar, quebrar com carinho",
        text: "Secagem natural ou difusor em ar frio. Depois de seco, aperte o cabelo entre as mãos ou use uma gota de óleo nas pontas para soltar a fixação.",
      },
    ],
    care: [
      "Hidratação semanal e nutrição a cada quinze dias.",
      "Condicionador generoso no desembaraço, parte por parte.",
      "Óleo de acabamento nas pontas, com o cabelo seco.",
      "Evite dormir com o cabelo preso com força; prefira touca de cetim.",
    ],
    productSlugs: [
      "mascara-de-nutricao-com-oleos",
      "tratamento-de-reconstrucao",
      "geleia-definidora-sem-alcool",
    ],
  },
  {
    slug: "4b",
    code: "4B",
    name: "Crespo 4B",
    familySlug: "crespos",
    family: "Crespos",
    tagline: "Zigue-zague com ângulos.",
    summary:
      "Cachos em zigue-zague, com dobras em ângulo em vez de espiral. Menos definição natural, mais volume — e uma necessidade clara de umidade constante.",
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20beauty%20portrait%20of%20a%20Black%20woman%20with%20densely%20packed%20zigzag%20coils%20forming%20a%20full%20rounded%20afro%20shape%2C%20less%20defined%20spring%20pattern%20with%20rich%20volume%2C%20warm%20plaster%20background%2C%20warm%20nude%20and%20copper%20tones%2C%20soft%20dramatic%20side%20light%2C%20calm%20expression%2C%20no%20text%20no%20logos&width=900&height=1125&seq=udc-curl-4b&orientation=portrait",
    imageAlt: "Retrato de uma mulher negra com coils em zigue-zague e volume arredondado.",
    facts: [
      { label: "Formato", value: "Zigue-zague" },
      { label: "Diâmetro", value: "Muito pequeno" },
      { label: "Umidade", value: "Muito baixa" },
    ],
    paragraphs: [
      "No 4B, o fio não desenha espiral: ele dobra em ângulos, num zigue-zague apertado que cria volume em vez de definição. Isso não é defeito — é o desenho natural dessa curvatura.",
      "Como a cutícula é mais aberta, a água evapora rápido e o frizz aparece com facilidade. A rotina precisa ser mais frequente do que intensa: hidratação constante e camadas leves de produto funcionam melhor do que uma única aplicação pesada.",
    ],
    characteristics: [
      "Coils em zigue-zague, com dobras em ângulo bem marcadas.",
      "Volume alto e formato arredondado, com pouca espiral visível.",
      "Fio com cutícula aberta, que seca rápido e frisa fácil.",
      "Encolhimento acentuado; o comprimento real aparece quando o cabelo é esticado.",
    ],
    needs: [
      "Camadas de hidratação: água, creme e óleo, nessa ordem.",
      "Produtos com mais lipídios, para reduzir a sensação de aspereza.",
      "Desembaraço paciente, sempre com produto e em partes pequenas.",
      "Proteção contra atrito e tração em qualquer penteado.",
    ],
    finishing: [
      {
        title: "Hidrate antes de finalizar",
        text: "Borrife água ou leave-in em mechas antes do creme. Em 4B, o creme sozinho não dá conta: ele precisa de água para deslizar por toda a extensão do fio.",
      },
      {
        title: "Creme denso e óleo nas pontas",
        text: "Aplique creme em cada mecha, amassando. Depois, uma gota de óleo apenas nas pontas ajuda a selar a umidade que você acabou de colocar.",
      },
      {
        title: "Fixação opcional, secagem lenta",
        text: "Se quiser definição, use geleia em quantidade moderada. Seque naturalmente ou com difusor em ar frio — o calor alto resseca a superfície e aumenta o frizz.",
      },
    ],
    care: [
      "Hidratação semanal sem falta; nutrição a cada quinze dias.",
      "Condicionador em quantidade generosa, com pente de dentes largos.",
      "Reconstrução a cada 30 ou 45 dias, observando a elasticidade do fio.",
      "Evite pentear a seco e dormir sem proteção de cetim.",
    ],
    productSlugs: [
      "mascara-de-nutricao-com-oleos",
      "tratamento-de-reconstrucao",
      "pente-de-dentes-largos",
    ],
  },
  {
    slug: "4c",
    code: "4C",
    name: "Crespo 4C",
    familySlug: "crespos",
    family: "Crespos",
    tagline: "O coil mais fechado do guia.",
    summary:
      "Coils muito apertados, em zigue-zague compacto, com o maior encolhimento da escala. Umidade baixa, fragilidade maior e um cuidado que pede mão leve e constância.",
    image:
      "https://readdy.ai/api/search-image?query=Editorial%20beauty%20portrait%20of%20a%20Black%20woman%20with%20the%20tightest%20small%20zigzag%20coils%20in%20a%20compact%20full%20afro%2C%20very%20dense%20texture%20with%20soft%20warm%20sheen%2C%20warm%20plaster%20background%20in%20nude%20and%20copper%20tones%2C%20gentle%20rim%20light%2C%20calm%20dignified%20expression%2C%20no%20text%20no%20logos&width=900&height=1125&seq=udc-curl-4c&orientation=portrait",
    imageAlt: "Retrato de uma mulher negra com coils muito apertados em afro compacto.",
    facts: [
      { label: "Formato", value: "Zigue-zague compacto" },
      { label: "Diâmetro", value: "Mínimo" },
      { label: "Umidade", value: "Muito baixa" },
    ],
    paragraphs: [
      "O 4C é o coil mais fechado do guia: dobras muito próximas, textura densa e um encolhimento que pode esconder metade do comprimento real do cabelo. A definição existe, mas é fina, quase um relevo.",
      "É também a faixa em que a fragilidade aparece mais. O fio quebra com facilidade, e por isso tudo importa: a temperatura da água, a quantidade de produto, o tipo de elástico, a pressa no desembaraço.",
    ],
    characteristics: [
      "Coils mínimos, em zigue-zague compacto e muito denso.",
      "Encolhimento acentuado, com comprimento aparente bem menor.",
      "Textura naturalmente seca, com pouco brilho na superfície.",
      "Maior tendência a quebra e a pontas duplas.",
    ],
    needs: [
      "Hidratação e nutrição constantes, com produtos de textura rica.",
      "Desembaraço com muita água e condicionador, sem nunca forçar.",
      "Proteção contra tração em todos os penteados.",
      "Reconstrução criteriosa: proteína em excesso endurece o coil.",
    ],
    finishing: [
      {
        title: "Seções pequenas, muita água",
        text: "Trabalhe em oito partes ou mais. Cada mecha precisa de água e creme suficiente para deslizar — em 4C, aplicar produto por cima do cabelo não funciona.",
      },
      {
        title: "Creme rico e óleo para selar",
        text: "Creme de textura densa em cada mecha, amassando com a mão em concha. Depois, gotas de óleo nas pontas selam a umidade e reduzem o aspecto áspero.",
      },
      {
        title: "Definição opcional, sem exagero",
        text: "Se quiser mais desenho, uma geleia leve entra por último. Evite camadas demais: o coil fica pesado e perde o volume que é a marca dessa curvatura.",
      },
    ],
    care: [
      "Hidratação semanal e nutrição a cada quinze dias, sem pular etapas.",
      "Reconstrução a cada 45 dias, com atenção à elasticidade.",
      "Desembaraço sempre molhado, com pente de dentes largos.",
      "Touca de cetim todas as noites e penteados sem tensão durante o dia.",
    ],
    productSlugs: [
      "mascara-de-hidratacao-intensa",
      "tratamento-de-reconstrucao",
      "pente-de-dentes-largos",
    ],
  },
];

/* Short finishing hint used in the comparative table, so the guide can be
   read at a glance without opening each curvature. */
export const CURL_FINISH_HINTS: Record<string, string> = {
  "2A": "Creme leve, mãos em concha",
  "2B": "Creme leve do meio às pontas",
  "2C": "Creme mais denso + geleia fina",
  "3A": "Creme em mechas, amassando",
  "3B": "Creme e depois geleia",
  "3C": "Creme denso e fixação maior",
  "4A": "Creme generoso + geleia",
  "4B": "Água, creme denso e óleo",
  "4C": "Creme rico, seções pequenas",
};

export const getCurlType = (slug?: string) =>
  CURL_TYPES.find((item) => item.slug === slug);