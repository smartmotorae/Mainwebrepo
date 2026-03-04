import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth-utils'
import { adminDb } from '@/lib/firebase-admin'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// Toggle active state or delete a short URL
export async function PATCH(req: NextRequest) {
  try {
    // Verify admin session
    const session = await verifyAdminSession()
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, active } = await req.json()
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    if (!adminDb) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
    }

    await adminDb.collection('short_urls').doc(id).update({ active })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('URL manage PATCH error:', error)
    return NextResponse.json({ error: 'Failed to update URL' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await verifyAdminSession()
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    if (!adminDb) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
    }

    await adminDb.collection('short_urls').doc(id).delete()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('URL manage DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete URL' }, { status: 500 })
  }
}
