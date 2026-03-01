import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Car Resale Value Calculator – AI Projection | Smart Motor Abu Dhabi',
  description: 'Project your car\'s future resale value based on maintenance history, mileage, and market trends. AI-powered tool from Smart Motor Abu Dhabi.',
  openGraph: {
    title: 'Car Resale Value Calculator | Smart Motor Abu Dhabi',
    description: 'AI-powered resale value projection based on your car\'s maintenance history.',
    url: 'https://smartmotor.ae/extras/resale-value',
    siteName: 'Smart Motor',
  },
  alternates: { canonical: 'https://smartmotor.ae/extras/resale-value' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
