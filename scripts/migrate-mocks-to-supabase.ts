import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { PRODUCT_CATEGORIES, PRODUCTS } from "../src/mocks/products";
import { CURL_TYPES } from "../src/mocks/curlTypes";
import { POSTS } from "../src/mocks/posts";
import { GLOSSARY_TERMS } from "../src/mocks/glossary";
import { QUIZ_QUESTIONS } from "../src/mocks/quiz";
import { ROUTINE_WEEK } from "../src/mocks/routines";
import { CARE_PILLARS } from "../src/mocks/care";

config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Defina VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env antes de executar a migração.",
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const overwriteExisting = process.env.SUPABASE_MIGRATION_OVERWRITE === "true";

async function upsertRows(
  table: string,
  rows: Record<string, unknown>[],
  conflictColumn: string,
) {
  const { error } = await supabase
    .from(table)
    .upsert(rows, { onConflict: conflictColumn, ignoreDuplicates: !overwriteExisting });
  if (error) throw new Error(`Falha ao migrar ${table}: ${error.message}`);
  console.log(`✅ ${table}: ${rows.length} registros sincronizados`);
}

if (overwriteExisting) {
  console.warn("⚠️ SUPABASE_MIGRATION_OVERWRITE=true: existing rows with matching slugs will be replaced by mock content.");
}

async function migrateAll() {
  await upsertRows(
    "product_categories",
    PRODUCT_CATEGORIES.map((category) => ({
      slug: category.slug,
      label: category.label,
      intro: category.intro,
      image: category.image,
    })),
    "slug",
  );

  await upsertRows(
    "products",
    PRODUCTS.map((product) => ({
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      categorySlug: product.categorySlug,
      categoryLabel: product.categoryLabel,
      curls: product.curls,
      need: product.need,
      price: product.price,
      promoPrice: product.promoPrice,
      store: product.store,
      affiliateUrl: product.affiliateUrl,
      featured: product.featured,
      updatedAt: product.updatedAt,
      summary: product.summary,
      image: product.image,
      gallery: product.gallery,
      sections: product.sections,
    })),
    "slug",
  );

  await upsertRows(
    "curl_types",
    CURL_TYPES.map((type) => ({
      slug: type.slug,
      code: type.code,
      name: type.name,
      familySlug: type.familySlug,
      familyLabel: type.family,
      tagline: type.tagline,
      summary: type.summary,
      description: type.summary,
      image: type.image,
      imageAlt: type.imageAlt,
      facts: type.facts,
      paragraphs: type.paragraphs,
      characteristics: type.characteristics,
      needs: type.needs,
      finishing: type.finishing,
      care: type.care,
      productSlugs: type.productSlugs,
    })),
    "slug",
  );

  await upsertRows(
    "posts",
    POSTS.map((post) => ({
      slug: post.slug,
      title: post.title,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      subtitle: post.subtitle,
      category: post.category,
      categorySlug: post.categorySlug,
      tags: post.tags,
      author: post.author,
      date: post.date,
      readingTime: post.readingTime,
      featured: post.featured,
      excerpt: post.excerpt,
      image: post.image,
      sections: post.sections,
      productSlugs: post.productSlugs,
      published: true,
    })),
    "slug",
  );

  await upsertRows(
    "glossary",
    GLOSSARY_TERMS.map((term) => ({
      slug: term.slug,
      term: term.term,
      letter: term.letter,
      short: term.short,
      long: term.long,
      definition: term.long,
      codes: term.codes,
      postSlugs: term.postSlugs,
    })),
    "slug",
  );

  await upsertRows(
    "quiz_questions",
    QUIZ_QUESTIONS.map((question) => ({
      slug: question.id,
      question: question.question,
      helper: question.helper,
      weight: question.weight,
      options: question.options,
      correct: null,
    })),
    "slug",
  );

  await upsertRows(
    "routines",
    ROUTINE_WEEK.map((routine, index) => ({
      slug: `routine-${index + 1}`,
      day: routine.day,
      title: routine.title,
      text: routine.text,
      description: routine.text,
      steps: [],
    })),
    "slug",
  );

  await upsertRows(
    "care_tips",
    CARE_PILLARS.map((tip) => ({
      slug: `care-${tip.num}`,
      num: tip.num,
      title: tip.title,
      text: tip.text,
      description: tip.text,
    })),
    "slug",
  );
}

migrateAll().catch((error: unknown) => {
  console.error("❌ Migração interrompida:", error);
  process.exitCode = 1;
});
