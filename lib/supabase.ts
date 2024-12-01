import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://lokupmkljkpvbupshzhl.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxva3VwbWtsamtwdmJ1cHNoemhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNTgzNjgsImV4cCI6MjA0ODYzNDM2OH0.4bNlMI74T-tZDIcS0DqK7x2finSiBM21YGnDW0c4Rd4"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})