import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dent Repair Before & After – Paintless Dent Removal | Smart Motor Abu Dhabi',
  description: 'See Smart Motor\'s precision dent repair results. Interactive before/after comparison of paintless dent removal on luxury vehicles in Abu Dhabi.',
  openGraph: {
    title: 'Dent Repair Comparison | Smart Motor Abu Dhabi',
    description: 'Before & after paintless dent removal on luxury vehicles.',
    url: 'https://smartmotor.ae/extras/repair',
    siteName: 'Smart Motor',
  },
  alternates: { canonical: 'https://smartmotor.ae/extras/repair' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
