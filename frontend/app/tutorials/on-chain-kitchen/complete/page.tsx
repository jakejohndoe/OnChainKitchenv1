import Link from 'next/link'
import DuckMascot from '../../../../components/DuckMascot'

export default function CompletePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img src="/logos/TA-Hero-Logo.png" alt="Trustless Academy" className="h-12 w-auto" />
              <h1 className="text-xl font-bold text-gray-800">Trustless Academy</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full">
              Tutorial Complete!
            </div>
            <div className="text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full">
              Sepolia Testnet
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 pb-32">
        {/* Celebration Header */}
        <div className="text-center mb-16">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Congratulations!
          </h1>
          <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            You've successfully completed the On-Chain Kitchen tutorial and experienced
            the three fundamental token standards that power Web3!
          </p>
          <DuckMascot size="xlarge" expression="excited" className="mx-auto" />
        </div>

        {/* What You Learned */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            🧠 What You Mastered
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="text-3xl mb-3">🪙</div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">ERC-20 Tokens</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>✓ Claimed tokens from a faucet</li>
                <li>✓ Understood fungible currencies</li>
                <li>✓ Experienced wallet balances</li>
                <li>✓ Made approve() transactions</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl border-2 border-orange-200">
              <div className="text-3xl mb-3">🥕</div>
              <h3 className="text-xl font-bold text-orange-800 mb-2">ERC-1155 Multi-Tokens</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>✓ Bought multiple ingredient types</li>
                <li>✓ Managed batch transactions</li>
                <li>✓ Viewed multi-token inventory</li>
                <li>✓ Burned tokens to create NFTs</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
              <div className="text-3xl mb-3">🍕</div>
              <h3 className="text-xl font-bold text-purple-800 mb-2">ERC-721 NFTs</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>✓ Minted unique NFTs</li>
                <li>✓ Viewed on-chain SVG artwork</li>
                <li>✓ Understood true ownership</li>
                <li>✓ Explored decentralized metadata</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Journey Summary */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🚀 Your Journey Summary
          </h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 bg-white rounded-lg p-4">
              <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <div className="font-semibold">Connected to Blockchain</div>
                <div className="text-sm text-gray-600">Used MetaMask to interact with Sepolia testnet</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-white rounded-lg p-4">
              <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <div className="font-semibold">Claimed Your First Tokens</div>
                <div className="text-sm text-gray-600">Experienced how faucets work and understood ERC-20</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-white rounded-lg p-4">
              <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <div className="font-semibold">Shopped for Ingredients</div>
                <div className="text-sm text-gray-600">Made batch purchases and understood ERC-1155 efficiency</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-white rounded-lg p-4">
              <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <div className="font-semibold">Managed Your Inventory</div>
                <div className="text-sm text-gray-600">Viewed multi-token balances in your digital pantry</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-white rounded-lg p-4">
              <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">5</div>
              <div>
                <div className="font-semibold">Created Unique NFTs</div>
                <div className="text-sm text-gray-600">Burned ingredients to mint dish NFTs with on-chain artwork</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-white rounded-lg p-4">
              <div className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">6</div>
              <div>
                <div className="font-semibold">Built Your Collection</div>
                <div className="text-sm text-gray-600">Viewed your cookbook of unique, owned digital assets</div>
              </div>
            </div>
          </div>
        </div>

        {/* Duck Message */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-start space-x-4">
            <DuckMascot size="large" expression="happy" />
            <div className="flex-1">
              <div className="bg-yellow-100 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  🦆 A Message from Your Duck Guide
                </h3>
                <p className="text-gray-700 mb-4">
                  <strong>Quack quack! Amazing work!</strong> You've just experienced the core building blocks
                  of the entire Web3 ecosystem. Every DeFi protocol, NFT marketplace, and blockchain game
                  you've heard of uses these same token standards.
                </p>
                <p className="text-gray-700 mb-4">
                  You didn't just read about blockchain — you <em>used</em> it. You made real transactions,
                  owned real tokens, and created real NFTs. That's something special!
                </p>
                <p className="text-gray-700 font-semibold">
                  Welcome to Web3, friend! You're ready to explore this new digital frontier with confidence. 🌟
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🔮 What's Next?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📚 Explore More Tutorials</h3>
              <p className="text-gray-600 mb-4">
                Learn more Web3 concepts with our other interactive tutorials.
              </p>
              <Link
                href="/tutorials"
                className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Browse Tutorials →
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🔄 Try Again</h3>
              <p className="text-gray-600 mb-4">
                Want to cook more dishes or share the tutorial with friends?
              </p>
              <Link
                href="/tutorials/on-chain-kitchen"
                className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Restart Kitchen →
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">💌 Stay Updated</h3>
              <p className="text-gray-600 mb-4">
                Join our waitlist to be notified when we release new tutorials and features!
              </p>
              <Link
                href="/waitlist"
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
              >
                Join the Waitlist →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            🎉 Tutorial Complete! You're now a Web3 explorer • Powered by{' '}
            <span className="font-medium">Sepolia Testnet</span>
          </p>
        </div>
      </footer>
    </div>
  )
}