'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function TireLab() {
    const [treadDepth, setTreadDepth] = useState(8) // mm

    const getStopDistance = (depth: number) => {
        // Base distance 40m at 8mm. Increases exponentially below 3mm.
        if (depth >= 8) return 40
        return 40 + (Math.pow(8 - depth, 2) * 1.5)
    }

    const getRiskLevel = (depth: number) => {
        if (depth < 1.6) return { label: 'ILLEGAL', color: 'text-brand-red', bg: 'bg-brand-red' }
        if (depth < 3) return { label: 'CRITICAL', color: 'text-amber-500', bg: 'bg-amber-500' }
        if (depth < 5) return { label: 'WARNING', color: 'text-yellow-400', bg: 'bg-yellow-400' }
        return { label: 'OPTIMAL', color: 'text-emerald-500', bg: 'bg-emerald-500' }
    }

    const risk = getRiskLevel(treadDepth)
    const distance = getStopDistance(treadDepth)

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            
            <section className="pt-40 pb-32">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">Safety Lab</span>
                        <h1 className="text-5xl md:text-7xl font-black text-brand-dark tracking-tighter uppercase italic leading-none mb-8">
                            Tire Safety <br />
                            <span className="silver-shine leading-none text-gray-300">Simulator</span>
                        </h1>
                    </div>

                    <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-xl relative overflow-hidden">
                        
                        {/* Visualization */}
                        <div className="flex flex-col items-center mb-16 relative z-10">
                            {/* Tire Cross Section (CSS) */}
                            <div className="w-64 h-40 bg-[#1a1a1a] rounded-t-3xl relative overflow-hidden border-x-4 border-t-4 border-[#333] shadow-2xl">
                                {/* Grooves */}
                                <div className="absolute top-0 inset-x-0 h-full flex justify-center gap-4">
                                    {[1, 2, 3].map(i => (
                                        <motion.div 
                                            key={i}
                                            animate={{ height: `${(treadDepth / 10) * 100}%` }}
                                            className="w-4 bg-gray-50/10 rounded-b-lg border-x border-b border-black/50"
                                        />
                                    ))}
                                </div>
                                <div className="absolute bottom-2 right-4 text-xs font-mono text-gray-500">{treadDepth}mm</div>
                            </div>
                            {/* Road */}
                            <div className="w-full max-w-lg h-1 bg-gray-300 rounded-full mt-1 relative">
                                {treadDepth < 3 && <div className="absolute inset-0 bg-blue-400/30 animate-pulse" />} 
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">Surface Contact</p>
                        </div>

                        {/* Controls & Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div>
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-4">Adjust Tread Depth (mm)</label>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="10" 
                                        step="0.1"
                                        value={treadDepth} 
                                        onChange={(e) => setTreadDepth(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-dark"
                                    />
                                    <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400">
                                        <span>Bald (0mm)</span>
                                        <span>Legal Limit (1.6mm)</span>
                                        <span>New (8mm)</span>
                                    </div>
                                </div>

                                <div className={cn("p-6 rounded-2xl border flex items-start gap-4 transition-colors", risk.label === 'OPTIMAL' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100')}>
                                    {risk.label === 'OPTIMAL' ? <Info className="text-emerald-600" /> : <ShieldAlert className="text-brand-red" />}
                                    <div>
                                        <h4 className={cn("font-black uppercase text-sm mb-1", risk.label === 'OPTIMAL' ? 'text-emerald-700' : 'text-brand-red')}>{risk.label} Condition</h4>
                                        <p className="text-xs font-medium text-gray-600 leading-relaxed">
                                            {treadDepth < 1.6 ? "Vehicle is illegal to drive. Insurance void. Hydroplaning guaranteed." : 
                                             treadDepth < 3 ? "Braking distance compromised. Replace immediately." : 
                                             "Tire is performing within safety specifications."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Wet Braking Distance (100-0 km/h)</p>
                                <div className="text-5xl font-black text-brand-dark italic mb-2 tracking-tighter">
                                    {distance.toFixed(1)} <span className="text-2xl text-gray-400 not-italic">meters</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
                                    <motion.div 
                                        animate={{ width: `${(distance / 100) * 100}%` }}
                                        className={cn("h-full rounded-full transition-all", risk.bg)}
                                    />
                                </div>
                                <p className="text-[10px] font-bold text-gray-400 mt-4">
                                    {distance > 40 ? `+${(distance - 40).toFixed(1)}m penalty vs new tires` : 'Factory Spec Performance'}
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
