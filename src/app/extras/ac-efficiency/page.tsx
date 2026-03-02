import type { Metadata } from 'next'
import ACEfficiency from './client'

export const metadata: Metadata = {
    title: 'Car AC Efficiency Lab – Cooling Performance Simulator | Smart Motor Abu Dhabi',
    description: 'Interactive AC cooling efficiency simulator. See how refrigerant gas levels affect cabin temperature in UAE 50°C+ heat. AC service and repair in Abu Dhabi by Smart Motor.',
    openGraph: {
        title: 'AC Efficiency Lab | Smart Motor Abu Dhabi',
        description: 'See how AC gas levels affect cooling in UAE extreme heat.',
        url: 'https://smartmotor.ae/extras/ac-efficiency',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/extras/ac-efficiency',
    },
}

export default function ACEfficiencyPage() {
    return <ACEfficiency />
}
