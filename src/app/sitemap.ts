import { MetadataRoute } from 'next'
import { adminGetAllServices, adminGetAllBrands, adminGetAllPublishedContent } from '@/lib/firebase-admin'

// Force dynamic rendering — prevents Vercel from caching this route as static HTML.
// This is critical for Google Search Console to receive valid XML.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartmotor.ae'

    // Static routes — canonical URLs only
    const staticRoutes = [
        { path: '', priority: 1.0, changeFreq: 'daily' as const },
        { path: '/services', priority: 0.9, changeFreq: 'weekly' as const },
        { path: '/about', priority: 0.8, changeFreq: 'monthly' as const },
        { path: '/contact', priority: 0.8, changeFreq: 'monthly' as const },
        { path: '/smart-tips', priority: 0.8, changeFreq: 'daily' as const },
        { path: '/packages', priority: 0.9, changeFreq: 'weekly' as const },
        { path: '/faq', priority: 0.8, changeFreq: 'monthly' as const },
        { path: '/careers', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/precision-parts', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/leyla', priority: 0.6, changeFreq: 'monthly' as const },
        { path: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
        { path: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
        // Extras / Interactive Tools
        { path: '/extras', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/extras/diagnostics', priority: 0.6, changeFreq: 'monthly' as const },
        { path: '/extras/ceramic', priority: 0.6, changeFreq: 'monthly' as const },
        { path: '/extras/tinting', priority: 0.6, changeFreq: 'monthly' as const },
        { path: '/extras/repair', priority: 0.6, changeFreq: 'monthly' as const },
        { path: '/extras/resale-value', priority: 0.6, changeFreq: 'monthly' as const },
        { path: '/extras/ac-efficiency', priority: 0.6, changeFreq: 'monthly' as const },
        { path: '/extras/oil-viscosity', priority: 0.6, changeFreq: 'monthly' as const },
        { path: '/extras/tire-lab', priority: 0.6, changeFreq: 'monthly' as const },
        { path: '/extras/sound-analyzer', priority: 0.6, changeFreq: 'monthly' as const },
        // Hub pages
        { path: '/hub', priority: 0.8, changeFreq: 'weekly' as const },
        { path: '/hub/traffic-fines', priority: 0.8, changeFreq: 'weekly' as const },
        { path: '/hub/regulations', priority: 0.8, changeFreq: 'monthly' as const },
        { path: '/hub/summer-safety', priority: 0.8, changeFreq: 'monthly' as const },
        // Vault
        { path: '/vault/compare', priority: 0.6, changeFreq: 'monthly' as const },
    ]

    const staticEntries = staticRoutes.map(({ path, priority, changeFreq }) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: changeFreq,
        priority,
    }))

    let services: any[] = []
    let brands: any[] = []
    let posts: any[] = []

    try {
        const results = await Promise.allSettled([
            adminGetAllServices(),
            adminGetAllBrands(),
            adminGetAllPublishedContent('BLOG')
        ])

        if (results[0].status === 'fulfilled') {
            services = results[0].value
        } else {
            console.error('Sitemap: Failed to fetch services:', results[0].reason)
        }

        if (results[1].status === 'fulfilled') {
            brands = results[1].value
        } else {
            console.error('Sitemap: Failed to fetch brands:', results[1].reason)
        }

        if (results[2].status === 'fulfilled') {
            posts = results[2].value
        } else {
            console.error('Sitemap: Failed to fetch content:', results[2].reason)
        }
    } catch (e) {
        console.error("Sitemap: Unexpected error during data fetching:", e)
    }

    const serviceRoutes = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.updatedAt?.toDate?.() || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    const brandRoutes = brands.map((brand) => ({
        url: `${baseUrl}/brand/${brand.slug || brand.id}`,
        lastModified: brand.updatedAt?.toDate?.() || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // Cross-Product Routes (Brand + Service)
    // Generates: /brand/bmw/engine-repair, /brand/mercedes/ppf, etc.
    const brandServiceRoutes = brands.flatMap((brand) => {
        const applicableServices = brand.serviceIds?.length
            ? services.filter(s => brand.serviceIds?.includes(s.slug))
            : services;

        return applicableServices.map(service => ({
            url: `${baseUrl}/brand/${brand.slug || brand.id}/${service.slug}`,
            lastModified: brand.updatedAt?.toDate?.() || new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.85,
        }));
    });

    // Blog/Smart Tips routes — uses /smart-tips/ URL path
    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/smart-tips/${post.slug}`,
        lastModified: post.updatedAt?.toDate?.() || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...staticEntries, ...serviceRoutes, ...brandRoutes, ...brandServiceRoutes, ...blogRoutes]
}
