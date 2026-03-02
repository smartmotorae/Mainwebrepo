'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { Sun, Shield, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const TINT_LEVELS = [
    { id: 'clear', label: '0%', desc: 'Factory Glass', img: '/images/extras/tinting/clear.png' },
    { id: '30', label: '30%', desc: 'Light Protection', img: '/images/extras/tinting/30.png' },
    { id: '50', label: '50%', desc: 'Optimal Privacy', img: '/images/extras/tinting/50.png' },
    { id: '70', label: '70%', desc: 'Elite Stealth', img: '/images/extras/tinting/70.png' },
]

export default function TintingSimulator() {
    const [selected, setSelected] = useState(TINT_LEVELS[1])

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            
            <section className="pt-40 pb-32">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        {/* Interactive Area */}
                        <div className="lg:col-span-8">
                            <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl bg-brand-dark">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={selected.id}
                                        src={selected.img}
                                        alt={`Tint level ${selected.label}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                                
                                {/* Overlay Stats */}
                                <div className="absolute bottom-10 left-10 p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 text-white z-20">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-red mb-1">Configuration</p>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Level: {selected.label}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="lg:col-span-4 space-y-8">
                            <div>
                                <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Visualizer</span>
                                <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none mb-6">Window <br /> Tinting</h2>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    Experience the aesthetic and functional impact of different tint levels. All our films are UAE-law compliant and provide 99% UV rejection.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {TINT_LEVELS.map((level) => (
                                    <button
                                        key={level.id}
                                        onClick={() => setSelected(level)}
                                        className={cn(
                                            "p-6 rounded-2xl border transition-all text-left group",
                                            selected.id === level.id 
                                                ? "bg-brand-dark border-brand-dark text-white shadow-xl scale-[1.02]" 
                                                : "bg-gray-50 border-gray-100 text-gray-400 hover:border-brand-red/30"
                                        )}
                                    >
                                        <p className={cn(
                                            "text-2xl font-black tracking-tighter mb-1 transition-colors",
                                            selected.id === level.id ? "text-brand-red" : "text-brand-dark"
                                        )}>{level.label}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest leading-none">{level.desc}</p>
                                    </button>
                                ))}
                            </div>

                            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex gap-4">
                                <Info className="text-amber-600 shrink-0" size={20} />
                                <p className="text-xs font-medium text-amber-800 leading-relaxed">
                                    <strong className="block uppercase tracking-widest text-[9px] mb-1">Smart Tip</strong>
                                    We recommend 30% for optimal nighttime visibility while maintaining high heat rejection in the UAE sun.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
