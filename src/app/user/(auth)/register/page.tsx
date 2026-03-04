'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { auth } from '@/lib/firebase-client'
import { toast } from 'sonner'
import { User, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react'

export default function UserRegisterPage() {
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)

  const isLoading = loading !== null

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return
    }

    setLoading('email')
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(credential.user, { displayName: fullName.trim() })
      const idToken = await credential.user.getIdToken()
      
      // Call unified session API (which will also create the profile)
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, fullName, email, role: 'user' }), // Pass role for profile creation
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Session creation failed')
      }
      
      router.push('/user/dashboard')
      router.refresh()
      toast.success(`Welcome, ${fullName.split(' ')[0]}!`)

    } catch (err: unknown) {
      const msg =
        err instanceof Error && 'code' in err
          ? (err as { code: string }).code === 'auth/email-already-in-use'
            ? 'An account with this email already exists.'
            : (err as Error).message
          : 'Registration failed. Please try again.'
      toast.error(msg)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-brand-red/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-dark/5 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md z-10"
      >
        <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50" />

          <div className="px-10 pt-12 pb-12">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 mb-4">
                <span className="text-4xl font-black uppercase tracking-tighter text-brand-red italic">
                  Smart
                </span>
                <span className="text-4xl font-black uppercase tracking-tighter text-brand-dark italic">
                  Motor
                </span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
                Join the Elite Garage
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-red transition-colors" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-4 rounded-2xl border-0 bg-brand-bg/50 ring-1 ring-inset ring-gray-100 text-sm font-bold text-brand-dark placeholder-gray-300 focus:ring-2 focus:ring-brand-dark focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Security ID (Email)</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-red transition-colors" />
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-4 rounded-2xl border-0 bg-brand-bg/50 ring-1 ring-inset ring-gray-100 text-sm font-bold text-brand-dark placeholder-gray-300 focus:ring-2 focus:ring-brand-dark focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Access Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-red transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-11 pr-12 py-4 rounded-2xl border-0 bg-brand-bg/50 ring-1 ring-inset ring-gray-100 text-sm font-bold text-brand-dark placeholder-gray-300 focus:ring-2 focus:ring-brand-dark focus:bg-white transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-dark transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
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
                    Initialize Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="text-center mt-8">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Already registered?{' '}
                <Link
                  href="/user/login"
                  className="text-brand-red hover:underline transition-all ml-1"
                >
                  Establish Session
                </Link>
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-[9px] font-black text-gray-300 mt-8 uppercase tracking-[0.4em]">
          By proceeding, you agree to our Terms of Service
        </p>
      </motion.div>
    </div>
  )
}
