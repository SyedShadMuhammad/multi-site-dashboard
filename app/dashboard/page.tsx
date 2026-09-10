// app/dashboard/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import { SITES_CONFIG } from '@/config/sites.config';
import Image from 'next/image';

export default function DashboardOverview() {
  const searchParams = useSearchParams();
  const currentSite = searchParams.get('site') || 'ict';
  const site = SITES_CONFIG[currentSite] || SITES_CONFIG['ict'];

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
            {/* <p className="text-sm text-gray-500">Managing inquiries, admissions, and careers for {site.domain}</p> */}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Leads</span>
          <h3 className="text-3xl font-black text-gray-900 mt-2">142</h3>
          <span className={`text-xs font-semibold ${site.theme.textAccent} bg-gray-50 px-2 py-0.5 rounded inline-block mt-1`}>+12% this week</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Admissions</span>
          <h3 className="text-3xl font-black text-gray-900 mt-2">68</h3>
          <span className={`text-xs font-semibold ${site.theme.textAccent} bg-gray-50 px-2 py-0.5 rounded inline-block mt-1`}>+5% this week</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Career Applications</span>
          <h3 className="text-3xl font-black text-gray-900 mt-2">34</h3>
          <span className={`text-xs font-semibold ${site.theme.textAccent} bg-gray-50 px-2 py-0.5 rounded inline-block mt-1`}>+18% this week</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Visitors</span>
          <h3 className="text-3xl font-black text-gray-900 mt-2">2,450</h3>
          <span className={`text-xs font-semibold ${site.theme.textAccent} bg-gray-50 px-2 py-0.5 rounded inline-block mt-1`}>+8% this week</span>
        </div>
      </div>
    </div>
  );
}