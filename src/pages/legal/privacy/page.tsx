import LegalDoc, { type LegalSection } from "@/pages/legal/components/LegalDoc";
import { usePageMeta } from "@/hooks/usePageMeta";

const SECTIONS: LegalSection[] = [
  {
    heading: "Quem cuida destes dados",
    paragraphs: [
      "O Universo dos Cachos é um portal editorial sobre cabelos ondulados, cacheados e crespos. Esta política explica quais informações passam por aqui, por que elas são coletadas e o que você pode pedir a qualquer momento.",
      "A base do nosso trabalho é simples: entregar conteúdo útil e honesto sem construir um dossiê sobre quem lê. Por isso, coletamos o mínimo necessário para o portal funcionar.",
    ],
  },
  {
    heading: "Quais dados coletamos",
    paragraphs: [
      "Existem apenas três situações em que dados pessoais entram no sistema. Nas outras, você navega como visitante anônimo.",
    ],
    list: [
      "Newsletter: seu e-mail, a data da inscrição e o registro do seu consentimento.",
      "Formulário de contato: nome, e-mail, tipo de cacho (opcional) e a mensagem que você escreve.",
      "Navegação e publicidade: se você aceitar os cookies, ferramentas de medição e de anúncios (como o Google Tag Manager e o Google AdSense) recebem dados técnicos do seu navegador, como páginas visitadas, cliques e identificadores de cookie. Se você escolher só o essencial, essas ferramentas não são carregadas.",
    ],
  },
  {
    heading: "Para que usamos",
    paragraphs: [
      "O e-mail da newsletter é usado exclusivamente para enviar as cartas semanais do portal. O e-mail de contato serve para responder à sua mensagem. Nenhum dos dois alimenta listas de terceiros, e não fazemos contato comercial sem pedido.",
      "Os dados de medição servem para entender quais assuntos interessam a quem lê — assim decidimos o que escrever e quais categorias de produto merecem mais atenção. Os dados de publicidade permitem exibir anúncios no blog, que ajudam a manter o portal gratuito.",
    ],
  },
  {
    heading: "Base legal e seus direitos (LGPD)",
    paragraphs: [
      "Tratamos dados com base no seu consentimento, no legítimo interesse editorial e no cumprimento de obrigações legais, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).",
      "Você pode, a qualquer momento, pedir confirmação de tratamento, acesso, correção, anonimização, portabilidade ou exclusão dos seus dados, além de revogar o consentimento. Basta escrever para a gente pelo formulário de contato.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "Cookies são pequenos arquivos guardados no seu navegador. Este portal usa três tipos: os essenciais, que mantêm preferências básicas (como a sua própria escolha no aviso de cookies); os de medição, que contam visitas para entendermos o alcance dos textos; e os de publicidade, usados por parceiros como o Google para exibir e medir anúncios, que podem ser personalizados.",
      "Os cookies de medição e de publicidade só são carregados depois que você clica em “Aceitar” no aviso. Quem escolhe “Só o essencial” navega normalmente, sem esses cookies e sem anúncios.",
      "Você pode mudar a escolha a qualquer momento em “Preferências de cookies”, no rodapé. Retirar o consentimento recarrega a página para interromper esses serviços. Para apagar o que já está guardado, limpe os dados do site nas configurações do navegador. Os parceiros de publicidade têm políticas próprias, e o Google explica como usa dados em seus serviços na página de privacidade e termos do próprio Google.",
    ],
  },
  {
    heading: "Newsletter, consentimento e descadastro",
    paragraphs: [
      "A inscrição na newsletter é opcional e sempre confirmada por você ao enviar o formulário. Cada carta enviada traz um caminho de descadastro, e o pedido é processado sem exigir justificativa.",
      "Se você se descadastrar, seu e-mail sai da lista de envio. Podemos manter um registro mínimo da exclusão para não voltar a escrever para você por engano.",
    ],
  },
  {
    heading: "Links de afiliados e lojas parceiras",
    paragraphs: [
      "Alguns links de produtos levam a lojas parceiras e podem gerar comissão para o portal, sem custo adicional para você. Ao clicar, você passa a estar sujeito à política de privacidade e aos cookies daquela loja.",
      "Quando você aceita os cookies de medição, os cliques em links de produtos podem ser contados pelas ferramentas de medição, para entendermos o que é útil. Não recebemos da loja o seu nome, endereço ou dados de pagamento.",
    ],
  },
  {
    heading: "Compartilhamento e segurança",
    paragraphs: [
      "Não vendemos, alugamos ou cedemos dados pessoais por conta própria. O compartilhamento acontece apenas com fornecedores estritamente necessários à operação do portal — hospedagem, banco de dados, envio de e-mail, medição e publicidade — e sempre limitado ao necessário. Se você aceitar os cookies de publicidade, os parceiros de anúncios passam a tratar os dados coletados por eles.",
      "Adotamos medidas técnicas razoáveis para proteger as informações, incluindo acesso restrito ao painel administrativo e controle de permissões. Nenhum sistema é totalmente imune, mas tratamos incidentes com seriedade e comunicamos quando houver risco relevante.",
    ],
  },
  {
    heading: "Por quanto tempo guardamos",
    paragraphs: [
      "E-mails da newsletter ficam guardados enquanto a inscrição estiver ativa. Mensagens de contato são mantidas pelo tempo necessário para responder e registrar o histórico da conversa.",
      "Registros de navegação agregados podem ser mantidos por até vinte e quatro meses. Depois disso, são descartados ou consolidados de forma anônima.",
    ],
  },
  {
    heading: "Crianças e adolescentes",
    paragraphs: [
      "A seção Cachos Infantis é escrita para pais, mães e responsáveis. Não coletamos dados de crianças de forma consciente. Se você identificar que uma criança enviou informações pelo portal, escreva para a gente — apagamos o registro.",
    ],
  },
  {
    heading: "Alterações e contato",
    paragraphs: [
      "Quando esta política mudar de forma relevante, atualizamos a data no topo e destacamos o que mudou. O uso contínuo do portal depois da atualização significa que você está de acordo com a versão vigente.",
      "Dúvidas, pedidos de acesso ou de exclusão: use o formulário de contato da página inicial. Respondemos com calma, em até dois dias úteis.",
    ],
  },
];

export default function PrivacyPage() {
  usePageMeta({
    title: "Política de privacidade | Universo dos Cachos",
    description:
      "Como o Universo dos Cachos trata dados pessoais: newsletter, formulário de contato, cookies, links de afiliados, direitos previstos na LGPD e prazos de retenção.",
    path: "/politica-de-privacidade",
  });

  return (
    <LegalDoc
      crumb="Política de privacidade"
      stamp="Privacidade e LGPD"
      title={
        <>
          O que fazemos com
          <br />
          os seus <em>dados</em>.
        </>
      }
      subtitle="Sem letras miúdas: quais informações o portal recebe, para que servem, por quanto tempo ficam e como pedir a exclusão."
      updated="15 de novembro de 2026"
      intro="Este portal existe para informar, não para coletar. Ainda assim, newsletter, formulário e medição de leitura envolvem dados — e é justo que você saiba exatamente o que acontece com eles."
      sections={SECTIONS}
      callout="Resumo em uma linha: guardamos o que você decide enviar, medição e anúncios só entram se você aceitar, e apagamos seus dados quando você pedir."
      asideLink={{ label: "Transparência de afiliados", to: "/transparencia" }}
    />
  );
}