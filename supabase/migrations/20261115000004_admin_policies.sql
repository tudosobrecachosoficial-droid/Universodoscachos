-- Escrita pelo painel admin SEM usar a service key no navegador.
-- O admin entra com Supabase Auth; só usuários com app_metadata.role = 'admin' escrevem.
-- Para marcar um usuário (SQL Editor):
--   UPDATE auth.users SET raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}' WHERE email = 'voce@exemplo.com';
-- app_metadata só pode ser alterado pelo servidor, então o usuário não consegue se promover sozinho.

CREATE OR REPLACE FUNCTION public.is_site_admin() RETURNS boolean
LANGUAGE sql STABLE AS $$
  SELECT COALESCE((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
$$;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['products','product_categories','posts','curl_types','glossary','quiz_questions','routines','care_tips','leads']
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Site admin full access on %1$s" ON %1$I', t);
    EXECUTE format(
      'CREATE POLICY "Site admin full access on %1$s" ON %1$I FOR ALL TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin())',
      t
    );
  END LOOP;
END $$;

-- O admin também precisa ver rascunhos (posts com published = false).
-- A política pública de leitura continua limitada a published = true.
