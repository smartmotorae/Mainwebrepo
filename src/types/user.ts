import { Timestamp } from 'firebase-admin/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  name: string; // Changed from fullName to name for consistency with session
  role: 'customer' | 'admin'; // Added role
  loyaltyPoints: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  phone?: string;
  address?: string;
  createdAt: Date | string | Timestamp; // Allow flexible date types
  updatedAt: Date | string | Timestamp;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin?: string;
  licensePlate?: string;
  lastServiceMileage?: number;
  createdAt: Date | string | Timestamp;
  updatedAt: Date | string | Timestamp;
}
