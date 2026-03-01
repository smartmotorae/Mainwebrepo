import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UAE Traffic Fines 2026 – Abu Dhabi & Dubai Violations Database | Smart Motor',
  description: 'Complete searchable database of UAE traffic fines 2026. Abu Dhabi & Dubai violations, black points, vehicle impoundment rules, and penalty amounts in AED.',
  openGraph: {
    title: 'UAE Traffic Fines 2026 | Smart Motor Abu Dhabi',
    description: 'Complete database of UAE traffic violations, black points, and fines.',
    url: 'https://smartmotor.ae/hub/traffic-fines',
    siteName: 'Smart Motor',
  },
  alternates: { canonical: 'https://smartmotor.ae/hub/traffic-fines' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
