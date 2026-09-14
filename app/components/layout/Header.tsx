// app/components/layout/Header.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SITES_CONFIG } from '@/config/sites.config';
import { Bell, Menu, ChevronDown, CheckCircle2, UserPlus, FileText, Mail, Search } from 'lucide-react';

interface HeaderProps {
  currentSite: string;
  onSiteChange: (siteId: string) => void;
  onToggleSidebar?: () => void;
}

interface NotificationItem {
  id: string;
  siteId: string;
  siteName: string;
  title: string;
  description: string;
  time: string;
  link: string;
  type: 'lead' | 'admission' | 'contact' | 'career';
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    siteId: 'ict',
    siteName: 'ICT Education',
    title: 'New Sales Lead',
    description: 'A new enterprise inquiry has been submitted.',
    time: '5m ago',
    link: '/dashboard/sales-leads?site=ict',
    type: 'lead',
  },
  {
    id: '2',
    siteId: 'ict',
    siteName: 'ICT Education',
    title: 'New Contact Message',
    description: 'Tariq Jamil sent a course inquiry message.',
    time: '25m ago',
    link: '/dashboard/contact-submissions?site=ict',
    type: 'contact',
  },
  {
    id: '3',
    siteId: 'baco',
    siteName: 'Baco Portal',
    title: 'New Admission Application',
    description: 'Student registration form submitted.',
    time: '2h ago',
    link: '/dashboard/admissions?site=baco',
    type: 'admission',
  },
];

export default function Header({ 
  currentSite, 
  onSiteChange, 
  onToggleSidebar 
}: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isOpen, setIsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Get current search query from URL if available
  const currentSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const currentSiteData = SITES_CONFIG[currentSite] || Object.values(SITES_CONFIG)[0];

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    
    // Update URL query params dynamically without losing current site
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    onSiteChange(notif.siteId);
    router.push(notif.link);
    setNotifOpen(false);
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'lead':
        return <UserPlus className="w-4 h-4 text-emerald-600" />;
      case 'admission':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'contact':
        return <Mail className="w-4 h-4 text-purple-600" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between shrink-0 relative z-40 gap-4">
      {/* Left Side: Mobile Menu Button & Title */}
      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-xs sm:text-sm font-bold text-gray-700 hidden sm:inline">Centralized Dashboard</span>
      </div>

      {/* Middle: Global Search Bar */}
      <div className="flex-1 max-w-md mx-2">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search leads, name, phone, email..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-gray-800 placeholder-gray-400 shadow-sm"
          />
          {searchTerm && (
            <button 
              onClick={() => handleSearchChange('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 text-[10px] font-bold uppercase"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right Side: Notifications & Portal Switcher Dropdown */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        
        {/* Notifications Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                {notifications.length}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="fixed inset-x-4 top-24 sm:absolute sm:inset-x-auto sm:right-0 sm:mt-2 sm:w-96 bg-white border border-gray-200 rounded-3xl sm:rounded-2xl shadow-2xl sm:shadow-xl py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Notifications</span>
                
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 font-semibold px-2 py-0.5 rounded-full">
                    {notifications.length} New
                  </span>
                  <button 
                    onClick={() => setNotifOpen(false)} 
                    className="sm:hidden text-gray-400 hover:text-gray-600 text-sm px-1.5 py-0.5 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    &times;
                  </button>
                </div>
              </div>

              <div className="max-h-[calc(70vh-100px)] sm:max-h-80 overflow-y-auto divide-y divide-gray-50">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-gray-400">No new notifications</div>
                ) : (
                  notifications.map((notif) => (
                    <button
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white group-hover:shadow-sm transition-all">
                        {getIconByType(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-gray-900 truncate">{notif.title}</p>
                          <span className="text-[10px] text-gray-400 shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate mt-0.5">{notif.description}</p>
                        <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {notif.siteName}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Custom Portal Switcher Dropdown */}
        <div className="relative pl-1 sm:pl-2 border-l border-gray-200" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-xs sm:text-sm font-bold rounded-xl px-3 sm:px-4 py-2.5 flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-sm max-w-[140px] sm:max-w-[200px] truncate"
          >
            <span className="truncate">{currentSiteData.name}</span>
            <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Select Portal
              </div>
              {Object.values(SITES_CONFIG).map((site) => (
                <button
                  key={site.id}
                  onClick={() => {
                    onSiteChange(site.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-colors flex flex-col ${
                    currentSite === site.id 
                      ? 'bg-gray-900 text-white font-bold' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-semibold truncate">{site.name}</span>
                  <span className={`text-[10px] sm:text-xs truncate ${currentSite === site.id ? 'text-gray-300' : 'text-gray-400'}`}>
                    {site.domain}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}