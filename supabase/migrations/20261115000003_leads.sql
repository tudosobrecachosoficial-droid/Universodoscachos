-- Newsletter e formulário de contato passam a ser gravados aqui (antes iam para um endpoint externo).
-- O visitante só pode INSERIR; ninguém lê pelo navegador. Leia pelo painel do Supabase ou pelo admin autenticado.
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('newsletter', 'contact')),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  name TEXT CHECK (name IS NULL OR char_length(name) <= 120),
  curl_type TEXT CHECK (curl_type IS NULL OR char_length(curl_type) <= 40),
  message TEXT CHECK (message IS NULL OR char_length(message) <= 2000),
  consent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Um e-mail só entra uma vez na newsletter.
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_newsletter_email ON leads (lower(email)) WHERE kind = 'newsletter';
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Visitors can insert leads" ON leads;
CREATE POLICY "Visitors can insert leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (kind IN ('newsletter', 'contact'));
