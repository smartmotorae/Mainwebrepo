'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase-client'
import { toast } from 'sonner'
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('UNAUTHORIZED')) {
      toast.error('Session expired. Please sign in again.')
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)

  const isLoading = loading !== null

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading('email')
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await credential.user.getIdToken()
      
      // Call unified session API
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Session creation failed')
      }
      const data = await res.json()
      if (data.role !== 'admin') {
        toast.error('Access denied. You are not an admin.')
        // Optionally, revoke session for non-admin attempts
        await fetch('/api/session', { method: 'DELETE' });
        return;
      }
      const redirectPath = '/admin/dashboard'
      router.push(redirectPath)
      router.refresh()

    } catch (err: unknown) {
      const msg =
        err instanceof Error && 'code' in err
          ? (err as { code: string }).code === 'auth/invalid-credential'
            ? 'Incorrect email or password.'
            : (err as Error).message
          : 'Sign-in failed. Please try again.'
      toast.error(msg)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-white/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-red/5 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md z-10"
      >
        <div className="bg-brand-dark/80 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/5 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50" />

          <div className="px-10 pt-12 pb-12">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 mb-4">
                <span className="text-4xl font-black uppercase tracking-tighter text-brand-red italic">
                  Smart
                </span>
                <span className="text-4xl font-black uppercase tracking-tighter text-white italic">
                  Motor
                </span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
                Admin Control Panel
              </p>
            </div>

            <form onSubmit={handleEmailSignIn} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Security ID (Admin)</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-brand-red transition-colors" />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-4 rounded-2xl border-0 bg-white/5 ring-1 ring-inset ring-white/10 text-sm font-bold text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-red focus:bg-white/10 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Access Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-brand-red transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-12 py-4 rounded-2xl border-0 bg-white/5 ring-1 ring-inset ring-white/10 text-sm font-bold text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-red focus:bg-white/10 transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-5 rounded-2xl bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#cc1f25] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-brand-red/20"
              >
                {loading === 'email' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Enter Control Panel
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="text-center mt-8">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Secured by Smart Motor AI
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-[9px] font-black text-gray-500 mt-8 uppercase tracking-[0.4em]">
          System Monitoring • Incident Logging • Data Encryption
        </p>
      </motion.div>
    </div>
  )
}
