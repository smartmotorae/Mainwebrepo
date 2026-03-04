import { verifyAdminSession, verifyUserSession } from './auth-utils'

/**
 * Returns the current admin session, ensuring the user has the 'admin' role.
 */
export async function getAdminSession() {
  const session = await verifyAdminSession()
  if (session?.role === 'admin') {
    return { ...session, id: session.uid }
  }
  return null
}

/**
 * Returns the current user session (either admin or customer).
 */
export async function getUserSession() {
  const session = await verifyUserSession()
  if (session) {
    return { ...session, id: session.uid }
  }
  return null
}

/**
 * Ensures the current session is an admin session, otherwise throws an error.
 * Useful for server-side authorization checks.
 */
export async function requireAdmin() {
  const admin = await getAdminSession()
  if (!admin) {
    throw new Error('Unauthorized: Admin access required')
  }
  return admin
}

/**
 * Ensures a user is authenticated, otherwise throws an error.
 */
export async function requireUser() {
  const user = await getUserSession()
  if (!user) {
    throw new Error('Unauthorized: Authentication required')
  }
  return user
}
