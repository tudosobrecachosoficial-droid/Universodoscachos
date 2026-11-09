import { getSupabaseClient } from '@/lib/supabase/client'
import type { Post } from '@/lib/supabase/types'

export const postsService = {
  async getAll() {
    const { data, error } = await getSupabaseClient()
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false })

    if (error) throw error
    return data as Post[]
  },

  async getBySlug(slug: string) {
    const { data, error } = await getSupabaseClient()
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()

    if (error) throw error
    return data as Post | null
  },

  async getFeatured(limit: number = 3) {
    const { data, error } = await getSupabaseClient()
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as Post[]
  }
}
