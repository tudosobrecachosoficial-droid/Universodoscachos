import { getSupabaseClient } from '@/lib/supabase/client'

type ContactInput = {
  name: string
  email: string
  curlType?: string
  message: string
}

/* Visitors may only insert leads (RLS has no read policy for them), so the
   insert is sent without asking for the row back. */
export const leadsService = {
  async subscribe(email: string) {
    const { error } = await getSupabaseClient()
      .from('leads')
      .insert({ kind: 'newsletter', email: email.trim().toLowerCase() })

    // 23505: this e-mail is already subscribed, which is the outcome the visitor wants.
    if (error && error.code !== '23505') throw error
  },

  async sendContact({ name, email, curlType, message }: ContactInput) {
    const { error } = await getSupabaseClient()
      .from('leads')
      .insert({
        kind: 'contact',
        name: name.trim(),
        email: email.trim().toLowerCase(),
        curl_type: curlType || null,
        message: message.trim(),
      })

    if (error) throw error
  },
}
