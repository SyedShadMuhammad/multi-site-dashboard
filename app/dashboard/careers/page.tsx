// app/dashboard/careers/page.tsx
'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SITES_CONFIG } from '@/config/sites.config';
import { Search, Briefcase, Mail, Phone, Calendar, CheckCircle2, Clock } from 'lucide-react';

export default function CareersPage() {
  const searchParams = useSearchParams();
  const currentSite = searchParams.get('site') || 'ict';
  const site = SITES_CONFIG[currentSite] || SITES_CONFIG['ict'];

  const [searchQuery, setSearchQuery] = useState('');

  const careersData: Record<string, Array<{ id: number; name: string; email: string; phone: string; position: string; experience: string; status: string; date: string }>> = {
    ict: [
      { id: 1, name: 'Nasir Hussain', email: 'nasir.h@gmail.com', phone: '+92 300 5544332', position: 'Frontend Developer (Next.js)', experience: '2 Years', status: 'Shortlisted', date: '08 Sep 2026' },
      { id: 2, name: 'Mehwish Hayat', email: 'mehwish.h@yahoo.com', phone: '+92 321 7788991', position: 'UI/UX Designer', experience: '3 Years', status: 'Pending', date: '06 Sep 2026' },
    ],
    idt: [
      { id: 1, name: 'Imran Khan', email: 'imran.dev@gmail.com', phone: '+92 301 2233445', position: 'Full Stack Engineer', experience: '4 Years', status: 'Shortlisted', date: '07 Sep 2026' },
    ],
    paf: [
      { id: 1, name: 'Zohaib Hassan', email: 'zohaib.h@gmail.com', phone: '+92 302 6677889', position: 'Flight Instructor', experience: '5 Years', status: 'Pending', date: '05 Sep 2026' },
    ],
  };

  const currentList = careersData[currentSite] || careersData['ict'];
  const filteredList = currentList.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className={`bg-white p-6 rounded-2xl shadow-sm border ${site.theme.borderAccent} flex flex-col md:flex-row items-center justify-between gap-6`}>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Careers Management</span>
          <h1 className="text-2xl font-black text-gray-900 mt-0.5">Job Applications</h1>
          <p className={`text-sm font-bold mt-1 ${site.theme.textAccent}`}>{site.name}</p>
        </div>
        <div className="flex items-center shrink-0 w-full md:w-auto justify-end">
          <div className={`px-5 py-2.5 rounded-xl text-sm font-bold text-white ${site.theme.primaryBg} shadow-md`}>
            {site.name}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-gray-900">Candidate Applications ({site.name})</h3>
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by candidate name, position..."
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-offset-0 transition-all ${site.theme.borderAccent} focus:ring-blue-500/20`}
            />
          </div>
        </div>

        {filteredList.length > 0 ? (
          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-black uppercase text-gray-400 tracking-wider">
                  <th className="py-3.5 px-4">Candidate Name</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Position Applied</th>
                  <th className="py-3.5 px-4">Experience</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-gray-900 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${site.theme.primaryBg} text-white font-bold flex items-center justify-center text-xs shadow-sm shrink-0`}>
                        {item.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <span>{item.name}</span>
                        <span className="block text-xs font-normal text-gray-400">ID: #JOB-0{item.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 font-medium">
                      <div className="flex items-center gap-1.5 text-xs text-gray-700">
                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{item.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.phone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-800">{item.position}</td>
                    <td className="py-4 px-4 text-xs font-semibold text-gray-600">{item.experience}</td>
                    <td className="py-4 px-4">
                      {item.status === 'Shortlisted' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Shortlisted
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200/60">
                          <Clock className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-gray-100 rounded-xl p-12 text-center bg-gray-50/50">
            <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-500">No job applications found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}