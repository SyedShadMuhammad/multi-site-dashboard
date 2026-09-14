// app/dashboard/ictbusinessuk/contact/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Loader2 } from 'lucide-react';

export default function ICTBusinessUKContactPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'ictbusinessuk';
  
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      try {
        setLoading(true);
        const res = await fetch(`/api/ictbusinessuk?site=${site}&type=contact`);
        const result = await res.json();
        if (result.success) {
          setContacts(result.data || []);
        }
      } catch (err) {
        console.error('Error fetching contacts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, [site]);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <Mail className="w-7 h-7 text-violet-600" />
            Contact Submissions — ICT Business UK
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage and view all contact form submissions.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-medium">
            No contacts found in ictbusinessuk_contact.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Course</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {contacts.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                      {item.id ? item.id.substring(0, 8) + '...' : `#${index + 1}`}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {item.full_name || item.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.email || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-600">{item.phone || 'N/A'}</td>
                    <td className="px-6 py-4 text-violet-600 font-semibold">{item.course || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}