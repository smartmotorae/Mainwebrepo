import type { Metadata } from 'next'
import HubClient from './client'

export const metadata: Metadata = {
    title: "Driver's Intelligence Portal – UAE Car Ownership Guide | Smart Motor Abu Dhabi",
    description: 'The definitive resource for UAE luxury car ownership. Traffic fines index, automotive regulations, summer safety tips, and vehicle import guides from Smart Motor Abu Dhabi.',
    openGraph: {
        title: "Driver's Intelligence Portal | Smart Motor Abu Dhabi",
        description: 'Traffic fines, regulations, summer safety, and import guides for UAE car owners.',
        url: 'https://smartmotor.ae/hub',
        siteName: 'Smart Motor',
        type: 'website',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/hub',
    },
}

export default function HubPage() {
    const hubJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Driver's Intelligence Portal",
        description: "The definitive resource for UAE luxury car ownership. Traffic fines index, automotive regulations, summer safety tips, and vehicle import guides.",
        url: "https://smartmotor.ae/hub",
        publisher: {
            "@type": "AutoRepair",
            name: "Smart Motor Auto Repair",
            url: "https://smartmotor.ae",
        },
        mainEntity: {
            "@type": "ItemList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "UAE Traffic Fines Index", url: "https://smartmotor.ae/hub/traffic-fines" },
                { "@type": "ListItem", position: 2, name: "UAE Vehicle Regulations", url: "https://smartmotor.ae/hub/regulations" },
                { "@type": "ListItem", position: 3, name: "Summer Safety Guide", url: "https://smartmotor.ae/hub/summer-safety" },
            ],
        },
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubJsonLd) }} />
            <HubClient />
        </>
    )
}
