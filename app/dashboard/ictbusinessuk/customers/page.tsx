// app/dashboard/ictbusinessuk/customers/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Users, Loader2 } from 'lucide-react';

export default function ICTBusinessUKCustomersPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'ictbusinessuk';
  
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        setLoading(true);
        // Backend API ko site aur type ke sath request bhejna
        const res = await fetch(`/api/ictbusinessuk?site=${site}&type=customers`);
        const result = await res.json();
        if (result.success) {
          setCustomers(result.data || []);
        }
      } catch (err) {
        console.error('Error fetching customers:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, [site]);

  return (
    <div className="p-8 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <Users className="w-7 h-7 text-violet-600" />
            Customers — ICT Business UK
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage and view all registered customers.</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-medium">
            No customers found in ictbusinessuk_customers.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Customer Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {customers.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-500">#{item.id || index + 1}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {item.name || item.full_name || item['Full Name'] || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.email || item.Email || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-600">{item.phone || item.Phone || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(item.created_at || item.createdAt || Date.now()).toLocaleDateString()}
                    </td>
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