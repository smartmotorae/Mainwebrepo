import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase-admin'
import { UserProfile } from '@/types/user'
import { getUserProfile, createUserProfile, createLoyaltyRecord } from '@/lib/firestore-utils'

const SESSION_COOKIE_NAME = '__session'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

export async function POST(request: NextRequest) {
  try {
    const { idToken, fullName, email, role } = await request.json()

    if (!idToken) {
      return NextResponse.json({ error: 'ID token is required' }, { status: 400 })
    }

    if (!adminAuth) {
      throw new Error('Firebase Admin Auth not initialized')
    }

    // 1. Verify the ID token to get the UID
    const decodedIdToken = await adminAuth.verifyIdToken(idToken)
    const uid = decodedIdToken.uid

    // 2. Create a session cookie
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { 
      expiresIn: MAX_AGE_SECONDS * 1000 
    })

    // 3. Ensure user profile exists (for new registrations)
    let profile = await getUserProfile(uid)
    if (!profile && fullName && email) {
        // Create profile if missing but data is provided (e.g., during registration)
        profile = await createUserProfile(uid, email, fullName, (role || 'customer') as any)
        await createLoyaltyRecord(uid)
        console.log(`Firestore profile created for user: ${uid}`)
    }

    const finalRole = (decodedIdToken.role || profile?.role || 'customer') as 'customer' | 'admin'

    // 4. Set the session cookie in the response
    const response = NextResponse.json({ 
      success: true, 
      uid, 
      role: finalRole,
      name: profile?.name || decodedIdToken.name || decodedIdToken.email?.split('@')[0]
    })

    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: MAX_AGE_SECONDS,
      path: '/',
      sameSite: 'lax'
    })

    return response

  } catch (error: any) {
    console.error('[API /session POST] error:', error)
    if (error.code === 'auth/argument-error' || error.code === 'auth/id-token-expired') {
      return NextResponse.json({ error: 'Invalid or expired ID token' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Session creation failed', details: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!adminAuth) {
      throw new Error('Firebase Admin Auth not initialized')
    }
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
    if (sessionCookie) {
      try {
        await (adminAuth as any).revokeSessionCookies([sessionCookie])
      } catch (e) {
        console.warn('Session revocation failed (might be already expired):', e)
      }
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set(SESSION_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
      path: '/',
    })
    return response

  } catch (error: any) {
    console.error('[API /session DELETE] error:', error)
    return NextResponse.json({ error: 'Logout failed', details: error.message }, { status: 500 })
  }
}
