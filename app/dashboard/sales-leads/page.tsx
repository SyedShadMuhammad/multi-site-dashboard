'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SalesLeadsPage() {
  const searchParams = useSearchParams();
  const currentSite = searchParams.get('site') || 'ict';
  
  // URL search params se search term read karein jo header se aa raha hai
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';
  
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeadsFromAPI() {
      setLoading(true);
      try {
        const res = await fetch(`/api/leads?site=${currentSite}`);
        const result = await res.json();
        
        if (result.success) {
          setLeads(result.data || []);
        } else {
          console.error('API Error:', result.error);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
      setLoading(false);
    }

    fetchLeadsFromAPI();
  }, [currentSite]);

  let tableName = 'ict_leads';
  if (currentSite === 'ict-business') {
    tableName = 'ictbusinessuk_leads';
  } else if (currentSite === 'baco') {
    tableName = 'baco_applications';
  }

  // **Search Filtering Logic Added Here**
  const filteredLeads = leads.filter((lead) => {
    if (!searchTerm) return true;
    
    const name = (lead.name || lead.full_name || lead['Full Name'] || '').toLowerCase();
    const email = (lead.email || lead['Email'] || '').toLowerCase();
    const phone = (lead.phone || lead['Phone'] || '').toLowerCase();
    const program = (lead.program || lead.course_name || lead['Program'] || '').toLowerCase();

    return (
      name.includes(searchTerm) ||
      email.includes(searchTerm) ||
      phone.includes(searchTerm) ||
      program.includes(searchTerm)
    );
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sales Leads — {currentSite.toUpperCase()}</h1>
        <div className="flex items-center gap-3">
          {searchTerm && (
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Filtering for: &quot;{searchTerm}&quot;
            </span>
          )}
          <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">
            Total Records: {filteredLeads.length} {filteredLeads.length !== leads.length && `(of ${leads.length})`}
          </span>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-500">
          Loading leads data...
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800">
          <p className="font-bold">No records found!</p>
          <p className="text-sm mt-1">
            {searchTerm 
              ? `Aapke search query "${searchTerm}" se koi record match nahi hua.` 
              : `Table ${tableName} se 0 records mile hain.`}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-600 font-semibold">
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Program / Course</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {filteredLeads.map((lead, idx) => (
                  <tr key={lead.id || idx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 text-gray-500 font-medium">#{lead.id || idx + 1}</td>
                    <td className="p-4 font-semibold text-gray-900">{lead.name || lead.full_name || lead['Full Name'] || 'N/A'}</td>
                    <td className="p-4 text-gray-600">{lead.email || lead['Email'] || 'N/A'}</td>
                    <td className="p-4 text-gray-600">{lead.phone || lead['Phone'] || 'N/A'}</td>
                    <td className="p-4 text-gray-600">{lead.program || lead.course_name || lead['Program'] || 'N/A'}</td>
                    <td className="p-4 text-xs text-gray-400">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}