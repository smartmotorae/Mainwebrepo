import type { Metadata } from 'next'
import CareersClient from './client'

export const metadata: Metadata = {
    title: 'Careers at Smart Motor Auto Repair | Jobs in Abu Dhabi',
    description: 'Join Smart Motor Auto Repair in Musaffah, Abu Dhabi. We are hiring master diagnostic technicians, service advisors, and luxury car detailers. Apply now.',
    openGraph: {
        title: 'Careers at Smart Motor | Abu Dhabi Automotive Jobs',
        description: 'Join Abu Dhabi\'s premier car workshop. Hiring technicians, advisors, and detailers.',
        url: 'https://smartmotor.ae/careers',
        siteName: 'Smart Motor',
        type: 'website',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/careers',
    },
}

export default function CareersPage() {
    return <CareersClient />
}
