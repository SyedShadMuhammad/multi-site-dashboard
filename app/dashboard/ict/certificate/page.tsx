'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabaseClientForSite } from '@/lib/supabase/multiClients';
import { Award } from 'lucide-react';

export default function CertificatePage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'ict';
  const supabase = getSupabaseClientForSite(site);

  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const pageSize = 50; // Aik page par kitne records dikhane hain

  useEffect(() => {
    async function fetchCertificates() {
      setLoading(true);
      const from = page * pageSize;
      const to = from + pageSize - 1;

      try {
        const { data, error } = await supabase
          .from('Certificate')
          .select('*', { count: 'exact' })
          .range(from, to);

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
  }, [supabase, page]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Certificates — ICT Education</h1>
            <p className="text-sm text-slate-500">View and manage issued student certificates (7,411 Total)</p>
          </div>
        </div>
        <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700">
          Showing Page {page + 1}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
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
                  No certificates found.
                </td>
              </tr>
            ) : (
              certificates.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">{item.Name || item.name || 'N/A'}</td>
                  <td className="p-4 text-slate-600">{item.Course || item.course || 'N/A'}</td>
                  <td className="p-4 text-slate-600">{item.Batch || item.batch || 'N/A'}</td>
                  <td className="p-4 text-slate-600">{item.Registration || item.registration || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-slate-600">Page {page + 1}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={certificates.length < pageSize}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}