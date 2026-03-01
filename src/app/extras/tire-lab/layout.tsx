import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tire Safety Simulator – Tread Wear & Braking Distance | Smart Motor Abu Dhabi',
  description: 'Visualize how tire tread wear affects braking distance and safety. Interactive simulator for UAE drivers from Smart Motor Abu Dhabi.',
  openGraph: {
    title: 'Tire Safety Simulator | Smart Motor Abu Dhabi',
    description: 'See how tread wear impacts braking distance. Essential for UAE road safety.',
    url: 'https://smartmotor.ae/extras/tire-lab',
    siteName: 'Smart Motor',
  },
  alternates: { canonical: 'https://smartmotor.ae/extras/tire-lab' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
