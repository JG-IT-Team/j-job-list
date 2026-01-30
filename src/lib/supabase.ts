import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Job {
  id: number
  job_group_id: string
  job_post_id: string
  job_location: string | null
  industry: string | null
  job_title: string | null
  email: string | null
  apply_link: string | null
  image_link: string | null
  status: string | null
  job_description: string | null
  job_source: string | null
}

export interface Event {
  id: number
  title: string | null
  event_date: string | null
  job_location: string | null
  industry: string | null
  description: string | null
  status: string | null
  job_source: string | null
}
