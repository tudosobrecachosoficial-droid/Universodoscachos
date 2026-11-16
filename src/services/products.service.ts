import { getSupabaseClient } from '@/lib/supabase/client'
import type { Product, ProductCategory, ProductSummary } from '@/lib/supabase/types'

/* Listings never need the long product body. */
const SUMMARY_COLUMNS =
  'id,slug,name,brand,categorySlug,categoryLabel,curls,need,price,promoPrice,store,affiliateUrl,featured,updatedAt,summary,image,gallery,created_at'

export const productsService = {
  async getAll() {
    const { data, error } = await getSupabaseClient()
      .from('products')
      .select(SUMMARY_COLUMNS)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as unknown as ProductSummary[]
  },

  /** Listing records for a known set of slugs. */
  async getBySlugs(slugs: string[]) {
    if (slugs.length === 0) return [] as ProductSummary[]
    const { data, error } = await getSupabaseClient()
      .from('products')
      .select(SUMMARY_COLUMNS)
      .in('slug', slugs)

    if (error) throw error
    return data as unknown as ProductSummary[]
  },

  async getBySlug(slug: string) {
    const { data, error } = await getSupabaseClient()
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) throw error
    return data as Product | null
  },

  async getByCategory(categorySlug: string) {
    const { data, error } = await getSupabaseClient()
      .from('products')
      .select(SUMMARY_COLUMNS)
      .eq('categorySlug', categorySlug)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as unknown as ProductSummary[]
  },

  async getFeatured() {
    const { data, error } = await getSupabaseClient()
      .from('products')
      .select(SUMMARY_COLUMNS)
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as unknown as ProductSummary[]
  },

  async getCategories() {
    const { data, error } = await getSupabaseClient()
      .from('product_categories')
      .select('*')
      .order('label')

    if (error) throw error
    return data as ProductCategory[]
  },

  async getCategoryBySlug(slug: string) {
    const { data, error } = await getSupabaseClient()
      .from('product_categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) throw error
    return data as ProductCategory | null
  }
}
