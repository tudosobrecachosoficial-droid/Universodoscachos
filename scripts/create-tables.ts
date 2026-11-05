import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

// Carregar variáveis de ambiente
config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Variáveis de ambiente não encontradas!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function createTables() {
  console.log('🚀 Criando tabelas no Supabase...\n')

  // Ler o arquivo SQL
  const sqlPath = join(__dirname, '../supabase-schema-fixed.sql')
  const sql = readFileSync(sqlPath, 'utf-8')

  // Executar o SQL
  const { data, error } = await supabase.rpc('exec_sql', { sql })

  if (error) {
    console.error('❌ Erro ao executar SQL:', error)
    console.log('\n💡 Tente executar o SQL manualmente no SQL Editor do Supabase')
    console.log('📄 Arquivo: supabase-schema-fixed.sql')
    return
  }

  console.log('✅ Tabelas criadas com sucesso!')
}

createTables()
