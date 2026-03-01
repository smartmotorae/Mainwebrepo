import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms of Service | Smart Motor Auto Repair Abu Dhabi',
    description: 'Terms and conditions for Smart Motor Auto Repair services in Abu Dhabi. Service warranty, booking policies, genuine parts commitment, and customer agreements.',
    openGraph: {
        title: 'Terms of Service | Smart Motor Auto Repair',
        description: 'Service terms, warranty policies, and customer agreements for Smart Motor Abu Dhabi.',
        url: 'https://smartmotor.ae/terms',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/terms',
    },
}

export default function TermsPage() {
        return (
            <main className="min-h-screen bg-brand-bg">
    
                <section className="pb-32 max-w-4xl mx-auto px-6">                <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">Service Agreement</span>
                <h1 className="text-5xl md:text-7xl font-black text-brand-dark tracking-tighter uppercase italic mb-16 leading-none">
                    TERMS OF <br />
                    <span className="silver-shine leading-none">ENGAGEMENT</span>
                </h1>

                <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-precision space-y-12 text-brand-dark/80 leading-relaxed font-medium">
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-brand-dark mb-4 italic">01. Service Warranty</h2>
                        <p>All mechanical repairs carried out by Smart Motor technicians include a 6-month or 10,000km warranty on labor. Spare parts are subject to manufacturer-specific warranty terms.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-brand-dark mb-4 italic">02. Booking & Cancellations</h2>
                        <p>Appointments can be managed via the Smart Assistant or direct channels. We request a 24-hour notice for cancellations to optimize workshop orchestration.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-brand-dark mb-4 italic">03. Genuine Parts Commitment</h2>
                        <p>Smart Motor strictly uses 100% genuine OEM parts. Using non-genuine parts provided by the client may void our service warranty.</p>
                    </div>
                    <div className="pt-8 border-t border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                        Jurisdiction: Abu Dhabi, United Arab Emirates
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
