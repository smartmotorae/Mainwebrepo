import { NextResponse } from 'next/server'
import { getContent, updateContent, deleteContent } from '@/lib/firebase-db'
import { verifyAdminSession } from '@/lib/auth-utils'

export const dynamic = 'force-dynamic'

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const session = await verifyAdminSession()
        if (!session || session.role !== 'admin') {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const article = await getContent(params.id)
        if (!article) {
            return new NextResponse('Not Found', { status: 404 })
        }

        return NextResponse.json(article)
    } catch (error) {
        console.error('[ARTICLE_GET]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const session = await verifyAdminSession()
        if (!session || session.role !== 'admin') {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const body = await req.json()
        
        // Update only allowed fields
        const updateData = {
            ...(body.title && { title: body.title }),
            ...(body.content && { content: body.content }),
            ...(body.published !== undefined && { published: body.published }),
        }

        await updateContent(params.id, updateData)
        const updated = await getContent(params.id)

        return NextResponse.json(updated)
    } catch (error) {
        console.error('[ARTICLE_PATCH]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const session = await verifyAdminSession()
        if (!session || session.role !== 'admin') {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        await deleteContent(params.id)

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.error('[ARTICLE_DELETE]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
