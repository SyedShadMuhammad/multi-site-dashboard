// app/dashboard/admissions/page.tsx
'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SITES_CONFIG } from '@/config/sites.config';
import { Search, FileText, CheckCircle2, Clock, XCircle, Mail, Phone } from 'lucide-react';

export default function AdmissionsPage() {
  const searchParams = useSearchParams();
  const currentSite = searchParams.get('site') || 'ict';
  const site = SITES_CONFIG[currentSite] || SITES_CONFIG['ict'];

  const [searchQuery, setSearchQuery] = useState('');

  // Dummy Admissions Data for each company
  const admissionsData: Record<string, Array<{ id: number; name: string; email: string; phone: string; program: string; status: string; date: string }>> = {
    ict: [
      { id: 1, name: 'Ali Khan', email: 'ali.khan@gmail.com', phone: '+92 300 1234567', program: 'BS Computer Science', status: 'Approved', date: '08 Sep 2026' },
      { id: 2, name: 'Ayesha Bibi', email: 'ayesha.b@gmail.com', phone: '+92 321 9876543', program: 'Digital Marketing & SEO', status: 'Pending', date: '07 Sep 2026' },
      { id: 3, name: 'Usman Ahmed', email: 'usman.ahmed@yahoo.com', phone: '+92 333 4567890', program: 'Graphic Designing', status: 'Rejected', date: '05 Sep 2026' },
      { id: 4, name: 'Fatima Noor', email: 'fatima.noor@gmail.com', phone: '+92 312 3456789', program: 'Artificial Intelligence', status: 'Approved', date: '04 Sep 2026' },
    ],
    idt: [
      { id: 1, name: 'Hamza Malik', email: 'hamza.malik@gmail.com', phone: '+92 301 5554433', program: 'Full Stack Web Development', status: 'Approved', date: '08 Sep 2026' },
      { id: 2, name: 'Zainab Tariq', email: 'zainab.t@gmail.com', phone: '+92 334 2221199', program: 'Python & Data Science', status: 'Pending', date: '06 Sep 2026' },
      { id: 3, name: 'Bilal Raza', email: 'bilal.raza@gmail.com', phone: '+92 322 7788990', program: 'Mobile App Development', status: 'Approved', date: '03 Sep 2026' },
    ],
    paf: [
      { id: 1, name: 'Ahsan Iqbal', email: 'ahsan.iqbal@gmail.com', phone: '+92 302 1122334', program: 'Aviation Management', status: 'Pending', date: '09 Sep 2026' },
      { id: 2, name: 'Sana Javed', email: 'sana.javed@gmail.com', phone: '+92 315 9988776', program: 'Aerospace Engineering', status: 'Approved', date: '05 Sep 2026' },
    ],
  };

  const currentList = admissionsData[currentSite] || admissionsData['ict'];

  // Filter based on search query
  const filteredList = currentList.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner Card */}
      <div className={`bg-white p-6 rounded-2xl shadow-sm border ${site.theme.borderAccent} flex flex-col md:flex-row items-center justify-between gap-6`}>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Admissions Management</span>
          <h1 className="text-2xl font-black text-gray-900 mt-0.5">Admissions Applications</h1>
          <p className={`text-sm font-bold mt-1 ${site.theme.textAccent}`}>{site.name}</p>
        </div>

        {/* Right Side Theme Badge */}
        <div className="flex items-center shrink-0 w-full md:w-auto justify-end">
          <div className={`px-5 py-2.5 rounded-xl text-sm font-bold text-white ${site.theme.primaryBg} shadow-md`}>
            {site.name}
          </div>
        </div>
      </div>

      {/* Admissions Data Content Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-gray-900">Recent Applications ({site.name})</h3>
          
          {/* Search Bar with Active Theme Color Matching Border */}
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </span>
          <input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder="Search by name, program..."
  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-offset-0 transition-all ${site.theme.borderAccent} focus:ring-blue-500/20`}
/>
          </div>
        </div>
        
        {/* Admissions Table / List */}
        {filteredList.length > 0 ? (
          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-black uppercase text-gray-400 tracking-wider">
                  <th className="py-3.5 px-4">Applicant Name</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Program Applied</th>
                  <th className="py-3.5 px-4">Date</th>
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
                        <span className="block text-xs font-normal text-gray-400">ID: #APP-2026-0{item.id}</span>
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
                    <td className="py-4 px-4 font-semibold text-gray-800">{item.program}</td>
                    <td className="py-4 px-4 text-xs font-medium text-gray-500">{item.date}</td>
                    <td className="py-4 px-4">
                      {item.status === 'Approved' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                        </span>
                      )}
                      {item.status === 'Pending' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200/60">
                          <Clock className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                      {item.status === 'Rejected' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200/60">
                          <XCircle className="w-3.5 h-3.5" /> Rejected
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
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-500">No applications found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}