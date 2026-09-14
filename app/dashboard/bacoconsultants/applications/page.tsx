'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabaseClientForSite } from '@/lib/supabase/multiClients';
import { Briefcase } from 'lucide-react';

export default function BacoApplicationsPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'bacoconsultants';
  const supabase = getSupabaseClientForSite(site);

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('baco_applications')
          .select('*')
        //   .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching BACO applications:', error.message);
        } else {
          setApplications(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, [supabase]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">BACO Applications</h1>
            <p className="text-sm text-slate-500">Manage and track BACO job/general applications</p>
          </div>
        </div>
        <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700">
          Total Records: {applications.length}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <th className="p-4">Full Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    Loading applications...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-900">{item['Full Name'] || item.full_name || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item['Email'] || item.email || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item['Phone'] || item.phone || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item['Position'] || item.position || 'N/A'}</td>
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