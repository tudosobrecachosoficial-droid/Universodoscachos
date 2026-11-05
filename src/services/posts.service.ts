import { supabase } from '@/lib/supabase/client'
import type { Post } from '@/lib/supabase/types'

export const postsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (error) throw error
    return data as Post[]
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) throw error
    return data as Post[]
  },

  async getFeatured(limit: number = 3) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as Post[]
  }
}
