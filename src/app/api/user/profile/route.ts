import { NextRequest, NextResponse } from 'next/server';
import { getUserProfile, updateUserProfile } from '@/lib/firestore-utils';
import { getUserSession } from '@/lib/session';

export async function GET(req: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
    }
    const uid = session.uid;

    const userProfile = await getUserProfile(uid);
    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }
    return NextResponse.json(userProfile, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
    }
    const uid = session.uid;

    const updates = await req.json();

    await updateUserProfile(uid, updates);
    return NextResponse.json({ message: 'User profile updated successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
