import type { Metadata } from 'next'
import CeramicCoating from './client'

export const metadata: Metadata = {
    title: 'Ceramic Coating Hydrophobic Effect Simulator | Smart Motor Abu Dhabi',
    description: 'See how nano ceramic coating repels water and protects your car\'s paint. Interactive hydrophobic effect demonstration by Smart Motor Abu Dhabi.',
    openGraph: {
        title: 'Ceramic Coating Simulator | Smart Motor Abu Dhabi',
        description: 'Interactive hydrophobic effect demonstration for nano ceramic coating.',
        url: 'https://smartmotor.ae/extras/ceramic',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/extras/ceramic',
    },
}

export default function CeramicPage() {
    return <CeramicCoating />
}
