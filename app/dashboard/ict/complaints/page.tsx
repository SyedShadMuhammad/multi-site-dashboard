'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabaseClientForSite } from '@/lib/supabase/multiClients';
import { AlertCircle } from 'lucide-react';

export default function ComplaintsPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'ict';
  const supabase = getSupabaseClientForSite(site);

  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComplaints() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('complaints')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching complaints:', error.message);
        } else {
          setComplaints(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchComplaints();
  }, [supabase]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Complaints & Issues — ICT Education</h1>
            <p className="text-sm text-slate-500">Manage and resolve user complaints submitted to ICT</p>
          </div>
        </div>
        <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700">
          Total Records: {complaints.length}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
              <th className="p-4">Student / User</th>
              <th className="p-4">Mobile Number</th>
              <th className="p-4">Email</th>
              <th className="p-4">Course Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  Loading complaints...
                </td>
              </tr>
            ) : complaints.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  No complaints found.
                </td>
              </tr>
            ) : (
              complaints.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">{item.student_name || 'N/A'}</td>
                  <td className="p-4 text-slate-600">{item.mobile_number || 'N/A'}</td>
                  <td className="p-4 text-slate-600">{item.email || 'N/A'}</td>
                  <td className="p-4 text-slate-600">{item.course_name || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}