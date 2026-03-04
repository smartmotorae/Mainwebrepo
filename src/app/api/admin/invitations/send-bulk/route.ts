import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { verifyAdminSession } from '@/lib/auth-utils'
import { FieldValue } from 'firebase-admin/firestore'
import { generateSecureToken } from '@/lib/tokens'
import { sendEmail } from '@/lib/email'
import { generateAdminInvitationEmail } from '@/lib/emails/admin-invitation'

interface BulkInviteRequest {
  admins: Array<{
    email: string
    name: string
  }>
  companyName?: string
  senderName?: string
}

/**
 * POST /api/admin/invitations/send-bulk
 * Send bulk admin invitations with setup links
 *
 * Restricted to: Admin only
 */
export async function POST(request: NextRequest) {
    try {
        if (!adminDb) {
            throw new Error('Firebase Admin not initialized')
        }

        // Check for admin session
        const session = await verifyAdminSession()
        if (!session || session.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized: Admin access required' },
                { status: 401 }
            )
        }

        const body: BulkInviteRequest = await request.json()
        const { admins, companyName = 'Smart Motor Performance', senderName = 'Admin Team' } = body

        if (!admins || admins.length === 0) {
            return NextResponse.json(
                { error: 'No admin emails provided' },
                { status: 400 }
            )
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://smartmotorlatest.vercel.app'
        const invitations = []
        const failedInvites = []

        for (const admin of admins) {
            try {
                // Check if admin already exists
                const existing = await adminDb.collection('admins')
                    .where('email', '==', admin.email)
                    .get()

                if (!existing.empty) {
                    failedInvites.push({
                        email: admin.email,
                        reason: 'Admin already exists'
                    })
                    continue
                }

                // Generate secure token
                const token = generateSecureToken()
                const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

                // Create invitation in Firestore
                const invitationRef = await adminDb.collection('adminInvitations').add({
                    email: admin.email,
                    name: admin.name,
                    token: token,
                    tokenHash: token, // In production, hash this
                    createdAt: FieldValue.serverTimestamp(),
                    expiresAt: expiryTime,
                    status: 'pending',
                    usedAt: null,
                    sentAt: new Date(),
                    companyName: companyName,
                    senderName: senderName,
                })

                // Generate setup link
                const setupLink = `${appUrl}/admin/setup/${token}`

                // Send invitation email
                const html = generateAdminInvitationEmail(
                    admin.name,
                    admin.email,
                    setupLink,
                    companyName,
                    senderName
                )

                const emailResult = await sendEmail({
                    to: admin.email,
                    subject: `${companyName} - Admin Account Setup Invitation`,
                    html,
                    text: `You have been invited to join ${companyName} as an admin. Click the link to set up your account: ${setupLink}`,
                    replyTo: 'hello@smartmotor.ae'
                })

                if (emailResult.success) {
                    invitations.push({
                        email: admin.email,
                        name: admin.name,
                        token: token,
                        setupLink: setupLink,
                        invitationId: invitationRef.id,
                        status: 'sent',
                        messageId: emailResult.messageId
                    })
                } else {
                    failedInvites.push({
                        email: admin.email,
                        reason: emailResult.error || 'Failed to send email'
                    })
                }
            } catch (error) {
                console.error(`Error creating invitation for ${admin.email}:`, error)
                failedInvites.push({
                    email: admin.email,
                    reason: error instanceof Error ? error.message : 'Unknown error'
                })
            }
        }

        return NextResponse.json({
            success: true,
            message: `Sent ${invitations.length} invitation(s)`,
            invitations,
            failed: failedInvites,
            totalAttempted: admins.length,
            totalSuccessful: invitations.length,
            totalFailed: failedInvites.length
        })
    } catch (error) {
        console.error('Bulk invitation error:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
