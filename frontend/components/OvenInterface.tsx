'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { DISH_NFT_ABI, DISH_NFT_ADDRESS, INGREDIENTS_ABI, INGREDIENTS_ADDRESS } from '../lib/contracts'
import DuckMascot from './DuckMascot'

interface Ingredient {
  id: number
  name: string
  emoji: string
}

const INGREDIENTS: Ingredient[] = [
  { id: 1, name: 'Egg', emoji: '🥚' },
  { id: 2, name: 'Cheese', emoji: '🧀' },
  { id: 3, name: 'Bacon', emoji: '🥓' }
]

const RECIPES = [
  {
    id: 'scrambled-eggs',
    name: 'Scrambled Eggs',
    emoji: '🍳',
    ingredients: [{ id: 1, amount: 2 }],
    description: 'Simple and delicious'
  },
  {
    id: 'cheese-omelette',
    name: 'Cheese Omelette',
    emoji: '🧀🍳',
    ingredients: [{ id: 1, amount: 2 }, { id: 2, amount: 1 }],
    description: 'Fluffy and cheesy'
  },
  {
    id: 'breakfast-special',
    name: 'Breakfast Special',
    emoji: '🍽️',
    ingredients: [{ id: 1, amount: 2 }, { id: 2, amount: 1 }, { id: 3, amount: 1 }],
    description: 'The complete breakfast'
  },
]

export default function OvenInterface() {
  const { address, isConnected } = useAccount()
  const [selectedIngredients, setSelectedIngredients] = useState<Record<number, number>>({})
  const [showTooltip, setShowTooltip] = useState(false)

  // Read ingredient balances
  const { data: eggBalance, refetch: refetchEggBalance } = useReadContract({
    address: INGREDIENTS_ADDRESS,
    abi: INGREDIENTS_ABI,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(1)] : undefined,
    query: { enabled: !!address && !!INGREDIENTS_ADDRESS }
  })

  const { data: cheeseBalance, refetch: refetchCheeseBalance } = useReadContract({
    address: INGREDIENTS_ADDRESS,
    abi: INGREDIENTS_ABI,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(2)] : undefined,
    query: { enabled: !!address && !!INGREDIENTS_ADDRESS }
  })

  const { data: baconBalance, refetch: refetchBaconBalance } = useReadContract({
    address: INGREDIENTS_ADDRESS,
    abi: INGREDIENTS_ABI,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(3)] : undefined,
    query: { enabled: !!address && !!INGREDIENTS_ADDRESS }
  })

  // Write contract hooks for cooking
  const { writeContract: cook, isPending, error, data: cookHash } = useWriteContract()

  // Wait for transaction receipt
  const { isLoading: isCookConfirming, isSuccess: isCookSuccess } = useWaitForTransactionReceipt({
    hash: cookHash,
  })

  // Refetch balances and reset selection when cooking is successful
  useEffect(() => {
    if (isCookSuccess) {
      refetchEggBalance()
      refetchCheeseBalance()
      refetchBaconBalance()
      setSelectedIngredients({})
    }
  }, [isCookSuccess, refetchEggBalance, refetchCheeseBalance, refetchBaconBalance])

  const getIngredientBalance = (ingredientId: number): bigint => {
    switch (ingredientId) {
      case 1: return (eggBalance as bigint) || BigInt(0)
      case 2: return (cheeseBalance as bigint) || BigInt(0)
      case 3: return (baconBalance as bigint) || BigInt(0)
      default: return BigInt(0)
    }
  }

  const handleIngredientChange = (id: number, change: number) => {
    setSelectedIngredients(prev => {
      const current = prev[id] || 0
      const owned = Number(getIngredientBalance(id))
      const newAmount = Math.max(0, Math.min(current + change, owned))

      if (newAmount === 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }

      return { ...prev, [id]: newAmount }
    })
  }

  const canCookRecipe = (recipe: typeof RECIPES[0]) => {
    return recipe.ingredients.every(req => {
      const selected = selectedIngredients[req.id] || 0
      return selected >= req.amount
    })
  }

  const matchesRecipe = () => {
    return RECIPES.find(recipe => {
      const hasExactIngredients = recipe.ingredients.every(req =>
        selectedIngredients[req.id] === req.amount
      )
      const noExtraIngredients = Object.keys(selectedIngredients).every(id =>
        recipe.ingredients.some(req => req.id === Number(id))
      )
      return hasExactIngredients && noExtraIngredients
    })
  }

  const handleCook = async () => {
    if (!DISH_NFT_ADDRESS || !address) return

    const ingredients = Object.entries(selectedIngredients)
      .filter(([_, amount]) => amount > 0)
      .map(([id, amount]) => ({ id: Number(id), amount }))

    if (ingredients.length === 0) return

    const ingredientIds = ingredients.map(ing => BigInt(ing.id))
    const amounts = ingredients.map(ing => BigInt(ing.amount))

    cook({
      address: DISH_NFT_ADDRESS,
      abi: DISH_NFT_ABI,
      functionName: 'cook',
      args: [ingredientIds, amounts]
    })
  }

  const hasSelectedIngredients = Object.keys(selectedIngredients).length > 0
  const totalIngredientCount = Object.values(selectedIngredients).reduce((sum, count) => sum + count, 0)
  const hasMinimumIngredients = totalIngredientCount >= 2

  if (!isConnected) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
        <p className="text-gray-600">Please connect your wallet to access the oven</p>
      </div>
    )
  }

  if (!DISH_NFT_ADDRESS || !INGREDIENTS_ADDRESS) {
    return (
      <div className="bg-amber-100 p-6 rounded-xl border border-amber-300 text-center">
        <p className="text-amber-800">Contract addresses not configured</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Duck Education Section */}
      <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
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
                  <p className="font-medium mb-1">Burning & Minting</p>
                  <p className="text-xs">When you cook, your ingredient tokens are "burned" (destroyed) and you mint (create) a new NFT dish - this is how crafting works in blockchain games!</p>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-orange-800 mb-2">Understanding Token Burning & NFT Minting</h4>
            <p className="text-orange-700 text-sm">
              Cooking burns ERC-1155 ingredient tokens and mints a unique ERC-721 NFT dish with your recipe stored on-chain.
            </p>
          </div>
        </div>
      </div>

      {/* Ingredient Selection */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🥘 Select Your Ingredients</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {INGREDIENTS.map(ingredient => {
            const balance = Number(getIngredientBalance(ingredient.id))
            return (
              <div key={ingredient.id} className="border border-gray-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">{ingredient.emoji}</div>
                  <h4 className="font-semibold text-gray-800 mb-1">{ingredient.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">You have: {balance}</p>

                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleIngredientChange(ingredient.id, -1)}
                      className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                      disabled={!selectedIngredients[ingredient.id]}
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">
                      {selectedIngredients[ingredient.id] || 0}
                    </span>
                    <button
                      onClick={() => handleIngredientChange(ingredient.id, 1)}
                      className="w-8 h-8 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                      disabled={(selectedIngredients[ingredient.id] || 0) >= balance}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recipe Preview */}
        {hasSelectedIngredients && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">🍳 Recipe Preview</h4>
            <div className="flex items-center space-x-3 mb-3">
              {Object.entries(selectedIngredients).map(([id, amount]) => {
                const ingredient = INGREDIENTS.find(i => i.id === Number(id))
                return ingredient && amount > 0 ? (
                  <div key={id} className="flex items-center space-x-1">
                    <span className="text-2xl">{ingredient.emoji}</span>
                    <span className="text-sm text-gray-600">×{amount}</span>
                  </div>
                ) : null
              })}
            </div>

            {matchesRecipe() ? (
              <div className="bg-green-100 p-3 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✨ You'll create: {matchesRecipe()?.name}!
                </p>
              </div>
            ) : (
              <div className="bg-yellow-100 p-3 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  🧪 Experimental dish! Try different combinations to discover recipes.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Cook Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleCook}
            disabled={!hasMinimumIngredients || isPending || isCookConfirming}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isPending || isCookConfirming ? '🔥 Cooking...' : '👨‍🍳 Start Cooking!'}
          </button>
          {hasSelectedIngredients && !hasMinimumIngredients && (
            <p className="text-red-600 text-sm mt-2">
              Select at least 2 ingredients to cook a dish
            </p>
          )}
        </div>

        {/* Transaction Status */}
        {isPending && (
          <div className="mt-4 bg-blue-100 p-3 rounded-lg">
            <p className="text-blue-800 text-sm">🔄 Transaction pending...</p>
          </div>
        )}

        {isCookConfirming && (
          <div className="mt-4 bg-blue-100 p-3 rounded-lg">
            <p className="text-blue-800 text-sm">⏳ Waiting for confirmation...</p>
          </div>
        )}

        {isCookSuccess && (
          <div className="mt-4 bg-green-100 p-4 rounded-lg text-center">
            <p className="text-green-800 font-medium text-lg">
              ✅ Successfully minted dish NFT!
            </p>
            <p className="text-green-700 text-sm mt-1">
              Your ingredients have been burned and your dish NFT has been created.
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-100 p-3 rounded-lg">
            <p className="text-red-800 text-sm">❌ Error: {error.message}</p>
          </div>
        )}
      </div>

      {/* Known Recipes */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📖 Known Recipes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECIPES.map(recipe => {
            const canCook = recipe.ingredients.every(req => Number(getIngredientBalance(req.id)) >= req.amount)
            return (
              <div
                key={recipe.id}
                className={`border rounded-lg p-4 transition-all ${
                  canCook ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{recipe.emoji}</div>
                  <h4 className="font-semibold text-gray-800">{recipe.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{recipe.description}</p>
                  <div className="flex justify-center space-x-2">
                    {recipe.ingredients.map(ing => {
                      const ingredient = INGREDIENTS.find(i => i.id === ing.id)
                      return (
                        <div key={ing.id} className="flex items-center space-x-1">
                          <span>{ingredient?.emoji}</span>
                          <span className="text-xs">×{ing.amount}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div className={`mt-2 text-xs px-2 py-1 rounded ${
                    canCook ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {canCook ? 'Can Cook!' : 'Need More Ingredients'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Educational Note */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <span>💡</span>
          <span>
            This oven demonstrates token burning (destroying ERC-1155s) and NFT minting (creating ERC-721s)
          </span>
        </div>
      </div>
    </div>
  )
}