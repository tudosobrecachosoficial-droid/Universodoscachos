import { supabase } from '../src/lib/supabase/client'
import { PRODUCT_CATEGORIES } from '../src/mocks/products'
import { CURL_TYPES } from '../src/mocks/curlTypes'
import { POSTS } from '../src/mocks/posts'
import { GLOSSARY } from '../src/mocks/glossary'
import { QUIZ } from '../src/mocks/quiz'
import { ROUTINES } from '../src/mocks/routines'
import { CARE } from '../src/mocks/care'

// Função para migrar categorias de produtos
async function migrateProductCategories() {
  console.log('Migrando categorias de produtos...')
  for (const category of PRODUCT_CATEGORIES) {
    const { error } = await supabase
      .from('product_categories')
      .upsert({
        name: category.name,
        slug: category.slug,
        description: category.description
      }, { onConflict: 'slug' })
    
    if (error) console.error('Erro ao migrar categoria:', error)
  }
  console.log('Categorias de produtos migradas!')
}

// Função para migrar produtos
async function migrateProducts() {
  console.log('Migrando produtos...')
  const { data: products } = await supabase.from('products').select('*')
  
  for (const product of products) {
    const { error } = await supabase
      .from('products')
      .upsert({
        name: product.name,
        slug: product.slug,
        description: product.description,
        category: product.category,
        price: product.price,
        image_url: product.image,
        featured: product.featured
      }, { onConflict: 'slug' })
    
    if (error) console.error('Erro ao migrar produto:', error)
  }
  console.log('Produtos migrados!')
}

// Função para migrar tipos de cachos
async function migrateCurlTypes() {
  console.log('Migrando tipos de cachos...')
  for (const curlType of CURL_TYPES) {
    const { error } = await supabase
      .from('curl_types')
      .upsert({
        name: curlType.name,
        slug: curlType.slug,
        code: curlType.code,
        description: curlType.description,
        characteristics: curlType.characteristics,
        tips: curlType.tips,
        image_url: curlType.image
      }, { onConflict: 'slug' })
    
    if (error) console.error('Erro ao migrar tipo de cacho:', error)
  }
  console.log('Tipos de cachos migrados!')
}

// Função para migrar posts
async function migratePosts() {
  console.log('Migrando posts...')
  for (const post of POSTS) {
    const { error } = await supabase
      .from('posts')
      .upsert({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        image_url: post.image,
        published: true,
        published_at: post.date
      }, { onConflict: 'slug' })
    
    if (error) console.error('Erro ao migrar post:', error)
  }
  console.log('Posts migrados!')
}

// Função para migrar glossário
async function migrateGlossary() {
  console.log('Migrando glossário...')
  for (const term of GLOSSARY) {
    const { error } = await supabase
      .from('glossary')
      .upsert({
        term: term.term,
        definition: term.definition,
        category: term.category
      })
    
    if (error) console.error('Erro ao migrar termo:', error)
  }
  console.log('Glossário migrado!')
}

// Função para migrar quiz
async function migrateQuiz() {
  console.log('Migrando quiz...')
  for (const question of QUIZ.questions) {
    const { error } = await supabase
      .from('quiz_questions')
      .upsert({
        question: question.question,
        options: question.options,
        correct_answer: question.correct,
        explanation: question.explanation
      })
    
    if (error) console.error('Erro ao migrar pergunta:', error)
  }
  console.log('Quiz migrado!')
}

// Função para migrar rotinas
async function migrateRoutines() {
  console.log('Migrando rotinas...')
  for (const routine of ROUTINES) {
    const { error } = await supabase
      .from('routines')
      .upsert({
        title: routine.title,
        description: routine.description,
        curl_type: routine.curlType,
        steps: routine.steps,
        image_url: routine.image
      })
    
    if (error) console.error('Erro ao migrar rotina:', error)
  }
  console.log('Rotinas migradas!')
}

// Função para migrar cuidados
async function migrateCare() {
  console.log('Migrando cuidados...')
  for (const tip of CARE) {
    const { error } = await supabase
      .from('care_tips')
      .upsert({
        title: tip.title,
        description: tip.description,
        category: tip.category,
        image_url: tip.image
      })
    
    if (error) console.error('Erro ao migrar dica:', error)
  }
  console.log('Cuidados migrados!')
}

// Executar todas as migrações
async function migrateAll() {
  try {
    await migrateProductCategories()
    await migrateProducts()
    await migrateCurlTypes()
    await migratePosts()
    await migrateGlossary()
    await migrateQuiz()
    await migrateRoutines()
    await migrateCare()
    console.log('Todas as migrações concluídas com sucesso!')
  } catch (error) {
    console.error('Erro durante migração:', error)
  }
}

migrateAll()
