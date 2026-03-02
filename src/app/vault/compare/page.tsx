import { db } from '@/lib/firebase-db'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { VaultClient } from '@/components/hub/vault-client'
import { Gauge, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Virtual Engineering Vault – Supercar Comparison Tool | Smart Motor Abu Dhabi',
    description: 'Compare performance specs, features, and engineering details of the world\'s most elite supercars side-by-side. Powered by Smart Motor Abu Dhabi.',
    openGraph: {
        title: 'Virtual Engineering Vault – Supercar Comparison | Smart Motor',
        description: 'Side-by-side technical comparison of the world\'s most elite supercars.',
        url: 'https://smartmotor.ae/vault/compare',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/vault/compare',
    },
}

export const dynamic = 'force-dynamic'

export default async function VaultPage() {
  let cars: any[] = []
  
  try {
    const q = query(collection(db!, 'car_knowledge'), orderBy('model', 'asc'))
    const snapshot = await getDocs(q)
    cars = snapshot.docs.map(doc => ({
      ...doc.data(),
      slug: doc.id
    }))
  } catch (error) {
    console.error('Error fetching car knowledge:', error)
  }

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
      <div className="mb-20 text-center lg:text-left">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
          <Gauge size={14} className="text-blue-600" />
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">Digital Engineering Archive</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-brand-dark italic italic leading-none mb-6">
          Virtual <span className="text-brand-red">Engineering</span> <br />
          <span className="silver-shine">Vault</span>
        </h1>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.4em] max-w-2xl">
          Side-by-side technical comparison of the world&apos;s most elite supercars.
        </p>
      </div>

      <VaultClient initialCars={cars} />
    </div>
  )
}
