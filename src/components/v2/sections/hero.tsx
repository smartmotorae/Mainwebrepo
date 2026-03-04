'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CallbackModal } from '@/components/sections/callback-modal'
import { useLanguage } from '@/lib/language-context'
import { cn, publicPath } from '@/lib/utils'
import { useTilt } from '@/lib/hooks/useTilt'
import { Tooltip } from '@/components/ui/tooltip'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'
import { BrandCarousel } from './brand-carousel'

interface HeroProps {
    cmsData?: {
        title?: string
        subtitle?: string
        body?: string
        imageUrl?: string
        ctaLabel?: string
        ctaLink?: string
        isVisible?: boolean
        theme?: 'light' | 'dark' | 'glass'
    }
    brands?: any[]
}

export function Hero({ cmsData, brands }: HeroProps) {
    const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false)
    const { isRTL } = useLanguage()

    const bookTilt = useTilt({ maxDegrees: 6, perspective: 800 })
    const callbackTilt = useTilt({ maxDegrees: 6, perspective: 800 })

    const title = cmsData?.title || "PROFESSIONAL AUTOMOTIVE"
    const subtitle = cmsData?.subtitle || "SERVICE CENTER"
    const body = cmsData?.body || "Abu Dhabi's premier car service & repair center in Musaffah. Engine repair, AC service, PPF, ceramic coating & full detailing — for every brand, every budget."
    const imageUrl = cmsData?.imageUrl || publicPath('/images/hero/Hero-Wagon.webp')
    const ctaLabel = cmsData?.ctaLabel || "Book Appointment"
    const ctaLink = cmsData?.ctaLink || "booking"
    const isVisible = cmsData?.isVisible !== false
    const theme = cmsData?.theme || 'light'

    if (!isVisible) return null

    return (
        <section className={cn(
            "relative flex-1 min-h-screen flex items-center overflow-hidden pb-20 transition-colors duration-700",
            theme === 'dark' ? "bg-brand-dark text-white" : "bg-white text-brand-dark",
            theme === 'glass' && "bg-white/10 backdrop-blur-md"
        )}>
            {/* Added top padding to avoid nav overlap and centering */}

            {/* Full-width vehicle image — positioned right */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageUrl}
                    alt="Smart Motor Auto Repair Abu Dhabi - Premium Service Center"
                    fill
                    priority
                    className="object-cover object-center md:object-[center_top_0px]"
                    sizes="100vw"
                />
                <div className={cn(
                    "absolute inset-0 pointer-events-none transition-all duration-700",
                    isRTL
                        ? 'bg-gradient-to-l from-transparent via-white/40 to-white/90'
                        : 'bg-gradient-to-r from-white/70 via-white/50 to-transparent',
                    theme === 'dark' && (isRTL
                        ? 'bg-gradient-to-l from-transparent via-black/50 to-black/98'
                        : 'bg-gradient-to-r from-black/95 via-black/80 to-transparent')
                )} />
                {/* Bottom cinematic vignette */}
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
            </div>

            {/* Content centered */}
            <div className={`relative z-[2] w-full max-w-7xl mx-auto flex flex-col justify-center items-center text-center px-6 md:px-20 ${isRTL ? 'ml-auto' : ''}`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex flex-col items-center"
                >
                    {/* Badge ... */}
                    <div className={cn(
                        "relative inline-flex items-center gap-2.5 px-6 py-2 rounded-full mb-8 shadow-2xl border border-white/20",
                        theme === 'dark' ? "bg-white/5 backdrop-blur-md" : "bg-white/10 backdrop-blur-md"
                    )}>
                        <span className="relative z-10 w-2 h-2 bg-brand-red rounded-full animate-pulse shadow-[0_0_10px_#E62329]" />
                        <span className={cn(
                            "relative z-10 text-[11px] font-black uppercase tracking-[0.2em]",
                            theme === 'dark' ? "text-white" : "text-brand-dark"
                        )}>
                            Smart Choices Start Here
                        </span>
                    </div>

                    <h1 className={cn(
                        "flex flex-col items-center mb-10 tracking-tighter",
                        theme === 'dark' ? "text-white" : "text-brand-dark",
                        isRTL ? 'font-arabic tracking-normal' : ''
                    )}>
                        <span className="text-4xl md:text-6xl font-black leading-tight uppercase block mb-2 drop-shadow-sm">
                            {title}
                        </span>
                        <span className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.8] silver-shine block drop-shadow-md">
                            {subtitle}
                        </span>
                    </h1>

                    <p className={cn(
                        "text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed mb-8 font-medium px-2",
                        theme === 'dark' ? "text-white/70" : "text-gray-600",
                        isRTL ? 'font-arabic' : ''
                    )}>
                        {body}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-10 w-full sm:w-auto px-4 sm:px-0">
                        <Button
                            style={bookTilt.tiltStyle}
                            onMouseMove={bookTilt.tiltHandlers.onMouseMove}
                            onMouseLeave={bookTilt.tiltHandlers.onMouseLeave}
                            className="bg-brand-dark text-white button-overlay rounded-full px-10 py-4 text-xs font-black tracking-widest uppercase hover:bg-brand-red transition-all shadow-xl hover:scale-105 active:scale-95 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] h-auto opacity-100 hover:opacity-100 relative overflow-hidden group"
                            onClick={() => {
                                const el = document.getElementById(ctaLink.replace('#', ''))
                                if (el) el.scrollIntoView({ behavior: 'smooth' })
                                trackEvent('cta_click', 'Engagement', 'book_appointment_hero', 1)
                            }}
                        >
                            <span className="relative z-10">{ctaLabel}</span>
                            <div className="absolute inset-0 bg-[url('/public/textures/car-paint-texture.png')] opacity-30 mix-blend-overlay pointer-events-none group-hover:opacity-50 transition-opacity" />
                        </Button>
                        <Button
                            style={callbackTilt.tiltStyle}
                            onMouseMove={callbackTilt.tiltHandlers.onMouseMove}
                            onMouseLeave={callbackTilt.tiltHandlers.onMouseLeave}
                            aria-label="Call Smart Motor at +971 2 555 5443"
                            className="bg-white/80 backdrop-blur-md text-brand-dark button-overlay rounded-full px-10 py-4 text-xs font-black tracking-widest uppercase hover:bg-[#FFD700] hover:text-brand-dark transition-all shadow-lg border border-white/20 h-auto relative overflow-hidden group"
                            onClick={() => setIsCallbackModalOpen(true)}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                                Call: +971 2 555 5443
                            </span>
                            <div className="absolute inset-0 bg-[url('/public/textures/car-paint-texture.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                        </Button>
                    </div>

                    {/* Stats Row ... */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 border-t border-b border-gray-100 py-5 mb-10 w-full max-w-2xl">
                        <Tooltip content="Serving Abu Dhabi since 2009" position="bottom">
                            <div className="text-center">
                                <p className="text-2xl md:text-3xl font-black leading-none mb-1 text-brand-dark">15+</p>
                                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">Years Exp</p>
                            </div>
                        </Tooltip>
                        <div className="hidden sm:block w-px h-10 bg-gray-200" />
                        <Tooltip content="Trusted by 1000+ vehicle owners" position="bottom">
                            <div className="text-center">
                                <p className="text-2xl md:text-3xl font-black leading-none mb-1 text-brand-dark">1k+</p>
                                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">Happy Customers</p>
                            </div>
                        </Tooltip>
                        <div className="hidden sm:block w-px h-10 bg-gray-200" />
                        <Tooltip content="Expert technicians across all brands" position="bottom">
                            <div className="text-center">
                                <p className="text-2xl md:text-3xl font-black leading-none mb-1 text-brand-dark">50+</p>
                                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">Brand Specialists</p>
                            </div>
                        </Tooltip>
                    </div>

                    {/* Brand Carousel Integrated */}
                    <div className="w-full mt-4">
                        <BrandCarousel initialBrands={brands} />
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator ... */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[2] opacity-50">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-500">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent" />
            </div>

            <CallbackModal isOpen={isCallbackModalOpen} onClose={() => setIsCallbackModalOpen(false)} />
        </section>
    )
}
