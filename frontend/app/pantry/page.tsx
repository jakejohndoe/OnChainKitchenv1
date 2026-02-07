'use client'

import DuckMascot from '../../components/DuckMascot'
import PantryInventory from '../../components/PantryInventory'
import { useAccount } from 'wagmi'
import Link from 'next/link'

export default function PantryPage() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
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
              Step 3 of 5: Pantry
            </div>
            <div className="text-sm text-gray-600 bg-purple-100 px-3 py-1 rounded-full">
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
            🥘 Your Pantry
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            View your ingredient inventory! Each ingredient is an ERC-1155 token with its own balance.
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
                <div className="w-8 h-8 bg-green-300 text-green-800 rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <span className="text-green-600 font-medium">Shop</span>
              </div>
              <div className="w-8 h-1 bg-purple-300 rounded"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="text-purple-600 font-medium">Pantry</span>
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

        {/* Main Pantry Interface */}
        {isConnected ? (
          <div className="space-y-8">
            <PantryInventory />

            {/* Next Step */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200 text-center">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">
                🔥 Ready to Cook?
              </h3>
              <p className="text-orange-700 mb-4">
                Take your ingredients to the Oven and start cooking delicious dishes!
              </p>
              <button
                disabled
                className="bg-orange-200 text-orange-800 px-6 py-2 rounded-lg font-medium opacity-50 cursor-not-allowed"
              >
                Go to Oven (Coming Soon)
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
                You need to connect your wallet to Sepolia testnet to view your pantry.
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
            Learning ERC-1155 multi-token inventories • Powered by{' '}
            <span className="font-medium">Sepolia Testnet</span>
          </p>
        </div>
      </footer>
    </div>
  )
}