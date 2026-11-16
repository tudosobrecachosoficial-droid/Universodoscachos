-- OPCIONAL. Converte posts.date de VARCHAR para DATE (ordenação e filtros corretos).
-- ATENÇÃO: só rode depois de conferir que o painel admin grava datas no formato AAAA-MM-DD
-- e que todos os valores atuais seguem esse formato; senão a conversão falha (nada é alterado).
--   SELECT slug, date FROM posts WHERE date IS NOT NULL AND date !~ '^\d{4}-\d{2}-\d{2}$';
BEGIN;
ALTER TABLE posts ALTER COLUMN date TYPE DATE USING NULLIF(trim(date), '')::date;
COMMIT;
