import { createClient } from '@supabase/supabase-js'

// Ganti dengan project kamu
const supabaseUrl = 'https://xpxvbbwmsevhhytdpuua.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhweHZiYndtc2V2aGh5dGRwdXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NTQwNTAsImV4cCI6MjA2MTQzMDA1MH0.-M9pqDXrcxO-HizleTIzYGX5ne-9Uxo8MvWYEEQCuTo'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
