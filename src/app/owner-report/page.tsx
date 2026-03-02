import { Metadata } from 'next'
import ClientReport from './ClientReport'

export const metadata: Metadata = {
    title: 'Executive SEO & Architecture Report | Smart Motor',
    description: 'Private presentation for Smart Motor ownership detailing the Q1 SEO & Architecture engineering sprint.',
    robots: {
        index: false,
        follow: false,
    }
}

export default function OwnerReportPage() {
    return <ClientReport />
}