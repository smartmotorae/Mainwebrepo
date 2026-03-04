import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { verifyAdminSession } from '@/lib/auth-utils'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
    }
    const snapshot = await adminDb.collection('short_urls').orderBy('createdAt', 'desc').limit(200).get()

    const urls = snapshot.docs.map((doc: any) => {
      const data = doc.data()
      return {
        id: doc.id,
        shortCode: data.shortCode,
        originalUrl: data.originalUrl,
        customUrl: data.customUrl,
        clicks: data.clicks || 0,
        active: data.active ?? true,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        expiresAt: data.expiresAt?.toDate?.()?.toISOString() || null,
        metadata: data.metadata || {},
        analytics: {
          browsers: data.analytics?.browsers || {},
          devices: data.analytics?.devices || {},
          locations: data.analytics?.locations || {},
          referrers: data.analytics?.referrers || {},
        },
      }
    })

    return NextResponse.json({ success: true, urls })
  } catch (error) {
    console.error('URL list error:', error)
    return NextResponse.json({ error: 'Failed to fetch URLs' }, { status: 500 })
  }
}
