'use client'

import DuckMascot from '../../../../components/DuckMascot'
import { useAccount, useReadContract } from 'wagmi'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { formatEther } from 'viem'
import {
  SEED_TOKEN_ADDRESS,
  SEED_TOKEN_ABI,
  STAKED_SEED_TOKEN_ADDRESS,
  STAKED_SEED_TOKEN_ABI,
  GREENHOUSE_ADDRESS,
  GREENHOUSE_ABI
} from '../../../../lib/defiGardenContracts'

// Additional ABI methods if needed
const ADDITIONAL_SEED_ABI = [
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [{"name": "account", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  }
] as const

const ADDITIONAL_STAKED_ABI = [
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [{"name": "account", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  }
] as const

const ADDITIONAL_GREENHOUSE_ABI = [
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [{"name": "account", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "convertToAssets",
    "inputs": [{"name": "shares", "type": "uint256"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  }
] as const

// Combine ABIs
const FULL_SEED_ABI = [...SEED_TOKEN_ABI, ...ADDITIONAL_SEED_ABI] as const
const FULL_STAKED_ABI = [...STAKED_SEED_TOKEN_ABI, ...ADDITIONAL_STAKED_ABI] as const
const FULL_GREENHOUSE_ABI = [...GREENHOUSE_ABI, ...ADDITIONAL_GREENHOUSE_ABI] as const

export default function CompletePage() {
  const { isConnected, address } = useAccount()
  const [confetti, setConfetti] = useState(false)

  // Read user's balances
  const { data: seedBalance } = useReadContract({
    address: SEED_TOKEN_ADDRESS,
    abi: FULL_SEED_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  const { data: sSeedBalance } = useReadContract({
    address: STAKED_SEED_TOKEN_ADDRESS,
    abi: FULL_STAKED_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  const { data: vaultShares } = useReadContract({
    address: GREENHOUSE_ADDRESS,
    abi: FULL_GREENHOUSE_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  const { data: vaultValue } = useReadContract({
    address: GREENHOUSE_ADDRESS,
    abi: FULL_GREENHOUSE_ABI,
    functionName: 'convertToAssets',
    args: vaultShares ? [vaultShares] : undefined,
  })

  // Trigger confetti effect on load
  useEffect(() => {
    setConfetti(true)
    const timer = setTimeout(() => setConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Calculate total portfolio value
  const totalValue = (
    (seedBalance ? Number(formatEther(seedBalance as bigint)) : 0) +
    (sSeedBalance ? Number(formatEther(sSeedBalance as bigint)) : 0) +
    (vaultValue ? Number(formatEther(vaultValue as bigint)) : 0)
  ).toFixed(4)

  const hasActivePositions = (sSeedBalance && (sSeedBalance as bigint) > BigInt(0)) || (vaultShares && (vaultShares as bigint) > BigInt(0))

  // Achievement data
  const achievements = [
    {
      title: "🌰 Seed Collector",
      description: "Claimed SEED tokens from the faucet",
      completed: seedBalance && (seedBalance as bigint) > BigInt(0)
    },
    {
      title: "🌱 First Planting",
      description: "Staked SEED tokens in the garden",
      completed: hasActivePositions
    },
    {
      title: "🏡 Greenhouse Farmer",
      description: "Used auto-compounding vault",
      completed: vaultShares && (vaultShares as bigint) > BigInt(0)
    },
    {
      title: "📚 DeFi Scholar",
      description: "Completed the entire DeFi Garden tutorial",
      completed: true
    }
  ]

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
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300 bg-emerald-600 px-3 py-1 rounded-full">
              DeFi Garden: Complete! 🎉
            </div>
            <div className="text-sm text-gray-300 bg-blue-600 px-3 py-1 rounded-full">
              Sepolia Testnet
            </div>
          </div>
        </div>
      </header>

      {/* Confetti Animation */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              >
                {['🎉', '🌱', '🌿', '🏡', '💰'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 pb-32">
        {/* Page Header */}
        <div className="text-center mb-12">
          <DuckMascot size="large" expression="excited" className="mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl font-bold text-white mb-4">
            🎓 Garden Master!
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Congratulations! You've successfully completed The DeFi Garden and learned the fundamentals of decentralized finance.
          </p>
          <div className="bg-green-100 rounded-xl p-4 mt-6 max-w-2xl mx-auto">
            <p className="text-sm text-gray-900">
              <strong>🎉 Achievement Unlocked:</strong> You now understand token approvals, staking mechanics, receipt tokens, auto-compounding vaults, and reward distribution!
            </p>
          </div>
        </div>

        {!isConnected ? (
          <div className="text-center">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">🔗 Connect Your Wallet</h3>
              <p className="text-gray-400">
                Connect your wallet to see your final garden summary.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Portfolio Summary */}
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/50 p-8 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-white mb-4">🌿 Your Final Garden</h3>

              <div className="text-6xl mb-4">🌳</div>

              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">SEED Balance</p>
                  <p className="text-2xl font-bold text-green-400">
                    {seedBalance ? formatEther(seedBalance as bigint) : '0'}
                  </p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">Staked (sSEED)</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {sSeedBalance ? formatEther(sSeedBalance as bigint) : '0'}
                  </p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">Vault Value</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {vaultValue ? formatEther(vaultValue as bigint) : '0'}
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-green-800/30 p-4 rounded-xl">
                <p className="text-green-300 text-sm">Total Portfolio Value</p>
                <p className="text-3xl font-bold text-green-400">{totalValue} SEED</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6">🏆 Your Achievements</h3>

              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      achievement.completed
                        ? 'border-green-500 bg-green-900/30'
                        : 'border-slate-600 bg-slate-700/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {achievement.completed ? '✅' : '⏳'}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{achievement.title}</h4>
                        <p className="text-gray-400 text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What You Learned */}
            <div className="bg-yellow-100 border border-yellow-300 p-6 rounded-xl">
              <div className="flex items-start space-x-4">
                <DuckMascot size="medium" expression="happy" className="flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">🎓 What You Mastered</h3>
                  <div className="text-gray-900 space-y-2 text-sm">
                    <p><strong>Token Standards:</strong> ERC-20 tokens, faucets, and testnet interactions</p>
                    <p><strong>DeFi Mechanics:</strong> Token approvals, staking, and receipt tokens</p>
                    <p><strong>Yield Strategies:</strong> Manual vs. auto-compounding, ERC-4626 vaults</p>
                    <p><strong>Reward Systems:</strong> Synthetix-style time-based reward distribution</p>
                    <p><strong>Risk Management:</strong> Understanding impermanent loss, smart contract risk</p>
                    <p><strong>Real Protocols:</strong> These patterns power Aave, Lido, Yearn, Compound, and more!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Journey */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-white mb-4">🚀 Continue Your Journey</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-900/30 border border-purple-500/50 p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-white mb-2">💼 Ready for Real DeFi?</h4>
                  <p className="text-purple-300 text-sm mb-4">
                    Try these concepts on mainnet with real protocols like Aave, Compound, or Lido.
                  </p>
                  <p className="text-purple-400 text-xs">
                    ⚠️ Always start small and understand the risks!
                  </p>
                </div>

                <div className="bg-blue-900/30 border border-blue-500/50 p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-white mb-2">📚 Keep Learning</h4>
                  <p className="text-blue-300 text-sm mb-4">
                    Explore more advanced topics like DEX trading, liquidity providing, and yield farming.
                  </p>
                  <Link
                    href="/tutorials"
                    className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    <span>Browse More Tutorials</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Share Achievement */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/50 p-6 rounded-xl">
                <h3 className="text-lg font-medium text-white mb-2">📢 Share Your Success</h3>
                <p className="text-purple-300 text-sm mb-4">
                  You've completed an advanced DeFi tutorial! Let the world know about your Web3 journey.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      const text = `Just completed The DeFi Garden tutorial at Trustless Academy! 🌱🎓 Learned about staking, yield farming, and auto-compounding vaults. Ready for real DeFi! #DeFi #Web3 #TrustlessAcademy`
                      if (navigator.share) {
                        navigator.share({ text })
                      } else {
                        navigator.clipboard.writeText(text)
                        alert('Achievement copied to clipboard!')
                      }
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    📱 Share
                  </button>

                  <Link
                    href="/tutorials"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all"
                  >
                    📚 More Lessons
                  </Link>

                  <Link
                    href="/"
                    className="bg-gradient-to-r from-gray-600 to-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-gray-700 hover:to-slate-700 transition-all"
                  >
                    🏠 Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}