'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CreditCard, Loader2 } from 'lucide-react';

export default function ICTBusinessUKPaymentsPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'ictbusinessuk';
  
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayments() {
      try {
        setLoading(true);
        const res = await fetch(`/api/ictbusinessuk?site=${site}&type=payments`);
        const result = await res.json();
        if (result.success) {
          setPayments(result.data || []);
        }
      } catch (err) {
        console.error('Error fetching payments:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, [site]);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <CreditCard className="w-7 h-7 text-violet-600" />
            Payments — ICT Business UK
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage and view all transaction payments.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-medium">
            No payments found in ictbusinessuk_payments.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Payment Method</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {payments.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-500">#{item.id || index + 1}</td>
                    <td className="px-6 py-4 text-gray-600">{item.order_id || 'N/A'}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{item.amount || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-600">{item.payment_method || item.gateway || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        (item.status || '').toLowerCase() === 'paid' || (item.status || '').toLowerCase() === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status || 'Completed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(item.created_at || Date.now()).toLocaleDateString()}
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