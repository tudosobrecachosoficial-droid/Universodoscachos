import { getSupabaseClient } from '@/lib/supabase/client'
import type { CareTip } from '@/lib/supabase/types'

export const careService = {
  async getAll() {
    const { data, error } = await getSupabaseClient()
      .from('care_tips')
      .select('*')
      .order('num', { ascending: true })

    if (error) throw error
    return data as CareTip[]
  },

  async getByCategory(category: string) {
    const { data, error } = await getSupabaseClient()
      .from('care_tips')
      .select('*')
      .eq('category', category)
      .order('num', { ascending: true })

    if (error) throw error
    return data as CareTip[]
  }
}
