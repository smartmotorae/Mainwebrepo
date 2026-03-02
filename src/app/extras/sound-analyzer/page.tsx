import type { Metadata } from 'next'
import SoundAnalyzer from './client'

export const metadata: Metadata = {
    title: 'Engine Sound Analyzer – AI Fault Detection | Smart Motor Abu Dhabi',
    description: 'AI-driven engine sound analyzer that identifies faults from audio patterns. Detect rod knock, lifter tick, belt whine, and more. Engine diagnostics in Abu Dhabi by Smart Motor.',
    openGraph: {
        title: 'Engine Sound Analyzer | Smart Motor Abu Dhabi',
        description: 'AI-powered engine sound analysis for fault detection and diagnosis.',
        url: 'https://smartmotor.ae/extras/sound-analyzer',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/extras/sound-analyzer',
    },
}

export default function SoundAnalyzerPage() {
    return <SoundAnalyzer />
}
