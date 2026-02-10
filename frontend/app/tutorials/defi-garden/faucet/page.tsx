'use client'

import DuckMascot from '../../../../components/DuckMascot'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import Link from 'next/link'
import { useState, useEffect, type ReactNode } from 'react'
import { formatEther } from 'viem'
import { SEED_TOKEN_ADDRESS } from '../../../../lib/defiGardenContracts'

// Define a properly typed ABI for the functions we need
const COMBINED_ABI = [
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [{"name": "account", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "canClaimFaucet",
    "inputs": [{"name": "user", "type": "address"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "timeUntilNextClaim",
    "inputs": [{"name": "user", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "faucet",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
] as const

export default function FaucetPage() {
  const { isConnected, address } = useAccount()
  const [timeRemaining, setTimeRemaining] = useState<number>(0)

  // Read user's SEED balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: SEED_TOKEN_ADDRESS,
    abi: COMBINED_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  // Check if user can claim from faucet
  const { data: canClaimRaw, refetch: refetchCanClaim } = useReadContract({
    address: SEED_TOKEN_ADDRESS,
    abi: COMBINED_ABI,
    functionName: 'canClaimFaucet',
    args: address ? [address] : undefined,
  })
  const canClaim = canClaimRaw as boolean | undefined

  // Get time until next claim
  const { data: timeUntilClaim, refetch: refetchTimeUntilClaim } = useReadContract({
    address: SEED_TOKEN_ADDRESS,
    abi: COMBINED_ABI,
    functionName: 'timeUntilNextClaim',
    args: address ? [address] : undefined,
  })

  // Write contract for claiming faucet
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Type safe variables
  const isPendingSafe: boolean = !!isPending
  const isConfirmingSafe: boolean = !!isConfirming
  const isConfirmedSafe: boolean = !!isConfirmed

  // Update countdown timer
  useEffect(() => {
    if (timeUntilClaim) {
      setTimeRemaining(Number(timeUntilClaim as bigint))
    }
  }, [timeUntilClaim])

  // Countdown timer effect
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [timeRemaining])

  // Refetch data when transaction is confirmed
  useEffect(() => {
    if (isConfirmedSafe) {
      // Refetch all relevant data after successful transaction
      refetchBalance()
      refetchCanClaim()
      refetchTimeUntilClaim()
    }
  }, [isConfirmedSafe, refetchBalance, refetchCanClaim, refetchTimeUntilClaim])

  const formatTimeRemaining = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleClaim = () => {
    writeContract({
      address: SEED_TOKEN_ADDRESS,
      abi: COMBINED_ABI,
      functionName: 'faucet',
    })
  }

  // Check if user can claim (type-safe)
  const canClaimSafe: boolean | null = typeof canClaim === 'boolean' ? canClaim : null

  // Calculate if button should be disabled
  const isOnCooldown = canClaimSafe === false && timeUntilClaim && Number(timeUntilClaim as bigint) > 0
  const isButtonDisabled: boolean = Boolean(isPendingSafe || isConfirmingSafe || !address || isOnCooldown)

  // Explicit type check for debugging
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
                DeFi Garden: Seed Bag
              </div>
              <div className="text-sm text-gray-300 bg-blue-600 px-3 py-1 rounded-full">
                Sepolia Testnet
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-12 pb-32">
          <div className="text-center">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">🔗 Connect Your Wallet</h3>
              <p className="text-gray-400">
                You need to connect your wallet to claim SEED tokens.
              </p>
            </div>
          </div>
        </main>
      </div>
    )
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
              DeFi Garden: Seed Bag
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
            🌰 The Seed Bag
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Every gardener needs seeds! Get free SEED tokens to start your DeFi journey.
          </p>
          <div className="bg-yellow-100 rounded-xl p-4 mt-6 max-w-2xl mx-auto">
            <p className="text-sm text-gray-900">
              <strong>📍 What you'll learn:</strong> SEED is an ERC-20 token — the same standard as USDC, DAI, or thousands of other tokens. Faucets give you free testnet tokens to practice with.
            </p>
          </div>
        </div>

        <div className="space-y-8">
            {/* Current Balance */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl text-center">
              <h3 className="text-lg font-medium text-white mb-4">🌱 Your SEED Balance</h3>
              <div className="text-4xl font-bold text-green-400">
                {balance ? formatEther(balance as bigint) : '0'} SEED
              </div>
              <p className="text-gray-400 mt-2">
                These tokens will be your garden's foundation
              </p>
            </div>

            {/* Faucet Interface */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">🚰 SEED Faucet</h3>
                <p className="text-gray-400">
                  Claim 1,000 SEED tokens every 24 hours
                </p>
              </div>

              {/* Always show faucet interface, with conditional states */}
              <div className="text-center space-y-4">
                {/* Status indicator */}
                {isOnCooldown ? (
                  <div className="bg-orange-900/30 border border-orange-500/50 p-4 rounded-xl">
                    <p className="text-orange-400 font-medium">⏳ Faucet cooldown active</p>
                    <p className="text-orange-300 text-sm mt-1">
                      Next claim available in: <strong>{formatTimeRemaining(timeRemaining)}</strong>
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-900/30 border border-green-500/50 p-4 rounded-xl">
                    <p className="text-green-400 font-medium">
                      {canClaimSafe === null ? '📡 Checking eligibility...' : '✅ Ready to claim!'}
                    </p>
                  </div>
                )}

                {/* Claim button - always show but conditionally disable */}
                <button
                  onClick={handleClaim}
                  disabled={isButtonDisabled}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-xl text-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {!address ? '🔗 Connect Wallet First' :
                   isPendingSafe ? '🌱 Claiming...' :
                   isConfirmingSafe ? '⏳ Confirming...' :
                   isOnCooldown ?
                     `🕐 Cooldown: ${formatTimeRemaining(timeRemaining)}` :
                   '🌱 Claim 1,000 SEED'}
                </button>

                {/* Error display */}
                {!!error && (
                  <div className="bg-red-900/30 border border-red-500/50 p-4 rounded-xl">
                    <p className="text-red-400 text-sm">
                      Error: {(error as Error)?.message || 'Unknown error'}
                    </p>
                  </div>
                )}
              </div>

              {isConfirmedSafe && (
                <div className="mt-6 bg-green-900/30 border border-green-500/50 p-6 rounded-xl text-center animate-pulse">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="text-green-400 font-bold text-lg">Successfully claimed 1,000 SEED!</p>
                  <p className="text-green-300 text-sm mt-2">
                    Your balance will update shortly. Time to head to the garden! 🌱
                  </p>
                  {hash && (
                    <p className="text-green-400 text-xs mt-2">
                      Tx: {hash.slice(0, 8)}...{hash.slice(-6)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Educational Content */}
            <div className="bg-yellow-100 border border-yellow-300 p-6 rounded-xl">
              <div className="flex items-start space-x-4">
                <DuckMascot size="medium" expression="happy" className="flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Understanding Faucets</h3>
                  <div className="text-gray-900 space-y-2 text-sm">
                    <p><strong>Testnet faucets</strong> are like water fountains for blockchain tokens. They give you free tokens to test and learn with.</p>
                    <p><strong>24-hour cooldown</strong> prevents spam and ensures fair distribution. Real DeFi protocols often have similar rate limiting.</p>
                    <p><strong>Your wallet address</strong> is tracked on-chain, so the cooldown applies globally - you can't just create new wallets to bypass it!</p>
                    <p>On mainnet, you'd buy these tokens on exchanges like Coinbase or Uniswap instead of using faucets.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Step Hint */}
            {balance && Number(formatEther(balance as bigint)) > 0 && (
              <div className="text-center">
                <div className="bg-purple-900/30 border border-purple-500/50 p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-white mb-2">🌱 Ready to Plant?</h3>
                  <p className="text-purple-300 text-sm">
                    You have SEED tokens! Head to the next step to plant them in the garden and start earning rewards.
                  </p>
                </div>
              </div>
            )}
          </div>
      </main>
    </div>
  )
}