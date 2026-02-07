'use client'

import { useState } from 'react'
import DuckMascot from './DuckMascot'

// Mock NFT data for demonstration
const MOCK_DISHES = [
  {
    id: 1,
    name: 'Scrambled Eggs #1',
    image: '🍳',
    recipe: [
      { name: 'Egg', amount: 2, emoji: '🥚' }
    ],
    cookedAt: '2024-02-07 10:30',
    tokenId: '1'
  },
  {
    id: 2,
    name: 'Cheese Omelette #2',
    image: '🧀🍳',
    recipe: [
      { name: 'Egg', amount: 2, emoji: '🥚' },
      { name: 'Cheese', amount: 1, emoji: '🧀' }
    ],
    cookedAt: '2024-02-07 11:45',
    tokenId: '2'
  },
  {
    id: 3,
    name: 'Breakfast Special #3',
    image: '🍽️',
    recipe: [
      { name: 'Egg', amount: 2, emoji: '🥚' },
      { name: 'Cheese', amount: 1, emoji: '🧀' },
      { name: 'Bacon', amount: 1, emoji: '🥓' }
    ],
    cookedAt: '2024-02-07 12:15',
    tokenId: '3'
  }
]

export default function CookbookGallery() {
  const [selectedDish, setSelectedDish] = useState<typeof MOCK_DISHES[0] | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  // For demo, we'll show the mock dishes
  const dishes = MOCK_DISHES
  const hasDishes = dishes.length > 0

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
                  <p className="font-medium mb-1">ERC-721 Ownership</p>
                  <p className="text-xs">Each dish NFT is unique and owned by you. The recipe is stored on-chain forever, proving what ingredients were used and when it was created!</p>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">Learn About NFT Ownership</h4>
            <p className="text-purple-700 text-sm">
              ERC-721 NFTs are unique, non-fungible tokens. Each dish you create is one-of-a-kind with its recipe permanently stored on the blockchain.
            </p>
          </div>
        </div>
      </div>

      {/* NFT Collection Stats */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">📊 Collection Stats</h3>
          <div className="flex space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{dishes.length}</div>
              <p className="text-sm text-gray-600">Total Dishes</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {dishes.reduce((sum, d) => sum + d.recipe.reduce((s, r) => s + r.amount, 0), 0)}
              </div>
              <p className="text-sm text-gray-600">Ingredients Used</p>
            </div>
          </div>
        </div>
      </div>

      {/* NFT Gallery */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-6">🖼️ Your Dish Collection</h3>

        {hasDishes ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
              >
                {/* NFT Image */}
                <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-8 text-center">
                  <div className="text-6xl mb-2">{dish.image}</div>
                  <div className="bg-white px-2 py-1 rounded text-xs text-gray-600 inline-block">
                    #{dish.tokenId}
                  </div>
                </div>

                {/* NFT Details */}
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{dish.name}</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {dish.recipe.map((ing, idx) => (
                      <span key={idx} className="text-sm">
                        {ing.emoji}×{ing.amount}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Cooked: {dish.cookedAt}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📖</div>
            <h4 className="text-xl font-semibold text-gray-600 mb-3">No Dishes Yet</h4>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              You haven't cooked any dishes yet! Head to the Oven to burn ingredients and mint your first NFT dish.
            </p>
            <button
              onClick={() => window.location.href = '/tutorials/on-chain-kitchen/oven'}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors font-medium"
            >
              🔥 Go to Oven
            </button>
          </div>
        )}
      </div>

      {/* Selected Dish Modal */}
      {selectedDish && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedDish(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{selectedDish.image}</div>
              <h3 className="text-2xl font-bold text-gray-800">{selectedDish.name}</h3>
              <p className="text-gray-600">Token ID: #{selectedDish.tokenId}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">📝 On-Chain Recipe</h4>
              <div className="space-y-2">
                {selectedDish.recipe.map((ing, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <span className="text-2xl">{ing.emoji}</span>
                      <span className="text-gray-700">{ing.name}</span>
                    </span>
                    <span className="text-gray-600">×{ing.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-purple-800 mb-1">🔗 Blockchain Data</h4>
              <p className="text-sm text-purple-700">
                Cooked on: {selectedDish.cookedAt}
              </p>
              <p className="text-xs text-purple-600 mt-1">
                This recipe is permanently stored on the Sepolia blockchain
              </p>
            </div>

            <button
              onClick={() => setSelectedDish(null)}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Ownership Info */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl">
        <h4 className="font-semibold text-purple-800 mb-3">💎 About Your NFTs</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h5 className="font-medium text-purple-700 mb-2">True Ownership</h5>
            <p className="text-purple-600">
              Each dish NFT is owned by your wallet address. Only you can transfer or sell them.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h5 className="font-medium text-purple-700 mb-2">Permanent Records</h5>
            <p className="text-purple-600">
              Recipe data is stored on-chain forever. It can never be changed or deleted.
            </p>
          </div>
        </div>
      </div>

      {/* Educational Note */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <span>💡</span>
          <span>
            This cookbook demonstrates ERC-721 NFT ownership, on-chain metadata storage, and digital collectibles
          </span>
        </div>
      </div>
    </div>
  )
}