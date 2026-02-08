'use client'

import DuckMascot from '../../../../components/DuckMascot'
import OvenInterface from '../../../../components/OvenInterface'
import { useAccount } from 'wagmi'
import Link from 'next/link'

export default function OvenPage() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img src="/logos/TA-Hero-Logo.png" alt="Trustless Academy" className="h-16 w-auto" />
              <h1 className="text-xl font-bold text-gray-800">Trustless Academy</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 bg-orange-100 px-3 py-1 rounded-full">
              On-Chain Kitchen: Oven
            </div>
            <div className="text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full">
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
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            🔥 The Oven
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Time to cook! Burn your ingredients to mint unique Dish NFTs with on-chain recipes.
          </p>
          <div className="bg-yellow-50 rounded-xl p-4 mt-6 max-w-2xl mx-auto">
            <p className="text-sm text-gray-700">
              <strong>📍 What you'll learn:</strong> Experience token burning, NFT minting, and deterministic on-chain metadata.
            </p>
          </div>
        </div>

        {/* Main Oven Interface */}
        {isConnected ? (
          <div className="space-y-8">
            <OvenInterface />

            {/* Next Step */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 text-center">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">
                🎉 Finished Cooking?
              </h3>
              <p className="text-purple-700 mb-4">
                Check out your Cookbook to see all the delicious NFT dishes you've created!
              </p>
              <Link
                href="/tutorials/on-chain-kitchen/cookbook"
                className="inline-block bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors font-medium"
              >
                View Cookbook →
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-yellow-100 p-8 rounded-xl border border-yellow-300">
              <DuckMascot size="medium" expression="curious" className="mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                Wallet Connection Required
              </h3>
              <p className="text-yellow-700 mb-4">
                You need to connect your wallet to Sepolia testnet to use the oven.
              </p>
              <Link
                href="/tutorials/on-chain-kitchen"
                className="bg-yellow-200 text-yellow-800 px-6 py-2 rounded-lg hover:bg-yellow-300 transition-colors font-medium"
              >
                ← Back to Tutorial Intro
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">
            Learning token burning and NFT minting • Powered by{' '}
            <span className="font-medium">Sepolia Testnet</span>
          </p>
        </div>
      </footer>
    </div>
  )
}