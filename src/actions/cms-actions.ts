'use server'

import { 
    updateContent, 
    getService, 
    createAuditLog, 
    updateService, 
    createService, 
    deleteBrand, 
    createBrand, 
    getBrand,
    updateBrand,
    getContent,
    createContentHistory,
    getContentHistoryById
} from "@/lib/firebase-db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { verifyAdminSession } from "@/lib/auth-utils"

async function checkAdmin() {
    const session = await verifyAdminSession()
    if (!session || session.role !== "admin" || !session.uid) {
        redirect("/admin/(auth)/login") // Redirect to admin login if not authenticated or not admin
    }
    return { user: { id: session.uid, name: session.name, email: session.email, role: session.role } } // Normalize session to match old structure for now
}

export async function updateContentBlock(formData: FormData) {
    const session = await checkAdmin()
    const adminId = session.user.id
    const adminName = session.user.name || session.user.email || "Unknown Admin"

    const key = formData.get("key") as string
    const value = formData.get("value") as string
    const valueAr = formData.get("valueAr") as string | null
    const type = (formData.get("type") as string) || "text"
    const status = (formData.get("status") as string) || "PUBLISHED"

    // 1. Snapshot previous state
    const previous = await getContent(key)
    if (previous) {
        await createContentHistory({
            entityId: key,
            entityType: 'ContentBlock',
            snapshot: previous,
            updatedBy: adminName
        })
    }

    // 2. Update content directly in Firestore
    await updateContent(key, {
        title: key,
        content: value,
        contentAr: valueAr || undefined,
        published: status === "PUBLISHED",
    })

    // 3. Log the audit trail
    await createAuditLog({
        userId: adminId,
        action: "UPDATE_CONTENT_BLOCK",
        resource: `content:${key}`,
        details: { status, type, valueSnippet: value.slice(0, 50) }
    })

    revalidatePath("/")
    revalidatePath("/admin/content")
    return { success: true }
}

export async function restoreContentVersion(historyId: string) {
    const session = await checkAdmin()
    const adminName = session.user.name || "Unknown Admin"

    try {
        const history = await getContentHistoryById(historyId) as any
        if (!history) throw new Error("History record not found")

        const { entityId, entityType, snapshot } = history

        // Snapshot current state as history before restoring
        let current: any = null
        if (entityType === 'Service') current = await getService(entityId)
        else if (entityType === 'Brand') current = await getBrand(entityId)
        else if (entityType === 'ContentBlock') current = await getContent(entityId)

        if (current) {
            await createContentHistory({
                entityId,
                entityType,
                snapshot: current,
                updatedBy: adminName
            })
        }

        // Restore
        if (entityType === 'Service') {
            await updateService(entityId, snapshot)
            revalidatePath("/services")
        } else if (entityType === 'Brand') {
            await updateBrandAction(entityId, snapshot)
            revalidatePath("/")
        } else if (entityType === 'ContentBlock') {
            await updateContent(entityId, snapshot)
            revalidatePath("/")
        }

        await createAuditLog({
            userId: session.user.id,
            action: "RESTORE_CONTENT",
            resource: `${entityType.toLowerCase()}:${entityId}`,
            details: { historyId }
        })

        revalidatePath("/admin/content")
        return { success: true }
    } catch (error: any) {
        console.error('Restoration Error:', error)
        return { success: false, error: error.message }
    }
}

export async function updateServiceAction(id: string, data: any) {
    const session = await checkAdmin()
    const adminName = session.user.name || session.user.email || "Unknown Admin"

    // 1. Verify service exists and snapshot it
    const previous = await getService(id) as any
    if (!previous) throw new Error("Service not found")

    await createContentHistory({
        entityId: id,
        entityType: 'Service',
        snapshot: previous,
        updatedBy: adminName
    })

    // 2. Update service
    await updateService(id, data)

    // 3. Log the audit trail
    await createAuditLog({
        userId: session.user.id,
        action: "UPDATE_SERVICE",
        resource: `service:${id}`,
        details: data
    })

    revalidatePath("/services")
    if (previous.slug) revalidatePath(`/services/${previous.slug}`)
    revalidatePath("/admin/content")
    return { success: true }
}

export async function updateBrandAction(id: string, data: any) {
    const session = await checkAdmin()
    const adminName = session.user.name || session.user.email || "Unknown Admin"

    // 1. Verify brand exists and snapshot it
    const previous = await getBrand(id) as any
    if (!previous) throw new Error("Brand not found")

    await createContentHistory({
        entityId: id,
        entityType: 'Brand',
        snapshot: previous,
        updatedBy: adminName
    })

    // 2. Update brand
    await updateBrand(id, data)

    // 3. Log the audit trail
    await createAuditLog({
        userId: session.user.id,
        action: "UPDATE_BRAND",
        resource: `brand:${id}`,
        details: data
    })

    revalidatePath("/")
    if (previous.slug) revalidatePath(`/brand/${previous.slug}`)
    revalidatePath("/admin/content")
    return { success: true }
}

export async function addBrand(formData: FormData) {
    await checkAdmin()

    const name = formData.get("name") as string
    const nameAr = formData.get("nameAr") as string | null

    await createBrand({
        name,
        nameAr: nameAr || undefined,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
    })

    revalidatePath("/admin/content")
    return { success: true }
}

export async function deleteBrandAction(id: string) {
    await checkAdmin()

    await deleteBrand(id)

    revalidatePath("/admin/content")
    return { success: true }
}

/**
 * Autonomous SEO Proposal Execution
 */
export async function executeSEOProposal(opportunityId: string, actions: any) {
    const session = await checkAdmin()
    const adminId = session.user.id!

    try {
        // In a real implementation, we would parse 'actions' and apply specific updates
        // For now, we simulate a successful meta-tag update
        await createAuditLog({
            userId: adminId,
            action: "EXECUTE_SEO_PROPOSAL",
            resource: `opportunity:${opportunityId}`,
            details: actions
        })

        revalidatePath("/")
        return { success: true }
    } catch (error: any) {
        console.error('Proposal Execution Error:', error)
        return { success: false, error: error.message }
    }
}

export async function createServiceAction(data: any) {
    try {
        const session = await checkAdmin()
        const adminName = session.user.name || session.user.email || "Unknown Admin"

        // 1. Create service
        const id = await createService(data)

        // 2. Snapshot the initial state
        await createContentHistory({
            entityId: id,
            entityType: 'Service',
            snapshot: data,
            updatedBy: adminName
        })

        // 3. Log the audit trail
        await createAuditLog({
            userId: session.user.id,
            action: "CREATE_SERVICE",
            resource: `service:${id}`,
            details: data
        })

        revalidatePath("/services")
        revalidatePath("/admin/content")
        return { success: true, id }
    } catch (error: any) {
        console.error('Create Service Error:', error)
        return { success: false, error: error.message || "Failed to create service" }
    }
}

// Keep original function names for backward compatibility
export { createServiceAction as createService, updateServiceAction as updateService, updateBrandAction as updateBrand, deleteBrandAction as deleteBrand }
