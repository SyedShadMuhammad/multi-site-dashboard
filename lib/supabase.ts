import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Server-side par secure operations ke liye Service Role Key behtar hoti hai, warna Anon key bhi use ho sakti hai
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase URL or Key is missing in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);