'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabaseClientForSite } from '@/lib/supabase/multiClients';
import { Award } from 'lucide-react';
import { useSearchFilter } from '@/hooks/useSearchFilter';

export default function CertificatePage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'ict';
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const supabase = getSupabaseClientForSite(site);

  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const pageSize = 50;

 useEffect(() => {
    async function fetchCertificates() {
      setLoading(true);
      try {
        let query = supabase
          .from('Certificate')
          .select('*');

        // Agar search query maujood hai
        if (searchQuery) {
          // Hum sirf aik generic field ya table ki primary columns par search lagate hain 
          // taake invalid column error na aaye (misal ke tor par 'name' ya 'registration')
          query = query.or(
            `Name.ilike.%${searchQuery}%,Registration.ilike.%${searchQuery}%`
          );
        } else {
          query = query.range(page * pageSize, (page + 1) * pageSize - 1);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching certificates:', error.message);
        } else {
          setCertificates(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCertificates();
  }, [supabase, searchQuery, page]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-green-100 text-green-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Certificates</h1>
            <p className="text-sm text-slate-500">View and manage issued student certificates</p>
          </div>
        </div>
        <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700">
          Records: {certificates.length}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <th className="p-4">Name</th>
                <th className="p-4">Course</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Registration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    Loading certificates...
                  </td>
                </tr>
              ) : certificates.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    {searchQuery ? `No certificates found matching "${searchQuery}".` : 'No certificates found.'}
                  </td>
                </tr>
              ) : (
                certificates.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-900">{item.name || item['Name'] || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.course || item['Course'] || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.batch || item['Batch'] || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.registration || item['Registration'] || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {!searchQuery && (
          <div className="flex justify-between items-center p-4 border-t border-slate-200 bg-slate-50">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="px-4 py-2 text-sm font-medium bg-white border border-slate-300 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-slate-600">Page {page + 1}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={certificates.length < pageSize}
              className="px-4 py-2 text-sm font-medium bg-white border border-slate-300 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}