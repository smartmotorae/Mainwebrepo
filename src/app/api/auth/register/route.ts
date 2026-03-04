import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { createUserProfile, createLoyaltyRecord } from '@/lib/firestore-utils';
import { firebaseConfig } from '@/lib/firebase-config';

export async function POST(req: NextRequest) {
  try {
    // Initialize Firebase only when needed
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);

    const { email, password, fullName } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'Missing email, password, or full name' }, { status: 400 });
    }

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user profile in Firestore (Default to 'customer')
    await createUserProfile(user.uid, user.email || email, fullName, 'customer');
    
    // Create initial loyalty record
    await createLoyaltyRecord(user.uid);

    // Return the UID. The client will then call /api/session with the ID token
    // to establish the secure server-side session.
    return NextResponse.json({ 
      message: 'User registered successfully', 
      uid: user.uid 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
