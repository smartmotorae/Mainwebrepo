import { describe, it, expect, vi, beforeEach } from 'vitest'
import { updateContentBlock, restoreContentVersion } from '../actions/cms-actions'
import * as firebaseDb from '../lib/firebase-db'
import { getAdminSession } from '../lib/session'

vi.mock('../lib/firebase-db', () => ({
  updateContent: vi.fn().mockResolvedValue({ success: true }),
  getService: vi.fn(),
  createAuditLog: vi.fn().mockResolvedValue('audit-1'),
  updateService: vi.fn().mockResolvedValue({ success: true }),
  createService: vi.fn().mockResolvedValue({ success: true }),
  deleteBrand: vi.fn().mockResolvedValue({ success: true }),
  createBrand: vi.fn().mockResolvedValue({ success: true }),
  getBrand: vi.fn(),
  getContent: vi.fn(),
  createContentHistory: vi.fn().mockResolvedValue('hist-1'),
  getContentHistoryById: vi.fn(),
}))

vi.mock('../lib/firebase-admin', () => ({
  getServerSession: vi.fn(),
  adminDb: {
    collection: vi.fn(),
  }
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('CMS Server Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(getAdminSession as any).mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN', name: 'Admin User' },
    })
  })

  it('should call updateContent, createContentHistory and createAuditLog on updateContentBlock', async () => {
    const formData = new FormData()
    formData.append('key', 'hero_title')
    formData.append('value', 'New Title')
    
    ;(firebaseDb.getContent as any).mockResolvedValue({
      title: 'hero_title',
      content: 'Old Title',
      published: true
    })

    await updateContentBlock(formData)

    expect(firebaseDb.createContentHistory).toHaveBeenCalledWith(
      expect.objectContaining({
        entityId: 'hero_title',
        entityType: 'ContentBlock',
        snapshot: expect.objectContaining({ content: 'Old Title' })
      })
    )

    expect(firebaseDb.updateContent).toHaveBeenCalledWith(
      'hero_title',
      expect.objectContaining({
        content: 'New Title',
      })
    )

    expect(firebaseDb.createAuditLog).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'admin-1',
        action: 'UPDATE_CONTENT_BLOCK',
      })
    )
  })

  it('should restore content from a history record', async () => {
    ;(firebaseDb.getContentHistoryById as any).mockResolvedValue({
      id: 'hist-1',
      entityId: 'hero_title',
      entityType: 'ContentBlock',
      snapshot: { content: 'Restored Value', published: true }
    })

    const result = await restoreContentVersion('hist-1')

    expect(result.success).toBe(true)
    expect(firebaseDb.updateContent).toHaveBeenCalledWith(
      'hero_title',
      expect.objectContaining({ content: 'Restored Value' })
    )
  })
})
