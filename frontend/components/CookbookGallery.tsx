'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { DISH_NFT_ABI, DISH_NFT_ADDRESS } from '../lib/contracts'
import DuckMascot from './DuckMascot'

interface DishNFT {
  tokenId: bigint
  tokenURI?: string
  svgImage?: string
  name?: string
  description?: string
  ingredients?: number[]
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
  const [dishes, setDishes] = useState<DishNFT[]>([])

  // Read the total number of NFTs owned by the user
  const { data: balance } = useReadContract({
    address: DISH_NFT_ADDRESS,
    abi: DISH_NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!DISH_NFT_ADDRESS }
  })

  const dishCount = balance ? Number(balance) : 0
  const hasDishes = dishCount > 0

  // Read each token owned by the user
  const tokenReads = Array.from({ length: dishCount }, (_, i) => ({
    address: DISH_NFT_ADDRESS,
    abi: DISH_NFT_ABI,
    functionName: 'tokenOfOwnerByIndex',
    args: [address, BigInt(i)],
  }))

  // Get token IDs
  const { data: tokenId0 } = useReadContract({
    address: DISH_NFT_ADDRESS,
    abi: DISH_NFT_ABI,
    functionName: 'tokenOfOwnerByIndex',
    args: dishCount > 0 && address ? [address, BigInt(0)] : undefined,
    query: { enabled: dishCount > 0 && !!address && !!DISH_NFT_ADDRESS }
  })

  // Get tokenURI for first token (we'll expand this for multiple tokens)
  const { data: tokenURI0 } = useReadContract({
    address: DISH_NFT_ADDRESS,
    abi: DISH_NFT_ABI,
    functionName: 'tokenURI',
    args: tokenId0 ? [tokenId0] : undefined,
    query: { enabled: !!tokenId0 && !!DISH_NFT_ADDRESS }
  })

  // Parse the tokenURI to extract SVG and metadata
  useEffect(() => {
    if (tokenURI0 && tokenId0) {
      try {
        // TokenURI is in format: data:application/json;base64,{encoded_json}
        const base64Data = (tokenURI0 as string).split(',')[1]
        const jsonData = JSON.parse(atob(base64Data))

        // Extract SVG from the image field
        const svgData = jsonData.image?.split(',')[1]
        const svgImage = svgData ? atob(svgData) : undefined

        setDishes([{
          tokenId: tokenId0 as bigint,
          tokenURI: tokenURI0 as string,
          svgImage,
          name: jsonData.name,
          description: jsonData.description,
          ingredients: jsonData.attributes?.find((attr: any) => attr.trait_type === 'Ingredients')?.value
        }])
      } catch (error) {
        console.error('Error parsing token URI:', error)
      }
    }
  }, [tokenURI0, tokenId0])

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
            <h4 className="font-semibold text-purple-800 mb-2">Understanding NFT Ownership</h4>
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
        <div className="mt-4 pt-4 border-t border-gray-200">
          <a
            href={`https://sepolia.etherscan.io/token/${DISH_NFT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            View Collection on Etherscan →
          </a>
        </div>
      </div>

      {/* NFT Gallery */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-6">🖼️ Your Dish Collection</h3>

        {hasDishes ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dishes.map((dish) => (
                <div key={dish.tokenId.toString()} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  {dish.svgImage ? (
                    <div
                      className="w-full h-48 mb-3 rounded overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: dish.svgImage }}
                    />
                  ) : (
                    <div className="w-full h-48 mb-3 rounded bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <div className="text-6xl">🍽️</div>
                    </div>
                  )}
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {dish.name || `Dish #${dish.tokenId}`}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {dish.description || 'A delicious creation from the On-Chain Kitchen'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Token ID: {dish.tokenId.toString()}</span>
                    <a
                      href={`https://sepolia.etherscan.io/token/${DISH_NFT_ADDRESS}?a=${dish.tokenId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-700 underline"
                    >
                      View on Etherscan
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {dishes.length === 0 && dishCount > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading your dishes...</p>
              </div>
            )}
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