export interface Product {
  id: string
  name: string
  slug: string
  description: string
  category: string
  price: number
  image_url: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description?: string
  created_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  image_url: string
  published: boolean
  published_at: string
  created_at: string
  updated_at: string
}

export interface CurlType {
  id: string
  name: string
  slug: string
  code: string
  description: string
  characteristics: string[]
  tips: string[]
  image_url: string
  created_at: string
}

export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: string
  created_at: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct_answer: number
  explanation: string
  created_at: string
}

export interface Routine {
  id: string
  title: string
  description: string
  curl_type: string
  steps: string[]
  image_url: string
  created_at: string
}

export interface CareTip {
  id: string
  title: string
  description: string
  category: string
  image_url?: string
  created_at: string
}
