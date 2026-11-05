import LegalDoc, { type LegalSection } from "@/pages/legal/components/LegalDoc";
import { usePageMeta } from "@/hooks/usePageMeta";

const SECTIONS: LegalSection[] = [
  {
    heading: "Como o portal se sustenta",
    paragraphs: [
      "O Universo dos Cachos é gratuito para quem lê. A manutenção do domínio, das imagens e das horas de escrita vem de duas fontes: links de afiliados e, eventualmente, conteúdos patrocinados claramente identificados.",
      "Não vendemos produtos, não intermediamos pedidos e não recebemos pagamento de marca para dizer que um produto funciona. Se um dia isso mudar, você vai ler esse aviso antes do texto.",
    ],
  },
  {
    heading: "O que é um link de afiliado",
    paragraphs: [
      "Um link de afiliado é um endereço para a loja que carrega um identificador do portal. Se você comprar por esse link, a loja repassa uma porcentagem do valor ao Universo dos Cachos.",
      "O preço que você paga é o mesmo, com ou sem o link de afiliado. A comissão sai da margem da loja, não do seu bolso.",
    ],
  },
  {
    heading: "Como os produtos entram na prateleira",
    paragraphs: [
      "Cada produto é escolhido por função (limpar, hidratar, nutrir, reconstruir, definir, finalizar) e descrito a partir das informações da embalagem e do que faz sentido para cada curvatura. Não inventamos preços, avaliações, resultados nem disponibilidade.",
      "Quando o preço não é informado com segurança, mostramos “Consulte o preço na loja”. Quando um item é atualizado, a data aparece na ficha do produto.",
    ],
  },
  {
    heading: "O que o portal não faz",
    paragraphs: [
      "Essa lista é curta de propósito — e é o nosso compromisso com quem lê.",
    ],
    list: [
      "Não vende produtos diretamente e não processa pagamentos.",
      "Não controla preço, estoque, prazo de entrega ou política de troca da loja.",
      "Não garante resultados: cada cabelo responde de um jeito.",
      "Não publica avaliações que não possam ser verificadas.",
      "Não esconde o aviso de afiliado no rodapé do texto.",
    ],
  },
  {
    heading: "Sobre a Shopee e outras lojas",
    paragraphs: [
      "Boa parte dos links leva à Shopee, com identificador de afiliado. A atribuição da comissão — incluindo o prazo em que o clique continua valendo — é definida pelas regras e pelos sistemas da própria plataforma.",
      "O Universo dos Cachos não controla essa janela, não altera a atribuição e não consegue convencer a loja a reconhecer uma compra. Se algo der errado no pedido, o atendimento é da loja.",
      "Outras lojas podem ser cadastradas no futuro. A estrutura do portal já está preparada para isso, e cada produto guarda sua própria loja e seu próprio link.",
    ],
  },
  {
    heading: "Independência editorial",
    paragraphs: [
      "Nenhuma marca recebe espaço na prateleira em troca de silêncio sobre defeitos. Se um produto é bom para um tipo de fio e ruim para outro, o texto diz isso.",
      "Artigos sobre cuidados não são revisados por marcas antes da publicação. As recomendações partem da função do produto e das necessidades de cada curvatura.",
    ],
  },
  {
    heading: "Conteúdo patrocinado, quando existir",
    paragraphs: [
      "Se um texto for patrocinado, ele será sinalizado no topo, antes do primeiro parágrafo, com a marca e o tipo de parceria. Nenhum patrocínio compra uma conclusão que contrarie a experiência real.",
      "Hoje o portal não mantém conteúdo patrocinado ativo. Quando isso acontecer, este documento será atualizado junto.",
    ],
  },
  {
    heading: "Preços, disponibilidade e devolução",
    paragraphs: [
      "Preços mudam sem aviso e promoções terminam. A data informada na ficha do produto indica quando aquele valor foi visto pela última vez — confirme sempre na loja antes de comprar.",
      "Trocas, devoluções e garantias seguem as regras do marketplace e do Código de Defesa do Consumidor. O portal pode orientar pelo formulário de contato, mas não intermedeia pedidos.",
    ],
  },
  {
    heading: "Como avisar sobre um link quebrado",
    paragraphs: [
      "Se um link não abrir, levar a outro produto ou mostrar um preço muito diferente do informado, escreva para a gente com o nome do produto e a data em que você viu o problema.",
      "Corrigimos o cadastro ou removemos o item da prateleira. Links quebrados são um erro nosso, não do leitor — e resolver isso rápido é parte do combinado.",
    ],
  },
  {
    heading: "Um compromisso com quem lê",
    paragraphs: [
      "O portal só continua existindo se o conteúdo for confiável. Por isso, a regra editorial é simples: se não dá para sustentar uma afirmação, ela não entra no texto.",
      "Você pode cobrar isso. Se algum trecho parecer exagerado, desatualizado ou vago, escreva — a resposta vem de pessoa para pessoa.",
    ],
  },
];

export default function TransparencyPage() {
  usePageMeta({
    title: "Transparência e afiliados | Universo dos Cachos",
    description:
      "Como o Universo dos Cachos usa links de afiliados, de onde vêm os produtos da prateleira, o que o portal não controla e como avisamos sobre conteúdo patrocinado.",
    path: "/transparencia",
  });

  return (
    <LegalDoc
      crumb="Transparência"
      stamp="Afiliados e independência"
      title={
        <>
          De onde vêm
          <br />
          as nossas <em>indicações</em>.
        </>
      }
      subtitle="Como o portal ganha dinheiro, o que a comissão muda no que escrevemos e o que continua fora do nosso controle."
      updated="5 de novembro de 2026"
      intro="Recomendar produto é uma responsabilidade. Esta página explica o caminho do clique até a comissão e deixa claro o que é escolha editorial e o que é regra da loja."
      sections={SECTIONS}
      callout="Transparência em uma linha: se você comprar por um link do portal, podemos receber comissão — o preço é o mesmo para você e a conclusão do texto não está à venda."
      asideLink={{ label: "Política de privacidade", to: "/politica-de-privacidade" }}
    />
  );
}