'use client'

import DuckMascot from '../../components/DuckMascot'
import ShopInterface from '../../components/ShopInterface'
import { useAccount } from 'wagmi'
import Link from 'next/link'

export default function ShopPage() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <DuckMascot size="small" expression="happy" />
              <h1 className="text-xl font-bold text-gray-800">ChainSchool</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full">
              Step 2 of 5: Shop
            </div>
            <div className="text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full">
              Sepolia Testnet
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <DuckMascot size="large" expression="excited" className="mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            🛒 Ingredient Shop
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Buy ingredients with your KitchenTokens! Use batch transactions to save on gas costs.
          </p>
        </div>

        {/* Tutorial Steps */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-300 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <span className="text-blue-600 font-medium">Faucet</span>
              </div>
              <div className="w-8 h-1 bg-blue-300 rounded"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span className="text-green-600 font-medium">Shop</span>
              </div>
              <div className="w-8 h-1 bg-gray-300 rounded"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="text-gray-600">Pantry</span>
              </div>
              <div className="w-8 h-1 bg-gray-300 rounded"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <span className="text-gray-600">Oven</span>
              </div>
              <div className="w-8 h-1 bg-gray-300 rounded"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                  5
                </div>
                <span className="text-gray-600">Cookbook</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Shop Interface */}
        {isConnected ? (
          <div className="space-y-8">
            <ShopInterface />

            {/* Next Step */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 text-center">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                🎉 Ready for the Next Step?
              </h3>
              <p className="text-blue-700 mb-4">
                Once you have ingredients, check your Pantry to see your inventory!
              </p>
              <button
                disabled
                className="bg-blue-200 text-blue-800 px-6 py-2 rounded-lg font-medium opacity-50 cursor-not-allowed"
              >
                Go to Pantry (Coming Soon)
              </button>
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
                You need to connect your wallet to Sepolia testnet to access the shop.
              </p>
              <Link
                href="/"
                className="bg-yellow-200 text-yellow-800 px-6 py-2 rounded-lg hover:bg-yellow-300 transition-colors font-medium"
              >
                ← Back to Welcome
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">
            Learning ERC-1155 tokens through hands-on experience • Powered by{' '}
            <span className="font-medium">Sepolia Testnet</span>
          </p>
        </div>
      </footer>
    </div>
  )
}