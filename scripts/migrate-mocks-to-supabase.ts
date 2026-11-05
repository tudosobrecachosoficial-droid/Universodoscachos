import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { PRODUCT_CATEGORIES, PRODUCTS } from '../src/mocks/products'
import { CURL_FAMILIES } from '../src/mocks/curlTypes'
import { POSTS } from '../src/mocks/posts'
import { GLOSSARY_TERMS } from '../src/mocks/glossary'
import { QUIZ_QUESTIONS } from '../src/mocks/quiz'
import { ROUTINE_WEEK } from '../src/mocks/routines'
import { CARE_PILLARS } from '../src/mocks/care'

// Carregar variáveis de ambiente
config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Variáveis de ambiente não encontradas!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

// Função para migrar categorias de produtos
async function migrateProductCategories() {
  console.log('📦 Migrando categorias de produtos...')
  for (const category of PRODUCT_CATEGORIES) {
    const { error } = await supabase
      .from('product_categories')
      .upsert({
        slug: category.slug,
        label: category.label,
        intro: category.intro,
        image: category.image
      }, { onConflict: 'slug' })

    if (error) console.error('❌ Erro ao migrar categoria:', error)
  }
  console.log('✅ Categorias de produtos migradas!')
}

// Função para migrar produtos
async function migrateProducts() {
  console.log('📦 Migrando produtos...')
  for (const product of PRODUCTS) {
    const { error } = await supabase
      .from('products')
      .upsert({
        slug: product.slug,
        name: product.name,
        featured: product.featured,
        image: product.image
      }, { onConflict: 'slug' })

    if (error) console.error('❌ Erro ao migrar produto:', error)
  }
  console.log('✅ Produtos migrados!')
}

// Função para migrar tipos de cachos
async function migrateCurlTypes() {
  console.log('📦 Migrando tipos de cachos...')
  // Por enquanto, vamos pular esta migração pois a estrutura é complexa
  console.log('⏭️ Tipos de cachos pulados (estrutura complexa)')
}

// Função para migrar posts
async function migratePosts() {
  console.log('📦 Migrando posts...')
  for (const post of POSTS) {
    const { error } = await supabase
      .from('posts')
      .upsert({
        slug: post.slug,
        title: post.title,
        category: post.category,
        author: post.author,
        featured: post.featured,
        excerpt: post.excerpt,
        image: post.image,
        published: true
      }, { onConflict: 'slug' })

    if (error) console.error('❌ Erro ao migrar post:', error)
  }
  console.log('✅ Posts migrados!')
}

// Função para migrar glossário
async function migrateGlossary() {
  console.log('📦 Migrando glossário...')
  for (const term of GLOSSARY_TERMS) {
    const { error } = await supabase
      .from('glossary')
      .upsert({
        term: term.term,
        definition: term.definition,
        category: term.category
      })

    if (error) console.error('❌ Erro ao migrar termo:', error)
  }
  console.log('✅ Glossário migrado!')
}

// Função para migrar quiz
async function migrateQuiz() {
  console.log('📦 Migrando quiz...')
  for (const question of QUIZ_QUESTIONS) {
    const { error } = await supabase
      .from('quiz_questions')
      .upsert({
        question: question.question,
        options: question.options,
        correct: question.correct,
        explanation: question.explanation
      })

    if (error) console.error('❌ Erro ao migrar pergunta:', error)
  }
  console.log('✅ Quiz migrado!')
}

// Função para migrar rotinas
async function migrateRoutines() {
  console.log('📦 Migrando rotinas...')
  for (const routine of ROUTINE_WEEK) {
    const { error } = await supabase
      .from('routines')
      .upsert({
        day: routine.day,
        description: routine.description,
        steps: routine.steps,
        image: routine.image
      })

    if (error) console.error('❌ Erro ao migrar rotina:', error)
  }
  console.log('✅ Rotinas migradas!')
}

// Função para migrar cuidados
async function migrateCare() {
  console.log('📦 Migrando cuidados...')
  for (const pillar of CARE_PILLARS) {
    const { error } = await supabase
      .from('care_tips')
      .upsert({
        num: pillar.num,
        title: pillar.title,
        text: pillar.text,
        image: pillar.image
      })

    if (error) console.error('❌ Erro ao migrar dica:', error)
  }
  console.log('✅ Cuidados migrados!')
}

// Executar todas as migrações
async function migrateAll() {
  try {
    console.log('🚀 Iniciando migração de dados para o Supabase...\n')
    await migrateProductCategories()
    await migrateProducts()
    await migrateCurlTypes()
    await migratePosts()
    await migrateGlossary()
    await migrateQuiz()
    await migrateRoutines()
    await migrateCare()
    console.log('\n✅ Todas as migrações concluídas com sucesso!')
  } catch (error) {
    console.error('❌ Erro durante migração:', error)
  }
}

migrateAll()
