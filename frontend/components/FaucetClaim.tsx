'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { KITCHEN_TOKEN_ABI, KITCHEN_TOKEN_ADDRESS } from '../lib/contracts'
import DuckMascot from './DuckMascot'

export default function FaucetClaim() {
  const { address, isConnected } = useAccount()
  const [showTooltip, setShowTooltip] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)

  // Read token balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: KITCHEN_TOKEN_ADDRESS,
    abi: KITCHEN_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address
    }
  })

  // Check if user can claim faucet
  const { data: canClaim } = useReadContract({
    address: KITCHEN_TOKEN_ADDRESS,
    abi: KITCHEN_TOKEN_ABI,
    functionName: 'canClaimFaucet',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address
    }
  })

  // Get last claim timestamp
  const { data: lastClaim } = useReadContract({
    address: KITCHEN_TOKEN_ADDRESS,
    abi: KITCHEN_TOKEN_ABI,
    functionName: 'lastFaucetClaim',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address
    }
  })

  // Get time until next claim
  const { data: timeUntilNextClaim } = useReadContract({
    address: KITCHEN_TOKEN_ADDRESS,
    abi: KITCHEN_TOKEN_ABI,
    functionName: 'timeUntilNextClaim',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address
    }
  })

  // Get faucet amount
  const { data: faucetAmount } = useReadContract({
    address: KITCHEN_TOKEN_ADDRESS,
    abi: KITCHEN_TOKEN_ABI,
    functionName: 'FAUCET_AMOUNT'
  })

  // Write contract hook for claiming faucet
  const { writeContract, isPending, error, data: hash } = useWriteContract()

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleClaim = () => {
    if (!KITCHEN_TOKEN_ADDRESS) return

    writeContract({
      address: KITCHEN_TOKEN_ADDRESS,
      abi: KITCHEN_TOKEN_ABI,
      functionName: 'faucet',
    })
  }

  // Update countdown timer based on last claim timestamp
  useEffect(() => {
    if (!lastClaim || lastClaim === BigInt(0)) {
      setTimeRemaining(0)
      return
    }

    const calculateTimeRemaining = () => {
      const currentTime = Math.floor(Date.now() / 1000)
      const lastClaimTime = Number(lastClaim)
      const cooldownPeriod = 24 * 60 * 60 // 24 hours in seconds
      const nextClaimTime = lastClaimTime + cooldownPeriod
      const remaining = Math.max(0, nextClaimTime - currentTime)
      setTimeRemaining(remaining)
      return remaining
    }

    // Initial calculation
    const remaining = calculateTimeRemaining()

    // Set up interval to update every second only if there's time remaining
    let interval: NodeJS.Timeout | null = null
    if (remaining > 0) {
      interval = setInterval(() => {
        const newRemaining = calculateTimeRemaining()
        if (newRemaining === 0) {
          clearInterval(interval!)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [lastClaim])

  // Refetch balance when transaction is confirmed
  useEffect(() => {
    if (isConfirmed) {
      refetchBalance()
    }
  }, [isConfirmed, refetchBalance])

  const formatTokenAmount = (amount: bigint | undefined) => {
    if (!amount) return '0'
    return (Number(amount) / 1e18).toFixed(0)
  }

  const formatCountdownTime = (totalSeconds: number) => {
    if (totalSeconds <= 0) return null

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    // Format with leading zeros
    const hoursStr = hours.toString().padStart(2, '0')
    const minutesStr = minutes.toString().padStart(2, '0')
    const secondsStr = seconds.toString().padStart(2, '0')

    return `${hoursStr}:${minutesStr}:${secondsStr}`
  }

  if (!isConnected) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
        <p className="text-gray-600">Please connect your wallet to access the faucet</p>
      </div>
    )
  }

  if (!KITCHEN_TOKEN_ADDRESS) {
    return (
      <div className="bg-amber-100 p-6 rounded-xl border border-amber-300 text-center">
        <p className="text-amber-800">KitchenToken contract address not configured</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Duck Education Section */}
      <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
        <div className="flex items-start space-x-3">
          <div
            className="relative cursor-help"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <DuckMascot size="medium" expression="curious" />
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg z-10">
                <div className="text-center">
                  <p className="font-medium mb-1">What are ERC-20 Tokens?</p>
                  <p className="text-xs">ERC-20 tokens are fungible, meaning each token is identical and interchangeable - just like traditional currency where every dollar has the same value!</p>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-amber-800 mb-2">Understanding ERC-20 Tokens</h4>
            <p className="text-amber-700 text-sm">
              ERC-20 tokens are fungible digital assets where each token is identical and interchangeable,
              just like traditional currency.
            </p>
          </div>
        </div>
      </div>

      {/* Balance Display */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Your KitchenToken Balance</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            🪙 {formatTokenAmount(balance as bigint | undefined)} KITCHEN
          </div>
          <p className="text-gray-600 text-sm">
            Use these tokens to buy ingredients for cooking!
          </p>
        </div>
      </div>

      {/* Faucet Section */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-3">🚰 Token Faucet</h3>

          {timeRemaining === 0 ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                Claim your free {formatTokenAmount(faucetAmount as bigint | undefined)} KitchenTokens to start cooking!
              </p>
              <button
                onClick={handleClaim}
                disabled={isPending || isConfirming}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending || isConfirming ? 'Claiming...' : 'Claim Free Tokens'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
                <p className="text-yellow-800 font-medium mb-1">⏱️ Cooldown Active</p>
                <p className="text-yellow-700 text-sm">
                  Next claim available in: {formatCountdownTime(timeRemaining) || 'Loading...'}
                </p>
                <p className="text-yellow-600 text-xs mt-2">
                  The faucet has a 24-hour cooldown to prevent spam
                </p>
              </div>
            </div>
          )}

          {/* Transaction Status */}
          {isPending && (
            <div className="mt-4 bg-blue-100 p-3 rounded-lg">
              <p className="text-blue-800 text-sm">🔄 Transaction pending...</p>
            </div>
          )}

          {isConfirming && (
            <div className="mt-4 bg-blue-100 p-3 rounded-lg">
              <p className="text-blue-800 text-sm">⏳ Waiting for confirmation...</p>
            </div>
          )}

          {isConfirmed && (
            <div className="mt-4 bg-green-100 p-3 rounded-lg">
              <p className="text-green-800 text-sm">✅ Tokens claimed successfully!</p>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-100 p-3 rounded-lg">
              <p className="text-red-800 text-sm">❌ Error: {error.message}</p>
            </div>
          )}
        </div>
      </div>

      {/* Educational Note */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <span>💡</span>
          <span>
            This faucet demonstrates how ERC-20 tokens can be minted and transferred on the blockchain
          </span>
        </div>
      </div>
    </div>
  )
}