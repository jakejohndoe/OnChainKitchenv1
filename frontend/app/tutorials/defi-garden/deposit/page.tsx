'use client'

import DuckMascot from '../../../../components/DuckMascot'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { formatEther, parseEther } from 'viem'
import {
  SEED_TOKEN_ADDRESS,
  SEED_TOKEN_ABI,
  GARDEN_DEPOSIT_ADDRESS,
  GARDEN_DEPOSIT_ABI
} from '../../../../lib/defiGardenContracts'

// Additional ABI methods if needed
const ADDITIONAL_SEED_ABI = [
  {
    "type": "function",
    "name": "approve",
    "inputs": [{"name": "spender", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [{"name": "account", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "allowance",
    "inputs": [{"name": "owner", "type": "address"}, {"name": "spender", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  }
] as const

const ADDITIONAL_DEPOSIT_ABI = [
  {
    "type": "function",
    "name": "deposit",
    "inputs": [
      {"name": "amount", "type": "uint256"},
      {"name": "receiver", "type": "address"},
      {"name": "compound", "type": "bool"}
    ],
    "outputs": [{"name": "shares", "type": "uint256"}],
    "stateMutability": "nonpayable"
  }
] as const

// Combine ABIs
const FULL_SEED_ABI = [...SEED_TOKEN_ABI, ...ADDITIONAL_SEED_ABI] as const
const FULL_DEPOSIT_ABI = [...GARDEN_DEPOSIT_ABI, ...ADDITIONAL_DEPOSIT_ABI] as const

export default function DepositPage() {
  const { isConnected, address } = useAccount()
  const [depositAmount, setDepositAmount] = useState('')
  const [compound, setCompound] = useState(true)
  const [step, setStep] = useState<'approve' | 'deposit'>('approve')

  // Read user's SEED balance
  const { data: balance } = useReadContract({
    address: SEED_TOKEN_ADDRESS,
    abi: FULL_SEED_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  // Read current allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: SEED_TOKEN_ADDRESS,
    abi: FULL_SEED_ABI,
    functionName: 'allowance',
    args: address ? [address, GARDEN_DEPOSIT_ADDRESS] : undefined,
  })

  // Write contracts for approve and deposit
  const { writeContract: approve, data: approveHash, isPending: isApprovePending } = useWriteContract()
  const { writeContract: deposit, data: depositHash, isPending: isDepositPending } = useWriteContract()

  // Wait for transaction confirmations
  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } = useWaitForTransactionReceipt({
    hash: approveHash,
  })

  const { isLoading: isDepositConfirming, isSuccess: isDepositConfirmed } = useWaitForTransactionReceipt({
    hash: depositHash,
  })

  // Check if user has sufficient allowance for the deposit amount
  const hasEnoughAllowance = !!(allowance && depositAmount &&
    (allowance as bigint) >= parseEther(depositAmount))

  // Handle approval confirmation and step progression
  useEffect(() => {
    if (isApproveConfirmed) {
      // Refetch allowance after approval confirmation
      refetchAllowance()
    }
  }, [isApproveConfirmed, refetchAllowance])

  // Auto-advance to deposit step when allowance is sufficient
  useEffect(() => {
    if (hasEnoughAllowance && step === 'approve') {
      setStep('deposit')
    }
  }, [hasEnoughAllowance, step])

  const handleApprove = () => {
    if (!depositAmount || !address) return

    approve({
      address: SEED_TOKEN_ADDRESS,
      abi: FULL_SEED_ABI,
      functionName: 'approve',
      args: [GARDEN_DEPOSIT_ADDRESS, parseEther(depositAmount)],
    })
  }

  const handleDeposit = () => {
    if (!depositAmount || !address) return

    deposit({
      address: GARDEN_DEPOSIT_ADDRESS,
      abi: FULL_DEPOSIT_ABI,
      functionName: 'deposit',
      args: [parseEther(depositAmount), address, compound],
    })
  }

  const setMaxAmount = () => {
    if (balance) {
      setDepositAmount(formatEther(balance as bigint))
    }
  }

  const presetAmounts = ['100', '500', '1000']

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
              DeFi Garden: Plant Seeds
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
            🌱 The Garden Bed
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Plant your SEED tokens in the garden! This involves two steps: giving permission, then planting.
          </p>
          <div className="bg-yellow-100 rounded-xl p-4 mt-6 max-w-2xl mx-auto">
            <p className="text-sm text-gray-900">
              <strong>📍 What you'll learn:</strong> Token approvals, staking mechanics, receipt tokens, and ERC-4626 vaults.
            </p>
          </div>
        </div>

        {!isConnected ? (
          <div className="text-center">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">🔗 Connect Your Wallet</h3>
              <p className="text-gray-400">
                You need to connect your wallet to plant seeds.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Current Balance */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl text-center">
              <h3 className="text-lg font-medium text-white mb-4">🌱 Your SEED Balance</h3>
              <div className="text-4xl font-bold text-green-400">
                {balance ? formatEther(balance as bigint) : '0'} SEED
              </div>
              <p className="text-gray-400 mt-2">
                Available for planting
              </p>
            </div>

            {/* Compound Option */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">🏡 Choose Your Planting Style</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setCompound(false)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    !compound
                      ? 'border-purple-500 bg-purple-900/30'
                      : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                  }`}
                >
                  <div className="text-left">
                    <h4 className="text-lg font-medium text-white mb-2">🌱 Simple Planting</h4>
                    <p className="text-gray-400 text-sm">
                      Get sSEED receipt tokens. You manually harvest rewards.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setCompound(true)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    compound
                      ? 'border-purple-500 bg-purple-900/30'
                      : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                  }`}
                >
                  <div className="text-left">
                    <h4 className="text-lg font-medium text-white mb-2">🏡 Greenhouse (Recommended)</h4>
                    <p className="text-gray-400 text-sm">
                      Auto-compound in ERC-4626 vault. Get vSEED shares that grow automatically.
                    </p>
                  </div>
                </button>
              </div>

              <div className="bg-purple-900/30 border border-purple-500/50 p-4 rounded-xl">
                <p className="text-purple-300 text-sm">
                  <strong>Recommended:</strong> Choose Greenhouse for auto-compounding!
                  Your rewards automatically get reinvested, maximizing your yield over time.
                </p>
              </div>
            </div>

            {/* Amount Selection */}
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">💰 How Much to Plant?</h3>

              <div className="space-y-4">
                {/* Preset buttons */}
                <div className="flex gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setDepositAmount(amount)}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg transition-colors"
                    >
                      {amount} SEED
                    </button>
                  ))}
                  <button
                    onClick={setMaxAmount}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors"
                  >
                    All
                  </button>
                </div>

                {/* Manual input */}
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="w-full bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Two-Step Process */}
            {depositAmount && (
              <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6">🚀 Planting Process</h3>

                <div className="space-y-6">
                  {/* Step A: Approve */}
                  <div className={`border-2 rounded-xl p-6 transition-all ${
                    step === 'approve'
                      ? 'border-purple-500 bg-purple-900/20'
                      : hasEnoughAllowance
                        ? 'border-green-500 bg-green-900/20'
                        : 'border-slate-600 bg-slate-800/50'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-white">
                        Step A: Approve SEED Spending
                      </h4>
                      {hasEnoughAllowance && (
                        <span className="text-green-400 font-semibold animate-pulse">
                          ✅ Approved!
                        </span>
                      )}
                    </div>

                    <p className="text-gray-400 mb-4 text-sm">
                      Before a smart contract can move your tokens, you need to give it permission.
                      This is called an "approval." Think of it like giving someone a key to your garden shed.
                    </p>

                    {!hasEnoughAllowance ? (
                      <button
                        onClick={handleApprove}
                        disabled={isApprovePending || isApproveConfirming || !depositAmount}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isApprovePending || isApproveConfirming
                          ? '⏳ Approving...'
                          : `🔑 Approve ${depositAmount} SEED`
                        }
                      </button>
                    ) : (
                      <div className="bg-green-900/30 border border-green-500/50 text-green-400 text-center py-4 font-semibold rounded-lg">
                        ✅ SEED spending approved! Ready to plant.
                      </div>
                    )}
                  </div>

                  {/* Step B: Plant */}
                  <div className={`border-2 rounded-xl p-6 transition-all ${
                    step === 'deposit'
                      ? 'border-purple-500 bg-purple-900/20'
                      : 'border-slate-600 bg-slate-800/50 opacity-50'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-white">
                        Step B: Plant Seeds 🌱
                      </h4>
                    </div>

                    <p className="text-gray-400 mb-4 text-sm">
                      Now let's plant! Your SEED tokens will be staked, and you'll receive {compound ? 'vSEED (vault shares)' : 'sSEED (receipt tokens)'} as proof.
                      {compound && ' The vSEED automatically compounds your rewards!'}
                    </p>

                    <button
                      onClick={handleDeposit}
                      disabled={!hasEnoughAllowance || isDepositPending || isDepositConfirming || !depositAmount}
                      className={`w-full py-3 px-6 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        hasEnoughAllowance
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                          : 'bg-gray-600 text-gray-400'
                      }`}
                    >
                      {isDepositPending || isDepositConfirming
                        ? '🌱 Planting...'
                        : hasEnoughAllowance
                          ? `🌱 Plant ${depositAmount} SEED ${compound ? 'in Greenhouse' : ''}`
                          : '🔒 Complete approval first'
                      }
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {isDepositConfirmed && (
              <div className="bg-green-900/30 border border-green-500/50 p-6 rounded-xl text-center">
                <h3 className="text-xl font-bold text-green-400 mb-2">🎉 Seeds Successfully Planted!</h3>
                <p className="text-green-300">
                  You planted {depositAmount} SEED and received {compound ? 'vSEED vault shares' : 'sSEED receipt tokens'}!
                  {compound ? ' Your rewards will auto-compound in the Greenhouse.' : ' You can manually harvest rewards as they accumulate.'}
                </p>
                <div className="mt-4 bg-green-800/30 p-3 rounded-lg">
                  <p className="text-green-200 text-sm">
                    🌱 → {compound ? '🏡 vSEED (growing automatically)' : '🧾 sSEED (receipt token)'}
                  </p>
                </div>
              </div>
            )}

            {/* Educational Content */}
            <div className="bg-yellow-100 border border-yellow-300 p-6 rounded-xl">
              <div className="flex items-start space-x-4">
                <DuckMascot size="medium" expression="happy" className="flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">🧠 Understanding This Process</h3>
                  <div className="text-gray-900 space-y-2 text-sm">
                    <p><strong>Token Approvals:</strong> You're giving the Garden contract permission to move your SEED tokens. This is standard for all DeFi protocols.</p>
                    <p><strong>Staking:</strong> Your SEED gets locked in a staking contract that distributes rewards over 24 hours to all stakers proportionally.</p>
                    <p><strong>Receipt Tokens:</strong> {compound ? 'vSEED vault shares prove your ownership and automatically grow in value.' : 'sSEED tokens prove you staked and can be redeemed for SEED + rewards.'}</p>
                    <p><strong>Real DeFi:</strong> This is exactly how Lido (liquid staking), Aave (lending), and Yearn Finance (yield farming) work!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}