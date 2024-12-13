import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://lxvnltnmvcrxgvdokmya.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dm5sdG5tdmNyeGd2ZG9rbXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMjU4MjUsImV4cCI6MjA0OTYwMTgyNX0.PFhFVqrDUoOBHsYWaePlQLJJQUz5T36X6XQ6tDfsFII"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})