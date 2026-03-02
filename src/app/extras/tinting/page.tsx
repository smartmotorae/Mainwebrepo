import type { Metadata } from 'next'
import TintingSimulator from './client'

export const metadata: Metadata = {
    title: 'Window Tinting Simulator – UAE Legal Tint Levels | Smart Motor Abu Dhabi',
    description: 'Visualize different window tint levels on luxury vehicles. See UAE-legal VLT percentages in real-time. Professional window tinting service in Abu Dhabi by Smart Motor.',
    openGraph: {
        title: 'Window Tinting Simulator | Smart Motor Abu Dhabi',
        description: 'Visualize UAE-legal tint levels on luxury vehicles in real-time.',
        url: 'https://smartmotor.ae/extras/tinting',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/extras/tinting',
    },
}

export default function TintingPage() {
    return <TintingSimulator />
}
