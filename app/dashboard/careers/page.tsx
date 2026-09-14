'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CareersPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const site = searchParams.get('site') || 'baco';

  useEffect(() => {
    async function fetchCareers() {
      try {
        setLoading(true);
        const res = await fetch(`/api/careers?site=${site}`);
        const result = await res.json();
        
        if (result.success) {
          setApplications(result.data || []);
        } else {
          console.error('API Error:', result.error);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCareers();
  }, [site]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading careers data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Candidate Applications (BACO Consultants)</h1>
      
      {/* Total Records Badge */}
      <div className="mb-4 text-sm text-gray-600">
        Total Applications: <span className="font-semibold">{applications.length}</span>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Experience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CV / Resume</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.length > 0 ? (
              applications.map((item: any, index: number) => (
                <tr key={item.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{item.email}</div>
                    <div className="text-xs text-gray-400">{item.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.experience}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.cvUrl && item.cvUrl !== '#' ? (
                      <a 
                        href={item.cvUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline font-medium"
                      >
                        View CV
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}