import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { verifyUserSession } from '@/lib/auth-utils'
import { UserSidebar } from '@/components/user/user-sidebar' // Assuming this component exists

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifyUserSession()

  if (!session) {
    redirect('/user/login')
  }

  const displayName = session.name ?? session.email?.split('@')[0] ?? 'User'
  const email = session.email ?? null

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Sidebar */}
      <UserSidebar displayName={displayName} email={email} />

      {/* Main content — offset by sidebar width on md+ */}
      <main className="md:ml-64 pt-16 md:pt-0 min-h-screen relative">
        {/* Ambient red glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
