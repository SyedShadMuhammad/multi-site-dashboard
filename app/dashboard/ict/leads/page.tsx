'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabaseClientForSite } from '@/lib/supabase/multiClients';
import { Users } from 'lucide-react';

export default function ICTLeadsPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'ict';
  const supabase = getSupabaseClientForSite(site);

  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('ict_leads')
          .select('*')
          .order('id', { ascending: false })
          .limit(100);

        if (error) {
          console.error('Error fetching leads:', error.message);
        } else {
          setLeads(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, [supabase]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">ICT Leads — ICT Education</h1>
            <p className="text-sm text-slate-500">Manage and track student leads and inquiries</p>
          </div>
        </div>
        <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700">
          Total Records: {leads.length}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <th className="p-4">Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Email</th>
                <th className="p-4">Program</th>
                <th className="p-4">Reason</th>
                <th className="p-4">City</th>
                <th className="p-4">Education</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-900">{item.name || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.phone || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.email || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.program || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.reason || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.city || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.education || 'N/A'}</td>
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