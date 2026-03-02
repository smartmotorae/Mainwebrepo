import type { Metadata } from 'next'
import { adminGetContentBySlug } from '@/lib/firebase-admin'
import HubArticleClient from './client'

function formatTitle(slug: string): string {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

function formatCategory(category: string): string {
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
    const { category, slug } = await params
    const article = await adminGetContentBySlug(slug)

    const title = article?.title || formatTitle(slug)
    const categoryLabel = formatCategory(category)
    const description = article?.excerpt
        || (article?.content ? article.content.substring(0, 155).replace(/\s+/g, ' ').trim() + '...' : '')
        || `Expert ${categoryLabel.toLowerCase()} guide for UAE car owners. ${title} — compliance, safety, and maintenance intelligence from Smart Motor Abu Dhabi.`

    const fullTitle = `${title} | ${categoryLabel} | Smart Motor Abu Dhabi`

    return {
        title: fullTitle,
        description,
        openGraph: {
            title: fullTitle,
            description,
            url: `https://smartmotor.ae/hub/${category}/${slug}`,
            siteName: 'Smart Motor',
            type: 'article',
        },
        alternates: {
            canonical: `https://smartmotor.ae/hub/${category}/${slug}`,
        },
    }
}

export default async function HubArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = await params
    const article = await adminGetContentBySlug(slug)

    const categoryLabel = formatCategory(category)

    // JSON-LD Article + BreadcrumbList structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                '@id': `https://smartmotor.ae/hub/${category}/${slug}#article`,
                headline: article?.title || formatTitle(slug),
                description: article?.excerpt
                    || (article?.content ? article.content.substring(0, 155).replace(/\s+/g, ' ').trim() + '...' : `Expert ${categoryLabel.toLowerCase()} guide for UAE car owners.`),
                url: `https://smartmotor.ae/hub/${category}/${slug}`,
                publisher: {
                    '@type': 'AutomotiveBusiness',
                    '@id': 'https://smartmotor.ae/#organization',
                    name: 'Smart Motor Auto Repair',
                    url: 'https://smartmotor.ae',
                    telephone: '+97125555443',
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: 'M9, Musaffah Industrial Area',
                        addressLocality: 'Abu Dhabi',
                        addressRegion: 'Abu Dhabi',
                        addressCountry: 'AE',
                    },
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `https://smartmotor.ae/hub/${category}/${slug}`,
                },
                about: {
                    '@type': 'Thing',
                    name: categoryLabel,
                },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smartmotor.ae' },
                    { '@type': 'ListItem', position: 2, name: 'Hub', item: 'https://smartmotor.ae/hub' },
                    { '@type': 'ListItem', position: 3, name: categoryLabel, item: `https://smartmotor.ae/hub/${category}` },
                    { '@type': 'ListItem', position: 4, name: article?.title || formatTitle(slug), item: `https://smartmotor.ae/hub/${category}/${slug}` },
                ],
            },
        ],
    }

    // Serialize article for client component (avoid double-fetch)
    const articleData = article ? {
        title: article.title,
        content: article.content,
        service: article.recommendedService || 'Full Vehicle Inspection',
    } : null

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HubArticleClient category={category} slug={slug} serverArticle={articleData} />
        </>
    )
}
