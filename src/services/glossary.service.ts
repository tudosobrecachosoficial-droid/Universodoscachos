import { getSupabaseClient } from '@/lib/supabase/client'
import type { GlossaryTerm } from '@/lib/supabase/types'

export const glossaryService = {
  async getAll() {
    const { data, error } = await getSupabaseClient()
      .from('glossary')
      .select('*')
      .order('term')

    if (error) throw error
    return data as GlossaryTerm[]
  },

  async getByCategory(category: string) {
    const { data, error } = await getSupabaseClient()
      .from('glossary')
      .select('*')
      .eq('category', category)
      .order('term')

    if (error) throw error
    return data as GlossaryTerm[]
  }
}
