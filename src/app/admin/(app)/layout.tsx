import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { verifyAdminSession } from '@/lib/auth-utils'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifyAdminSession()

  if (!session) {
    redirect('/admin/(auth)/login')
  }

  // Admin-specific layout components (e.g., admin sidebar, header) would go here.
  // For now, it's a minimal layout.
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-8">
        {children}
      </main>
    </div>
  )
}
