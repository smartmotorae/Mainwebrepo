import { Metadata } from 'next';
import { UserProfile } from '@/types/user';
import { getUserProfile } from '@/lib/firestore-utils';
import { MyBookings } from '@/components/user/my-bookings';
import { MyVehicles } from '@/components/user/my-vehicles';
import { MyProfile } from '@/components/user/my-profile';
import { MyLoyalty } from '@/components/user/my-loyalty';
import { redirect } from 'next/navigation';
import { verifyUserSession } from '@/lib/auth-utils';

export const metadata: Metadata = {
  title: 'My Dashboard | Smart Motor',
  description: 'Manage your bookings, vehicles, profile, and loyalty points.',
};

export default async function UserDashboardPage() {
  const session = await verifyUserSession(); // Session is guaranteed by parent layout

  if (!session) {
    redirect('/user/login'); // Should not happen if layout is configured correctly
  }

  let userProfile: UserProfile | null = null;
  try {
    userProfile = await getUserProfile(session.uid);
  } catch (error) {
    console.error('Error fetching user profile for dashboard:', error);
    redirect('/user/login'); // Redirect on profile fetch failure
  }

  if (!userProfile) {
    redirect('/user/login'); // Redirect if profile doesn't exist
  }

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div>
        <p className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] mb-2">
          Concierge Portal
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tighter uppercase italic leading-none">
          Welcome back, <span className="silver-shine">{(userProfile.name || 'User').split(' ')[0]}</span>
        </h1>
      </div>
      
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          <MyBookings />
          <MyVehicles />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <MyLoyalty />
          <MyProfile />
        </div>
      </div>
    </div>
  );
}
