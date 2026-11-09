# Configuração do Supabase

Este documento descreve como configurar o Supabase para o projeto Cachos.

## 1. Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Preencha:
   - **Name**: projeto-cachos (ou o nome que preferir)
   - **Database Password**: escolha uma senha forte
   - **Region**: escolha a região mais próxima de você
5. Clique em "Create new project"
6. Aguarde o projeto ser criado (pode levar alguns minutos)

## 2. Configurar Variáveis de Ambiente

1. No seu projeto Supabase, vá em **Settings > API**
2. Copie:
   - **Project URL** (algo como `https://xyz.supabase.co`)
   - **anon public** key (chave pública)
3. Crie um arquivo `.env` na raiz do projeto:
   ```bash
   cp .env.example .env
   ```
4. Edite o arquivo `.env` e substitua com suas credenciais:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
   ```
   Para importar os dados iniciais, adicione também a chave `service_role` somente ao
   ambiente local do script:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
   ```
   Nunca use `VITE_` nessa chave: ela não pode ser incluída no código do navegador nem
   compartilhada em repositórios.

## 3. Criar Tabelas no Banco de Dados

### Opção A: Via SQL Editor (Recomendado)

1. No dashboard do Supabase, vá em **SQL Editor**
2. Clique em "New query"
3. Copie todo o conteúdo do arquivo `supabase-schema-fixed.sql`
4. Cole no editor e clique em "Run"
5. Aguarde a execução do script

O arquivo `supabase-schema.sql` contém um modelo antigo e incompatível com a aplicação.
Use `supabase-schema-fixed.sql`, que cria/atualiza as tabelas e mantém as políticas de leitura.

## 4. Importar conteúdo inicial (opcional)

Se o banco ainda estiver vazio e você quiser inserir o conteúdo de demonstração dos arquivos
`src/mocks/`, execute:

1. Certifique-se de que o arquivo `.env` está configurado
2. Execute o script de migração:
   ```bash
   npx tsx scripts/migrate-mocks-to-supabase.ts
   ```

O script insere apenas registros ausentes por slug; registros já existentes no banco não são
sobrescritos. Se uma migração antiga já criou registros incompletos a partir dos mocks, você pode
definir `SUPABASE_MIGRATION_OVERWRITE=true` para preenchê-los — isso substitui os registros com os
mesmos slugs pelo conteúdo dos mocks. Não use essa opção em conteúdo final que precise preservar.

## 5. Atualizar o Código para Usar o Supabase

O catálogo, as categorias, o blog, a página inicial e as páginas de detalhe leem os
registros publicados diretamente do Supabase. Os serviços ficam em `src/services/`.

## 6. Estrutura das Tabelas

### product_categories
- Categorias de produtos (shampoos, condicionadores, etc.)

### products
- Produtos com nome, descrição, preço, imagem, categoria

### posts
- Posts do blog com título, conteúdo, autor, imagem

### curl_types
- Tipos de cachos (2A, 2B, 2C, 3A, 3B, 3C, 4A, 4B, 4C)

### glossary
- Termos do glossário com definições

### quiz_questions
- Perguntas do quiz com opções e respostas

### routines
- Rotinas de cuidados para cada tipo de cacho

### care_tips
- Dicas de cuidados organizadas por categoria

## 7. Segurança (RLS)

O schema já inclui políticas de Row Level Security (RLS) que:
- Permitem leitura pública do conteúdo; posts não publicados ficam restritos
- Não permitem escrita pública; a chave `service_role` fica reservada aos scripts locais

## 8. Storage (Opcional)

Para armazenar imagens, você pode configurar o Storage do Supabase:

1. Vá em **Storage** no dashboard
2. Crie um bucket chamado `images`
3. Configure as permissões do bucket para leitura pública
4. Atualize as URLs das imagens nos dados para usar o Storage

## Solução de Problemas

### Erro: "Supabase não configurado"
- Verifique se o arquivo `.env` existe e está configurado corretamente
- Reinicie o servidor de desenvolvimento após criar o arquivo `.env`

### Erro: "relation does not exist"
- Execute o script `supabase-schema-fixed.sql` no SQL Editor
- Verifique se todas as tabelas foram criadas no dashboard

### Erro de permissão
- Verifique as políticas RLS no dashboard
- Certifique-se de que as políticas "Allow public read access" estão ativadas
