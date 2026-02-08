'use client'

import { useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { INGREDIENTS_ABI, INGREDIENTS_ADDRESS } from '../lib/contracts'
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

export default function PantryInventory() {
  const { address, isConnected } = useAccount()
  const [showTooltip, setShowTooltip] = useState(false)

  // Read ingredient balances
  const { data: eggBalance } = useReadContract({
    address: INGREDIENTS_ADDRESS,
    abi: INGREDIENTS_ABI,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(1)] : undefined,
    query: {
      enabled: !!address && !!INGREDIENTS_ADDRESS
    }
  })

  const { data: cheeseBalance } = useReadContract({
    address: INGREDIENTS_ADDRESS,
    abi: INGREDIENTS_ABI,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(2)] : undefined,
    query: {
      enabled: !!address && !!INGREDIENTS_ADDRESS
    }
  })

  const { data: baconBalance } = useReadContract({
    address: INGREDIENTS_ADDRESS,
    abi: INGREDIENTS_ABI,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(3)] : undefined,
    query: {
      enabled: !!address && !!INGREDIENTS_ADDRESS
    }
  })

  const getIngredientBalance = (ingredientId: number): bigint => {
    switch (ingredientId) {
      case 1: return (eggBalance as bigint) || BigInt(0)
      case 2: return (cheeseBalance as bigint) || BigInt(0)
      case 3: return (baconBalance as bigint) || BigInt(0)
      default: return BigInt(0)
    }
  }

  const getTotalIngredients = (): number => {
    return Number((eggBalance as bigint) || BigInt(0)) + Number((cheeseBalance as bigint) || BigInt(0)) + Number((baconBalance as bigint) || BigInt(0))
  }

  const hasAnyIngredients = getTotalIngredients() > 0

  if (!isConnected) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
        <p className="text-gray-600">Please connect your wallet to view your pantry</p>
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
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
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
                  <p className="font-medium mb-1">ERC-1155 vs ERC-20</p>
                  <p className="text-xs">Unlike ERC-20 (fungible tokens), ERC-1155 can manage multiple token types in one contract - perfect for inventories with different items!</p>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">Understanding Multi-Token Inventories</h4>
            <p className="text-purple-700 text-sm">
              ERC-1155 allows one contract to manage multiple token types, unlike ERC-20 which handles only one token type per contract.
            </p>
          </div>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">🥘 Inventory Overview</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">
              {getTotalIngredients()} Total Items
            </div>
            <p className="text-gray-600 text-sm">Across all ingredient types</p>
          </div>
        </div>
      </div>

      {/* Ingredient Display */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-6">📦 Your Ingredients</h3>

        {hasAnyIngredients ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INGREDIENTS.map((ingredient) => {
              const balance = Number(getIngredientBalance(ingredient.id))
              return (
                <div
                  key={ingredient.id}
                  className={`border rounded-lg p-6 text-center transition-all ${
                    balance > 0
                      ? 'border-purple-200 bg-purple-50 shadow-sm'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="text-5xl mb-3">{ingredient.emoji}</div>
                  <h4 className="font-semibold text-gray-800 mb-2">{ingredient.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{ingredient.description}</p>
                  <div className={`text-2xl font-bold mb-2 ${
                    balance > 0 ? 'text-purple-600' : 'text-gray-400'
                  }`}>
                    {balance}
                  </div>
                  <div className={`text-sm px-3 py-1 rounded-full inline-block ${
                    balance > 0
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {balance > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h4 className="text-xl font-semibold text-gray-600 mb-3">Your Pantry is Empty</h4>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              You don't have any ingredients yet! Visit the Shop to buy some ingredients with your KitchenTokens.
            </p>
            <div className="space-y-3">
              <div className="bg-gray-100 p-4 rounded-lg inline-block">
                <p className="text-sm text-gray-600 mb-2">🥚 Eggs: 0</p>
                <p className="text-sm text-gray-600 mb-2">🧀 Cheese: 0</p>
                <p className="text-sm text-gray-600">🥓 Bacon: 0</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => window.location.href = '/shop'}
                  className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors font-medium"
                >
                  🛒 Go to Shop
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Token Information */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-3">🔍 How ERC-1155 Works</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h5 className="font-medium text-purple-700 mb-2">Multi-Token Standard</h5>
            <p className="text-purple-600">
              One contract manages multiple token types (eggs, cheese, bacon) with separate balances for each.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h5 className="font-medium text-purple-700 mb-2">Gas Efficient</h5>
            <p className="text-purple-600">
              Batch operations let you transfer multiple token types in one transaction, saving gas costs.
            </p>
          </div>
        </div>
      </div>

      {/* Educational Note */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <span>💡</span>
          <span>
            This pantry demonstrates ERC-1155 multi-token inventories - perfect for games and applications with multiple asset types
          </span>
        </div>
      </div>
    </div>
  )
}