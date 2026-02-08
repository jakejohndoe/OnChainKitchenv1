import Link from 'next/link'
import DuckMascot from '../components/DuckMascot'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logos/TA-Hero-Logo.png" alt="Trustless Academy" className="h-8 w-auto" />
            <h1 className="text-xl font-bold text-gray-800">Trustless Academy</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/tutorials" className="text-gray-700 hover:text-blue-600 transition-colors">
              Tutorials
            </Link>
            <Link href="/waitlist" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
              Join Waitlist
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <img src="/logos/TA-Hero-Logo-Text.png" alt="Trustless Academy" className="mx-auto mb-8 h-32 w-auto" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Trustless Academy
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Finally understand how blockchain actually works. Interactive experiences that let anyone explore Web3 concepts — no technical background needed.
          </p>
          <Link
            href="/tutorials"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
          >
            Browse Tutorials →
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Learn by Doing</h3>
            <p className="text-gray-600">
              No boring theory. Experience real blockchain interactions through simple clicks and guided exploration.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-4">🦆</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Friendly Guidance</h3>
            <p className="text-gray-600">
              Our duck mascot explains complex concepts in simple terms, making Web3 accessible to everyone.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Safe Environment</h3>
            <p className="text-gray-600">
              Practice on testnets with free tokens. Learn and explore without any financial risk.
            </p>
          </div>
        </div>

        {/* Available Tutorials */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-12 rounded-3xl mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Tutorials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/tutorials/what-is-blockchain" className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow group">
              <div className="text-3xl mb-3">⛓️</div>
              <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">What is Blockchain?</h4>
              <p className="text-sm text-gray-600 mt-2">Understand blocks, chains, and decentralization</p>
              <div className="text-blue-600 text-sm mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Start Reading →
              </div>
            </Link>
            <Link href="/tutorials/what-is-ethereum" className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow group">
              <div className="text-3xl mb-3">💎</div>
              <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">What is Ethereum?</h4>
              <p className="text-sm text-gray-600 mt-2">Smart contracts, gas, and the EVM explained</p>
              <div className="text-blue-600 text-sm mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Start Reading →
              </div>
            </Link>
            <Link href="/tutorials/token-standards" className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow group">
              <div className="text-3xl mb-3">🪙</div>
              <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Token Standards</h4>
              <p className="text-sm text-gray-600 mt-2">Master ERC-20, ERC-721, and ERC-1155</p>
              <div className="text-blue-600 text-sm mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Start Reading →
              </div>
            </Link>
            <Link href="/tutorials/on-chain-kitchen" className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-xl hover:shadow-lg transition-shadow group border-2 border-green-300">
              <div className="text-3xl mb-3">👨‍🍳</div>
              <h4 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">On-Chain Kitchen</h4>
              <p className="text-sm text-gray-600 mt-2">Interactive cooking tutorial with real transactions</p>
              <div className="text-green-600 text-sm mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Start Cooking →
              </div>
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Connect Wallet</h3>
              <p className="text-gray-600">
                Connect your crypto wallet (we'll help you set one up) to interact with blockchain applications safely.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Follow Guided Tutorials</h3>
              <p className="text-gray-600">
                Our duck mascot guides you through interactive lessons that teach blockchain concepts by letting you experience them.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Understand Web3</h3>
              <p className="text-gray-600">
                Walk away with a real understanding of how blockchain works — no coding required, just curiosity!
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-gray-100 mb-16">
          <DuckMascot size="medium" expression="happy" className="mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Begin your Web3 journey with our interactive tutorials. No prior blockchain experience needed!
          </p>
          <Link
            href="/tutorials"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
          >
            Start Learning Now →
          </Link>
        </div>

        {/* Join Waitlist CTA */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-12 rounded-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Want More Content?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our waitlist to be the first to know when we release new tutorials, courses, and interactive experiences!
          </p>
          <Link
            href="/waitlist"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
          >
            Join the Waitlist →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <DuckMascot size="small" expression="happy" />
                <h3 className="text-xl font-bold text-gray-800">Trustless Academy</h3>
              </div>
              <p className="text-gray-600 max-w-md">
                Learn Web3 by doing, not memorizing. Interactive blockchain tutorials for everyone,
                no coding required.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Learn</h4>
              <ul className="space-y-2">
                <li><Link href="/tutorials" className="text-gray-600 hover:text-blue-600 transition-colors">All Tutorials</Link></li>
                <li><Link href="/tutorials/what-is-blockchain" className="text-gray-600 hover:text-blue-600 transition-colors">What is Blockchain?</Link></li>
                <li><Link href="/tutorials/what-is-ethereum" className="text-gray-600 hover:text-blue-600 transition-colors">What is Ethereum?</Link></li>
                <li><Link href="/tutorials/on-chain-kitchen" className="text-gray-600 hover:text-blue-600 transition-colors">On-Chain Kitchen</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Community</h4>
              <ul className="space-y-2">
                <li><Link href="/waitlist" className="text-gray-600 hover:text-blue-600 transition-colors">Join Waitlist</Link></li>
                <li><a href="https://github.com/anthropics/claude-code" className="text-gray-600 hover:text-blue-600 transition-colors">GitHub</a></li>
                <li><span className="text-gray-400">Discord (Coming Soon)</span></li>
                <li><span className="text-gray-400">Twitter (Coming Soon)</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600">
              © 2026 Trustless Academy • Learn Web3 by Doing • Open Source Education
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}