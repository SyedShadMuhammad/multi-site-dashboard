// app/components/layout/Sidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { SITES_CONFIG } from '@/config/sites.config';
import { 
  LayoutDashboard, 
  Mail,
  Users, 
  GraduationCap, 
  Briefcase, 
  Settings, 
  LogOut,
  BookOpen,      // Courses ke liye icon
  ShoppingCart,  // Orders ke liye icon
  PackageCheck,  // Order Items ke liye icon
  CreditCard,    // Payments ke liye icon
  Award,
  AlertCircle,
  MessageSquare,
  FileText,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  currentSite: string;
}

export default function Sidebar({ currentSite }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeConfig = SITES_CONFIG[currentSite] || SITES_CONFIG['ict'];

  // Helper function to append current site query to all links
  const getSiteHref = (path: string) => {
    return `${path}?site=${currentSite}`;
  };

 const getNavItems = (rawSite: string) => {
  const site = rawSite?.toLowerCase().trim() || '';

  if (site === 'ictbusinessuk') {
    return [
      { name: 'Overview', href: getSiteHref('/dashboard'), icon: LayoutDashboard },
      { name: 'Contact', href: getSiteHref('/dashboard/ictbusinessuk/contact'), icon: Mail },
      { name: 'Courses', href: getSiteHref('/dashboard/ictbusinessuk/courses'), icon: BookOpen },
      { name: 'Customers', href: getSiteHref('/dashboard/ictbusinessuk/customers'), icon: Users },
      { name: 'Orders', href: getSiteHref('/dashboard/ictbusinessuk/orders'), icon: ShoppingCart },
      { name: 'Order Items', href: getSiteHref('/dashboard/ictbusinessuk/order-items'), icon: PackageCheck },
      { name: 'Payments', href: getSiteHref('/dashboard/ictbusinessuk/payments'), icon: CreditCard },
    ];
  }

  if (site === 'ict' || site.includes('ict.edu')) {
    return [
    { name: 'Overview', href: getSiteHref('/dashboard'), icon: LayoutDashboard },
  { name: 'Certificate', href: getSiteHref('/dashboard/ict/certificate'), icon: Award },
  { name: 'Complaints', href: getSiteHref('/dashboard/ict/complaints'), icon: AlertCircle },
  { name: 'Feedback Submission', href: getSiteHref('/dashboard/ict/feedback-submission'), icon: MessageSquare },
  { name: 'Hard Copy Request', href: getSiteHref('/dashboard/ict/hard-copy-request'), icon: FileText },
  { name: 'ICT Leads', href: getSiteHref('/dashboard/ict/leads'), icon: Users },
  { name: 'MOFA Request', href: getSiteHref('/dashboard/ict/mofa-requests'), icon: ShieldCheck },
];
  }

  if (site.includes('ictbusinessschool') || site === 'ibs' || site === 'ict-business') {
  return [
    { name: 'Overview', href: getSiteHref('/dashboard'), icon: LayoutDashboard },
    { name: 'Contact', href: getSiteHref('/dashboard/ictbusinessschool/contact'), icon: Mail },
  ];
}

  if (site.includes('baco') || site === 'bacoconsultants') {
    return [
      { name: 'Overview', href: getSiteHref('/dashboard'), icon: LayoutDashboard },
      { name: 'BACO Applications', href: getSiteHref('/dashboard/bacoconsultants/applications'), icon: FileText },
      { name: 'BACO Contact', href: getSiteHref('/dashboard/bacoconsultants/contact'), icon: Mail },
    ];
  }

  if (site.includes('idt') || site === 'idtpakistan') {
    return [
      { name: 'Overview', href: getSiteHref('/dashboard'), icon: LayoutDashboard },
      { name: 'Contact', href: getSiteHref('/dashboard/idtpakistan/contact'), icon: Mail },
    ];
  }

  return [
    { name: 'Overview', href: getSiteHref('/dashboard'), icon: LayoutDashboard },
  ];
};

  const navItems = getNavItems(currentSite);

  return (
    <aside className="w-64 bg-slate-950 text-gray-300 flex flex-col justify-between border-r border-slate-800 h-screen select-none shrink-0">
      <div>
        {/* Brand Logo & Name Area */}
        <div className="h-20 flex items-center px-6 gap-3 border-b border-slate-800/80 bg-slate-900/60">
          <div className={`w-3.5 h-3.5 rounded-full ${activeConfig.theme.primaryBg} shadow-lg shadow-current animate-pulse`} />
          <div className="flex flex-col overflow-hidden">
            <span className="text-white font-black text-sm tracking-wider truncate">
              {activeConfig.logoText}
            </span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest truncate">
              {activeConfig.domain}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            // Check active based on pathname
            const baseHref = item.href.split('?')[0];
            const isActive = pathname === baseHref;
            const IconComponent = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? `${activeConfig.theme.primaryBg} text-white shadow-lg shadow-black/25` 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <IconComponent className="w-5 h-5 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Admin Profile & Logout */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        {/* Admin Profile Card */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className={`w-9 h-9 rounded-lg ${activeConfig.theme.primaryBg} text-white font-bold flex items-center justify-center text-sm shadow-md shrink-0`}>
            SM
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">Shad Muhammad</h4>
            <span className="text-[10px] text-slate-400 font-medium block truncate">Super Admin</span>
          </div>
        </div>

        {/* Logout Button */}
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition-all border border-red-500/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Session</span>
        </Link>
      </div>
    </aside>
  );
}