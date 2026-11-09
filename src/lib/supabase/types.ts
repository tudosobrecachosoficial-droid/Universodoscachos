export interface ProductCategory {
  id: string
  slug: string
  label: string
  intro?: string
  image?: string
  created_at: string
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  categorySlug: string
  categoryLabel: string
  curls: string[] | null
  need: string
  price: string | null
  promoPrice: string | null
  store: string
  affiliateUrl: string
  featured: boolean
  updatedAt: string
  summary: string
  image: string
  gallery: string[]
  sections: { heading: string; paragraphs: string[] }[]
  created_at: string
}

export interface Post {
  id: string
  slug: string
  title: string
  seoTitle: string
  seoDescription: string
  subtitle: string
  category: string
  categorySlug: string
  tags: string[] | null
  author: string
  date: string | null
  readingTime: number
  featured: boolean
  excerpt: string
  image: string
  sections: {
    heading: string
    paragraphs?: string[] | null
    list?: string[] | null
    quote?: string | null
  }[] | null
  productSlugs: string[] | null
  published: boolean
  created_at: string
}

export interface CurlType {
  id: string
  slug: string
  name: string
  code: string
  familySlug: string
  family: string
  tagline: string
  summary: string
  image: string
  imageAlt: string
  facts: { label: string; value: string }[]
  paragraphs: string[]
  characteristics: string[]
  needs: string[]
  finishing: { title: string; text: string }[]
  care: string[]
  productSlugs: string[]
  created_at: string
}

export interface GlossaryTerm {
  id: string
  slug: string
  term: string
  letter: string
  short: string
  long: string
  definition?: string
  category?: string
  codes?: string[] | null
  postSlugs?: string[] | null
  created_at: string
}

export interface QuizQuestion {
  id: string
  slug: string
  question: string
  helper: string
  weight: number
  options: { id: string; label: string; scores: Record<string, number> }[]
  correct?: number
  explanation?: string
  created_at: string
}

export interface Routine {
  id: string
  slug: string
  day?: string
  title?: string
  text?: string
  description?: string
  curlType?: string
  steps?: string[]
  image?: string
  created_at: string
}

export interface CareTip {
  id: string
  num?: string
  title?: string
  text?: string
  image?: string
  created_at: string
}
