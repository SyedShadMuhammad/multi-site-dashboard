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
    <div className="min-h-screen bg-[#E0E0E0] p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">IDT Pakistan - Contact Messages</h1>
        <p className="text-sm text-[#666666] mb-6">Supabase table: contact_messages_IDT (via API Route)</p>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-sm text-[#555]">Loading messages...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-600 p-4 rounded-xl text-sm">
            {error}
          </div>
        ) : (
          <div className="bg-[#E0E0E0] rounded-2xl shadow-[-8px_-8px_20px_#FFFFFF,8px_8px_20px_#BEBEBE] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#CCCCCC] text-[#333333] text-xs uppercase tracking-wider">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Phone</th>
                    <th className="py-4 px-6">Email</th>
                    <th className="py-4 px-6">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D1D1D1] text-sm text-[#444444]">
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-[#777777]">
                        Koi message nahi mila.
                      </td>
                    </tr>
                  ) : (
                    messages.map((item, index) => (
                      <tr key={index} className="hover:bg-[#D8D8D8]/50 transition-colors">
                        <td className="py-4 px-6 font-semibold text-[#222222]">{item.Name}</td>
                        <td className="py-4 px-6">{item.Phone}</td>
                        <td className="py-4 px-6 text-[#D05060]">{item.Email}</td>
                        <td className="py-4 px-6 max-w-xs">{item.Message}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}