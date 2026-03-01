import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Car Comparison Tool – Vehicle Specs & Analysis | Smart Motor Abu Dhabi',
  description: 'Compare cars side-by-side with detailed specs, maintenance costs, and expert insights. Make informed decisions with Smart Motor Abu Dhabi\'s vehicle comparison tool.',
  openGraph: {
    title: 'Car Comparison Tool | Smart Motor Abu Dhabi',
    description: 'Compare vehicle specs, maintenance costs, and performance side-by-side.',
    url: 'https://smartmotor.ae/vault/compare',
    siteName: 'Smart Motor',
  },
  alternates: { canonical: 'https://smartmotor.ae/vault/compare' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
