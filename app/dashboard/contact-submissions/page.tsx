'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ContactSubmissionsPage() {
  const searchParams = useSearchParams();
  const currentSite = searchParams.get('site') || 'ict';
  
  // Header search bar se search query read karna
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';
  
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    async function fetchContacts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/contact-submissions?site=${currentSite}`);
        
        // Check karein ke response JSON hai ya HTML error
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API route not found or returned non-JSON response (404/500).");
        }

        const result = await res.json();
        
        if (result.success) {
          setContacts(result.data || []);
        } else {
          console.error('API Error:', result.error);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
      setLoading(false);
    }

    fetchContacts();
  }, [currentSite]);
  // Search Filtering Logic
  const filteredContacts = contacts.filter((item) => {
    if (!searchTerm) return true;
    
    const name = (item.name || item.full_name || item['Full Name'] || '').toLowerCase();
    const email = (item.email || item['Email'] || '').toLowerCase();
    const phone = (item.phone || item['Phone'] || '').toLowerCase();
    const message = (item.message || item.subject || '').toLowerCase();

    return (
      name.includes(searchTerm) ||
      email.includes(searchTerm) ||
      phone.includes(searchTerm) ||
      message.includes(searchTerm)
    );
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contact Submissions — {currentSite.toUpperCase()}</h1>
        <div className="flex items-center gap-3">
          {searchTerm && (
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Filtering for: &quot;{searchTerm}&quot;
            </span>
          )}
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
            Total Records: {filteredContacts.length} {filteredContacts.length !== contacts.length && `(of ${contacts.length})`}
          </span>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-500">
          Loading contact submissions...
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800">
          <p className="font-bold">No records found!</p>
          <p className="text-sm mt-1">
            {searchTerm 
              ? `Aapke search query "${searchTerm}" se koi contact match nahi hua.` 
              : `Is site ke liye koi contact submissions mojood nahi hain.`}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-600 font-semibold">
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Message / Subject</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {filteredContacts.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 text-gray-500 font-medium">#{item.id || idx + 1}</td>
                    <td className="p-4 font-semibold text-gray-900">{item.name || item.full_name || item['Full Name'] || 'N/A'}</td>
                    <td className="p-4 text-gray-600">{item.email || item['Email'] || 'N/A'}</td>
                    <td className="p-4 text-gray-600">{item.phone || item['Phone'] || 'N/A'}</td>
                    <td className="p-4 text-gray-600 max-w-xs truncate">{item.message || item.subject || 'N/A'}</td>
                    <td className="p-4 text-xs text-gray-400">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}