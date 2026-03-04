'use server'

import { adminAuth, adminDb } from "@/lib/firebase-admin"
import { verifyAdminSession } from "@/lib/auth-utils"
import { Timestamp } from "firebase-admin/firestore"
import { createUserSchema, type CreateUserInput } from "@/lib/validations/user"
import { revalidatePath } from "next/cache"

export async function createUser(data: CreateUserInput) {
    const session = await verifyAdminSession()

    // Security: Only Admins can create users
    if (!session || session.role !== "admin") {
        return {
            success: false,
            message: "Unauthorized: Only admins can create users",
        }
    }

    const result = createUserSchema.safeParse(data)

    if (!result.success) {
        return {
            success: false,
            message: "Validation failed",
            errors: result.error.flatten().fieldErrors,
        }
    }

    const { name, email, password, role } = result.data

    try {
        if (!adminAuth || !adminDb) {
            throw new Error("Firebase Admin not initialized")
        }
        // 1. Create in Firebase Auth
        const userRecord = await adminAuth.createUser({
            email,
            password,
            displayName: name,
        });

        // 2. Set Custom Claims (Role)
        await adminAuth.setCustomUserClaims(userRecord.uid, { role });

        // 3. Create in Firestore
        await adminDb.collection('users').doc(userRecord.uid).set({
            email: email.toLowerCase(),
            name,
            role,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        });

        revalidatePath("/admin/basecamp") // Adjusted from /admin/users to match new structure

        return {
            success: true,
            message: "User created successfully",
        }
    } catch (error: any) {
        console.error("Failed to create user:", error)
        return {
            success: false,
            message: error.message || "Failed to create user. Please try again.",
        }
    }
}
