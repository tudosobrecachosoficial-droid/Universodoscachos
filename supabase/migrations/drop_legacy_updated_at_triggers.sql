-- Remove triggers legados que ainda referenciam a coluna antiga "updated_at".
--
-- O banco antigo tinha um trigger de "auto updated_at". Ao remover a coluna
-- duplicada updated_at (substituída por "updatedAt"), esse trigger passou a
-- quebrar qualquer INSERT/UPDATE em products com:
--   record "new" has no field "updated_at"
--
-- Esta migração remove apenas os triggers cuja função cita updated_at/updatedat.

DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT t.tgname AS trigger_name, c.relname AS table_name
    FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    JOIN pg_proc p ON p.oid = t.tgfoid
    WHERE n.nspname = 'public'
      AND NOT t.tgisinternal
      AND (
        pg_get_functiondef(p.oid) ILIKE '%updated_at%'
        OR pg_get_functiondef(p.oid) ILIKE '%updatedat%'
      )
  LOOP
    EXECUTE format('DROP TRIGGER %I ON public.%I', r.trigger_name, r.table_name);
    RAISE NOTICE 'trigger removido: % em %', r.trigger_name, r.table_name;
  END LOOP;
END $$;
