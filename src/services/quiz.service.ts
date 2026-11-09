import { getSupabaseClient } from '@/lib/supabase/client'
import type { QuizQuestion } from '@/lib/supabase/types'

export const quizService = {
  async getAll() {
    const { data, error } = await getSupabaseClient()
      .from('quiz_questions')
      .select('*')
      .order('created_at')

    if (error) throw error
    return data as QuizQuestion[]
  }
}
