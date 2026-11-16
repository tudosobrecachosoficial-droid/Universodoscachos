-- Índices para as consultas filtradas do site (artigos por produto, relacionados, ordenação por data).
CREATE INDEX IF NOT EXISTS idx_posts_product_slugs ON posts USING GIN ("productSlugs");
CREATE INDEX IF NOT EXISTS idx_posts_category_date ON posts ("categorySlug", date DESC);
CREATE INDEX IF NOT EXISTS idx_glossary_post_slugs ON glossary USING GIN ("postSlugs");
