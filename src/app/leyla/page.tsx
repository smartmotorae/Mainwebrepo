import type { Metadata } from 'next'
import LeylaVoiceClient from './client'

export const metadata: Metadata = {
    title: 'Leyla AI – 24/7 Car Service Assistant | Smart Motor Abu Dhabi',
    description: 'Talk to Leyla, Smart Motor\'s AI-powered luxury car concierge. Ask about services, check availability, get instant quotes, and book your car service in Abu Dhabi.',
    openGraph: {
        title: 'Leyla AI – Your 24/7 Car Service Concierge | Smart Motor',
        description: 'AI-powered luxury car concierge. Ask about services, availability, and bookings.',
        url: 'https://smartmotor.ae/leyla',
        siteName: 'Smart Motor',
        type: 'website',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/leyla',
    },
}

export default function LeylaPage() {
    return <LeylaVoiceClient />
}
