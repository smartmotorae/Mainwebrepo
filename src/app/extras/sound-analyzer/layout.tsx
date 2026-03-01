import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Engine Sound Analyzer – AI Audio Diagnostics | Smart Motor Abu Dhabi',
  description: 'AI-driven audio diagnostics to identify engine faults from sound patterns. Record your engine sound and get instant analysis from Smart Motor Abu Dhabi.',
  openGraph: {
    title: 'Engine Sound Analyzer | Smart Motor Abu Dhabi',
    description: 'AI audio diagnostics to identify engine faults from sound patterns.',
    url: 'https://smartmotor.ae/extras/sound-analyzer',
    siteName: 'Smart Motor',
  },
  alternates: { canonical: 'https://smartmotor.ae/extras/sound-analyzer' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
