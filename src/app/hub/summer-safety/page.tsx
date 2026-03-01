import type { Metadata } from 'next'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { Sun, Thermometer, Wind, Zap, ShieldAlert, Droplets, Info, ChevronRight, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
    title: 'UAE Summer Safety Hub | Extreme Heat Car Maintenance Abu Dhabi',
    description: 'Protect your luxury vehicle from 50°C+ UAE summer heat. Expert technical tips for AC optimization, tire integrity, cooling systems, and battery health in Abu Dhabi.',
    openGraph: {
        title: 'UAE Summer Car Safety Hub | Smart Motor Abu Dhabi',
        description: 'Protect your car from 50°C+ UAE summer heat. AC, tires, cooling & battery tips.',
        url: 'https://smartmotor.ae/hub/summer-safety',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/hub/summer-safety',
    },
}

const SAFETY_MODULES = [
    {
        id: 'ac-optimization',
        title: 'AC System Optimization',
        description: 'In 50°C heat, your AC works 3x harder. Ensure maximum cooling efficiency and cabin comfort.',
        icon: Wind,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        tips: [
            'Refrigerant pressure check for optimal cooling cycle.',
            'Cabin filter replacement to prevent dust and allergen buildup.',
            'Evaporator cleaning to eliminate bacterial odors.',
            'Precision part: Xpel Nano-Ceramic Tinting for 99% IR heat rejection.'
        ],
        cta: 'Book AC Checkup',
        link: '/#booking'
    },
    {
        id: 'tire-integrity',
        title: 'Tire Integrity & Heat',
        description: 'Road surface temperatures in Abu Dhabi can exceed 70°C. Prevent blowouts and uneven wear.',
        icon: ShieldAlert,
        color: 'text-red-600',
        bg: 'bg-red-50',
        tips: [
            'Nitrogen inflation for stable pressure under extreme heat.',
            'Tread depth analysis for critical grip on hot asphalt.',
            'Rubber compound health check to prevent heat cracking.',
            'Precision part: Michelin Pilot Sport 4S for maximum heat resistance.'
        ],
        cta: 'Inspect Tires',
        link: '/#booking'
    },
    {
        id: 'cooling-systems',
        title: 'Engine Cooling Systems',
        description: 'Critical protection against engine overheating. Ensure your coolant is high-performance grade.',
        icon: Droplets,
        color: 'text-orange-500',
        bg: 'bg-orange-50',
        tips: [
            'Radiator flush and specialized high-boiling point coolant.',
            'Thermostat and water pump integrity inspection.',
            'Cooling fan operation check for stationary traffic.',
            'Precision part: Mobil 1 Advanced Antifreeze & Coolant.'
        ],
        cta: 'Radiator Service',
        link: '/#booking'
    },
    {
        id: 'battery-health',
        title: 'Battery & Electrical',
        description: 'Heat is the #1 killer of car batteries in the UAE. Prevent sudden failures and voltage drops.',
        icon: Zap,
        color: 'text-yellow-500',
        bg: 'bg-yellow-50',
        tips: [
            'Battery load test to verify cold cranking amps (CCA).',
            'Terminal cleaning to ensure optimal conductivity.',
            'Alternator charging output verification.',
            'Precision part: Bosch High-Performance AGM Batteries.'
        ],
        cta: 'Test Battery',
        link: '/#booking'
    }
]

export default function SummerSafetyPage() {
    return (
        <main className="min-h-screen bg-brand-bg">
            <Navbar />

            {/* ── Hero ───────────────────────────────────────────────────────── */}
            <section className="relative pt-48 pb-32 overflow-hidden bg-gradient-to-br from-brand-dark to-[#1a1a1a]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-orange-500/10 blur-[160px] opacity-20" />
                    <div className="absolute inset-0 micro-noise opacity-10" />
                    <div className="absolute inset-0 carbon-fiber opacity-5" />
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8 italic">
                        <AlertTriangle size={14} className="animate-pulse" />
                        Extreme Heat Warning
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.85] mb-8">
                        Summer <span className="text-orange-500">Safety</span> <br />
                        <span className="silver-shine">Intelligence</span>
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto mb-12">
                        UAE summer conditions exceed standard automotive testing limits. We provide the 
                        technical expertise required to keep your luxury vehicle performing at its peak 
                        in 50°C+ Abu Dhabi conditions.
                    </p>
                </div>
            </section>

            {/* ── Real-time Advisory ────────────────────────────────────────── */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="bg-white rounded-[4rem] p-12 border border-gray-100 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
                        
                        <div className="lg:w-1/2 relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                                    <Thermometer size={32} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter italic">UAE Heat Advisory</h2>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Technical Status: Extreme</p>
                                </div>
                            </div>
                            <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">
                                Ambient temperatures in the UAE can reach 52°C, with road surface temperatures exceeding 75°C. 
                                This creates a &quot;Heat Soak&quot; effect that degrades rubber, seals, and fluid viscosity at an 
                                accelerated rate.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-orange-500 text-2xl font-black mb-1">50°C+</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ambient Air</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-red-600 text-2xl font-black mb-1">70°C+</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Road Surface</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="aspect-video bg-brand-dark rounded-[3rem] p-10 flex items-center justify-center relative overflow-hidden group shadow-2xl">
                                <div className="absolute inset-0 carbon-fiber opacity-20" />
                                <div className="relative z-10 text-center">
                                    <Sun size={64} className="text-orange-500 mx-auto mb-6 animate-pulse" />
                                    <p className="text-white text-xl font-black uppercase tracking-tighter italic mb-2">Protect Your Asset</p>
                                    <p className="text-white/40 text-sm font-medium">Summerizing your vehicle is not an option, it&apos;s a necessity in the GCC.</p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Specialized Modules ────────────────────────────────────────── */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {SAFETY_MODULES.map((module) => (
                            <div 
                                key={module.id}
                                className="group bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-brand-red/20 transition-all duration-700 relative overflow-hidden"
                            >
                                <div className={cn("absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-10 transition-opacity", module.bg)} />
                                
                                <div className="flex items-start justify-between mb-10">
                                    <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3", module.bg)}>
                                        <module.icon className={cn("w-10 h-10", module.color)} />
                                    </div>
                                    <div className="p-3 rounded-full bg-gray-50 text-gray-300 group-hover:bg-brand-dark group-hover:text-white transition-all">
                                        <Info size={24} />
                                    </div>
                                </div>

                                <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tighter italic mb-4">{module.title}</h3>
                                <p className="text-gray-500 font-medium text-lg leading-relaxed mb-10">{module.description}</p>

                                <ul className="space-y-4 mb-12">
                                    {module.tips.map((tip, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                                            <span className="text-gray-600 font-medium text-sm leading-relaxed">{tip}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link 
                                    href={module.link}
                                    className="inline-flex items-center gap-2 py-4 px-10 bg-brand-dark text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand-red transition-all shadow-xl"
                                >
                                    {module.cta}
                                    <ChevronRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ─────────────────────────────────────────────────── */}
            <section className="py-24 bg-brand-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic mb-8">
                        Beat the <br /><span className="text-orange-500">Abu Dhabi Heat</span>
                    </h2>
                    <p className="text-white/50 text-lg font-medium leading-relaxed mb-12">
                        Don&apos;t wait for a breakdown. Our Summer Protection packages use world-class precision parts 
                        to ensure your luxury vehicle remains immune to extreme desert conditions.
                    </p>
                    <Link
                        href="/#booking"
                        className="inline-flex items-center gap-3 px-12 py-6 bg-orange-500 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-dark transition-all shadow-2xl"
                    >
                        Schedule Heat Protection
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
