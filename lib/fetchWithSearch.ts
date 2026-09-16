// lib/fetchWithSearch.ts
import { SupabaseClient } from '@supabase/supabase-js';

interface FetchOptions {
  supabase: SupabaseClient;
  tableName: string;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
  searchColumns?: string[];
  defaultOrderColumn?: string;
  ascending?: boolean;
}

export async function fetchTableDataWithSearch({
  supabase,
  tableName,
  searchParams,
  searchColumns = ['full_name', 'email', 'phone', 'name', 'company'],
  defaultOrderColumn = 'created_at',
  ascending = false,
}: FetchOptions) {
  // Handle Next.js App Router searchParams (supports both Promise and plain object)
  const resolvedParams = searchParams instanceof Promise ? await searchParams : searchParams;
  const search = typeof resolvedParams?.search === 'string' ? resolvedParams.search : '';

  let query = supabase
    .from(tableName)
    .select('*', { count: 'exact' });

  if (defaultOrderColumn) {
    query = query.order(defaultOrderColumn, { ascending });
  }

  // Apply .ilike search filter across specified columns if search query exists
  if (search && searchColumns.length > 0) {
    const filterString = searchColumns
      .map((col) => `${col}.ilike.%${search}%`)
      .join(',');
    query = query.or(filterString);
  }

  const { data, count, error } = await query;

  return {
    data: data || [],
    count: count || 0,
    error,
    search,
  };
}