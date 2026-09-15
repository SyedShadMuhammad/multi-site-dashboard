import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Caching clients to prevent "Multiple GoTrueClient instances detected" warning
const clientCache: Record<string, SupabaseClient> = {};

export function getSupabaseAdminClient(siteId: string = '') {
  const normalizedSite = siteId.toLowerCase().trim();
  const cacheKey = `admin_${normalizedSite}`;

  if (clientCache[cacheKey]) {
    return clientCache[cacheKey];
  }

  let url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  let serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (normalizedSite.includes('idt') || normalizedSite === 'idtpakistan') {
    url = process.env.NEXT_PUBLIC_IDT_SUPABASE_URL!;
    serviceKey = process.env.IDT_SUPABASE_SERVICE_ROLE_KEY!;
  }

  if (!url || !serviceKey) {
    throw new Error('Supabase URL or Service Role Key is missing in .env.local');
  }

  const client = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
  clientCache[cacheKey] = client;
  return client;
}

export function getSupabaseClientForSite(siteId: string = '') {
  const normalizedSite = siteId.toLowerCase().trim();
  const cacheKey = `anon_${normalizedSite}`;

  if (clientCache[cacheKey]) {
    return clientCache[cacheKey];
  }

  let url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // IDT ke liye explicit check (agar site mein 'idt' ya 'idtpakistan' ho)
  if (normalizedSite.includes('idt') || normalizedSite === 'idtpakistan') {
    url = process.env.NEXT_PUBLIC_IDT_SUPABASE_URL!;
    key = process.env.NEXT_PUBLIC_IDT_SUPABASE_ANON_KEY!;
  }

  if (!url || !key) {
    throw new Error('Supabase URL or Anon Key is missing in .env.local');
  }

  const client = createClient(url, key);
  clientCache[cacheKey] = client;
  return client;
}