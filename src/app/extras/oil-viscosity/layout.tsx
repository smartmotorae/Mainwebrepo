import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Oil Viscosity Simulator – Engine Oil Guide | Smart Motor Abu Dhabi',
  description: 'Interactive fluid dynamics showing why engine oil weight matters. Understand oil viscosity grades for UAE climate. Expert guide from Smart Motor Abu Dhabi.',
  openGraph: {
    title: 'Oil Viscosity Simulator | Smart Motor Abu Dhabi',
    description: 'Interactive guide to engine oil viscosity grades for UAE climate.',
    url: 'https://smartmotor.ae/extras/oil-viscosity',
    siteName: 'Smart Motor',
  },
  alternates: { canonical: 'https://smartmotor.ae/extras/oil-viscosity' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
