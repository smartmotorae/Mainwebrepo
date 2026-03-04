import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import UserDashboardPage from '../../app/user/(app)/dashboard/page'

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => ({ value: 'valid-session' }))
  }))
}))

vi.mock('next/navigation', () => ({
  notFound: vi.fn()
}))

vi.mock('@/components/user/my-bookings', () => ({
  MyBookings: () => <div data-testid="my-bookings">My Bookings Component</div>
}))
vi.mock('@/components/user/my-vehicles', () => ({
  MyVehicles: () => <div data-testid="my-vehicles">My Vehicles Component</div>
}))
vi.mock('@/components/user/my-profile', () => ({
  MyProfile: () => <div data-testid="my-profile">My Profile Component</div>
}))
vi.mock('@/components/user/my-loyalty', () => ({
  MyLoyalty: () => <div data-testid="my-loyalty">My Loyalty Component</div>
}))

vi.mock('@/lib/firestore-utils', () => ({
  getUserProfile: vi.fn().mockResolvedValue({ fullName: 'Test User' })
}))

vi.mock('firebase-admin', () => ({
  default: {
    apps: [{}],
    auth: vi.fn(() => ({
      verifySessionCookie: vi.fn().mockResolvedValue({ uid: 'user-1' })
    }))
  }
}))

describe('Customer Dashboard Integration', () => {
  it('renders all dashboard components', async () => {
    const jsx = await UserDashboardPage()
    render(jsx)
    
    expect(screen.getByTestId('my-bookings')).toBeDefined()
    expect(screen.getByTestId('my-vehicles')).toBeDefined()
    expect(screen.getByTestId('my-profile')).toBeDefined()
    expect(screen.getByTestId('my-loyalty')).toBeDefined()
    expect(screen.getByText(/Welcome back,/i)).toBeDefined()
    expect(screen.getByText(/Test/i)).toBeDefined()
  })
})
