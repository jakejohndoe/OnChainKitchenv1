'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase, WaitlistEntry } from '../../lib/supabase'
import DuckMascot from '../../components/DuckMascot'
import FloatingOrbs from '../../components/FloatingOrbs'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'duplicate' | 'error'>('idle')
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null)
  const [displayCount, setDisplayCount] = useState<number>(0)

  // Fetch waitlist count
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      if (!supabase) return

      try {
        const { count, error } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true })

        if (!error && count && count > 0) {
          setWaitlistCount(count)
        }
      } catch (error) {
        console.error('Failed to fetch waitlist count:', error)
      }
    }

    fetchWaitlistCount()
  }, [])

  // Count up animation
  useEffect(() => {
    if (waitlistCount && waitlistCount > displayCount) {
      const increment = Math.ceil(waitlistCount / 30) // Animate over ~30 frames
      const timer = setTimeout(() => {
        setDisplayCount(prev => {
          const next = prev + increment
          return next >= waitlistCount ? waitlistCount : next
        })
      }, 50) // 50ms per frame for smooth animation

      return () => clearTimeout(timer)
    }
  }, [waitlistCount, displayCount])

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img src="/logos/TA-Hero-Logo-White.png" alt="Trustless Academy" className="h-16 w-auto" />
              <h1 className="text-xl font-bold text-white">Trustless Academy</h1>
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/tutorials" className="text-gray-300 hover:text-purple-400 transition-colors">
              Tutorials
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <div className="relative min-h-[calc(100vh-73px)] flex flex-col items-center justify-center px-6 py-8">
        <FloatingOrbs />

        <div className="max-w-6xl w-full relative z-10">
          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left column: Branding & Tagline */}
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-8">
                <img src="/logos/TA-Hero-Logo-Text-White.png" alt="Trustless Academy" className="h-64 w-auto" />
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Web3 clicks when you click things
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Interactive blockchain tutorials on real networks. No coding required. Just curiosity.
              </p>

              {/* Live Waitlist Counter */}
              {waitlistCount && waitlistCount > 0 && (
                <div className="inline-flex items-center bg-purple-900/30 border border-purple-500/50 rounded-full px-4 py-2 mb-8 animate-fade-in">
                  <span className="text-purple-300 font-medium">
                    🌱 {displayCount} people on the waitlist
                  </span>
                </div>
              )}
            </div>

            {/* Right column: Features & Form */}
            <div className="space-y-8">

              {/* What's Inside */}
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">✨ What you'll learn</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-400 text-xl mt-1">🍳</span>
                    <div>
                      <p className="text-white font-medium">On-Chain Kitchen</p>
                      <p className="text-gray-400 text-sm">Master ERC-20, ERC-721, and ERC-1155 tokens</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-400 text-xl mt-1">🌱</span>
                    <div>
                      <p className="text-white font-medium">DeFi Garden</p>
                      <p className="text-gray-400 text-sm">Experience staking, vaults, and yield farming</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-400 text-xl mt-1">🚀</span>
                    <div>
                      <p className="text-white font-medium">More tutorials</p>
                      <p className="text-gray-400 text-sm">DAOs, governance, and advanced DeFi concepts</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-400 text-xl mt-1">💡</span>
                    <div>
                      <p className="text-white font-medium">Real understanding</p>
                      <p className="text-gray-400 text-sm">Not just theory — actually use blockchain technology</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signup card */}
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-lg">
                {status === 'success' ? (
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <span className="text-6xl">🎉</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">You're in!</h3>
                    <p className="text-gray-400">We'll be in touch soon with exclusive early access.</p>
                  </div>
                ) : status === 'duplicate' ? (
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <span className="text-6xl">✨</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">You're already on the list!</h3>
                    <p className="text-gray-400">We haven't forgotten about you. Updates coming soon.</p>
                    <button
                      onClick={() => {
                        setStatus('idle')
                        setEmail('')
                        setInterest('')
                      }}
                      className="mt-4 text-purple-400 hover:text-amber-700 transition-colors underline"
                    >
                      Sign up with a different email
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">🚀 Get Early Access</h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="satoshi@trustless.academy"
                          className="w-full px-4 py-4 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:shadow-lg focus:scale-[1.02] transition-all duration-300 text-lg"
                        />
                      </div>

                      <div>
                        <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-2">
                          What excites you most about Web3? (optional)
                        </label>
                        <textarea
                          id="interest"
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                          maxLength={200}
                          rows={2}
                          placeholder="DeFi, NFTs, DAOs, smart contracts..."
                          className="w-full px-4 py-4 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:shadow-lg focus:scale-[1.02] transition-all duration-300 resize-none"
                        />
                      </div>

                      {status === 'error' && (
                        <div className="bg-red-900/20 border border-red-900/30 rounded-lg p-3">
                          <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting || !email}
                        className="w-full relative bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 active:scale-95 animate-pulse-subtle"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Joining...
                          </span>
                        ) : (
                          '🎯 Join the Waitlist'
                        )}
                      </button>

                      <p className="text-center text-gray-400 text-sm">
                        Takes 5 seconds. No wallet needed. No spam, just learning.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <p className="text-lg font-medium text-purple-300 mb-2">Less trust = more truth</p>
              <div className="text-gray-400 text-sm">
                Built by <span className="text-white font-medium">@jakejohndoe</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="https://twitter.com/jakejohndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com/jakejohndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}