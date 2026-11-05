import { supabase } from '@/lib/supabase/client'
import type { QuizQuestion } from '@/lib/supabase/types'

export const quizService = {
  async getAll() {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .order('created_at')

    if (error) throw error
    return data as QuizQuestion[]
  }
}
