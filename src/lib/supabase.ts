import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://youvaikyfdraoadgiwir.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXZhaWt5ZmRyYW9hZGdpd2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3NDAyMDEsImV4cCI6MjEwNDMxNjIwMX0.NRA_fmPD6RetG6KPJw_yokPKTkLvOeXTOIVWRRPdaD0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
