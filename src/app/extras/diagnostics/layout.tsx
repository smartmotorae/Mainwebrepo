import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Car Diagnostics Tool – Live Engine Telemetry | Smart Motor Abu Dhabi',
  description: 'Simulated real-time engine diagnostics and fault detection. See how Smart Motor\'s AI-powered telemetry identifies vehicle issues before they become problems.',
  openGraph: {
    title: 'Car Diagnostics Tool | Smart Motor Abu Dhabi',
    description: 'AI-powered real-time engine diagnostics and fault detection simulator.',
    url: 'https://smartmotor.ae/extras/diagnostics',
    siteName: 'Smart Motor',
  },
  alternates: { canonical: 'https://smartmotor.ae/extras/diagnostics' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
