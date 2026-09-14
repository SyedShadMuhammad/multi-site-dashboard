import { createClient } from '@supabase/supabase-js';

// Yeh client dashboard ke liye hai jo RLS ko bypass karke sara live data securely layega
export function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_MAIN_URL!;
  // Yahan hum Service Role Key use kar rahe hain taake RLS policy block na kare
  const supabaseServiceKey = process.env.SUPABASE_MAIN_SERVICE_ROLE_KEY!;

  return createClient(supabaseUrl, supabaseServiceKey);
}

// Purana function agar kahin aur use ho raha hai
export function getSupabaseClientForSite(siteId: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_MAIN_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_MAIN_ANON_KEY!;
  return createClient(supabaseUrl, supabaseKey);
}