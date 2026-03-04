import admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import * as path from 'path'
import * as fs from 'fs'

// Initialize Firebase Admin SDK (ensure this is done only once)
if (!admin.apps.length) {
  const projectId = (process.env.FIREBASE_PROJECT_ID || '').trim()
  const clientEmail = (process.env.FIREBASE_CLIENT_EMAIL || '').trim()
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n').trim()

  if (!projectId || !clientEmail || !privateKey) {
    console.error('❌ Firebase Admin: Missing required env vars or malformed private key.', {
      hasProjectId: !!projectId,
      hasClientEmail: !!clientEmail,
      privateKeySnippet: privateKey ? privateKey.substring(0, 10) + '...[REDACTED]' + privateKey.substring(privateKey.length - 10) : '[NOT SET]',
      message: 'Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set correctly in Vercel. Private key needs actual newlines.'
    })
  } else {
    console.log('✅ Firebase Admin: All required env vars appear to be set.', {
        projectId: projectId,
        clientEmail: clientEmail,
        privateKeySnippet: privateKey.substring(0, 10) + '...[REDACTED]' + privateKey.substring(privateKey.length - 10),
    });
  }

  const serviceAccount = {
    type: 'service_account' as const,
    project_id: projectId,
    private_key: privateKey,
    client_email: clientEmail,
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
        'https://smartmotoruae-default-rtdb.asia-southeast1.firebasedatabase.app',
    })
    console.log('✅ Firebase Admin initialized for project:', projectId)
  } catch (initError: any) {
    console.error('❌ Firebase Admin initializeApp failed:', initError.message, initError)
  }
}

export const getAdminAuth = () => {
  if (!admin.apps.length) return null
  return admin.auth()
}

export const getAdminDb = () => {
  if (!admin.apps.length) return null
  return getFirestore(admin.app(), 'smartmotordb')
}

export const adminAuth = getAdminAuth()
export const adminDb = getAdminDb()

/**
 * Server-side session cookie decoder. Decodes the session cookie and returns Firebase claims.
 * Does NOT perform role-based authorization.
 */
export async function decodeSessionCookie(sessionCookie: string) {
  const auth = getAdminAuth()
  if (!auth) {
    console.error('decodeSessionCookie: Firebase Admin Auth not initialized')
    return null
  }

  try {
    const decodedToken = await auth.verifySessionCookie(sessionCookie, true)
    return decodedToken
  } catch (error) {
    console.warn('decodeSessionCookie verification failed:', error)
    return null
  }
}

// ─── Serialization helper — converts Firestore Timestamps to ISO strings ─────
// Required so data can cross the Server→Client component boundary as plain objects
function serializeDoc(data: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    if (value && typeof value === 'object' && 'toDate' in value && typeof (value as any).toDate === 'function') {
      // Firestore Timestamp — convert to ISO string
      result[key] = (value as any).toDate().toISOString()
    } else if (value && typeof value === 'object' && '_seconds' in value && '_nanoseconds' in value) {
      // Firestore Timestamp plain object form
      result[key] = new Date((value as any)._seconds * 1000).toISOString()
    } else if (Array.isArray(value)) {
      result[key] = value.map(v =>
        v && typeof v === 'object' ? serializeDoc(v as Record<string, unknown>) : v
      )
    } else if (value && typeof value === 'object' && value.constructor?.name === 'Object') {
      result[key] = serializeDoc(value as Record<string, unknown>)
    } else {
      result[key] = value
    }
  }
  return result
}

import { Service, Brand, BlogPost } from '@/types'

// ... existing code ...

export async function adminGetAllServices(): Promise<Service[]> {
  const db = getAdminDb()
  if (!db) {
    console.warn('adminGetAllServices: Firestore DB not initialized — check Firebase credentials in .env.local')
    return []
  }
  try {
    const snapshot = await db
      .collection('services')
      .get()

    console.log(`[DIAGNOSTIC] adminGetAllServices: Found ${snapshot.size} services in smartmotordb/services`)

    if (snapshot.empty) {
      console.warn('adminGetAllServices: No services found in smartmotordb/services — collection may need seeding')
      return []
    }

    const services = snapshot.docs.map(doc => serializeDoc({ id: doc.id, ...doc.data() })) as any as Service[]
    console.log(`[DIAGNOSTIC] First service: "${services[0]?.name || 'unnamed'}" (slug: ${services[0]?.id})`)
    return services
  } catch (error) {
    console.error('adminGetAllServices ERROR details:', error)
    return []
  }
}

export async function adminGetAllBrands(): Promise<Brand[]> {
  const db = getAdminDb()
  if (!db) return []
  try {
    const snapshot = await db
      .collection('brands')
      .orderBy('name', 'asc')
      .get()

    if (snapshot.empty) {
      console.warn('adminGetAllBrands: No brands found in smartmotordb/brands')
      return []
    }

    return snapshot.docs.map(doc => {
      const data = doc.data()
      const slug = (data.slug || doc.id).toLowerCase()

      // Safe check for optimized PNG
      let logoUrl = data.logoUrl || (data.logoFile ? '/brands-carousel/' + data.logoFile.replace(/^\/brands-carousel\//, '').replace(/^\/brands\//, '') : '/branding/logo.png')

      const pngPath = path.join(process.cwd(), 'public', 'brands', 'png', `${slug}.png`)
      if (fs.existsSync(pngPath)) {
        logoUrl = `/brands/png/${slug}.png`
      }

      return serializeDoc({
        id: doc.id,
        ...data,
        logoUrl
      })
    }) as any as Brand[]
  } catch (error) {
    console.error('adminGetAllBrands ERROR details:', error)
    return []
  }
}

export async function adminGetAllPublishedContent(type?: string): Promise<BlogPost[]> {
  const db = getAdminDb()
  if (!db) return []
  try {
    let query: FirebaseFirestore.Query = db.collection('content').where('published', '==', true)
    if (type) query = query.where('type', '==', type)
    const snapshot = await query.orderBy('createdAt', 'desc').get()
    return snapshot.docs.map(doc => serializeDoc({ id: doc.id, ...doc.data() })) as any as BlogPost[]
  } catch (error) {
    console.error('adminGetAllPublishedContent error:', error)
    return []
  }
}


export async function adminGetContentBySlug(slug: string): Promise<{ id: string; title: string; content: string; recommendedService?: string; category?: string; excerpt?: string; published?: boolean } | null> {
  const db = getAdminDb()
  if (!db) return null
  try {
    // Content docs use slug as document ID
    const doc = await db.collection('content').doc(slug).get()
    if (!doc.exists) return null
    return serializeDoc({ id: doc.id, ...doc.data() }) as any
  } catch (error) {
    console.error(`adminGetContentBySlug error for ${slug}:`, error)
    return null
  }
}

export async function adminGetContentBlock(key: string) {
  const db = getAdminDb()
  if (!db) return null
  try {
    const doc = await db.collection('contentBlocks').doc(key).get()
    return doc.exists ? serializeDoc(doc.data()!) : null
  } catch (error) {
    console.error(`adminGetContentBlock error for ${key}:`, error)
    return null
  }
}

export default admin
