import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ceramic Coating Simulator – Hydrophobic Effect Demo | Smart Motor Abu Dhabi',
  description: 'See how 9H nano ceramic coating repels water and protects your car\'s paint. Interactive demo from Smart Motor Abu Dhabi\'s detailing experts.',
  openGraph: {
    title: 'Ceramic Coating Simulator | Smart Motor Abu Dhabi',
    description: 'Interactive demo showing how ceramic coating protects your car\'s paint in UAE heat.',
    url: 'https://smartmotor.ae/extras/ceramic',
    siteName: 'Smart Motor',
  },
  alternates: { canonical: 'https://smartmotor.ae/extras/ceramic' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
