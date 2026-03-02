import type { Metadata } from 'next'
import { PackagesPageClient } from '@/components/v2/pages/packages-page'

export const metadata: Metadata = {
    title: 'Car Protection Packages Abu Dhabi | PPF, Ceramic Coating, Tinting',
    description: 'Elite car protection solutions in Abu Dhabi. Premium PPF installation, 9H ceramic coating, and heat-rejection window tinting with lifetime warranties. Protect your investment today.',
    openGraph: {
        title: 'Premium Car Protection Packages | Smart Motor Abu Dhabi',
        description: 'Military-grade protection and premium tinting solutions with industry-leading warranties in Musaffah, Abu Dhabi.',
        url: 'https://smartmotor.ae/packages',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/packages',
        languages: {
            'en': 'https://smartmotor.ae/packages',
            'ar': 'https://smartmotor.ae/ar/packages',
            'x-default': 'https://smartmotor.ae/packages',
        },
    },
}

export default function PackagesPage() {
    const packagesJsonLd = {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: "Smart Motor Car Protection Packages",
        description: "Elite car protection solutions in Abu Dhabi including Paint Protection Film, Ceramic Coating, and Window Tinting with lifetime warranties.",
        url: "https://smartmotor.ae/packages",
        provider: {
            "@type": "AutoRepair",
            name: "Smart Motor Auto Repair",
            url: "https://smartmotor.ae",
            telephone: "+97125555443",
            address: {
                "@type": "PostalAddress",
                streetAddress: "M9, Musaffah Industrial Area",
                addressLocality: "Abu Dhabi",
                addressRegion: "Abu Dhabi",
                addressCountry: "AE",
            },
        },
        itemListElement: [
            {
                "@type": "Offer",
                name: "Premium Automotive Protection",
                description: "Complete vehicle defense with lifetime warranty coverage, certified installation, and premium grade materials.",
                url: "https://smartmotor.ae/packages#premium-protection",
                availability: "https://schema.org/InStock",
                areaServed: { "@type": "City", name: "Abu Dhabi" },
            },
            {
                "@type": "Offer",
                name: "Paint Protection Film (PPF)",
                description: "Ultimate defense with lifetime warranty. Full body and front-end packages featuring self-healing technology, UV resistance, and high gloss or matte finishes.",
                url: "https://smartmotor.ae/packages#ppf",
                availability: "https://schema.org/InStock",
                areaServed: { "@type": "City", name: "Abu Dhabi" },
            },
            {
                "@type": "Offer",
                name: "Premium Window Tinting",
                description: "Up to 99% UV protection with high heat rejection. UAE-compliant shade options with 10-year warranty coverage.",
                url: "https://smartmotor.ae/packages#window-tinting",
                availability: "https://schema.org/InStock",
                areaServed: { "@type": "City", name: "Abu Dhabi" },
            },
        ],
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(packagesJsonLd) }} />
            <PackagesPageClient />
        </>
    )
}
