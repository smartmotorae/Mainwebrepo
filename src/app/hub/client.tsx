'use client'

import { motion } from 'framer-motion'
import { ShieldAlert, Scale, Sun, PlaneLanding, Search, ArrowUpRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { triggerHubRefresh } from '@/app/actions/ai'
import { toast } from 'sonner'

const CATEGORIES = [
  {
    id: 'traffic-fines',
    title: 'Traffic Fines Index',
    description: 'Searchable database of Abu Dhabi & Dubai traffic violations, black points, and vehicle impoundment rules.',
    icon: ShieldAlert,
    color: 'text-red-600',
    bg: 'bg-red-50',
    link: '/hub/traffic-fines'
  },
  {
    id: 'regulations',
    title: 'UAE Regulations Guide',
    description: 'Expert guidance on window tinting laws, modified exhaust regulations, and RTA passing standards.',
    icon: Scale,
    color: 'text-brand-dark',
    bg: 'bg-gray-100',
    link: '/hub/regulations'
  },
  {
    id: 'summer-safety',
    title: 'Summer Safety Hub',
    description: 'Crucial maintenance tips for the UAE heat. Protecting your AC, coolant systems, and tires from 50°C+ conditions.',
    icon: Sun,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    link: '/hub/summer-safety'
  },
  {
    id: 'import-guide',
    title: 'Vehicle Import Guide',
    description: 'How to bring your luxury or classic car into the UAE. Compliance, registration, and VCC procedures.',
    icon: PlaneLanding,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    link: '/hub/import-guide'
  }
]

export default function HubClient() {
  const handleRefresh = async () => {
    toast.promise(triggerHubRefresh(), {
      loading: 'Swarm is scanning UAE regulations...',
      success: 'Intelligence scan complete. Data is up to date.',
      error: 'Failed to connect to Swarm.'
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
      {/* Header */}
      <div className="mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-brand-dark italic leading-none">
            Driver&apos;s <span className="text-brand-red">Intelligence</span> <br />
            <span className="silver-shine">Portal</span>
          </h1>
          <p className="mt-6 text-sm lg:text-base font-bold text-gray-400 uppercase tracking-[0.4em] max-w-2xl mx-auto">
            The Definitive Resource for UAE Luxury Car Ownership
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link 
              href={cat.link}
              className="group block h-full bg-white border border-gray-100 rounded-[3rem] p-10 shadow-sm hover:shadow-2xl hover:border-transparent transition-all duration-500 relative overflow-hidden"
            >
              <div className={cn("absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-10 transition-opacity", cat.bg)} />
              
              <div className="flex items-start justify-between mb-10">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3", cat.bg)}>
                  <cat.icon className={cn("w-8 h-8", cat.color)} />
                </div>
                <div className="p-3 rounded-full bg-gray-50 text-gray-300 group-hover:bg-brand-dark group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight size={20} />
                </div>
              </div>

              <h2 className="text-2xl font-black uppercase tracking-tight text-brand-dark mb-4">
                {cat.title}
              </h2>
              <p className="text-gray-500 font-medium leading-relaxed">
                {cat.description}
              </p>

              <div className="mt-10 pt-6 border-t border-gray-50 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-red opacity-0 group-hover:opacity-100 transition-opacity">
                <BookOpen size={14} />
                Explore Documentation
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom SEO Hook */}
      <div className="mt-32 p-12 bg-brand-dark rounded-[4rem] relative overflow-hidden text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="absolute inset-0 carbon-fiber opacity-20" />
        <div className="relative z-10 space-y-4">
          <h3 className="text-3xl font-black uppercase tracking-tighter text-white italic">
            Automotive <span className="text-brand-red">Self-Optimization</span>
          </h3>
          <p className="text-gray-400 text-sm font-medium tracking-wide max-w-xl">
            Our Autonomous SEO Swarm periodically updates this portal with the latest data from the UAE Ministry of Interior and RTA.
          </p>
        </div>
        <button 
          onClick={handleRefresh}
          className="relative z-10 px-10 py-5 bg-white text-brand-dark rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-red hover:text-white transition-all shadow-2xl"
        >
          Request Rule Update
        </button>
      </div>

      {/* UAE Government Authority Links */}
      <div className="mt-16 pt-10 border-t border-gray-100">
        <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-6">Official UAE Government Resources</h3>
        <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-500">
          <a href="https://www.moi.gov.ae" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
            UAE Ministry of Interior
          </a>
          <span className="text-gray-300">|</span>
          <a href="https://dot.abudhabi.ae" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
            Abu Dhabi Dept. of Transport
          </a>
          <span className="text-gray-300">|</span>
          <a href="https://u.ae/en/information-and-services/justice-safety-and-the-law/road-safety/traffic-fines-and-violations" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
            UAE Traffic Fines & Violations
          </a>
          <span className="text-gray-300">|</span>
          <a href="https://www.moiat.gov.ae" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
            ESMA Vehicle Standards
          </a>
          <span className="text-gray-300">|</span>
          <a href="https://u.ae/en/information-and-services/transportation/driving-a-motor-vehicle-in-the-uae" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
            UAE Consumer Protection
          </a>
        </div>
      </div>
    </div>
  )
}
