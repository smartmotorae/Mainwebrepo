import type { Metadata } from 'next'
import OilViscosity from './client'

export const metadata: Metadata = {
    title: 'Oil Viscosity Simulator – Engine Oil Weight Guide | Smart Motor Abu Dhabi',
    description: 'Interactive oil viscosity dynamics simulator. Understand how oil weight (0W-20, 10W-40, 20W-50) affects engine protection at different temperatures. Oil change service in Abu Dhabi.',
    openGraph: {
        title: 'Oil Viscosity Simulator | Smart Motor Abu Dhabi',
        description: 'Interactive guide to engine oil weight and viscosity dynamics.',
        url: 'https://smartmotor.ae/extras/oil-viscosity',
        siteName: 'Smart Motor',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/extras/oil-viscosity',
    },
}

export default function OilViscosityPage() {
    return <OilViscosity />
}
