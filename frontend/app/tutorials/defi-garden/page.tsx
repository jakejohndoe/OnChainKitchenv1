'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DuckMascot from '../../../components/DuckMascot'
import ConnectWallet from '../../../components/ConnectWallet'
import { useAccount } from 'wagmi'

export default function DeFiGardenIntro() {
  const { isConnected } = useAccount()
  const router = useRouter()

  const handleStart = () => {
    if (isConnected) {
      router.push('/tutorials/defi-garden/faucet')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with Navigation */}
      <header className="w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <img src="/logos/TA-Hero-Logo-White.png" alt="Trustless Academy" className="h-16 w-auto" />
                <h1 className="text-xl font-bold text-white">Trustless Academy</h1>
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/tutorials" className="text-gray-400 hover:text-purple-400">
                Tutorials
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-purple-400 font-medium">The DeFi Garden</span>
            </div>
            <div className="text-sm text-gray-400 bg-slate-700 px-3 py-1 rounded-full">
              Welcome
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <DuckMascot size="xlarge" expression="excited" className="mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to the DeFi Garden! 🌱
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            In the kitchen, you learned about tokens. Now let's learn what you can DO with them.
            Plant SEED tokens, watch them grow through staking rewards, and harvest your yield!
          </p>
        </div>

        {/* What You'll Build */}
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🎯 What You'll Experience</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <h3 className="text-lg font-medium text-white">Plant Your Seeds</h3>
                  <p className="text-gray-400">Claim SEED tokens and deposit them into the garden</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-2xl">🏡</span>
                <div>
                  <h3 className="text-lg font-medium text-white">Greenhouse Vault</h3>
                  <p className="text-gray-400">Auto-compound your rewards in an ERC-4626 vault</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📈</span>
                <div>
                  <h3 className="text-lg font-medium text-white">Watch Them Grow</h3>
                  <p className="text-gray-400">See your tokens earn rewards through Synthetix-style staking</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-2xl">🌾</span>
                <div>
                  <h3 className="text-lg font-medium text-white">Harvest & Redeem</h3>
                  <p className="text-gray-400">Claim your earned rewards or withdraw everything</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Garden Metaphor Explanation */}
        <div className="bg-yellow-100 border border-yellow-300 p-6 rounded-xl mb-8">
          <div className="flex items-start space-x-4">
            <DuckMascot size="medium" expression="happy" className="flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">🌿 Understanding the Garden</h3>
              <div className="text-gray-900 space-y-2 text-sm">
                <p><strong>🌱 SEED tokens</strong> = Your tokens (like USDC or ETH in real DeFi)</p>
                <p><strong>🌿 Planting</strong> = Staking (locking tokens to earn rewards)</p>
                <p><strong>🏡 Greenhouse</strong> = A vault that automatically reinvests your rewards</p>
                <p><strong>🌾 Harvesting</strong> = Claiming the rewards you've earned</p>
                <p><strong>In traditional finance, this is like a savings account that automatically reinvests your interest. In DeFi, it's all transparent and runs on code.</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Goals */}
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📚 What You'll Master</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Core DeFi Concepts</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Token Approvals (giving contracts permission)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Staking for rewards</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Receipt tokens (proof you staked)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-3">Advanced Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>ERC-4626 vaults (standardized yield)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Auto-compounding strategies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Synthetix reward distribution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Connection requirement */}
        <div className="text-center">
          {!isConnected ? (
            <div className="space-y-6">
              <div className="bg-purple-900/50 border border-purple-500/50 p-6 rounded-xl">
                <h3 className="text-lg font-medium text-white mb-2">🔗 Connect Your Wallet</h3>
                <p className="text-gray-300 mb-4">
                  You'll need a wallet to interact with the DeFi Garden on Sepolia testnet.
                </p>
                <ConnectWallet />
              </div>
              <p className="text-sm text-gray-500">
                Don't worry — we'll use testnet tokens so there's no real money involved!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-900/50 border border-green-500/50 p-6 rounded-xl">
                <h3 className="text-lg font-medium text-white mb-2">✅ Wallet Connected!</h3>
                <p className="text-gray-300">
                  Perfect! You're ready to start planting in the DeFi Garden.
                </p>
              </div>

              <button
                onClick={handleStart}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-xl text-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Planting! 🌱
              </button>
            </div>
          )}
        </div>

        {/* Real-world Context */}
        <div className="mt-12 bg-slate-800 border border-slate-700 p-8 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">🌍 This is Real DeFi</h3>
          <p className="text-gray-400 leading-relaxed">
            The concepts you'll learn here are used by major DeFi protocols like <strong className="text-white">Aave</strong> (lending),
            <strong className="text-white"> Lido</strong> (liquid staking), and <strong className="text-white">Yearn Finance</strong> (yield farming).
            You're experiencing the same building blocks that power billions of dollars in decentralized finance!
          </p>
        </div>
      </main>
    </div>
  )
}