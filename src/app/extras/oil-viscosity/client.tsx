'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { Droplet, Thermometer, Gauge } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function OilViscosity() {
    const [temp, setTemp] = useState(25) // Celsius
    const [oilType, setOilType] = useState<'0W-20' | '10W-40' | '20W-50'>('10W-40')

    const getFlowRate = (type: string, t: number) => {
        // Higher is faster. 
        // Cold: 0W is fast, 20W is slow (sludge).
        // Hot: All thin out, but 50W stays thicker (slower flow than 20).
        let baseViscosity = 0;
        if (type === '0W-20') baseViscosity = 2;
        if (type === '10W-40') baseViscosity = 5;
        if (type === '20W-50') baseViscosity = 8;

        // Viscosity decreases as temp increases (flow rate increases)
        // But rate of change depends on the VI improvers (simplified model)
        const heatFactor = (t + 20) / 100; // 0.2 to 1.4
        
        // Inverse viscosity = flow
        return (10 - baseViscosity) * heatFactor * 2;
    }

    const flowSpeed = getFlowRate(oilType, temp); // 0 to ~20

    return (
        <main className="min-h-screen bg-brand-bg">
            <Navbar />
            
            <section className="pt-40 pb-32">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        
                        {/* Simulation */}
                        <div className="lg:w-1/2 w-full">
                            <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                    <Droplet size={200} />
                                </div>

                                <div className="flex justify-between items-end h-[400px] gap-8 relative z-10">
                                    {/* Engine Channel */}
                                    <div className="flex-1 bg-gray-100 rounded-2xl relative overflow-hidden border-x border-gray-200">
                                        <div className="absolute inset-0 flex flex-col gap-2 p-2">
                                            {/* Oil Particles */}
                                            {[...Array(15)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ y: [0, 400] }}
                                                    transition={{ 
                                                        repeat: Infinity, 
                                                        duration: 20 / (flowSpeed + 0.1), // Slower is higher duration
                                                        ease: "linear",
                                                        delay: i * 0.5 
                                                    }}
                                                    className={cn(
                                                        "w-full rounded-full opacity-80 backdrop-blur-sm",
                                                        temp < 0 ? "bg-amber-900" : temp > 90 ? "bg-amber-300" : "bg-amber-500",
                                                        flowSpeed < 2 ? "h-6 scale-x-110" : "h-3" // Sludge looks thicker
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Stats */}
                                    <div className="space-y-6 w-32 shrink-0">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Flow Rate</p>
                                            <div className="text-2xl font-black italic">{flowSpeed.toFixed(1)} <span className="text-xs text-gray-400 not-italic">L/min</span></div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">State</p>
                                            <div className={cn(
                                                "text-sm font-bold px-3 py-1 rounded-full w-fit",
                                                flowSpeed < 2 ? "bg-red-100 text-red-600" : flowSpeed > 10 ? "bg-yellow-100 text-yellow-600" : "bg-emerald-100 text-emerald-600"
                                            )}>
                                                {flowSpeed < 2 ? "Sludge" : flowSpeed > 10 ? "Thin" : "Optimal"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="lg:w-1/2 w-full space-y-12">
                            <div>
                                <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Lubrication Physics</span>
                                <h1 className="text-5xl font-black text-brand-dark uppercase italic leading-none mb-6">Viscosity <br /> Dynamics</h1>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    Understand why cold starts damage engines. Using the wrong weight oil (e.g., 20W-50 in a modern engine) prevents flow at startup.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <label className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-brand-dark mb-4">
                                        <span className="flex items-center gap-2"><Thermometer size={16} /> Ambient Temperature</span>
                                        <span className="text-brand-red">{temp}°C</span>
                                    </label>
                                    <input 
                                        type="range" 
                                        min="-20" 
                                        max="120" 
                                        value={temp} 
                                        onChange={(e) => setTemp(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-red"
                                    />
                                    <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400">
                                        <span>Freezing (-20°)</span>
                                        <span>Cold Start (25°)</span>
                                        <span>Operating (100°)</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4 block">Select Oil Weight</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['0W-20', '10W-40', '20W-50'].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setOilType(type as any)}
                                                className={cn(
                                                    "py-4 rounded-xl border font-black text-sm transition-all",
                                                    oilType === type 
                                                        ? "bg-brand-dark border-brand-dark text-white shadow-xl scale-105" 
                                                        : "bg-white border-gray-200 text-gray-400 hover:border-brand-red/30"
                                                )}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
