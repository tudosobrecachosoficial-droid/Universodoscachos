-- Habilitar extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Categorias de Produtos (baseada na estrutura do mock)
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  label VARCHAR(255) NOT NULL,
  intro TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Produtos (baseada na estrutura do mock)
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  "categorySlug" VARCHAR(255),
  "categoryLabel" VARCHAR(255),
  curls TEXT[],
  need VARCHAR(255),
  price VARCHAR(50),
  "promoPrice" VARCHAR(50),
  store VARCHAR(255),
  "affiliateUrl" TEXT,
  featured BOOLEAN DEFAULT FALSE,
  "updatedAt" VARCHAR(50),
  summary TEXT,
  image TEXT,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Posts (baseada na estrutura do mock)
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  "seoTitle" VARCHAR(255),
  "seoDescription" TEXT,
  subtitle TEXT,
  category VARCHAR(255),
  "categorySlug" VARCHAR(255),
  tags TEXT[],
  author VARCHAR(255),
  date VARCHAR(50),
  "readingTime" INTEGER,
  featured BOOLEAN DEFAULT FALSE,
  excerpt TEXT,
  image TEXT,
  sections JSONB,
  "productSlugs" TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Tipos de Cachos (baseada na estrutura do mock)
CREATE TABLE IF NOT EXISTS curl_types (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(10),
  "familySlug" VARCHAR(255),
  "familyLabel" VARCHAR(255),
  tagline TEXT,
  summary TEXT,
  "imageAlt" TEXT,
  facts JSONB NOT NULL DEFAULT '[]'::jsonb,
  paragraphs TEXT[] NOT NULL DEFAULT '{}',
  needs TEXT[] NOT NULL DEFAULT '{}',
  finishing JSONB NOT NULL DEFAULT '[]'::jsonb,
  care TEXT[] NOT NULL DEFAULT '{}',
  "productSlugs" TEXT[] NOT NULL DEFAULT '{}',
  description TEXT,
  characteristics TEXT[],
  tips TEXT[],
  hairPorosity VARCHAR(255),
  hairThickness VARCHAR(255),
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Glossário (baseada na estrutura do mock)
CREATE TABLE IF NOT EXISTS glossary (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  term VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  letter VARCHAR(1),
  short TEXT,
  long TEXT,
  definition TEXT,
  category VARCHAR(255),
  codes TEXT[] NOT NULL DEFAULT '{}',
  "postSlugs" TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Perguntas do Quiz (baseada na estrutura do mock)
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  question TEXT NOT NULL,
  helper TEXT,
  weight INTEGER DEFAULT 1,
  options JSONB,
  correct INTEGER,
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Rotinas (baseada na estrutura do mock)
CREATE TABLE IF NOT EXISTS routines (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  day VARCHAR(255),
  title VARCHAR(255),
  text TEXT,
  description TEXT,
  "curlType" VARCHAR(255),
  steps TEXT[],
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Dicas de Cuidados (baseada na estrutura do mock)
CREATE TABLE IF NOT EXISTS care_tips (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  num VARCHAR(10),
  title VARCHAR(255),
  text TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Complete the schema when upgrading a database created by an earlier version.
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS brand VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "categorySlug" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "categoryLabel" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS curls TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS need VARCHAR(255),
  ADD COLUMN IF NOT EXISTS price VARCHAR(50),
  ADD COLUMN IF NOT EXISTS "promoPrice" VARCHAR(50),
  ADD COLUMN IF NOT EXISTS store VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "affiliateUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "updatedAt" VARCHAR(50),
  ADD COLUMN IF NOT EXISTS summary TEXT,
  ADD COLUMN IF NOT EXISTS image TEXT,
  ADD COLUMN IF NOT EXISTS gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS sections JSONB NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS "seoTitle" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "seoDescription" TEXT,
  ADD COLUMN IF NOT EXISTS subtitle TEXT,
  ADD COLUMN IF NOT EXISTS category VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "categorySlug" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS author VARCHAR(255),
  ADD COLUMN IF NOT EXISTS date VARCHAR(50),
  ADD COLUMN IF NOT EXISTS "readingTime" INTEGER,
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS excerpt TEXT,
  ADD COLUMN IF NOT EXISTS image TEXT,
  ADD COLUMN IF NOT EXISTS sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS "productSlugs" TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT TRUE;

ALTER TABLE curl_types
  ADD COLUMN IF NOT EXISTS "familySlug" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "familyLabel" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS tagline TEXT,
  ADD COLUMN IF NOT EXISTS summary TEXT,
  ADD COLUMN IF NOT EXISTS "imageAlt" TEXT,
  ADD COLUMN IF NOT EXISTS facts JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS paragraphs TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS needs TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS finishing JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS care TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS "productSlugs" TEXT[] NOT NULL DEFAULT '{}';

ALTER TABLE glossary
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255),
  ADD COLUMN IF NOT EXISTS letter VARCHAR(1),
  ADD COLUMN IF NOT EXISTS short TEXT,
  ADD COLUMN IF NOT EXISTS long TEXT,
  ADD COLUMN IF NOT EXISTS codes TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS "postSlugs" TEXT[] NOT NULL DEFAULT '{}';

CREATE UNIQUE INDEX IF NOT EXISTS idx_glossary_slug ON glossary(slug);

ALTER TABLE quiz_questions
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255),
  ADD COLUMN IF NOT EXISTS helper TEXT,
  ADD COLUMN IF NOT EXISTS weight INTEGER DEFAULT 1;

ALTER TABLE routines
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255),
  ADD COLUMN IF NOT EXISTS title VARCHAR(255),
  ADD COLUMN IF NOT EXISTS text TEXT,
  ADD COLUMN IF NOT EXISTS "curlType" VARCHAR(255);

ALTER TABLE care_tips
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255);

CREATE UNIQUE INDEX IF NOT EXISTS idx_quiz_questions_slug ON quiz_questions(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_routines_slug ON routines(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_care_tips_slug ON care_tips(slug);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products("categorySlug");
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_curl_types_slug ON curl_types(slug);
CREATE INDEX IF NOT EXISTS idx_glossary_category ON glossary(category);
CREATE INDEX IF NOT EXISTS idx_routines_curl_type ON routines("curlType");

-- Habilitar Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE curl_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE glossary ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE care_tips ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para leitura pública
DROP POLICY IF EXISTS "Allow public read access on products" ON products;
DROP POLICY IF EXISTS "Allow public read access on product_categories" ON product_categories;
DROP POLICY IF EXISTS "Allow public read access on posts" ON posts;
DROP POLICY IF EXISTS "Allow public read access on curl_types" ON curl_types;
DROP POLICY IF EXISTS "Allow public read access on glossary" ON glossary;
DROP POLICY IF EXISTS "Allow public read access on quiz_questions" ON quiz_questions;
DROP POLICY IF EXISTS "Allow public read access on routines" ON routines;
DROP POLICY IF EXISTS "Allow public read access on care_tips" ON care_tips;

CREATE POLICY "Allow public read access on products"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on product_categories"
  ON product_categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on posts"
  ON posts FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Allow public read access on curl_types"
  ON curl_types FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on glossary"
  ON glossary FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on quiz_questions"
  ON quiz_questions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on routines"
  ON routines FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on care_tips"
  ON care_tips FOR SELECT
  TO public
  USING (true);

-- Políticas para escrita com service role
DROP POLICY IF EXISTS "Allow service role all access on products" ON products;
DROP POLICY IF EXISTS "Allow service role all access on product_categories" ON product_categories;
DROP POLICY IF EXISTS "Allow service role all access on posts" ON posts;
DROP POLICY IF EXISTS "Allow service role all access on curl_types" ON curl_types;
DROP POLICY IF EXISTS "Allow service role all access on glossary" ON glossary;
DROP POLICY IF EXISTS "Allow service role all access on quiz_questions" ON quiz_questions;
DROP POLICY IF EXISTS "Allow service role all access on routines" ON routines;
DROP POLICY IF EXISTS "Allow service role all access on care_tips" ON care_tips;

CREATE POLICY "Allow service role all access on products"
  ON products FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role all access on product_categories"
  ON product_categories FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role all access on posts"
  ON posts FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role all access on curl_types"
  ON curl_types FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role all access on glossary"
  ON glossary FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role all access on quiz_questions"
  ON quiz_questions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role all access on routines"
  ON routines FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role all access on care_tips"
  ON care_tips FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
