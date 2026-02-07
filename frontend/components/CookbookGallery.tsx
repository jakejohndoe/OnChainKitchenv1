'use client'

import { useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { DISH_NFT_ABI, DISH_NFT_ADDRESS } from '../lib/contracts'
import DuckMascot from './DuckMascot'

interface DishNFT {
  tokenId: bigint
  tokenURI: string
  svgImage?: string
}

const INGREDIENTS = [
  { id: 1, name: 'Egg', emoji: '🥚' },
  { id: 2, name: 'Cheese', emoji: '🧀' },
  { id: 3, name: 'Bacon', emoji: '🥓' }
]

export default function CookbookGallery() {
  const { address, isConnected } = useAccount()
  const [selectedDish, setSelectedDish] = useState<DishNFT | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  // Read the total number of NFTs owned by the user
  const { data: balance } = useReadContract({
    address: DISH_NFT_ADDRESS,
    abi: DISH_NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!DISH_NFT_ADDRESS }
  })

  // For now, we'll show dishes count and basic info
  // In a full implementation, we'd iterate through tokenOfOwnerByIndex to get all token IDs
  const dishCount = balance ? Number(balance) : 0
  const hasDishes = dishCount > 0

  if (!isConnected) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
        <p className="text-gray-600">Please connect your wallet to view your cookbook</p>
      </div>
    )
  }

  if (!DISH_NFT_ADDRESS) {
    return (
      <div className="bg-amber-100 p-6 rounded-xl border border-amber-300 text-center">
        <p className="text-amber-800">DishNFT contract address not configured</p>
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
              <div className="text-2xl font-bold text-purple-600">{dishCount}</div>
              <p className="text-sm text-gray-600">Total Dishes</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {dishCount > 0 ? dishCount * 2 : 0}
              </div>
              <p className="text-sm text-gray-600">Approx. Ingredients Used</p>
            </div>
          </div>
        </div>
      </div>

      {/* NFT Gallery */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-6">🖼️ Your Dish Collection</h3>

        {hasDishes ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️✨</div>
            <h4 className="text-xl font-semibold text-gray-800 mb-3">You Have {dishCount} Dish NFTs!</h4>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Your dishes are stored on the blockchain as unique NFTs. Each one has its recipe permanently recorded on-chain.
            </p>
            <div className="bg-purple-50 p-6 rounded-lg max-w-md mx-auto">
              <h5 className="font-semibold text-purple-800 mb-2">🔗 On-Chain Features</h5>
              <ul className="text-sm text-purple-700 space-y-1 text-left">
                <li>✅ Unique token IDs for each dish</li>
                <li>✅ Recipe ingredients stored permanently</li>
                <li>✅ SVG images generated on-chain</li>
                <li>✅ Full ERC-721 compatibility</li>
              </ul>
            </div>
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