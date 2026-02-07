'use client'

import { useState } from 'react'
import DuckMascot from './DuckMascot'

// Mock data for demonstration
const AVAILABLE_INGREDIENTS = [
  { id: 1, name: 'Egg', emoji: '🥚', owned: 3 },
  { id: 2, name: 'Cheese', emoji: '🧀', owned: 2 },
  { id: 3, name: 'Bacon', emoji: '🥓', owned: 1 },
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
  const [selectedIngredients, setSelectedIngredients] = useState<Record<number, number>>({})
  const [showTooltip, setShowTooltip] = useState(false)
  const [isCooking, setIsCooking] = useState(false)
  const [lastDishMinted, setLastDishMinted] = useState<string | null>(null)

  const handleIngredientChange = (id: number, change: number) => {
    setSelectedIngredients(prev => {
      const current = prev[id] || 0
      const ingredient = AVAILABLE_INGREDIENTS.find(i => i.id === id)
      const newAmount = Math.max(0, Math.min(current + change, ingredient?.owned || 0))

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
    setIsCooking(true)

    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000))

    const recipe = matchesRecipe()
    setLastDishMinted(recipe?.name || 'Custom Dish')
    setSelectedIngredients({})
    setIsCooking(false)
  }

  const hasSelectedIngredients = Object.keys(selectedIngredients).length > 0

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
            <h4 className="font-semibold text-orange-800 mb-2">Learn About Token Burning & NFT Minting</h4>
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
          {AVAILABLE_INGREDIENTS.map(ingredient => (
            <div key={ingredient.id} className="border border-gray-200 rounded-lg p-4">
              <div className="text-center">
                <div className="text-4xl mb-2">{ingredient.emoji}</div>
                <h4 className="font-semibold text-gray-800 mb-1">{ingredient.name}</h4>
                <p className="text-sm text-gray-600 mb-3">You have: {ingredient.owned}</p>

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
                    disabled={(selectedIngredients[ingredient.id] || 0) >= ingredient.owned}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Preview */}
        {hasSelectedIngredients && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">🍳 Recipe Preview</h4>
            <div className="flex items-center space-x-3 mb-3">
              {Object.entries(selectedIngredients).map(([id, amount]) => {
                const ingredient = AVAILABLE_INGREDIENTS.find(i => i.id === Number(id))
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
            disabled={!hasSelectedIngredients || isCooking}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isCooking ? '🔥 Cooking...' : '👨‍🍳 Start Cooking!'}
          </button>
        </div>

        {/* Success Message */}
        {lastDishMinted && !isCooking && (
          <div className="mt-4 bg-green-100 p-4 rounded-lg text-center">
            <p className="text-green-800 font-medium text-lg">
              ✅ Successfully minted: {lastDishMinted} NFT!
            </p>
            <p className="text-green-700 text-sm mt-1">
              Your ingredients have been burned and your dish NFT has been created.
            </p>
          </div>
        )}
      </div>

      {/* Known Recipes */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📖 Known Recipes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECIPES.map(recipe => (
            <div
              key={recipe.id}
              className={`border rounded-lg p-4 transition-all ${
                canCookRecipe(recipe)
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{recipe.emoji}</div>
                <h4 className="font-semibold text-gray-800">{recipe.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{recipe.description}</p>
                <div className="flex justify-center space-x-2">
                  {recipe.ingredients.map(ing => {
                    const ingredient = AVAILABLE_INGREDIENTS.find(i => i.id === ing.id)
                    return (
                      <div key={ing.id} className="flex items-center space-x-1">
                        <span>{ingredient?.emoji}</span>
                        <span className="text-xs">×{ing.amount}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
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