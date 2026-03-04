import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { getUserSession } from '@/lib/session';

export async function GET(req: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
    }
    const uid = session.uid;

    if (!adminDb) {
      throw new Error('Firestore DB not initialized');
    }

    // Fetch bookings for the authenticated user
    const bookingsSnapshot = await adminDb.collection('bookings')
      .where('userId', '==', uid)
      .orderBy('date', 'desc')
      .get();

    const bookings = bookingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(bookings, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching user bookings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
