import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/session';

export default async function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();

  if (!session) {
    redirect('/user/login?error=UNAUTHORIZED');
  }

  // Ensure customer role (admins can also access user dashboard)
  if (session.role !== 'customer' && session.role !== 'admin') {
    redirect('/user/login?error=FORBIDDEN');
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <main className="p-4 md:p-8 min-h-screen relative">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
