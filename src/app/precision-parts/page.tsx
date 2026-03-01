import type { Metadata } from 'next'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { partnerBrands, PartnerBrand } from '@/lib/partners-data'
import { ShieldCheck, ExternalLink, Zap, Award, Globe, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Precision Parts & World-Class Material Partners | Smart Motor Abu Dhabi',
    description: 'Smart Motor exclusively utilizes world-class brands like XPEL, Brembo, Mobil 1, and Michelin. Explore our matrix of technical partners providing elite car care in Abu Dhabi.',
    openGraph: {
        title: 'Precision Parts & Elite Material Partners | Smart Motor Abu Dhabi',
        description: 'XPEL, Brembo, Mobil 1, Michelin and more. World-class brands for elite car care.',
        url: 'https://smartmotor.ae/precision-parts',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/precision-parts',
    },
}

const CATEGORY_MAP = {
    protection: { label: 'Protection & Gloss', icon: ShieldCheck, color: '#E62329' },
    fluids: { label: 'Fluids & Lubricants', icon: Zap, color: '#FFD700' },
    performance: { label: 'Performance & Safety', icon: Award, color: '#1C69D4' },
    tires: { label: 'Tires & Traction', icon: Globe, color: '#2D6A4F' },
}

export default function PrecisionPartsPage() {
    return (
        <main className="min-h-screen bg-brand-bg technical-grid">
            <Navbar />

            {/* ── Hero ───────────────────────────────────────────────────────── */}
            <section className="relative pt-48 pb-32 overflow-hidden bg-[#0A0A0A]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-brand-red/10 blur-[160px] opacity-20" />
                    <div className="absolute inset-0 micro-noise opacity-5" />
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                    <span className="inline-block py-2 px-6 rounded-full bg-white/5 border border-white/10 text-brand-red text-[10px] font-black uppercase tracking-[0.4em] mb-8 italic">
                        The Authority Matrix
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.85] mb-8">
                        Precision <span className="silver-shine">Parts</span> <br />
                        & Elite Materials
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto mb-12">
                        Luxury engineering demands world-class inputs. We have curated a matrix of the world&apos;s 
                        most authoritative brands to ensure your vehicle remains in peak factory condition.
                    </p>
                </div>
            </section>

            {/* ── Brand Grid ─────────────────────────────────────────────────── */}
            {Object.entries(CATEGORY_MAP).map(([catId, catInfo]) => {
                const brands = partnerBrands.filter(b => b.category === catId)
                const Icon = catInfo.icon

                return (
                    <section key={catId} className="py-24 border-t border-gray-100 first:border-0">
                        <div className="max-w-7xl mx-auto px-6 md:px-12">
                            <div className="flex items-center gap-4 mb-16">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ background: catInfo.color }}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tighter italic">{catInfo.label}</h2>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Industry standard components</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {brands.map((brand) => (
                                    <div 
                                        key={brand.id}
                                        className="group bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-brand-red/20 transition-all duration-700 relative overflow-hidden"
                                    >
                                        {/* Background accent */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[5rem] -z-10 group-hover:bg-brand-red/5 transition-colors duration-700" />
                                        
                                        <div className="h-16 mb-8 flex items-center justify-between">
                                            <div className="h-full w-32 relative">
                                                <div className="text-xl font-black text-brand-dark uppercase italic group-hover:text-brand-red transition-colors">
                                                    {brand.name}
                                                </div>
                                            </div>
                                            {brand.isGCC && (
                                                <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                                    <CheckCircle2 size={10} />
                                                    Official GCC
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8 min-h-[3rem]">
                                            {brand.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                                            <a 
                                                href={brand.officialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-dark hover:text-brand-red transition-colors group/link"
                                            >
                                                Official Portal
                                                <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                            </a>
                                            <Link 
                                                href="/#booking"
                                                className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white transition-all duration-500"
                                            >
                                                <Zap size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            })}

            {/* ── Authority CTA ─────────────────────────────────────────────── */}
            <section className="py-24 bg-brand-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-transparent" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic mb-8">
                        The Best for <br /><span className="text-brand-red">The Best</span>
                    </h2>
                    <p className="text-white/50 text-lg font-medium leading-relaxed mb-12">
                        We don&apos;t compromise on materials because your vehicle doesn&apos;t compromise on engineering. 
                        Experience the difference of world-class parts fitted by certified experts.
                    </p>
                    <Link
                        href="/#booking"
                        className="inline-flex items-center gap-3 px-12 py-6 bg-brand-red text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-dark transition-all shadow-2xl"
                    >
                        Schedule Elite Service
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
