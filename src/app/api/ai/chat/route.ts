// src/app/api/ai/chat/route.ts
import { verifyUserSession } from '@/lib/auth-utils'
import { generateChatResponse } from '@/lib/ai'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await verifyUserSession()
    const userId = session?.uid || `guest_${Date.now()}`

    const body = await req.json()
    const { message, attachments, conversationId, systemInstruction } = body

    if (!message && (!attachments || attachments.length === 0)) {
      return NextResponse.json({ error: 'Message or attachments required' }, { status: 400 })
    }

    const convId = conversationId || `conv_${Date.now()}`
    
    // Using generateChatResponse from @/lib/ai
    const response = await generateChatResponse({
      userId,
      conversationId: convId,
      message,
      systemInstruction,
      attachments
    })

    return NextResponse.json({
      response,
      conversationId: convId,
    })
  } catch (error: any) {
    console.error('AI chat error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
