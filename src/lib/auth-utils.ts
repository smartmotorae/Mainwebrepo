import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { cookies } from 'next/headers'
import { decodeSessionCookie } from './firebase-admin'
import { getUserProfile } from './firestore-utils'

const SESSION_COOKIE_NAME = '__session'

export interface SessionInfo {
  uid: string;
  email?: string;
  name?: string;
  role: 'customer' | 'admin';
}

/**
 * Generic session verification that decodes the cookie and fetches the Firestore profile.
 */
export async function verifySession(cookieStore?: ReadonlyRequestCookies): Promise<SessionInfo | null> {
  const currentCookies = cookieStore || await cookies();
  const sessionCookie = currentCookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  const decodedToken = await decodeSessionCookie(sessionCookie);
  if (!decodedToken) {
    return null;
  }

  // Get the most up-to-date role and name from Firestore
  const profile = await getUserProfile(decodedToken.uid);
  
  // Custom claims on the token take precedence if available, otherwise use Firestore
  const role = (decodedToken.role || profile?.role || 'customer') as 'customer' | 'admin';

  return {
    uid: decodedToken.uid,
    email: decodedToken.email,
    name: profile?.name || decodedToken.name || decodedToken.email?.split('@')[0],
    role: role,
  };
}

/**
 * Verifies the session cookie and returns user session information.
 */
export async function verifyUserSession(cookieStore?: ReadonlyRequestCookies): Promise<SessionInfo | null> {
  return verifySession(cookieStore);
}

/**
 * Verifies the session cookie and returns admin session information.
 * Ensures the user has the 'admin' role.
 */
export async function verifyAdminSession(cookieStore?: ReadonlyRequestCookies): Promise<SessionInfo | null> {
  const session = await verifySession(cookieStore);
  if (session?.role !== 'admin') {
    return null;
  }
  return session;
}
