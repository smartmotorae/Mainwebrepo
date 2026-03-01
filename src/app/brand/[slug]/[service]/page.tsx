import type { Metadata } from 'next'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { adminGetAllBrands, adminGetAllServices } from '@/lib/firebase-admin'
import { notFound } from 'next/navigation'
import { ShieldCheck, Wrench, ChevronRight, Zap, Award, Clock, ArrowRight, Gauge, Shield, Ruler } from 'lucide-react'
import Link from 'next/link'

import { Brand, Service } from '@/types'

// Re-use the brand data from the main page for consistency
const BRAND_DATA: Record<string, { accentColor: string }> = {
    bmw: { accentColor: '#1C69D4' },
    mercedes: { accentColor: '#C0A060' },
    porsche: { accentColor: '#E62329' },
    'range-rover': { accentColor: '#2D6A4F' },
    toyota: { accentColor: '#EB0A1E' },
    nissan: { accentColor: '#C3002F' },
    audi: { accentColor: '#BB0A21' },
    lexus: { accentColor: '#8B0000' },
    lamborghini: { accentColor: '#FFD700' }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, service: string }> }): Promise<Metadata> {
    const { slug, service: serviceSlug } = await params
    const allBrands = await adminGetAllBrands()
    const allServices = await adminGetAllServices()
    
    const brand = allBrands.find(b => b.slug === slug)
    const service = allServices.find(s => s.slug === serviceSlug)

    if (!brand || !service) return { title: 'Service Not Found' }

    const title = `Best ${brand.name} ${service.name} in Abu Dhabi UAE | Smart Motor`
    const description = `Certified ${brand.name} ${service.name} specialists in Musaffah, Abu Dhabi. Elite precision, OEM parts, and specialized UAE climate care. Book your ${brand.name} today.`

    return {
        title,
        description,
        keywords: `${brand.name} ${service.name} abu dhabi, ${brand.name} specialized repair uae, ${service.name} for ${brand.name}`,
        openGraph: {
            title,
            description,
            url: `https://smartmotor.ae/brand/${slug}/${serviceSlug}`,
            siteName: 'Smart Motor',
            type: 'website',
        },
        alternates: {
            canonical: `https://smartmotor.ae/brand/${slug}/${serviceSlug}`,
        },
    }
}

export default async function BrandServicePage({ params }: { params: Promise<{ slug: string, service: string }> }) {
    const { slug, service: serviceSlug } = await params
    const allBrands = await adminGetAllBrands()
    const allServices = await adminGetAllServices()

    const brand = allBrands.find(b => b.slug === slug)
    const service = allServices.find(s => s.slug === serviceSlug)

    if (!brand || !service) notFound()

    const accentColor = BRAND_DATA[slug.toLowerCase()]?.accentColor || '#E62329'

    const features = [
        { icon: Award, title: 'Brand Specialist', desc: `Certified ${brand.name} expertise` },
        { icon: Ruler, title: 'Precision Spec', desc: 'Manufacturer tolerances met' },
        { icon: Shield, title: 'UAE Warranty', desc: '12-month assurance' },
    ]

    return (
        <main className="min-h-screen bg-brand-bg">
            <Navbar />

            {/* ── SEO Header ─────────────────────────────────────────────────── */}
            <section className="relative pt-48 pb-32 overflow-hidden bg-[#0A0A0A]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[160px] opacity-10" style={{ background: accentColor }} />
                    <div className="absolute inset-0 micro-noise opacity-5" />
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                                <ShieldCheck size={14} className="text-brand-red" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{brand.name} Elite Care</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] text-white">
                                {service.name} <br />
                                <span style={{ color: accentColor }}>for {brand.name}</span>
                            </h1>
                            <p className="text-white/40 text-lg lg:text-xl font-medium tracking-wide max-w-2xl">
                                Abu Dhabi&apos;s premier technical hub for specialized {brand.name} maintenance. 
                                Precision engineering meets Musaffah&apos;s most elite workshop.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] text-center lg:text-left">
                            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-red mb-2">Service Standard</p>
                            <p className="text-2xl font-black text-white italic mb-6">UAE FIRST-CLASS</p>
                            <Link
                                href="/#booking"
                                className="inline-flex items-center gap-2 bg-brand-red text-white rounded-full px-10 py-5 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
                            >
                                Book Inspection
                                <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Feature Grid ───────────────────────────────────────────────── */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((f) => (
                            <div key={f.title} className="p-10 bg-brand-bg rounded-[2.5rem] border border-gray-100 group hover:border-brand-red/20 transition-all duration-500">
                                <f.icon className="text-brand-red mb-6" size={32} />
                                <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter mb-2 italic">{f.title}</h3>
                                <p className="text-gray-500 font-medium text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Deep Content ───────────────────────────────────────────────── */}
            <section className="py-24 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                        <div className="lg:col-span-7 space-y-8">
                            <h2 className="text-4xl font-black tracking-tighter uppercase italic text-brand-dark">
                                Specialized Engineering for <br /><span className="silver-shine">{brand.name} Systems</span>
                            </h2>
                            <div className="prose prose-lg text-gray-600 font-medium leading-relaxed">
                                <p>
                                    At Smart Motor, we understand that a {brand.name} is not just a car—it&apos;s a feat of engineering. 
                                    Our {service.name} protocol for {brand.name} vehicles uses factory-certified tooling 
                                    specifically calibrated for the {brand.origin || 'manufacturer'} standards.
                                </p>
                                <p>
                                    Whether you drive a high-performance sports model or a luxury sedan, our team in 
                                    Musaffah M9 ensures your vehicle remains within factory tolerances while optimizing 
                                    for the UAE&apos;s extreme environmental conditions.
                                </p>
                            </div>
                            
                            <ul className="space-y-4 pt-6">
                                {[
                                    `Full ${brand.name} system diagnostic report`,
                                    'OEM genuine parts installation',
                                    'UAE-climate optimized lubricants and materials',
                                    'Certified master technician sign-off'
                                ].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-brand-dark">
                                        <div className="w-2 h-2 rounded-full bg-brand-red" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="aspect-square bg-white rounded-[4rem] p-1 shadow-2xl border border-gray-100 overflow-hidden group">
                                <div className="w-full h-full rounded-[3.8rem] overflow-hidden relative">
                                    <img 
                                        src={service.image || '/bg-placeholder.jpg'} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                        alt={`${brand.name} ${service.name} Excellence`}
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Dynamic Leyla Integration ──────────────────────────────────── */}
            <section className="py-24 bg-brand-dark relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-10" style={{ background: accentColor }} />
                
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                    <div className="w-20 h-20 bg-brand-red rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-12">
                        <Wrench className="text-white" size={32} />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic mb-6">
                        Leyla&apos;s Expert Directive: <br />
                        <span className="text-brand-red">{brand.name} Performance</span>
                    </h3>
                    <p className="text-white/60 text-lg font-medium leading-relaxed max-w-3xl mx-auto mb-12">
                        &quot;For {brand.name} owners in Abu Dhabi, {service.name} isn&apos;t just maintenance—it&apos;s insurance against the heat. 
                        I recommend a full check every summer transition to ensure your {brand.name}&apos;s precision cooling and protection systems are 100% efficient.&quot;
                    </p>
                    <Link
                        href="/leyla"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-brand-dark rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-red hover:text-white transition-all shadow-2xl group"
                    >
                        Talk to Leyla for More
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
