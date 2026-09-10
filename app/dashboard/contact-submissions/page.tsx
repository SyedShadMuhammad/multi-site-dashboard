// app/dashboard/contact-submissions/page.tsx
'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SITES_CONFIG } from '@/config/sites.config';
import { Search, Mail, MessageSquare, Phone, Calendar } from 'lucide-react';

export default function ContactSubmissionsPage() {
  const searchParams = useSearchParams();
  const currentSite = searchParams.get('site') || 'ict';
  const site = SITES_CONFIG[currentSite] || SITES_CONFIG['ict'];

  const [searchQuery, setSearchQuery] = useState('');

  const messagesData: Record<string, Array<{ id: number; name: string; email: string; phone: string; subject: string; message: string; date: string }>> = {
    ict: [
      { id: 1, name: 'Tariq Jamil', email: 'tariq@gmail.com', phone: '+92 300 1122334', subject: 'Course Inquiry', message: 'Assalam-o-Alaikum, I want to know about the upcoming batch timings for Web Development.', date: '09 Sep 2026' },
      { id: 2, name: 'Sadia Aman', email: 'sadia.a@yahoo.com', phone: '+92 321 5566778', subject: 'Fee Structure', message: 'Kindly send me the detailed fee structure for BS Computer Science.', date: '08 Sep 2026' },
    ],
    idt: [
      { id: 1, name: 'Waqar Younis', email: 'waqar@gmail.com', phone: '+92 301 9988776', subject: 'Corporate Training', message: 'We need corporate digital marketing training for our team members.', date: '08 Sep 2026' },
    ],
    paf: [
      { id: 1, name: 'Rizwan Ahmed', email: 'rizwan@gmail.com', phone: '+92 302 4433221', subject: 'Admission Criteria', message: 'What are the physical standards required for aviation courses?', date: '07 Sep 2026' },
    ],
  };

  const currentList = messagesData[currentSite] || messagesData['ict'];
  const filteredList = currentList.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className={`bg-white p-6 rounded-2xl shadow-sm border ${site.theme.borderAccent} flex flex-col md:flex-row items-center justify-between gap-6`}>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Inbox Management</span>
          <h1 className="text-2xl font-black text-gray-900 mt-0.5">Contact Form Submissions</h1>
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
          <h3 className="text-lg font-bold text-gray-900">Incoming Messages ({site.name})</h3>
          
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-offset-0 transition-all ${site.theme.borderAccent} focus:ring-blue-500/20`}
            />
          </div>
        </div>
        
        {filteredList.length > 0 ? (
          <div className="space-y-4">
            {filteredList.map((msg) => (
              <div key={msg.id} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/40 hover:bg-gray-50 transition-all space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${site.theme.primaryBg} text-white font-bold flex items-center justify-center text-sm shadow-sm shrink-0`}>
                      {msg.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{msg.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {msg.email}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {msg.phone}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {msg.date}
                  </span>
                </div>

                <div>
                  <span className="inline-block text-[11px] font-black uppercase px-2.5 py-0.5 rounded-md bg-gray-200/60 text-gray-700 mb-1.5">
                    Subject: {msg.subject}
                  </span>
                  <p className="text-sm text-gray-600 font-medium bg-white p-3.5 rounded-xl border border-gray-100">
                    &ldquo;{msg.message}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gray-100 rounded-xl p-12 text-center bg-gray-50/50">
            <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-500">No contact form messages found.</p>
          </div>
        )}
      </div>
    </div>
  );
}