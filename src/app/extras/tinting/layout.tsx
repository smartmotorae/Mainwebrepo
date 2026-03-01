import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Window Tinting Simulator – Visualize Tint Levels | Smart Motor Abu Dhabi',
  description: 'Visualize different window tinting levels on luxury vehicles. See how VLT percentages look in real-time. UAE-legal tinting options from Smart Motor.',
  openGraph: {
    title: 'Window Tinting Simulator | Smart Motor Abu Dhabi',
    description: 'Visualize tint levels on luxury cars. UAE-legal window tinting options.',
    url: 'https://smartmotor.ae/extras/tinting',
    siteName: 'Smart Motor',
  },
  alternates: { canonical: 'https://smartmotor.ae/extras/tinting' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
