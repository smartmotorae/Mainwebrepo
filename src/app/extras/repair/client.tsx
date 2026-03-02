'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { ChevronLeft, ChevronRight, Zap, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function RepairComparison() {
    const [sliderPos, setSliderPos] = useState(50)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
        setSliderPos((x / rect.width) * 100)
    }

    const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX)
    const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX)

    return (
        <main className="min-h-screen bg-brand-bg">
            <Navbar />
            
            <section className="pt-40 pb-32">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-5xl mx-auto text-center mb-16">
                        <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">Precision Restoration</span>
                        <h1 className="text-5xl md:text-7xl font-black text-brand-dark tracking-tighter uppercase italic leading-[0.85] mb-8">
                            DENT <br />
                            <span className="silver-shine leading-none">ELIMINATION</span>
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                            Drag the slider to witness our master technicians restoring a damaged panel to its factory-perfect state.
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto group">
                        {/* Comparison Slider Container */}
                        <div 
                            ref={containerRef}
                            onMouseMove={onMouseMove}
                            onTouchMove={onTouchMove}
                            className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl cursor-ew-resize select-none bg-brand-dark"
                        >
                            {/* After Image (Full Background) */}
                            <img 
                                src="/images/extras/repair/after.png" 
                                alt="Car body panel after professional dent and paint repair at Smart Motor Abu Dhabi" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Before Image (Clipped) */}
                            <div 
                                className="absolute inset-0 w-full h-full z-10"
                                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                            >
                                <img 
                                    src="/images/extras/repair/before.png" 
                                    alt="Car body panel damage before professional repair at Smart Motor Abu Dhabi" 
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>

                            {/* Slider Handle */}
                            <div 
                                className="absolute inset-y-0 z-20 w-1 bg-white shadow-xl pointer-events-none"
                                style={{ left: `${sliderPos}%` }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-brand-red">
                                    <div className="flex gap-1">
                                        <ChevronLeft size={16} className="text-brand-dark" />
                                        <ChevronRight size={16} className="text-brand-dark" />
                                    </div>
                                </div>
                            </div>

                            {/* Labels */}
                            <div className="absolute top-8 left-8 z-30 px-4 py-2 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg pointer-events-none">
                                DAMAGED
                            </div>
                            <div className="absolute top-8 right-8 z-30 px-4 py-2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg pointer-events-none">
                                RESTORED
                            </div>
                        </div>

                        {/* Feature Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            {[
                                { icon: Zap, label: "Tech Level", val: "PDR Expert" },
                                { icon: Target, label: "Accuracy", val: "99.9%" },
                                { icon: Shield, label: "Warranty", val: "Lifetime" }
                            ].map((stat, i) => (
                                <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-brand-red">
                                        <stat.icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                        <p className="text-xl font-black text-brand-dark italic">{stat.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function Shield({ className, size }: { className?: string, size?: number }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size || 24} 
            height={size || 24} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
    )
}
