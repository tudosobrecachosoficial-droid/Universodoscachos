import { supabase } from '@/lib/supabase/client'
import type { CurlType } from '@/lib/supabase/types'

export const curlTypesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('curl_types')
      .select('*')
      .order('code')

    if (error) throw error
    return data as CurlType[]
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('curl_types')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data as CurlType
  }
}
