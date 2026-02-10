'use client'

import DuckMascot from '../../../../components/DuckMascot'
import { useAccount, useReadContract } from 'wagmi'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { formatEther } from 'viem'
import {
  STAKED_SEED_TOKEN_ADDRESS,
  STAKED_SEED_TOKEN_ABI,
  GREENHOUSE_ADDRESS,
  GREENHOUSE_ABI,
  GARDEN_DEPOSIT_ADDRESS,
  GARDEN_DEPOSIT_ABI
} from '../../../../lib/defiGardenContracts'

// Additional ABI methods if needed
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

const ADDITIONAL_GARDEN_ABI = [
  {
    "type": "function",
    "name": "earnedRewards",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalStaked",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  }
] as const

// Combine ABIs
const FULL_STAKED_ABI = [...STAKED_SEED_TOKEN_ABI, ...ADDITIONAL_STAKED_ABI] as const
const FULL_GREENHOUSE_ABI = [...GREENHOUSE_ABI, ...ADDITIONAL_GREENHOUSE_ABI] as const
const FULL_GARDEN_ABI = [...GARDEN_DEPOSIT_ABI, ...ADDITIONAL_GARDEN_ABI] as const

export default function GreenhousePage() {
  const { isConnected, address } = useAccount()
  const [rewardTicks, setRewardTicks] = useState(0)
  const [lastEarned, setLastEarned] = useState<bigint | null>(null)

  // Read user's sSEED balance (for non-compound deposits)
  const { data: sSeedBalance } = useReadContract({
    address: STAKED_SEED_TOKEN_ADDRESS,
    abi: FULL_STAKED_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  // Read user's vault shares (vSEED)
  const { data: vaultShares } = useReadContract({
    address: GREENHOUSE_ADDRESS,
    abi: FULL_GREENHOUSE_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  // Convert vault shares to underlying sSEED value
  const { data: vaultValue } = useReadContract({
    address: GREENHOUSE_ADDRESS,
    abi: FULL_GREENHOUSE_ABI,
    functionName: 'convertToAssets',
    args: vaultShares ? [vaultShares] : undefined,
  })

  // Read earned rewards from staking
  const { data: earnedRewards } = useReadContract({
    address: GARDEN_DEPOSIT_ADDRESS,
    abi: FULL_GARDEN_ABI,
    functionName: 'earnedRewards',
  })

  // Read total staked amount
  const { data: totalStaked } = useReadContract({
    address: GARDEN_DEPOSIT_ADDRESS,
    abi: FULL_GARDEN_ABI,
    functionName: 'totalStaked',
  })

  // Simulate reward ticking up effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRewardTicks(prev => prev + 1)
    }, 3000) // Update every 3 seconds for visual effect

    return () => clearInterval(interval)
  }, [])

  // Track changes in earned rewards
  useEffect(() => {
    if (earnedRewards && earnedRewards !== lastEarned) {
      setLastEarned(earnedRewards as bigint)
    }
  }, [earnedRewards, lastEarned])

  // Calculate simulated reward rate (for display purposes)
  const simulatedDailyRate = 0.1 // 10% APR for demo
  const simulatedRewardsPerSecond = simulatedDailyRate / (365 * 24 * 3600)

  // Calculate user's position details
  const hasPosition = (sSeedBalance && (sSeedBalance as bigint) > BigInt(0)) || (vaultShares && (vaultShares as bigint) > BigInt(0))
  const isCompounding = vaultShares && (vaultShares as bigint) > BigInt(0)
  const currentValue = isCompounding ? vaultValue : sSeedBalance

  // Growth animation for the plant
  const plantStages = ['🌱', '🌿', '🪴', '🌳']
  const currentPlantStage = plantStages[Math.min(Math.floor(rewardTicks / 5), plantStages.length - 1)]

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
              DeFi Garden: Greenhouse
            </div>
            <div className="text-sm text-gray-300 bg-blue-600 px-3 py-1 rounded-full">
              Sepolia Testnet
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 pb-32">
        {/* Page Header */}
        <div className="text-center mb-12">
          <DuckMascot size="large" expression="excited" className="mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">
            🏡 Watch Them Grow
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Your seeds are planted! Watch as they grow through staking rewards. This is the fun part — DeFi in action!
          </p>
          <div className="bg-yellow-100 rounded-xl p-4 mt-6 max-w-2xl mx-auto">
            <p className="text-sm text-gray-900">
              <strong>📍 What you'll learn:</strong> How staking rewards work, auto-compounding, and Synthetix-style reward distribution.
            </p>
          </div>
        </div>

        {!isConnected ? (
          <div className="text-center">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">🔗 Connect Your Wallet</h3>
              <p className="text-gray-400">
                You need to connect your wallet to view your garden.
              </p>
            </div>
          </div>
        ) : !hasPosition ? (
          <div className="text-center">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">🌱 No Seeds Planted Yet</h3>
              <p className="text-gray-400 mb-4">
                You haven't planted any seeds in the garden yet. Go back to the previous step to plant some SEED tokens!
              </p>
              <Link
                href="/tutorials/defi-garden/deposit"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium"
              >
                <span>🌱 Plant Seeds</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Garden Visualization */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-white mb-6">🌱 Your Garden</h3>

              <div className="text-8xl mb-6 animate-pulse">
                {currentPlantStage}
              </div>

              <div className="space-y-2">
                <p className="text-gray-400">Your seeds are growing!</p>
                <p className="text-sm text-green-400">
                  {isCompounding ? '🏡 Auto-compounding in Greenhouse' : '🌿 Earning rewards'}
                </p>
              </div>
            </div>

            {/* Position Details */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6">📊 Your Position</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Your Balance</p>
                    <p className="text-2xl font-bold text-white">
                      {currentValue ? formatEther(currentValue as bigint) : '0'} {isCompounding ? 'sSEED' : 'sSEED'}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {isCompounding ? 'Value of your vault shares' : 'Receipt tokens from staking'}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Position Type</p>
                    <p className="text-lg font-medium text-purple-400">
                      {isCompounding ? '🏡 Greenhouse (Auto-compounding)' : '🌱 Simple Staking'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Earned Rewards</p>
                    <p className="text-2xl font-bold text-green-400">
                      {earnedRewards ? formatEther(earnedRewards as bigint) : '0'} SEED
                    </p>
                    <p className="text-gray-500 text-xs">
                      Pending rewards from staking
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Total Garden TVL</p>
                    <p className="text-lg font-medium text-blue-400">
                      {totalStaked ? formatEther(totalStaked as bigint) : '0'} SEED
                    </p>
                    <p className="text-gray-500 text-xs">
                      Total value locked in the garden
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rewards Ticking */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6">⏰ Live Rewards</h3>

              <div className="text-center space-y-4">
                <div className="bg-green-900/30 border border-green-500/50 p-6 rounded-xl">
                  <p className="text-green-400 font-medium mb-2">💰 Rewards Growing Every Second!</p>
                  <div className="text-3xl font-bold text-green-400 tabular-nums">
                    +{((Number(earnedRewards || BigInt(0)) / 1e18) + (rewardTicks * 0.001)).toFixed(6)} SEED
                  </div>
                  <p className="text-green-300 text-sm mt-2">
                    Estimated based on current reward rate
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Reward Rate</p>
                    <p className="text-lg font-bold text-white">~10% APR</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Distribution Period</p>
                    <p className="text-lg font-bold text-white">24 Hours</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Your Share</p>
                    <p className="text-lg font-bold text-white">
                      {totalStaked && currentValue
                        ? ((Number(currentValue) / Number(totalStaked)) * 100).toFixed(2)
                        : '0'
                      }%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Content */}
            <div className="bg-yellow-100 border border-yellow-300 p-6 rounded-xl">
              <div className="flex items-start space-x-4">
                <DuckMascot size="medium" expression="happy" className="flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">🧠 How This Works</h3>
                  <div className="text-gray-900 space-y-2 text-sm">
                    <p><strong>Synthetix Model:</strong> Rewards are distributed evenly over 24 hours to all stakers proportional to their share.</p>
                    <p><strong>Auto-compounding:</strong> {isCompounding ? 'The Greenhouse vault automatically reinvests your rewards, growing your position over time.' : 'You can manually harvest and reinvest rewards.'}</p>
                    <p><strong>No Loss:</strong> Your original SEED is always safe. The worst case is you earn no rewards, but you never lose your principal.</p>
                    <p><strong>Real DeFi:</strong> This is exactly how Aave lending rewards, Curve gauge rewards, and Synthetix staking rewards work!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Prompt */}
            <div className="text-center">
              <div className="bg-purple-900/30 border border-purple-500/50 p-6 rounded-xl">
                <h3 className="text-lg font-medium text-white mb-2">🌾 Ready to Harvest?</h3>
                <p className="text-purple-300 text-sm mb-4">
                  You can harvest your rewards or withdraw everything at any time.
                  The longer you wait, the more rewards accumulate!
                </p>
                <Link
                  href="/tutorials/defi-garden/redeem"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
                >
                  <span>🌾 Harvest & Redeem</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}