'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabaseClientForSite } from '@/lib/supabase/multiClients';
import { ShieldCheck } from 'lucide-react';

export default function MofaRequestsPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'ict';
  const supabase = getSupabaseClientForSite(site);

  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMofaRequests() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('mofa_requests')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching MOFA requests:', error.message);
        } else {
          setRequests(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMofaRequests();
  }, [supabase]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">MOFA Requests — ICT Education</h1>
            <p className="text-sm text-slate-500">Manage and track student MOFA attestation requests</p>
          </div>
        </div>
        <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700">
          Total Records: {requests.length}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <th className="p-4">ID</th>
                <th className="p-4">Full Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Loading MOFA requests...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No MOFA requests found.
                  </td>
                </tr>
              ) : (
                requests.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-900">{item.id || 'N/A'}</td>
                    <td className="p-4 font-medium text-slate-900">{item.full_name || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.email || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.phone || 'N/A'}</td>
                    <td className="p-4 text-slate-600">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}