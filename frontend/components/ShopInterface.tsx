'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { KITCHEN_TOKEN_ABI, KITCHEN_TOKEN_ADDRESS, INGREDIENTS_ABI, INGREDIENTS_ADDRESS } from '../lib/contracts'
import DuckMascot from './DuckMascot'

interface Ingredient {
  id: number
  name: string
  emoji: string
  description: string
}

const INGREDIENTS: Ingredient[] = [
  { id: 1, name: 'Egg', emoji: '🥚', description: 'Fresh farm eggs, perfect for any dish' },
  { id: 2, name: 'Cheese', emoji: '🧀', description: 'Aged cheddar, adds rich flavor' },
  { id: 3, name: 'Bacon', emoji: '🥓', description: 'Crispy bacon strips, smoky and delicious' }
]

export default function ShopInterface() {
  const { address, isConnected } = useAccount()
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [showTooltip, setShowTooltip] = useState(false)

  // Read token balance
  const { data: tokenBalance, refetch: refetchTokenBalance } = useReadContract({
    address: KITCHEN_TOKEN_ADDRESS,
    abi: KITCHEN_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!KITCHEN_TOKEN_ADDRESS
    }
  })

  // Read ingredient balances
  const { data: eggBalance, refetch: refetchEggBalance } = useReadContract({
    address: INGREDIENTS_ADDRESS,
    abi: INGREDIENTS_ABI,
    functionName: 'balanceOf',
    args: address ? [address, 1n] : undefined,
    query: {
      enabled: !!address && !!INGREDIENTS_ADDRESS
    }
  })

  const { data: cheeseBalance, refetch: refetchCheeseBalance } = useReadContract({
    address: INGREDIENTS_ADDRESS,
    abi: INGREDIENTS_ABI,
    functionName: 'balanceOf',
    args: address ? [address, 2n] : undefined,
    query: {
      enabled: !!address && !!INGREDIENTS_ADDRESS
    }
  })

  const { data: baconBalance, refetch: refetchBaconBalance } = useReadContract({
    address: INGREDIENTS_ADDRESS,
    abi: INGREDIENTS_ABI,
    functionName: 'balanceOf',
    args: address ? [address, 3n] : undefined,
    query: {
      enabled: !!address && !!INGREDIENTS_ADDRESS
    }
  })

  // Get price per ingredient
  const { data: pricePerIngredient } = useReadContract({
    address: INGREDIENTS_ADDRESS,
    abi: INGREDIENTS_ABI,
    functionName: 'PRICE_PER_INGREDIENT',
    query: {
      enabled: !!INGREDIENTS_ADDRESS
    }
  })

  // Write contract hooks
  const { writeContract: approveTokens, data: approveHash } = useWriteContract()
  const { writeContract: buyIngredients, isPending, error, data: buyHash } = useWriteContract()

  // Wait for transaction receipts
  const { isLoading: isApprovePending } = useWaitForTransactionReceipt({ hash: approveHash })
  const { isLoading: isBuyPending, isSuccess: isBuySuccess } = useWaitForTransactionReceipt({ hash: buyHash })

  const handleQuantityChange = (ingredientId: number, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [ingredientId]: Math.max(0, quantity)
    }))
  }

  const calculateTotalCost = () => {
    const totalItems = Object.values(quantities).reduce((sum, qty) => sum + (qty || 0), 0)
    if (!pricePerIngredient) return 0n
    return BigInt(totalItems) * pricePerIngredient
  }

  const getSelectedIngredients = () => {
    const ids: number[] = []
    const amounts: number[] = []

    Object.entries(quantities).forEach(([id, amount]) => {
      if (amount && amount > 0) {
        ids.push(Number(id))
        amounts.push(amount)
      }
    })

    return { ids, amounts }
  }

  const handleApprove = async () => {
    if (!KITCHEN_TOKEN_ADDRESS || !INGREDIENTS_ADDRESS) return

    const totalCost = calculateTotalCost()
    approveTokens({
      address: KITCHEN_TOKEN_ADDRESS,
      abi: KITCHEN_TOKEN_ABI,
      functionName: 'approve',
      args: [INGREDIENTS_ADDRESS, totalCost]
    })
  }

  const handleBuy = async () => {
    if (!INGREDIENTS_ADDRESS) return

    const { ids, amounts } = getSelectedIngredients()
    if (ids.length === 0) return

    buyIngredients({
      address: INGREDIENTS_ADDRESS,
      abi: INGREDIENTS_ABI,
      functionName: 'buyBatch',
      args: [ids.map(id => BigInt(id)), amounts.map(amount => BigInt(amount))]
    })
  }

  // Refetch balances when transaction is successful
  useEffect(() => {
    if (isBuySuccess) {
      refetchTokenBalance()
      refetchEggBalance()
      refetchCheeseBalance()
      refetchBaconBalance()
    }
  }, [isBuySuccess, refetchTokenBalance, refetchEggBalance, refetchCheeseBalance, refetchBaconBalance])

  const formatTokenAmount = (amount: bigint | undefined) => {
    if (!amount) return '0'
    return (Number(amount) / 1e18).toFixed(0)
  }

  const getIngredientBalance = (ingredientId: number) => {
    switch (ingredientId) {
      case 1: return eggBalance || 0n
      case 2: return cheeseBalance || 0n
      case 3: return baconBalance || 0n
      default: return 0n
    }
  }

  const selectedCount = Object.values(quantities).reduce((sum, qty) => sum + (qty || 0), 0)
  const totalCost = calculateTotalCost()

  if (!isConnected) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
        <p className="text-gray-600">Please connect your wallet to access the shop</p>
      </div>
    )
  }

  if (!INGREDIENTS_ADDRESS) {
    return (
      <div className="bg-amber-100 p-6 rounded-xl border border-amber-300 text-center">
        <p className="text-amber-800">Ingredients contract address not configured</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Duck Education Section */}
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
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
                  <p className="font-medium mb-1">Batch Transactions</p>
                  <p className="text-xs">Buying multiple ingredients in one transaction saves gas fees compared to individual purchases - it's like buying groceries in bulk!</p>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-green-800 mb-2">Learn About Batch Transactions</h4>
            <p className="text-green-700 text-sm">
              Batch transactions let you buy multiple ingredients in one go, saving gas fees compared to individual purchases.
            </p>
          </div>
        </div>
      </div>

      {/* Balance Display */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Your Balances</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              🪙 {formatTokenAmount(tokenBalance)} KITCHEN
            </div>
            <p className="text-gray-600 text-sm">Available to spend</p>
          </div>
        </div>
      </div>

      {/* Ingredient Selection */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🛒 Select Ingredients</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {INGREDIENTS.map((ingredient) => (
            <div
              key={ingredient.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">{ingredient.emoji}</div>
                <h4 className="font-semibold text-gray-800 mb-1">{ingredient.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{ingredient.description}</p>
                <div className="text-sm text-gray-500 mb-3">
                  Price: {formatTokenAmount(pricePerIngredient)} KITCHEN
                </div>
                <div className="text-sm text-green-600 mb-3">
                  You have: {Number(getIngredientBalance(ingredient.id))}
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(ingredient.id, (quantities[ingredient.id] || 0) - 1)}
                    className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantities[ingredient.id] || 0}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(ingredient.id, (quantities[ingredient.id] || 0) + 1)}
                    className="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Purchase Summary */}
        {selectedCount > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-green-800">
                Total: {selectedCount} ingredient{selectedCount !== 1 ? 's' : ''}
              </span>
              <span className="font-bold text-green-800">
                {formatTokenAmount(totalCost)} KITCHEN
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleApprove}
                disabled={isApprovePending || isPending || isBuyPending}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isApprovePending ? 'Approving...' : '1. Approve Tokens'}
              </button>
              <button
                onClick={handleBuy}
                disabled={isPending || isBuyPending || !approveHash}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending || isBuyPending ? 'Buying...' : '2. Buy Ingredients'}
              </button>
            </div>
          </div>
        )}

        {/* Transaction Status */}
        {isApprovePending && (
          <div className="mt-4 bg-blue-100 p-3 rounded-lg">
            <p className="text-blue-800 text-sm">🔄 Approving tokens...</p>
          </div>
        )}

        {isPending || isBuyPending && (
          <div className="mt-4 bg-blue-100 p-3 rounded-lg">
            <p className="text-blue-800 text-sm">⏳ Purchasing ingredients...</p>
          </div>
        )}

        {isBuySuccess && (
          <div className="mt-4 bg-green-100 p-3 rounded-lg">
            <p className="text-green-800 text-sm">✅ Ingredients purchased successfully!</p>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-100 p-3 rounded-lg">
            <p className="text-red-800 text-sm">❌ Error: {error.message}</p>
          </div>
        )}
      </div>

      {/* Educational Note */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <span>💡</span>
          <span>
            This shop demonstrates ERC-1155 multi-token standards and batch transactions for gas efficiency
          </span>
        </div>
      </div>
    </div>
  )
}