import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/lib/auth-utils';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Smart Motor',
  description: 'Admin control panel for Smart Motor.',
};

export default async function AdminDashboardPage() {
  const session = await verifyAdminSession(); // Session is guaranteed by parent layout

  if (!session) {
    redirect('/admin/(auth)/login'); // Should not happen if layout is configured correctly
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
      <p>You are logged in as admin: {session.email}</p>
      {/* Add admin-specific content here */}
    </div>
  );
}
