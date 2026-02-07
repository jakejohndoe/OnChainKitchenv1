'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DuckMascot from '../../../components/DuckMascot'
import ConnectWallet from '../../../components/ConnectWallet'
import { useAccount } from 'wagmi'

export default function OnChainKitchenIntro() {
  const { isConnected } = useAccount()
  const router = useRouter()

  const handleStart = () => {
    if (isConnected) {
      router.push('/tutorials/on-chain-kitchen/faucet')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header with Navigation */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <DuckMascot size="small" expression="happy" />
                <h1 className="text-xl font-bold text-gray-800">Trustless Academy</h1>
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/tutorials" className="text-gray-600 hover:text-amber-600">
                Tutorials
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-amber-600 font-medium">On-Chain Kitchen</span>
            </div>
            <div className="text-sm text-gray-600 bg-amber-100 px-3 py-1 rounded-full">
              Welcome
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <DuckMascot size="xlarge" expression="excited" className="mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to On-Chain Kitchen! 👨‍🍳
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Learn Web3 by cooking! Master ERC-20 tokens, ERC-1155 inventories, and ERC-721 NFTs
            through an interactive tutorial that teaches by doing.
          </p>
        </div>

        {/* What You'll Build */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 What You'll Build</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🪙</span>
                <div>
                  <h3 className="font-semibold text-gray-800">ERC-20 Token Faucet</h3>
                  <p className="text-sm text-gray-600">Claim free KitchenTokens to start your journey</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🛒</span>
                <div>
                  <h3 className="font-semibold text-gray-800">ERC-1155 Ingredient Shop</h3>
                  <p className="text-sm text-gray-600">Buy ingredients using batch transactions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📦</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Multi-Token Inventory</h3>
                  <p className="text-sm text-gray-600">Manage your ingredients in the pantry</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Cooking Mechanics</h3>
                  <p className="text-sm text-gray-600">Burn ingredients to create dishes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🖼️</span>
                <div>
                  <h3 className="font-semibold text-gray-800">ERC-721 NFT Dishes</h3>
                  <p className="text-sm text-gray-600">Mint unique NFTs with on-chain recipes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📚</span>
                <div>
                  <h3 className="font-semibold text-gray-800">NFT Cookbook Gallery</h3>
                  <p className="text-sm text-gray-600">View your collection of created dishes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tutorial Steps */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📖 Tutorial Steps</h2>
          <div className="space-y-3">
            <StepItem number={1} title="Faucet" description="Claim your first ERC-20 tokens" />
            <StepItem number={2} title="Shop" description="Buy ingredients with batch transactions" />
            <StepItem number={3} title="Pantry" description="View your ERC-1155 inventory" />
            <StepItem number={4} title="Oven" description="Cook dishes by burning ingredients" />
            <StepItem number={5} title="Cookbook" description="Browse your NFT collection" />
          </div>
        </div>

        {/* Connection Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Ready to Start Cooking?
            </h3>
            <p className="text-gray-600 mb-6">
              First, connect your wallet to get started. We'll be using the Sepolia testnet - completely safe for learning!
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <ConnectWallet />
          </div>
        </div>

        {/* Start Button - Only show when connected */}
        {isConnected && (
          <div className="text-center">
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
            >
              Start Tutorial →
            </button>
          </div>
        )}

        {/* Educational Note */}
        <div className="mt-12 bg-amber-50 p-6 rounded-xl border border-amber-200">
          <div className="flex items-start space-x-3">
            <DuckMascot size="small" expression="curious" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">Why Cooking?</h4>
              <p className="text-amber-700 text-sm">
                Cooking is the perfect metaphor for blockchain concepts! Ingredients are like tokens,
                recipes are like smart contracts, and dishes are like NFTs. By building this DApp,
                you'll understand how real Web3 applications work - all while having fun!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function StepItem({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/50 transition-colors">
      <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}