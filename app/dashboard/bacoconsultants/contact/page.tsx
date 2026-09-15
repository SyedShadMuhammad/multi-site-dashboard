// app/dashboard/bacoconsultants/contact/page.tsx
import { getSupabaseClientForSite } from '@/lib/supabase/multiClients';
import { Mail, Phone, Building, Calendar, User, Search } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BacoContactPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : '';

  // BACO site ke liye dedicated Supabase client
  const supabase = getSupabaseClientForSite('baco');

  let query = supabase
    .from('baco_contact')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  // Header search bar integration via ilike filter (supporting multiple possible column naming conventions)
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,company.ilike.%${search}%`);
  }

  const { data: contacts, count, error } = await query;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Mail className="w-6 h-6 text-emerald-600" />
            BACO Contact Messages
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage and view inquiries submitted through the BACO Consultants portal.
          </p>
        </div>
        <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm text-xs sm:text-sm font-semibold text-gray-700">
          Total Records: <span className="text-emerald-600 font-bold">{count || contacts?.length || 0}</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Full Name</th>
                <th className="py-3.5 px-6">Email</th>
                <th className="py-3.5 px-6">Phone</th>
                <th className="py-3.5 px-6">Company</th>
                <th className="py-3.5 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {error ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-red-500 font-semibold">
                    Error loading data: {error.message}
                  </td>
                </tr>
              ) : !contacts || contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Mail className="w-8 h-8 text-gray-300" />
                      <p className="font-semibold">No contact messages found</p>
                      {search && <p className="text-xs text-gray-400">No results matching "{search}"</p>}
                    </div>
                  </td>
                </tr>
              ) : (
                contacts.map((item, index) => {
                  // Fallbacks for various possible column key names in Supabase
                  const fullName = item.full_name || item['Full Name'] || item.name || item['Name'] || 'N/A';
                  const email = item.email || item['Email'] || 'N/A';
                  const phone = item.phone || item['Phone'] || item.mobile || 'N/A';
                  const company = item.company || item['Company'] || 'EMPTY';
                  const createdAt = item.created_at || item['created_at'];

                  return (
                    <tr key={item.id || index} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="py-4 px-6 font-bold text-gray-900 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate max-w-[200px]">{fullName}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        <span className="truncate max-w-[220px] block">{email}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-600 font-medium">
                        {phone}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {company && company !== 'EMPTY' ? company : <span className="text-gray-400 italic">None</span>}
                      </td>
                      <td className="py-4 px-6 text-gray-400 text-xs">
                        {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}