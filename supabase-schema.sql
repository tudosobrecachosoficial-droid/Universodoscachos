-- Habilitar extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Categorias de Produtos
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(255) NOT NULL REFERENCES product_categories(slug),
  price DECIMAL(10, 2),
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Posts (Blog)
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author VARCHAR(255),
  image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Tipos de Cachos
CREATE TABLE IF NOT EXISTS curl_types (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  code VARCHAR(10) NOT NULL,
  description TEXT NOT NULL,
  characteristics TEXT[],
  tips TEXT[],
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Glossário
CREATE TABLE IF NOT EXISTS glossary (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  term VARCHAR(255) NOT NULL,
  definition TEXT NOT NULL,
  category VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Perguntas do Quiz
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Rotinas
CREATE TABLE IF NOT EXISTS routines (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  curl_type VARCHAR(255) NOT NULL,
  steps TEXT[] NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Dicas de Cuidados
CREATE TABLE IF NOT EXISTS care_tips (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(255),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_curl_types_slug ON curl_types(slug);
CREATE INDEX IF NOT EXISTS idx_glossary_category ON glossary(category);
CREATE INDEX IF NOT EXISTS idx_routines_curl_type ON routines(curl_type);
CREATE INDEX IF NOT EXISTS idx_care_tips_category ON care_tips(category);

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
  USING (true);

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

-- Inserir categorias de produtos iniciais
INSERT INTO product_categories (name, slug, description) VALUES
  ('Todos', 'todos', 'Todos os produtos'),
  ('Shampoos', 'shampoos', 'Shampoos para cabelos cacheados'),
  ('Condicionadores', 'condicionadores', 'Condicionadores para hidratação'),
  ('Máscaras', 'mascaras', 'Máscaras de tratamento'),
  ('Óleos', 'oleos', 'Óleos para finalização'),
  ('Leave-in', 'leave-in', 'Cremes de pentear')
ON CONFLICT (slug) DO NOTHING;
