'use server'

import { GoogleGenerativeAI } from "@google/generative-ai"
import { adminDb } from "@/lib/firebase-admin"
import { verifyAdminSession } from "@/lib/auth-utils"
import { checkRateLimit, incrementRateLimit } from "@/lib/rate-limit"
import { Timestamp } from "firebase-admin/firestore"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

/**
 * Server action to generate SEO-optimized content using Gemini.
 * Enforces admin authorization and rate limits.
 * 
 * @param formData - The form data containing topic, keywords, and tone.
 * @returns Result object with success status and generated content.
 */
export async function generateContent(formData: FormData) {
    const session = await verifyAdminSession()

    if (!session || session.role !== "admin") {
        return { success: false, message: "Unauthorized", content: "" }
    }

    const userId = session.uid
    const canProceed = await checkRateLimit(userId, "GENERATE_ARTICLE", 10, 3600)
    
    if (!canProceed) {
        return {
            success: false,
            message: "Rate limit exceeded. You can generate up to 10 articles per hour.",
            content: ""
        }
    }

    const topic = formData.get("topic") as string
    const keywords = formData.get("keywords") as string
    const tone = formData.get("tone") as string

    if (!process.env.GEMINI_API_KEY) {
        console.error("AI Generation Error: Missing GEMINI_API_KEY")
        return { success: false, message: "AI Service configuration missing.", content: "" }
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        const prompt = `Write a professional SEO article about "${topic}". Keywords: ${keywords}. Tone: ${tone}. Format: Markdown.`

        const result = await model.generateContent(prompt)
        const text = result.response.text()
        const estimatedTokens = Math.ceil(text.length / 4)

        // Log to Firestore
        const db = adminDb
        if (db) {
            await db.collection('aiUsageLogs').add({
                userId,
                action: "GENERATE_ARTICLE",
                model: "gemini-1.5-flash",
                prompt: `Topic: ${topic} | Tone: ${tone}`,
                tokenCount: estimatedTokens,
                createdAt: Timestamp.now()
            })
        }

        await incrementRateLimit(userId, "GENERATE_ARTICLE", 3600)

        return { success: true, content: text }
    } catch (error) {
        console.error("AI Generation Error:", error)
        return { success: false, message: "Failed to generate content.", content: "" }
    }
}

