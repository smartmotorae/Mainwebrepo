'use client'

import { useState } from 'react'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { motion } from 'framer-motion'
import { Fan, ThermometerSnowflake, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ACEfficiency() {
    const [gasLevel, setGasLevel] = useState(100) // Percentage

    // Physics sim
    const getVentTemp = (level: number) => {
        // Optimal is 100%. Lower gas = higher vent temp.
        // Base temp 4°C. +1°C for every 10% gas loss.
        return 4 + ((100 - level) / 10) * 2.5
    }

    const getCoolingTime = (level: number) => {
        // Minutes to cool from 45°C to 24°C
        // Base 5 mins. Increases exponentially.
        return 5 + ((100 - level) / 10) * 3
    }

    const ventTemp = getVentTemp(gasLevel)
    const time = getCoolingTime(gasLevel)

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <Navbar />
            
            <section className="pt-40 pb-32">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        
                        <div className="relative aspect-video lg:aspect-square bg-black rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
                            {/* Thermal Image Background */}
                            <img 
                                src="/images/extras/ac/thermal.png" 
                                alt="Car AC thermal efficiency diagnostic scan showing heat distribution at Smart Motor Abu Dhabi" 
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                            />
                            
                            {/* Dynamic Overlay based on Gas Level */}
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-red/50 to-transparent mix-blend-overlay" style={{ opacity: (100 - gasLevel) / 100 }} />
                            
                            <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                                <div className="flex items-center gap-4 mb-2">
                                    <ThermometerSnowflake className={cn("w-8 h-8", ventTemp < 10 ? "text-blue-400" : "text-brand-red")} />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Vent Output</p>
                                        <p className="text-3xl font-black italic">{ventTemp.toFixed(1)}°C</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div>
                                <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Summer Readiness</span>
                                <h1 className="text-5xl font-black text-white uppercase italic leading-none mb-6">Climate <br /> Control Lab</h1>
                                <p className="text-gray-400 font-medium leading-relaxed">
                                    AC gas isn't just fuel; it carries the oil that lubricates your compressor. Low gas levels cause both poor cooling and catastrophic compressor failure.
                                </p>
                            </div>

                            <div className="space-y-8 bg-white/5 p-8 rounded-[2rem] border border-white/10">
                                <div>
                                    <label className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-white mb-4">
                                        <span>Refrigerant Level</span>
                                        <span className={cn(gasLevel < 70 ? "text-brand-red" : "text-emerald-500")}>{gasLevel}%</span>
                                    </label>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        value={gasLevel} 
                                        onChange={(e) => setGasLevel(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                    <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-500">
                                        <span>Empty</span>
                                        <span>Critical</span>
                                        <span>Optimal</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Cooling Time (45°→24°)</p>
                                        <p className="text-2xl font-black text-white">{Math.round(time)} <span className="text-sm text-gray-500">min</span></p>
                                    </div>
                                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Compressor Load</p>
                                        <p className={cn("text-2xl font-black", gasLevel < 50 ? "text-brand-red" : "text-emerald-500")}>
                                            {gasLevel < 50 ? "EXTREME" : "NORMAL"}
                                        </p>
                                    </div>
                                </div>

                                {gasLevel < 60 && (
                                    <div className="flex items-start gap-3 text-brand-red bg-brand-red/10 p-4 rounded-xl border border-brand-red/20">
                                        <AlertCircle className="shrink-0 mt-0.5" size={18} />
                                        <p className="text-xs font-bold leading-relaxed">
                                            Warning: Low refrigerant levels prevent oil circulation, leading to compressor seizure. Service recommended immediately.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
