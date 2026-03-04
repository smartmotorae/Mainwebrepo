import { NextResponse } from 'next/server'
import { getAllPublishedContent, createContent } from '@/lib/firebase-db'
import { getAdminSession } from '@/lib/session'
import { z } from 'zod'
import { verifyAdminSession } from '@/lib/auth-utils'

export const dynamic = 'force-dynamic'

// Schema for creating an article
const articleSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    seoTitle: z.string().optional(),
    seoDesc: z.string().optional(),
    keywords: z.string().optional(),
    isPublished: z.boolean().default(false),
})

export async function GET(req: Request) {
    try {
        const session = await verifyAdminSession()
        if (!session || session.role !== 'admin') {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        // Get all published articles/content
        const articles = await getAllPublishedContent('BLOG')

        // Transform for backward compatibility
        const formattedArticles = articles.map((article: any) => ({
            id: article.id,
            title: article.title,
            slug: article.slug,
            content: article.content,
            seoTitle: article.title,
            seoDesc: article.content?.substring(0, 160),
            keywords: article.type || article.category,
            isPublished: article.published || !!article.publishedAt,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt || article.createdAt,
        }))

        return NextResponse.json(formattedArticles)
    } catch (error) {
        console.error('[ARTICLES_GET]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await verifyAdminSession()
        if (!session || session.role !== 'admin') {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const body = await req.json()
        const { title, content, seoTitle, seoDesc, keywords, isPublished } = articleSchema.parse(body)

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '') + '-' + Date.now().toString().slice(-4)

        const articleId = await createContent({
            type: 'BLOG',
            title,
            slug,
            content,
            author: session.name || 'Admin',
            published: isPublished,
        })

        return NextResponse.json({
            id: articleId,
            title,
            slug,
            content,
            seoTitle,
            seoDesc: seoDesc || title,
            keywords: keywords || '',
            isPublished,
        })
    } catch (error) {
        console.error('[ARTICLES_POST]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
