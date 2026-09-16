// hooks/useSearchFilter.ts
import { useSearchParams } from 'next/navigation';

export function useSearchFilter<T>(data: T[]) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  if (!searchQuery) return data;
  if (!Array.isArray(data)) return [];

  return data.filter((item: any) => {
    if (!item) return false;
    // Poore object ki saari values mein khud check karega
    return Object.values(item).some((val) => {
      if (val === null || val === undefined) return false;
      return String(val).toLowerCase().includes(searchQuery);
    });
  });
}