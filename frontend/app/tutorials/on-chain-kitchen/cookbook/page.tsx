'use client'

import DuckMascot from '../../../../components/DuckMascot'
import CookbookGallery from '../../../../components/CookbookGallery'
import { useAccount } from 'wagmi'
import Link from 'next/link'

export default function CookbookPage() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <DuckMascot size="small" expression="happy" />
              <h1 className="text-xl font-bold text-gray-800">Trustless Academy</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 bg-purple-100 px-3 py-1 rounded-full">
              On-Chain Kitchen: Cookbook
            </div>
            <div className="text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full">
              Sepolia Testnet
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 pb-32">
        {/* Page Header */}
        <div className="text-center mb-12">
          <DuckMascot size="large" expression="excited" className="mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            📚 Your Cookbook
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Browse your collection of NFT dishes! Each one is a unique ERC-721 token with its recipe stored on-chain.
          </p>
          <div className="bg-yellow-50 rounded-xl p-4 mt-6 max-w-2xl mx-auto">
            <p className="text-sm text-gray-700">
              <strong>📍 What you'll learn:</strong> Understand ERC-721 NFTs, true digital ownership, and on-chain metadata.
            </p>
          </div>
        </div>

        {/* Main Cookbook Interface */}
        {isConnected ? (
          <div className="space-y-8">
            <CookbookGallery />

            {/* Completion Call to Action */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200 text-center">
              <div className="text-4xl mb-4">👨‍🍳</div>
              <h3 className="text-2xl font-bold text-green-800 mb-3">
                Ready to Celebrate Your Success?
              </h3>
              <p className="text-green-700 mb-6 max-w-2xl mx-auto">
                You've mastered all three token standards and built an amazing collection of dishes!
                Let's see everything you've accomplished in this tutorial.
              </p>
              <Link
                href="/tutorials/on-chain-kitchen/complete"
                className="inline-flex items-center bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors font-medium text-lg shadow-lg"
              >
                🎉 Celebrate Your Achievement →
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
                You need to connect your wallet to Sepolia testnet to view your cookbook.
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
            Learning ERC-721 NFTs and on-chain metadata • Powered by{' '}
            <span className="font-medium">Sepolia Testnet</span>
          </p>
        </div>
      </footer>
    </div>
  )
}