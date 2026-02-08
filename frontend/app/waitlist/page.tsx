'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase, WaitlistEntry } from '../../lib/supabase'
import DuckMascot from '../../components/DuckMascot'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'duplicate' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    // Check if Supabase is configured
    if (!supabase) {
      console.warn('Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.')
      setStatus('error')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')

    try {
      // Try to insert the email
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{
          email: email.toLowerCase().trim(),
          interest: interest.trim() || null
        }])
        .select()

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505' || error.message?.includes('duplicate')) {
          setStatus('duplicate')
        } else {
          console.error('Supabase error:', error)
          setStatus('error')
        }
      } else {
        setStatus('success')
        setEmail('')
        setInterest('')
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <DuckMascot size="small" expression="happy" />
              <h1 className="text-xl font-bold text-gray-800">Trustless Academy</h1>
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/tutorials" className="text-gray-700 hover:text-blue-600 transition-colors">
              Tutorials
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* Headline with Duck */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-8">
              <DuckMascot size="large" expression="excited" />
            </div>

            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Learn Web3 by building, not memorizing
            </h2>

            {/* Bullet points */}
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-start space-x-3">
                <span className="text-amber-600 text-xl mt-1">•</span>
                <p className="text-gray-700 text-lg">Interactive tutorials on real blockchains</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-amber-600 text-xl mt-1">•</span>
                <p className="text-gray-700 text-lg">Build portfolio-ready projects step by step</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-amber-600 text-xl mt-1">•</span>
                <p className="text-gray-700 text-lg">From zero to deploying smart contracts</p>
              </div>
            </div>
          </div>

          {/* Signup card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="mb-4">
                  <span className="text-6xl">🎉</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You're in!</h3>
                <p className="text-gray-600">We'll be in touch soon with exclusive early access.</p>
              </div>
            ) : status === 'duplicate' ? (
              <div className="text-center py-8">
                <div className="mb-4">
                  <span className="text-6xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You're already on the list!</h3>
                <p className="text-gray-600">We haven't forgotten about you. Updates coming soon.</p>
                <button
                  onClick={() => {
                    setStatus('idle')
                    setEmail('')
                    setInterest('')
                  }}
                  className="mt-4 text-amber-600 hover:text-amber-700 transition-colors underline"
                >
                  Sign up with a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="satoshi@trustless.academy"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                    What do you want to learn about Web3? (optional)
                  </label>
                  <textarea
                    id="interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    maxLength={200}
                    rows={1}
                    placeholder="DeFi, NFTs, DAOs, smart contracts..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">Something went wrong. Please try again.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                </button>

                <p className="text-center text-gray-600 text-sm">
                  Join the waitlist. Be first to access new tutorials.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}