import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Sparkles, Wrench, Sun, Droplets, Activity, Mic, Disc, Droplet, TrendingUp, ThermometerSnowflake } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Interactive Car Tools & Simulators | Smart Motor Abu Dhabi',
    description: 'Explore Smart Motor\'s interactive automotive tools: engine sound analyzer, tire safety lab, oil viscosity simulator, resale value AI, AC efficiency lab, tinting simulator and more.',
    openGraph: {
        title: 'Interactive Car Tools & Simulators | Smart Motor',
        description: 'AI-powered automotive tools and interactive simulators from Smart Motor Abu Dhabi.',
        url: 'https://smartmotor.ae/extras',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/extras',
    },
}

const experimentals = [
    {
        title: "Engine Sound Analyzer",
        desc: "AI-driven audio diagnostics to identify engine faults from sound patterns.",
        href: "/extras/sound-analyzer",
        icon: Mic,
        color: "text-brand-red"
    },
    {
        title: "Tire Safety Lab",
        desc: "Visualize tread wear impact on braking distance and safety.",
        href: "/extras/tire-lab",
        icon: Disc,
        color: "text-gray-400"
    },
    {
        title: "Oil Viscosity Sim",
        desc: "Interactive fluid dynamics showing why oil weight matters.",
        href: "/extras/oil-viscosity",
        icon: Droplet,
        color: "text-amber-500"
    },
    {
        title: "Resale Value AI",
        desc: "Project your car's future value based on maintenance history.",
        href: "/extras/resale-value",
        icon: TrendingUp,
        color: "text-emerald-500"
    },
    {
        title: "AC Efficiency Lab",
        desc: "Thermal visualization of cooling performance vs gas levels.",
        href: "/extras/ac-efficiency",
        icon: ThermometerSnowflake,
        color: "text-blue-500"
    },
    {
        title: "Tinting Simulator",
        desc: "Visualize different tint levels on luxury vehicles in real-time.",
        href: "/extras/tinting",
        icon: Sun,
        color: "text-amber-500"
    },
    {
        title: "Repair Comparison",
        desc: "Interactive slider showing our precision dent repair capabilities.",
        href: "/extras/repair",
        icon: Wrench,
        color: "text-brand-red"
    },
    {
        title: "Hydrophobic Effect",
        desc: "See how our ceramic coating repels water and protects paint.",
        href: "/extras/ceramic",
        icon: Droplets,
        color: "text-blue-500"
    },
    {
        title: "Live Diagnostics",
        desc: "Simulated real-time engine telemetry and fault detection.",
        href: "/extras/diagnostics",
        icon: Activity,
        color: "text-emerald-500"
    }
]

export default function ExtrasPage() {
    return (
        <main className="min-h-screen bg-brand-bg">
            
            <section className="pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/blog/textures/paper-grain.png')] opacity-20 pointer-events-none mix-blend-multiply" />
                
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                    <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">
                        The Lab
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black text-brand-dark tracking-tighter uppercase leading-[0.85] italic mb-8 text-balance">
                        EXPERIMENTAL <br />
                        <span className="silver-shine leading-none">EXPERIENCES</span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Interactive tools and prototypes designed to showcase the future of automotive service technology.
                    </p>
                </div>
            </section>

            <section className="pb-32 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {experimentals.map((item, i) => (
                        <Link 
                            key={item.title} 
                            href={item.href}
                            className="group relative bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-red/5 transition-colors" />
                            
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-brand-dark group-hover:text-white transition-all">
                                    <item.icon className={item.color} size={32} />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight italic mb-4 text-brand-dark group-hover:text-brand-red transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 font-medium leading-relaxed mb-8 max-w-xs">
                                    {item.desc}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-dark">
                                    Launch Module <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    )
}
