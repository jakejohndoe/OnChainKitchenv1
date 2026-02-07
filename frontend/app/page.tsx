'use client'

import DuckMascot from '../components/DuckMascot'
import ConnectWallet from '../components/ConnectWallet'
import { useAccount } from 'wagmi'

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <DuckMascot size="small" expression="happy" />
            <h1 className="text-xl font-bold text-gray-800">ChainSchool</h1>
          </div>
          <div className="text-sm text-gray-600 bg-amber-100 px-3 py-1 rounded-full">
            Sepolia Testnet
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <DuckMascot size="large" expression="excited" className="mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to On-Chain Kitchen!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Learn Web3 by cooking! Discover ERC-20 tokens, ERC-1155 inventories, and ERC-721 NFTs
            through a friendly tutorial that teaches by doing.
          </p>
        </div>

        {/* Tutorial Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-3xl mb-3">🚰</div>
            <h3 className="font-semibold text-gray-800 mb-2">Get Tokens</h3>
            <p className="text-sm text-gray-600">
              Claim free KitchenTokens from our faucet to start cooking
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-3xl mb-3">🛒</div>
            <h3 className="font-semibold text-gray-800 mb-2">Buy Ingredients</h3>
            <p className="text-sm text-gray-600">
              Spend tokens to collect eggs, cheese, bacon and more
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-3xl mb-3">👨‍🍳</div>
            <h3 className="font-semibold text-gray-800 mb-2">Cook & Mint</h3>
            <p className="text-sm text-gray-600">
              Combine ingredients to create unique Dish NFTs
            </p>
          </div>
        </div>

        {/* Connection Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Ready to Start Cooking?
            </h3>
            <p className="text-gray-600 mb-6">
              First, connect your wallet to Sepolia testnet. Don't worry - this is a safe learning environment!
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <ConnectWallet />
          </div>
        </div>

        {/* Next Steps - only show when connected */}
        {isConnected && (
          <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
            <div className="text-2xl mb-3">🎉</div>
            <h3 className="font-semibold text-green-800 mb-2">Wallet Connected!</h3>
            <p className="text-green-700 mb-4">
              Great! You're all set to begin your Web3 cooking adventure.
            </p>
            <button className="bg-green-200 text-green-800 px-6 py-2 rounded-lg hover:bg-green-300 transition-colors font-medium">
              Start Tutorial →
            </button>
          </div>
        )}

        {/* Educational Note */}
        <div className="mt-12 bg-amber-50 p-6 rounded-xl border border-amber-200">
          <div className="flex items-start space-x-3">
            <DuckMascot size="small" expression="curious" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">Learning by Doing</h4>
              <p className="text-amber-700 text-sm">
                This tutorial uses real blockchain technology on Sepolia testnet. Everything you learn
                here works the same way on mainnet, but with test tokens that have no real value.
                Perfect for learning!
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">
            Built with ❤️ for Web3 education • Powered by{' '}
            <span className="font-medium">Sepolia Testnet</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
