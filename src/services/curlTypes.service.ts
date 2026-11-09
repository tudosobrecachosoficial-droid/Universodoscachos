import { getSupabaseClient } from '@/lib/supabase/client'
import type { CurlType } from '@/lib/supabase/types'

type CurlTypeRow = Omit<CurlType, 'family'> & { familyLabel?: string }

const normalize = (row: CurlTypeRow): CurlType => ({
  ...row,
  family: row.familyLabel ?? row.familySlug,
})

export const curlTypesService = {
  async getAll() {
    const { data, error } = await getSupabaseClient()
      .from('curl_types')
      .select('*')
      .order('code')

    if (error) throw error
    return (data as CurlTypeRow[]).map(normalize)
  },

  async getBySlug(slug: string) {
    const { data, error } = await getSupabaseClient()
      .from('curl_types')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) throw error
    return data ? normalize(data as CurlTypeRow) : null
  }
}
