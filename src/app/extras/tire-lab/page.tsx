import type { Metadata } from 'next'
import TireLab from './client'

export const metadata: Metadata = {
    title: 'Tire Safety Simulator – Tread Depth & Braking Distance | Smart Motor Abu Dhabi',
    description: 'Interactive tire safety lab. Visualize how tread depth impacts braking distance and safety. Tire inspection, replacement, and alignment service in Abu Dhabi by Smart Motor.',
    openGraph: {
        title: 'Tire Safety Simulator | Smart Motor Abu Dhabi',
        description: 'See how tread depth affects braking distance and driving safety.',
        url: 'https://smartmotor.ae/extras/tire-lab',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/extras/tire-lab',
    },
}

export default function TireLabPage() {
    return <TireLab />
}
