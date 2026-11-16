# O que mudou nesta versão

## Antes de publicar (checklist)

1. O `package-lock.json` já está sincronizado com o `package.json` (as dependências de i18n foram removidas dos dois).
2. Preencher no Vercel: `VITE_SITE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (+ `VITE_GTM_ID`, e os `VITE_ADSENSE_*` quando o AdSense for aprovado).
3. Rodar as migrations de `supabase/migrations/` (ver `SUPABASE_SETUP.md`).
4. Trocar os links de afiliado dos produtos por links reais (o build avisa quais estão vazios ou só com a home da loja).
5. Conferir "Sobre a redação" e a política de privacidade com a realidade do negócio (e, de preferência, com um advogado).
6. O comando de build da Vercel deve ser `npm run build` (gera o `app-shell.html` usado pelo rewrite).

## Feito

- **Cookies/LGPD:** GTM e AdSense só carregam depois de "Aceitar". Escolha reabrível no rodapé; retirar o consentimento recarrega a página. Política de privacidade e página de transparência atualizadas para anúncios.
- **Anúncios:** componente `AdSlot` (meio e fim dos artigos, altura reservada, só com consentimento), `ads.txt` gerado a partir de `VITE_ADSENSE_CLIENT`.
- **SEO:** pré-renderização no build (home, blog, artigos, produtos, categorias, tipos de cachos) com título, descrição, canonical, Open Graph com URL absoluta, JSON-LD e texto da página; `sitemap.xml` e `robots.txt` gerados; imagem de compartilhamento padrão; páginas inexistentes viram `noindex`; 404 em português.
- **Dados:** consultas filtradas no banco (relacionados, produtos e termos de cada artigo) em vez de baixar tabelas inteiras; listas sem o corpo dos artigos/produtos; cache em memória; índices GIN.
- **Banco:** schema único em migrations; scripts legados (e perigosos) removidos; tabela `leads` com RLS só de inserção; políticas de admin por papel.
- **Formulários:** newsletter e contato gravam no Supabase (`leads`), não mais em endpoint externo.
- **Structured data:** `Offer` só enquanto o preço tem até 30 dias, sem declarar disponibilidade.
- **Segurança/limpeza:** `dangerouslySetInnerHTML` removido do título da home; i18n sem uso removido; resíduos da plataforma geradora removidos; cabeçalhos de segurança e cache na Vercel.
- **Desempenho:** favicon e ícones redimensionados (431 KB → 4 KB no favicon), logo em WebP, `loading="lazy"` nas imagens abaixo da dobra.
- **Qualidade:** 17 testes (`npm test`), `npm run typecheck`, CI no GitHub Actions.

## Correção de uma análise anterior

Eu disse que categorias criadas no admin não ganhavam rota. Estava errado: `/produtos/:slug` já caía na página de categoria quando o slug não era de produto. O que existia era uma lista duplicada nos mocks no roteador, agora removida. O blog agora também deriva as categorias dos próprios artigos.

## Não feito (precisa de você ou de rede)

- **Links de afiliado reais** (nos mocks, os 13 produtos apontam para a home da Shopee).
- **Mover imagens e vídeo** do Readdy para o Supabase Storage (precisa de rede e credenciais).
- **Confirmação de e-mail (double opt-in)** e envio da newsletter: exige um serviço de e-mail.
- **CMP certificada pelo Google (TCF)**: necessária se houver visitantes da Europa/Reino Unido.
- **Textos de conteúdo ainda em `src/mocks`:** famílias de curvatura, textos de cuidados/rotinas/quiz (conteúdo editorial estático, não gerido pelo admin).
- **CSS em um arquivo só (112 KB)** e o hero com vídeo: mexer exige ver o resultado no navegador.
- **Build não executado aqui** (sem rede/`node_modules`): rodei os testes e o prerender com dados dos mocks; faça `npm run typecheck && npm run build` antes de publicar.
