'use client';
import { useEffect, useState } from 'react';

interface ContactMessage {
  id?: number;
  Name: string;
  Phone: string;
  Email: string;
  Message: string;
}

export default function IDTContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      try {
        const res = await fetch('/api/idt');
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || 'Data fetch karne mein masla aya hai.');
        }

        setMessages(json.data || []);
      } catch (err: any) {
        setError(err.message || 'Data fetch karne mein masla aya hai.');
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header with Total Records on Right */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 mt-0.5">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Contact Inquiries — IDT Pakistan</h1>
              <p className="text-xs text-slate-500 mt-0.5">Manage and track student contact messages</p>
            </div>
          </div>

          {!loading && !error && (
            <div className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200/80 shadow-sm self-start sm:self-auto">
              Total Records: <span className="font-bold text-slate-900">{messages.length}</span>
            </div>
          )}
        </div>

        {/* Table Card Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-500 text-sm font-medium">Loading inquiries...</div>
          ) : error ? (
            <div className="p-6 bg-red-50 text-red-600 text-sm">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Email</th>
                    <th className="py-4 px-6">Phone</th>
                    <th className="py-4 px-6">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-slate-400">
                        No contact messages found.
                      </td>
                    </tr>
                  ) : (
                    messages.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap">
                          {item.Name || 'N/A'}
                        </td>
                        <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                          {item.Email ? (
                            <a href={`mailto:${item.Email}`} className="hover:text-blue-600 transition-colors">
                              {item.Email}
                            </a>
                          ) : 'N/A'}
                        </td>
                        <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                          {item.Phone || 'N/A'}
                        </td>
                        <td className="py-4 px-6 text-slate-600 max-w-md leading-relaxed">
                          <p className="line-clamp-2 hover:line-clamp-none cursor-pointer">
                            {item.Message || 'No message provided'}
                          </p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}