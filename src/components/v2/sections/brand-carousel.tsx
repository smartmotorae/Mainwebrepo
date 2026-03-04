'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Tooltip } from '@/components/ui/tooltip'
import { getBrandsWithModels } from '@/app/actions'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

function BrandSlot({ brand }: { brand: any }) {
    const [imgError, setImgError] = useState(false)

    return (
        <Tooltip content={`View ${brand.name} specialized care`} position="top">
            <Link
                href={`/brand/${brand.slug || brand.id}`}
                className="flex flex-col items-center justify-center group cursor-pointer shrink-0 w-24 md:w-32"
                aria-label={`View specialized care for ${brand.name}`}
            >
                <div
                    className="flex items-center justify-center transition-all duration-500 w-16 h-16 md:w-20 md:h-20"
                >
                    {!imgError && (brand.logoUrl || brand.logoFile) ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={brand.logoUrl || `/brands-carousel/${brand.logoFile}`}
                                alt={`${brand.name} car service and repair in Abu Dhabi`}
                                fill
                                sizes="(max-width: 768px) 64px, 80px"
                                onError={() => setImgError(true)}
                                className="object-contain transition-all duration-700 group-hover:scale-110 [filter:drop-shadow(0_10px_10px_rgba(0,0,0,0.15))] hover:[filter:drop-shadow(0_15px_15px_rgba(0,0,0,0.25))]"
                                draggable={false}
                            />
                        </div>
                    ) : (
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-tighter text-center leading-tight">
                            {brand.name.substring(0, 3)}
                        </span>
                    )}
                </div>
                <span
                    className="mt-3 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-brand-dark transition-all text-center leading-tight opacity-0 group-hover:opacity-100 group-hover:-translate-y-1"
                >
                    {brand.name}
                </span>
            </Link>
        </Tooltip>
    )
}

interface BrandCarouselProps {
    initialBrands?: any[]
}

export function BrandCarousel({ initialBrands }: BrandCarouselProps) {
    const [brands, setBrands] = useState<any[]>(initialBrands || [])
    const [isLoading, setIsLoading] = useState(!initialBrands)

    useEffect(() => {
        if (initialBrands && initialBrands.length > 0) {
            setIsLoading(false)
            return
        }

        async function fetchBrands() {
            try {
                const data = await getBrandsWithModels()
                setBrands(data)
            } catch (err) {
                console.error("Carousel fetch error:", err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchBrands()
    }, [initialBrands])

    // Duplicate brands for infinite loop
    const duplicatedBrands = useMemo(() => {
        if (brands.length === 0) return []
        // Triple the list to ensure no empty space during animation
        return [...brands, ...brands, ...brands]
    }, [brands])

    if (isLoading && !brands.length) {
        return (
            <div className="w-full py-10 flex flex-col items-center justify-center gap-4 bg-transparent">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        )
    }

    if (brands.length === 0) return null

    return (
        <div className="relative w-full py-4 overflow-hidden bg-transparent">
            {/* Fade Overlays for edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FAFAF9] via-[#FAFAF9]/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FAFAF9] via-[#FAFAF9]/50 to-transparent z-10 pointer-events-none" />

            <div className="flex overflow-hidden">
                <motion.div
                    className="flex gap-4 md:gap-8 px-4"
                    animate={{
                        x: [0, -1 * (brands.length * (128 + 32))], // Approximate width (slot width + gap)
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30, // Adjust speed here
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedBrands.map((brand, idx) => (
                        <div key={`${brand.id}-${idx}`} className="flex-shrink-0">
                            <BrandSlot brand={brand} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
