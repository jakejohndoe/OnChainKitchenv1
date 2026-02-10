'use client'

import DuckMascot from '../../../../components/DuckMascot'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import Link from 'next/link'
import { useState } from 'react'
import { formatEther } from 'viem'
import {
  SEED_TOKEN_ADDRESS,
  SEED_TOKEN_ABI,
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
  },
  {
    "type": "function",
    "name": "redeem",
    "inputs": [
      {"name": "shares", "type": "uint256"},
      {"name": "receiver", "type": "address"},
      {"name": "owner", "type": "address"}
    ],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable"
  }
] as const

const ADDITIONAL_GARDEN_ABI = [
  {
    "type": "function",
    "name": "harvest",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "redeem",
    "inputs": [{"name": "amount", "type": "uint256"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "earnedRewards",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  }
] as const

const ADDITIONAL_SEED_ABI = [
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [{"name": "account", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  }
] as const

// Combine ABIs
const FULL_STAKED_ABI = [...STAKED_SEED_TOKEN_ABI, ...ADDITIONAL_STAKED_ABI] as const
const FULL_GREENHOUSE_ABI = [...GREENHOUSE_ABI, ...ADDITIONAL_GREENHOUSE_ABI] as const
const FULL_GARDEN_ABI = [...GARDEN_DEPOSIT_ABI, ...ADDITIONAL_GARDEN_ABI] as const
const FULL_SEED_ABI = [...SEED_TOKEN_ABI, ...ADDITIONAL_SEED_ABI] as const

export default function RedeemPage() {
  const { isConnected, address } = useAccount()
  const [selectedAction, setSelectedAction] = useState<'harvest' | 'uproot' | null>(null)

  // Read user's current SEED balance
  const { data: seedBalance } = useReadContract({
    address: SEED_TOKEN_ADDRESS,
    abi: FULL_SEED_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  // Read user's sSEED balance
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

  // Read earned rewards
  const { data: earnedRewards } = useReadContract({
    address: GARDEN_DEPOSIT_ADDRESS,
    abi: FULL_GARDEN_ABI,
    functionName: 'earnedRewards',
  })

  // Write contracts
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Calculate position details
  const hasPosition = (sSeedBalance && (sSeedBalance as bigint) > BigInt(0)) || (vaultShares && (vaultShares as bigint) > BigInt(0))
  const isCompounding = vaultShares && (vaultShares as bigint) > BigInt(0)
  const currentValue = isCompounding ? vaultValue : sSeedBalance

  const handleHarvest = () => {
    writeContract({
      address: GARDEN_DEPOSIT_ADDRESS,
      abi: FULL_GARDEN_ABI,
      functionName: 'harvest',
    })
    setSelectedAction('harvest')
  }

  const handleUproot = () => {
    if (!address) return

    if (isCompounding && vaultShares) {
      // First redeem from vault to get sSEED
      writeContract({
        address: GREENHOUSE_ADDRESS,
        abi: FULL_GREENHOUSE_ABI,
        functionName: 'redeem',
        args: [vaultShares, address, address],
      })
    } else if (sSeedBalance) {
      // Direct redeem from garden deposit
      writeContract({
        address: GARDEN_DEPOSIT_ADDRESS,
        abi: FULL_GARDEN_ABI,
        functionName: 'redeem',
        args: [sSeedBalance],
      })
    }
    setSelectedAction('uproot')
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
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300 bg-emerald-600 px-3 py-1 rounded-full">
              DeFi Garden: Harvest
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
            🌾 Harvest Time
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Reap what you've sowed! Choose to harvest just your rewards, or pull everything out of the ground.
          </p>
          <div className="bg-yellow-100 rounded-xl p-4 mt-6 max-w-2xl mx-auto">
            <p className="text-sm text-gray-900">
              <strong>📍 What you'll learn:</strong> Different exit strategies in DeFi, partial vs full withdrawals, and how to realize your gains.
            </p>
          </div>
        </div>

        {!isConnected ? (
          <div className="text-center">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">🔗 Connect Your Wallet</h3>
              <p className="text-gray-400">
                You need to connect your wallet to harvest your garden.
              </p>
            </div>
          </div>
        ) : !hasPosition ? (
          <div className="text-center">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">🌱 No Seeds Planted Yet</h3>
              <p className="text-gray-400 mb-4">
                You haven't planted any seeds in the garden yet. Go back to plant some SEED tokens first!
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
            {/* Position Summary */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6">📊 Your Garden Summary</h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">Original SEED Balance</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {seedBalance ? formatEther(seedBalance as bigint) : '0'} SEED
                  </p>
                  <p className="text-gray-500 text-xs">Your wallet balance</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">Position Value</p>
                  <p className="text-2xl font-bold text-green-400">
                    {currentValue ? formatEther(currentValue as bigint) : '0'} sSEED
                  </p>
                  <p className="text-gray-500 text-xs">
                    {isCompounding ? 'Vault shares value' : 'Staked amount'}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">Pending Rewards</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {earnedRewards ? formatEther(earnedRewards as bigint) : '0'} SEED
                  </p>
                  <p className="text-gray-500 text-xs">Ready to harvest</p>
                </div>
              </div>
            </div>

            {/* Harvest Options */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Option A: Harvest Rewards */}
              <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">🌾</div>
                  <h3 className="text-xl font-bold text-white mb-2">Harvest Rewards</h3>
                  <p className="text-gray-400 text-sm">
                    Take your earned rewards but keep your seeds planted to continue growing
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-yellow-900/30 border border-yellow-500/50 p-4 rounded-lg">
                    <p className="text-yellow-300 text-sm">
                      <strong>You'll receive:</strong> {earnedRewards ? formatEther(earnedRewards as bigint) : '0'} SEED
                    </p>
                    <p className="text-yellow-400 text-sm">
                      <strong>You'll keep:</strong> Your planted position to continue earning
                    </p>
                  </div>

                  <button
                    onClick={handleHarvest}
                    disabled={isPending || isConfirming || !earnedRewards || (earnedRewards as bigint) === BigInt(0)}
                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:from-yellow-700 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending && selectedAction === 'harvest' ? '🌾 Harvesting...' :
                     isConfirming && selectedAction === 'harvest' ? '⏳ Confirming...' :
                     '🌾 Harvest Rewards'}
                  </button>

                  <p className="text-gray-500 text-xs text-center">
                    Best for: Steady income while keeping your position growing
                  </p>
                </div>
              </div>

              {/* Option B: Uproot All */}
              <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">🌿</div>
                  <h3 className="text-xl font-bold text-white mb-2">Uproot Everything</h3>
                  <p className="text-gray-400 text-sm">
                    Pull everything out — your original seeds plus any earned rewards
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-900/30 border border-red-500/50 p-4 rounded-lg">
                    <p className="text-red-300 text-sm">
                      <strong>You'll receive:</strong> All your SEED back (~{currentValue ? formatEther(currentValue as bigint) : '0'})
                    </p>
                    <p className="text-red-400 text-sm">
                      <strong>You'll lose:</strong> Your staking position (can replant later)
                    </p>
                  </div>

                  <button
                    onClick={handleUproot}
                    disabled={isPending || isConfirming || !currentValue || (currentValue as bigint) === BigInt(0)}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-red-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending && selectedAction === 'uproot' ? '🌿 Uprooting...' :
                     isConfirming && selectedAction === 'uproot' ? '⏳ Confirming...' :
                     '🌿 Uproot Everything'}
                  </button>

                  <p className="text-gray-500 text-xs text-center">
                    Best for: Taking profits or changing strategy
                  </p>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {isConfirmed && (
              <div className="bg-green-900/30 border border-green-500/50 p-6 rounded-xl text-center">
                <h3 className="text-xl font-bold text-green-400 mb-2">
                  {selectedAction === 'harvest' ? '🎉 Rewards Harvested!' : '🎉 Successfully Uprooted!'}
                </h3>
                <p className="text-green-300">
                  {selectedAction === 'harvest'
                    ? 'Your rewards have been claimed! Your position continues to earn more rewards.'
                    : 'You\'ve withdrawn everything from the garden. Check your SEED balance!'
                  }
                </p>
                {selectedAction === 'uproot' && (
                  <div className="mt-4 bg-green-800/30 p-3 rounded-lg">
                    <p className="text-green-200 text-sm">
                      You got back more SEED than you started with — that's DeFi profit! 💰
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-500/50 p-4 rounded-xl">
                <p className="text-red-400 text-sm">
                  <strong>Error:</strong> {error.message}
                </p>
              </div>
            )}

            {/* Educational Content */}
            <div className="bg-yellow-100 border border-yellow-300 p-6 rounded-xl">
              <div className="flex items-start space-x-4">
                <DuckMascot size="medium" expression="happy" className="flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Exit Strategy Wisdom</h3>
                  <div className="text-gray-900 space-y-2 text-sm">
                    <p><strong>Harvest vs Uproot:</strong> Harvesting keeps your position active for compound growth. Uprooting realizes all gains immediately.</p>
                    <p><strong>No penalties:</strong> Unlike traditional CDs, you can exit DeFi positions anytime without penalties (just gas fees).</p>
                    <p><strong>Tax implications:</strong> In real DeFi, harvesting rewards is usually a taxable event, while unrealized gains from auto-compounding aren't.</p>
                    <p><strong>Gas optimization:</strong> Real protocols often batch operations to save gas costs when you have multiple positions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Step */}
            {isConfirmed && (
              <div className="text-center">
                <div className="bg-purple-900/30 border border-purple-500/50 p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-white mb-2">🎓 Ready to Graduate?</h3>
                  <p className="text-purple-300 text-sm mb-4">
                    You've successfully experienced the full DeFi cycle!
                    Head to the completion page to see what you've mastered.
                  </p>
                  <Link
                    href="/tutorials/defi-garden/complete"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
                  >
                    <span>🎓 Complete Lesson</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}