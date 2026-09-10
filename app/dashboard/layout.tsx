// app/dashboard/layout.tsx
'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSite = searchParams.get('site') || 'ict';
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSiteChange = (siteId: string) => {
    router.push(`/dashboard?site=${siteId}`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 w-full">
      
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      {/* Sidebar Drawer */}
<div className={`
  fixed inset-y-0 left-0 z-50 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
`}>
  <Sidebar currentSite={currentSite} />
</div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Header 
          currentSite={currentSite} 
          onSiteChange={handleSiteChange} 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-gray-100">Loading Dashboard...</div>}>
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  );
}