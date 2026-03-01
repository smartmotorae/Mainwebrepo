import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { adminGetAllPublishedContent } from '@/lib/firebase-admin'
import { BlogPost } from '@/types'
import { SmartTipsList } from '@/components/v2/sections/smart-tips-list'
import { SmartTipsHero } from '@/components/v2/sections/smart-tips-hero'
import { BookingForm } from '@/components/v2/sections/booking-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Smart Tips – Car Care & Maintenance Guides | Smart Motor Abu Dhabi',
    description: 'Expert car care tips, maintenance guides, and automotive insights from Smart Motor Abu Dhabi. Learn about PPF, ceramic coating, engine care, and more for UAE drivers.',
    openGraph: {
        title: 'Smart Tips – Car Care & Maintenance Guides | Smart Motor',
        description: 'Expert car care tips and maintenance guides from Abu Dhabi\'s trusted workshop.',
        url: 'https://smartmotor.ae/smart-tips',
        siteName: 'Smart Motor',
        type: 'website',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/smart-tips',
    },
}

export const revalidate = 3600

export default async function SmartTipsPage() {
    let postsData: BlogPost[] = []
    try {
        const content = await adminGetAllPublishedContent('BLOG')
        postsData = content.sort((a, b) => {
            const dateA = new Date(a.createdAt as any).getTime()
            const dateB = new Date(b.createdAt as any).getTime()
            return dateB - dateA
        })
    } catch (e) {
        console.error("DB Error", e);
    }

    const posts = postsData.map(p => {
        const dateObj = new Date((p.publishedAt || p.createdAt) as any)
        return {
            ...p,
            excerpt: p.excerpt || (p.content?.substring(0, 160) || ''),
            date: dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
            author: typeof p.author === 'object' ? p.author.name : (p.author || 'Smart Motor Team')
        }
    })

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <SmartTipsHero />
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <SmartTipsList posts={posts} />
                </div>
            </section>
            <BookingForm />
            <Footer />
        </main>
    )
}
