// app/dashboard/settings/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import { SITES_CONFIG } from '@/config/sites.config';
import { Settings, Globe, Shield, Bell, Save } from 'lucide-react';

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const currentSite = searchParams.get('site') || 'ict';
  const site = SITES_CONFIG[currentSite] || SITES_CONFIG['ict'];

  return (
    <div className="space-y-6">
      <div className={`bg-white p-6 rounded-2xl shadow-sm border ${site.theme.borderAccent} flex flex-col md:flex-row items-center justify-between gap-6`}>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">System Configuration</span>
          <h1 className="text-2xl font-black text-gray-900 mt-0.5">Portal Settings</h1>
          <p className={`text-sm font-bold mt-1 ${site.theme.textAccent}`}>{site.name}</p>
        </div>
        <div className="flex items-center shrink-0 w-full md:w-auto justify-end">
          <div className={`px-5 py-2.5 rounded-xl text-sm font-bold text-white ${site.theme.primaryBg} shadow-md`}>
            {site.name}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-400" /> General Portal Settings
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Company / Site Name</label>
              <input 
                type="text" 
                defaultValue={site.name} 
                className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-offset-0 ${site.theme.borderAccent}`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Official Domain</label>
              <input 
                type="text" 
                defaultValue={site.domain} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Support Email Address</label>
              <input 
                type="email" 
                defaultValue={`support@${site.domain}`} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white ${site.theme.primaryBg} shadow-md hover:opacity-95 transition-all flex items-center gap-2`}>
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>

        {/* Sidebar Info Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-md font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-400" /> Security & Theme Info
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            You are currently managing settings for <strong className="text-gray-800">{site.name}</strong>. All theme variables and data buckets are isolated securely.
          </p>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Active Theme ID</span>
            <span className={`text-sm font-black uppercase ${site.theme.textAccent}`}>{site.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}