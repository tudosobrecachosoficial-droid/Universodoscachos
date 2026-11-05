import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Carregar variáveis de ambiente
config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variáveis de ambiente não encontradas!')
  console.error('Verifique se o arquivo .env existe e está configurado.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('🔍 Testando conexão com o Supabase...\n')

  try {
    // Teste 1: Verificar conexão básica
    console.log('1️⃣ Testando conexão básica...')
    const { data, error } = await supabase.from('product_categories').select('count', { count: 'exact', head: true })

    if (error) {
      console.error('❌ Erro na conexão:', error.message)
      return
    }

    console.log('✅ Conexão estabelecida com sucesso!\n')

    // Teste 2: Verificar tabelas principais
    const tables = [
      'product_categories',
      'products',
      'posts',
      'curl_types',
      'glossary',
      'quiz_questions',
      'routines',
      'care_tips'
    ]

    console.log('2️⃣ Verificando tabelas...\n')

    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.error(`❌ Tabela '${table}': ${error.message}`)
      } else {
        console.log(`✅ Tabela '${table}' - ${count} registros`)
      }
    }

    console.log('\n3️⃣ Testando leitura de dados...\n')

    // Teste 3: Ler dados de cada tabela
    const categoriesResult = await supabase.from('product_categories').select('*').limit(1)
    console.log(`📦 Categorias: ${categoriesResult.data?.length || 0} registros`)

    const productsResult = await supabase.from('products').select('*').limit(1)
    console.log(`📦 Produtos: ${productsResult.data?.length || 0} registros`)

    const postsResult = await supabase.from('posts').select('*').limit(1)
    console.log(`📦 Posts: ${postsResult.data?.length || 0} registros`)

    const curlTypesResult = await supabase.from('curl_types').select('*').limit(1)
    console.log(`📦 Tipos de cachos: ${curlTypesResult.data?.length || 0} registros`)

    const glossaryResult = await supabase.from('glossary').select('*').limit(1)
    console.log(`📦 Glossário: ${glossaryResult.data?.length || 0} registros`)

    const quizResult = await supabase.from('quiz_questions').select('*').limit(1)
    console.log(`📦 Quiz: ${quizResult.data?.length || 0} registros`)

    const routinesResult = await supabase.from('routines').select('*').limit(1)
    console.log(`📦 Rotinas: ${routinesResult.data?.length || 0} registros`)

    const careResult = await supabase.from('care_tips').select('*').limit(1)
    console.log(`📦 Cuidados: ${careResult.data?.length || 0} registros`)

    console.log('\n✅ Todos os testes concluídos com sucesso!')

  } catch (error) {
    console.error('❌ Erro inesperado:', error)
  }
}

testConnection()
