'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'
import { verifyAdminSession } from '@/lib/auth-utils'
import { swarmOrchestrator } from '@/lib/ai/swarm-orchestrator'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// ... existing code ...

/**
 * Triggers a manual refresh of the UAE Intelligence Hub via the Swarm.
 */
export async function triggerHubRefresh() {
    const session = await verifyAdminSession()
    if (!session || session.role !== 'admin') {
        throw new Error('Unauthorized')
    }

    return await swarmOrchestrator.refreshUAEIntelligence()
}

export async function generateContent(prompt: string) {
    const session = await verifyAdminSession()
    if (!session || session.role !== 'admin') {
        throw new Error('Unauthorized')
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
        const result = await model.generateContent(prompt)
        return {
            success: true,
            content: result.response.text()
        }
    } catch (error) {
        console.error('AI Generation Error:', error)
        return { success: false, content: 'Failed to generate content.' }
    }
}

/**
 * Exports a strategic report as a high-fidelity markdown file.
 */
export async function exportStrategyReport(content: string, title: string) {
    const session = await verifyAdminSession()
    if (!session || session.role !== 'admin') {
        throw new Error('Unauthorized')
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `strategy-report-${title.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.md`
    
    // In a real browser environment, this would trigger a download.
    // In a server action, we return the content and filename for the client to handle.
    return {
        success: true,
        filename,
        content: `# ${title}\nGenerated on: ${new Date().toLocaleString()}\n\n---\n\n${content}`
    }
}
