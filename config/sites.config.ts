// config/sites.config.ts

export interface SiteConfig {
  id: string;
  name: string;
  domain: string;
  logoText: string;
  logoUrl: string;
  theme: {
    sidebarBg: string;
    primaryBg: string;       // Active button & main highlight background
    primaryHover: string;
    textAccent: string;
    badgeBg: string;
    borderAccent: string;
  };
}

export const SITES_CONFIG: Record<string, SiteConfig> = {
  ict: {
    id: 'ict',
    name: 'ICT Education',
    domain: 'ict.edu.pk',
    logoText: 'ICT INSTITUTE',
    logoUrl: '/ict.favicon.ico',
    theme: {
      sidebarBg: 'bg-slate-950',
      primaryBg: 'bg-emerald-600',       // Official website ka green color
      primaryHover: 'hover:bg-emerald-700',
      textAccent: 'text-emerald-600',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      borderAccent: 'border-emerald-500',
    },
  },
  'ict-business': {
    id: 'ict-business',
    name: 'ICT Business School',
    domain: 'ictbusinessschool.com',
    logoText: 'ICT BUSINESS',
    logoUrl: '/ictb.favicon.ico',
    theme: {
      sidebarBg: 'bg-slate-950',
      primaryBg: 'bg-indigo-600',       // Business school ke liye Indigo/Blue mix
      primaryHover: 'hover:bg-indigo-700',
      textAccent: 'text-indigo-600',
      badgeBg: 'bg-indigo-100 text-indigo-800',
      borderAccent: 'border-indigo-500',
    },
  },
  baco: {
    id: 'baco',
    name: 'BACO Consultants',
    domain: 'bacoconsultants.com',
    logoText: 'BACO CONSULTANTS',
    logoUrl: '/bacco.favicon.ico',
    theme: {
      sidebarBg: 'bg-slate-950',
      primaryBg: 'bg-red-600',          // BACO ke liye Red theme
      primaryHover: 'hover:bg-red-700',
      textAccent: 'text-red-600',
      badgeBg: 'bg-red-100 text-red-800',
      borderAccent: 'border-red-500',
    },
  },
  idt: {
    id: 'idt',
    name: 'IDT Pakistan',
    domain: 'idtpakistan.pk',
    logoText: 'IDT TRAINING',
    logoUrl: '/idt.favicon.ico',
    theme: {
      sidebarBg: 'bg-slate-950',
      primaryBg: 'bg-blue-600',          // IDT ke liye Blue theme
      primaryHover: 'hover:bg-blue-700',
      textAccent: 'text-blue-600',
      badgeBg: 'bg-blue-100 text-blue-800',
      borderAccent: 'border-blue-500',
    },
  },
};