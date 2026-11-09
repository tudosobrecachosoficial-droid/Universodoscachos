import { getSupabaseClient } from '@/lib/supabase/client'
import type { Routine } from '@/lib/supabase/types'

export const routinesService = {
  async getAll() {
    const { data, error } = await getSupabaseClient()
      .from('routines')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw error
    return data as Routine[]
  },

  async getByCurlType(curlType: string) {
    const { data, error } = await getSupabaseClient()
      .from('routines')
      .select('*')
      .eq('curlType', curlType)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data as Routine[]
  }
}
