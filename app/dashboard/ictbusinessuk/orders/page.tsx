// app/dashboard/ictbusinessuk/orders/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShoppingCart, Loader2 } from 'lucide-react';

export default function ICTBusinessUKOrdersPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'ictbusinessuk';
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await fetch(`/api/ictbusinessuk?site=${site}&type=orders`);
        const result = await res.json();
        if (result.success) {
          setOrders(result.data || []);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [site]);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <ShoppingCart className="w-7 h-7 text-violet-600" />
            Orders — ICT Business UK
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage and view all placed orders.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-medium">
            No orders found in ictbusinessuk_orders.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Order Number</th>
                  <th className="px-6 py-4">Customer ID</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Payment Plan ID</th>
                  <th className="px-6 py-4">Currency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {orders.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-500">#{item.id || index + 1}</td>
                    <td className="px-6 py-4 font-bold text-violet-600 font-mono text-xs">
                      {item.order_number || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.customer_id || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        (item.status || '').toLowerCase() === 'completed' || (item.status || '').toLowerCase() === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{item.payment_plan_id || 'None'}</td>
                    <td className="px-6 py-4 font-semibold text-gray-700">{item.currency || 'GBP'}</td>
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