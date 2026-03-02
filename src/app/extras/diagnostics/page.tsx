import type { Metadata } from 'next'
import LiveDiagnostics from './client'

export const metadata: Metadata = {
    title: 'Real-Time Car Diagnostics Simulator | Smart Motor Abu Dhabi',
    description: 'Experience Smart Motor\'s real-time engine diagnostics simulator. See how our factory-grade telemetry systems detect faults, monitor performance, and protect your car in Abu Dhabi.',
    openGraph: {
        title: 'Real-Time Car Diagnostics Simulator | Smart Motor',
        description: 'Interactive engine diagnostics and fault detection simulation.',
        url: 'https://smartmotor.ae/extras/diagnostics',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/extras/diagnostics',
    },
}

export default function DiagnosticsPage() {
    return <LiveDiagnostics />
}
