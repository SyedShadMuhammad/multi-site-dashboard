'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabaseClientForSite } from '@/lib/supabase/multiClients';
import { FileText } from 'lucide-react';

export default function HardCopyRequestsPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'ict';
  const supabase = getSupabaseClientForSite(site);

  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('hard_copy_requests')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching hard copy requests:', error.message);
        } else {
          setRequests(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [supabase]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Hard Copy Requests — ICT Education</h1>
            <p className="text-sm text-slate-500">Manage and track student certificate hard copy requests</p>
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
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Certificate Number</th>
                <th className="p-4">Delivery Address</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Loading requests...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No hard copy requests found.
                  </td>
                </tr>
              ) : (
                requests.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-900">{item.name || item.full_name || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.email || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.certificate_number || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.delivery_address || 'N/A'}</td>
                    <td className="p-4 text-slate-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {item.status || item.st || 'Pending'}
                      </span>
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