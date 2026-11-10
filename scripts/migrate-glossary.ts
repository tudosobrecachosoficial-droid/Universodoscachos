import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { GLOSSARY_TERMS } from "../src/mocks/glossary";

config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Defina VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env antes de migrar o glossário.",
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function migrateGlossary() {
  const rows = GLOSSARY_TERMS.map((term) => ({
    slug: term.slug,
    term: term.term,
    letter: term.letter,
    short: term.short,
    long: term.long,
    definition: term.long,
    codes: term.codes,
    postSlugs: term.postSlugs,
  }));

  const { error } = await supabase
    .from("glossary")
    .upsert(rows, { onConflict: "slug" });

  if (error) {
    throw new Error(`Falha ao migrar o glossário: ${error.message}`);
  }

  console.log(`Glossário sincronizado: ${rows.length} termos.`);
}

migrateGlossary().catch((error: unknown) => {
  console.error("Migração do glossário interrompida:", error);
  process.exitCode = 1;
});
