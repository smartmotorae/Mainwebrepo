import type { Metadata } from 'next'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { Services } from '@/components/v2/sections/services'
import { adminGetAllServices } from '@/lib/firebase-admin'
import { Service } from '@/types'

export const metadata: Metadata = {
    title: 'Car Services in Abu Dhabi | Mechanical, Electrical, PPF, Detailing – Smart Motor',
    description: 'Full automotive services in Abu Dhabi: engine repair, AC service, electrical diagnostics, PPF installation, ceramic coating, window tinting & detailing. Mon–Sat 8AM–7PM.',
    openGraph: {
        title: 'Car Services Abu Dhabi | Smart Motor Auto Repair',
        description: 'Engine repair, AC, PPF, ceramic coating, window tinting & detailing. Certified technicians for all brands in Musaffah, Abu Dhabi.',
        url: 'https://smartmotor.ae/services',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/services',
        languages: {
            'en': 'https://smartmotor.ae/services',
            'ar': 'https://smartmotor.ae/ar/services',
            'x-default': 'https://smartmotor.ae/services',
        },
    },
}

export const revalidate = 3600

export default async function ServicesPage() {
    let servicesData: any[] = []
    try {
        servicesData = await adminGetAllServices()
    } catch (e) {
        console.error("DB Error", e);
    }

    const services: Service[] = servicesData.map(s => ({
        ...s,
        id: s.slug,
        descriptionAr: s.descriptionAr || '',
        category: (s.category as any) || 'mechanical',
        icon: s.icon || 'wrench',
        process: undefined,
        subServices: undefined,
        seo: undefined,
        detailedDescription: s.detailedDescription || undefined,
        image: s.image || undefined,
        iconImage: undefined
    }))

    const servicesJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Smart Motor Auto Repair Services",
        description: "Full automotive services in Abu Dhabi: engine repair, AC service, electrical diagnostics, PPF installation, ceramic coating, window tinting & detailing.",
        url: "https://smartmotor.ae/services",
        numberOfItems: services.length,
        itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
                "@type": "Service",
                name: s.name,
                description: s.description,
                url: `https://smartmotor.ae/services/${s.id}`,
                provider: {
                    "@type": "AutoRepair",
                    name: "Smart Motor Auto Repair",
                    url: "https://smartmotor.ae",
                },
            },
        })),
    }

    return (
        <main className="min-h-screen bg-brand-bg">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }} />
            <div>
                <section className="py-24 text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">
                            Engineering Catalog
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black text-brand-dark tracking-tighter uppercase leading-[0.85] italic mb-8">
                            MASTER <br />
                            <span className="silver-shine leading-none">SOLUTIONS</span>
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
                            Discover our comprehensive range of high-performance automotive services, precision-engineered for the world's most elite vehicles.
                        </p>
                    </div>
                </section>
                <Services services={services} />
            </div>
            <Footer />
        </main>
    )
}
