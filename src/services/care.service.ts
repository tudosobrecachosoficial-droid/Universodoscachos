import { supabase } from '@/lib/supabase/client'
import type { CareTip } from '@/lib/supabase/types'

export const careService = {
  async getAll() {
    const { data, error } = await supabase
      .from('care_tips')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as CareTip[]
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('care_tips')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as CareTip[]
  }
}
