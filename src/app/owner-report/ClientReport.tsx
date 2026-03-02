'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, TrendingUp, Zap, Globe, Target, ShieldCheck, ChevronDown, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'

// Mock Data for Google Search
const SEARCH_QUERIES = [
  "Range Rover air suspension repair Abu Dhabi",
  "BMW X5 coolant leak fix cost",
  "Mercedes major service Musaffah",
  "Porsche brake pad replacement near me"
]

type SearchResult = {
  title: string;
  url: string;
  snippet: string;
  faq?: string[];
  rating?: string;
  reviews?: string;
}

const SEARCH_RESULTS: Record<string, SearchResult> = {
  "Range Rover air suspension repair Abu Dhabi": {
    title: "Range Rover Sport Air Suspension Failure — Diagnosis and Repair",
    url: "https://smartmotor.ae › smart-tips › range-rover-...",
    snippet: "Range Rover Sport sagging on one corner or showing suspension fault warnings? Air suspension failure is the most common Range Rover problem in Abu Dhabi...",
    faq: ["What causes Range Rover air suspension to fail?", "How much does it cost in UAE?"]
  },
  "BMW X5 coolant leak fix cost": {
    title: "BMW X5 Coolant Leak Repair — Common Causes and Fix in Abu Dhabi",
    url: "https://smartmotor.ae › smart-tips › bmw-x5-coolant-leak",
    snippet: "BMW X5 coolant leaks are one of the most common issues we see in Abu Dhabi. Learn about the typical failure points (expansion tank, water pump), warning signs...",
    faq: ["Is it safe to drive with a coolant leak?", "Cost to replace BMW water pump?"]
  },
  "Mercedes major service Musaffah": {
    title: "Best Mercedes-Benz Major Service in Abu Dhabi UAE | Smart Motor",
    url: "https://smartmotor.ae › brand › mercedes-benz › major-service",
    snippet: "Certified Mercedes-Benz major service specialists in Musaffah, Abu Dhabi. Elite precision, OEM parts, and specialized UAE climate care. We check AIRMATIC...",
    rating: "4.9",
    reviews: "324"
  },
  "Porsche brake pad replacement near me": {
    title: "Porsche Cayenne Brake Pad and Disc Replacement Cost Abu Dhabi",
    url: "https://smartmotor.ae › smart-tips › porsche-cayenne-brakes",
    snippet: "Hearing a squeal from your Porsche Cayenne brakes? Learn when to replace pads vs. discs, why Abu Dhabi driving wears them faster, and the true cost...",
    rating: "5.0",
    reviews: "189"
  }
}

export default function ClientReport() {
  const [activeQueryIndex, setActiveQueryIndex] = useState(0)
  const [typedQuery, setTypedQuery] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  // Typing effect for Google Search Mock
  useEffect(() => {
    const currentQuery = SEARCH_QUERIES[activeQueryIndex]
    
    if (isTyping) {
      if (typedQuery.length < currentQuery.length) {
        const timeout = setTimeout(() => {
          setTypedQuery(currentQuery.slice(0, typedQuery.length + 1))
        }, 50 + Math.random() * 50)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      const timeout = setTimeout(() => {
        setTypedQuery("")
        setActiveQueryIndex((prev) => (prev + 1) % SEARCH_QUERIES.length)
        setIsTyping(true)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [typedQuery, isTyping, activeQueryIndex])

  const activeResult = SEARCH_RESULTS[SEARCH_QUERIES[activeQueryIndex] as keyof typeof SEARCH_RESULTS]

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 pb-32">
      
      {/* HERO SECTION */}
      <section className="bg-[#0B0F19] text-white pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-red/20 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-bold tracking-widest uppercase mb-8"
          >
            <ShieldCheck size={16} />
            Executive Briefing
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-8"
          >
            The New <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500">Smart Motor</span><br />
            SEO Architecture.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl leading-relaxed"
          >
            We didn't just redesign your website. We engineered a massive, programmatic digital net designed to capture 15,000+ local search permutations and systematically dismantle competitors.
          </motion.p>
        </div>
      </section>

      {/* METRICS & CHARTS */}
      <section className="max-w-5xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
          >
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Globe size={24} />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Indexed Pages</p>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-5xl font-black text-gray-900">580+</span>
            </div>
            <div className="h-32 flex items-end gap-2">
              <div className="w-1/2 bg-gray-100 rounded-t-lg h-[15%] relative group">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">Old</span>
              </div>
              <motion.div 
                initial={{ height: "15%" }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-1/2 bg-blue-500 rounded-t-lg relative"
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-600">Now</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
          >
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
              <Target size={24} />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Content Depth</p>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-5xl font-black text-gray-900">800<span className="text-2xl text-gray-400">w</span></span>
              <span className="text-sm text-gray-500 mb-2">per service page</span>
            </div>
            <div className="h-32 flex items-end gap-2">
              <div className="w-1/3 bg-red-100 rounded-t-lg h-[25%] relative">
                 <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-red-600">QuickFit</span>
              </div>
              <div className="w-1/3 bg-gray-100 rounded-t-lg h-[15%] relative">
                 <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">Old</span>
              </div>
              <motion.div 
                initial={{ height: "15%" }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-1/3 bg-green-500 rounded-t-lg relative"
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600">Now</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
          >
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Zap size={24} />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Search Permutations</p>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-5xl font-black text-gray-900">1.9K</span>
              <span className="text-sm text-gray-500 mb-2">exact-match targets</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              We dynamically paired 35 Brands × 14 Services × 4 Locations to create thousands of "Kill-Shot" pages that perfectly match exactly what users search for.
            </p>
          </motion.div>

        </div>
      </section>

      {/* GOOGLE SEARCH MOCKUP */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">See It In Action.</h2>
          <p className="text-lg text-gray-500">How Smart Motor intercepts the exact moment a customer's car breaks down.</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-200 overflow-hidden max-w-3xl mx-auto">
          {/* Mock Browser Header */}
          <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-full h-10 flex items-center px-4 gap-3 shadow-inner">
              <Search size={16} className="text-gray-400" />
              <span className="text-gray-800 font-medium">
                {typedQuery}
                <span className="animate-pulse">|</span>
              </span>
            </div>
          </div>

          {/* Mock Search Results */}
          <div className="p-6 md:p-10 bg-white min-h-[400px]">
            <AnimatePresence mode="wait">
              {!isTyping && (
                <motion.div 
                  key={activeQueryIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Smart Motor Result */}
                  <div className="group cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-brand-dark rounded-full flex items-center justify-center">
                        <img src="/branding/logo.png" alt="Logo" className="w-4 h-4 object-contain brightness-0 invert" />
                      </div>
                      <span className="text-sm text-gray-800 font-medium">Smart Motor Auto Repair</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{activeResult.url}</p>
                    <h3 className="text-xl text-[#1a0dab] font-medium group-hover:underline mb-1 leading-snug">
                      {activeResult.title}
                    </h3>
                    
                    {/* Rich Snippets (Rating) */}
                    {activeResult.rating && (
                      <div className="flex items-center gap-1 text-sm mb-1">
                        <span className="text-amber-500">★★★★★</span>
                        <span className="text-gray-600">Rating: {activeResult.rating} · {activeResult.reviews} reviews</span>
                      </div>
                    )}
                    
                    <p className="text-sm text-[#4d5156] leading-relaxed max-w-2xl">
                      {activeResult.snippet}
                    </p>

                    {/* FAQ Rich Snippets */}
                    {activeResult.faq && (
                      <div className="mt-3 border-t border-gray-100 pt-2 space-y-2 max-w-2xl">
                        {activeResult.faq.map((q, i) => (
                          <div key={i} className="flex items-center justify-between text-sm text-[#1a0dab] hover:underline">
                            <span>Q: {q}</span>
                            <ChevronDown size={14} className="text-gray-400" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Competitor Result (Generic) */}
                  <div className="pt-6 border-t border-gray-100 opacity-60 grayscale-[50%]">
                    <p className="text-xs text-gray-500 mb-1">https://quickfitautocenter.com › services</p>
                    <h3 className="text-xl text-[#1a0dab] font-medium mb-1">
                      Auto Repair Workshop in Abu Dhabi | Quick Fit
                    </h3>
                    <p className="text-sm text-[#4d5156] leading-relaxed max-w-2xl">
                      We are the largest auto service center. Bring your car for a free inspection. We fix all models. Best dealer alternative...
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* THE COMPARISON */}
      <section className="bg-white py-24 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">How We Just Out-Engineered Them.</h2>
            <p className="text-lg text-gray-500">QuickFit has volume. But their content is 100% copy-paste. Google penalizes that.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-red-500" />
                <h3 className="text-xl font-bold text-red-900">Competitors (QuickFit)</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-red-800/80">
                  <span className="font-bold text-red-500">✕</span>
                  Exact copy-paste text on every page
                </li>
                <li className="flex gap-3 text-red-800/80">
                  <span className="font-bold text-red-500">✕</span>
                  No JSON-LD structured data
                </li>
                <li className="flex gap-3 text-red-800/80">
                  <span className="font-bold text-red-500">✕</span>
                  Only 6 blog posts targeting specific symptoms
                </li>
                <li className="flex gap-3 text-red-800/80">
                  <span className="font-bold text-red-500">✕</span>
                  Generic images with no SEO Alt-tags
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-200 rounded-full blur-3xl opacity-50"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <CheckCircle2 className="text-emerald-600" />
                <h3 className="text-xl font-bold text-emerald-900">Smart Motor (Now)</h3>
              </div>
              <ul className="space-y-4 relative z-10">
                <li className="flex gap-3 text-emerald-800/80">
                  <span className="font-bold text-emerald-600">✓</span>
                  <strong>100% Unique</strong> technical content generated for all ~490 pages
                </li>
                <li className="flex gap-3 text-emerald-800/80">
                  <span className="font-bold text-emerald-600">✓</span>
                  <strong>11 Schemas Injected</strong> (Google reads this directly)
                </li>
                <li className="flex gap-3 text-emerald-800/80">
                  <span className="font-bold text-emerald-600">✓</span>
                  <strong>New Content Pipeline</strong> catching long-tail symptom searches
                </li>
                <li className="flex gap-3 text-emerald-800/80">
                  <span className="font-bold text-emerald-600">✓</span>
                  <strong>Gov & OEM Authority Links</strong> proving local UAE Trust
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP / NEXT STEPS */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-black mb-8">What's Next?</h2>
        <p className="text-xl text-gray-600 leading-relaxed mb-10">
          The code infrastructure is now <strong>perfect</strong>. It is objectively superior to your competitors.
          From here, the strategy shifts entirely to <span className="font-bold text-brand-dark">Local Trust Signals</span>.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-lg mb-2">1. Google Business Profile</h4>
            <p className="text-sm text-gray-500">Start uploading photos of specific repairs (e.g., "Replacing Range Rover Air Strut") to match the new website pages.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-lg mb-2">2. Specific Reviews</h4>
            <p className="text-sm text-gray-500">Ask customers to mention their specific car and the repair in their reviews, not just "Great service."</p>
          </div>
        </div>
      </section>

    </div>
  )
}