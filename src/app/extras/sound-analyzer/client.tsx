'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { Mic, Play, Square, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock analysis data
const ANALYSES = {
    'knocking': { label: 'Rod Knock', severity: 'Critical', desc: 'Deep tapping sound. Indicates worn connecting rod bearings. Immediate engine shutdown required.', color: 'text-brand-red' },
    'ticking': { label: 'Lifter Tick', severity: 'Moderate', desc: 'Fast clicking from top of engine. Low oil pressure or valve issue.', color: 'text-amber-500' },
    'whining': { label: 'Belt Whine', severity: 'Low', desc: 'High pitched squeal. Worn serpentine belt or tensioner pulley.', color: 'text-yellow-400' },
    'clean': { label: 'Healthy Idle', severity: 'None', desc: 'Smooth, rhythmic combustion. Optimal operating condition.', color: 'text-emerald-500' }
}

export default function SoundAnalyzer() {
    const [isRecording, setIsRecording] = useState(false)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<keyof typeof ANALYSES | null>(null)
    const [bars, setBars] = useState<number[]>(Array(30).fill(10))

    // Simulate audio visualizer
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isRecording || isAnalyzing) {
            interval = setInterval(() => {
                setBars(prev => prev.map(() => Math.random() * 100))
            }, 50)
        } else {
            setBars(Array(30).fill(10))
        }
        return () => clearInterval(interval)
    }, [isRecording, isAnalyzing])

    const toggleRecording = () => {
        if (isRecording) {
            setIsRecording(false)
            analyze()
        } else {
            setIsRecording(true)
            setResult(null)
            // Auto stop after 3s
            setTimeout(() => {
                setIsRecording(false)
                analyze()
            }, 3000)
        }
    }

    const analyze = () => {
        setIsAnalyzing(true)
        setTimeout(() => {
            setIsAnalyzing(false)
            const scenarios: (keyof typeof ANALYSES)[] = ['knocking', 'ticking', 'whining', 'clean']
            setResult(scenarios[Math.floor(Math.random() * scenarios.length)])
        }, 2000)
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <Navbar />
            
            <section className="pt-40 pb-32">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        
                        <div className="order-2 lg:order-1 relative">
                            <div className="aspect-square rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden bg-brand-dark/50 backdrop-blur-sm">
                                {/* Visualizer Ring */}
                                <div className="absolute inset-0 flex items-center justify-center gap-1">
                                    {bars.map((h, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: `${h}%` }}
                                            className={cn(
                                                "w-2 rounded-full transition-colors",
                                                isRecording ? "bg-brand-red" : "bg-white/20"
                                            )}
                                        />
                                    ))}
                                </div>

                                {/* Record Button */}
                                <button
                                    onClick={toggleRecording}
                                    disabled={isAnalyzing}
                                    className="relative z-10 w-24 h-24 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isRecording ? <Square fill="currentColor" /> : <Mic size={32} />}
                                </button>
                            </div>
                            <p className="text-center mt-8 text-xs font-black uppercase tracking-widest text-gray-500">
                                {isRecording ? 'Listening...' : isAnalyzing ? 'Analyzing Frequency...' : 'Tap to Listen'}
                            </p>
                        </div>

                        <div className="order-1 lg:order-2 space-y-8">
                            <div>
                                <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Acoustic Diagnostics</span>
                                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none mb-6">Engine Sound <br /> Analyzer</h1>
                                <p className="text-gray-400 font-medium leading-relaxed">
                                    Uses simulated AI frequency mapping to identify common engine faults from audible patterns.
                                </p>
                            </div>

                            {/* Results Panel */}
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 min-h-[200px] flex items-center justify-center">
                                {!result && !isAnalyzing && (
                                    <div className="text-center text-gray-600">
                                        <Activity className="mx-auto mb-4 opacity-50" size={32} />
                                        <p className="text-xs font-bold uppercase tracking-widest">Waiting for Audio Input</p>
                                    </div>
                                )}

                                {isAnalyzing && (
                                    <div className="flex items-center gap-3">
                                        <Activity className="text-brand-red animate-pulse" />
                                        <span className="font-mono text-brand-red">PROCESSING_WAVEFORM...</span>
                                    </div>
                                )}

                                {result && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="w-full"
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <span className={cn("text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border border-current", ANALYSES[result].color)}>
                                                {ANALYSES[result].severity} Severity
                                            </span>
                                            {result === 'clean' ? <CheckCircle2 className="text-emerald-500" /> : <AlertTriangle className="text-brand-red" />}
                                        </div>
                                        <h3 className="text-3xl font-black italic uppercase mb-2">{ANALYSES[result].label}</h3>
                                        <p className="text-gray-400 text-sm">{ANALYSES[result].desc}</p>
                                    </motion.div>
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
