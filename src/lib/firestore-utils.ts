import { UserProfile, Vehicle } from '@/types/user';
import { adminDb } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

// Helper to ensure adminDb is initialized
const getDb = () => {
  if (!adminDb) throw new Error('Firestore DB not initialized');
  return adminDb;
}

// --- User Profile Management ---

export async function createUserProfile(uid: string, email: string, name: string, role: UserProfile['role']): Promise<UserProfile> {
  const newUser: UserProfile = {
    uid, // Changed from id to uid to match interface
    email,
    name,
    role,
    loyaltyPoints: 0,
    tier: 'bronze',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  await getDb().collection('users').doc(uid).set(newUser, { merge: true });
  return newUser;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const doc = await getDb().collection('users').doc(uid).get();
  if (doc.exists) {
    // Cast to UserProfile, assuming data matches
    return { uid: doc.id, ...doc.data() } as UserProfile;
  }
  return null;
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
  await getDb().collection('users').doc(uid).update({
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

// --- Vehicle Management (Sub-collection under User) ---

export async function addVehicle(uid: string, vehicleData: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> {
  const vehiclesSubCollection = getDb().collection('users').doc(uid).collection('vehicles');
  const newVehicleRef = vehiclesSubCollection.doc();
  
  const newVehicle: Vehicle = {
    id: newVehicleRef.id,
    ...vehicleData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  
  await newVehicleRef.set(newVehicle);
  return newVehicle;
}

export async function getVehicles(uid: string): Promise<Vehicle[]> {
  const vehiclesSubCollection = getDb().collection('users').doc(uid).collection('vehicles');
  const snapshot = await vehiclesSubCollection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Vehicle, 'id'>) }));
}

export async function updateVehicle(uid: string, vehicleId: string, updates: Partial<Vehicle>): Promise<void> {
  const vehiclesSubCollection = getDb().collection('users').doc(uid).collection('vehicles');
  await vehiclesSubCollection.doc(vehicleId).update({
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteVehicle(uid: string, vehicleId: string): Promise<void> {
  const vehiclesSubCollection = getDb().collection('users').doc(uid).collection('vehicles');
  await vehiclesSubCollection.doc(vehicleId).delete();
}

// --- Loyalty Management (New Collection) ---

export async function createLoyaltyRecord(uid: string, initialPoints: number = 0): Promise<void> {
  await getDb().collection('loyalty').doc(uid).set({
    uid,
    points: initialPoints,
    tier: 'bronze',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

export async function getLoyaltyRecord(uid: string): Promise<any | null> {
  const doc = await getDb().collection('loyalty').doc(uid).get();
  if (doc.exists) {
    return doc.data();
  }
  return null;
}

export async function updateLoyaltyRecord(uid: string, updates: {
  points?: number;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
}): Promise<void> {
  await getDb().collection('loyalty').doc(uid).update({
    ...updates,
    updatedAt: Timestamp.now(),
  });
}
