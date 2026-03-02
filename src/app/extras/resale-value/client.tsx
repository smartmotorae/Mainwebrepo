'use client'

import { useState } from 'react'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Info } from 'lucide-react'

// Depreciation curves
const generateData = (startValue: number) => {
    const data = []
    let maintained = startValue
    let neglected = startValue
    
    for (let year = 0; year <= 5; year++) {
        data.push({
            year: `Year ${year}`,
            maintained: Math.round(maintained),
            neglected: Math.round(neglected),
            diff: Math.round(maintained - neglected)
        })
        
        // Depreciation rates
        maintained = maintained * 0.85 // 15% depreciation (good)
        neglected = neglected * 0.75   // 25% depreciation (bad)
    }
    return data
}

export default function ResaleValue() {
    const [carValue, setCarValue] = useState(300000)
    const data = generateData(carValue)
    const totalLoss = data[5].diff

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            
            <section className="pt-40 pb-32">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">Financial Intelligence</span>
                        <h1 className="text-5xl md:text-7xl font-black text-brand-dark tracking-tighter uppercase italic leading-none mb-8">
                            Asset <br />
                            <span className="silver-shine leading-none text-gray-300">Projection</span>
                        </h1>
                        <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
                            A Full Service History (FSH) from a reputable center like Smart Motor is an investment. See how it protects your resale value over 5 years.
                        </p>
                    </div>

                    <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 block">Vehicle Purchase Price (AED)</label>
                                <input 
                                    type="number" 
                                    value={carValue}
                                    onChange={(e) => setCarValue(Number(e.target.value))}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-black text-2xl text-brand-dark outline-none focus:border-brand-red transition-all"
                                />
                                <div className="mt-8">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-red mb-1">Projected 5-Year Loss (Neglected)</p>
                                    <p className="text-3xl font-black text-brand-dark">AED {totalLoss.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                        Amount lost solely due to poor maintenance records vs. a Smart Motor FSH.
                                    </p>
                                </div>
                            </div>

                            <div className="lg:col-span-2 h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorMaintained" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#E62329" stopOpacity={0.1}/>
                                                <stop offset="95%" stopColor="#E62329" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorNeglected" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
                                                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                                        <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val/1000}k`} tick={{fontSize: 12, fontWeight: 700}} />
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                                            formatter={(value: any) => [`AED ${Number(value).toLocaleString()}`, '']}
                                        />
                                        <Area type="monotone" dataKey="maintained" stroke="#E62329" fillOpacity={1} fill="url(#colorMaintained)" strokeWidth={3} name="Smart Motor FSH" />
                                        <Area type="monotone" dataKey="neglected" stroke="#94a3b8" fillOpacity={1} fill="url(#colorNeglected)" strokeWidth={3} strokeDasharray="5 5" name="Average Market Condition" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-brand-dark text-white p-6 rounded-2xl">
                            <Info className="shrink-0 text-brand-red" />
                            <p className="text-sm font-medium">
                                <strong className="uppercase tracking-widest text-xs block text-brand-red mb-1">Smart Fact</strong>
                                Luxury buyers in the UAE pay up to 20% premium for cars with a verifiable, digital service history from a Tier-1 workshop.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
