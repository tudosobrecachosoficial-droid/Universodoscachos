import { getSupabaseClient } from '@/lib/supabase/client'
import type { Post, PostSummary } from '@/lib/supabase/types'

/* Listings never need the article body, which is the heaviest column. */
const SUMMARY_COLUMNS =
  'id,slug,title,seoTitle,seoDescription,subtitle,category,categorySlug,tags,author,date,readingTime,featured,excerpt,image,productSlugs,published,created_at'

export const postsService = {
  async getAll() {
    const { data, error } = await getSupabaseClient()
      .from('posts')
      .select(SUMMARY_COLUMNS)
      .eq('published', true)
      .order('date', { ascending: false })

    if (error) throw error
    return data as unknown as PostSummary[]
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
      .select(SUMMARY_COLUMNS)
      .eq('published', true)
      .order('date', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as unknown as PostSummary[]
  },

  /** Posts from the same category first, completed with the most recent others. */
  async getRelated(slug: string, categorySlug: string, limit: number = 3) {
    const client = getSupabaseClient()

    const same = await client
      .from('posts')
      .select(SUMMARY_COLUMNS)
      .eq('published', true)
      .eq('categorySlug', categorySlug)
      .neq('slug', slug)
      .order('date', { ascending: false })
      .limit(limit)
    if (same.error) throw same.error

    const rows = (same.data ?? []) as unknown as PostSummary[]
    if (rows.length >= limit) return rows

    const others = await client
      .from('posts')
      .select(SUMMARY_COLUMNS)
      .eq('published', true)
      .neq('categorySlug', categorySlug)
      .neq('slug', slug)
      .order('date', { ascending: false })
      .limit(limit - rows.length)
    if (others.error) throw others.error

    return [...rows, ...((others.data ?? []) as unknown as PostSummary[])]
  },

  /** Articles that mention a product. */
  async getByProductSlug(productSlug: string, limit: number = 3) {
    const { data, error } = await getSupabaseClient()
      .from('posts')
      .select(SUMMARY_COLUMNS)
      .eq('published', true)
      .contains('productSlugs', [productSlug])
      .order('date', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as unknown as PostSummary[]
  }
}
