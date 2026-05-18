import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
console.log('KEY prefix:', process.env.SUPABASE_SERVICE_KEY?.slice(0, 20) + '...')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const { data, error } = await supabase.from('bookings').select('*').limit(1)

if (error) {
  console.error('❌ Supabase error:', error.message, error.code)
} else {
  console.log('✅ Supabase OK. Bookings:', data)
}
