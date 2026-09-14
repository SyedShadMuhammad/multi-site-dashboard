'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabaseClientForSite } from '@/lib/supabase/multiClients';
import { MessageSquare } from 'lucide-react';

export default function IBSContactPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'ictbusinessschool';
  const supabase = getSupabaseClientForSite(site);

  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .select('*')
          .order('name', { ascending: true });

        if (error) {
          console.error('Error fetching contact messages:', error.message);
        } else {
          setContacts(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, [supabase]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Contact Inquiries — ICT Business School</h1>
            <p className="text-sm text-slate-500">Manage and track student contact messages</p>
          </div>
        </div>
        <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700">
          Total Records: {contacts.length}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Subject</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    Loading contact inquiries...
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    No contact inquiries found.
                  </td>
                </tr>
              ) : (
                contacts.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-900">{item.name || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.email || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.phone || 'N/A'}</td>
                    <td className="p-4 text-slate-600">{item.subject || 'N/A'}</td>
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