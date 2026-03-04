import type { Metadata } from 'next'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { Hero } from '@/components/v2/sections/hero'
import { adminGetAllServices, adminGetAllBrands, adminGetContentBlock } from '@/lib/firebase-admin'
import { HomeCmsWrapper } from '@/components/admin/cms/home-cms-wrapper'
import { Service } from '@/types'
import { ServicePackage } from '@/types/v2'

import { AboutSnippet } from '@/components/v2/sections/about-snippet'
import { Services } from '@/components/v2/sections/services'
import { WhySmartMotor } from '@/components/v2/sections/why-smart-motor'
import { ServicePackages } from '@/components/v2/sections/service-packages'
import { BookingForm } from '@/components/v2/sections/booking-form'
import { ReviewsCarousel } from '@/components/v2/sections/reviews-carousel'
import { NewsletterSection } from '@/components/v2/sections/newsletter'
import { LocationMapSection } from '@/components/v2/sections/location-map'

export const metadata: Metadata = {
    title: 'Car Service & Repair Abu Dhabi | Smart Motor Musaffah',
    description: "Abu Dhabi's trusted car workshop in Musaffah M9. Certified technicians, 6-month warranty. Mercedes, BMW, Audi, Land Rover & all brands.",
    openGraph: {
        title: 'Car Service & Repair Abu Dhabi | Smart Motor Musaffah',
        description: "Abu Dhabi's trusted car workshop in Musaffah M9. Certified technicians, 6-month warranty. Mercedes, BMW, Audi, Land Rover & all brands.",
        url: 'https://smartmotor.ae',
        siteName: 'Smart Motor Auto Repair',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Smart Motor Auto Repair - Musaffah M9, Abu Dhabi',
            }
        ],
        locale: 'en_AE',
        type: 'website',
    },
    alternates: {
        canonical: 'https://smartmotor.ae',
    },
}

// Note: layout.tsx sets force-dynamic — this page renders server-side on each request
export default async function Home() {
    let servicesData: any[] = []
    let packagesData: any[] = []
    let brandsData: any[] = []
    let heroCms: any = null
    let aboutCms: any = null
    let whyCms: any = null

    try {
        const [s, b, h, a, w] = await Promise.all([
            adminGetAllServices(),
            adminGetAllBrands(),
            adminGetContentBlock('home_hero'),
            adminGetContentBlock('home_about'),
            adminGetContentBlock('home_why')
        ])
        servicesData = s
        packagesData = [] // No service packages in Firebase yet
        brandsData = b
        heroCms = h ? JSON.parse((h as any).value) : null
        aboutCms = a ? JSON.parse((a as any).value) : null
        whyCms = w ? JSON.parse((w as any).value) : null
    } catch (e) {
        console.error("DB Error", e);
    }

    // Cast to Service type
    const services: Service[] = servicesData.map(s => ({
        ...s,
        id: s.slug, // Map slug to id
        descriptionAr: s.descriptionAr || '',
        category: (s.category as any) || 'mechanical',
        icon: s.icon || 'wrench',
        process: s.process as any,
        subServices: s.subServices as any,
        seo: s.seo as any,
        detailedDescription: s.detailedDescription || undefined,
        image: s.image || undefined,
        iconImage: s.iconImage || undefined
    }))

    const packages: ServicePackage[] = packagesData.map(p => ({
        ...p,
        bestFor: p.bestFor || 'General Use',
        isPromotional: p.isPromotional
    }))

    // Normalize brand logo URLs: Firestore may store root-level paths like /bmw-logo.png
    // which don't exist at root. Remap them to /brands-carousel/ where they actually live.
    function normalizeBrandLogo(logoUrl: string | undefined): string {
        if (!logoUrl) return '/bg-placeholder.jpg'
        // Already a full valid path with subdirectory → keep as-is
        if (logoUrl.includes('/brands-carousel/') || logoUrl.includes('/brands/') || logoUrl.startsWith('http')) {
            return logoUrl
        }
        // Root-level path like /bmw-logo.png → remap to /brands-carousel/bmw-logo.png
        const filename = logoUrl.replace(/^\//, '')
        return `/brands-carousel/${filename}`
    }

    const brands = brandsData.map(b => ({
        id: b.id || b.slug || Math.random().toString(),
        name: b.name,
        src: normalizeBrandLogo(b.logoUrl),
        slug: b.slug || b.id
    }))

    // JSON-LD: LocalBusiness + AutomotiveBusiness structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': ['AutomotiveBusiness', 'AutoRepair'],
        '@id': 'https://smartmotor.ae/#organization',
        name: 'Smart Motor Auto Repair',
        alternateName: 'Smart Motor',
        url: 'https://smartmotor.ae',
        logo: 'https://smartmotor.ae/images/logo.png',
        image: 'https://smartmotor.ae/images/og-image.jpg',
        description: "Abu Dhabi's trusted car workshop in Musaffah M9. Certified technicians, 6-month warranty. Mercedes, BMW, Audi, Land Rover & all brands.",
        telephone: '+97125555443',
        email: 'sales@smartmotor.ae',
        foundingDate: '2009',
        priceRange: '$$',
        currenciesAccepted: 'AED',
        paymentAccepted: 'Cash, Credit Card, Bank Transfer',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'M9, Musaffah Industrial Area',
            addressLocality: 'Abu Dhabi',
            addressRegion: 'Abu Dhabi',
            addressCountry: 'AE',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 24.3539,
            longitude: 54.4973,
        },
        areaServed: [
            { '@type': 'City', name: 'Abu Dhabi' },
            { '@type': 'Place', name: 'Musaffah' },
            { '@type': 'Place', name: 'Khalifa City' },
            { '@type': 'Place', name: 'Al Reem Island' },
            { '@type': 'Place', name: 'Yas Island' },
            { '@type': 'Place', name: 'Saadiyat Island' },
        ],
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
                opens: '08:00',
                closes: '19:00',
            },
        ],
        sameAs: [
            'https://www.facebook.com/smartmotorauto/',
            'https://www.instagram.com/smartmotor_autorepair/',
            'https://ae.linkedin.com/company/smartmotorauto',
            'https://tiktok.com/@smartmotorae',
            'https://threads.net/@smartmotor_autorepair',
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Auto Repair Services',
            itemListElement: services.slice(0, 10).map((s, i) => ({
                '@type': 'OfferCatalog',
                name: s.name,
                itemListElement: {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: s.name,
                        url: `https://smartmotor.ae/services/${s.id}`,
                    },
                },
            })),
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '520',
            bestRating: '5',
        },
    }

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HomeCmsWrapper sectionId="home_hero" sectionName="Hero" initialData={heroCms}>
                <Hero cmsData={heroCms} brands={brands} />
            </HomeCmsWrapper>
            <HomeCmsWrapper sectionId="home_about" sectionName="About Snippet" initialData={aboutCms}>
                <AboutSnippet cmsData={aboutCms} />
            </HomeCmsWrapper>
            <Services services={services} />
            <HomeCmsWrapper sectionId="home_why" sectionName="Why Smart Motor" initialData={whyCms}>
                <WhySmartMotor cmsData={whyCms} />
            </HomeCmsWrapper>
            <ServicePackages packages={packages} />
            <BookingForm />
            <ReviewsCarousel />
            <NewsletterSection />
            <LocationMapSection />
            <Footer />
        </main>
    )
}
