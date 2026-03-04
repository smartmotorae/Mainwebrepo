import { NextRequest, NextResponse } from 'next/server'
import { verifyUserSession } from '@/lib/auth-utils'

export async function POST(req: NextRequest) {
  try {
    const session = await verifyUserSession()
    const { rating, text, platform } = await req.json()

    if (!rating || !text) {
      return NextResponse.json({ error: 'Rating and text are required' }, { status: 400 })
    }

    console.log(`New review received for ${platform || 'all'}:`, {
      userId: session?.uid || 'guest',
      rating,
      text
    })

    // Here you would integrate with Google Business Profile API and Facebook Graph API
    // For now, we simulate a successful post
    
    return NextResponse.json({ 
      success: true, 
      message: 'Review posted successfully to Google and Facebook' 
    })
  } catch (error) {
    console.error('Failed to post review:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
