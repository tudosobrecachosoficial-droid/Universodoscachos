-- Alinha o banco remoto aos nomes de coluna que o site espera (camelCase).
--
-- O banco em uso foi criado por scripts antigos: várias colunas ficaram em
-- minúsculas (seotitle, categoryslug...) e outras foram duplicadas por
-- tentativas repetidas (category / category_label / categorylabel / categoryLabel).
-- Por isso o PostgREST devolvia 400 em toda consulta de posts e products.
--
-- Esta migração renomeia preservando os dados, adiciona o que falta, cria a
-- tabela leads e remove as colunas duplicadas. É idempotente.

-- ============================ posts ============================
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT * FROM (VALUES
      ('seotitle', 'seoTitle'),
      ('seodescription', 'seoDescription'),
      ('categoryslug', 'categorySlug'),
      ('readingtime', 'readingTime')
    ) AS v(old_name, new_name)
  LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_schema = 'public' AND table_name = 'posts' AND column_name = r.old_name)
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_schema = 'public' AND table_name = 'posts' AND column_name = r.new_name) THEN
      EXECUTE format('ALTER TABLE public.posts RENAME COLUMN %I TO %I', r.old_name, r.new_name);
    END IF;
  END LOOP;
END $$;

ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS "productSlugs" TEXT[] NOT NULL DEFAULT '{}';

-- ============================ products ============================
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT * FROM (VALUES
      ('categoryslug', 'categorySlug'),
      ('promoprice', 'promoPrice')
    ) AS v(old_name, new_name)
  LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_schema = 'public' AND table_name = 'products' AND column_name = r.old_name)
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_schema = 'public' AND table_name = 'products' AND column_name = r.new_name) THEN
      EXECUTE format('ALTER TABLE public.products RENAME COLUMN %I TO %I', r.old_name, r.new_name);
    END IF;
  END LOOP;
END $$;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS "categorySlug" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "categoryLabel" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "promoPrice" VARCHAR(50),
  ADD COLUMN IF NOT EXISTS "affiliateUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "updatedAt" VARCHAR(50),
  ADD COLUMN IF NOT EXISTS gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS sections JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Junta as colunas duplicadas na coluna que o site usa, sem perder dados.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'categorylabel') THEN
    UPDATE public.products SET "categoryLabel" = COALESCE(NULLIF("categoryLabel", ''), NULLIF(categorylabel, ''));
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'category_label') THEN
    UPDATE public.products SET "categoryLabel" = COALESCE(NULLIF("categoryLabel", ''), NULLIF(category_label, ''));
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'category') THEN
    UPDATE public.products SET "categoryLabel" = COALESCE(NULLIF("categoryLabel", ''), NULLIF(category, ''));
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'affiliateurl') THEN
    UPDATE public.products SET "affiliateUrl" = COALESCE(NULLIF("affiliateUrl", ''), NULLIF(affiliateurl, ''));
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'affiliate_link') THEN
    UPDATE public.products SET "affiliateUrl" = COALESCE(NULLIF("affiliateUrl", ''), NULLIF(affiliate_link, ''));
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'affiliatelink') THEN
    UPDATE public.products SET "affiliateUrl" = COALESCE(NULLIF("affiliateUrl", ''), NULLIF(affiliatelink, ''));
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'affiliateLink') THEN
    UPDATE public.products SET "affiliateUrl" = COALESCE(NULLIF("affiliateUrl", ''), NULLIF("affiliateLink", ''));
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'updatedat') THEN
    UPDATE public.products SET "updatedAt" = COALESCE("updatedAt", updatedat);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'updated_at') THEN
    UPDATE public.products SET "updatedAt" = COALESCE("updatedAt", updated_at::text);
  END IF;
END $$;

-- Remove as colunas duplicadas/legadas.
DO $$
DECLARE c text;
BEGIN
  FOREACH c IN ARRAY ARRAY[
    'category', 'category_label', 'categorylabel',
    'affiliateurl', 'affiliate_link', 'affiliatelink', 'affiliateLink',
    'updatedat', 'updated_at'
  ]
  LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'products' AND column_name = c) THEN
      EXECUTE format('ALTER TABLE public.products DROP COLUMN %I', c);
    END IF;
  END LOOP;
END $$;

-- ============================ quiz_questions ============================
ALTER TABLE public.quiz_questions
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255),
  ADD COLUMN IF NOT EXISTS helper TEXT,
  ADD COLUMN IF NOT EXISTS weight INTEGER DEFAULT 1;

-- ============================ routines ============================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'routines' AND column_name = 'curltype')
     AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'routines' AND column_name = 'curlType') THEN
    ALTER TABLE public.routines RENAME COLUMN curltype TO "curlType";
  END IF;
END $$;

ALTER TABLE public.routines
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255),
  ADD COLUMN IF NOT EXISTS title VARCHAR(255),
  ADD COLUMN IF NOT EXISTS text TEXT;

-- ============================ care_tips ============================
ALTER TABLE public.care_tips
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255),
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS category VARCHAR(255);

-- ============================ leads ============================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('newsletter', 'contact')),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  name TEXT CHECK (name IS NULL OR char_length(name) <= 120),
  curl_type TEXT CHECK (curl_type IS NULL OR char_length(curl_type) <= 40),
  message TEXT CHECK (message IS NULL OR char_length(message) <= 2000),
  consent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_newsletter_email ON public.leads (lower(email)) WHERE kind = 'newsletter';
CREATE INDEX IF NOT EXISTS idx_leads_created ON public.leads (created_at DESC);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Visitors can insert leads" ON public.leads;
CREATE POLICY "Visitors can insert leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (kind IN ('newsletter', 'contact'));

-- ============================ índices das consultas do site ============================
CREATE UNIQUE INDEX IF NOT EXISTS idx_quiz_questions_slug ON public.quiz_questions(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_routines_slug ON public.routines(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_care_tips_slug ON public.care_tips(slug);
CREATE INDEX IF NOT EXISTS idx_posts_product_slugs ON public.posts USING GIN ("productSlugs");
CREATE INDEX IF NOT EXISTS idx_posts_category_date ON public.posts ("categorySlug", date DESC);
CREATE INDEX IF NOT EXISTS idx_glossary_post_slugs ON public.glossary USING GIN ("postSlugs");
