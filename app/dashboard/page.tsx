'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSupabaseClientForSite } from '@/lib/supabase/multiClients';

export default function OverviewPage() {
  const searchParams = useSearchParams();
  const rawSite = searchParams.get('site') || 'ictbusinessuk';
  const site = rawSite.toLowerCase().trim();
  
  const supabase = getSupabaseClientForSite(site); 

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchDashboardCounts() {
      setLoading(true);
      const newStats: Record<string, number> = {};

      try {
        // 1. ICT Education (ict)
        if (site === 'ict' || site.includes('ict.edu')) {
          const tables = [
            { key: 'certificates', table: 'certificates' },
            { key: 'complaints', table: 'complaints' },
            { key: 'feedback', table: 'feedback_submissions' },
            { key: 'hardCopy', table: 'hard_copy_requests' },
            { key: 'leads', table: 'ict_leads' },
          ];

          for (const item of tables) {
            const { count, error } = await supabase
              .from(item.table)
              .select('*', { count: 'exact', head: true });
            newStats[item.key] = error ? 0 : count || 0;
          }
        } 
        // 2. BACO Consultants
        else if (site.includes('baco') || site === 'bacoconsultants') {
          const tables = [
            { key: 'applications', table: 'baco_applications' },
            { key: 'contact', table: 'baco_contacts' },
          ];

          for (const item of tables) {
            const { count, error } = await supabase
              .from(item.table)
              .select('*', { count: 'exact', head: true });
            newStats[item.key] = error ? 0 : count || 0;
          }
        } 
        // 3. ICT Business School
        else if (site.includes('ictbusinessschool') || site === 'ibs' || site === 'ict-business') {
          const { count, error } = await supabase
            .from('ibs_contacts')
            .select('*', { count: 'exact', head: true });
          newStats.contact = error ? 0 : count || 0;
        } 
        // 4. IDT Pakistan
        else if (site.includes('idt') || site === 'idtpakistan') {
          const { count, error } = await supabase
            .from('idt_contacts')
            .select('*', { count: 'exact', head: true });
          newStats.contact = error ? 0 : count || 0;
        } 
        // 5. Default -> ICT Business UK (Prefix updated here)
        else {
          const tables = [
            { key: 'contact', table: `${site}_contact` },
            { key: 'courses', table: `${site}_courses` },
            { key: 'customers', table: `${site}_customers` },
            { key: 'orders', table: `${site}_orders` },
            { key: 'orderItems', table: `${site}_order_items` },
            { key: 'payments', table: `${site}_payments` },
          ];
          

          for (const item of tables) {
            const { count, error } = await supabase
              .from(item.table)
              .select('*', { count: 'exact', head: true });
            newStats[item.key] = error ? 0 : count || 0;
          }
        }
      } catch (err) {
        console.error('Error fetching dashboard counts:', err);
      } finally {
        setStats(newStats);
        setLoading(false);
      }
    }

    fetchDashboardCounts();
  }, [site, supabase]);

  // Render UI based on active site
  if (site === 'ict' || site.includes('ict.edu')) {
    return (
      <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">ICT Education Dashboard</h1>
          <p className="text-sm text-slate-500">Real-time overview of student requests, complaints and leads</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Certificate Requests" value={loading ? '...' : stats.certificates || 0} />
          <StatCard title="Complaints" value={loading ? '...' : stats.complaints || 0} />
          <StatCard title="Feedback Submission" value={loading ? '...' : stats.feedback || 0} />
          <StatCard title="Hard Copy Request" value={loading ? '...' : stats.hardCopy || 0} />
          <StatCard title="ICT Leads" value={loading ? '...' : stats.leads || 0} />
        </div>
      </div>
    );
  }

  if (site.includes('baco') || site === 'bacoconsultants') {
    return (
      <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">BACO Consultants Dashboard</h1>
          <p className="text-sm text-slate-500">Real-time overview of BACO applications and contact inquiries</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard title="BACO Applications" value={loading ? '...' : stats.applications || 0} />
          <StatCard title="Contact Inquiries" value={loading ? '...' : stats.contact || 0} />
        </div>
      </div>
    );
  }

  if (site.includes('ictbusinessschool') || site === 'ibs' || site === 'ict-business') {
    return (
      <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">ICT Business School Dashboard</h1>
          <p className="text-sm text-slate-500">Real-time overview of contact inquiries</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard title="Contact Inquiries" value={loading ? '...' : stats.contact || 0} />
        </div>
      </div>
    );
  }

  if (site.includes('idt') || site === 'idtpakistan') {
    return (
      <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">IDT Pakistan Dashboard</h1>
          <p className="text-sm text-slate-500">Real-time overview of contact inquiries</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard title="Contact Inquiries" value={loading ? '...' : stats.contact || 0} />
        </div>
      </div>
    );
  }

  // Default -> ICT Business UK
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">ICT Business UK Dashboard</h1>
        <p className="text-sm text-slate-500">Real-time overview of courses, customers, orders, and payments</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Contact" value={loading ? '...' : stats.contact || 0} />
        <StatCard title="Courses" value={loading ? '...' : stats.courses || 0} />
        <StatCard title="Customers" value={loading ? '...' : stats.customers || 0} />
        <StatCard title="Orders" value={loading ? '...' : stats.orders || 0} />
        <StatCard title="Order Items" value={loading ? '...' : stats.orderItems || 0} />
        <StatCard title="Payments" value={loading ? '...' : stats.payments || 0} />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <p className="text-xs font-semibold text-slate-400 uppercase">{title}</p>
      <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
    </div>
  );
}