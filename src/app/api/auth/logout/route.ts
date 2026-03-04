import { NextRequest, NextResponse } from 'next/server';

/**
 * Unified logout endpoint that proxies to the session API for revocation and cookie clearing.
 */
export async function POST(req: NextRequest) {
  try {
    const sessionUrl = new URL('/api/session', req.nextUrl.origin);
    
    // Call the session API with DELETE method
    const res = await fetch(sessionUrl.toString(), {
      method: 'DELETE',
      headers: {
        'Cookie': req.headers.get('Cookie') || '',
      }
    });

    if (!res.ok) {
      throw new Error('Failed to revoke session via session API');
    }

    const response = NextResponse.json({ message: 'User logged out successfully' }, { status: 200 });
    
    // Also ensure cookie is cleared on this response as a fallback
    response.cookies.set('__session', '', { maxAge: 0, path: '/' });
    
    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
