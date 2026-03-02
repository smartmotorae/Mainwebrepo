import type { Metadata } from 'next'
import TrafficFinesClient from './client'

export const metadata: Metadata = {
    title: 'UAE Traffic Fines Index 2026 – Abu Dhabi & Dubai Violations | Smart Motor',
    description: 'Complete searchable database of UAE traffic fines, black points, and vehicle impoundment rules for Abu Dhabi and Dubai. Updated for 2026 by Smart Motor.',
    openGraph: {
        title: 'UAE Traffic Fines Index 2026 | Smart Motor Abu Dhabi',
        description: 'Searchable database of Abu Dhabi & Dubai traffic violations, black points, and impoundment rules.',
        url: 'https://smartmotor.ae/hub/traffic-fines',
        siteName: 'Smart Motor',
        type: 'website',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/hub/traffic-fines',
    },
}

export default function TrafficFinesPage() {
    const trafficFinesJsonLd = {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: "UAE Traffic Fines Index 2026",
        description: "Complete searchable database of UAE traffic fines, black points, and vehicle impoundment rules for Abu Dhabi and Dubai. Updated for 2026.",
        url: "https://smartmotor.ae/hub/traffic-fines",
        keywords: ["UAE traffic fines", "Abu Dhabi traffic violations", "Dubai traffic fines", "black points UAE", "vehicle impoundment UAE"],
        creator: {
            "@type": "Organization",
            name: "Smart Motor Auto Repair",
            url: "https://smartmotor.ae",
        },
        temporalCoverage: "2026",
        spatialCoverage: {
            "@type": "Place",
            name: "United Arab Emirates",
        },
        license: "https://smartmotor.ae/terms",
    }

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://smartmotor.ae" },
            { "@type": "ListItem", position: 2, name: "Driver's Hub", item: "https://smartmotor.ae/hub" },
            { "@type": "ListItem", position: 3, name: "Traffic Fines Index", item: "https://smartmotor.ae/hub/traffic-fines" },
        ],
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(trafficFinesJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <TrafficFinesClient />
        </>
    )
}
