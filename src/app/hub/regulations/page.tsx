import type { Metadata } from 'next'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { uaeRegulations, RegulationRule } from '@/lib/regulations-data'
import { Scale, ShieldCheck, AlertCircle, Info, ChevronRight, Gavel, FileText, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
    title: 'UAE Automotive Regulations Guide | Compliance Intelligence Abu Dhabi',
    description: 'Expert technical guide to UAE car regulations. Window tinting limits (VLT), modified exhaust rules, RTA passing standards, and aesthetic modification laws.',
    openGraph: {
        title: 'UAE Automotive Regulations Guide | Smart Motor Abu Dhabi',
        description: 'Window tinting limits, exhaust rules, RTA standards, and modification laws in the UAE.',
        url: 'https://smartmotor.ae/hub/regulations',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/hub/regulations',
    },
}

const CATEGORY_MAP = {
    tinting: { label: 'Window Tinting', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
    exhaust: { label: 'Exhaust & Noise', icon: Gavel, color: 'text-red-600', bg: 'bg-red-50' },
    rta: { label: 'RTA Standards', icon: FileText, color: 'text-brand-dark', bg: 'bg-gray-100' },
    aesthetics: { label: 'Body & Aesthetics', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
}

export default function RegulationsPage() {
    return (
        <main className="min-h-screen bg-brand-bg">
            <Navbar />

            {/* ── Hero ───────────────────────────────────────────────────────── */}
            <section className="relative pt-48 pb-32 overflow-hidden bg-brand-dark">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-brand-red/10 blur-[160px] opacity-20" />
                    <div className="absolute inset-0 micro-noise opacity-10" />
                    <div className="absolute inset-0 carbon-fiber opacity-5" />
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8 italic">
                        <Scale size={14} className="text-brand-red" />
                        Compliance Intelligence
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.85] mb-8">
                        The Smart Way <br />
                        To Stay <span className="text-brand-red">Legal</span>
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto mb-12">
                        UAE automotive regulations are precise. We provide the technical clarity required 
                        to modify, maintain, and drive your luxury vehicle without compliance risks.
                    </p>
                </div>
            </section>

            {/* ── Regulations Grid ────────────────────────────────────────────── */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {uaeRegulations.map((rule) => {
                            const catInfo = CATEGORY_MAP[rule.category]
                            const Icon = catInfo.icon

                            return (
                                <div 
                                    key={rule.id}
                                    className="group bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-brand-red/20 transition-all duration-700 relative overflow-hidden"
                                >
                                    <div className={cn("absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-10 transition-opacity", catInfo.bg)} />
                                    
                                    <div className="flex items-start justify-between mb-10">
                                        <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3", catInfo.bg)}>
                                            <Icon className={cn("w-10 h-10", catInfo.color)} />
                                        </div>
                                        <div className="px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                            <AlertCircle size={12} />
                                            {rule.officialStandard}
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tighter italic mb-4">{rule.title}</h3>
                                    
                                    <div className="flex flex-col gap-4 mb-10">
                                        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                            <p className="text-brand-dark text-xl font-black mb-1">{rule.limit}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Legal Technical Limit</p>
                                        </div>
                                        {rule.penalty && (
                                            <div className="p-6 bg-red-50/50 rounded-3xl border border-red-100/50">
                                                <p className="text-red-600 text-sm font-bold mb-1">{rule.penalty}</p>
                                                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Typical Penalty</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-start gap-4 mb-12 p-6 bg-blue-50/30 rounded-3xl border border-blue-100/30">
                                        <Info size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                                        <p className="text-gray-600 font-medium text-sm leading-relaxed">{rule.technicalAdvice}</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-gray-50">
                                        {rule.precisionPartLink && (
                                            <Link 
                                                href={rule.precisionPartLink.href}
                                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 bg-brand-dark text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-red transition-all shadow-xl"
                                            >
                                                {rule.precisionPartLink.label}
                                                <ChevronRight size={14} />
                                            </Link>
                                        )}
                                        <Link 
                                            href="/#booking"
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 border border-gray-200 text-brand-dark rounded-full text-[10px] font-black uppercase tracking-widest hover:border-brand-dark transition-all"
                                        >
                                            Audit Compliance
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── RTA Audit CTA ─────────────────────────────────────────────── */}
            <section className="py-24 bg-gray-100 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter italic mb-8">
                        Pre-RTA <span className="text-brand-red">Technical Audit</span>
                    </h2>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed mb-12 max-w-3xl mx-auto">
                        Avoid repeated testing and unnecessary fines. Our pre-RTA technical audit ensures 
                        your vehicle meets all safety and compliance standards before you visit the testing center.
                    </p>
                    <Link
                        href="/#booking"
                        className="inline-flex items-center gap-3 px-12 py-6 bg-brand-red text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-dark transition-all shadow-2xl"
                    >
                        Book Technical Audit
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
