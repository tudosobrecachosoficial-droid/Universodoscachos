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
  brand?: string
  categorySlug?: string
  categoryLabel?: string
  curls?: string[]
  need?: string
  price?: string
  promoPrice?: string
  store?: string
  affiliateUrl?: string
  featured: boolean
  updatedAt?: string
  summary?: string
  image?: string
  created_at: string
}

export interface Post {
  id: string
  slug: string
  title: string
  seoTitle?: string
  seoDescription?: string
  subtitle?: string
  category?: string
  categorySlug?: string
  tags?: string[]
  author?: string
  date?: string
  readingTime?: number
  featured: boolean
  excerpt?: string
  image?: string
  sections?: any
  published: boolean
  created_at: string
}

export interface CurlType {
  id: string
  slug: string
  name: string
  code?: string
  familySlug?: string
  familyLabel?: string
  description?: string
  characteristics?: string[]
  tips?: string[]
  hairPorosity?: string
  hairThickness?: string
  image?: string
  created_at: string
}

export interface GlossaryTerm {
  id: string
  term: string
  definition?: string
  category?: string
  created_at: string
}

export interface QuizQuestion {
  id: string
  question: string
  options?: any
  correct?: number
  explanation?: string
  created_at: string
}

export interface Routine {
  id: string
  day?: string
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
