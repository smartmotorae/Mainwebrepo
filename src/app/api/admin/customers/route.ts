import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { getAdminSession } from '@/lib/session';

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    if (!adminDb) {
      throw new Error('Firestore DB not initialized');
    }

    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get('search');
    const limit = Math.min(Number(searchParams.get('limit')) || 10, 100);
    const offset = Number(searchParams.get('offset')) || 0;

    let usersQuery: FirebaseFirestore.Query = adminDb.collection('users').orderBy('createdAt', 'desc');

    if (searchTerm) {
      // Basic search by name or email (case-insensitive, starts-with)
      const lowerSearchTerm = searchTerm.toLowerCase();
      usersQuery = usersQuery
        .where('name', '>=', lowerSearchTerm)
        .where('name', '<=', lowerSearchTerm + '\uf8ff');
    }
    
    // Simple offset pagination (Note: offset is not efficient for large datasets in Firestore)
    // But for MVP admin panel, it's usually fine.
    const snapshot = await usersQuery.limit(limit).offset(offset).get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching admin customers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
