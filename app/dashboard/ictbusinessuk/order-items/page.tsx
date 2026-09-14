// app/dashboard/ictbusinessuk/order-items/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PackageCheck, Loader2 } from 'lucide-react';

export default function ICTBusinessUKOrderItemsPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'ictbusinessuk';
  
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderItems() {
      try {
        setLoading(true);
        const res = await fetch(`/api/ictbusinessuk?site=${site}&type=order-items`);
        const result = await res.json();
        if (result.success) {
          setOrderItems(result.data || []);
        }
      } catch (err) {
        console.error('Error fetching order items:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrderItems();
  }, [site]);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <PackageCheck className="w-7 h-7 text-violet-600" />
            Order Items — ICT Business UK
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage and view all items inside orders.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
          </div>
        ) : orderItems.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-medium">
            No order items found in ictbusinessuk_order_items.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Course Slug</th>
                  <th className="px-6 py-4">Course Title</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Unit Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {orderItems.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-500">#{item.id || index + 1}</td>
                    <td className="px-6 py-4 font-semibold text-gray-700">{item.order_id || 'N/A'}</td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{item.course_slug || 'N/A'}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{item.course_title || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-600 font-semibold">{item.quantity || 1}</td>
                    <td className="px-6 py-4 font-bold text-violet-600">{item.unit_price_minor ?? '0.00'}</td>
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