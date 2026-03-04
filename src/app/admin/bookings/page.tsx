import { ToolPageLayout } from '@/components/admin/tool-page-layout'
import { getAllBookings } from '@/lib/firebase-db'
import { BookingsClient } from './bookings-client'

export const dynamic = 'force-dynamic'

export default async function BookingsPage() {
  let bookings: any[] = []

  try {
    bookings = await getAllBookings()
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
  }

  return (
    <ToolPageLayout
      title="Booking Manager"
      description="Manage all service bookings and appointments"
      backHref="/admin"
    >
      <BookingsClient initialBookings={bookings} />
    </ToolPageLayout>
  )
}
