'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { Droplets, Sparkles, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CeramicCoating() {
    const [isSplashing, setIsCalling] = useState(false)

    const handleSplash = () => {
        setIsCalling(true)
        setTimeout(() => setIsCalling(false), 2000)
    }

    return (
        <main className="min-h-screen bg-brand-dark overflow-hidden">
            <Navbar />
            
            <section className="pt-40 pb-32 relative">
                {/* Background Polish */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none" />
                
                <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto mb-16">
                        <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">Surface Protection</span>
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none mb-8">
                            NANO <br />
                            <span className="silver-shine leading-none text-white">CERAMIC</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                            Click the surface to trigger a virtual splash and witness the industry-leading hydrophobic effect of our 9H Nano Ceramic Coating.
                        </p>
                    </div>

                    <div className="relative max-w-5xl mx-auto group">
                        {/* Interactive Area */}
                        <div 
                            onClick={handleSplash}
                            className="relative aspect-video rounded-[4rem] overflow-hidden shadow-2xl cursor-pointer border border-white/10"
                        >
                            <img 
                                src="/images/extras/ceramic/hydrophobic.png" 
                                alt="9H ceramic coating hydrophobic water beading comparison on car paint at Smart Motor Abu Dhabi" 
                                className="w-full h-full object-cover"
                            />

                            {/* Uncoated Label */}
                            <div className="absolute bottom-10 left-10 p-6 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 text-white text-left">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Standard Finish</p>
                                <h3 className="text-xl font-black italic uppercase tracking-tighter">UNCOATED</h3>
                            </div>

                            {/* Coated Label */}
                            <div className="absolute bottom-10 right-10 p-6 bg-brand-red/80 backdrop-blur-xl rounded-2xl border border-white/10 text-white text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Smart Motor Elite</p>
                                <h3 className="text-xl font-black italic uppercase tracking-tighter">9H CERAMIC</h3>
                            </div>

                            {/* Virtual Water Effect (Simulated) */}
                            <AnimatePresence>
                                {isSplashing && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
                                    >
                                        {/* Particle Animation Placeholder */}
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            {[...Array(20)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ x: 0, y: 0, opacity: 1 }}
                                                    animate={{ 
                                                        x: Math.random() * 400 - 200, 
                                                        y: Math.random() * 400 - 200, 
                                                        opacity: 0,
                                                        scale: 0
                                                    }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    className="absolute w-2 h-2 bg-blue-400/50 rounded-full blur-[1px]"
                                                />
                                            ))}
                                            <motion.div 
                                                initial={{ opacity: 0, y: 40 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-white/95 text-brand-dark px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl flex items-center gap-2"
                                            >
                                                <Droplets className="text-blue-500" size={16} /> Contact Angle Measured: 110°
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Why it works */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                            {[
                                { icon: Sparkles, title: "Deep Gloss", desc: "Enhances paint clarity and depth for a mirror-like finish." },
                                { icon: Droplets, title: "Hydrophobic", desc: "Self-cleaning properties that repel water, dirt, and road grime." },
                                { icon: ShieldCheck, title: "UV Barrier", desc: "Permanent protection against Abu Dhabi sun and oxidation." }
                            ].map((item, i) => (
                                <div key={i} className="text-left space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-red border border-white/10">
                                        <item.icon size={24} />
                                    </div>
                                    <h4 className="text-white font-black uppercase italic tracking-tight">{item.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
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
