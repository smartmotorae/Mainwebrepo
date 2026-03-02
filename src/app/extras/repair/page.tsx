import type { Metadata } from 'next'
import RepairComparison from './client'

export const metadata: Metadata = {
    title: 'Paintless Dent Repair Before & After | Smart Motor Abu Dhabi',
    description: 'Interactive before-and-after slider showing Smart Motor\'s precision paintless dent repair capabilities. See the difference our Abu Dhabi workshop delivers.',
    openGraph: {
        title: 'Dent Repair Before & After | Smart Motor Abu Dhabi',
        description: 'Interactive slider showing precision paintless dent repair results.',
        url: 'https://smartmotor.ae/extras/repair',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/extras/repair',
    },
}

export default function RepairPage() {
    return <RepairComparison />
}
