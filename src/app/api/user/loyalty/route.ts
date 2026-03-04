import { NextRequest, NextResponse } from 'next/server';
import { getLoyaltyRecord } from '@/lib/firestore-utils';
import { getUserSession } from '@/lib/session';

export async function GET(req: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
    }
    const uid = session.uid;

    const loyaltyRecord = await getLoyaltyRecord(uid);
    if (!loyaltyRecord) {
      return NextResponse.json({ error: 'Loyalty record not found' }, { status: 404 });
    }
    return NextResponse.json(loyaltyRecord, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching loyalty record:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
