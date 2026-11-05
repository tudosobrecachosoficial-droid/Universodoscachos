import { supabase } from '@/lib/supabase/client'
import type { Product, ProductCategory } from '@/lib/supabase/types'

export const productsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Product[]
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data as Product
  },

  async getByCategory(categorySlug: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', categorySlug)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Product[]
  },

  async getFeatured() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Product[]
  },

  async getCategories() {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .order('name')

    if (error) throw error
    return data as ProductCategory[]
  }
}
