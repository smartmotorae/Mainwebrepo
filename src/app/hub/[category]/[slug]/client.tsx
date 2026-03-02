'use client'

import { motion } from 'framer-motion'
import { BookOpen, ShieldCheck, ChevronLeft, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getContent } from '@/lib/firebase-db'

interface ArticleData {
  title: string
  content: string
  service: string
}

interface HubArticleClientProps {
  category: string
  slug: string
  serverArticle: ArticleData | null
}

export default function HubArticleClient({ category, slug, serverArticle }: HubArticleClientProps) {
  const [article, setArticle] = useState<ArticleData | null>(serverArticle)
  const [loading, setLoading] = useState(!serverArticle)
  
  // Only fetch client-side if server didn't provide data
  useEffect(() => {
    if (serverArticle) return
    async function fetchArticle() {
      try {
        const data = await getContent(slug)
        if (data) {
          setArticle({
            title: data.title,
            content: data.content,
            service: data.recommendedService || 'Full Vehicle Inspection'
          })
        }
      } catch (error) {
        console.error('Error fetching hub article:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [slug, serverArticle])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-brand-red" />
      </div>
    )
  }

  const displayArticle = article || {
    title: slug.split('-').join(' ').toUpperCase(),
    content: 'This regulatory guide is currently being updated by the Smart Motor SEO Swarm. Please check back shortly for the latest UAE standards.',
    service: 'Full Vehicle Inspection'
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 lg:py-32 pb-40">
      <div className="mb-12">
        <Link 
          href="/hub"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-red transition-colors group"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Return to Hub
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
            <BookOpen size={14} className="text-brand-dark" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{category.replace('-', ' ')}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-brand-dark italic leading-tight">
            {displayArticle.title}
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="text-gray-600 font-medium leading-relaxed whitespace-pre-wrap text-lg">
            {displayArticle.content}
          </div>
        </div>

        {/* Dynamic Service CTA */}
        <div className="p-12 bg-brand-dark rounded-[3rem] relative overflow-hidden group">
          <div className="absolute inset-0 carbon-fiber opacity-10" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-brand-red" size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Compliance Recommended</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-none">
                Stay Compliant with our <br />
                <span className="text-brand-red">{displayArticle.service}</span>
              </h3>
            </div>
            <Link 
              href="/#booking"
              className="px-10 py-5 bg-brand-red text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-dark transition-all shadow-2xl flex items-center gap-3 group"
            >
              Secure Inspection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
