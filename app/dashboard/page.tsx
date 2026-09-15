'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getSupabaseClientForSite } from '@/lib/supabase/multiClients';

function OverviewContent() {
  const searchParams = useSearchParams();
  const rawSite = searchParams.get('site');
  const site = (rawSite || 'ict').toLowerCase().trim();
  
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
          { key: 'certificates', table: 'Certificate' }, // <--- Yahan table ka sahi naam likhein jo certificate page par hai
            { key: 'complaints', table: 'complaints' },
            { key: 'feedback', table: 'feedback_submissions' },
            { key: 'hardCopy', table: 'hard_copy_requests' },
            { key: 'leads', table: 'ict_leads' },
            { key: 'mofa', table: 'mofa_requests' },
          ];
          for (const item of tables) {
            const { count, error } = await supabase
              .from(item.table)
              .select('*', { count: 'exact', head: true });
            newStats[item.key] = error ? 0 : count || 0;
          }
        } 
        // 2. BACO Consultants (Dono applications aur contact wapis add kar diye hain)
        else if (site.includes('baco') || site === 'bacoconsultants') {
          const tables = [
            { key: 'applications', table: 'baco_applications' },
            { key: 'contact', table: 'baco_contact' },
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
            .from('contact_messages')
            .select('*', { count: 'exact', head: true });
          newStats.contact = error ? 0 : count || 0;
        }
        // 4. IDT Pakistan
        // 4. IDT Pakistan
        else if (site.includes('idt') || site === 'idtpakistan') {
          const { count, error } = await supabase
            .from('contact_messages_IDT') // <--- Yahan wohi table name likhein jo contact page par hai (e.g. idt_contacts ya contact_messages_IDT)
            .select('*', { count: 'exact', head: true });
          newStats.contact = error ? 0 : count || 0;
        }
        // 5. Default -> ICT Business UK
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
         <StatCard 
  title="Certificate Requests" 
  value={loading ? '...' : stats.certificates} 
  href={`/dashboard/ict/certificate?site=${site}`} 
/>
          <StatCard title="Complaints" value={loading ? '...' : stats.complaints || 0} href={`/dashboard/ict/complaints?site=${site}`} />
          <StatCard title="Feedback Submission" value={loading ? '...' : stats.feedback || 0}  href={`/dashboard/ict/feedback-submission?site=${site}`}  />
          <StatCard  title="Hard Copy Request"  value={loading ? '...' : stats.hardCopy || 0} href={`/dashboard/ict/hard-copy-request?site=${site}`} />
          <StatCard title="ICT Leads" value={loading ? '...' : stats.leads || 0} href={`/dashboard/ict/leads?site=${site}`} />
          <StatCard title="MOFA Requests" value={loading ? '...' : stats.mofa || 0} href={`/dashboard/ict/mofa-requests?site=${site}`} />
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
          <StatCard 
            title="BACO Applications" 
            value={loading ? '...' : stats.applications || 0} 
            href={`/dashboard/bacoconsultants/applications?site=${site}`} 
          />
          <StatCard 
            title="Contact Inquiries" 
            value={loading ? '...' : stats.contact || 0} 
            href={`/dashboard/bacoconsultants/contact?site=${site}`} 
          />
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
          <StatCard 
            title="Contact Inquiries" 
            value={loading ? '...' : stats.contact || 0} 
            href={`/dashboard/ictbusinessschool/contact?site=${site}`} 
          />
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
          <StatCard title="Contact Inquiries" value={loading ? '...' : stats.contact || 0} href={`/dashboard/idtpakistan/contact?site=${site}`} />
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
        <StatCard title="Contact" value={loading ? '...' : stats.contact || 0} href={`/dashboard/ictbusinessuk/contact?site=${site}`} />
        <StatCard title="Courses" value={loading ? '...' : stats.courses || 0} href={`/dashboard/ictbusinessuk/courses?site=${site}`} />
        <StatCard title="Customers" value={loading ? '...' : stats.customers || 0} href={`/dashboard/ictbusinessuk/customers?site=${site}`} />
        <StatCard title="Orders" value={loading ? '...' : stats.orders || 0} href={`/dashboard/ictbusinessuk/orders?site=${site}`} />
        <StatCard title="Order Items" value={loading ? '...': stats.orderItems || 0} href={`/dashboard/ictbusinessuk/order-items?site=${site}`} />
        <StatCard title="Payments" value={loading ? '...' : stats.payments || 0} href={`/dashboard/ictbusinessuk/payments?site=${site}`} />
      </div>
    </div>
  );
}

export default function OverviewPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading dashboard...</div>}>
      <OverviewContent />
    </Suspense>
  );
}

function StatCard({ title, value, href }: { title: string; value: number | string; href?: string }) {
  const router = useRouter();

  return (
    <div 
      onClick={() => {
        if (href) router.push(href);
      }}
      className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer"
    >
      <p className="text-xs font-semibold text-slate-400 uppercase group-hover:text-indigo-600 transition-colors">{title}</p>
      <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
    </div>
  );
}