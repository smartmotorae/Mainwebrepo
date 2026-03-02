'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Tooltip } from '@/components/ui/tooltip'
import { getBrandsWithModels } from '@/app/actions'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

function BrandSlot({ brand }: { brand: any }) {
    const [imgError, setImgError] = useState(false)

    return (
        <Tooltip content={`View ${brand.name} specialized care`} position="top">
            <Link
                href={`/brand/${brand.slug || brand.id}`}
                className="flex flex-col items-center justify-center group cursor-pointer snap-center shrink-0 w-24 md:w-32"
            >
                <div
                    className="flex items-center justify-center transition-all duration-500 w-16 h-16 md:w-20 md:h-20"
                >
                    {!imgError && (brand.logoUrl || brand.logoFile) ? (
                        <img
                            src={brand.logoUrl || `/brands-carousel/${brand.logoFile}`}
                            alt={`${brand.name} car service and repair in Abu Dhabi`}
                            onError={() => setImgError(true)}
                            className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110 [filter:drop-shadow(0_10px_10px_rgba(0,0,0,0.15))] hover:[filter:drop-shadow(0_15px_15px_rgba(0,0,0,0.25))]"
                            draggable={false}
                        />
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

export function BrandCarousel() {
    const [brands, setBrands] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
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
    }, [])

    if (isLoading) {
        return (
            <div className="w-full py-10 flex flex-col items-center justify-center gap-4 bg-transparent">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        )
    }

    if (brands.length === 0) return null

    return (
        <div id="brands" className="relative w-full py-4 overflow-hidden bg-transparent">
            {/* Carousel Track with native smooth scrolling */}
            <div className="flex items-start justify-start gap-4 md:gap-8 px-6 md:px-12 overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth pb-8 pt-4">
                {brands.map((brand) => (
                    <BrandSlot key={brand.id} brand={brand} />
                ))}
            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    )
}
