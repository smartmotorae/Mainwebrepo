import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leyla – AI Car Service Assistant | Smart Motor Abu Dhabi',
  description: 'Chat with Leyla, Smart Motor\'s AI-powered automotive assistant. Get instant answers about car services, pricing, bookings, and maintenance advice in Abu Dhabi.',
  openGraph: {
    title: 'Leyla – AI Car Service Assistant | Smart Motor',
    description: 'AI-powered automotive assistant for car service questions and bookings.',
    url: 'https://smartmotor.ae/leyla',
    siteName: 'Smart Motor',
  },
  alternates: { canonical: 'https://smartmotor.ae/leyla' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
