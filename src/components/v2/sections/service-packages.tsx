'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ServicePackage } from '@/types/v2'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// We override the default packages from CMS/DB with our static premium ones
// since the user wants these 3 specific image cards shown on the homepage
const premiumPackages = [
  {
    id: 'premium-protection',
    title: 'Premium Automotive Protection Solutions',
    image: '/packages/PREMIUM AUTOMOTIVE PROTECTION SOLUTIONS.jpeg',
    href: '/packages',
  },
  {
    id: 'ppf',
    title: 'Paint Protection Film (PPF)',
    image: '/packages/PAINT PROTECTION FILM CPPF).jpeg',
    href: '/packages',
  },
  {
    id: 'window-tinting',
    title: 'Window Tinting',
    image: '/packages/WINDOW TINTING.jpeg',
    href: '/packages',
  }
]

export function ServicePackages({ packages }: { packages: ServicePackage[] }) {
    return (
        <section id="packages" className="py-24 bg-brand-dark carbon-fiber relative overflow-hidden">
            <div className="absolute inset-0 micro-noise opacity-20 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
                        Elite Care Solutions
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9] italic">
                        Protection <span className="text-brand-red">Packages</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {premiumPackages.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative rounded-[2rem] overflow-hidden group h-[500px] flex flex-col carbon-fiber border border-white/10 shadow-2xl"
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0 z-0 bg-gray-300">
                                <Image 
                                    src={pkg.image} 
                                    alt={`${pkg.title} Service Package at Smart Motor Abu Dhabi`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
                            </div>

                            {/* Content (Just CTA at the bottom) */}
                            <div className="relative z-10 mt-auto p-6 w-full">
                                <Link href={pkg.href}>
                                    <Button variant="secondary" className="w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em]">
                                        <span className="relative z-20 pointer-events-none transition-colors duration-300">Explore Package Details</span>
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
