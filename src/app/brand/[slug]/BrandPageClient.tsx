'use client'

import { useState } from 'react'
import {
    Clock,
    ChevronRight,
    ShieldCheck,
    Zap,
    Star,
    MapPin,
    Trophy,
    Wrench,
    CheckCircle2,
    ArrowRight,
    Search
} from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { cn } from '@/lib/utils'

interface BrandPageClientProps {
    slug: string
}

export default function BrandPageClient({ slug }: BrandPageClientProps) {
    const [searchQuery, setSearchQuery] = useState('')

    // Fallback data for brands
    const brands: Record<string, any> = {
        'mercedes-benz': {
            name: 'Mercedes-Benz',
            logo: '/brands/mercedes.png',
            banner: '/images/hero/mercedes-banner.webp',
            accentColor: '#000000',
            description: 'The pinnacle of German engineering meets Abu Dhabi\'s most advanced diagnostic facility. We specialize in AMG performance tuning and luxury S-Class maintenance.',
            models: ['S-Class', 'G-Wagon', 'E-Class', 'C-Class', 'GLE', 'AMG GT']
        },
        'bmw': {
            name: 'BMW',
            logo: '/brands/bmw.png',
            banner: '/images/hero/bmw-banner.webp',
            accentColor: '#1C69D2',
            description: 'Unleashing the "Ultimate Driving Machine" through precise calibration and M-Power expertise. From classic E30s to the latest M8 Competition.',
            models: ['3 Series', '5 Series', '7 Series', 'X5', 'X7', 'M3', 'M5']
        },
        'audi': {
            name: 'Audi',
            logo: '/brands/audi.png',
            banner: '/images/hero/audi-banner.webp',
            accentColor: '#BB0A30',
            description: 'Vorsprung durch Technik. Our specialized Audi technicians master the complexity of Quattro systems and TFSI engines with surgical precision.',
            models: ['A4', 'A6', 'A8', 'Q5', 'Q7', 'Q8', 'RS6', 'R8']
        },
        'porsche': {
            name: 'Porsche',
            logo: '/brands/porsche.png',
            banner: '/images/hero/porsche-banner.webp',
            accentColor: '#D5001C',
            description: 'Preserving the soul of Stuttgart. We provide race-grade maintenance for the 911, Cayenne, and Taycan using factory-level diagnostic tools.',
            models: ['911', 'Cayenne', 'Panamera', 'Macan', 'Taycan', '718 Boxster']
        },
        'land-rover': {
            name: 'Land Rover',
            logo: '/brands/land-rover.png',
            banner: '/images/hero/land-rover-banner.webp',
            accentColor: '#005A2B',
            description: 'Mastering the art of luxury off-roading. Specialized air suspension repair and terrain response calibration for Abu Dhabi\'s elite fleet.',
            models: ['Range Rover', 'Range Rover Sport', 'Defender', 'Discovery', 'Velar', 'Evoque']
        },
        'toyota': {
            name: 'Toyota',
            logo: '/brands/toyota.png',
            banner: '/images/hero/toyota-banner.webp',
            accentColor: '#EB0A1E',
            description: 'Abu Dhabi\'s most trusted name in reliability deserves precision care. From Land Cruiser V8 overhauls to Camry hybrid servicing, we keep Toyota\'s legendary durability intact.',
            models: ['Land Cruiser', 'Camry', 'RAV4', 'Hilux', 'Prado', 'Corolla', 'Fortuner', 'Yaris']
        },
        'nissan': {
            name: 'Nissan',
            logo: '/brands/nissan.png',
            banner: '/images/hero/nissan-banner.webp',
            accentColor: '#C3002F',
            description: 'From the legendary Patrol to the innovative Leaf, our Nissan specialists deliver factory-grade servicing with a focus on VQ engine performance and CVT reliability.',
            models: ['Patrol', 'Altima', 'X-Trail', 'Pathfinder', 'Kicks', 'Maxima', 'GT-R', '370Z']
        },
        'lexus': {
            name: 'Lexus',
            logo: '/brands/lexus.png',
            banner: '/images/hero/lexus-banner.webp',
            accentColor: '#8B0000',
            description: 'Japanese luxury redefined. Our Lexus technicians are trained on the full hybrid powertrain ecosystem — from the LS flagship to the performance-oriented LC 500.',
            models: ['LS', 'ES', 'IS', 'RX', 'LX', 'NX', 'GX', 'LC 500']
        },
        'lamborghini': {
            name: 'Lamborghini',
            logo: '/brands/lamborghini.png',
            banner: '/images/hero/lamborghini-banner.webp',
            accentColor: '#FFD700',
            description: 'Sant\'Agata precision meets Musaffah expertise. We handle Huracan V10 servicing, Urus performance tuning, and Aventador carbon-ceramic brake systems with surgical care.',
            models: ['Huracan', 'Urus', 'Aventador', 'Revuelto']
        },
        'rolls-royce': {
            name: 'Rolls-Royce',
            logo: '/brands/rolls-royce.png',
            banner: '/images/hero/rolls-royce-banner.webp',
            accentColor: '#7B3F61',
            description: 'The ultimate expression of automotive luxury. Our Rolls-Royce specialists maintain the hand-crafted perfection of Ghost, Phantom, and Cullinan with the reverence they deserve.',
            models: ['Ghost', 'Phantom', 'Cullinan', 'Wraith', 'Dawn', 'Spectre']
        },
        'bentley': {
            name: 'Bentley',
            logo: '/brands/bentley.png',
            banner: '/images/hero/bentley-banner.webp',
            accentColor: '#2C3E2D',
            description: 'Crewe craftsmanship preserved in Abu Dhabi. We service the Continental GT\'s W12 powerplant, Bentayga\'s air suspension, and Flying Spur\'s bespoke electronics.',
            models: ['Continental GT', 'Bentayga', 'Flying Spur']
        },
        'ferrari': {
            name: 'Ferrari',
            logo: '/brands/ferrari.png',
            banner: '/images/hero/ferrari-banner.webp',
            accentColor: '#DC143C',
            description: 'Maranello engineering demands Maranello-level care. Our Ferrari technicians handle F1 dual-clutch gearboxes, mid-engine cooling systems, and Manettino calibration with exacting precision.',
            models: ['488', 'F8 Tributo', 'Roma', 'SF90', 'Portofino', '296 GTB', '812 Superfast']
        },
        'maserati': {
            name: 'Maserati',
            logo: '/brands/maserati.png',
            banner: '/images/hero/maserati-banner.webp',
            accentColor: '#003366',
            description: 'Italian grand touring excellence maintained in Abu Dhabi. Specialist care for Ghibli, Levante, and Quattroporte — including Skyhook suspension and twin-turbo V6/V8 service.',
            models: ['Ghibli', 'Levante', 'Quattroporte', 'MC20', 'GranTurismo', 'Grecale']
        },
        'volkswagen': {
            name: 'Volkswagen',
            logo: '/brands/volkswagen.png',
            banner: '/images/hero/volkswagen-banner.webp',
            accentColor: '#001E50',
            description: 'German engineering for everyone — but not every workshop understands VW\'s TSI turbo systems and DSG dual-clutch transmissions. Our specialists do.',
            models: ['Golf', 'Tiguan', 'Touareg', 'Passat', 'Arteon', 'T-Roc', 'ID.4']
        },
        'honda': {
            name: 'Honda',
            logo: '/brands/honda.png',
            banner: '/images/hero/honda-banner.webp',
            accentColor: '#CC0000',
            description: 'Precision engineering from Minato meets Abu Dhabi\'s demanding conditions. From VTEC engine servicing to i-MMD hybrid maintenance, we keep your Honda performing at its peak.',
            models: ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot', 'City']
        },
        'hyundai': {
            name: 'Hyundai',
            logo: '/brands/hyundai.png',
            banner: '/images/hero/hyundai-banner.webp',
            accentColor: '#002C5F',
            description: 'Korea\'s automotive powerhouse requires modern expertise. Our Hyundai technicians are trained on GDi turbo engines, HTRAC AWD systems, and SmartSense safety calibration.',
            models: ['Tucson', 'Santa Fe', 'Sonata', 'Elantra', 'Palisade', 'Creta', 'Kona']
        },
        'kia': {
            name: 'Kia',
            logo: '/brands/kia.png',
            banner: '/images/hero/kia-banner.webp',
            accentColor: '#05141F',
            description: 'Kia\'s award-winning design and engineering deserve specialist attention. From Telluride SUV servicing to EV6 electric platform care, we cover the full Kia range.',
            models: ['Telluride', 'Sportage', 'Sorento', 'K5', 'Carnival', 'EV6', 'Seltos']
        },
        'ford': {
            name: 'Ford',
            logo: '/brands/ford.png',
            banner: '/images/hero/ford-banner.webp',
            accentColor: '#003478',
            description: 'Built Ford Tough — maintained Smart Motor Tough. From EcoBoost turbo engines to Raptor off-road systems, we handle Ford\'s full performance range with American muscle expertise.',
            models: ['Explorer', 'Mustang', 'F-150 Raptor', 'Expedition', 'Bronco', 'Edge', 'Escape']
        },
        'chevrolet': {
            name: 'Chevrolet',
            logo: '/brands/chevrolet.png',
            banner: '/images/hero/chevrolet-banner.webp',
            accentColor: '#D4A017',
            description: 'American automotive heritage maintained with precision. From Tahoe V8 servicing to Corvette performance calibration, our technicians understand GM engineering inside out.',
            models: ['Tahoe', 'Suburban', 'Corvette', 'Camaro', 'Silverado', 'Blazer', 'Equinox']
        },
        'gmc': {
            name: 'GMC',
            logo: '/brands/gmc.png',
            banner: '/images/hero/gmc-banner.webp',
            accentColor: '#CC0000',
            description: 'Professional grade deserves professional service. Our GMC specialists handle Yukon Denali, Sierra, and Terrain with full diagnostic capability for Duramax diesel and AT4 systems.',
            models: ['Yukon', 'Yukon Denali', 'Sierra', 'Terrain', 'Acadia', 'Canyon']
        },
        'cadillac': {
            name: 'Cadillac',
            logo: '/brands/cadillac.png',
            banner: '/images/hero/cadillac-banner.webp',
            accentColor: '#8B7355',
            description: 'American luxury at its finest. Escalade V8 performance, CT5-V Blackwing tuning, and MagneRide suspension calibration — handled with the precision Cadillac demands.',
            models: ['Escalade', 'CT5', 'CT4', 'XT5', 'XT6', 'Lyriq']
        },
        'jaguar': {
            name: 'Jaguar',
            logo: '/brands/jaguar.png',
            banner: '/images/hero/jaguar-banner.webp',
            accentColor: '#006747',
            description: 'British performance and luxury combined. From F-Type supercharged V8 servicing to I-PACE electric platform maintenance, we deliver Jaguar-grade care in Abu Dhabi.',
            models: ['F-Type', 'F-PACE', 'E-PACE', 'XF', 'XE', 'I-PACE']
        },
        'volvo': {
            name: 'Volvo',
            logo: '/brands/volvo.png',
            banner: '/images/hero/volvo-banner.webp',
            accentColor: '#003057',
            description: 'Swedish safety engineering maintained in Abu Dhabi. Our Volvo specialists handle Drive-E powertrains, City Safety calibration, and Pilot Assist semi-autonomous driving systems.',
            models: ['XC90', 'XC60', 'XC40', 'S90', 'S60', 'V60 Cross Country']
        },
        'dodge': {
            name: 'Dodge',
            logo: '/brands/dodge.png',
            banner: '/images/hero/dodge-banner.webp',
            accentColor: '#BA0C2F',
            description: 'American muscle demands expert handling. Our technicians specialize in HEMI V8 performance tuning, SRT calibration, and Hellcat supercharger maintenance for Dodge vehicles.',
            models: ['Challenger', 'Charger', 'Durango', 'Hornet']
        },
        'jeep': {
            name: 'Jeep',
            logo: '/brands/jeep.png',
            banner: '/images/hero/jeep-banner.webp',
            accentColor: '#3A5F0B',
            description: 'Trail Rated performance maintained for Abu Dhabi\'s diverse terrain. From Wrangler Rubicon off-road systems to Grand Cherokee luxury electronics, we service the full Jeep lineup.',
            models: ['Wrangler', 'Grand Cherokee', 'Gladiator', 'Compass', 'Renegade']
        },
        'infiniti': {
            name: 'Infiniti',
            logo: '/brands/infiniti.png',
            banner: '/images/hero/infiniti-banner.webp',
            accentColor: '#1A1A2E',
            description: 'Japanese luxury with performance DNA. Our Infiniti specialists handle VR30 twin-turbo V6 engines, Direct Adaptive Steering, and ProActive suspension with factory-level expertise.',
            models: ['QX80', 'QX60', 'QX55', 'QX50', 'Q50', 'Q60']
        },
        'genesis': {
            name: 'Genesis',
            logo: '/brands/genesis.png',
            banner: '/images/hero/genesis-banner.webp',
            accentColor: '#1C2B4A',
            description: 'Korea\'s luxury revolution maintained with premium care. Genesis G90, G80, and GV80 servicing with full twin-turbo and HTRAC AWD diagnostic capability.',
            models: ['G90', 'G80', 'G70', 'GV80', 'GV70', 'GV60']
        },
        'mitsubishi': {
            name: 'Mitsubishi',
            logo: '/brands/mitsubishi.png',
            banner: '/images/hero/mitsubishi-banner.webp',
            accentColor: '#ED1C24',
            description: 'Reliability and adventure capability maintained at Smart Motor. From Pajero off-road systems to Outlander PHEV hybrid servicing, we handle the full Mitsubishi range.',
            models: ['Pajero', 'Outlander', 'ASX', 'L200', 'Eclipse Cross', 'Montero Sport']
        },
        'mazda': {
            name: 'Mazda',
            logo: '/brands/mazda.png',
            banner: '/images/hero/mazda-banner.webp',
            accentColor: '#910000',
            description: 'Jinba Ittai — the unity of horse and rider. Our Mazda specialists understand Skyactiv technology, Kodo design philosophy, and the precision engineering behind every Mazda model.',
            models: ['CX-5', 'CX-9', 'CX-30', 'Mazda3', 'Mazda6', 'MX-5']
        },
        'peugeot': {
            name: 'Peugeot',
            logo: '/brands/peugeot.png',
            banner: '/images/hero/peugeot-banner.webp',
            accentColor: '#003DA5',
            description: 'French automotive innovation maintained in Abu Dhabi. Our Peugeot specialists handle PureTech turbo engines, EAT8 automatic transmissions, and i-Cockpit diagnostic systems.',
            models: ['3008', '5008', '2008', '508', '308', '208']
        },
        'mini-cooper': {
            name: 'MINI Cooper',
            logo: '/brands/mini-cooper.png',
            banner: '/images/hero/mini-cooper-banner.webp',
            accentColor: '#2D6A4F',
            description: 'British icon with BMW engineering precision. Our MINI specialists handle TwinPower Turbo engines, ALL4 AWD systems, and John Cooper Works performance upgrades.',
            models: ['Cooper', 'Countryman', 'Clubman', 'John Cooper Works']
        },
    }

    const brand = brands[slug] || {
        name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
        logo: '/bg-placeholder.jpg',
        banner: '/bg-placeholder.jpg',
        accentColor: '#E62329',
        description: 'Specialized luxury automotive care for elite performance vehicles in Abu Dhabi.',
        models: []
    }

    const services = [
        {
            id: '1',
            slug: 'major-service',
            name: 'Major Service & Inspection',
            description: 'A 150-point clinical audit of your vehicle\'s vital systems.',
            detailedDescription: `Our ${brand.name} Major Service is a comprehensive deep-dive into your vehicle's health. We don't just change oil; we perform a forensic analysis of every mechanical and electronic component using OEM-grade diagnostic software.`,
            basePrice: 1200,
            duration: '4-6 Hours',
            image: '/images/services/major-service.webp'
        },
        {
            id: '2',
            slug: 'transmission-repair',
            name: 'Gearbox & Transmission',
            description: 'Precision calibration and repair for smooth power delivery.',
            detailedDescription: `The transmission is the heart of your ${brand.name}'s performance. We specialize in mechatronic repairs, torque converter overhauls, and complete gearbox rebuilds with a focus on smooth, factory-standard shifting.`,
            basePrice: 2500,
            duration: '1-3 Days',
            image: '/images/services/transmission.webp'
        },
        {
            id: '3',
            slug: 'brake-system',
            name: 'Advanced Brake Systems',
            description: 'Zero-compromise stopping power using genuine components.',
            detailedDescription: 'From ceramic rotor replacement to ABS module coding, we ensure your vehicle\'s braking system exceeds original performance specifications for maximum safety on UAE roads.',
            basePrice: 850,
            duration: '2-3 Hours',
            image: '/images/services/brakes.webp'
        },
        {
            id: '4',
            slug: 'ac-cooling',
            name: 'AC & Climate Control',
            description: 'Optimized cooling performance for the UAE summer heat.',
            detailedDescription: 'Our specialized AC service involves a complete evacuation and recharge, evaporator leak detection, and condenser cleaning to ensure sub-zero cabin temperatures even in 50°C heat.',
            basePrice: 450,
            duration: '2 Hours',
            image: '/images/services/ac-service.webp'
        }
    ]

    const filteredServices = services.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const models = brand.models || []

    const copy = {
        title: `${brand.name} Service & Repair Abu Dhabi`,
        subtitle: `Elite ${brand.name} Engineering Specialist`,
        description: brand.description,
        accentColor: brand.accentColor
    }

    return (
        <main className="min-h-screen bg-[#FAFAF9] selection:bg-brand-red selection:text-white">

            {/* ── Hero section ───────────────────────────────────────────────── */}
            <section className="relative h-[85vh] min-h-[700px] flex items-center overflow-hidden bg-brand-dark">
                <div className="absolute inset-0 z-0">
                    <img
                        src={brand.banner}
                        alt={`${brand.name} service banner`}
                        className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/20 to-brand-dark" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/40 to-transparent" />
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
                            <div className="w-16 h-1 relative grayscale brightness-200">
                                <img src={brand.logo} alt={brand.name} className="object-contain" />
                            </div>
                            <span className="text-brand-red font-black text-xs uppercase tracking-[0.5em]">The Gold Standard</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-[0.8] mb-8 animate-fade-in-up delay-100">
                            The {brand.name} <br />
                            <span className="silver-shine">Authority</span>
                        </h1>

                        <p className="text-white/60 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mb-12 animate-fade-in-up delay-200">
                            {copy.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 animate-fade-in-up delay-300">
                            <Link
                                href="/#booking"
                                className="px-12 py-6 bg-brand-red text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl active:scale-95"
                            >
                                Book Your Session
                            </Link>
                            <div className="flex items-center gap-3 text-white/40">
                                <div className="flex -space-x-3">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-dark bg-gray-800 flex items-center justify-center overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt={`Satisfied ${brand.name} owner serviced at Smart Motor Abu Dhabi`} />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Joined by 2k+ owners</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side badge */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 hidden xl:block translate-x-1/2 rotate-90 origin-center pointer-events-none">
                    <span className="text-[140px] font-black text-white/5 uppercase tracking-tighter whitespace-nowrap leading-none">PRECISION ENGINEERING</span>
                </div>
            </section>

            {/* ── Model trust bar ───────────────────────────────────────────── */}
            <div className="bg-white border-y border-gray-100 py-10 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Supported Models</span>
                    {models.map((model: string) => (
                        <span key={model} className="text-sm font-black uppercase tracking-widest text-brand-dark/20 hover:text-brand-red transition-colors cursor-default">{model}</span>
                    ))}
                </div>
            </div>

            {/* ── Search & Filter ───────────────────────────────────────────── */}
            <section className="py-20 bg-brand-bg relative z-20 -mt-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="bg-white p-1 rounded-[3rem] shadow-2xl border border-gray-100 flex items-center overflow-hidden group focus-within:ring-2 ring-brand-red/20 transition-all">
                        <div className="pl-8 pr-4 text-gray-400">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder={`Search ${brand.name} specific services...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 py-8 bg-transparent text-lg font-bold text-brand-dark placeholder:text-gray-300 outline-none"
                        />
                        <div className="pr-2 hidden md:block">
                            <div className="px-6 py-4 bg-gray-50 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400">
                                {filteredServices.length} Results Found
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Core services swiper (Grid) ────────────────────────────────── */}
            <section className="py-32 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="space-y-24">
                        {filteredServices.map((service, idx) => (
                            <div key={service.id} className="group relative">
                                <div className={cn(
                                    "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center p-12 rounded-[4rem] border border-gray-100 transition-all duration-700 bg-white shadow-xl hover:shadow-2xl",
                                    idx % 2 === 1 && "lg:flex-row-reverse"
                                )}>
                                    {/* Text Column */}
                                    <div className={cn(idx % 2 === 1 && "lg:order-2")}>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-1 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                                                <img src={brand.logo} alt={brand.name} className="object-contain" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red">{brand.name} Engineering</span>
                                        </div>

                                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-[0.9] text-brand-dark mb-6">
                                            {service.name}
                                        </h3>

                                        <p className="text-gray-600 font-medium leading-relaxed text-lg mb-8">
                                            {service.detailedDescription || service.description}
                                        </p>

                                        <div className="flex flex-wrap gap-4 mb-8">
                                            {service.duration && (
                                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                                                    <Clock size={12} className="text-gray-400" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{service.duration}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 px-4 py-2 bg-brand-red/5 rounded-full border border-brand-red/10">
                                                <Zap size={12} className="text-brand-red" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-red">UAE Standards Compliant</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 flex items-center gap-6">
                                            <Link
                                                href={`/brand/${slug}/${service.slug}`}
                                                className="px-8 py-4 bg-brand-dark text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-red transition-all shadow-xl"
                                            >
                                                Deep Engineering Guide
                                            </Link>
                                            <Link
                                                href="/#booking"
                                                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors flex items-center gap-2 group/btn"
                                            >
                                                Reserve Slot <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Image Column */}
                                    <div className="relative">
                                        <div className="aspect-[16/9] bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl relative group-hover:scale-[1.02] transition-transform duration-700">
                                            <img
                                                src={service.image || '/bg-placeholder.jpg'}
                                                alt={`Professional ${brand.name} ${service.name} in Abu Dhabi workshop`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                                                <p className="text-white font-black text-xl uppercase tracking-tighter italic">Precision {service.name} for your {brand.name}</p>
                                            </div>
                                        </div>
                                        {/* Floating Badge */}
                                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-red rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white z-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                            <div className="text-center">
                                                <p className="text-[8px] font-black uppercase leading-none">Starting</p>
                                                <p className="text-lg font-black italic">AED {service.basePrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA strip ─────────────────────────────────────────────────── */}
            <section className="py-24 bg-brand-dark">
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-20" style={{ background: copy.accentColor }} />
                    <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] mb-4 block relative z-10">Abu Dhabi's Trusted {brand.name} Specialist</span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.85] text-white mb-6 relative z-10">
                        Your {brand.name} <br /><span className="silver-shine">Deserves Better</span>
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl mx-auto mb-10 relative z-10">
                        Visit us at M9, Musaffah Industrial Area — Abu Dhabi's home of precision automotive care.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
                        <Link
                            href="/#booking"
                            className="inline-flex items-center gap-2 bg-brand-red text-white rounded-full px-10 py-5 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
                        >
                            Book a Service
                        </Link>
                        <a
                            href="https://maps.app.goo.gl/M9Musaffah"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white rounded-full px-10 py-5 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                            <MapPin size={14} />
                            Get Directions
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Reviews snippet ───────────────────────────────────────────── */}
            <section className="py-20 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { text: `My ${brand.name} runs better than when I bought it. These guys know every bolt.`, name: 'Ahmed K.', model: models[0] || brand.name },
                            { text: `Finally found a workshop that truly understands ${brand.name} engineering. Worth every dirham.`, name: 'Sarah M.', model: models[1] || brand.name },
                            { text: `Transparent pricing, fast turnaround, genuine parts. Won't take my ${brand.name} anywhere else.`, name: 'Omar R.', model: models[2] || brand.name },
                        ].map((review, i) => (
                            <div key={i} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} size={14} className="fill-[#FFCC00] text-[#FFCC00]" />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6 italic">&ldquo;{review.text}&rdquo;</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-brand-red/10 rounded-full flex items-center justify-center">
                                        <span className="text-[10px] font-black text-brand-red">{review.name[0]}</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark">{review.name}</p>
                                        <p className="text-[9px] text-gray-400 font-bold">{review.model} Owner</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
