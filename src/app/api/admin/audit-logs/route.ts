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

    const snapshot = await adminDb.collection('audit_logs')
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get();
      
    const logs = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            timestamp: data.timestamp && typeof data.timestamp.toDate === 'function' 
                ? data.timestamp.toDate().toLocaleString() 
                : 'Unknown',
        };
    });

    return NextResponse.json(logs, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching admin audit logs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
