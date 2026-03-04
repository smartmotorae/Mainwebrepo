'use server'

import { updateUser as updateUserDB, createAuditLog } from "@/lib/firebase-db"
import { revalidatePath } from "next/cache"
import { verifyAdminSession } from "@/lib/auth-utils"

type Role = "ADMIN" | "CUSTOMER" | "SUPPORT" | "EDITOR"

async function checkAdminSession() {
    const session = await verifyAdminSession()
    if (!session || session.role !== "admin" || !session.uid) {
        throw new Error("Unauthorized: Admin access required")
    }
    return session
}

export async function toggleUserRole(userId: string, currentRole: string) {
    const session = await checkAdminSession()

    const adminId = session.uid

    const newRole = currentRole === "ADMIN" ? "CUSTOMER" : "ADMIN"

    // Update user role
    await updateUserDB(userId, { role: newRole as any })

    // Log the action
    await createAuditLog({
        userId: adminId,
        action: "TOGGLE_ROLE",
        resource: `user:${userId}`,
        details: { from: currentRole, to: newRole }
    })

    revalidatePath("/admin/users")
    return { success: true, message: `User role updated to ${newRole}` }
}

export async function deleteUser(userId: string) {
    const session = await checkAdminSession()

    // Prevent admin from deleting themselves
    if (session.uid === userId) {
        throw new Error("Cannot delete your own account")
    }

    // Soft delete - mark as deleted
    await updateUserDB(userId, { deletedAt: new Date() as any })

    // Log the action
    await createAuditLog({
        userId: session.uid,
        action: "DELETE_USER",
        resource: `user:${userId}`,
        details: { method: "soft_delete" }
    })

    revalidatePath("/admin/users")
    return { success: true, message: "User deleted successfully" }
}

export async function updateUser(userId: string, data: { name: string, email: string, role: string }) {
    const session = await checkAdminSession()

    const { name, email, role } = data

    // Update user
    await updateUserDB(userId, { name, email, role: role as any })

    // Log the action
    await createAuditLog({
        userId: session.uid,
        action: "UPDATE_USER",
        resource: `user:${userId}`,
        details: { name, role }
    })

    revalidatePath("/admin/users")
    return { success: true, message: "User updated successfully" }
}
