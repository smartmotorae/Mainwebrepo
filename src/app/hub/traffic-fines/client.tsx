'use client'

import { FinesIndex } from '@/components/hub/fines-index'
import { ShieldAlert, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function TrafficFinesClient() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 pb-40">
      {/* Navigation */}
      <div className="mb-12">
        <Link 
          href="/hub"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-red transition-colors group"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Return to Hub
        </Link>
      </div>

      {/* Header */}
      <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-50 border border-red-100">
            <ShieldAlert size={14} className="text-red-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-red-700">Official Violation Data</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-brand-dark italic italic leading-none">
            Traffic <span className="text-brand-red">Fines</span> <br />
            <span className="silver-shine">Index 2026</span>
          </h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.4em]">
            Comprehensive Directory of UAE Road Safety Rules
          </p>
        </motion.div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="text-right">
            <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Hub Status</p>
            <p className="text-xs font-black text-brand-dark uppercase tracking-widest">v2.5 Live Sync</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>

      <FinesIndex />

      {/* UAE Government Authority Links */}
      <div className="mt-20 pt-12 border-t border-gray-100">
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
            UAE Official Traffic Fines Portal
          </a>
          <span className="text-gray-300">|</span>
          <a href="https://www.adpolice.gov.ae" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
            Abu Dhabi Police
          </a>
          <span className="text-gray-300">|</span>
          <a href="https://www.rta.ae" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
            Dubai Roads & Transport Authority
          </a>
        </div>
        <p className="mt-4 text-[10px] text-gray-400 font-medium">
          Data compiled from official UAE government sources. Always verify current fines directly with the relevant authority. Smart Motor is not affiliated with any government body.
        </p>
      </div>
    </div>
  )
}
