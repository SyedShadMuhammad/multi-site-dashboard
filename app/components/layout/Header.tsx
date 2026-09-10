// app/components/layout/Header.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { SITES_CONFIG } from '@/config/sites.config';
import { Bell, Search, Menu, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentSite: string;
  onSiteChange: (siteId: string) => void;
  onToggleSidebar?: () => void;
}

export default function Header({ currentSite, onSiteChange, onToggleSidebar }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentSiteData = SITES_CONFIG[currentSite] || Object.values(SITES_CONFIG)[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between shrink-0 relative z-40">
      {/* Left Side: Mobile Menu Button & Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-xs sm:text-sm font-bold text-gray-700">Centralized Dashboard</span>
      </div>

      {/* Right Side: Search, Notifications & Portal Switcher Dropdown */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="hidden sm:flex w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 items-center justify-center text-gray-500 hover:text-gray-900 transition-colors">
          <Search className="w-4 h-4" />
        </button>
        <button className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors">
          <Bell className="w-4 h-4" />
        </button>

        {/* Custom Portal Switcher Dropdown */}
        <div className="relative pl-1 sm:pl-2 border-l border-gray-200" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-xs sm:text-sm font-bold rounded-xl px-3 sm:px-4 py-2.5 flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-sm max-w-[180px] sm:max-w-none truncate"
          >
            <span className="truncate">{currentSiteData.name} ({currentSiteData.domain})</span>
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