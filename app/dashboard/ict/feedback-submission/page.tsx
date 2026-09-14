'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabaseClientForSite } from '@/lib/supabase/multiClients';
import { MessageSquare } from 'lucide-react';

export default function FeedbackPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'ict';
  const supabase = getSupabaseClientForSite(site);

  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeedback() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('feedback_submissions')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching feedback:', error.message);
        } else {
          setFeedback(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeedback();
  }, [supabase]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Feedback Submissions — ICT Education</h1>
            <p className="text-sm text-slate-500">View and manage student feedback submissions</p>
          </div>
        </div>
        <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700">
          Total Records: {feedback.length}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <th className="p-4">Name</th>
                <th className="p-4">Mobile Number</th>
                <th className="p-4">Email</th>
                <th className="p-4">Course Name</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Batch Number</th>
                <th className="p-4">Overall Rating</th>
                <th className="p-4">Trainer Performance</th>
                <th className="p-4">Course Content</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500">
                    Loading feedback...
                  </td>
                </tr>
              ) : feedback.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500">
                    No feedback found.
                  </td>
                </tr>
              ) : (
                feedback.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-900">{item._name || item.student_name || item.name || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.mobile_number || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.email || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.course_name || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.batch || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.batch_number || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.overall_rating || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.trainer_performance || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.course_content || 'N/A'}</td>
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