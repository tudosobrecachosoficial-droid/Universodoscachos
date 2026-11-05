import { supabase } from '@/lib/supabase/client'
import type { Routine } from '@/lib/supabase/types'

export const routinesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('routines')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Routine[]
  },

  async getByCurlType(curlType: string) {
    const { data, error } = await supabase
      .from('routines')
      .select('*')
      .eq('curl_type', curlType)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Routine[]
  }
}
