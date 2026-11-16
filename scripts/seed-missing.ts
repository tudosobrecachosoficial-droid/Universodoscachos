/* TEMPORÁRIO — alinha os dados das tabelas que ficaram vazias/duplicadas.
   Rode com: npx tsx scripts/seed-missing.ts
   Não toca em posts nem em glossary. */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { PRODUCT_CATEGORIES, PRODUCTS } from "../src/mocks/products";
import { CURL_TYPES } from "../src/mocks/curlTypes";
import { QUIZ_QUESTIONS } from "../src/mocks/quiz";
import { ROUTINE_WEEK } from "../src/mocks/routines";
import { CARE_PILLARS } from "../src/mocks/care";

config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  throw new Error("Faltam VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY no .env");
}

const supabase = createClient(url, key);

async function replaceAll(table: string, rows: Record<string, unknown>[]) {
  const del = await supabase.from(table).delete().not("id", "is", null);
  if (del.error) throw new Error(`delete ${table}: ${del.error.message}`);
  const ins = await supabase.from(table).insert(rows);
  if (ins.error) throw new Error(`insert ${table}: ${ins.error.message}`);
  console.log(`OK ${table}: ${rows.length}`);
}

async function main() {
  const pu = await supabase.from("products").upsert(
    PRODUCTS.map((p) => ({
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      categorySlug: p.categorySlug,
      categoryLabel: p.categoryLabel,
      curls: p.curls,
      need: p.need,
      price: p.price,
      promoPrice: p.promoPrice,
      store: p.store,
      affiliateUrl: p.affiliateUrl,
      featured: p.featured,
      updatedAt: p.updatedAt,
      summary: p.summary,
      image: p.image,
      gallery: p.gallery,
      sections: p.sections,
    })),
    { onConflict: "slug" },
  );
  if (pu.error) throw new Error(`products: ${pu.error.message}`);
  console.log(`OK products: ${PRODUCTS.length}`);

  const cu = await supabase.from("product_categories").upsert(
    PRODUCT_CATEGORIES.map((c) => ({
      slug: c.slug,
      label: c.label,
      intro: c.intro,
      image: c.image,
    })),
    { onConflict: "slug" },
  );
  if (cu.error) throw new Error(`product_categories: ${cu.error.message}`);
  console.log(`OK product_categories: ${PRODUCT_CATEGORIES.length}`);

  await replaceAll(
    "curl_types",
    CURL_TYPES.map((t) => ({
      slug: t.slug,
      code: t.code,
      name: t.name,
      familySlug: t.familySlug,
      familyLabel: t.family,
      tagline: t.tagline,
      summary: t.summary,
      description: t.summary,
      image: t.image,
      imageAlt: t.imageAlt,
      facts: t.facts,
      paragraphs: t.paragraphs,
      characteristics: t.characteristics,
      needs: t.needs,
      finishing: t.finishing,
      care: t.care,
      productSlugs: t.productSlugs,
    })),
  );

  await replaceAll(
    "quiz_questions",
    QUIZ_QUESTIONS.map((q) => ({
      slug: q.id,
      question: q.question,
      helper: q.helper,
      weight: q.weight,
      options: q.options,
      correct: null,
    })),
  );

  await replaceAll(
    "routines",
    ROUTINE_WEEK.map((r, index) => ({
      slug: `routine-${index + 1}`,
      day: r.day,
      title: r.title,
      text: r.text,
      description: r.text,
      steps: [],
    })),
  );

  await replaceAll(
    "care_tips",
    CARE_PILLARS.map((t) => ({
      slug: `care-${t.num}`,
      num: t.num,
      title: t.title,
      text: t.text,
      description: t.text,
    })),
  );
}

main().catch((error: unknown) => {
  console.error("FALHA:", error);
  process.exitCode = 1;
});
