'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Mic, PhoneOff, Settings, Volume2, ShieldCheck, Sparkles, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useNativeAudio } from '@/hooks/use-native-audio'
import { toast } from 'sonner'

/**
 * Immersive voice-centric AI assistant page for Leyla.
 * Features real-time visualizers and encrypted communication status.
 */
export default function LeylaVoiceClient() {
    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
        setMounted(true)
    }, [])

    const {
        isStreaming,
        isConnected,
        error,
        transcript,
        startListening,
        stopListening,
        reset
    } = useNativeAudio('leyla-voice-session', 'Zephyr')

    const [isCalling, setIsCalling] = useState(false)

    const handleToggleCall = async () => {
        if (!isConnected) {
            toast.error('AI Connection not ready yet. Please wait.')
            return
        }

        if (isCalling) {
            stopListening()
            setIsCalling(false)
        } else {
            setIsCalling(true)
            await startListening()
        }
    }

    if (!mounted) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-between p-8 md:p-12 overflow-hidden relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />
            
            {/* Top Navigation */}
            <header className="w-full max-w-7xl flex items-center justify-between z-10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6">
                        <span className="font-black text-xs italic tracking-tighter">SM</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] italic opacity-50 group-hover:opacity-100 transition-opacity">Back to HQ</span>
                </Link>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className={cn(
                            "w-2 h-2 rounded-full animate-pulse",
                            isConnected ? "bg-emerald-500" : "bg-amber-500"
                        )} />
                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                            {isConnected ? "Leyla Core v2.5 Online" : "Connecting to Core..."}
                        </span>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                        <Settings size={20} className="text-gray-400" />
                    </Button>
                </div>
            </header>

            {/* Error Overlay */}
            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-24 z-50 bg-red-500/20 border border-red-500/50 backdrop-blur-xl px-6 py-3 rounded-2xl flex items-center gap-3"
                    >
                        <AlertCircle size={20} className="text-red-500" />
                        <span className="text-xs font-bold">{error}</span>
                        <button onClick={reset} className="text-[10px] uppercase font-black tracking-widest bg-white/10 px-2 py-1 rounded">Reset</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Central AI Visualization */}
            <main className="flex-1 flex flex-col items-center justify-center w-full z-10 relative">
                <div className="relative w-64 h-64 md:w-96 md:h-96">
                    {/* Outer Rings */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-white/5 rounded-full"
                    />
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border border-white/10 rounded-full border-dashed"
                    />
                    
                    {/* The Core Orb */}
                    <div className="absolute inset-16 md:inset-24 flex items-center justify-center">
                        <motion.div 
                            animate={isCalling ? {
                                scale: [1, 1.1, 1],
                                opacity: [0.8, 1, 0.8],
                                boxShadow: [
                                    "0 0 40px rgba(230, 35, 41, 0.3)",
                                    "0 0 80px rgba(230, 35, 41, 0.6)",
                                    "0 0 40px rgba(230, 35, 41, 0.3)"
                                ]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-full h-full bg-gradient-to-br from-brand-red to-[#991b1b] rounded-full flex items-center justify-center relative shadow-2xl"
                        >
                            <Sparkles size={40} className="text-white/20 absolute" />
                            {isCalling && (
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-brand-red rounded-full"
                                />
                            )}
                        </motion.div>
                    </div>
                </div>

                <div className="mt-12 text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
                        {!isConnected ? "System Initializing" : isCalling ? "Leyla is Listening" : "Talk to Leyla"}
                    </h1>
                    <p className="text-gray-400 font-medium text-sm md:text-lg max-w-md mx-auto leading-relaxed">
                        {!isConnected 
                            ? "Establishing secure bridge to Smart Motor Intelligence Hub..."
                            : isCalling 
                                ? "I'm processing your request in real-time. Go ahead, I'm all ears!" 
                                : "Your 24/7 luxury concierge. Ask about services, check availability, or just say hello."
                        }
                    </p>
                    {transcript && (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            className="text-white/60 text-sm font-medium mt-4 italic max-w-lg mx-auto line-clamp-2"
                        >
                            "{transcript}"
                        </motion.div>
                    )}
                </div>
            </main>

            {/* Bottom Controls */}
            <footer className="w-full max-w-2xl z-10 flex flex-col items-center gap-12 pb-8">
                {/* Visual Waveform (Simulated for now) */}
                <div className="flex items-center gap-1 h-8">
                    {[...Array(24)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={isCalling ? {
                                height: [4, Math.random() * 32 + 4, 4],
                            } : { height: 4 }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                            className={cn(
                                "w-1 rounded-full transition-colors",
                                isCalling ? "bg-brand-red" : "bg-white/10"
                            )}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-8">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="w-16 h-16 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-gray-400"
                    >
                        <Volume2 size={24} />
                    </Button>

                    <Button 
                        onClick={handleToggleCall}
                        disabled={!isConnected}
                        className={cn(
                            "w-24 h-24 rounded-full shadow-2xl transition-all duration-500 scale-110 active:scale-95",
                            !isConnected ? "bg-gray-800 text-gray-500 cursor-not-allowed" :
                            isCalling 
                                ? "bg-white text-brand-dark hover:bg-gray-200" 
                                : "bg-brand-red text-white hover:bg-[#CC1D23]"
                        )}
                    >
                        {!isConnected ? <Loader2 className="animate-spin" size={32} /> : isCalling ? <PhoneOff size={32} /> : <Mic size={32} />}
                    </Button>

                    <Tooltip content="Secure Connection">
                        <div className={cn(
                            "w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors",
                            isConnected ? "text-emerald-500" : "text-gray-600"
                        )}>
                            <ShieldCheck size={24} />
                        </div>
                    </Tooltip>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Encrypted AI Connection</span>
                    <div className="flex gap-4 opacity-20 grayscale">
                        <img src="/brands/png/porsche.png" className="h-4 w-auto" alt="Porsche" />
                        <img src="/brands/png/bmw.png" className="h-4 w-auto" alt="BMW" />
                        <img src="/brands/png/mercedes-benz.png" className="h-4 w-auto" alt="Mercedes" />
                    </div>
                </div>
            </footer>

            {/* Custom Styles for Utilities */}
            <style jsx global>{`
                .silver-shine {
                    background: linear-gradient(to right, #fff 20%, #666 40%, #666 60%, #fff 80%);
                    background-size: 200% auto;
                    color: #000;
                    background-clip: text;
                    text-fill-color: transparent;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shine 4s linear infinite;
                }
                @keyframes shine {
                    to { background-position: 200% center; }
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    )
}

/**
 * Enhanced Tooltip for visual feedback.
 */
function Tooltip({ children, content }: { children: React.ReactNode, content: string }) {
    return <div className="relative group cursor-help">
        {children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-white text-brand-dark text-[8px] font-black uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {content}
        </div>
    </div>
}

