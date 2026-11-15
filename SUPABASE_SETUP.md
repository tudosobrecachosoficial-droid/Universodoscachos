# Supabase: como preparar o banco

## 1. Variáveis de ambiente

Copie `.env.example` para `.env` e preencha. Regras:

- `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` são públicas (vão para o navegador). A segurança vem do RLS.
- `SUPABASE_SERVICE_ROLE_KEY` é secreta: **nunca** use o prefixo `VITE_` nela, nunca a coloque no Vercel como variável do front-end e nunca a use em um painel que roda no navegador. Só os scripts locais de `scripts/` a leem.

## 2. Criar/atualizar as tabelas

Rode, **em ordem**, os arquivos de `supabase/migrations/` no SQL Editor do Supabase (ou com `supabase db push`):

1. `…_init.sql`: tabelas, índices e RLS de leitura pública (substitui os antigos `supabase-schema*.sql`).
2. `…_indexes.sql`: índices das consultas filtradas.
3. `…_leads.sql`: tabela da newsletter e do contato (o visitante só consegue inserir).
4. `…_admin_policies.sql`: escrita para o admin autenticado (veja abaixo).

São idempotentes: podem ser reexecutadas.

## 3. Carregar o conteúdo inicial (opcional)

```bash
npm run db:seed     # envia os mocks de src/mocks para o banco (usa a service key)
npm run db:check    # confere se o banco responde com a chave pública
```

## 4. Painel admin sem service key no navegador

O site só lê. Para editar, o painel deve entrar com **Supabase Auth** e o usuário precisa ter `role = admin`:

```sql
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
WHERE email = 'voce@exemplo.com';
```

A migration `…_admin_policies.sql` libera escrita (e leitura de rascunhos) só para esse papel. Depois disso o painel usa a chave pública + login, e a service key sai do código dele.

## 5. Ler newsletter e mensagens

Os envios caem na tabela `leads` (`kind` = `newsletter` ou `contact`). Leia pelo painel do Supabase ou pelo admin autenticado.

## Opcional: `posts.date` como data de verdade

`supabase/optional/posts-date-as-date.sql`. Leia o aviso no topo do arquivo antes de rodar.
