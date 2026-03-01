import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AC Efficiency Lab – Car Climate Control Simulator | Smart Motor Abu Dhabi',
  description: 'Interactive thermal visualization of car AC cooling performance vs refrigerant gas levels. Essential for UAE\'s extreme summer heat. Smart Motor Abu Dhabi.',
  openGraph: {
    title: 'AC Efficiency Lab | Smart Motor Abu Dhabi',
    description: 'Car AC cooling performance simulator for UAE\'s extreme heat conditions.',
    url: 'https://smartmotor.ae/extras/ac-efficiency',
    siteName: 'Smart Motor',
  },
  alternates: { canonical: 'https://smartmotor.ae/extras/ac-efficiency' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
