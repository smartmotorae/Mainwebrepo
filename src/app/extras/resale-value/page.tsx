import type { Metadata } from 'next'
import ResaleValue from './client'

export const metadata: Metadata = {
    title: 'Car Resale Value Calculator – Maintenance Impact | Smart Motor Abu Dhabi',
    description: 'Project your car\'s future resale value based on maintenance history. See how regular servicing at Smart Motor Abu Dhabi protects your investment over 5 years.',
    openGraph: {
        title: 'Car Resale Value Calculator | Smart Motor Abu Dhabi',
        description: 'See how regular maintenance protects your car\'s resale value over 5 years.',
        url: 'https://smartmotor.ae/extras/resale-value',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/extras/resale-value',
    },
}

export default function ResaleValuePage() {
    return <ResaleValue />
}
