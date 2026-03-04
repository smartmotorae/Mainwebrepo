import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { getAdminSession } from '@/lib/session';
import { updateLoyaltyRecord, getLoyaltyRecord } from '@/lib/firestore-utils';
import { UserProfile } from '@/types/user';
import admin from 'firebase-admin';

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    if (!adminDb) {
      throw new Error('Firestore DB not initialized');
    }

    const { uid, points, tier, reason } = await req.json();

    if (!uid || (points === undefined && tier === undefined)) {
      return NextResponse.json({ error: 'Missing user ID or loyalty update data' }, { status: 400 });
    }

    const oldRecord = await getLoyaltyRecord(uid);
    const updates: { points?: number; tier?: UserProfile['tier'] } = {};
    
    if (points !== undefined) updates.points = points;
    if (tier !== undefined) {
      const validTiers: UserProfile['tier'][] = ['bronze', 'silver', 'gold', 'platinum'];
      if (validTiers.includes(tier)) {
        updates.tier = tier;
      } else {
        return NextResponse.json({ error: 'Invalid loyalty tier provided' }, { status: 400 });
      }
    }

    await updateLoyaltyRecord(uid, updates);

    // Audit logging for loyalty point adjustments
    await adminDb.collection('audit_logs').add({
      action: 'loyalty_adjustment',
      targetUid: uid,
      changedBy: session.email || session.uid,
      oldPoints: oldRecord?.points,
      newPoints: points !== undefined ? points : oldRecord?.points,
      oldTier: oldRecord?.tier,
      newTier: tier !== undefined ? tier : oldRecord?.tier,
      reason: reason || 'Admin adjustment',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ message: 'Loyalty record updated and audited successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating loyalty record:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
