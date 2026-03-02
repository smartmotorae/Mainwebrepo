'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { Activity, AlertTriangle, CheckCircle2, Cpu, Database, Gauge, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

// Mock Telemetry Data
const generateData = () => [...Array(20)].map((_, i) => ({
    name: i,
    value: 60 + Math.random() * 40
}))

export default function LiveDiagnostics() {
    const [data, setData] = useState(generateData())
    const [isScanning, setIsScanning] = useState(false)
    const [status, setStatus] = useState<'idle' | 'scanning' | 'complete'>('idle')

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => [...prev.slice(1), { name: prev.length, value: 60 + Math.random() * 40 }])
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const startScan = () => {
        setStatus('scanning')
        setTimeout(() => setStatus('complete'), 3000)
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />
            
            <section className="pt-40 pb-32">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-12">
                        
                        {/* Control Panel */}
                        <div className="lg:w-1/3 space-y-8">
                            <div>
                                <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Telemetry v2.0</span>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none mb-6">Real-Time <br /> Diagnostics</h2>
                                <p className="text-gray-400 font-medium leading-relaxed">
                                    Our proprietary diagnostic interface communicates directly with your vehicle's ECU to identify potential issues before they become critical.
                                </p>
                            </div>

                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Cpu className="text-brand-red" size={20} />
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">ECU Connection</span>
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-emerald-500">Established</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Database className="text-brand-red" size={20} />
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Database Sync</span>
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-emerald-500">Active</span>
                                </div>
                                
                                <Button 
                                    onClick={startScan}
                                    disabled={status === 'scanning'}
                                    className="w-full h-14 bg-brand-red hover:bg-white hover:text-brand-red rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-brand-red/20"
                                >
                                    {status === 'scanning' ? <Loader2 className="animate-spin" /> : 'Start Full System Scan'}
                                </Button>
                            </div>
                        </div>

                        {/* Visualizer Area */}
                        <div className="lg:w-2/3 space-y-8">
                            <div className="bg-[#111] rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl -mr-32 -mt-32" />
                                
                                <div className="relative z-10 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                                            <Activity size={16} className="text-brand-red" /> Live Data Stream
                                        </h3>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-[8px] font-black uppercase text-gray-400">Stable</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chart */}
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={data}>
                                                <defs>
                                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#E62329" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#E62329" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                                <XAxis hide />
                                                <YAxis hide domain={[0, 120]} />
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                                                    itemStyle={{ color: '#E62329', fontWeight: 'bold' }}
                                                />
                                                <Area 
                                                    type="monotone" 
                                                    dataKey="value" 
                                                    stroke="#E62329" 
                                                    fillOpacity={1} 
                                                    fill="url(#colorValue)" 
                                                    strokeWidth={3}
                                                    isAnimationActive={false}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* Scan Result Overlay */}
                                    <AnimatePresence>
                                        {status === 'complete' && (
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 z-20 bg-black/80 backdrop-blur-md flex items-center justify-center p-8"
                                            >
                                                <div className="text-center space-y-6 max-w-sm">
                                                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/50">
                                                        <CheckCircle2 size={40} className="text-emerald-500" />
                                                    </div>
                                                    <h4 className="text-2xl font-black uppercase italic tracking-tighter">Scan Complete</h4>
                                                    <p className="text-gray-400 text-sm font-medium">All primary systems operating within manufacturer specifications. No faults detected.</p>
                                                    <Button 
                                                        variant="outline" 
                                                        onClick={() => setStatus('idle')}
                                                        className="rounded-full border-white/10 text-white hover:bg-white hover:text-brand-dark"
                                                    >
                                                        Dismiss Report
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Gauges Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: "Oil Temp", val: "92°C", color: "text-brand-red" },
                                    { label: "Pressure", val: "4.2 Bar", color: "text-white" },
                                    { label: "Battery", val: "14.1V", color: "text-white" },
                                    { label: "Coolant", val: "88°C", color: "text-white" }
                                ].map((gauge, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                                        <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 mb-2">{gauge.label}</p>
                                        <p className={cn("text-xl font-black italic tracking-tighter", gauge.color)}>{gauge.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function Button({ className, children, onClick, disabled, variant = 'primary' }: any) {
    return (
        <button 
            disabled={disabled}
            onClick={onClick}
            className={cn(
                "inline-flex items-center justify-center px-6 py-3 transition-all",
                variant === 'primary' ? "bg-brand-red text-white" : "bg-transparent border border-white/20 text-white",
                className
            )}
        >
            {children}
        </button>
    )
}
