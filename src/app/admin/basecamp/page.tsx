'use client'

import { Users, Home, Settings, ShieldCheck, Calendar, Briefcase, Bell } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function BasecampHubPage() {
  const categories = [
    {
      title: 'The Roster',
      description: 'Manage employee profiles, roles, and digital AI assistants.',
      icon: Users,
      href: '/admin/basecamp/roster',
      color: 'bg-amber-500',
    },
    {
      title: 'Office HQ',
      description: 'Internal SOPs, brand guidelines, and shared team resources.',
      icon: Home,
      href: '/admin/basecamp/knowledge',
      color: 'bg-blue-500',
    },
    {
      title: 'Security & Roles',
      description: 'Access control and permission management for the platform.',
      icon: ShieldCheck,
      href: '/admin/settings/users',
      color: 'bg-emerald-500',
    },
  ]

  const upcomingEvents = [
    { title: 'Weekly Strategy Sync', time: 'Mon, 10:00 AM', type: 'meeting' },
    { title: 'System Maintenance', time: 'Tue, 02:00 AM', type: 'system' },
    { title: 'New Agent Deployment', time: 'Wed, 09:00 AM', type: 'update' }
  ]

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
            Base<span className="text-[#FBBF24]">camp</span>
          </h1>
          <p className="text-[10px] md:text-xs text-white/40 font-bold uppercase tracking-[0.3em] mt-1">
            Operational Headquarters & Team Management
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-2xl w-fit">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
           <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">HQ Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Main Categories */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative overflow-hidden bg-brand-charcoal border border-white/[0.08] rounded-3xl p-6 md:p-8 hover:border-[#FBBF24]/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FBBF24]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={cn(
                "w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-3",
                cat.color
              )}>
                <cat.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>

              <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white mb-2">
                {cat.title}
              </h2>
              <p className="text-xs md:text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                {cat.description}
              </p>

              <div className="mt-6 md:mt-8 flex items-center text-[#FBBF24] text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                Enter Section →
              </div>
            </Link>
          ))}
        </div>

        {/* Sidebar info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Team Feed / Upcoming */}
          <div className="bg-brand-charcoal border border-white/[0.08] rounded-3xl p-6">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FBBF24] mb-6 flex items-center gap-2">
               <Calendar className="w-3 h-3" /> Team Calendar
             </h3>
             <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.title} className="flex gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-[#FBBF24]/10 group-hover:border-[#FBBF24]/20 transition-all">
                       <span className="text-[10px] font-black text-white/20 group-hover:text-[#FBBF24]">{event.time.split(' ')[0].slice(0,3)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-xs font-bold text-white group-hover:text-[#FBBF24] transition-colors truncate">{event.title}</p>
                       <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-0.5">{event.time}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-brand-charcoal border border-white/[0.08] rounded-3xl p-6">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
               <Briefcase className="w-3 h-3" /> HQ Status
             </h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">On Duty</p>
                  <p className="text-lg font-black text-white">12</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Active AI</p>
                  <p className="text-lg font-black text-emerald-500">4</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
