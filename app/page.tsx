'use client';
import React from 'react';
import Link from 'next/link';
import { Building2, ShieldCheck, Search, ArrowRight, LayoutDashboard, CheckCircle2, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const companies = [
    {
      name: 'ICT Education',
      tagline: 'Student Records & Certifications',
      description: 'Manage 7,000+ student certificates, automated database-wide global search, batches, and course registration workflows.',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      stat: '7,400+ Records'
    },
    {
      name: 'Baco Applications',
      tagline: 'Client Processing & Workflows',
      description: 'Advanced client application tracking, dynamic state handling, and structured data organization.',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
      stat: 'Enterprise Node'
    },
    {
      name: 'ICT Business UK',
      tagline: 'Global Consultancy & Leads',
      description: 'International business communications, client acquisition pipelines, and lead management hub.',
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      stat: 'Global Network'
    },
    {
      name: 'MOFA Services',
      tagline: 'Document Verification & Queue',
      description: 'Streamlined verification tracking, official document requests, and high-priority processing queues.',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      stat: 'Verified Queue'
    },
    {
      name: 'Complaints & Support Desk',
      tagline: 'Unified Ticketing System',
      description: 'Centralized support ticketing to monitor user inquiries, feedback submissions, and quick resolution logs.',
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
      stat: '24/7 Active'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-md">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900 block leading-none">MultiSite</span>
              <span className="text-xs text-emerald-600 font-semibold tracking-wider uppercase">Centralized OS</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* <Link 
              href="/api/auth/login" 
              className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </Link> */}
            <Link 
              href="/login" 
              className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all rounded-xl shadow-sm hover:shadow flex items-center gap-2"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 lg:pt-28 lg:pb-24 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen Multi-Company Command Center
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Unified Control For <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              All Your Businesses
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Blazing fast server-side global search, real-time Supabase integrations, and seamless multi-portal management built for scale.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link 
              href="/dashboard/ict/certificate" 
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-3 group"
            >
              Open Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            {/* <Link 
              href="/api/auth/login" 
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-300 rounded-xl transition-all shadow-sm"
            >
              System Authentication
            </Link> */}
          </div>

          {/* Mini Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-12 max-w-3xl mx-auto border-t border-slate-200">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="text-2xl font-bold text-slate-900">7,400+</div>
              <div className="text-xs text-slate-500 mt-0.5">Indexed Certificates</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="text-2xl font-bold text-slate-900">&lt; 300ms</div>
              <div className="text-xs text-slate-500 mt-0.5">Global Search Speed</div>
            </div>
            <div className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="text-2xl font-bold text-emerald-600">100%</div>
              <div className="text-xs text-slate-500 mt-0.5">Cloud Synchronized</div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies & Portals Showcase Cards (No Links, Just Smooth Hover Animations) */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-200 bg-white/50">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Connected Organization Portals</h2>
          <p className="text-slate-600 max-w-xl mx-auto">Overview of departmental workspaces connected with live database tables and instant record searching.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((comp, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl border ${comp.iconBg}`}>
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-full">
                    {comp.stat}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {comp.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">{comp.tagline}</p>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {comp.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-400">
                <span>Secure Database Node</span>
                <span className="text-emerald-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Active Feed
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} MultiSite Enterprise Dashboard. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Supabase Secured</span>
            <span className="flex items-center gap-1.5"><Search className="w-4 h-4 text-teal-600" /> Database-Wide Search</span>
          </div>
        </div>
      </footer>
    </div>
  );
}