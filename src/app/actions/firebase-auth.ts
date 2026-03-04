'use server'

import { cookies } from 'next/headers'
import { adminAuth } from '@/lib/firebase-admin'

const SESSION_COOKIE_NAME = '__session'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

/**
 * Server action to set the session cookie by exchanging an ID token.
 */
export async function setSessionCookie(idToken: string) {
    if (!adminAuth) {
        throw new Error('Firebase Admin Auth not initialized')
    }

    try {
        // Create a session cookie
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { 
            expiresIn: MAX_AGE_SECONDS * 1000 
        })

        const cookieStore = await cookies()
        cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: MAX_AGE_SECONDS,
            path: '/',
            sameSite: 'lax'
        })
    } catch (error: any) {
        console.error('setSessionCookie failed:', error)
        throw new Error('Session creation failed')
    }
}

/**
 * Server action to sign out and revoke the session cookie.
 */
export async function signOut() {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (sessionCookie && adminAuth) {
        try {
            await (adminAuth as any).revokeSessionCookies([sessionCookie])
        } catch (error) {
            console.warn('Error revoking session cookie on logout:', error)
        }
    }

    cookieStore.set(SESSION_COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
        path: '/',
    })
}
