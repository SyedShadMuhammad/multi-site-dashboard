// app/dashboard/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SITES_CONFIG } from '@/config/sites.config';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export default function DashboardOverview() {
  const searchParams = useSearchParams();
  const currentSite = searchParams.get('site') || 'ict';
  const site = SITES_CONFIG[currentSite] || SITES_CONFIG['ict'];

  const [stats, setStats] = useState({
    contacts: 0,
    courses: 0,
    customers: 0,
    orders: 0,
    orderItems: 0,
    payments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        setLoading(true);
        const types = ['contact', 'courses', 'customers', 'orders', 'order-items', 'payments'];
        
        const results = await Promise.all(
          types.map(async (type) => {
            const res = await fetch(`/api/ictbusinessuk?site=${currentSite}&type=${type}`);
            const json = await res.json();
            return { type, count: json.success ? (json.data?.length || 0) : 0 };
          })
        );

        const newStats: any = {};
        results.forEach((item) => {
          newStats[item.type] = item.count;
        });

        setStats({
          contacts: newStats['contact'] || 0,
          courses: newStats['courses'] || 0,
          customers: newStats['customers'] || 0,
          orders: newStats['orders'] || 0,
          orderItems: newStats['order-items'] || 0,
          payments: newStats['payments'] || 0,
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, [currentSite]);

  return (
    <div className="space-y-6">
      {/* Unified Banner Card with Clean Favicon (No Box/Border) */}
      <div className={`bg-white p-6 rounded-2xl shadow-sm border ${site.theme.borderAccent} flex flex-col md:flex-row items-center justify-between gap-6`}>
        
        {/* Left Side: Only Clean Favicon & Info (No Wrapper Div/Border) */}
        <div className="flex items-center gap-6 w-full md:w-auto">
          {/* Direct Favicon without border and background */}
          <div className="shrink-0">
            <Image 
              src={site.logoUrl} 
              alt={site.name} 
              width={56} 
              height={56} 
              className="object-contain h-16 w-16"
            />
          </div>

          {/* Text Info */}
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overview Panel</span>
            <h1 className="text-2xl font-black text-gray-900 mt-0.5">{site.name} Dashboard</h1>
          </div>
        </div>

        {/* Right Side: Dynamic Theme Badge */}
        <div className="flex items-center shrink-0 w-full md:w-auto justify-end">
          <div className={`px-4 py-2.5 rounded-xl text-sm font-bold text-white ${site.theme.primaryBg} shadow-md`}>
           {site.name}
          </div>
        </div>

      </div>

      {/* Stats Cards Section */}
      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-2xl border border-gray-200">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Leads</span>
            <h3 className="text-3xl font-black text-gray-900 mt-2">{stats.contacts}</h3>
            <span className={`text-xs font-semibold ${site.theme.textAccent} bg-gray-50 px-2 py-0.5 rounded inline-block mt-1`}>Total Inquiries</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Courses</span>
            <h3 className="text-3xl font-black text-gray-900 mt-2">{stats.courses}</h3>
            <span className={`text-xs font-semibold ${site.theme.textAccent} bg-gray-50 px-2 py-0.5 rounded inline-block mt-1`}>Available Courses</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Customers</span>
            <h3 className="text-3xl font-black text-gray-900 mt-2">{stats.customers}</h3>
            <span className={`text-xs font-semibold ${site.theme.textAccent} bg-gray-50 px-2 py-0.5 rounded inline-block mt-1`}>Registered Users</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Orders</span>
            <h3 className="text-3xl font-black text-gray-900 mt-2">{stats.orders}</h3>
            <span className={`text-xs font-semibold ${site.theme.textAccent} bg-gray-50 px-2 py-0.5 rounded inline-block mt-1`}>Placed Orders</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order Items</span>
            <h3 className="text-3xl font-black text-gray-900 mt-2">{stats.orderItems}</h3>
            <span className={`text-xs font-semibold ${site.theme.textAccent} bg-gray-50 px-2 py-0.5 rounded inline-block mt-1`}>Purchased Items</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Payments</span>
            <h3 className="text-3xl font-black text-gray-900 mt-2">{stats.payments}</h3>
            <span className={`text-xs font-semibold ${site.theme.textAccent} bg-gray-50 px-2 py-0.5 rounded inline-block mt-1`}>Recorded Transactions</span>
          </div>
        </div>
      )}
    </div>
  );
}